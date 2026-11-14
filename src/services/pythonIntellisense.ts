// Comprehensive Python IntelliSense, Dynamic Student Variable Scanner,
// Smart Expression Suggestions (e.g. a + b), Signature Help & Hover Documentation

let intellisenseDisposable: { dispose: () => void }[] = [];

export interface PythonDocItem {
  label: string;
  insertText: string;
  isSnippet?: boolean;
  category: "builtin" | "keyword" | "method" | "snippet" | "module";
  signature: string;
  detailVi: string;
  detailEn: string;
  docVi: string;
  docEn: string;
  example: string;
}

const PYTHON_RESERVED_WORDS = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
]);

export const PYTHON_KNOWLEDGE_BASE: PythonDocItem[] = [
  // --- BUILT-IN FUNCTIONS ---
  {
    label: "print",
    insertText: "print(${1:ket_qua})",
    isSnippet: true,
    category: "builtin",
    signature: "print(*objects, sep=' ', end='\\n')",
    detailVi: "Hàm in kết quả ra màn hình Console",
    detailEn: "Print objects to the text stream",
    docVi: "In một hoặc nhiều biến/giá trị ra màn hình. Có thể dùng print(tong) hoặc print(a + b).",
    docEn: "Prints values to standard output.",
    example: 'print(tong)\nprint(f"Tổng = {tong}")',
  },
  {
    label: "print_fstring",
    insertText: 'print(f"${1:Kết quả}: {${2:tong}}")',
    isSnippet: true,
    category: "snippet",
    signature: 'print(f"...{biến}...")',
    detailVi: "In chuỗi kèm giá trị biến (f-string)",
    detailEn: "Print formatted f-string snippet",
    docVi: "Chèn nhanh lệnh print sử dụng f-string để ghép biến vào chuỗi kết quả.",
    docEn: "Quickly print variables inside a formatted string.",
    example: 'a = 10\nb = 5\nprint(f"Tổng là: {a + b}")',
  },
  {
    label: "input",
    insertText: "input()",
    isSnippet: false,
    category: "builtin",
    signature: "input(prompt='') -> str",
    detailVi: "Đọc 1 dòng dữ liệu nhập từ bàn phím (trả về chuỗi str)",
    detailEn: "Read a line from standard input (returns str)",
    docVi: "Tạm dừng chương trình để nhập dữ liệu từ bàn phím. Muốn tính toán số học, hãy bọc trong int(input()) hoặc float(input()).",
    docEn: "Reads a line from input and returns it as a string.",
    example: "ten = input()\ntuoi = int(input())",
  },
  {
    label: "int",
    insertText: "int(${1:input()})",
    isSnippet: true,
    category: "builtin",
    signature: "int(x) -> int",
    detailVi: "Chuyển chuỗi hoặc số thực sang Số nguyên (int)",
    detailEn: "Convert a number or string to an integer",
    docVi: "Dùng để ép kiểu dữ liệu từ input() hoặc số thực sang số nguyên để cộng trừ nhân chia.",
    docEn: "Converts a string or float to an integer.",
    example: "a = int(input())\nb = int(input())\ntong = a + b",
  },
  {
    label: "float",
    insertText: "float(${1:input()})",
    isSnippet: true,
    category: "builtin",
    signature: "float(x) -> float",
    detailVi: "Chuyển chuỗi hoặc số sang Số thực thập phân (float)",
    detailEn: "Convert a string or number to a floating point number",
    docVi: "Dùng để đọc các số có phần thập phân (ví dụ: 3.14, 25.5).",
    docEn: "Converts a string or integer to a floating-point number.",
    example: "c = float(input())",
  },
  {
    label: "str",
    insertText: "str(${1:x})",
    isSnippet: true,
    category: "builtin",
    signature: "str(object) -> str",
    detailVi: "Chuyển số hoặc dữ liệu sang kiểu Chuỗi ký tự (str)",
    detailEn: "Convert an object to a string",
    docVi: "Biến số nguyên, số thực thành chuỗi ký tự.",
    docEn: "Returns a string version of an object.",
    example: "s = str(123)  # '123'",
  },
  {
    label: "len",
    insertText: "len(${1:danh_sach})",
    isSnippet: true,
    category: "builtin",
    signature: "len(s) -> int",
    detailVi: "Đếm số lượng phần tử của danh sách hoặc độ dài chuỗi",
    detailEn: "Return the number of items in a container",
    docVi: "Đếm số ký tự trong chuỗi hoặc số phần tử trong list/dict/set.",
    docEn: "Returns the length (the number of items) of an object.",
    example: "ds = [10, 20, 30]\nprint(len(ds))  # 3",
  },
  {
    label: "range",
    insertText: "range(${1:n})",
    isSnippet: true,
    category: "builtin",
    signature: "range(start, stop[, step])",
    detailVi: "Tạo dãy số nguyên dùng trong vòng lặp for",
    detailEn: "Generate a sequence of integers for loops",
    docVi: "range(n) tạo các số từ 0 đến n-1. range(1, n+1) tạo các số từ 1 đến n.",
    docEn: "Returns an immutable sequence of numbers from start to stop-1.",
    example: "for i in range(1, 6):\n    print(i)  # 1, 2, 3, 4, 5",
  },
  {
    label: "sum",
    insertText: "sum(${1:danh_sach})",
    isSnippet: true,
    category: "builtin",
    signature: "sum(iterable) -> number",
    detailVi: "Tính tổng tất cả các số trong danh sách (list)",
    detailEn: "Sum all items in an iterable",
    docVi: "Cộng tất cả các số trong một danh sách.",
    docEn: "Sums the items of an iterable from left to right.",
    example: "nums = [10, 20, 30]\nprint(sum(nums))  # 60",
  },
  {
    label: "max",
    insertText: "max(${1:a}, ${2:b})",
    isSnippet: true,
    category: "builtin",
    signature: "max(iterable) / max(a, b, ...)",
    detailVi: "Tìm số lớn nhất trong danh sách hoặc giữa các biến",
    detailEn: "Return the largest item",
    docVi: "Trả về giá trị lớn nhất. Ví dụ max(a, b) hoặc max(danh_sach).",
    docEn: "Returns the largest item in an iterable or the largest of two or more arguments.",
    example: "print(max(a, b))",
  },
  {
    label: "min",
    insertText: "min(${1:a}, ${2:b})",
    isSnippet: true,
    category: "builtin",
    signature: "min(iterable) / min(a, b, ...)",
    detailVi: "Tìm số nhỏ nhất trong danh sách hoặc giữa các biến",
    detailEn: "Return the smallest item",
    docVi: "Trả về giá trị nhỏ nhất. Ví dụ min(a, b) hoặc min(danh_sach).",
    docEn: "Returns the smallest item in an iterable or the smallest of two or more arguments.",
    example: "print(min(a, b))",
  },
  {
    label: "abs",
    insertText: "abs(${1:x})",
    isSnippet: true,
    category: "builtin",
    signature: "abs(x) -> number",
    detailVi: "Giá trị tuyệt đối của một số",
    detailEn: "Return the absolute value of a number",
    docVi: "Trả về giá trị không âm của số x. Ví dụ abs(-5) = 5.",
    docEn: "Returns the absolute value of a number.",
    example: "print(abs(a - b))",
  },
  {
    label: "round",
    insertText: "round(${1:so_thuc}, ${2:2})",
    isSnippet: true,
    category: "builtin",
    signature: "round(number, ndigits=2)",
    detailVi: "Làm tròn số thập phân đến n chữ số",
    detailEn: "Round a number to a given precision in decimal digits",
    docVi: "Làm tròn số thực. Ví dụ round(3.14159, 2) -> 3.14.",
    docEn: "Rounds a floating-point number to ndigits precision.",
    example: "print(round(3.14159, 2))  # 3.14",
  },
  {
    label: "sorted",
    insertText: "sorted(${1:danh_sach})",
    isSnippet: true,
    category: "builtin",
    signature: "sorted(iterable, reverse=False) -> list",
    detailVi: "Sắp xếp danh sách tăng dần (hoặc giảm dần với reverse=True)",
    detailEn: "Return a new sorted list from the items in iterable",
    docVi: "Trả về danh sách mới đã sắp xếp.",
    docEn: "Builds a new sorted list from an iterable.",
    example: "ds_moi = sorted([5, 1, 4])  # [1, 4, 5]",
  },
  {
    label: "enumerate",
    insertText: "enumerate(${1:danh_sach})",
    isSnippet: true,
    category: "builtin",
    signature: "enumerate(iterable, start=0)",
    detailVi: "Lấy cả vị trí (index) và giá trị (value) khi lặp danh sách",
    detailEn: "Return (index, value) pairs in a loop",
    docVi: "Giúp lấy đồng thời chỉ số i và giá trị phần tử trong vòng lặp for.",
    docEn: "Yields pairs containing index and value.",
    example: "for i, val in enumerate(nums):\n    print(i, val)",
  },
  {
    label: "list",
    insertText: "list(${1:iterable})",
    isSnippet: true,
    category: "builtin",
    signature: "list(iterable) -> list",
    detailVi: "Tạo hoặc chuyển đổi sang kiểu Danh sách (list)",
    detailEn: "Create or convert to a Python list",
    docVi: "Chuyển một chuỗi, range, hoặc map thành danh sách.",
    docEn: "Constructs a list from an iterable.",
    example: "nums = list(range(1, 5))  # [1, 2, 3, 4]",
  },
  {
    label: "dict",
    insertText: "dict()",
    isSnippet: false,
    category: "builtin",
    signature: "dict() -> dict",
    detailVi: "Tạo Từ điển (lưu cặp khóa - giá trị)",
    detailEn: "Create a new dictionary (key-value mapping)",
    docVi: "Lưu trữ các cặp khóa - giá trị (key: value) giúp tra cứu cực nhanh.",
    docEn: "Creates a dictionary mapping keys to values.",
    example: "diem = {'An': 9, 'Bình': 10}",
  },
  {
    label: "set",
    insertText: "set(${1:danh_sach})",
    isSnippet: true,
    category: "builtin",
    signature: "set(iterable) -> set",
    detailVi: "Tạo Tập hợp chứa các phần tử không trùng lặp",
    detailEn: "Create a set of unique elements",
    docVi: "Tự động loại bỏ các phần tử bị lặp lại.",
    docEn: "Build an unordered collection of unique elements.",
    example: "khong_trung = set([1, 2, 2, 3])  # {1, 2, 3}",
  },
  {
    label: "map",
    insertText: "map(int, input().split())",
    isSnippet: false,
    category: "builtin",
    signature: "map(function, iterable)",
    detailVi: "Đọc nhiều số trên cùng 1 dòng: a, b = map(int, input().split())",
    detailEn: "Apply function to every item of iterable",
    docVi: "Thường dùng để đọc 2 hoặc nhiều số nguyên trên cùng một dòng.",
    docEn: "Returns an iterator that applies function to every item of iterable.",
    example: "a, b = map(int, input().split())",
  },

  // --- COMMON METHODS (ONLY SHOWN AFTER DOT '.') ---
  {
    label: "split",
    insertText: "split()",
    isSnippet: false,
    category: "method",
    signature: "str.split(sep=None) -> list[str]",
    detailVi: "Tách chuỗi thành danh sách các từ theo khoảng trắng",
    detailEn: "Split a string into a list of words",
    docVi: "Nếu để trống ngoặc .split(), Python sẽ tự tách theo dấu cách.",
    docEn: "Returns a list of the words in the string.",
    example: '"10 20 30".split()  # ["10", "20", "30"]',
  },
  {
    label: "strip",
    insertText: "strip()",
    isSnippet: false,
    category: "method",
    signature: "str.strip() -> str",
    detailVi: "Xóa khoảng trắng thừa ở 2 đầu chuỗi",
    detailEn: "Remove leading and trailing whitespace",
    docVi: "Giúp làm sạch dữ liệu đọc từ input().",
    docEn: "Returns a copy of the string with leading and trailing whitespace removed.",
    example: "s = input().strip()",
  },
  {
    label: "lower",
    insertText: "lower()",
    isSnippet: false,
    category: "method",
    signature: "str.lower() -> str",
    detailVi: "Chuyển toàn bộ chuỗi sang chữ thường",
    detailEn: "Convert string to lowercase",
    docVi: "Trả về chuỗi mới với tất cả ký tự là chữ in thường.",
    docEn: "Returns a lowercase copy of the string.",
    example: '"Python".lower()  # "python"',
  },
  {
    label: "upper",
    insertText: "upper()",
    isSnippet: false,
    category: "method",
    signature: "str.upper() -> str",
    detailVi: "Chuyển toàn bộ chuỗi sang CHỮ IN HOA",
    detailEn: "Convert string to UPPERCASE",
    docVi: "Trả về chuỗi mới với tất cả ký tự là chữ in hoa.",
    docEn: "Returns an uppercase copy of the string.",
    example: '"python".upper()  # "PYTHON"',
  },
  {
    label: "replace",
    insertText: 'replace("${1:cu}", "${2:moi}")',
    isSnippet: true,
    category: "method",
    signature: "str.replace(old, new) -> str",
    detailVi: "Thay thế chuỗi con cũ bằng chuỗi mới",
    detailEn: "Replace occurrences of substring old with new",
    docVi: "Tìm và thay thế tất cả các vị trí xuất hiện của chuỗi cũ bằng chuỗi mới.",
    docEn: "Returns a copy with all occurrences of substring old replaced by new.",
    example: '"a-b-c".replace("-", " ")  # "a b c"',
  },
  {
    label: "join",
    insertText: "join(${1:danh_sach})",
    isSnippet: true,
    category: "method",
    signature: "sep.join(iterable) -> str",
    detailVi: "Nối danh sách các chuỗi lại với nhau",
    detailEn: "Concatenate any number of strings",
    docVi: "Ghép các phần tử chuỗi trong list thành 1 chuỗi duy nhất.",
    docEn: "Concatenates an iterable of strings with the separator.",
    example: '" ".join(["Xin", "chào"])  # "Xin chào"',
  },
  {
    label: "append",
    insertText: "append(${1:phan_tu})",
    isSnippet: true,
    category: "method",
    signature: "list.append(x) -> None",
    detailVi: "Thêm một phần tử vào cuối danh sách (list)",
    detailEn: "Append object to the end of the list",
    docVi: "Chèn thêm phần tử mới vào cuối danh sách hiện tại.",
    docEn: "Adds an item to the end of the list.",
    example: "ds = [1, 2]\nds.append(3)  # [1, 2, 3]",
  },
  {
    label: "pop",
    insertText: "pop()",
    isSnippet: false,
    category: "method",
    signature: "list.pop([index]) -> item",
    detailVi: "Lấy ra và xóa phần tử cuối cùng của danh sách",
    detailEn: "Remove and return item at index (default last)",
    docVi: "Thường dùng trong cấu trúc Ngăn xếp (Stack).",
    docEn: "Removes and returns the last element from the list.",
    example: "stack = [10, 20]\ntop = stack.pop()  # 20",
  },
  {
    label: "sort",
    insertText: "sort()",
    isSnippet: false,
    category: "method",
    signature: "list.sort(reverse=False) -> None",
    detailVi: "Sắp xếp trực tiếp danh sách theo thứ tự tăng dần",
    detailEn: "Sort the list in ascending order in-place",
    docVi: "Sắp xếp trực tiếp trên list hiện tại.",
    docEn: "Sorts the list in place.",
    example: "nums = [3, 1, 2]\nnums.sort()  # [1, 2, 3]",
  },
  {
    label: "items",
    insertText: "items()",
    isSnippet: false,
    category: "method",
    signature: "dict.items() -> (key, value)",
    detailVi: "Lấy danh sách các cặp (khóa, giá_trị) của từ điển",
    detailEn: "Return dictionary's (key, value) pairs",
    docVi: "Dùng trong vòng lặp for k, v in my_dict.items():.",
    docEn: "Returns (key, value) tuple pairs.",
    example: "for k, v in dem.items():\n    print(k, v)",
  },
  {
    label: "get",
    insertText: "get(${1:key}, ${2:0})",
    isSnippet: true,
    category: "method",
    signature: "dict.get(key, default=0)",
    detailVi: "Lấy giá trị từ dict theo key, nếu chưa có trả về 0",
    detailEn: "Return the value for key if present, else default",
    docVi: "Giúp tránh lỗi khi tra cứu từ điển.",
    docEn: "Safely retrieves a key from a dictionary.",
    example: "so_lan = dem.get(tu, 0) + 1",
  },

  // --- KEYWORDS & SNIPPETS FOR STUDENTS ---
  {
    label: "for_range",
    insertText: "for ${1:i} in range(${2:n}):\n    ${3:print(i)}",
    isSnippet: true,
    category: "snippet",
    signature: "for i in range(n):",
    detailVi: "Vòng lặp for chạy từ 0 đến n - 1",
    detailEn: "For loop over range(n) snippet",
    docVi: "Cấu trúc vòng lặp lặp lại n lần với biến chạy i từ 0 đến n-1.",
    docEn: "Standard Python for-loop iterating over a range.",
    example: "for i in range(5):\n    print(i)",
  },
  {
    label: "for_in",
    insertText: "for ${1:x} in ${2:danh_sach}:\n    ${3:print(x)}",
    isSnippet: true,
    category: "snippet",
    signature: "for x in danh_sach:",
    detailVi: "Vòng lặp for duyệt từng phần tử trong danh sách",
    detailEn: "For-each loop over list or string",
    docVi: "Duyệt trực tiếp qua từng phần tử có trong danh sách hoặc từng ký tự trong chuỗi.",
    docEn: "Iterates directly over items of a sequence.",
    example: "for x in [10, 20, 30]:\n    print(x)",
  },
  {
    label: "while",
    insertText: "while ${1:dieu_kien}:\n    ${2:pass}",
    isSnippet: true,
    category: "keyword",
    signature: "while dieu_kien:",
    detailVi: "Vòng lặp while (lặp khi điều kiện còn đúng)",
    detailEn: "While loop block",
    docVi: "Thực hiện khối lệnh bên trong chừng nào điều kiện kiểm tra vẫn đúng.",
    docEn: "Repeats a block of code while a condition is true.",
    example: "while n > 0:\n    n -= 1",
  },
  {
    label: "if_else",
    insertText: "if ${1:dieu_kien}:\n    ${2:pass}\nelse:\n    ${3:pass}",
    isSnippet: true,
    category: "snippet",
    signature: "if ...: ... else: ...",
    detailVi: "Câu lệnh điều kiện if - else (Nếu ... thì ... ngược lại ...)",
    detailEn: "If-Else conditional block",
    docVi: "Kiểm tra điều kiện đúng/sai để thực hiện nhánh lệnh tương ứng.",
    docEn: "Conditional branching statement.",
    example: "if a > b:\n    print(a)\nelse:\n    print(b)",
  },
  {
    label: "def",
    insertText: "def ${1:ten_ham}(${2:a, b}):\n    return ${3:a + b}",
    isSnippet: true,
    category: "keyword",
    signature: "def ten_ham(tham_so):",
    detailVi: "Định nghĩa một hàm mới trong Python",
    detailEn: "Define a new Python function",
    docVi: "Tạo hàm con để tái sử dụng nhiều lần.",
    docEn: "Defines a reusable function.",
    example: "def tinh_tong(a, b):\n    return a + b",
  },
  {
    label: "Counter",
    insertText: "from collections import Counter",
    isSnippet: false,
    category: "module",
    signature: "Counter(iterable)",
    detailVi: "Công cụ đếm số lần xuất hiện của các phần tử",
    detailEn: "Count hashable objects from collections module",
    docVi: "Tự động đếm số lần xuất hiện của mỗi phần tử trong danh sách hoặc chuỗi.",
    docEn: "Dict subclass for counting hashable objects.",
    example: "from collections import Counter\nc = Counter(['a', 'b', 'a'])",
  },
];

interface ExtractedStudentSymbol {
  name: string;
  kind: "variable" | "function" | "parameter";
  line: number;
  preview: string;
}

/**
 * Scans the student's Python code in real time to extract variables (e.g. a=10, b=5, tong=...),
 * loop variables (for i in ...), and user-defined functions (def tinh_tong(a, b):)
 */
function extractStudentSymbols(
  code: string,
  currentLineNumber: number
): ExtractedStudentSymbol[] {
  const lines = code.split(/\r?\n/);
  const symbolsMap = new Map<string, ExtractedStudentSymbol>();

  lines.forEach((rawLine, index) => {
    const lineNum = index + 1;
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) return;

    // 1. Match variable assignments: e.g. "a = 10", "a, b = 10, 20"
    const assignMatch = line.match(
      /^([a-zA-Z_][a-zA-Z0-9_]*(?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*)\s*(?::[^=]+)?=\s*(.+)$/
    );
    if (assignMatch && !line.startsWith("if ") && !line.startsWith("while ")) {
      const lhsVars = assignMatch[1].split(",").map((s) => s.trim());
      const rhsPreview = assignMatch[2].trim();

      lhsVars.forEach((vName) => {
        if (
          vName &&
          /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(vName) &&
          !PYTHON_RESERVED_WORDS.has(vName)
        ) {
          if (lineNum === currentLineNumber && !symbolsMap.has(vName)) {
            return;
          }
          symbolsMap.set(vName, {
            name: vName,
            kind: "variable",
            line: lineNum,
            preview: `${vName} = ${rhsPreview.slice(0, 35)}`,
          });
        }
      });
    }

    // 2. Match for-loop variables: e.g. "for i in range(n):"
    const forMatch = line.match(
      /^for\s+([a-zA-Z_][a-zA-Z0-9_]*(?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*)\s+in\s+(.+):/
    );
    if (forMatch) {
      const loopVars = forMatch[1].split(",").map((s) => s.trim());
      loopVars.forEach((vName) => {
        if (
          vName &&
          vName !== "_" &&
          /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(vName) &&
          !PYTHON_RESERVED_WORDS.has(vName)
        ) {
          symbolsMap.set(vName, {
            name: vName,
            kind: "variable",
            line: lineNum,
            preview: `for ${vName} in ${forMatch[2]}`,
          });
        }
      });
    }

    // 3. Match function definitions & parameters: e.g. "def solve(nums, target):"
    const defMatch = line.match(
      /^def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)/
    );
    if (defMatch) {
      const fnName = defMatch[1];
      const rawParams = defMatch[2];
      symbolsMap.set(fnName, {
        name: fnName,
        kind: "function",
        line: lineNum,
        preview: `def ${fnName}(${rawParams})`,
      });

      rawParams.split(",").forEach((paramChunk) => {
        const cleanParam = paramChunk
          .split(":")[0]
          .split("=")[0]
          .trim();
        if (
          cleanParam &&
          cleanParam !== "self" &&
          /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(cleanParam)
        ) {
          symbolsMap.set(cleanParam, {
            name: cleanParam,
            kind: "parameter",
            line: lineNum,
            preview: `Tham số hàm ${fnName}()`,
          });
        }
      });
    }
  });

  return Array.from(symbolsMap.values());
}

export function registerPythonIntellisense(
  monaco: any,
  lang: "vi" | "en" = "vi"
) {
  intellisenseDisposable.forEach((d) => d.dispose());
  intellisenseDisposable = [];

  // 1. Completion Item Provider
  // Only trigger automatically on "." (never on Space, so Spacebar works 100% smoothly!)
  const completionProvider = monaco.languages.registerCompletionItemProvider(
    "python",
    {
      triggerCharacters: ["."],
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const lineContent: string = model.getLineContent(position.lineNumber);
        const linePrefix = lineContent.slice(0, position.column - 1);
        const isDotAccess = linePrefix.trimEnd().endsWith(".");

        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions: any[] = [];

        // A. Extract Student's Own Variables & Functions from Current Code
        if (!isDotAccess) {
          const fullCode: string = model.getValue();
          const studentSymbols = extractStudentSymbols(
            fullCode,
            position.lineNumber
          );

          studentSymbols.forEach((sym) => {
            const labelDesc =
              sym.kind === "function"
                ? lang === "vi"
                  ? `Hàm của bạn (Dòng ${sym.line})`
                  : `Your function (Line ${sym.line})`
                : lang === "vi"
                ? `Biến của bạn (${sym.preview})`
                : `Your variable (${sym.preview})`;

            suggestions.push({
              label: {
                label: sym.name,
                description: labelDesc,
              },
              kind:
                sym.kind === "function"
                  ? monaco.languages.CompletionItemKind.Function
                  : monaco.languages.CompletionItemKind.Variable,
              detail: labelDesc,
              documentation: {
                value: `**\`${sym.preview}\`**\n\n${
                  lang === "vi"
                    ? `Được khai báo tại dòng ${sym.line} trong bài làm của bạn.`
                    : `Defined at line ${sym.line} in your code.`
                }`,
              },
              insertText:
                sym.kind === "function" ? `${sym.name}($1)` : sym.name,
              insertTextRules:
                sym.kind === "function"
                  ? monaco.languages.CompletionItemInsertTextRule
                      .InsertAsSnippet
                  : undefined,
              // Highest priority so student's variables (a, b, ...) appear AT THE VERY TOP!
              sortText: `00_1_${sym.name}`,
              range,
            });
          });

          // B. Smart Expression Suggestions when student has >= 2 variables (e.g. a, b -> a + b)
          const studentVars = studentSymbols.filter(
            (s) => s.kind === "variable" || s.kind === "parameter"
          );
          const isRightOfAssignmentOrPrint =
            linePrefix.includes("=") || linePrefix.includes("print(");

          if (studentVars.length >= 2 && isRightOfAssignmentOrPrint) {
            const v1 = studentVars[0].name;
            const v2 = studentVars[1].name;
            const mathOps = [
              {
                op: "+",
                vi: `Cộng 2 biến ${v1} và ${v2}`,
                en: `Add ${v1} and ${v2}`,
              },
              {
                op: "-",
                vi: `Trừ 2 biến ${v1} và ${v2}`,
                en: `Subtract ${v2} from ${v1}`,
              },
              {
                op: "*",
                vi: `Nhân 2 biến ${v1} và ${v2}`,
                en: `Multiply ${v1} and ${v2}`,
              },
              {
                op: "/",
                vi: `Chia 2 biến ${v1} và ${v2}`,
                en: `Divide ${v1} by ${v2}`,
              },
            ];

            mathOps.forEach((m, idx) => {
              const expr = `${v1} ${m.op} ${v2}`;
              suggestions.push({
                label: {
                  label: expr,
                  description: lang === "vi" ? m.vi : m.en,
                },
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: lang === "vi" ? `Biểu thức: ${m.vi}` : m.en,
                insertText: expr,
                filterText: `${v1} ${v1}${m.op}${v2} ${expr}`,
                sortText: `00_0_${idx}_${expr}`,
                range,
              });
            });
          }
        }

        // C. Built-in Python Functions, Keywords, Snippets (and Methods only after '.')
        const knowledgeItems = PYTHON_KNOWLEDGE_BASE.filter((item) =>
          isDotAccess
            ? item.category === "method"
            : item.category !== "method"
        );

        knowledgeItems.forEach((item) => {
          let kind = monaco.languages.CompletionItemKind.Function;
          if (item.category === "keyword") {
            kind = monaco.languages.CompletionItemKind.Keyword;
          } else if (item.category === "snippet") {
            kind = monaco.languages.CompletionItemKind.Snippet;
          } else if (item.category === "method") {
            kind = monaco.languages.CompletionItemKind.Method;
          } else if (item.category === "module") {
            kind = monaco.languages.CompletionItemKind.Module;
          }

          const detail = lang === "vi" ? item.detailVi : item.detailEn;
          const doc = lang === "vi" ? item.docVi : item.docEn;

          suggestions.push({
            label: {
              label: item.label,
              description: detail,
            },
            kind,
            detail: `${item.signature} — ${detail}`,
            documentation: {
              value: `**${item.signature}**\n\n${doc}\n\n\`\`\`python\n${item.example}\n\`\`\``,
            },
            insertText: item.insertText,
            insertTextRules: item.isSnippet
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
            sortText: `10_${item.label}`,
            range,
          });
        });

        return { suggestions };
      },
    }
  );

  // 2. Signature Help Provider
  const signatureProvider = monaco.languages.registerSignatureHelpProvider(
    "python",
    {
      signatureHelpTriggerCharacters: ["(", ","],
      provideSignatureHelp: (model: any, position: any) => {
        const lineUntilPos: string = model
          .getLineContent(position.lineNumber)
          .slice(0, position.column - 1);

        const match = lineUntilPos.match(
          /([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^()]*$/
        );
        if (!match) return null;

        const fnName = match[1];
        const found = PYTHON_KNOWLEDGE_BASE.find(
          (item) => item.label === fnName
        );
        if (!found) return null;

        const detail = lang === "vi" ? found.detailVi : found.detailEn;
        const doc = lang === "vi" ? found.docVi : found.docEn;

        return {
          value: {
            activeSignature: 0,
            activeParameter: 0,
            signatures: [
              {
                label: found.signature,
                documentation: {
                  value: `**${detail}**\n\n${doc}\n\n\`\`\`python\n${found.example}\n\`\`\``,
                },
                parameters: [],
              },
            ],
          },
          dispose: () => {},
        };
      },
    }
  );

  // 3. Hover Provider
  const hoverProvider = monaco.languages.registerHoverProvider("python", {
    provideHover: (model: any, position: any) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const found = PYTHON_KNOWLEDGE_BASE.find(
        (item) => item.label === word.word
      );
      if (!found) return null;

      const detail = lang === "vi" ? found.detailVi : found.detailEn;
      const doc = lang === "vi" ? found.docVi : found.docEn;

      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        ),
        contents: [
          { value: `**\`${found.signature}\`**` },
          { value: `${detail}\n\n${doc}` },
          { value: `\`\`\`python\n# Ví dụ / Example:\n${found.example}\n\`\`\`` },
        ],
      };
    },
  });

  intellisenseDisposable.push(
    completionProvider,
    signatureProvider,
    hoverProvider
  );
}
