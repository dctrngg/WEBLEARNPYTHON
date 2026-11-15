/**
 * Chroma Python Answer Diagnostic Engine & Smart Matcher
 * Analyzes and flexibly matches student output against expected output.
 * Tolerates:
 * 1. Missing or extra punctuation like colons (:) or hyphens (-) or percent (%)
 * 2. Unaccented Vietnamese (Tiếng Việt không dấu) e.g. "So tien gui" vs "Số tiền gửi"
 * 3. Extra/missing spaces around colons, commas, or words
 * 4. Case sensitivity (e.g. vnđ vs VNĐ, kWh vs KWH)
 * 5. Numeric equivalence (e.g. 40000 vs 40000.0, 150 vs 150.0)
 * 6. Optional units (e.g. vnđ, %, kWh, giây, s, MB)
 * 7. Leaked input prompts (e.g. input("Nhap n: "))
 * 8. Core output value alignment (focusing on computational formula results)
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
 * Strips Vietnamese diacritics / accents for flexible comparison
 */
export function removeDiacritics(str: string): string {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
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
 * Normalizes a token by stripping trailing punctuation and accents
 */
function normalizeToken(tok: string): string {
  let s = removeDiacritics(tok).toLowerCase();
  s = s.replace(/[:;,]/g, "");
  return s;
}

const COMMON_UNITS = [
  "vnd",
  "vnđ",
  "d",
  "đ",
  "dong",
  "kwh",
  "gio",
  "h",
  "giay",
  "s",
  "phut",
  "m",
  "cm",
  "mm",
  "km",
  "kg",
  "g",
  "mb",
  "mb/s",
  "gb",
  "kb",
  "byte",
  "bytes",
  "nam",
  "thang",
  "ngay",
  "tuoi",
  "hoc sinh",
  "hs",
  "goi",
  "phan qua",
  "do",
  "c",
  "f",
];

/**
 * Checks if two tokens are equal, unaccented equivalent, or numerically equivalent
 */
export function isTokenEqual(eTok: string, aTok: string): boolean {
  const normE = normalizeToken(eTok);
  const normA = normalizeToken(aTok);
  if (normE === normA) return true;

  const eNum = Number(normE.replace(/[^0-9.-]/g, ""));
  const aNum = Number(normA.replace(/[^0-9.-]/g, ""));
  const eHasNum = normE.replace(/[^0-9]/g, "") !== "";
  const aHasNum = normA.replace(/[^0-9]/g, "") !== "";

  if (!isNaN(eNum) && !isNaN(aNum) && eHasNum && aHasNum) {
    if (Math.abs(eNum - aNum) < 1e-3) {
      const eUnit = normE.replace(/[0-9.-]/g, "").trim();
      const aUnit = normA.replace(/[0-9.-]/g, "").trim();
      if (eUnit === aUnit) return true;
      if (
        (eUnit === "%" && aUnit === "") ||
        (eUnit === "" && aUnit === "%")
      )
        return true;
      if (COMMON_UNITS.includes(eUnit) && COMMON_UNITS.includes(aUnit))
        return true;
      if (COMMON_UNITS.includes(eUnit) && aUnit === "") return true;
      if (eUnit === "" && COMMON_UNITS.includes(aUnit)) return true;
    }
  }

  return false;
}

/**
 * Cleans a line into unaccented, punctuation-free tokens
 */
export function cleanLineTokens(line: string): string[] {
  let s = removeDiacritics(line).toLowerCase();
  s = s.replace(/^[=\-*#_]{2,}\s*/, "").replace(/\s*[=\-*#_]{2,}$/, "");
  s = s.replace(/[:;,]/g, " ");
  s = s.replace(/%/g, " % ");
  return s.split(/\s+/).filter(Boolean).filter((tok) => tok !== "%");
}

/**
 * Checks if a single line matches flexibly
 */
export function isLineMatch(expLine: string, actLine: string): boolean {
  if (expLine === actLine) return true;

  const eTokens = cleanLineTokens(expLine);
  const aTokens = cleanLineTokens(actLine);

  if (eTokens.join(" ") === aTokens.join(" ")) return true;

  if (eTokens.length === aTokens.length) {
    if (eTokens.every((tok, i) => isTokenEqual(tok, aTokens[i]))) return true;
  }

  // Handle optional unit tokens (e.g. ['5000000', 'vnd'] vs ['5000000'])
  const eCore = eTokens.filter((t) => !COMMON_UNITS.includes(t));
  const aCore = aTokens.filter((t) => !COMMON_UNITS.includes(t));
  if (eCore.length === aCore.length && eCore.length > 0) {
    if (eCore.every((tok, i) => isTokenEqual(tok, aCore[i]))) return true;
  }

  // Single-value line match (e.g. expected has label, actual only has value)
  if (aCore.length === 1 && eCore.length > 1) {
    const lastETok = eCore[eCore.length - 1];
    if (isTokenEqual(lastETok, aCore[0])) return true;
  }

  // Both lines end with the same numerical value / calculation result
  if (eCore.length > 0 && aCore.length > 0) {
    const lastE = eCore[eCore.length - 1];
    const lastA = aCore[aCore.length - 1];
    if (isTokenEqual(lastE, lastA)) {
      const eNum = Number(lastE.replace(/[^0-9.-]/g, ""));
      const aNum = Number(lastA.replace(/[^0-9.-]/g, ""));
      if (!isNaN(eNum) && !isNaN(aNum) && Math.abs(eNum - aNum) < 1e-3) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Smart / Lenient Output Matcher for High School Python Pedagogy
 */
export function isOutputMatch(expectedRaw: string, actualRaw: string): boolean {
  if (expectedRaw === actualRaw) return true;

  const normExpected = normalizeNewlines(expectedRaw);
  const normActual = normalizeNewlines(actualRaw);
  if (normExpected === normActual) return true;

  let expLines = normExpected
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  let actLines = normActual
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // 1. Direct or unaccented case-insensitive full text match
  if (
    removeDiacritics(normExpected).toLowerCase() ===
    removeDiacritics(normActual).toLowerCase()
  ) {
    return true;
  }

  // 2. Leaked prompt filter in first line
  if (actLines.length > 0 && expLines.length > 0) {
    const promptRegex =
      /^(.*?(?:nhập|nhap|enter|input|cho|hãy|hay|prompt).*?[:\?]\s*)/i;
    if (promptRegex.test(actLines[0])) {
      actLines[0] = actLines[0].replace(promptRegex, "").trim();
      actLines = actLines.filter((l) => l.length > 0);
      if (
        removeDiacritics(expLines.join("\n")).toLowerCase() ===
        removeDiacritics(actLines.join("\n")).toLowerCase()
      ) {
        return true;
      }
    }
  }

  // 3. Line by line match
  if (expLines.length === actLines.length && expLines.length > 0) {
    if (expLines.every((l, i) => isLineMatch(l, actLines[i]))) return true;
  }

  // 4. Value extraction comparison (tolerates different Vietnamese label wording)
  const extractCoreValues = (lines: string[]) => {
    const vals: string[] = [];
    for (const line of lines) {
      const tokens = cleanLineTokens(line).filter(
        (t) => !COMMON_UNITS.includes(t)
      );
      if (tokens.length > 0) {
        vals.push(tokens[tokens.length - 1]);
      }
    }
    return vals;
  };

  const expValues = extractCoreValues(expLines);
  const actValues = extractCoreValues(actLines);

  if (expValues.length > 0 && expValues.length === actValues.length) {
    if (expValues.every((ev, i) => isTokenEqual(ev, actValues[i]))) return true;
  }

  return false;
}

export function cleanLine(line: string): string {
  return line
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\s*:\s*/g, ": ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/["']/g, '"');
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
        if (!isLineMatch(expLines[i], actLines[i])) {
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
