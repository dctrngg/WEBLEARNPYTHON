/**
 * Chroma Python Answer Diagnostic Engine & Smart Matcher
 * Analyzes and flexibly matches student output against expected output.
 * Tolerates:
 * 1. Extra/missing spaces (especially after colons or commas)
 * 2. Case sensitivity (e.g. vnđ vs VNĐ, kWh vs KWH)
 * 3. Numeric equivalence (e.g. 450000 vs 450000.0, 150 vs 150.0)
 * 4. Leaked input prompts (e.g. input("Nhap so gio: "))
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
export function normalizeNewlines(str: string): string {
  return String(str ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

/**
 * Cleans a line by collapsing spaces and normalizing colons/commas
 */
export function cleanLine(line: string): string {
  return line
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\s*:\s*/g, ": ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/["']/g, '"');
}

/**
 * Checks if two tokens are equal or numerically equivalent (with optional unit like vnđ, kWh)
 */
function isTokenEqual(eTok: string, aTok: string): boolean {
  if (eTok.toLowerCase() === aTok.toLowerCase()) return true;

  const eNum = Number(eTok.replace(/[^0-9.-]/g, ""));
  const aNum = Number(aTok.replace(/[^0-9.-]/g, ""));
  if (!isNaN(eNum) && !isNaN(aNum) && Math.abs(eNum - aNum) < 1e-4) {
    const eUnit = eTok.replace(/[0-9.-]/g, "").toLowerCase();
    const aUnit = aTok.replace(/[0-9.-]/g, "").toLowerCase();
    if (eUnit === aUnit) return true;
  }
  return false;
}

/**
 * Compares two lines flexibly
 */
function isSingleLineMatch(expLine: string, actLine: string): boolean {
  if (expLine === actLine) return true;
  if (expLine.toLowerCase() === actLine.toLowerCase()) return true;

  const expTokens = expLine.split(" ").filter(Boolean);
  const actTokens = actLine.split(" ").filter(Boolean);

  if (expTokens.length === actTokens.length) {
    return expTokens.every((eTok, i) => isTokenEqual(eTok, actTokens[i]));
  }

  return false;
}

/**
 * Smart / Lenient Output Matcher for High School Python Pedagogy:
 * - Tolerates extra/missing spaces
 * - Tolerates case mismatch
 * - Tolerates numeric equivalence (e.g. 450000 vs 450000.0)
 * - Tolerates leaked input() prompts
 */
export function isOutputMatch(expectedRaw: string, actualRaw: string): boolean {
  if (expectedRaw === actualRaw) return true;

  const expected = normalizeNewlines(expectedRaw);
  const actual = normalizeNewlines(actualRaw);
  if (expected === actual) return true;

  const expLines = expected.split("\n").map(cleanLine).filter((l) => l.length > 0);
  let actLines = actual.split("\n").map(cleanLine).filter((l) => l.length > 0);

  // 1. Clean line string match (exact or case-insensitive)
  if (expLines.join("\n") === actLines.join("\n")) return true;
  if (expLines.join("\n").toLowerCase() === actLines.join("\n").toLowerCase()) return true;

  // 2. Input prompt leak stripping
  if (actLines.length > 0 && expLines.length > 0) {
    const promptRegex = /^(.*?(?:nhập|nhap|enter|input|cho|hãy|hay|prompt).*?[:\?]\s*)/i;
    if (promptRegex.test(actLines[0])) {
      actLines[0] = cleanLine(actLines[0].replace(promptRegex, ""));
      actLines = actLines.filter((l) => l.length > 0);
      if (expLines.join("\n").toLowerCase() === actLines.join("\n").toLowerCase()) return true;
    }
  }

  // 3. Line-by-line token & numeric comparison
  if (expLines.length === actLines.length && expLines.length > 0) {
    let allLinesMatch = true;
    for (let i = 0; i < expLines.length; i++) {
      if (!isSingleLineMatch(expLines[i], actLines[i])) {
        allLinesMatch = false;
        break;
      }
    }
    if (allLinesMatch) return true;
  }

  return false;
}

/**
 * Main diagnosis function with pinpoint feedback
 */
export function diagnose(expected: string, actual: string): DiagnosticResult {
  const normExpected = normalizeNewlines(expected ?? "");
  const normActual = normalizeNewlines(actual ?? "");

  // If already matches (either strictly or leniently)
  if (isOutputMatch(normExpected, normActual)) {
    return {
      isDiagnosed: false,
      type: "CONTENT_MISMATCH",
      titleVi: "Chính xác",
      messageVi: "Kết quả in ra hoàn toàn trùng khớp hoặc tương đương với đáp án mẫu.",
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

  // Case 1: Equal after collapsing spaces
  const cleanExp = normExpected.split("\n").map(cleanLine).filter(Boolean).join("\n");
  const cleanAct = normActual.split("\n").map(cleanLine).filter(Boolean).join("\n");
  if (cleanExp === cleanAct) {
    return {
      isDiagnosed: true,
      type: "WHITESPACE_OR_NEWLINE",
      titleVi: "Thừa/thiếu dấu cách hoặc xuống dòng",
      messageVi: "Các chữ và số của bạn đã đúng, nhưng bị thừa/thiếu dấu cách (space) quanh dấu hai chấm hoặc giữa các từ.",
      suggestionVi: "Kiểm tra kỹ các dấu cách trong chuỗi in print() hoặc đối số sep='', end=''.",
    };
  }

  // Case 2: Equal when ignoring case (Upper vs Lower)
  if (cleanExp.toLowerCase() === cleanAct.toLowerCase()) {
    return {
      isDiagnosed: true,
      type: "CASE_MISMATCH",
      titleVi: "Sai chữ hoa/chữ thường",
      messageVi: "Nội dung đúng nhưng sai định dạng viết hoa hoặc viết thường (Ví dụ: 'True' vs 'true', 'vnđ' vs 'VNĐ').",
      suggestionVi: "Quan sát kỹ chữ hoa và chữ thường trong phần Kết quả mong đợi (Expected).",
    };
  }

  // Case 4: Actual has input prompt leak
  const promptRegex = /^(.*?(?:nhập|nhap|enter|input|cho|hãy|hay).*?[:\?]\s*)/i;
  if (promptRegex.test(normActual)) {
    return {
      isDiagnosed: true,
      type: "INPUT_PROMPT_OR_PREFIX",
      titleVi: "In thừa lời nhắc trong input()",
      messageVi: "Bạn đã ghi câu nhắc bên trong lệnh input(\"...\"), khiến câu nhắc bị in ra màn hình kết quả.",
      suggestionVi: "Hãy để input() trống (ví dụ: n = int(input())), không ghi chữ bên trong ngoặc.",
    };
  }

  // Case 5b: Line-based analysis (Order, missing lines, extra lines, or pinpointing line error)
  const expLines = normExpected.split("\n").map(cleanLine).filter(Boolean);
  const actLines = normActual.split("\n").map(cleanLine).filter(Boolean);

  if (expLines.length > 0 && actLines.length > 0) {
    if (actLines.length < expLines.length) {
      return {
        isDiagnosed: true,
        type: "MISSING_LINES",
        titleVi: "In thiếu dòng kết quả",
        messageVi: `Chương trình in thiếu dòng (Đáp án yêu cầu ${expLines.length} dòng, bạn mới in được ${actLines.length} dòng).`,
        suggestionVi: "Kiểm tra xem bạn đã in đủ tất cả các thông tin yêu cầu của đề bài chưa.",
      };
    }

    if (actLines.length > expLines.length) {
      return {
        isDiagnosed: true,
        type: "EXTRA_LINES",
        titleVi: "In thừa dòng kết quả",
        messageVi: `Chương trình in thừa dòng (Đáp án chỉ cần ${expLines.length} dòng, bạn in ra ${actLines.length} dòng).`,
        suggestionVi: "Kiểm tra xem lệnh print() có bị vô tình lặp lại hoặc in thừa thông tin không cần thiết.",
      };
    }

    // Same line count: pinpoint the exact first line that differs!
    if (expLines.length === actLines.length) {
      for (let i = 0; i < expLines.length; i++) {
        if (!isSingleLineMatch(expLines[i], actLines[i])) {
          return {
            isDiagnosed: true,
            type: "CONTENT_MISMATCH",
            titleVi: `Chưa đúng tại Dòng ${i + 1}`,
            messageVi: `Dòng ${i + 1} bạn in: "${actLines[i]}", trong khi đáp án là: "${expLines[i]}".`,
            suggestionVi: `Hãy kiểm tra lại công thức tính toán hoặc biến in ra ở Dòng ${i + 1}.`,
          };
        }
      }
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
