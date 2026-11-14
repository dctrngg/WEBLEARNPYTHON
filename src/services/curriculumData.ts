export interface LessonTopic {
  id: string;
  code: string; // e.g. "BÀI 16"
  glyph: string;
  titleVi: string;
  titleEn: string;
  summaryVi: string;
  summaryEn: string;
  keyPointsVi: string[];
  theoryMarkdownVi: string;
  theoryMarkdownEn: string;
  sampleCode: string;
  sampleOutput: string[];
}

export const PYTHON_CURRICULUM_LESSONS: LessonTopic[] = [
  {
    id: "bai_16",
    code: "BÀI 16",
    glyph: "◇",
    titleVi: "Bài 16: Ngôn ngữ lập trình bậc cao Python",
    titleEn: "Lesson 16: High-Level Python Programming Language",
    summaryVi:
      "Phân loại ngôn ngữ lập trình, đặc điểm của Python, chế độ Interactive/Script, kiểu dữ liệu cơ bản (int, float, bool, str) và lệnh xuất print().",
    summaryEn:
      "Programming language types, Python features, IDLE modes, basic data types (int, float, bool, str), and print() statement.",
    keyPointsVi: [
      "3 loại ngôn ngữ: Ngôn ngữ máy (0, 1), Hợp ngữ (Assembly), Ngôn ngữ bậc cao (Python, C++, Java...).",
      "Kiểu dữ liệu cơ bản: int (số nguyên), float (số thực), bool (True/False), str (xâu kí tự). Dùng type() để kiểm tra.",
      "Lệnh print(object, sep=' ', end='\\n'): sep là kí tự phân cách, end là kí tự kết thúc dòng.",
      "Chú thích 1 dòng dùng dấu #, chú thích nhiều dòng dùng '''...''' hoặc \"\"\"...\"\"\".",
    ],
    theoryMarkdownVi: `### 1. Phân loại ngôn ngữ lập trình
- **Ngôn ngữ máy:** Dạng mã nhị phân (\`0\` và \`1\`), máy tính hiểu và thực hiện trực tiếp.
- **Hợp ngữ (Assembly):** Sử dụng các từ viết tắt tiếng Anh (ví dụ: \`LDI\`, \`CLR\`, \`INC\`).
- **Ngôn ngữ lập trình bậc cao:** Câu lệnh gần với ngôn ngữ tự nhiên (Pascal, C, C++, Java, **Python**...). Cần có **Chương trình dịch (Compiler / Interpreter)** để dịch sang ngôn ngữ máy.

### 2. Đặc điểm của ngôn ngữ lập trình Python
- Cú pháp đơn giản, gần gũi với ngôn ngữ tự nhiên.
- Đa nền tảng, mã nguồn mở, thư viện phong phú phục vụ AI, Khoa học dữ liệu, Robot.
- **Môi trường lập trình:**
  - **Chế độ gõ lệnh trực tiếp (Interactive mode):** Có dấu nhắc \`>>>\`, kiểm tra nhanh từng lệnh.
  - **Chế độ soạn thảo (Script mode):** Viết chương trình hoàn chỉnh lưu tệp \`.py\` và nhấn Run để chạy.

### 3. Kiểu dữ liệu cơ bản & Lệnh xuất \`print()\`
- **Kiểu dữ liệu:** \`int\` (số nguyên: \`5\`, \`-5\`), \`float\` (số thực: \`2.5\`), \`bool\` (logic: \`True\`, \`False\`), \`str\` (xâu kí tự: \`"xin chào"\`). Dùng hàm \`type(x)\` để kiểm tra kiểu dữ liệu.
- **Lệnh xuất \`print(object, sep=' ', end='\\n')\`:**
  - \`sep\`: Kí tự phân cách giữa các giá trị (mặc định là dấu cách \`' '\`).
  - \`end\`: Kí tự kết thúc dòng (mặc định là xuống dòng \`'\\n'\`).
- **Phép toán trên xâu:** Ghép nối xâu (\`+\`) và lặp xâu (\`*\`, ví dụ \`'Hi' * 5\`).
- **Định dạng làm tròn 2 chữ số thập phân:** \`f"{a:.2f}"\`, \`round(a, 2)\`, hoặc \`'{:.2f}'.format(a)\`.`,
    theoryMarkdownEn: `### 1. Classification of Programming Languages
- **Machine Language:** Binary code (\`0\` and \`1\`) executed directly by the CPU.
- **Assembly Language:** Mnemonic instructions (\`LDI\`, \`CLR\`, \`INC\`).
- **High-Level Language:** Close to human language (**Python**, C++, Java). Translated via an Interpreter or Compiler.

### 2. Basic Data Types & \`print()\` Statement
- **Core types:** \`int\`, \`float\`, \`bool\`, \`str\`. Check with \`type(x)\`.
- **Output syntax:** \`print(object, sep=' ', end='\\n')\`.`,
    sampleCode: `# Minh họa Bài 16: Lệnh print(), kiểu dữ liệu và phép lặp xâu
print("Xin chào học sinh lớp 10!")
print("13 + 10*3/2 - 3*2 =", 13 + 10 * 3 / 2 - 3 * 2)

# Nối xâu (+) và lặp xâu (*)
print("Lớp " + "10A1 - " + "Hi! " * 3)

# Kiểm tra kiểu dữ liệu bằng hàm type()
a = 5.5
print("Kiểu dữ liệu của a là:", type(a))`,
    sampleOutput: [
      "Xin chào học sinh lớp 10!",
      "13 + 10*3/2 - 3*2 = 22.0",
      "Lớp 10A1 - Hi! Hi! Hi! ",
      "Kiểu dữ liệu của a là: <class 'float'>",
    ],
  },
  {
    id: "bai_17",
    code: "BÀI 17",
    glyph: "◆",
    titleVi: "Bài 17: Biến và Lệnh gán",
    titleEn: "Lesson 17: Variables and Assignment Statements",
    summaryVi:
      "Khái niệm biến, quy tắc đặt tên biến, từ khóa Python, các phép toán số học (+, -, *, /, //, %, **) và thư viện toán học math.",
    summaryEn:
      "Variables, naming rules, Python keywords, arithmetic operators (+, -, *, /, //, %, **), and the math module.",
    keyPointsVi: [
      "Cú pháp gán: <biến> = <giá trị> hoặc gán nhiều biến a, b = 3.5, 10; hoán đổi giá trị: a, b = b, a.",
      "Quy tắc tên biến: Chỉ gồm chữ cái, chữ số (0-9) và dấu gạch dưới (_); KHÔNG bắt đầu bằng chữ số; phân biệt hoa/thường.",
      "Phép toán số học: // (chia lấy phần nguyên), % (chia lấy phần dư), ** (lũy thừa x^y).",
      "Thứ tự ưu tiên: Ngoặc tròn () -> Lũy thừa ** -> Nhân/Chia *, /, //, % -> Cộng/Trừ +, -.",
    ],
    theoryMarkdownVi: `### 1. Khái niệm Biến và Lệnh gán
- **Biến:** Là tên (định danh) của một vùng nhớ dùng để lưu trữ giá trị và có thể thay đổi trong quá trình chạy chương trình.
- Trong Python **không cần khai báo kiểu dữ liệu trước**. Biến tự động nhận kiểu dữ liệu khi gán giá trị.
- **Cú pháp lệnh gán:** \`<biến> = <giá trị>\` hoặc gán đồng thời: \`x = y = 5\`, \`a, b = 3, 10\`.
- **Lệnh gán mở rộng:** \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`, \`//=\`, \`**=\`.

### 2. Quy tắc đặt tên biến
- Chỉ gồm chữ cái tiếng Anh, chữ số (\`0-9\`) và dấu gạch dưới (\`_\`).
- **Không bắt đầu bằng chữ số** (ví dụ \`12abc\` là sai).
- Phân biệt chữ hoa và chữ thường (\`a\` khác \`A\`).
- Không trùng với **Từ khóa (Keyword)** của Python (\`if\`, \`else\`, \`for\`, \`while\`, \`def\`, \`return\`, \`True\`, \`False\`, \`and\`, \`or\`, \`not\`, \`in\`...).

### 3. Các phép toán và Thư viện \`math\`
- **Số học:** \`+\` (cộng), \`-\` (trừ), \`*\` (nhân), \`/\` (chia thực), \`//\` (chia lấy nguyên), \`%\` (chia lấy dư), \`**\` (lũy thừa $x^y$).
- **So sánh:** \`>\`, \`<\`, \`==\`, \`!=\`, \`>=\`, \`<=\` (trả về \`True\` hoặc \`False\`).
- **Logic:** \`and\` (và), \`or\` (hoặc), \`not\` (phủ định).
- **Thư viện \`import math\`:** \`math.sqrt(x)\` ($\\sqrt{x}$), \`math.trunc(x)\` (lấy phần nguyên), \`math.fabs(x)\` (trị tuyệt đối số thực).`,
    theoryMarkdownEn: `### 1. Variables & Assignment
- Syntax: \`variable = value\` or multiple assignment \`a, b = 10, 20\`.
- Naming rules: Letters, digits, and underscore \`_\`; cannot start with a digit; case-sensitive.

### 2. Operators & \`math\` Module
- Division: \`/\` (float division), \`//\` (floor integer division), \`%\` (modulo remainder), \`**\` (exponentiation).`,
    sampleCode: `# Minh họa Bài 17: Đổi số giây sang Ngày, Giờ, Phút, Giây bằng // và %
ss = 684500

ngay = ss // 86400
con_lai = ss % 86400

gio = con_lai // 3600
con_lai = con_lai % 3600

phut = con_lai // 60
giay = con_lai % 60

print(f"{ss} giây = {ngay} ngày, {gio} giờ, {phut} phút, {giay} giây")`,
    sampleOutput: [
      "684500 giây = 7 ngày, 22 giờ, 8 phút, 20 giây",
    ],
  },
  {
    id: "bai_18",
    code: "BÀI 18",
    glyph: "●",
    titleVi: "Bài 18: Các câu lệnh vào ra đơn giản",
    titleEn: "Lesson 18: Simple Input and Output Statements",
    summaryVi:
      "Hàm nhập dữ liệu input(), các hàm ép kiểu int(), float(), str() và kỹ thuật nhập nhiều số trên cùng một dòng với map() và split().",
    summaryEn:
      "The input() function, type conversion functions int(), float(), str(), and reading multiple numbers on one line with map() and split().",
    keyPointsVi: [
      "Hàm input() luôn trả về dữ liệu kiểu xâu kí tự (str).",
      "Muốn tính toán số học phải ép kiểu: n = int(input()) hoặc x = float(input()).",
      "Nhập nhiều số trên cùng 1 dòng: a, b, c = map(float, input().split()).",
      "Lưu ý lỗi: int('12.5') hoặc int('10+2') sẽ báo lỗi ValueError.",
    ],
    theoryMarkdownVi: `### 1. Hàm nhập dữ liệu \`input()\`
- **Cú pháp:** \`<Tên biến> = input(<Dòng thông báo>)\`
- **Lưu ý cực kỳ quan trọng:** Giá trị trả về của hàm \`input()\` **luôn thuộc kiểu xâu kí tự (\`str\`)**. Nếu bạn nhập \`5\` vào \`x = input()\` rồi in \`2 * x\`, kết quả sẽ là \`'55'\` (lặp xâu) chứ không phải \`10\`!

### 2. Các hàm chuyển đổi kiểu dữ liệu (Ép kiểu)
- \`int(x)\`: Chuyển số thực hoặc xâu chứa số nguyên thành số nguyên (\`int("25") -> 25\`, \`int(12.6) -> 12\`).
- \`float(x)\`: Chuyển số nguyên hoặc xâu chứa số thực thành số thực (\`float("7.5") -> 7.5\`).
- \`str(x)\`: Chuyển kiểu dữ liệu khác thành xâu kí tự.
- **Kết hợp khi nhập số từ bàn phím:**
  - Nhập số nguyên: \`n = int(input())\`
  - Nhập số thực: \`x = float(input())\`

### 3. Kỹ thuật nhập nhiều số trên cùng một dòng
- Dùng kết hợp \`input()\`, \`.split()\` và hàm \`map()\`:
  - Nhập 3 số nguyên trên 1 dòng: \`a, b, c = map(int, input().split())\`
  - Nhập 3 cạnh tam giác (số thực) trên 1 dòng: \`a, b, c = map(float, input().split())\``,
    theoryMarkdownEn: `### 1. The \`input()\` Function & Type Casting
- \`input()\` always returns a string (\`str\`).
- Convert to integer with \`int(input())\` or float with \`float(input())\`.
- Read multiple numbers on a single line: \`a, b, c = map(float, input().split())\`.`,
    sampleCode: `# Minh họa Bài 18: Tính chu vi & diện tích tam giác theo công thức Heron
import math

a, b, c = 3.0, 4.0, 5.0
chu_vi = a + b + c
p = chu_vi / 2
dien_tich = math.sqrt(p * (p - a) * (p - b) * (p - c))

print(f"Chu vi = {chu_vi:.2f} | Diện tích = {dien_tich:.2f}")`,
    sampleOutput: ["Chu vi = 12.00 | Diện tích = 6.00"],
  },
  {
    id: "bai_19",
    code: "BÀI 19",
    glyph: "◐",
    titleVi: "Bài 19: Câu lệnh rẽ nhánh if",
    titleEn: "Lesson 19: Conditional Branching (if - elif - else)",
    summaryVi:
      "Cấu trúc rẽ nhánh if dạng thiếu, if - else dạng đủ, if - elif - else nối tiếp, quy tắc dấu hai chấm (:) và thụt lề khối lệnh.",
    summaryEn:
      "Conditional statements: simple if, if-else, chained if-elif-else, colon syntax, and block indentation rules.",
    keyPointsVi: [
      "Sau điều kiện của if, elif, else bắt buộc phải có dấu hai chấm (:).",
      "Khối lệnh bên trong nhánh phải viết thụt lề (1 Tab hoặc 4 dấu cách) và thẳng hàng nhau.",
      "Cấu trúc if - elif - else giúp kiểm tra lần lượt nhiều trường hợp (như tính tiền điện bậc thang, giải phương trình bậc 2).",
    ],
    theoryMarkdownVi: `### 1. Câu lệnh \`if\` dạng thiếu
\`\`\`python
if <điều kiện>:
    <Khối lệnh>
\`\`\`
- Nếu \`<điều kiện>\` đúng (\`True\`) thì thực hiện \`<Khối lệnh>\`, nếu sai (\`False\`) thì bỏ qua.

### 2. Câu lệnh \`if - else\` dạng đủ
\`\`\`python
if <điều kiện>:
    <Khối lệnh 1>
else:
    <Khối lệnh 2>
\`\`\`
- Từ khóa \`if\` và \`else\` phải viết thẳng lề trái. Sau \`if <điều kiện>\` và sau \`else\` bắt buộc có dấu hai chấm \`:\`.

### 3. Cấu trúc \`if - elif - else\` nối tiếp
\`\`\`python
if <điều kiện 1>:
    <khối lệnh 1>
elif <điều kiện 2>:
    <khối lệnh 2>
else:
    <khối lệnh 3>
\`\`\`
- Thường áp dụng cho bài toán phân loại học lực, tính tiền điện bậc thang, hoặc biện luận phương trình bậc hai theo $\\Delta = b^2 - 4ac$.`,
    theoryMarkdownEn: `### Conditional Statements (\`if\`, \`if-else\`, \`if-elif-else\`)
- Every condition header must end with a colon \`:\`.
- Statements inside each branch must be indented consistently (4 spaces).`,
    sampleCode: `# Minh họa Bài 19: Kiểm tra năm nhuận
nam = 2024
if (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0):
    print(f"Năm {nam} là NĂM NHUẬN")
else:
    print(f"Năm {nam} KHÔNG phải năm nhuận")`,
    sampleOutput: ["Năm 2024 là NĂM NHUẬN"],
  },
  {
    id: "bai_20",
    code: "BÀI 20",
    glyph: "▣",
    titleVi: "Bài 20: Câu lệnh lặp for",
    titleEn: "Lesson 20: For Loops and the range() Function",
    summaryVi:
      "Hàm tạo dãy số range(start, stop, step), vòng lặp với số lần biết trước for <biến> in <dãy>:, bài toán tính tổng, đếm ước và bài toán dân gian.",
    summaryEn:
      "The range(start, stop, step) function, definite iteration with for loops, summation, divisor counting, and classic math puzzles.",
    keyPointsVi: [
      "range(stop): tạo dãy số từ 0 đến stop - 1.",
      "range(start, stop): tạo dãy số từ start đến stop - 1.",
      "range(start, stop, step): tạo dãy số cách nhau một khoảng step (nếu step < 0 và start > stop sẽ tạo dãy giảm).",
      "Khi tính tích 1 * 2 * ... * n (n!), phải dùng range(1, n + 1) để không bị nhân với số 0.",
    ],
    theoryMarkdownVi: `### 1. Hàm \`range(start, stop, step)\`
- \`start\`: Giá trị bắt đầu (mặc định là \`0\`).
- \`stop\`: Giá trị kết thúc (**không bao gồm giá trị này**, dãy dừng tại \`stop - 1\` nếu \`step > 0\`).
- \`step\`: Bước nhảy (mặc định là \`1\`).
- **3 dạng viết:**
  - \`range(5)\` $\\rightarrow$ \`0, 1, 2, 3, 4\`
  - \`range(1, 6)\` $\\rightarrow$ \`1, 2, 3, 4, 5\`
  - \`range(2, 11, 2)\` $\\rightarrow$ \`2, 4, 6, 8, 10\`

### 2. Câu lệnh lặp \`for\`
\`\`\`python
for <biến lặp> in <chuỗi lặp>:
    <Khối lệnh>
\`\`\`
- Ở mỗi vòng lặp, \`<biến lặp>\` nhận lần lượt từng giá trị trong \`range()\`, xâu kí tự hoặc danh sách và thực hiện \`<Khối lệnh>\`.`,
    theoryMarkdownEn: `### \`range()\` and \`for\` Loops
- \`range(start, stop, step)\` generates integers from \`start\` up to \`stop - 1\`.
- \`for i in range(1, n + 1):\` iterates from \`1\` through \`n\`.`,
    sampleCode: `# Minh họa Bài 20: Bài toán dân gian "Vừa gà vừa chó, 36 con, 100 chân chẵn"
for ga in range(1, 36):
    cho = 36 - ga
    if 2 * ga + 4 * cho == 100:
        print(f"Số gà = {ga}, Số chó = {cho}")`,
    sampleOutput: ["Số gà = 22, Số chó = 14"],
  },
  {
    id: "bai_21",
    code: "BÀI 21",
    glyph: "◊",
    titleVi: "Bài 21: Câu lệnh lặp while",
    titleEn: "Lesson 21: Indefinite Loops with while",
    summaryVi:
      "Vòng lặp với số lần chưa biết trước while <điều kiện>:, cách tránh vòng lặp vô hạn, lệnh thoát break và thuật toán Euclid tìm UCLN.",
    summaryEn:
      "Indefinite loops with while, avoiding infinite loops, break statement, and Euclid's GCD algorithm.",
    keyPointsVi: [
      "while kiểm tra <điều kiện> TRƯỚC: nếu True thì thực hiện khối lệnh, lặp lại cho đến khi điều kiện False.",
      "Phải thay đổi biến điều kiện trong thân vòng lặp để tránh lặp vô hạn.",
      "Có thể dùng lệnh break để thoát ngay khỏi vòng lặp.",
      "3 cấu trúc lập trình cơ bản: Tuần tự, Rẽ nhánh (if), và Lặp (for, while).",
    ],
    theoryMarkdownVi: `### 1. Câu lệnh lặp \`while\`
\`\`\`python
while <điều kiện>:
    <Khối lệnh>
\`\`\`
- **Nguyên tắc hoạt động:** Kiểm tra \`<điều kiện>\` **trước**. Nếu đúng (\`True\`), thực hiện \`<Khối lệnh>\` rồi quay lại kiểm tra điều kiện. Khi \`<điều kiện>\` nhận giá trị \`False\` thì kết thúc vòng lặp.

### 2. Lưu ý quan trọng
- Phải có câu lệnh làm thay đổi giá trị biến điều kiện bên trong thân vòng lặp để vòng lặp tiến tới điểm dừng (tránh **vòng lặp vô hạn**).
- Lệnh \`break\` dùng để thoát ngay lập tức khỏi vòng lặp \`while\` hoặc \`for\`.`,
    theoryMarkdownEn: `### The \`while\` Loop
- Evaluates the condition before each iteration and continues as long as the condition is \`True\`.
- Always update the loop variable inside the body to prevent infinite loops.`,
    sampleCode: `# Minh họa Bài 21: Tìm Ước chung lớn nhất (UCLN) bằng vòng lặp while
a, b = 36, 24
while a != b:
    if a > b:
        a = a - b
    else:
        b = b - a
print("UCLN là:", a)`,
    sampleOutput: ["UCLN là: 12"],
  },
  {
    id: "bai_22_23",
    code: "BÀI 22 & 23",
    glyph: "◇",
    titleVi: "Bài 22 & 23: Kiểu dữ liệu Danh sách (List)",
    titleEn: "Lessons 22 & 23: Lists and List Operations",
    summaryVi:
      "Khai báo list, truy cập chỉ số (0 đến len-1), cắt danh sách (slicing), duyệt list và các phương thức append, insert, remove, sort, reverse, sum, max, min.",
    summaryEn:
      "List creation, indexing, slicing, iteration, built-in functions (len, sum, max, min), and list methods (append, insert, remove, sort, reverse).",
    keyPointsVi: [
      "Chỉ số (index) của danh sách L bắt đầu từ 0 đến len(L) - 1 (hoặc từ -1 về -len(L) nếu tính từ cuối).",
      "Cắt danh sách: A[start:stop] lấy các phần tử từ chỉ số start đến stop - 1.",
      "Hàm tích hợp: len(L) (độ dài), sum(L) (tổng), max(L) (lớn nhất), min(L) (nhỏ nhất).",
      "Phương thức thông dụng: L.append(x) (thêm vào cuối), L.insert(vt, x) (chèn), L.remove(x) (xóa giá trị đầu tiên), L.sort() (sắp xếp tăng dần).",
    ],
    theoryMarkdownVi: `### 1. Khái niệm và Truy cập Danh sách (\`list\`)
- Khởi tạo: \`A = [10, 20, 30, 40]\` hoặc danh sách rỗng \`L = []\`.
- **Chỉ số (Index):** Đánh số từ trái sang phải bắt đầu từ \`0\` đến \`len(A) - 1\`.
- **Cắt danh sách (Slicing):** \`A[start:stop]\` lấy các phần tử từ chỉ số \`start\` đến \`stop - 1\`.
- **Toán tử:** Ghép nối 2 danh sách (\`+\`), lặp danh sách (\`*\`), kiểm tra tồn tại (\`x in A\`).

### 2. Các hàm và phương thức làm việc với Danh sách
- **Hàm có sẵn:** \`len(L)\`, \`sum(L)\`, \`max(L)\`, \`min(L)\`.
- **Từ khóa xóa theo chỉ số:** \`del L[i]\` hoặc \`del L[start:stop]\`.
- **Các phương thức của \`list\`:**
  - \`L.append(x)\`: Thêm phần tử \`x\` vào **cuối** danh sách.
  - \`L.insert(vt, x)\`: Chèn \`x\` vào vị trí chỉ số \`vt\`.
  - \`L.remove(x)\`: Xóa phần tử **đầu tiên** có giá trị bằng \`x\`.
  - \`L.clear()\`: Xóa toàn bộ danh sách thành \`[]\`.
  - \`L.count(x)\`: Đếm số lần xuất hiện của \`x\`.
  - \`L.index(x)\`: Tìm vị trí xuất hiện đầu tiên của \`x\`.
  - \`L.sort()\`: Sắp xếp tăng dần. \`L.reverse()\`: Đảo ngược danh sách.`,
    theoryMarkdownEn: `### Lists (\`list\`) & Methods
- Zero-indexed mutable sequence: \`A = [7, -3, 5, 8]\`.
- Built-ins: \`len(A)\`, \`sum(A)\`, \`max(A)\`, \`min(A)\`.
- Methods: \`append(x)\`, \`insert(i, x)\`, \`remove(x)\`, \`sort()\`, \`reverse()\`.`,
    sampleCode: `# Minh họa Bài 22 & 23: Thao tác với danh sách số nguyên
A = [7, -3, 5, 12, -6, 8]
so_duong = [x for x in A if x > 0]

print("Danh sách số dương:", so_duong)
print("Tổng các số dương:", sum(so_duong))
print("Giá trị lớn nhất:", max(A), "tại vị trí:", A.index(max(A)))`,
    sampleOutput: [
      "Danh sách số dương: [7, 5, 12, 8]",
      "Tổng các số dương: 32",
      "Giá trị lớn nhất: 12 tại vị trí: 3",
    ],
  },
  {
    id: "bai_24_25",
    code: "BÀI 24 & 25",
    glyph: "◆",
    titleVi: "Bài 24 & 25: Xâu kí tự (String) và Xử lý xâu",
    titleEn: "Lessons 24 & 25: Strings and String Processing",
    summaryVi:
      "Tính bất biến (Immutable) của xâu kí tự, duyệt xâu, cắt xâu và các phương thức find(), split(), join(), replace(), upper(), lower(), count().",
    summaryEn:
      "String immutability, string traversal, slicing, and methods find(), split(), join(), replace(), upper(), lower(), count().",
    keyPointsVi: [
      "Xâu kí tự có tính BẤT BIẾN (Immutable): không thể gán trực tiếp S[0] = 'A'.",
      "Đảo ngược xâu nhanh bằng slicing: S[::-1].",
      "s.find(sub): trả về vị trí đầu tiên của sub trong s (nếu không có trả về -1).",
      "s.split(): tách xâu thành danh sách các từ; ' '.join(ds): nối danh sách các từ thành xâu.",
      "Chuẩn hóa xóa dấu cách thừa: ' '.join(S.split()).",
    ],
    theoryMarkdownVi: `### 1. Đặc điểm của Xâu kí tự (\`str\`)
- Xâu kí tự là dãy các kí tự Unicode đặt trong dấu nháy đơn \`'...'\` hoặc nháy kép \`"..."\`.
- Truy cập từng kí tự qua chỉ số từ \`0\` đến \`len(S) - 1\`.
- **Tính bất biến (Immutable):** Không thể thay đổi trực tiếp từng kí tự bằng lệnh gán (ví dụ \`S[0] = "A"\` sẽ báo lỗi \`TypeError\`).

### 2. Các phương thức xử lý xâu trọng tâm
- \`len(s)\`: Độ dài của xâu.
- \`s[m:n]\`: Cắt xâu con từ vị trí \`m\` đến \`n - 1\`. Đảo ngược xâu: \`s[::-1]\`.
- \`s.find(sub)\`: Tìm vị trí xuất hiện **đầu tiên** của \`sub\` trong \`s\` (trả về \`-1\` nếu không tìm thấy).
- \`s.split()\`: Tách xâu \`s\` thành **danh sách (\`list\`)** các từ.
- \`" ".join(danh_sach)\`: Nối các phần tử xâu trong danh sách thành một xâu duy nhất.
- \`s.upper()\` / \`s.lower()\`: Chuyển sang chữ IN HOA / chữ thường.
- \`s.count(sub)\`: Đếm số lần xuất hiện của \`sub\`.
- \`s.replace(cu, moi)\`: Thay thế tất cả xâu con \`cu\` bằng \`moi\`.`,
    theoryMarkdownEn: `### Strings (\`str\`) & String Methods
- Strings are immutable sequences of Unicode characters.
- Essential methods: \`find()\`, \`split()\`, \`join()\`, \`replace()\`, \`upper()\`, \`lower()\`, \`count()\`.`,
    sampleCode: `# Minh họa Bài 24 & 25: Chuẩn hóa xâu họ tên và tách Họ, Đệm, Tên
ho_ten_tho = "   Nguyễn   Xuân   Quang   Lâm   "
cac_tu = ho_ten_tho.split()
chuan_hoa = " ".join(cac_tu)

print("Xâu chuẩn hóa:", chuan_hoa)
print("Họ:", cac_tu[0])
print("Đệm:", " ".join(cac_tu[1:-1]))
print("Tên:", cac_tu[-1])`,
    sampleOutput: [
      "Xâu chuẩn hóa: Nguyễn Xuân Quang Lâm",
      "Họ: Nguyễn",
      "Đệm: Xuân Quang",
      "Tên: Lâm",
    ],
  },
  {
    id: "bai_26_28",
    code: "BÀI 26, 27 & 28",
    glyph: "●",
    titleVi: "Bài 26, 27 & 28: Hàm trong Python & Phạm vi của biến",
    titleEn: "Lessons 26–28: Functions, Parameters & Variable Scope",
    summaryVi:
      "Cách định nghĩa hàm với def và return, phân biệt Tham số (Parameters) và Đối số (Arguments), biến cục bộ (Local), biến toàn cục (Global) và từ khóa global.",
    summaryEn:
      "Defining functions with def and return, Parameters vs. Arguments, Local vs. Global variables, and the global keyword.",
    keyPointsVi: [
      "Cú pháp: def <tên_hàm>(<danh_sách_tham_số>): ... return <giá_trị>.",
      "Tham số (Parameters) khai báo khi định nghĩa hàm; Đối số (Arguments) là giá trị truyền vào khi gọi hàm.",
      "Biến địa phương (Local) tạo trong hàm chỉ có tác dụng trong hàm đó.",
      "Muốn thay đổi biến toàn cục (Global) bên trong hàm, phải khai báo từ khóa global <tên_biến>.",
    ],
    theoryMarkdownVi: `### 1. Thiết lập Hàm tự định nghĩa (\`def\`)
\`\`\`python
def <tên hàm>(<danh sách tham số>):
    <Khối lệnh>
    return <giá trị>
\`\`\`
- **Lợi ích:** Chia bài toán lớn thành các chương trình con độc lập, dễ đọc, tái sử dụng nhiều lần và dễ sửa lỗi.

### 2. Phân biệt Tham số và Đối số
- **Tham số (Parameters):** Các biến liệt kê trong dòng \`def f(a, b):\`.
- **Đối số (Arguments):** Các giá trị thực tế truyền vào khi gọi hàm \`f(10, 20)\`.

### 3. Phạm vi của biến (Variable Scope)
- **Biến địa phương (Local variable):** Khai báo bên trong hàm, chỉ tồn tại khi hàm chạy.
- **Biến tổng thể (Global variable):** Khai báo ở chương trình chính (bên ngoài mọi hàm).
- Muốn thay đổi trực tiếp giá trị của biến tổng thể từ bên trong hàm, bắt buộc dùng từ khóa \`global <tên_biến>\` ở đầu hàm.`,
    theoryMarkdownEn: `### Functions, Parameters & Scope
- Define functions with \`def name(params):\` and return values with \`return\`.
- Variables created inside a function are local unless declared with \`global\`.`,
    sampleCode: `# Minh họa Bài 26-28: Viết hàm kiểm tra số nguyên tố
def la_so_nguyen_to(n: int) -> bool:
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

cac_snt = [x for x in range(1, 30) if la_so_nguyen_to(x)]
print("Các số nguyên tố nhỏ hơn 30:", cac_snt)`,
    sampleOutput: [
      "Các số nguyên tố nhỏ hơn 30: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]",
    ],
  },
  {
    id: "bai_29_31",
    code: "BÀI 29, 30 & 31",
    glyph: "▣",
    titleVi: "Bài 29, 30 & 31: Nhận biết lỗi, Kiểm thử, Gỡ lỗi & Thực hành tổng hợp",
    titleEn: "Lessons 29–31: Error Types, Testing, Debugging & Comprehensive Practice",
    summaryVi:
      "Phân biệt 3 nhóm lỗi (SyntaxError, Runtime Exceptions, Logical Error), các mã lỗi thường gặp (NameError, TypeError, ValueError, IndexError, ZeroDivisionError) và phương pháp gỡ lỗi.",
    summaryEn:
      "Three categories of errors (Syntax, Runtime Exceptions, Logical), common exception codes, testing with edge cases, and debugging.",
    keyPointsVi: [
      "3 loại lỗi: Lỗi cú pháp (SyntaxError), Lỗi ngoại lệ khi chạy (Runtime Exceptions), Lỗi logic/ngữ nghĩa (Logical Error - chạy được nhưng kết quả sai).",
      "Bảng mã lỗi: IndentationError (sai thụt lề), ZeroDivisionError (chia cho 0), IndexError (vượt chỉ số), NameError (tên biến chưa khai báo), TypeError (sai kiểu dữ liệu), ValueError (sai giá trị ép kiểu như int('abc')).",
      "4 cách gỡ lỗi: Đọc Traceback, tạo bộ Test vùng biên, dùng print() in biến trung gian, đặt Breakpoint.",
    ],
    theoryMarkdownVi: `### 1. Phân loại 3 nhóm lỗi chương trình
1. **Lỗi cú pháp (\`SyntaxError\`):** Viết sai quy tắc ngữ pháp Python (quên dấu \`:\`, đặt tên biến bắt đầu bằng số, thiếu ngoặc). Chương trình báo lỗi ngay không chạy được.
2. **Lỗi ngoại lệ (\`Exceptions\` / Runtime Error):** Cú pháp đúng nhưng phát sinh lỗi khi đang chạy làm chương trình dừng đột ngột.
3. **Lỗi ngữ nghĩa / Lỗi logic (Logical Error):** Chương trình chạy bình thường nhưng **kết quả đầu ra bị sai** so với yêu cầu bài toán.

### 2. Bảng các Mã lỗi ngoại lệ thường gặp
- \`IndentationError\`: Thụt lề các dòng lệnh không thẳng hàng hoặc sai vị trí.
- \`ZeroDivisionError\`: Chia cho số \`0\` (\`/ 0\`, \`// 0\`, \`% 0\`).
- \`IndexError\`: Truy cập chỉ số danh sách/xâu vượt quá phạm vi \`0 .. len-1\`.
- \`NameError\`: Sử dụng tên biến hoặc hàm chưa được khai báo (hoặc viết hoa sai như \`Print()\`).
- \`TypeError\`: Sai kiểu dữ liệu (lấy xâu cộng với số, dùng số thực làm chỉ số \`A[1.5]\`).
- \`ValueError\`: Giá trị truyền vào hàm không hợp lệ dù đúng kiểu (ví dụ \`int("1.55")\` hoặc \`int("abc")\`).

### 3. Phương pháp Kiểm thử & Gỡ lỗi (Testing & Debugging)
- Quan sát thông báo lỗi (Traceback) để biết dòng bị lỗi.
- Thiết kế các **bộ Test cases** bao phủ cả **dữ liệu vùng biên**.
- Dùng lệnh \`print()\` in giá trị biến trung gian hoặc dùng công cụ **Breakpoint** chạy từng bước.`,
    theoryMarkdownEn: `### Error Classification & Debugging
- **SyntaxError**, **Runtime Exceptions** (\`ZeroDivisionError\`, \`IndexError\`, \`NameError\`, \`TypeError\`, \`ValueError\`), and **Logical Errors**.`,
    sampleCode: `# Minh họa Bài 29-31: Sửa lỗi thuật toán Sắp xếp chèn (Insertion Sort)
A = [10, 1, 5, 2, 8, 0, 4]

# Đã sửa lỗi logic: duyệt từ 1 đến len(A) và lặp while j > 0
for i in range(1, len(A)):
    j = i
    while j > 0 and A[j] < A[j - 1]:
        A[j], A[j - 1] = A[j - 1], A[j]
        j = j - 1

print("Dãy sau khi sắp xếp tăng dần:", A)`,
    sampleOutput: [
      "Dãy sau khi sắp xếp tăng dần: [0, 1, 2, 4, 5, 8, 10]",
    ],
  },
];

