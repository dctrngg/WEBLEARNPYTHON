/**
 * Chroma Python Answer Diagnostic Engine
 * Analyzes Wrong Answer discrepancies between Expected Output and Actual Student Output.
 * Detects 5 primary student error patterns with actionable Vietnamese guidance:
 * 1. Whitespace or newline differences
 * 2. Case sensitivity mismatch (Upper / Lower case)
 * 3. Numeric format mismatch (e.g. 5 vs 5.0, floating point rounding)
 * 4. Input prompt / prefix leak (e.g. input("Nhap n: ") printing to stdout)
 * 5. Line ordering, empty output, or missing/extra lines
 */

export interface DiagnosticResult {
  isDiagnosed: boolean;
  type:
    | "WHITESPACE_OR_NEWLINE"
    | "CASE_MISMATCH"
    | "NUMBER_FORMAT"
    | "INPUT_PROMPT_OR_PREFIX"
    | "EMPTY_OUTPUT"
    | "LINE_ORDER"
    | "MISSING_LINES"
    | "EXTRA_LINES"
    | "CONTENT_MISMATCH";
  titleVi: string;
  messageVi: string;
  suggestionVi: string;
}

/**
 * Normalizes newlines across platforms (\r\n -> \n)
 */
function normalizeNewlines(str: string): string {
  return str.replace(/\r\n/g, "\n");
}

/**
 * Strips trailing whitespace from each line and trims trailing blank lines
 */
function cleanWhitespace(str: string): string {
  return normalizeNewlines(str)
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trimEnd();
}

/**
 * Extracts and compares numerical tokens if all tokens represent valid numbers
 */
function compareAsNumbers(expected: string, actual: string): boolean {
  const expTokens = expected.trim().split(/\s+/).filter(Boolean);
  const actTokens = actual.trim().split(/\s+/).filter(Boolean);

  if (expTokens.length === 0 || expTokens.length !== actTokens.length) {
    return false;
  }

  for (let i = 0; i < expTokens.length; i++) {
    const expNum = Number(expTokens[i]);
    const actNum = Number(actTokens[i]);

    if (isNaN(expNum) || isNaN(actNum)) {
      return false;
    }

    // Compare with small epsilon for floating-point tolerance
    if (Math.abs(expNum - actNum) > 1e-5) {
      return false;
    }
  }

  return true;
}

/**
 * Main diagnosis function
 */
export function diagnose(expected: string, actual: string): DiagnosticResult {
  const normExpected = normalizeNewlines(expected ?? "");
  const normActual = normalizeNewlines(actual ?? "");

  // If already exactly equal, no diagnosis needed
  if (normExpected === normActual) {
    return {
      isDiagnosed: false,
      type: "CONTENT_MISMATCH",
      titleVi: "Chính xác",
      messageVi: "Kết quả in ra hoàn toàn trùng khớp với đáp án mẫu.",
      suggestionVi: "",
    };
  }

  // Case 5a: Output is completely empty
  if (normActual.trim() === "") {
    return {
      isDiagnosed: true,
      type: "EMPTY_OUTPUT",
      titleVi: "Chưa in kết quả ra màn hình",
      messageVi: "Chương trình của bạn không in bất kỳ kết quả nào ra màn hình (Output rỗng).",
      suggestionVi: "Hãy kiểm tra xem bạn đã có câu lệnh print(...) để in đáp án ra chưa.",
    };
  }

  // Case 1: Equal after trimming whitespace on lines and at the end
  if (cleanWhitespace(normExpected) === cleanWhitespace(normActual)) {
    return {
      isDiagnosed: true,
      type: "WHITESPACE_OR_NEWLINE",
      titleVi: "Thừa/thiếu dấu cách hoặc xuống dòng",
      messageVi: "Các chữ và số của bạn đã đúng, nhưng bị thừa hoặc thiếu dấu cách (space) hoặc ký tự xuống dòng (Enter).",
      suggestionVi: "Kiểm tra kỹ các dấu cách trong lệnh print() hoặc đối số sep='', end=''.",
    };
  }

  // Case 2: Equal when ignoring case (Upper vs Lower)
  if (cleanWhitespace(normExpected).toLowerCase() === cleanWhitespace(normActual).toLowerCase()) {
    return {
      isDiagnosed: true,
      type: "CASE_MISMATCH",
      titleVi: "Sai chữ hoa/chữ thường",
      messageVi: "Nội dung đúng nhưng sai định dạng viết hoa hoặc viết thường (Ví dụ: 'True' vs 'true', 'CHẴN' vs 'chẵn').",
      suggestionVi: "Quan sát kỹ chữ hoa và chữ thường trong phần Kết quả mong đợi (Expected).",
    };
  }

  // Case 3: Same numerical values but different format (e.g. 5 vs 5.0, 3.333 vs 3.33)
  if (compareAsNumbers(cleanWhitespace(normExpected), cleanWhitespace(normActual))) {
    return {
      isDiagnosed: true,
      type: "NUMBER_FORMAT",
      titleVi: "Sai định dạng số",
      messageVi: "Giá trị tính toán đã đúng, nhưng định dạng hiển thị số chưa chuẩn (Ví dụ: in 5.0 thay vì 5, hoặc số chữ số thập phân làm tròn chưa đúng).",
      suggestionVi: "Dùng int(...) để ép về số nguyên, hoặc dùng round(x, n) / f-string f'{x:.2f}' để định dạng chữ số thập phân.",
    };
  }

  // Case 4: Actual has extra text at start, but ends with expected
  // Very common Grade 10 mistake: input("Nhap n: ") or print("Ket qua la:", x)
  const trimmedExp = cleanWhitespace(normExpected);
  const trimmedAct = cleanWhitespace(normActual);
  if (trimmedAct.endsWith(trimmedExp) && trimmedAct.length > trimmedExp.length) {
    const leakedPrefix = trimmedAct.slice(0, trimmedAct.length - trimmedExp.length).trim();
    return {
      isDiagnosed: true,
      type: "INPUT_PROMPT_OR_PREFIX",
      titleVi: "In thừa lời nhắc hoặc chú thích",
      messageVi: `Bạn in cả lời nhắc trong input(...) hoặc thêm chữ vào trước kết quả (Đoạn thừa: "${leakedPrefix}").`,
      suggestionVi: "Khi làm bài chấm tự động, hãy dùng input() không có lời nhắc (không ghi chữ trong ngoặc) và chỉ in đúng kết quả số/chữ đề bài yêu cầu.",
    };
  }

  // Case 5b: Line-based analysis (Order, missing lines, extra lines)
  const expLines = trimmedExp.split("\n").map((l) => l.trim()).filter(Boolean);
  const actLines = trimmedAct.split("\n").map((l) => l.trim()).filter(Boolean);

  if (expLines.length > 0 && actLines.length > 0) {
    // Check if same lines but in different order
    const sortedExp = [...expLines].sort().join("\n");
    const sortedAct = [...actLines].sort().join("\n");

    if (sortedExp === sortedAct) {
      return {
        isDiagnosed: true,
        type: "LINE_ORDER",
        titleVi: "Sai thứ tự các dòng",
        messageVi: "Tất cả các dòng kết quả đều đúng nội dung, nhưng thứ tự in ra chưa đúng theo yêu cầu.",
        suggestionVi: "Kiểm tra lại thứ tự thực hiện của các vòng lặp hoặc điều kiện in ấn.",
      };
    }

    if (actLines.length < expLines.length) {
      return {
        isDiagnosed: true,
        type: "MISSING_LINES",
        titleVi: "In thiếu dòng kết quả",
        messageVi: `Chương trình in thiếu dòng (Đáp án yêu cầu ${expLines.length} dòng, bạn mới in được ${actLines.length} dòng).`,
        suggestionVi: "Kiểm tra điều kiện dừng của vòng lặp (range(a, b)) hoặc kiểm tra xem có trường hợp nào chưa in không.",
      };
    }

    if (actLines.length > expLines.length) {
      return {
        isDiagnosed: true,
        type: "EXTRA_LINES",
        titleVi: "In thừa dòng kết quả",
        messageVi: `Chương trình in thừa dòng hoặc lệnh in bị lặp lại nhiều lần (Đáp án chỉ cần ${expLines.length} dòng, bạn in ra ${actLines.length} dòng).`,
        suggestionVi: "Kiểm tra xem lệnh print() có bị vô tình đặt bên trong vòng lặp thay vì đặt ở ngoài không.",
      };
    }
  }

  // Fallback generic mismatch
  return {
    isDiagnosed: true,
    type: "CONTENT_MISMATCH",
    titleVi: "Kết quả chưa đúng",
    messageVi: "Kết quả in ra khác với đáp án mẫu của bài toán.",
    suggestionVi: "So sánh kỹ giá trị của bạn in ra với Kết quả mong đợi, hoặc dùng tính năng [🔍 CHẠY TỪNG BƯỚC] để theo dõi thuật toán.",
  };
}
