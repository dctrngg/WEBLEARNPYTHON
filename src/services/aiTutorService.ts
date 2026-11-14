/**
 * AI Tutor Service for High School Tin học 10 Python Learning
 * Provides intelligent pedagogical error diagnosis and interactive tutoring.
 * Features:
 * 1. Built-in Offline Diagnostic Engine (Zero-latency, 100% reliable, zero API cost)
 * 2. Optional Google Gemini 1.5/2.0 Flash integration for deep, empathetic conversational tutoring
 */

export interface AITutorResponse {
  source: "offline_engine" | "gemini_flash";
  errorType?: string;
  summaryVi: string;
  explanationVi: string;
  suggestionVi: string;
  fixExample?: {
    wrong: string;
    correct: string;
    explanation: string;
  };
}

export interface AITutorChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: "offline_engine" | "gemini_flash";
}

const GEMINI_API_KEY_STORAGE = "chroma_gemini_api_key";

export function getStoredGeminiApiKey(): string {
  const local = localStorage.getItem(GEMINI_API_KEY_STORAGE);
  if (local && local.trim()) return local.trim();
  const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  return envKey ? envKey.trim() : "";
}

export function saveStoredGeminiApiKey(key: string): void {
  if (key && key.trim()) {
    localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
  } else {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE);
  }
}

/**
 * Built-in High School Python Intelligent Diagnostic Rules Engine
 * Maps common 10th-grade Python errors to friendly, educational explanations.
 */
export function diagnosePythonErrorOffline(
  code: string,
  errorLog: string,
  assignmentTitle?: string
): AITutorResponse {
  const log = errorLog || "";
  const lines = code.split("\n");

  // 1. IndentationError: expected an indented block
  if (log.includes("IndentationError") || log.includes("TabError")) {
    const lineMatch = log.match(/line (\d+)/i);
    const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : undefined;
    const problematicLine = lineNum && lines[lineNum - 1] ? lines[lineNum - 1] : "";

    return {
      source: "offline_engine",
      errorType: "IndentationError (Lỗi thụt lề / thụt đầu dòng)",
      summaryVi: `Em đang bị lỗi thụt lề (thụt dòng) ở ${lineNum ? `dòng ${lineNum}` : "đoạn code vừa chạy"}.`,
      explanationVi:
        "Trong Python, các câu lệnh nằm bên trong khối lệnh của `for`, `if`, `while`, `def` **bắt buộc phải thụt vào trong** (thường dùng phím Tab hoặc 4 dấu cách) so với dòng lệnh khai báo bên trên.",
      suggestionVi:
        "Hãy kiểm tra lại dòng lệnh ngay sau câu lệnh có dấu hai chấm `:` và nhấn phím **Tab** để thụt dòng thẳng hàng.",
      fixExample: {
        wrong: `for i in range(10):\nprint(i)  # <- Sai: chưa thụt đầu dòng`,
        correct: `for i in range(10):\n    print(i)  # <- Đúng: lùi vào 4 dấu cách (1 phím Tab)`,
        explanation: "Các câu lệnh con bên trong vòng lặp phải lùi vào trong.",
      },
    };
  }

  // 2. SyntaxError: invalid syntax (Thường thiếu dấu hai chấm :, ngoặc, nháy)
  if (log.includes("SyntaxError")) {
    const lineMatch = log.match(/line (\d+)/i);
    const lineNum = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

    // Kiểm tra thiếu dấu hai chấm sau if/for/while/def
    if (
      log.includes("expected ':'") ||
      (lineNum &&
        lines[lineNum - 1] &&
        /\b(if|elif|else|for|while|def)\b/.test(lines[lineNum - 1]) &&
        !lines[lineNum - 1].trim().endsWith(":"))
    ) {
      return {
        source: "offline_engine",
        errorType: "SyntaxError (Thiếu dấu hai chấm ':')",
        summaryVi: `Em quên viết dấu hai chấm \`:\` ở cuối câu lệnh điều kiện hoặc vòng lặp ${lineNum ? `(dòng ${lineNum})` : ""}.`,
        explanationVi:
          "Trong Python, sau các cấu trúc như `if điều_kiện:`, `else:`, `for biến in ...:`, `while điều_kiện:`, `def tên_hàm():` bắt buộc phải có dấu hai chấm `:` ở cuối dòng để bắt đầu khối lệnh.",
        suggestionVi: `Hãy thêm dấu \`:\` vào cuối dòng lệnh ${lineNum ? `số ${lineNum}` : ""}.`,
        fixExample: {
          wrong: `if a > b  # <- Thiếu dấu hai chấm`,
          correct: `if a > b: # <- Đã thêm dấu hai chấm`,
          explanation: "Luôn đặt dấu : trước khi xuống dòng viết thân lệnh.",
        },
      };
    }

    // Kiểm tra nhầm phép gán = với phép so sánh ==
    if (log.includes("cannot assign to") || log.includes("invalid syntax. Maybe you meant '=='")) {
      return {
        source: "offline_engine",
        errorType: "SyntaxError (Nhầm dấu '=' gán với '==' so sánh)",
        summaryVi: "Em đang dùng dấu gán `=` trong biểu thức điều kiện thay vì so sánh bằng `==`.",
        explanationVi:
          "Dấu một bằng `=` là phép gán giá trị cho biến. Khi kiểm tra hai giá trị có bằng nhau không (trong lệnh `if`), Python dùng hai dấu bằng `==`.",
        suggestionVi: "Hãy đổi dấu `=` thành `==` trong biểu thức điều kiện của em.",
        fixExample: {
          wrong: `if n = 10:  # <- Sai`,
          correct: `if n == 10: # <- Đúng`,
          explanation: "Dùng == để so sánh bằng.",
        },
      };
    }

    // Lỗi chung về cú pháp (ngoặc kép, ngoặc tròn)
    return {
      source: "offline_engine",
      errorType: "SyntaxError (Lỗi cú pháp Python)",
      summaryVi: `Python không hiểu được cú pháp tại ${lineNum ? `dòng ${lineNum}` : "bài làm"}.`,
      explanationVi:
        "Lỗi cú pháp thường xảy ra khi em đóng mở ngoặc đơn `()` chưa đủ, hoặc thiếu dấu nháy kép `\"...\"` khi in chuỗi văn bản.",
      suggestionVi:
        "Hãy kiểm tra xem các cặp ngoặc đơn `()` và cặp nháy chuỗi `'...'` hoặc `\"...\"` đã được đóng mở đầy đủ chưa.",
      fixExample: {
        wrong: `print("Xin chào!  # <- Thiếu đóng ngoặc kép và ngoặc tròn`,
        correct: `print("Xin chào!") # <- Đầy đủ dấu nháy và ngoặc`,
        explanation: "Mỗi dấu mở ngoặc hoặc mở nháy đều cần có dấu đóng tương ứng.",
      },
    };
  }

  // 3. NameError: name '...' is not defined
  if (log.includes("NameError")) {
    const varMatch = log.match(/name '([^']+)' is not defined/i);
    const varName = varMatch ? varMatch[1] : "biến";

    if (varName === "true" || varName === "false") {
      return {
        source: "offline_engine",
        errorType: "NameError (Viết hoa từ khóa True/False)",
        summaryVi: `Từ khóa giá trị Đúng/Sai trong Python phải viết hoa chữ cái đầu: \`${varName === "true" ? "True" : "False"}\`.`,
        explanationVi: "Python phân biệt chữ hoa chữ thường. `True` và `False` phải viết hoa chữ cái đầu tiên.",
        suggestionVi: `Hãy đổi \`${varName}\` thành \`${varName === "true" ? "True" : "False"}\`.`,
      };
    }

    if (varName === "math") {
      return {
        source: "offline_engine",
        errorType: "NameError (Chưa import thư viện math)",
        summaryVi: "Em đang sử dụng thư viện `math` nhưng chưa import vào bài làm.",
        explanationVi:
          "Khi dùng các hàm toán học như `math.sqrt()` (căn bậc 2) hay `math.gcd()` (ước chung lớn nhất), ta cần khai báo ở đầu chương trình.",
        suggestionVi: "Thêm dòng lệnh `import math` vào dòng đầu tiên của bài làm.",
        fixExample: {
          wrong: `x = math.sqrt(16)  # <- Bị lỗi vì chưa import math`,
          correct: `import math\nx = math.sqrt(16)  # <- Đúng`,
          explanation: "Phải nạp thư viện trước khi sử dụng các hàm của nó.",
        },
      };
    }

    return {
      source: "offline_engine",
      errorType: `NameError (Tên biến '${varName}' chưa được định nghĩa)`,
      summaryVi: `Biến \`${varName}\` chưa được gán giá trị hoặc bị viết sai chính tả.`,
      explanationVi:
        `Python không tìm thấy biến nào có tên \`${varName}\`. Có thể em chưa gán giá trị cho nó (chưa nhập qua \`input()\`) hoặc viết nhầm chữ hoa/chữ thường.`,
      suggestionVi: `Kiểm tra lại xem em đã tạo biến \`${varName}\` trước dòng này chưa, hoặc kiểm tra xem có gõ sai chính tả không.`,
    };
  }

  // 4. TypeError: unsupported operand type(s) or cannot concatenate
  if (log.includes("TypeError")) {
    if (log.includes("concatenate") || (log.includes("unsupported operand") && log.includes("str"))) {
      return {
        source: "offline_engine",
        errorType: "TypeError (Không thể cộng trực tiếp Chuỗi với Số)",
        summaryVi: "Em đang cố gắng cộng trực tiếp một chuỗi văn bản với một số nguyên/thực.",
        explanationVi:
          "Hàm `input()` trong Python luôn trả về kiểu Chuỗi (`str`). Nếu em muốn tính toán số học, em phải chuyển nó sang kiểu Số nguyên (`int()`) hoặc Số thực (`float()`).",
        suggestionVi:
          "Hãy bọc lệnh `input()` bằng `int()` hoặc `float()`, ví dụ: `n = int(input())` hoặc `x = float(input())`.",
        fixExample: {
          wrong: `a = input()  # a là kiểu str\nb = a + 5    # <- Lỗi TypeError`,
          correct: `a = int(input())  # a là số nguyên\nb = a + 5        # <- Tính toán bình thường`,
          explanation: "Chuyển chuỗi sang số trước khi thực hiện các phép toán cộng trừ nhân chia.",
        },
      };
    }

    return {
      source: "offline_engine",
      errorType: "TypeError (Sai kiểu dữ liệu)",
      summaryVi: "Một phép toán hoặc hàm đang nhận sai kiểu dữ liệu truyền vào.",
      explanationVi: "Kiểm tra kiểu dữ liệu của các biến tham gia phép tính bằng cách dùng lệnh `print(type(tên_biến))`.",
      suggestionVi: "Đảm bảo các biến dùng trong phép toán cùng là số, hoặc dùng f-string `print(f'...')` khi cần in nhiều kiểu dữ liệu cùng nhau.",
    };
  }

  // 5. ValueError: invalid literal for int()
  if (log.includes("ValueError")) {
    if (log.includes("invalid literal for int()")) {
      return {
        source: "offline_engine",
        errorType: "ValueError (Không thể ép kiểu số nguyên int)",
        summaryVi: "Hàm `int()` không thể chuyển đổi chuỗi nhập vào thành số nguyên.",
        explanationVi:
          "Lỗi này xảy ra khi dữ liệu nhập vào là số thập phân (ví dụ `3.5`) hoặc có khoảng trắng thừa mà em lại ép sang `int()`.",
        suggestionVi: "Nếu dữ liệu có phần thập phân, hãy dùng hàm `float(input())` thay vì `int(input())`.",
      };
    }

    if (log.includes("not enough values to unpack")) {
      return {
        source: "offline_engine",
        errorType: "ValueError (Thiếu dữ liệu nhập vào)",
        summaryVi: "Số lượng biến nhận giá trị không khớp với số lượng phần tử trên dòng dữ liệu.",
        explanationVi: "Ví dụ: `a, b = map(int, input().split())` đòi hỏi dữ liệu vào phải có đủ 2 số cách nhau bởi dấu cách.",
        suggestionVi: "Kiểm tra định dạng dữ liệu đầu vào xem có đủ các số cách nhau bằng dấu cách chưa.",
      };
    }
  }

  // 6. ZeroDivisionError
  if (log.includes("ZeroDivisionError")) {
    return {
      source: "offline_engine",
      errorType: "ZeroDivisionError (Lỗi chia cho số 0)",
      summaryVi: "Trong toán học và lập trình, không thể thực hiện phép chia cho số 0.",
      explanationVi: "Phần mẫu số trong phép chia `/` hoặc `%` hoặc `//` của em đang bằng 0.",
      suggestionVi: "Hãy kiểm tra lại biến ở mẫu số hoặc thêm điều kiện `if mau_so != 0:` trước khi chia.",
    };
  }

  // 7. IndexError
  if (log.includes("IndexError")) {
    return {
      source: "offline_engine",
      errorType: "IndexError (Chỉ số vượt quá giới hạn danh sách)",
      summaryVi: "Em đang truy cập vào một vị trí (index) không tồn tại trong danh sách hoặc xâu kí tự.",
      explanationVi:
        "Trong Python, vị trí phần tử được đánh số bắt đầu từ `0` đến `len(danh_sách) - 1`. Nếu danh sách có 3 phần tử thì chỉ có các vị trí `0, 1, 2`.",
      suggestionVi: "Hãy kiểm tra lại chỉ số trong ngoặc vuông `[...]` xem có vượt quá độ dài `len()` không.",
    };
  }

  // Generic fallback diagnosis
  return {
    source: "offline_engine",
    errorType: "Lỗi thực thi chương trình",
    summaryVi: "Chương trình dừng lại do gặp lỗi khi chạy dòng lệnh Python.",
    explanationVi:
      log.trim() ||
      "Không có thông báo lỗi cụ thể. Hãy kiểm tra các câu lệnh nhập xuất và logic xử lý của bài làm.",
    suggestionVi:
      "Em hãy đọc dòng cuối cùng trong thông báo lỗi màu đỏ (Console), đó là nơi Python chỉ ra nguyên nhân bài làm chưa chạy được.",
  };
}

/**
 * Call Google Gemini API (if API Key provided) or fallback seamlessly to offline engine
 */
export async function consultAITutor(params: {
  code: string;
  errorLog?: string;
  assignmentTitle?: string;
  assignmentDescription?: string;
  testCaseDetails?: string;
  userPrompt?: string;
}): Promise<AITutorResponse> {
  const { code, errorLog, assignmentTitle, assignmentDescription, testCaseDetails, userPrompt } =
    params;

  const apiKey = getStoredGeminiApiKey();

  // If no Gemini API Key, use the rich offline pedagogical engine
  if (!apiKey) {
    if (userPrompt && !errorLog) {
      return {
        source: "offline_engine",
        summaryVi: "Gợi ý định hướng làm bài từ Trợ giảng Tin học 10",
        explanationVi:
          `Để làm tốt bài "${assignmentTitle || "bài tập"}", em hãy thực hiện theo 3 bước:\n` +
          `1. **Đọc kỹ Dữ liệu vào (Input)**: Xem đề bài yêu cầu nhập những gì, dùng \`input()\` hay \`int(input())\` hay \`float(input())\`.\n` +
          `2. **Xử lý thuật toán**: Áp dụng đúng công thức hoặc vòng lặp như trong phần lý thuyết SGK.\n` +
          `3. **In kết quả (Output)**: Dùng \`print()\` theo đúng mẫu yêu cầu của đề bài (chú ý dấu cách, chữ hoa/thường).`,
        suggestionVi:
          "💡 *Mẹo: Em có thể vào mục Cài đặt trong bảng Trợ giảng để nhập khóa API Gemini (miễn phí từ Google AI Studio) nếu muốn trò chuyện mở rộng và hỏi đáp chi tiết hơn!*",
      };
    }

    return diagnosePythonErrorOffline(code, errorLog || "", assignmentTitle);
  }

  // With Gemini API Key: Call Gemini 1.5 Flash
  try {
    const systemInstruction = `Bạn là "Trợ Giảng AI Tin Học 10" - một người thầy tận tâm, kiên nhẫn, gần gũi và giàu tính sư phạm dành riêng cho học sinh lớp 10 học lập trình Python tại Việt Nam.
NGUYÊN TẮC QUAN TRỌNG:
1. Xưng hô thân thiện: "thầy/cô" và "em". Dùng tiếng Việt chuẩn mực, khuyến khích học sinh.
2. KHÔNG giải hộ bài hay đưa nguyên cả bài giải hoàn chỉnh cho học sinh chép.
3. Hãy chỉ rõ học sinh đang hiểu nhầm chỗ nào, giải thích bản chất lỗi bằng ngôn ngữ dễ hiểu nhất (tránh thuật ngữ quá hàn lâm).
4. Đưa ra gợi ý từng bước (hints) và ví dụ nhỏ độc lập để học sinh tự suy nghĩ và tự gõ lại code.
5. Luôn định dạng Markdown rõ ràng, dùng khối \`code\` cho các từ khóa Python.`;

    const fullPrompt = `Đề bài: ${assignmentTitle || "Bài tập Python"}
Mô tả đề bài: ${assignmentDescription || "Không có"}
Code của học sinh hiện tại:
\`\`\`python
${code || "# Chưa có code"}
\`\`\`

Thông báo lỗi / Kết quả kiểm thử:
\`\`\`text
${errorLog || testCaseDetails || "Không có lỗi runtime nhưng cần tư vấn"}
\`\`\`

Câu hỏi hoặc yêu cầu của học sinh:
${userPrompt || "Em đang bị lỗi này, thầy/cô hướng dẫn em cách sửa với ạ!"}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\n${fullPrompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1000,
        },
      }),
    });

    if (!res.ok) {
      console.warn("Gemini API call failed with status", res.status, "falling back to offline engine.");
      return diagnosePythonErrorOffline(code, errorLog || "", assignmentTitle);
    }

    const data = await res.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      return diagnosePythonErrorOffline(code, errorLog || "", assignmentTitle);
    }

    return {
      source: "gemini_flash",
      summaryVi: "Lời khuyên từ Trợ giảng AI (Google Gemini)",
      explanationVi: candidate,
      suggestionVi: "Hãy xem kỹ lời khuyên ở trên và thử tự sửa lại code trong bài làm của em nhé!",
    };
  } catch (err) {
    console.warn("Gemini fetch exception, using offline diagnostic engine:", err);
    return diagnosePythonErrorOffline(code, errorLog || "", assignmentTitle);
  }
}
