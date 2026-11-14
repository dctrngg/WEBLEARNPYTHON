/**
 * Python Error Translator for High School Grade 10 Students (Tin học 10)
 * Translates standard CPython / Pyodide tracebacks into clear, friendly, and actionable Vietnamese explanations.
 */

export interface TranslatedError {
  originalError: string;
  errorType: string;
  lineNumber: number | null;
  lineSnippet?: string;
  titleVi: string;
  descriptionVi: string;
  suggestionVi: string;
  correctExample?: string;
  wrongExample?: string;
}

export function parseAndTranslatePythonError(
  rawStderr: string,
  userCode?: string
): TranslatedError | null {
  if (!rawStderr || typeof rawStderr !== "string") return null;

  // 1. Extract line number (e.g. File "<exec>", line 4, or line 4, in <module>)
  const lineMatch =
    rawStderr.match(/line (\d+)/i) || rawStderr.match(/dòng (\d+)/i);
  const lineNumber = lineMatch ? parseInt(lineMatch[1], 10) : null;

  // Extract snippet from user code if line number is found
  let lineSnippet: string | undefined = undefined;
  if (lineNumber && userCode) {
    const lines = userCode.split(/\r?\n/);
    if (lineNumber <= lines.length) {
      lineSnippet = lines[lineNumber - 1].trim();
    }
  }

  // 2. Identify Python Error Types
  // --- INDENTATION ERROR ---
  if (rawStderr.includes("IndentationError")) {
    if (rawStderr.includes("expected an indented block")) {
      return {
        originalError: rawStderr,
        errorType: "IndentationError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi thụt đầu dòng (Thiếu khối lệnh thụt lề)",
        descriptionVi: `Sau các câu lệnh có dấu hai chấm ':' (như if, for, while, def), dòng tiếp theo bắt buộc phải thụt đầu dòng bằng 1 phím Tab hoặc 4 dấu cách.`,
        suggestionVi: `Nhấn phím Tab ở đầu dòng lệnh để thụt lề vào bên trong khối lệnh.`,
        wrongExample: `if a > 0:\nprint("a dương")  # Sai: chưa thụt lề`,
        correctExample: `if a > 0:\n    print("a dương")  # Đúng: đã thụt lề 1 Tab`,
      };
    }

    if (rawStderr.includes("unexpected indent")) {
      return {
        originalError: rawStderr,
        errorType: "IndentationError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi thụt đầu dòng thừa (Unexpected Indent)",
        descriptionVi: `Dòng lệnh này bị thụt lề thừa hoặc không thẳng hàng với các câu lệnh cùng cấp phía trên.`,
        suggestionVi: `Xóa bớt khoảng trắng hoặc nhấn Shift+Tab ở đầu dòng để căn thẳng hàng với các dòng lệnh khác.`,
        wrongExample: `a = 5\n  b = 10  # Sai: tự nhiên thụt lề`,
        correctExample: `a = 5\nb = 10  # Đúng: thẳng hàng`,
      };
    }

    return {
      originalError: rawStderr,
      errorType: "IndentationError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi thụt lề mã nguồn",
      descriptionVi: `Căn lề không đồng nhất giữa các dòng lệnh (ví dụ lẫn lộn giữa phím Tab và dấu cách).`,
      suggestionVi: `Hãy dùng duy nhất phím Tab hoặc 4 khoảng trắng cho mỗi cấp thụt lề.`,
    };
  }

  // --- SYNTAX ERROR ---
  if (rawStderr.includes("SyntaxError")) {
    if (rawStderr.includes("expected ':'") || rawStderr.includes("invalid syntax") && lineSnippet && (lineSnippet.startsWith("if ") || lineSnippet.startsWith("for ") || lineSnippet.startsWith("while ") || lineSnippet.startsWith("def ") || lineSnippet.startsWith("elif ") || lineSnippet.startsWith("else"))) {
      if (!lineSnippet || !lineSnippet.endsWith(":")) {
        return {
          originalError: rawStderr,
          errorType: "SyntaxError",
          lineNumber,
          lineSnippet,
          titleVi: "Lỗi cú pháp: Thiếu dấu hai chấm ':'",
          descriptionVi: `Trong Python, các câu lệnh điều khiển (if, elif, else, for, while, def) bắt buộc phải kết thúc bằng dấu hai chấm ':'.`,
          suggestionVi: `Thêm dấu ':' vào cuối dòng lệnh này.`,
          wrongExample: `if x > 0`,
          correctExample: `if x > 0:`,
        };
      }
    }

    if (rawStderr.includes("unmatched ')'") || rawStderr.includes("was never closed") || rawStderr.includes("closing parenthesis")) {
      return {
        originalError: rawStderr,
        errorType: "SyntaxError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi cú pháp: Đóng/Mở ngoặc không khớp",
        descriptionVi: `Số lượng dấu mở ngoặc '(' và đóng ngoặc ')' (hoặc ngoặc vuông '[]', ngoặc nhọn '{}') không bằng nhau.`,
        suggestionVi: `Kiểm tra kỹ câu lệnh xem có bị quên đóng ngoặc ')' ở cuối lệnh input() hoặc print() không.`,
        wrongExample: `a = int(input()`,
        correctExample: `a = int(input())`,
      };
    }

    if (rawStderr.includes("unterminated string literal")) {
      return {
        originalError: rawStderr,
        errorType: "SyntaxError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi cú pháp: Xâu ký tự chưa đóng nháy",
        descriptionVi: `Chuỗi văn bản (String) được mở bằng dấu nháy đơn ' hoặc nháy kép " nhưng quên chưa đóng lại ở cuối dòng.`,
        suggestionVi: `Thêm dấu nháy tương ứng để đóng chuỗi ký tự.`,
        wrongExample: `print("Xin chao)`,
        correctExample: `print("Xin chao")`,
      };
    }

    return {
      originalError: rawStderr,
      errorType: "SyntaxError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi cú pháp câu lệnh (SyntaxError)",
      descriptionVi: `Python không hiểu được câu lệnh này do sai quy tắc ngữ pháp, gõ nhầm từ khóa hoặc thiếu ký tự (như dấu phẩy, dấu nháy, dấu hai chấm).`,
      suggestionVi: `Kiểm tra kỹ chính tả của câu lệnh, đảm bảo các từ khóa như print, input, for, in, range được viết đúng.`,
    };
  }

  // --- NAME ERROR ---
  if (rawStderr.includes("NameError")) {
    const varMatch = rawStderr.match(/name '([^']+)' is not defined/);
    const varName = varMatch ? varMatch[1] : "biến";

    let suggestion = `Hãy kiểm tra xem em đã gán giá trị cho biến '${varName}' trước khi sử dụng chưa, hoặc có bị nhầm chữ hoa/thường không (ví dụ 'N' khác 'n').`;
    if (varName === "pritn" || varName === "prnt") suggestion = `Có thể em gõ nhầm lệnh 'print()'.`;
    if (varName === "intput" || varName === "inpt") suggestion = `Có thể em gõ nhầm hàm 'input()'.`;

    return {
      originalError: rawStderr,
      errorType: "NameError",
      lineNumber,
      lineSnippet,
      titleVi: `Lỗi chưa định nghĩa tên biến '${varName}'`,
      descriptionVi: `Python gặp biến hoặc tên hàm '${varName}' nhưng chưa từng thấy biến này được khai báo hoặc gán giá trị trước đó.`,
      suggestionVi: suggestion,
      wrongExample: `print(tong)  # Chưa có lệnh tong = ...`,
      correctExample: `tong = 10\nprint(tong)`,
    };
  }

  // --- TYPE ERROR ---
  if (rawStderr.includes("TypeError")) {
    if (rawStderr.includes("can only concatenate str") || rawStderr.includes("unsupported operand type")) {
      return {
        originalError: rawStderr,
        errorType: "TypeError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi kiểu dữ liệu (Cộng nhầm Chuỗi và Số)",
        descriptionVi: `Trong Python, dấu '+' không thể vừa cộng số vừa nối chuỗi trực tiếp. Dữ liệu từ hàm input() mặc định là kiểu Xâu (str).`,
        suggestionVi: `Nếu muốn tính toán số học, hãy ép kiểu 'int(input())' hoặc 'float(input())'. Nếu muốn in ra màn hình, dùng dấu phẩy 'print("Tuoi:", tuoi)'.`,
        wrongExample: `print("Tong la: " + 10)`,
        correctExample: `print("Tong la:", 10)  # Hoặc print("Tong la: " + str(10))`,
      };
    }

    if (rawStderr.includes("not callable")) {
      return {
        originalError: rawStderr,
        errorType: "TypeError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi gọi nhầm biến thành hàm ('object is not callable')",
        descriptionVi: `Em đang dùng dấu ngoặc tròn '()' sau một biến không phải là hàm. Lỗi này thường do đặt tên biến trùng với tên hàm có sẵn (như đặt tên biến là 'sum = ...', 'list = ...', 'max = ...').`,
        suggestionVi: `Đổi tên biến thành tên khác (ví dụ: 'tong', 'danh_sach', 'so_lon_nhat') để không ghi đè lên các hàm có sẵn của Python.`,
      };
    }

    return {
      originalError: rawStderr,
      errorType: "TypeError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi kiểu dữ liệu (TypeError)",
      descriptionVi: `Phép toán hoặc hàm đang nhận giá trị không đúng kiểu dữ liệu yêu cầu.`,
      suggestionVi: `Kiểm tra kiểu dữ liệu của các biến bằng hàm 'type(x)' để đảm bảo đúng kiểu số nguyên (int), số thực (float) hoặc xâu (str).`,
    };
  }

  // --- VALUE ERROR ---
  if (rawStderr.includes("ValueError")) {
    if (rawStderr.includes("invalid literal for int()")) {
      return {
        originalError: rawStderr,
        errorType: "ValueError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi giá trị: Không thể chuyển thành số nguyên",
        descriptionVi: `Hàm int() chỉ chuyển đổi được các chuỗi số nguyên (như '123'). Nếu người dùng nhập chữ cái hoặc số thập phân (như '3.14'), hàm int() sẽ báo lỗi.`,
        suggestionVi: `Nếu bài toán yêu cầu nhập số thực, hãy đổi 'int(input())' thành 'float(input())'.`,
        wrongExample: `a = int("3.5")  # Báo lỗi`,
        correctExample: `a = float("3.5")  # Đúng`,
      };
    }

    if (rawStderr.includes("not enough values to unpack") || rawStderr.includes("too many values to unpack")) {
      return {
        originalError: rawStderr,
        errorType: "ValueError",
        lineNumber,
        lineSnippet,
        titleVi: "Lỗi số lượng biến không khớp với số phần tử nhập",
        descriptionVi: `Khi dùng cú pháp gán nhiều biến 'a, b = map(int, input().split())', số lượng giá trị người dùng nhập vào trên bàn phím không bằng số lượng biến ở bên trái.`,
        suggestionVi: `Đảm bảo người dùng nhập đúng số lượng số cách nhau bởi dấu cách trên cùng 1 dòng.`,
      };
    }

    return {
      originalError: rawStderr,
      errorType: "ValueError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi giá trị không hợp lệ (ValueError)",
      descriptionVi: `Dữ liệu truyền vào hàm có kiểu đúng nhưng giá trị không phù hợp để thực thi.`,
      suggestionVi: `Kiểm tra dữ liệu đầu vào (Input) xem có đúng định dạng đề bài yêu cầu không.`,
    };
  }

  // --- ZERO DIVISION ERROR ---
  if (rawStderr.includes("ZeroDivisionError")) {
    return {
      originalError: rawStderr,
      errorType: "ZeroDivisionError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi chia cho số không (ZeroDivisionError)",
      descriptionVi: `Trong toán học và lập trình, không thể chia cho số 0. Mẫu số trong phép chia '/', '//' hoặc '%' của em đang có giá trị bằng 0.`,
      suggestionVi: `Dùng câu lệnh 'if mau_so != 0:' để kiểm tra điều kiện trước khi thực hiện phép chia.`,
      wrongExample: `c = a / b  # Khi b = 0 sẽ văng lỗi`,
      correctExample: `if b != 0:\n    c = a / b\nelse:\n    print("Mau so phai khac 0")`,
    };
  }

  // --- INDEX ERROR ---
  if (rawStderr.includes("IndexError")) {
    return {
      originalError: rawStderr,
      errorType: "IndexError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi chỉ số vượt quá phạm vi (IndexError)",
      descriptionVi: `Em đang truy cập vào phần tử có chỉ số không tồn tại trong Danh sách (List) hoặc Xâu (String). Trong Python, chỉ số luôn bắt đầu từ 0 và kết thúc ở len - 1.`,
      suggestionVi: `Kiểm tra độ dài của danh sách bằng hàm 'len(ds)'. Chỉ số hợp lệ phải nhỏ hơn 'len(ds)'.`,
      wrongExample: `ds = [10, 20]\nprint(ds[2])  # Danh sách chỉ có vị trí 0 và 1`,
      correctExample: `ds = [10, 20]\nprint(ds[1])  # In ra 20`,
    };
  }

  // --- TIMEOUT / INFINITE LOOP ---
  if (rawStderr.includes("TimeoutError") || rawStderr.includes("Infinite loop")) {
    return {
      originalError: rawStderr,
      errorType: "TimeoutError",
      lineNumber,
      lineSnippet,
      titleVi: "Lỗi vòng lặp vô hạn (Infinite Loop)",
      descriptionVi: `Chương trình chạy quá lâu (hơn 12 giây) và đã bị hệ thống ngắt an toàn. Nguyên nhân thường do vòng lặp 'while' có điều kiện luôn Đúng (True) và không bao giờ dừng.`,
      suggestionVi: `Kiểm tra biến điều khiển trong vòng lặp 'while': Đảm bảo bên trong thân vòng lặp có câu lệnh làm thay đổi biến điều kiện (ví dụ: 'i += 1' hoặc 'n //= 10').`,
      wrongExample: `while i < 10:\n    print(i)  # Quên tăng i, i mãi bằng 0 -> lặp vô tận`,
      correctExample: `while i < 10:\n    print(i)\n    i += 1  # Có bước tăng để dừng vòng lặp`,
    };
  }

  // Generic fallback if none matched
  return {
    originalError: rawStderr,
    errorType: "RuntimeError",
    lineNumber,
    lineSnippet,
    titleVi: "Lỗi thực thi chương trình (Runtime Error)",
    descriptionVi: `Đã xảy ra lỗi trong quá trình thực thi mã nguồn Python.`,
    suggestionVi: `Đọc kỹ thông báo lỗi tiếng Anh ở trên và kiểm tra lại logic câu lệnh tại dòng ${lineNumber || "được chỉ định"}.`,
  };
}
