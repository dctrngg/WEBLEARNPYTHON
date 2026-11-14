import {
  Assignment,
  DifficultyLevel,
  Submission,
  UserProfile,
} from "../types/ide";
import { LanguageMode } from "../contexts/LanguageContext";

export const GRADE_10_CLASSES: string[] = [
  "10A7",
  "10A12",
  "10A13",
  "10A14",
  "10A15",
  "10A16",
];

export const INITIAL_USERS: UserProfile[] = [
  {
    uid: "usr_an10a7",
    username: "an10a7",
    email: "an10a7@python.edu.vn",
    displayName: "Nguyễn Minh An",
    className: "10A7",
    password: "123456",
    role: "student",
    createdAt: "2026-11-10T08:00:00.000Z",
  },
  {
    uid: "usr_admin",
    username: "admin",
    email: "admin@python.edu.vn",
    displayName: "Giáo viên Tin học 10",
    className: "GV",
    password: "admin123",
    role: "instructor",
    createdAt: "2026-11-01T08:00:00.000Z",
  },
  {
    uid: "usr_bao10a12",
    username: "bao10a12",
    email: "bao10a12@python.edu.vn",
    displayName: "Trần Gia Bảo",
    className: "10A12",
    password: "123456",
    role: "student",
    createdAt: "2026-11-11T09:30:00.000Z",
  },
  {
    uid: "usr_ha10a13",
    username: "ha10a13",
    email: "ha10a13@python.edu.vn",
    displayName: "Lê Thu Hà",
    className: "10A13",
    password: "123456",
    role: "student",
    createdAt: "2026-11-12T14:15:00.000Z",
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  // ==================== BÀI 16 ====================
  {
    id: "asgn_16_1",
    lessonId: "bai_16",
    glyph: "◇",
    title: "Bài 16.1: In hình chữ nhật rỗng bằng phép nối & lặp xâu",
    difficulty: "Beginner",
    description: `### Đề bài (Thực hành Bài 4 & 5 - Bài 16 SGK Tin học 10)
Viết chương trình nhập vào chiều rộng \`w\` (số dấu \`*\` trên 1 hàng ngang, $w \\ge 3$) và in ra hình chữ nhật rỗng có **4 dòng** bằng các dấu \`*\`, kết hợp phép lặp xâu (\`*\`) và nối xâu (\`+\`).

### Dữ liệu vào (Input)
- Một dòng chứa số nguyên \`w\` (ví dụ \`w = 12\` như trong SGK).

### Kết quả ra (Output)
- Dòng 1 và dòng 4: gồm \`w\` dấu \`*\` liền nhau.
- Dòng 2 và dòng 3: đầu và cuối là dấu \`*\`, ở giữa có \`w - 2\` dấu cách \`' '\`.

### 💡 Gợi ý cách làm
- Dòng đặc: \`"*" * w\`
- Dòng rỗng ở giữa: \`"*" + " " * (w - 2) + "*"\`
`,
    starterCode: `# Bài 16.1: In hình chữ nhật rỗng kích thước w x 4 bằng dấu *
`,
    testCases: [
      {
        input: "12",
        expectedOutput: "************\n*          *\n*          *\n************",
        isHidden: false,
      },
      {
        input: "6",
        expectedOutput: "******\n*    *\n*    *\n******",
        isHidden: false,
      },
      {
        input: "4",
        expectedOutput: "****\n*  *\n*  *\n****",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-10T08:00:00.000Z",
  },
  {
    id: "asgn_16_2",
    lessonId: "bai_16",
    glyph: "◇",
    title: "Bài 16.2: Tính tiền lãi ngân hàng (Vận dụng 3 - Bài 16)",
    difficulty: "Beginner",
    description: `### Đề bài (Vận dụng 3 - Bài 16 SGK Tin học 10)
Bạn An gửi ngân hàng số tiền gốc \`P\` (vnđ) với lãi suất \`0.8%\` mỗi tháng (tức là \`0.008\`). Hãy viết chương trình đọc vào số tiền gửi \`P\`, tính và in ra **Tiền lãi sau 1 tháng** và **Tổng tiền cả gốc lẫn lãi** (ép kiểu thành số nguyên \`int\`).

### Dữ liệu vào (Input)
- Một số nguyên \`P\` là số tiền gửi (ví dụ: \`5000000\`).

### Kết quả ra (Output)
- In trên 1 dòng theo mẫu: \`LAI=<tiền_lãi> | TONG=<tổng_tiền>\`

### 💡 Gợi ý cách làm
- \`tien_lai = int(P * 0.008)\`
- \`tong_tien = P + tien_lai\`
`,
    starterCode: `# Bài 16.2: Tính tiền lãi gửi ngân hàng (lãi suất 0.8%/tháng)
`,
    testCases: [
      {
        input: "5000000",
        expectedOutput: "LAI=40000 | TONG=5040000",
        isHidden: false,
      },
      {
        input: "10000000",
        expectedOutput: "LAI=80000 | TONG=10080000",
        isHidden: false,
      },
      {
        input: "2500000",
        expectedOutput: "LAI=20000 | TONG=2520000",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-10T08:10:00.000Z",
  },
  {
    id: "asgn_16_3",
    lessonId: "bai_16",
    glyph: "●",
    title: "Bài 16.3: Tính tiền lãi ngân hàng của bạn An (Luyện tập Bài 16)",
    difficulty: "Beginner",
    description: `### Đề bài (Luyện tập Bài 3 - Bài 16 SGK Tin học 10)
Bạn An có số tiền 5,000,000 VNĐ gửi vào ngân hàng với mức lãi suất 0.8%/tháng. Hãy viết chương trình hiển thị ra màn hình thông tin gửi tiết kiệm và tiền lãi theo đúng định dạng mẫu bên dưới:

\`\`\`text
Tên người gửi: An
Số tiền gửi:  5000000 vnđ
Lãi suất/tháng: 0.8%
Tiền lãi:  40000.0
\`\`\`

*Tiền lãi được tính theo công thức: \`5000000 * 0.008\`.*

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím.

### Kết quả ra (Output)
- In ra màn hình đúng 4 dòng thông tin theo mẫu.`,
    starterCode: `# Bài 16.3: Tính tiền lãi ngân hàng của bạn An
`,
    testCases: [
      {
        input: "",
        expectedOutput: "Tên người gửi: An\nSố tiền gửi:  5000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi:  40000.0",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:00:00.000Z",
  },
  {
    id: "asgn_16_4",
    lessonId: "bai_16",
    glyph: "◆",
    title: "Bài 16.4: Tính thời gian chạy xe trên cao tốc Hà Nội – Lào Cai",
    difficulty: "Beginner",
    description: `### Đề bài (Luyện tập Bài 4 - Bài 16 SGK Tin học 10)
Đường cao tốc Hà Nội – Lào Cai (kí hiệu CT.05) có chiều dài 264 km. Một ô tô chạy với tốc độ trung bình toàn tuyến là 70 km/h. Em hãy dùng ngôn ngữ lập trình Python để tính và in ra thời gian ô tô đó đi hết đường cao tốc Hà Nội – Lào Cai (tính bằng giờ).

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím.

### Kết quả ra (Output)
- In ra thời gian ô tô đi hết tuyến đường (tính bằng giờ).`,
    starterCode: `# Bài 16.4: Tính thời gian đi trên đường cao tốc
`,
    testCases: [
      {
        input: "",
        expectedOutput: "3.7714285714285714",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:05:00.000Z",
  },
  {
    id: "asgn_16_5",
    lessonId: "bai_16",
    glyph: "▣",
    title: "Bài 16.5: Dự báo sản lượng điện quốc gia năm 2021",
    difficulty: "Beginner",
    description: `### Đề bài (Luyện tập Bài 5 - Bài 16 SGK Tin học 10)
Năm 2020 nước ta sản xuất được 247 tỉ kWh điện. Sản lượng điện của nước ta được dự báo sẽ tiếp tục tăng nhanh với tốc độ trung bình là 8.6%/năm. Em hãy viết chương trình Python để tính và in ra sản lượng điện của nước ta sản xuất được trong năm 2021 theo dự báo (tính bằng tỉ kWh).

*Công thức: \`247 * (1 + 0.086)\`*

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím.

### Kết quả ra (Output)
- In ra sản lượng điện dự báo trong năm 2021.`,
    starterCode: `# Bài 16.5: Dự báo sản lượng điện quốc gia
`,
    testCases: [
      {
        input: "",
        expectedOutput: "268.2422",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:10:00.000Z",
  },
  {
    id: "asgn_16_6",
    lessonId: "bai_16",
    glyph: "◊",
    title: "Bài 16.6: In bảng nhân 7 với các số tự nhiên từ 0 đến 9",
    difficulty: "Beginner",
    description: `### Đề bài (Luyện tập Bài 6 - Bài 16 SGK Tin học 10)
Viết chương trình in ra bảng nhân 7 với các số tự nhiên nhỏ hơn 10 (từ 0 đến 9).

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím.

### Kết quả ra (Output)
- In ra bảng nhân 7 gồm 10 dòng theo định dạng chuẩn: \`7 x 0 = 0\`, \`7 x 1 = 7\`, ..., \`7 x 9 = 63\`.`,
    starterCode: `# Bài 16.6: Bảng nhân 7
`,
    testCases: [
      {
        input: "",
        expectedOutput: "7 x 0 = 0\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:15:00.000Z",
  },

  // ==================== BÀI 17 ====================
  {
    id: "asgn_17_1",
    lessonId: "bai_17",
    glyph: "◆",
    title: "Bài 17.1: Tính giá trị biểu thức đại số (Thực hành Bài 17)",
    difficulty: "Beginner",
    description: `### Đề bài (Thực hành Nhiệm vụ 1c - Bài 17 SGK Tin học 10)
Cho hai số nguyên \`x\` và \`y\`. Hãy viết chương trình tính giá trị của biểu thức toán học:
$$A = (x + y)(x^2 + y^2 - 1)$$

### Dữ liệu vào (Input)
- Dòng 1: Số nguyên \`x\`.
- Dòng 2: Số nguyên \`y\`.

### Kết quả ra (Output)
- In ra giá trị của biểu thức \`A\`.

### 💡 Gợi ý cách làm
- Trong Python, phép lũy thừa $x^2$ viết là \`x**2\`.
- Công thức: \`A = (x + y) * (x**2 + y**2 - 1)\`
`,
    starterCode: `# Bài 17.1: Tính biểu thức (x + y)(x^2 + y^2 - 1)
`,
    testCases: [
      {
        input: "2\n5",
        expectedOutput: "196",
        isHidden: false,
      },
      {
        input: "1\n2",
        expectedOutput: "12",
        isHidden: false,
      },
      {
        input: "3\n4",
        expectedOutput: "168",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-10T09:00:00.000Z",
  },
  {
    id: "asgn_17_2",
    lessonId: "bai_17",
    glyph: "◆",
    title: "Bài 17.2: Bài toán đổi Giây sang Ngày, Giờ, Phút, Giây",
    difficulty: "Beginner",
    description: `### Đề bài (Vận dụng - Bài 17 SGK Tin học 10)
Cho trước số giây \`ss\` (ví dụ \`ss = 684500\`). Hãy sử dụng phép chia lấy phần nguyên \`//\` và phép chia lấy phần dư \`%\` để đổi \`ss\` sang số **ngày, giờ, phút, giây**.
Biết rằng:
- $1\\text{ ngày} = 86400\\text{ giây}$
- $1\\text{ giờ} = 3600\\text{ giây}$
- $1\\text{ phút} = 60\\text{ giây}$

### Dữ liệu vào (Input)
- Một số nguyên \`ss\` là tổng số giây.

### Kết quả ra (Output)
- In theo đúng định dạng: \`<ngay> ngay <gio> gio <phut> phut <giay> giay\`
`,
    starterCode: `# Bài 17.2: Đổi số giây sang Ngày, Giờ, Phút, Giây
`,
    testCases: [
      {
        input: "684500",
        expectedOutput: "7 ngay 22 gio 8 phut 20 giay",
        isHidden: false,
      },
      {
        input: "90061",
        expectedOutput: "1 ngay 1 gio 1 phut 1 giay",
        isHidden: false,
      },
      {
        input: "3665",
        expectedOutput: "0 ngay 1 gio 1 phut 5 giay",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-10T09:10:00.000Z",
  },
  {
    id: "asgn_17_3",
    lessonId: "bai_17",
    glyph: "●",
    title: "Bài 17.3: Thực hiện các phép tính và biểu thức số học cơ bản",
    difficulty: "Beginner",
    description: `### Đề bài (Nhiệm vụ 1 - Bài 17 SGK Tin học 10)
Thực hiện các phép tính sau trong môi trường lập trình Python:
- **a)** $(1 + 2 + 3 + ... + 10)^3$
- **b)** $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} + \\frac{1}{5}$
- **c)** Lệnh gán $x = 2$, $y = 5$ rồi tính giá trị biểu thức $(x + y)(x^2 + y^2 - 1)$
- **d)** Lệnh gán $a = 2$, $b = 3$, $c = 4$ rồi tính giá trị biểu thức $(a + b + c)(a + b - c)$

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím.

### Kết quả ra (Output)
- In ra giá trị kết quả của từng câu a, b, c, d trên 4 dòng riêng biệt theo đúng thứ tự.`,
    starterCode: `# Bài 17.3: Thực hiện các phép tính cơ bản
`,
    testCases: [
      {
        input: "",
        expectedOutput: "166375\n1.2833333333333332\n196\n9",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:20:00.000Z",
  },
  {
    id: "asgn_17_4",
    lessonId: "bai_17",
    glyph: "◆",
    title: "Bài 17.4: Tính chu vi và diện tích hình tròn (với R = 5, Pi = 3.14)",
    difficulty: "Beginner",
    description: `### Đề bài (Nhiệm vụ 2 - Bài 17 SGK Tin học 10)
Gán giá trị cho biến \`R = 5\` là bán kính hình tròn, hằng số \`Pi = 3.14\`.
Hãy viết chương trình tính và in ra kết quả theo đúng mẫu:

\`\`\`text
Chu vi hình tròn là: <giá trị chu vi>
Diện tích hình tròn là: <giá trị diện tích>
\`\`\`

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím (dùng \`R = 5\`, \`Pi = 3.14\`).

### Kết quả ra (Output)
- In ra đúng 2 dòng như định dạng mẫu.`,
    starterCode: `# Bài 17.4: Tính chu vi và diện tích hình tròn
`,
    testCases: [
      {
        input: "",
        expectedOutput: "Chu vi hình tròn là: 31.400000000000002\nDiện tích hình tròn là: 78.5",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:25:00.000Z",
  },
  {
    id: "asgn_17_5",
    lessonId: "bai_17",
    glyph: "▣",
    title: "Bài 17.5: Đổi số giây mẫu ss = 684500 sang ngày, giờ, phút, giây",
    difficulty: "Intermediate",
    description: `### Đề bài (Vận dụng - Bài 17 SGK Tin học 10)
Viết các lệnh để thực hiện việc đổi số giây \`ss = 684500\` cho trước sang số ngày, giờ, phút, giây rồi in kết quả ra màn hình theo đúng định dạng:

\`\`\`text
684500 giây = 7 ngày 22 giờ 8 phút 20 giây
\`\`\`

### 💡 Gợi ý thuật toán
- \`1 ngày = 86400 giây\`, \`1 giờ = 3600 giây\`, \`1 phút = 60 giây\`
- Dùng phép chia lấy phần nguyên \`//\` và chia lấy phần dư \`%\`:
  - \`ngay = ss // 86400\`, \`du_ngay = ss % 86400\`
  - \`gio = du_ngay // 3600\`, \`du_gio = du_ngay % 3600\`
  - \`phut = du_gio // 60\`, \`giay = du_gio % 60\`

### Dữ liệu vào (Input)
- Không có dữ liệu vào từ bàn phím.

### Kết quả ra (Output)
- In ra 1 dòng theo đúng cú pháp mẫu.`,
    starterCode: `# Bài 17.5: Đổi số giây sang ngày, giờ, phút, giây
`,
    testCases: [
      {
        input: "",
        expectedOutput: "684500 giây = 7 ngày 22 giờ 8 phút 20 giây",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:30:00.000Z",
  },

  // ==================== BÀI 18 ====================
  {
    id: "asgn_18_1",
    lessonId: "bai_18",
    glyph: "●",
    title: "Bài 18.1: Tính Chu vi & Diện tích Tam giác (Công thức Heron)",
    difficulty: "Beginner",
    description: `### Đề bài (Vận dụng 2 - Bài 18 SGK Tin học 10)
Nhập 3 số thực dương \`a, b, c\` trên **cùng một dòng** (thỏa mãn 3 cạnh của một tam giác). Hãy tính và in ra **Chu vi** và **Diện tích** tam giác theo công thức Heron:
$$p = \\frac{a + b + c}{2}, \\quad S = \\sqrt{p(p - a)(p - b)(p - c)}$$

### Dữ liệu vào (Input)
- Một dòng gồm 3 số thực \`a b c\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- In theo mẫu: \`CHU_VI=<chu_vi> | DIEN_TICH=<diện_tích>\` (làm tròn **2 chữ số thập phân**).

### 💡 Gợi ý cách làm
- Dùng \`a, b, c = map(float, input().split())\` để nhập 3 số thực trên 1 dòng.
- Dùng \`import math\` và \`math.sqrt(...)\` để tính căn bậc hai.
`,
    starterCode: `# Bài 18.1: Tính Chu vi và Diện tích tam giác theo công thức Heron
`,
    testCases: [
      {
        input: "3 4 5",
        expectedOutput: "CHU_VI=12.00 | DIEN_TICH=6.00",
        isHidden: false,
      },
      {
        input: "5 5 6",
        expectedOutput: "CHU_VI=16.00 | DIEN_TICH=12.00",
        isHidden: false,
      },
      {
        input: "6 8 10",
        expectedOutput: "CHU_VI=24.00 | DIEN_TICH=24.00",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "asgn_18_2",
    lessonId: "bai_18",
    glyph: "●",
    title: "Bài 18.2: Tính tiền điện vượt định mức 100kW (Tự luận Bài 18)",
    difficulty: "Beginner",
    description: `### Đề bài (Tự luận 1 - Bài 18 SGK Tin học 10)
Mỗi kW điện vượt quá $100\\text{ kW}$ đầu tiên phải trả thêm $10\\%$ đơn giá quy định (tức là nhân $1.1$).
Cho đơn giá \`don_gia\` và lượng điện tiêu thụ \`so_kw\` (biết \`so_kw > 100\`). Hãy tính tổng số tiền điện phải trả (làm tròn thành số nguyên bằng \`round()\`).

### Dữ liệu vào (Input)
- Một dòng chứa 2 số nguyên \`don_gia\` và \`so_kw\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- Một số nguyên duy nhất là tổng tiền điện phải trả.
`,
    starterCode: `# Bài 18.2: Tính tiền điện vượt định mức 100kW
`,
    testCases: [
      {
        input: "2000 150",
        expectedOutput: "310000",
        isHidden: false,
      },
      {
        input: "1500 120",
        expectedOutput: "183000",
        isHidden: false,
      },
      {
        input: "2000 200",
        expectedOutput: "420000",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-10T10:15:00.000Z",
  },
  {
    id: "asgn_18_3",
    lessonId: "bai_18",
    glyph: "●",
    title: "Bài 18.3: Nhập số nguyên, số thực và kiểm tra kiểu dữ liệu của tổng",
    difficulty: "Beginner",
    description: `### Đề bài (Thực hành 1 - Bài 18 SGK Tin học 10)
Viết chương trình cho người dùng nhập vào một số nguyên và một số thực từ bàn phím, sau đó tính tổng giá trị của hai số và hiển thị kết quả cùng kiểu dữ liệu của biến tổng (dùng hàm \`type()\`) ra màn hình.

### Dữ liệu vào (Input)
- Dòng 1: Một số nguyên \`so_nguyen\`
- Dòng 2: Một số thực \`so_thuc\`
*(Lưu ý: Dùng \`input()\` không truyền chuỗi nhắc bên trong).* 

### Kết quả ra (Output)
- Dòng 1: Giá trị tổng của hai số vừa nhập.
- Dòng 2: Kiểu dữ liệu của biến tổng (dùng hàm \`type()\`).

### Ví dụ
**Input:**
\`\`\`text
5
3.5
\`\`\`
**Output:**
\`\`\`text
8.5
<class 'float'>
\`\`\``,
    starterCode: `# Bài 18.3: Nhập số nguyên và số thực, tính tổng và in kiểu dữ liệu
`,
    testCases: [
      {
        input: "5\n3.5",
        expectedOutput: "8.5\n<class 'float'>",
        isHidden: false,
      },
      {
        input: "10\n2.0",
        expectedOutput: "12.0\n<class 'float'>",
        isHidden: false,
      },
      {
        input: "-4\n1.25",
        expectedOutput: "-2.75\n<class 'float'>",
        isHidden: true,
      },
      {
        input: "0\n0.0",
        expectedOutput: "0.0\n<class 'float'>",
        isHidden: true,
      },
      {
        input: "100\n-50.75",
        expectedOutput: "49.25\n<class 'float'>",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:35:00.000Z",
  },
  {
    id: "asgn_18_4",
    lessonId: "bai_18",
    glyph: "◆",
    title: "Bài 18.4: Nhập bán kính R từ bàn phím và tính diện tích hình tròn",
    difficulty: "Beginner",
    description: `### Đề bài (Thực hành 2 - Bài 18 SGK Tin học 10)
Viết chương trình nhập bán kính $R$ từ bàn phím (số thực) và tính diện tích hình tròn $S = \\pi \\cdot R^2$ (lấy giá trị $\\pi = 3.14$).

### Dữ liệu vào (Input)
- Một dòng duy nhất chứa số thực $R$ (bán kính hình tròn).

### Kết quả ra (Output)
- In ra diện tích hình tròn $S$.

### Ví dụ
**Input:**
\`\`\`text
5
\`\`\`
**Output:**
\`\`\`text
78.5
\`\`\``,
    starterCode: `# Bài 18.4: Tính diện tích hình tròn
`,
    testCases: [
      {
        input: "5",
        expectedOutput: "78.5",
        isHidden: false,
      },
      {
        input: "1",
        expectedOutput: "3.14",
        isHidden: false,
      },
      {
        input: "2.5",
        expectedOutput: "19.625",
        isHidden: true,
      },
      {
        input: "10",
        expectedOutput: "314.0",
        isHidden: true,
      },
      {
        input: "0",
        expectedOutput: "0.0",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:40:00.000Z",
  },
  {
    id: "asgn_18_5",
    lessonId: "bai_18",
    glyph: "▣",
    title: "Bài 18.5: Đổi số giây ss nhập từ bàn phím sang ngày, giờ, phút, giây",
    difficulty: "Intermediate",
    description: `### Đề bài (Vận dụng 1 - Bài 18 SGK Tin học 10)
Viết chương trình nhập giá trị \`ss\` là số giây nguyên không âm từ bàn phím. Thông báo ra màn hình thời gian \`ss\` giây này sau khi đổi thành thời gian tính bằng ngày, giờ, phút, giây theo định dạng mẫu:

\`<ss> giây = <ngay> ngày <gio> giờ <phut> phút <giay> giây\`

### Dữ liệu vào (Input)
- Một dòng duy nhất chứa số nguyên không âm \`ss\`.

### Kết quả ra (Output)
- In ra 1 dòng theo đúng cú pháp mẫu.

### Ví dụ
**Input:**
\`\`\`text
684500
\`\`\`
**Output:**
\`\`\`text
684500 giây = 7 ngày 22 giờ 8 phút 20 giây
\`\`\``,
    starterCode: `# Bài 18.5: Đổi số giây nhập từ bàn phím
`,
    testCases: [
      {
        input: "684500",
        expectedOutput: "684500 giây = 7 ngày 22 giờ 8 phút 20 giây",
        isHidden: false,
      },
      {
        input: "3661",
        expectedOutput: "3661 giây = 0 ngày 1 giờ 1 phút 1 giây",
        isHidden: false,
      },
      {
        input: "86400",
        expectedOutput: "86400 giây = 1 ngày 0 giờ 0 phút 0 giây",
        isHidden: true,
      },
      {
        input: "59",
        expectedOutput: "59 giây = 0 ngày 0 giờ 0 phút 59 giây",
        isHidden: true,
      },
      {
        input: "0",
        expectedOutput: "0 giây = 0 ngày 0 giờ 0 phút 0 giây",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:45:00.000Z",
  },
  {
    id: "asgn_18_6",
    lessonId: "bai_18",
    glyph: "◊",
    title: "Bài 18.6: Tính chu vi và diện tích tam giác theo công thức Heron",
    difficulty: "Intermediate",
    description: `### Đề bài (Vận dụng 2 - Bài 18 SGK Tin học 10)
Viết chương trình nhập ba số thực dương $a, b, c$ trên cùng một dòng (cách nhau bởi dấu cách) và tính chu vi $P$, diện tích $S$ của tam giác có độ dài ba cạnh là $a, b, c$ theo công thức Heron:

$$p = \\frac{a + b + c}{2}, \\quad S = \\sqrt{p(p - a)(p - b)(p - c)}$$

### Dữ liệu vào (Input)
- Một dòng duy nhất chứa 3 số thực dương $a, b, c$ cách nhau bởi dấu cách.

### Kết quả ra (Output)
- Dòng 1: Chu vi $P$ của tam giác.
- Dòng 2: Diện tích $S$ của tam giác.

### Ví dụ
**Input:**
\`\`\`text
3 4 5
\`\`\`
**Output:**
\`\`\`text
12.0
6.0
\`\`\``,
    starterCode: `# Bài 18.6: Tính chu vi và diện tích tam giác theo công thức Heron
`,
    testCases: [
      {
        input: "3 4 5",
        expectedOutput: "12.0\n6.0",
        isHidden: false,
      },
      {
        input: "5 12 13",
        expectedOutput: "30.0\n30.0",
        isHidden: false,
      },
      {
        input: "6 8 10",
        expectedOutput: "24.0\n24.0",
        isHidden: true,
      },
      {
        input: "2.5 2.5 3.0",
        expectedOutput: "8.0\n3.0",
        isHidden: true,
      },
      {
        input: "1 1 1",
        expectedOutput: "3.0\n0.4330127018922193",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T10:50:00.000Z",
  },

  // ==================== BÀI 19 ====================
  {
    id: "asgn_19_1",
    lessonId: "bai_19",
    glyph: "◐",
    title: "Bài 19.1: Tính tiền mua cam theo khối lượng (Vận dụng 1 - Bài 19)",
    difficulty: "Beginner",
    description: `### Đề bài (Vận dụng 1 - Bài 19 SGK Tin học 10)
Tại cửa hàng trái cây:
- Nếu mua **dưới 5 kg** cam thì giá là \`12000\` đồng/kg.
- Nếu mua **từ 5 kg trở lên** thì giá ưu đãi là \`10000\` đồng/kg.

Viết chương trình nhập số kg cam cần mua (số nguyên) và in ra số tiền phải trả.

### Dữ liệu vào (Input)
- Một số nguyên \`kg\` là số kg cam.

### Kết quả ra (Output)
- Số tiền phải trả.
`,
    starterCode: `# Bài 19.1: Tính tiền mua cam bằng câu lệnh if - else
`,
    testCases: [
      {
        input: "3",
        expectedOutput: "36000",
        isHidden: false,
      },
      {
        input: "5",
        expectedOutput: "50000",
        isHidden: false,
      },
      {
        input: "8",
        expectedOutput: "80000",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-11T08:00:00.000Z",
  },
  {
    id: "asgn_19_2",
    lessonId: "bai_19",
    glyph: "◐",
    title: "Bài 19.2: Kiểm tra Năm nhuận (Vận dụng 2 - Bài 19)",
    difficulty: "Beginner",
    description: `### Đề bài (Vận dụng 2 - Bài 19 SGK Tin học 10)
Nhập vào số năm dương lịch \`n\`. Năm \`n\` là **năm nhuận** nếu thỏa mãn:
- Chia hết cho \`400\`, **HOẶC**
- Chia hết cho \`4\` **VÀ** không chia hết cho \`100\`.

### Dữ liệu vào (Input)
- Một số nguyên dương \`n\`.

### Kết quả ra (Output)
- In ra \`NAM NHUAN\` nếu là năm nhuận, ngược lại in ra \`KHONG NHUAN\`.
`,
    starterCode: `# Bài 19.2: Kiểm tra năm nhuận
`,
    testCases: [
      {
        input: "2024",
        expectedOutput: "NAM NHUAN",
        isHidden: false,
      },
      {
        input: "1900",
        expectedOutput: "KHONG NHUAN",
        isHidden: false,
      },
      {
        input: "2000",
        expectedOutput: "NAM NHUAN",
        isHidden: true,
      },
      {
        input: "2023",
        expectedOutput: "KHONG NHUAN",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-11T08:20:00.000Z",
  },
  {
    id: "asgn_19_3",
    lessonId: "bai_19",
    glyph: "◐",
    title: "Bài 19.3: Tính tiền điện lũy kế 3 bậc thang (Thực hành Bài 19)",
    difficulty: "Intermediate",
    description: `### Đề bài (Thực hành Bài toán 1 - Bài 19 SGK Tin học 10)
Nhập số kWh điện tiêu thụ \`k\` và tính tiền điện lũy kế (đơn vị: đồng) theo 3 mức:
- **Mức 1 ($0 \\le k \\le 50$):** giá \`1678\` đồng/kWh.
- **Mức 2 ($51 \\le k \\le 100$):** 50 kWh đầu giá \`1678\`, phần vượt trên 50 giá \`1734\` đồng/kWh.
- **Mức 3 ($k > 100$):** 50 kWh đầu giá \`1678\`, 50 kWh tiếp theo giá \`1734\`, phần vượt trên 100 giá \`2014\` đồng/kWh.

### Dữ liệu vào (Input)
- Một số nguyên \`k\` là số kWh tiêu thụ.

### Kết quả ra (Output)
- Tổng số tiền điện (số nguyên).
`,
    starterCode: `# Bài 19.3: Tính tiền điện lũy kế 3 bậc thang bằng if - elif - else
`,
    testCases: [
      {
        input: "40",
        expectedOutput: "67120",
        isHidden: false,
      },
      {
        input: "80",
        expectedOutput: "135920",
        isHidden: false,
      },
      {
        input: "120",
        expectedOutput: "210880",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-11T08:40:00.000Z",
  },

  // ==================== BÀI 20 ====================
  {
    id: "asgn_20_1",
    lessonId: "bai_20",
    glyph: "▣",
    title: "Bài 20.1: Tìm các ước số và đếm ước thực sự của n (Thực hành Bài 20)",
    difficulty: "Beginner",
    description: `### Đề bài (Thực hành Nhiệm vụ 1 & 2 - Bài 20 SGK Tin học 10)
Nhập số tự nhiên \`n\` ($n \\ge 2$). Hãy dùng vòng lặp \`for\` để:
1. Tìm tất cả các ước số của \`n\`.
2. Đếm số lượng các **ước số thực sự** của \`n\` (là các ước dương nhỏ hơn \`n\`).

### Dữ liệu vào (Input)
- Một số nguyên dương \`n\`.

### Kết quả ra (Output)
- Dòng 1: Các ước của \`n\` cách nhau bởi dấu cách.
- Dòng 2: \`SO_UOC_THUC_SU=<số_lượng>\`
`,
    starterCode: `# Bài 20.1: Tìm các ước số và đếm số ước thực sự của n
`,
    testCases: [
      {
        input: "12",
        expectedOutput: "1 2 3 4 6 12\nSO_UOC_THUC_SU=5",
        isHidden: false,
      },
      {
        input: "7",
        expectedOutput: "1 7\nSO_UOC_THUC_SU=1",
        isHidden: false,
      },
      {
        input: "28",
        expectedOutput: "1 2 4 7 14 28\nSO_UOC_THUC_SU=5",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-11T10:00:00.000Z",
  },
  {
    id: "asgn_20_2",
    lessonId: "bai_20",
    glyph: "▣",
    title: "Bài 20.2: Tính tổng bậc ba S = 1³ + 2³ + ... + n³ (Vận dụng 2 - Bài 20)",
    difficulty: "Beginner",
    description: `### Đề bài (Vận dụng 2 - Bài 20 SGK Tin học 10)
Nhập số nguyên dương \`n\`. Hãy dùng vòng lặp \`for\` để tính tổng:
$$S = 1^3 + 2^3 + 3^3 + \\dots + n^3$$

### Dữ liệu vào (Input)
- Một số nguyên dương \`n\`.

### Kết quả ra (Output)
- Giá trị tổng \`S\`.
`,
    starterCode: `# Bài 20.2: Tính tổng S = 1^3 + 2^3 + ... + n^3
`,
    testCases: [
      {
        input: "3",
        expectedOutput: "36",
        isHidden: false,
      },
      {
        input: "5",
        expectedOutput: "225",
        isHidden: false,
      },
      {
        input: "10",
        expectedOutput: "3025",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-11T10:20:00.000Z",
  },
  {
    id: "asgn_20_3",
    lessonId: "bai_20",
    glyph: "▣",
    title: "Bài 20.3: Bài toán dân gian Gà và Chó (Tự luận 3 - Bài 20)",
    difficulty: "Intermediate",
    description: `### Đề bài (Tự luận 3 - Bài 20 SGK Tin học 10)
*"Vừa gà vừa chó, bó lại cho tròn, \`tong_con\` con, \`tong_chan\` chân chẵn"*.
Cho tổng số con và tổng số chân (biết gà có 2 chân, chó có 4 chân). Hãy dùng vòng lặp \`for\` tìm số gà và số chó.

### Dữ liệu vào (Input)
- Một dòng gồm 2 số nguyên \`tong_con\` và \`tong_chan\` (mặc định bài toán cổ là \`36 100\`).

### Kết quả ra (Output)
- In theo mẫu: \`GA=<số_gà> | CHO=<số_chó>\`
`,
    starterCode: `# Bài 20.3: Bài toán dân gian Vừa gà vừa chó
`,
    testCases: [
      {
        input: "36 100",
        expectedOutput: "GA=22 | CHO=14",
        isHidden: false,
      },
      {
        input: "10 28",
        expectedOutput: "GA=6 | CHO=4",
        isHidden: false,
      },
      {
        input: "50 140",
        expectedOutput: "GA=30 | CHO=20",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-11T10:40:00.000Z",
  },

  // ==================== BÀI 21 ====================
  {
    id: "asgn_21_1",
    lessonId: "bai_21",
    glyph: "◊",
    title: "Bài 21.1: Đếm số chia hết cho 5 hoặc chia 3 dư 1 bằng while",
    difficulty: "Beginner",
    description: `### Đề bài (Luyện tập 2 - Bài 21 SGK Tin học 10)
Sử dụng vòng lặp \`while\`, hãy đếm xem trong \`n\` số tự nhiên đầu tiên (từ \`0\` đến \`n - 1\`) có bao nhiêu số **chia hết cho 5 HOẶC chia cho 3 dư 1**.

### Dữ liệu vào (Input)
- Số nguyên dương \`n\` (trong SGK là \`n = 100\`).

### Kết quả ra (Output)
- Số lượng các số thỏa mãn điều kiện.
`,
    starterCode: `# Bài 21.1: Đếm số chia hết cho 5 hoặc chia 3 dư 1 trong n số tự nhiên đầu tiên
`,
    testCases: [
      {
        input: "100",
        expectedOutput: "47",
        isHidden: false,
      },
      {
        input: "10",
        expectedOutput: "5",
        isHidden: false,
      },
      {
        input: "50",
        expectedOutput: "24",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-12T08:00:00.000Z",
  },
  {
    id: "asgn_21_2",
    lessonId: "bai_21",
    glyph: "◊",
    title: "Bài 21.2: Tìm Số hoàn hảo đầu tiên lớn hơn n (Nâng cao Bài 21)",
    difficulty: "Advanced",
    description: `### Đề bài (Bài tập nâng cao - Bài 21 SGK Tin học 10)
**Số hoàn hảo** là số tự nhiên bằng tổng các ước thực sự của nó (ví dụ: $6 = 1 + 2 + 3$; $28 = 1 + 2 + 4 + 7 + 14$).
Hãy viết chương trình nhập số tự nhiên \`n\` và dùng vòng lặp \`while\` tìm **số hoàn hảo đầu tiên lớn hơn \`n\`**.

### Dữ liệu vào (Input)
- Số tự nhiên \`n\` ($1 \\le n \\le 500$).

### Kết quả ra (Output)
- Số hoàn hảo đầu tiên lớn hơn \`n\`.
`,
    starterCode: `# Bài 21.2: Tìm số hoàn hảo đầu tiên lớn hơn n
`,
    testCases: [
      {
        input: "1",
        expectedOutput: "6",
        isHidden: false,
      },
      {
        input: "6",
        expectedOutput: "28",
        isHidden: false,
      },
      {
        input: "30",
        expectedOutput: "496",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-12T08:20:00.000Z",
  },

  // ==================== BÀI 22 & 23 ====================
  {
    id: "asgn_22_1",
    lessonId: "bai_22_23",
    glyph: "◇",
    title: "Bài 22.1: Tính tổng, đếm số chẵn & tìm Max trong Danh sách",
    difficulty: "Beginner",
    description: `### Đề bài (Thực hành Nhiệm vụ 2 & Vận dụng - Bài 22 SGK Tin học 10)
Nhập vào một dãy số nguyên \`A\` trên một dòng. Hãy tính và in ra:
1. Tổng các phần tử trong dãy (\`sum(A)\`).
2. Số lượng các số chẵn trong dãy.
3. Giá trị lớn nhất (\`max(A)\`) và chỉ số xuất hiện đầu tiên của nó (\`A.index(max(A))\`).

### Dữ liệu vào (Input)
- Một dòng chứa các số nguyên cách nhau bởi dấu cách.

### Kết quả ra (Output)
- \`TONG=<tổng> | CHAN=<số_chẵn> | MAX=<giá_trị_max> | VI_TRI=<chỉ_số>\`
`,
    starterCode: `# Bài 22.1: Thao tác với Danh sách (List)
`,
    testCases: [
      {
        input: "7 -3 5 12 -6 8 0",
        expectedOutput: "TONG=23 | CHAN=4 | MAX=12 | VI_TRI=3",
        isHidden: false,
      },
      {
        input: "2 4 6 8 10",
        expectedOutput: "TONG=30 | CHAN=5 | MAX=10 | VI_TRI=4",
        isHidden: false,
      },
      {
        input: "15 3 9 15 1",
        expectedOutput: "TONG=43 | CHAN=0 | MAX=15 | VI_TRI=0",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-12T10:00:00.000Z",
  },
  {
    id: "asgn_23_1",
    lessonId: "bai_22_23",
    glyph: "◇",
    title: "Bài 23.1: Tạo danh sách n số hạng đầu tiên của dãy Fibonacci",
    difficulty: "Intermediate",
    description: `### Đề bài (Thực hành 4 - Bài 23 SGK Tin học 10)
Nhập số nguyên dương \`n\` ($n \\ge 2$). Hãy dùng phương thức \`.append()\` để tạo và in ra danh sách \`A\` gồm \`n\` số hạng đầu tiên của dãy Fibonacci:
$$F_0 = 0, \\quad F_1 = 1, \\quad F_k = F_{k-1} + F_{k-2}$$

### Dữ liệu vào (Input)
- Một số nguyên \`n\`.

### Kết quả ra (Output)
- In danh sách \`A\` ra màn hình.
`,
    starterCode: `# Bài 23.1: Tạo danh sách n số hạng đầu tiên của dãy Fibonacci
`,
    testCases: [
      {
        input: "6",
        expectedOutput: "[0, 1, 1, 2, 3, 5]",
        isHidden: false,
      },
      {
        input: "8",
        expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13]",
        isHidden: false,
      },
      {
        input: "10",
        expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-12T10:20:00.000Z",
  },

  // ==================== BÀI 24 & 25 ====================
  {
    id: "asgn_24_1",
    lessonId: "bai_24_25",
    glyph: "◆",
    title: "Bài 24.1: Lọc các chữ số lẻ từ xâu kí tự (Luyện tập Bài 24)",
    difficulty: "Beginner",
    description: `### Đề bài (Luyện tập - Bài 24 SGK Tin học 10)
Cho một xâu kí tự \`s\` bất kỳ. Hãy duyệt từng kí tự của xâu \`s\` và trích lọc tất cả các **chữ số lẻ** (\`'1', '3', '5', '7', '9'\`) ghép theo thứ tự vào biến \`skq\`. Nếu không có chữ số lẻ nào thì in ra \`KHONG CO\`.

### Dữ liệu vào (Input)
- Một dòng chứa xâu \`s\` (ví dụ: \`81723\`).

### Kết quả ra (Output)
- Xâu kết quả \`skq\`.
`,
    starterCode: `# Bài 24.1: Lọc các chữ số lẻ từ xâu kí tự
`,
    testCases: [
      {
        input: "81723",
        expectedOutput: "173",
        isHidden: false,
      },
      {
        input: "Lop10A9va5",
        expectedOutput: "195",
        isHidden: false,
      },
      {
        input: "24680abc",
        expectedOutput: "KHONG CO",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-13T08:00:00.000Z",
  },
  {
    id: "asgn_25_1",
    lessonId: "bai_24_25",
    glyph: "◆",
    title: "Bài 25.1: Chuẩn hóa Họ tên & Tách Họ, Đệm, Tên (Bài 7 & 10 - Bài 25)",
    difficulty: "Intermediate",
    description: `### Đề bài (Thực hành Bài 7 & Bài 10 - Bài 25 SGK Tin học 10)
Cho một xâu họ tên đầy đủ (có thể chứa nhiều dấu cách thừa ở đầu, cuối và giữa các từ, ví dụ: \`"  Nguyễn   Xuân  Quang Lâm  "\`).
Hãy sử dụng \`.split()\` và \`" ".join()\` để:
1. In ra xâu họ tên đã chuẩn hóa (giữa các từ chỉ có đúng 1 dấu cách).
2. Tách và in ra **Họ** (từ đầu tiên) và **Tên** (từ cuối cùng).

### Dữ liệu vào (Input)
- Một dòng chứa xâu họ tên (ít nhất 2 từ).

### Kết quả ra (Output)
- Dòng 1: Họ tên đã chuẩn hóa.
- Dòng 2: \`HO=<họ> | TEN=<tên>\`
`,
    starterCode: `# Bài 25.1: Chuẩn hóa xâu họ tên và tách Họ, Tên
`,
    testCases: [
      {
        input: "   Nguyen   Xuan  Quang Lam  ",
        expectedOutput: "Nguyen Xuan Quang Lam\nHO=Nguyen | TEN=Lam",
        isHidden: false,
      },
      {
        input: "Tran   Gia   Bao",
        expectedOutput: "Tran Gia Bao\nHO=Tran | TEN=Bao",
        isHidden: false,
      },
      {
        input: "  Le   Ha ",
        expectedOutput: "Le Ha\nHO=Le | TEN=Ha",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-13T08:30:00.000Z",
  },

  // ==================== BÀI 26, 27 & 28 ====================
  {
    id: "asgn_26_1",
    lessonId: "bai_26_28",
    glyph: "●",
    title: "Bài 26.1: Viết hàm Number(A) đếm số chẵn và số lẻ (Thực hành Bài 4)",
    difficulty: "Intermediate",
    description: `### Đề bài (Thực hành Bài 4 - Bài 26 SGK Tin học 10)
Hãy định nghĩa hàm \`Number(A)\` nhận đầu vào là danh sách số nguyên \`A\` và trả về đồng thời 2 giá trị \`p, q\` (trong đó \`p\` là số lượng số chẵn, \`q\` là số lượng số lẻ trong \`A\`).

### Dữ liệu vào (Input)
- Một dòng chứa các số nguyên của danh sách \`A\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- \`CHAN=<p> | LE=<q>\`
`,
    starterCode: `# Bài 26.1: Viết hàm Number(A) trả về số lượng số chẵn và số lẻ
`,
    testCases: [
      {
        input: "1 2 3 4 5 6 8",
        expectedOutput: "CHAN=4 | LE=3",
        isHidden: false,
      },
      {
        input: "10 20 30",
        expectedOutput: "CHAN=3 | LE=0",
        isHidden: false,
      },
      {
        input: "1 3 5 7 9",
        expectedOutput: "CHAN=0 | LE=5",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-13T10:00:00.000Z",
  },
  {
    id: "asgn_27_1",
    lessonId: "bai_26_28",
    glyph: "●",
    title: "Bài 27.1: Viết hàm tìm UCLN và BCNN của hai số m, n (Bài 13 - Bài 27)",
    difficulty: "Intermediate",
    description: `### Đề bài (Thực hành Bài 13 - Bài 27 SGK Tin học 10)
Viết hàm \`ucln_bcnn(m, n)\` nhận vào 2 số nguyên dương \`m, n\` và trả về đồng thời 2 giá trị:
- **Ước chung lớn nhất (UCLN)** của \`m, n\`.
- **Bội chung nhỏ nhất (BCNN)** của \`m, n\`, biết $\\text{BCNN}(m, n) = (m \\times n) // \\text{UCLN}(m, n)$.

### Dữ liệu vào (Input)
- Một dòng chứa 2 số nguyên dương \`m\` và \`n\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- \`UCLN=<ucln> | BCNN=<bcnn>\`
`,
    starterCode: `# Bài 27.1: Viết hàm trả về đồng thời UCLN và BCNN của m, n
`,
    testCases: [
      {
        input: "12 18",
        expectedOutput: "UCLN=6 | BCNN=36",
        isHidden: false,
      },
      {
        input: "15 25",
        expectedOutput: "UCLN=5 | BCNN=75",
        isHidden: false,
      },
      {
        input: "7 13",
        expectedOutput: "UCLN=1 | BCNN=91",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-13T10:30:00.000Z",
  },

  // ==================== BÀI 29, 30 & 31 ====================
  {
    id: "asgn_29_1",
    lessonId: "bai_29_31",
    glyph: "▣",
    title: "Bài 29.1: Gỡ lỗi thuật toán Sắp xếp chèn (Insertion Sort - Bài 29)",
    difficulty: "Advanced",
    description: `### Đề bài (Bài 2 Gỡ lỗi - Bài 29 SGK Tin học 10)
Trong SGK có đoạn chương trình sắp xếp dãy \`A\` bị **2 lỗi logic** như sau:
\`\`\`python
for i in range(len(A) - 1):      # Lỗi 1: Bỏ sót phần tử cuối cùng
    j = i
    while j > 1 and A[j] < A[j-1]: # Lỗi 2: j > 1 bỏ sót việc so sánh với A[0]
        A[j], A[j-1] = A[j-1], A[j]
        j = j - 1
\`\`\`
Hãy sửa lại thành \`for i in range(1, len(A)):\` và \`while j > 0 and A[j] < A[j-1]:\` để sắp xếp dãy số nguyên tăng dần chính xác.

### Dữ liệu vào (Input)
- Một dòng chứa các số nguyên của dãy \`A\`.

### Kết quả ra (Output)
- In danh sách \`A\` sau khi đã sắp xếp tăng dần.
`,
    starterCode: `# Bài 29.1: Sửa lỗi thuật toán Sắp xếp chèn (Insertion Sort)
`,
    testCases: [
      {
        input: "10 1 5 2 8 0 4",
        expectedOutput: "[0, 1, 2, 4, 5, 8, 10]",
        isHidden: false,
      },
      {
        input: "9 7 5 3 1",
        expectedOutput: "[1, 3, 5, 7, 9]",
        isHidden: false,
      },
      {
        input: "4 -2 0 11 3",
        expectedOutput: "[-2, 0, 3, 4, 11]",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T08:00:00.000Z",
  },
  {
    id: "asgn_31_1",
    lessonId: "bai_29_31",
    glyph: "▣",
    title: "Bài 31.1: Đếm số năm nhuận từ năm Y1 đến năm Y2 (Bài tập 3 - Bài 31)",
    difficulty: "Intermediate",
    description: `### Đề bài (Bài tập 3 - Bài 31 SGK Tin học 10)
Nhập 2 số tự nhiên \`Y1\` và \`Y2\` là hai mốc năm dương lịch ($Y1 \\le Y2$). Hãy viết chương trình đếm xem từ năm \`Y1\` đến năm \`Y2\` (tính cả 2 đầu mút) có tất cả bao nhiêu **năm nhuận**.
*(Áp dụng để tính số năm nhuận của thế kỉ XXI từ năm 2001 đến 2100).*

### Dữ liệu vào (Input)
- Một dòng chứa 2 số nguyên \`Y1\` và \`Y2\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- Số lượng năm nhuận trong khoảng \`[Y1, Y2]\`.
`,
    starterCode: `# Bài 31.1: Đếm số năm nhuận trong khoảng từ năm Y1 đến Y2
`,
    testCases: [
      {
        input: "2001 2100",
        expectedOutput: "24",
        isHidden: false,
      },
      {
        input: "2000 2024",
        expectedOutput: "7",
        isHidden: false,
      },
      {
        input: "1990 2000",
        expectedOutput: "3",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T08:30:00.000Z",
  },

  // ==================== BÀI TẬP BỔ SUNG TỪ PDF HHT_PHT TIN 10 ====================
  {
    id: "asgn_16_3",
    lessonId: "bai_16",
    glyph: "◇",
    title: "Bài 16.3: Tính tiền lãi suất gửi ngân hàng (Bài tập 3 - Bài 16)",
    difficulty: "Beginner",
    description: `### Đề bài (Bài tập 3 - Bài 16 Tài liệu PDF Tin học 10)
Bạn An có \`5000000\` đồng gửi vào ngân hàng với lãi suất \`0.8%/tháng\` (\`0.008\`).
Hãy viết chương trình tính số tiền lãi của bạn An sau 1 tháng và in ra màn hình đúng theo định dạng sau:
\`\`\`
Tên người gửi: An
Số tiền gửi: 5000000 vnđ
Lãi suất/tháng: 0.8%
Tiền lãi: 40000.0 vnđ
\`\`\`
*(Biết rằng tiền lãi = số tiền gửi * 0.008).*

### Dữ liệu vào (Input)
- Không có dữ liệu nhập từ bàn phím.

### Kết quả ra (Output)
- In ra 4 dòng thông tin đúng theo mẫu trên.
`,
    starterCode: `# Bài 16.3: Tính tiền lãi ngân hàng
`,
    testCases: [
      {
        input: "",
        expectedOutput:
          "Tên người gửi: An\nSố tiền gửi: 5000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi: 40000.0 vnđ",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T14:00:00.000Z",
  },
  {
    id: "asgn_20_4",
    lessonId: "bai_20",
    glyph: "◆",
    title: "Bài 20.4: In bảng nhân 7 với số tự nhiên nhỏ hơn 10 (Bài tập 6 - Bài 20)",
    difficulty: "Beginner",
    description: `### Đề bài (Bài tập 6 - Bài 20 Tài liệu PDF Tin học 10)
Sử dụng vòng lặp \`for\`, hãy viết chương trình in ra bảng nhân 7 với các số tự nhiên nhỏ hơn 10 (từ 0 đến 9), mỗi phép tính trên 1 dòng theo định dạng \`7 x i = <kết quả>\`.

### Dữ liệu vào (Input)
- Không có dữ liệu nhập.

### Kết quả ra (Output)
- 10 dòng kết quả từ \`7 x 0 = 0\` đến \`7 x 9 = 63\`.
`,
    starterCode: `# Bài 20.4: In bảng nhân 7 với các số nhỏ hơn 10
`,
    testCases: [
      {
        input: "",
        expectedOutput:
          "7 x 0 = 0\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63",
        isHidden: false,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T14:00:00.000Z",
  },
  {
    id: "asgn_27_2",
    lessonId: "bai_26_28",
    glyph: "●",
    title: "Bài 27.2: Hàm tìm ƯCLN và BCNN của hai số m, n (Bài tập vận dụng - Bài 27)",
    difficulty: "Intermediate",
    description: `### Đề bài (Bài tập vận dụng - Bài 27 Tài liệu PDF Tin học 10)
Viết hàm \`ucln_bcnn(m, n)\` nhận vào hai số nguyên dương \`m\` và \`n\`.
Hàm trả về 2 giá trị là:
1. **Ước chung lớn nhất (UCLN)** của \`m\` và \`n\`
2. **Bội chung nhỏ nhất (BCNN)** của \`m\` và \`n\`

*(Biết rằng BCNN(m, n) = (m * n) // UCLN(m, n)).*

### Dữ liệu vào (Input)
- Một dòng chứa 2 số nguyên dương \`m\` và \`n\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- In ra theo định dạng: \`UCLN = <giá trị> | BCNN = <giá trị>\`
`,
    starterCode: `# Bài 27.2: Hàm tìm UCLN và BCNN của m và n
`,
    testCases: [
      {
        input: "12 18",
        expectedOutput: "UCLN = 6 | BCNN = 36",
        isHidden: false,
      },
      {
        input: "15 25",
        expectedOutput: "UCLN = 5 | BCNN = 75",
        isHidden: false,
      },
      {
        input: "24 36",
        expectedOutput: "UCLN = 12 | BCNN = 72",
        isHidden: true,
      },
      {
        input: "7 13",
        expectedOutput: "UCLN = 1 | BCNN = 91",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T14:00:00.000Z",
  },
  {
    id: "asgn_31_2",
    lessonId: "bai_29_31",
    glyph: "▣",
    title: "Bài 31.2: Thuật toán Euclid tìm UCLN(a, b) bằng đệ quy / vòng lặp (Bài tập 4 - Bài 31)",
    difficulty: "Intermediate",
    description: `### Đề bài (Bài tập 4 - Bài 31 Tài liệu PDF Tin học 10)
Gọi \`UCLN(a, b)\` là hàm tìm ước chung lớn nhất của hai số tự nhiên \`a, b\`.
Theo thuật toán Euclid:
$$\\text{UCLN}(a, b) = \\begin{cases} a & \\text{nếu } b = 0 \\\\ \\text{UCLN}(b, a \\% b) & \\text{nếu } b > 0 \\end{cases}$$
Hãy viết chương trình nhập hai số tự nhiên \`a, b\` và in ra ước chung lớn nhất của \`a\` và \`b\`.

### Dữ liệu vào (Input)
- Một dòng chứa 2 số tự nhiên \`a\` và \`b\` cách nhau bởi dấu cách.

### Kết quả ra (Output)
- In ra một số nguyên duy nhất là ƯCLN của \`a\` và \`b\`.
`,
    starterCode: `# Bài 31.2: Tìm UCLN của a và b bằng thuật toán Euclid
`,
    testCases: [
      {
        input: "48 18",
        expectedOutput: "6",
        isHidden: false,
      },
      {
        input: "100 25",
        expectedOutput: "25",
        isHidden: false,
      },
      {
        input: "17 19",
        expectedOutput: "1",
        isHidden: true,
      },
      {
        input: "123456 654321",
        expectedOutput: "3",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T14:00:00.000Z",
  },
  {
    id: "asgn_31_3",
    lessonId: "bai_29_31",
    glyph: "▣",
    title: "Bài 31.3: In bảng cửu chương dạng lưới 2 tầng (Bài tập 2 - Bài 31)",
    difficulty: "Intermediate",
    description: `### Đề bài (Bài tập 2 - Bài 31 Tài liệu PDF Tin học 10)
Viết chương trình in bảng cửu chương ra màn hình:
- Tầng 1: In lần lượt các bảng nhân từ 1 đến 5 (mỗi phép tính \`k x i = ...\`).
- Tầng 2: In lần lượt các bảng nhân từ 6 đến 10.
Chương trình in mỗi dòng của bảng theo cú pháp \`<bảng> x <i> = <tích>\`.

Để đơn giản hóa và đồng bộ việc chấm tự động, chương trình nhận vào số nguyên \`k\` ($1 \\le k \\le 10$) đại diện cho bảng nhân cần in (hoặc in toàn bộ bảng nhân của \`k\` từ 1 đến 10).

### Dữ liệu vào (Input)
- Một số nguyên \`k\` ($1 \\le k \\le 10$).

### Kết quả ra (Output)
- 10 dòng thể hiện bảng cửu chương của \`k\`, mỗi dòng có dạng: \`k x i = <k*i>\` với \`i\` từ 1 đến 10.
`,
    starterCode: `# Bài 31.3: In bảng nhân k từ 1 đến 10
`,
    testCases: [
      {
        input: "5",
        expectedOutput:
          "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        isHidden: false,
      },
      {
        input: "9",
        expectedOutput:
          "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90",
        isHidden: false,
      },
      {
        input: "2",
        expectedOutput:
          "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20",
        isHidden: true,
      },
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T14:00:00.000Z",
  },
  {
    id: "asgn_19_4",
    lessonId: "bai_19",
    glyph: "◇",
    title: "Bài 19.4: Xếp loại học lực học sinh theo điểm trung bình",
    difficulty: "Beginner",
    description: "### Đề bài (Vận dụng rẽ nhánh - Bài 19)\nNhập điểm trung bình môn Tin học $DTB$ ($0.0 \\le DTB \\le 10.0$).\nQuy tắc xếp loại học lực:\n- Nếu $DTB \\ge 8.0$: in `GIOI`\n- Nếu $6.5 \\le DTB < 8.0$: in `KHA`\n- Nếu $5.0 \\le DTB < 6.5$: in `TRUNG BINH`\n- Nếu $DTB < 5.0$: in `YEU`\n\n### Dữ liệu vào (Input)\n- Một số thực duy nhất là điểm trung bình $DTB$.\n\n### Kết quả ra (Output)\n- In ra xếp loại tương ứng (`GIOI`, `KHA`, `TRUNG BINH` hoặc `YEU`).",
    starterCode: "# Bài 19.4: Xếp loại học lực học sinh theo điểm trung bình\n",
    testCases: [
          {
                "input": "8.5",
                "expectedOutput": "GIOI",
                "isHidden": false
          },
          {
                "input": "7.0",
                "expectedOutput": "KHA",
                "isHidden": false
          },
          {
                "input": "5.5",
                "expectedOutput": "TRUNG BINH",
                "isHidden": true
          },
          {
                "input": "4.2",
                "expectedOutput": "YEU",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_19_5",
    lessonId: "bai_19",
    glyph: "◆",
    title: "Bài 19.5: Kiểm tra ba cạnh tam giác và phân loại",
    difficulty: "Intermediate",
    description: "### Đề bài (Luyện tập rẽ nhánh - Bài 19)\nNhập vào 3 số thực dương $a, b, c$ trên cùng một dòng (cách nhau bởi dấu cách) đại diện cho độ dài 3 cạnh.\nKiểm tra xem $a, b, c$ có tạo thành một tam giác không (thỏa mãn bất đẳng thức tam giác: $a+b>c$, $a+c>b$, $b+c>a$).\n- Nếu không phải tam giác: in ra `KHONG PHAI TAM GIAC`\n- Nếu có:\n  - Nếu 3 cạnh bằng nhau ($a = b = c$): in ra `TAM GIAC DEU`\n  - Nếu là tam giác vuông (thỏa mãn $a^2+b^2=c^2$ hoặc $a^2+c^2=b^2$ hoặc $b^2+c^2=a^2$, với sai số $10^{-5}$): in ra `TAM GIAC VUONG`\n  - Các trường hợp còn lại: in ra `TAM GIAC THUONG`\n\n### Dữ liệu vào (Input)\n- 3 số thực $a, b, c$ trên một dòng cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Chuỗi ký tự tương ứng với loại tam giác.",
    starterCode: "# Bài 19.5: Kiểm tra ba cạnh tam giác và phân loại\n",
    testCases: [
          {
                "input": "3 4 5",
                "expectedOutput": "TAM GIAC VUONG",
                "isHidden": false
          },
          {
                "input": "5 5 5",
                "expectedOutput": "TAM GIAC DEU",
                "isHidden": false
          },
          {
                "input": "1 2 5",
                "expectedOutput": "KHONG PHAI TAM GIAC",
                "isHidden": true
          },
          {
                "input": "4 5 6",
                "expectedOutput": "TAM GIAC THUONG",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_19_6",
    lessonId: "bai_19",
    glyph: "▣",
    title: "Bài 19.6: Tính tiền cước xe taxi theo cự ly di chuyển",
    difficulty: "Beginner",
    description: "### Đề bài (Toán thực tế - Bài 19)\nBảng giá cước taxi được tính như sau:\n- Km đầu tiên (hoặc dưới 1 km): 10,000 VNĐ.\n- Từ km thứ 2 đến km thứ 10: 8,000 VNĐ / km.\n- Từ km thứ 11 trở đi: 6,000 VNĐ / km.\n\nNhập vào số nguyên dương $k$ là số kilomet khách di chuyển ($k \\ge 1$). Tính và in ra tổng số tiền cước (VNĐ).\n\nVí dụ:\n- Đi 1 km: $10000$ VNĐ\n- Đi 5 km: $10000 + 4 \\times 8000 = 42000$ VNĐ\n- Đi 15 km: $10000 + 9 \\times 8000 + 5 \\times 6000 = 112000$ VNĐ\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $k$.\n\n### Kết quả ra (Output)\n- Số nguyên là tổng số tiền cước taxi.",
    starterCode: "# Bài 19.6: Tính tiền cước xe taxi theo cự ly di chuyển\n",
    testCases: [
          {
                "input": "1",
                "expectedOutput": "10000",
                "isHidden": false
          },
          {
                "input": "5",
                "expectedOutput": "42000",
                "isHidden": false
          },
          {
                "input": "15",
                "expectedOutput": "112000",
                "isHidden": true
          },
          {
                "input": "10",
                "expectedOutput": "82000",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_20_5",
    lessonId: "bai_20",
    glyph: "◇",
    title: "Bài 20.5: Tính giai thừa n! bằng vòng lặp for",
    difficulty: "Beginner",
    description: "### Đề bài (Luyện tập vòng lặp for - Bài 20)\nNhập vào một số nguyên dương $n$ ($1 \\le n \\le 20$). Sử dụng vòng lặp `for` để tính và in ra giá trị giai thừa của $n$:\n$$n! = 1 \\times 2 \\times 3 \\times \\dots \\times n$$\nQuy ước: $0! = 1$, $1! = 1$.\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $n$.\n\n### Kết quả ra (Output)\n- Giá trị $n!$.",
    starterCode: "# Bài 20.5: Tính giai thừa n! bằng vòng lặp for\n",
    testCases: [
          {
                "input": "5",
                "expectedOutput": "120",
                "isHidden": false
          },
          {
                "input": "1",
                "expectedOutput": "1",
                "isHidden": false
          },
          {
                "input": "7",
                "expectedOutput": "5040",
                "isHidden": true
          },
          {
                "input": "10",
                "expectedOutput": "3628800",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_20_6",
    lessonId: "bai_20",
    glyph: "◆",
    title: "Bài 20.6: In tam giác vuông cân bằng dấu *",
    difficulty: "Beginner",
    description: "### Đề bài (Vận dụng vòng lặp for - Bài 20)\nNhập vào số nguyên dương $n$ ($1 \\le n \\le 15$). Sử dụng vòng lặp `for` để in ra màn hình một tam giác vuông cân gồm $n$ dòng bằng dấu sao `*`:\n- Dòng 1 có 1 dấu `*`\n- Dòng 2 có 2 dấu `*`\n- ...\n- Dòng $n$ có $n$ dấu `*`\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $n$.\n\n### Kết quả ra (Output)\n- Hình tam giác vuông cân theo yêu cầu.",
    starterCode: "# Bài 20.6: In tam giác vuông cân bằng dấu *\n",
    testCases: [
          {
                "input": "3",
                "expectedOutput": "*\n**\n***",
                "isHidden": false
          },
          {
                "input": "1",
                "expectedOutput": "*",
                "isHidden": false
          },
          {
                "input": "4",
                "expectedOutput": "*\n**\n***\n****",
                "isHidden": true
          },
          {
                "input": "5",
                "expectedOutput": "*\n**\n***\n****\n*****",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_21_3",
    lessonId: "bai_21",
    glyph: "◇",
    title: "Bài 21.3: Tính tổng các chữ số của số nguyên N",
    difficulty: "Intermediate",
    description: "### Đề bài (Luyện tập vòng lặp while - Bài 21)\nNhập vào số nguyên dương $N$ ($1 \\le N \\le 10^9$). Sử dụng vòng lặp `while` kết hợp phép chia lấy phần dư `% 10` và chia lấy phần nguyên `// 10` để tách từng chữ số và tính tổng các chữ số của $N$.\n\nVí dụ:\n- $N = 1234 \\rightarrow 1 + 2 + 3 + 4 = 10$\n- $N = 905 \\rightarrow 9 + 0 + 5 = 14$\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $N$.\n\n### Kết quả ra (Output)\n- Tổng các chữ số của số $N$.",
    starterCode: "# Bài 21.3: Tính tổng các chữ số của N bằng vòng lặp while\n",
    testCases: [
          {
                "input": "1234",
                "expectedOutput": "10",
                "isHidden": false
          },
          {
                "input": "905",
                "expectedOutput": "14",
                "isHidden": false
          },
          {
                "input": "999999",
                "expectedOutput": "54",
                "isHidden": true
          },
          {
                "input": "7",
                "expectedOutput": "7",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_21_4",
    lessonId: "bai_21",
    glyph: "◆",
    title: "Bài 21.4: Bài toán gửi tiết kiệm ngân hàng lãi kép",
    difficulty: "Intermediate",
    description: "### Đề bài (Vận dụng vòng lặp while - Bài 21)\nBác An gửi vào ngân hàng số tiền vốn ban đầu là $A$ triệu đồng với lãi suất $r\\%$/năm theo hình thức lãi kép (tiền lãi hàng năm được cộng gộp vào vốn để tính lãi cho năm sau).\nHỏi sau ít nhất bao nhiêu năm thì số tiền tích lũy trong tài khoản của bác An đạt tối thiểu $B$ triệu đồng?\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền ban đầu $A$ (triệu đồng, số thực).\n- Dòng 2: Lãi suất $r$ (%/năm, số thực).\n- Dòng 3: Số tiền mục tiêu $B$ (triệu đồng, số thực, $B \\ge A$).\n\n### Kết quả ra (Output)\n- Một số nguyên duy nhất là số năm cần thiết.",
    starterCode: "# Bài 21.4: Tính số năm gửi tiết kiệm lãi kép bằng vòng lặp while\n",
    testCases: [
          {
                "input": "100\n6.5\n200",
                "expectedOutput": "12",
                "isHidden": false
          },
          {
                "input": "50\n8.0\n100",
                "expectedOutput": "10",
                "isHidden": false
          },
          {
                "input": "10\n10.0\n10",
                "expectedOutput": "0",
                "isHidden": true
          },
          {
                "input": "20\n7.5\n50",
                "expectedOutput": "13",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_21_5",
    lessonId: "bai_21",
    glyph: "▣",
    title: "Bài 21.5: Đảo ngược các chữ số của số nguyên dương N",
    difficulty: "Intermediate",
    description: "### Đề bài (Luyện tập thuật toán số học - Bài 21)\nNhập vào một số nguyên dương $N$ ($1 \\le N \\le 10^9$). Sử dụng vòng lặp `while` và các phép toán số học `% 10`, `// 10` để tạo ra số nguyên đảo ngược của $N$ và in ra màn hình.\nLưu ý: Các chữ số 0 ở cuối số $N$ khi đảo ngược sẽ trở thành các chữ số vô nghĩa ở đầu và bị triệt tiêu khi coi là số nguyên (Ví dụ: $1200 \\rightarrow 21$).\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $N$.\n\n### Kết quả ra (Output)\n- Số nguyên sau khi đảo ngược các chữ số.",
    starterCode: "# Bài 21.5: Đảo ngược số nguyên dương N bằng vòng lặp while\n",
    testCases: [
          {
                "input": "12345",
                "expectedOutput": "54321",
                "isHidden": false
          },
          {
                "input": "1200",
                "expectedOutput": "21",
                "isHidden": false
          },
          {
                "input": "7",
                "expectedOutput": "7",
                "isHidden": true
          },
          {
                "input": "9000",
                "expectedOutput": "9",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_21_6",
    lessonId: "bai_21",
    glyph: "●",
    title: "Bài 21.6: Tìm số lớn nhất trong dãy số kết thúc bằng số 0",
    difficulty: "Beginner",
    description: "### Đề bài (Vòng lặp while với điều kiện dừng - Bài 21)\nNhập liên tục các số nguyên từ bàn phím, mỗi số trên một dòng riêng biệt, cho đến khi gặp số `0` thì dừng nhập (số `0` chỉ là dấu hiệu kết thúc, không nằm trong dãy cần xét).\nHãy tìm và in ra giá trị lớn nhất trong các số đã nhập.\n\n### Dữ liệu vào (Input)\n- Dãy các số nguyên, mỗi số trên một dòng, kết thúc bởi dòng chứa số 0 (Dãy đảm bảo có ít nhất 1 số trước số 0).\n\n### Kết quả ra (Output)\n- Một số nguyên là giá trị lớn nhất trong dãy.",
    starterCode: "# Bài 21.6: Tìm số lớn nhất trong dãy số kết thúc bằng 0\n",
    testCases: [
          {
                "input": "5\n12\n8\n3\n0",
                "expectedOutput": "12",
                "isHidden": false
          },
          {
                "input": "-5\n-2\n-8\n0",
                "expectedOutput": "-2",
                "isHidden": false
          },
          {
                "input": "100\n0",
                "expectedOutput": "100",
                "isHidden": true
          },
          {
                "input": "1\n5\n9\n7\n0",
                "expectedOutput": "9",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_22_2",
    lessonId: "bai_22_23",
    glyph: "◇",
    title: "Bài 22.2: Phân loại danh sách thành số chẵn và số lẻ",
    difficulty: "Beginner",
    description: "### Đề bài (Luyện tập Danh sách - Bài 22)\nNhập vào một danh sách các số nguyên trên một dòng, cách nhau bởi dấu cách.\nHãy duyệt danh sách và tách thành 2 danh sách con:\n- Dòng 1: In ra các số chẵn (cách nhau bởi dấu cách). Nếu không có số chẵn nào, in ra `RONG`.\n- Dòng 2: In ra các số lẻ (cách nhau bởi dấu cách). Nếu không có số lẻ nào, in ra `RONG`.\n\n### Dữ liệu vào (Input)\n- Dòng duy nhất chứa các số nguyên cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Đúng 2 dòng theo định dạng mô tả trên.",
    starterCode: "# Bài 22.2: Phân loại danh sách số chẵn và số lẻ\n",
    testCases: [
          {
                "input": "1 2 3 4 5 6",
                "expectedOutput": "2 4 6\n1 3 5",
                "isHidden": false
          },
          {
                "input": "2 4 8",
                "expectedOutput": "2 4 8\nRONG",
                "isHidden": false
          },
          {
                "input": "7 9 11",
                "expectedOutput": "RONG\n7 9 11",
                "isHidden": true
          },
          {
                "input": "10",
                "expectedOutput": "10\nRONG",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_22_3",
    lessonId: "bai_22_23",
    glyph: "◆",
    title: "Bài 22.3: Tìm phần tử lớn thứ nhì trong danh sách",
    difficulty: "Intermediate",
    description: "### Đề bài (Thao tác trên Danh sách - Bài 22)\nCho một danh sách các số nguyên trên một dòng cách nhau bởi dấu cách.\nHãy tìm và in ra phần tử có giá trị **lớn thứ nhì (nghiêm ngặt khác giá trị lớn nhất)** trong danh sách.\nNếu tất cả các phần tử trong danh sách đều có giá trị bằng nhau (không tồn tại phần tử lớn thứ nhì), hãy in ra `KHONG CO`.\n\nVí dụ:\n- `5 1 9 3 9 7` $\\rightarrow$ Max là 9, lớn thứ nhì là 7.\n- `3 3 3` $\\rightarrow$ In `KHONG CO`.\n\n### Dữ liệu vào (Input)\n- Một dòng chứa các số nguyên cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Giá trị lớn thứ nhì hoặc chuỗi `KHONG CO`.",
    starterCode: "# Bài 22.3: Tìm phần tử lớn thứ nhì trong danh sách\n",
    testCases: [
          {
                "input": "5 1 9 3 9 7",
                "expectedOutput": "7",
                "isHidden": false
          },
          {
                "input": "3 3 3",
                "expectedOutput": "KHONG CO",
                "isHidden": false
          },
          {
                "input": "-5 -1 -3 -1 -2",
                "expectedOutput": "-2",
                "isHidden": true
          },
          {
                "input": "10 20",
                "expectedOutput": "10",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_23_2",
    lessonId: "bai_22_23",
    glyph: "▣",
    title: "Bài 23.2: Thống kê điểm thi môn Tin học của tổ",
    difficulty: "Beginner",
    description: "### Đề bài (Thực hành với Danh sách - Bài 23)\nNhập vào danh sách điểm thi môn Tin học của các học sinh trong một tổ trên một dòng (các số thực từ 0.0 đến 10.0, cách nhau bởi dấu cách).\nHãy thực hiện các thống kê sau:\n- Dòng 1: In điểm trung bình của cả tổ (làm tròn đến 1 chữ số thập phân).\n- Dòng 2: In số lượng học sinh đạt điểm giỏi (điểm $\\ge 8.0$).\n\n### Dữ liệu vào (Input)\n- Một dòng duy nhất chứa danh sách điểm của các học sinh cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: Điểm trung bình làm tròn 1 chữ số thập phân.\n- Dòng 2: Số nguyên là số học sinh đạt điểm giỏi.",
    starterCode: "# Bài 23.2: Thống kê điểm thi môn Tin học của tổ\n",
    testCases: [
          {
                "input": "8.5 7.0 9.0 6.5 8.0",
                "expectedOutput": "7.8\n3",
                "isHidden": false
          },
          {
                "input": "10.0 10.0",
                "expectedOutput": "10.0\n2",
                "isHidden": false
          },
          {
                "input": "5.0 6.0 7.0",
                "expectedOutput": "6.0\n0",
                "isHidden": true
          },
          {
                "input": "8.0 8.0 8.0",
                "expectedOutput": "8.0\n3",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_23_3",
    lessonId: "bai_22_23",
    glyph: "●",
    title: "Bài 23.3: Loại bỏ các phần tử trùng lặp trong danh sách",
    difficulty: "Intermediate",
    description: "### Đề bài (Xử lý mảng nâng cao - Bài 23)\nNhập một danh sách các số nguyên trên một dòng cách nhau bởi dấu cách.\nHãy loại bỏ tất cả các phần tử bị trùng lặp, chỉ giữ lại phần tử xuất hiện đầu tiên theo đúng thứ tự ban đầu và in ra danh sách mới trên 1 dòng, các phần tử cách nhau bởi dấu cách.\n\nVí dụ: `1 3 2 3 4 1 5` $\\rightarrow$ `1 3 2 4 5`\n\n### Dữ liệu vào (Input)\n- Một dòng chứa các số nguyên cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dãy số sau khi đã loại bỏ các phần tử trùng lặp, cách nhau bởi dấu cách.",
    starterCode: "# Bài 23.3: Loại bỏ các phần tử trùng lặp trong danh sách\n",
    testCases: [
          {
                "input": "1 3 2 3 4 1 5",
                "expectedOutput": "1 3 2 4 5",
                "isHidden": false
          },
          {
                "input": "5 5 5 5",
                "expectedOutput": "5",
                "isHidden": false
          },
          {
                "input": "10 20 30",
                "expectedOutput": "10 20 30",
                "isHidden": true
          },
          {
                "input": "4 2 4 1 2 3",
                "expectedOutput": "4 2 1 3",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_24_2",
    lessonId: "bai_24_25",
    glyph: "◇",
    title: "Bài 24.2: Đếm số lượng từ trong câu văn bản",
    difficulty: "Beginner",
    description: "### Đề bài (Luyện tập thao tác xâu - Bài 24)\nNhập vào một câu văn bản $S$ có thể chứa nhiều khoảng trắng thừa ở đầu câu, cuối câu và giữa các từ liền nhau.\nHãy sử dụng phương thức tách xâu `split()` để đếm và in ra số lượng từ thực tế có trong câu văn bản đó.\n\nVí dụ: `   Lap trinh    Python rat thu vi   ` $\\rightarrow$ Có 6 từ.\n\n### Dữ liệu vào (Input)\n- Một dòng chứa xâu ký tự $S$.\n\n### Kết quả ra (Output)\n- Một số nguyên duy nhất là số lượng từ trong câu.",
    starterCode: "# Bài 24.2: Đếm số lượng từ trong câu văn bản\n",
    testCases: [
          {
                "input": "Chuc mung nam moi",
                "expectedOutput": "4",
                "isHidden": false
          },
          {
                "input": "   Lap trinh    Python rat thu vi   ",
                "expectedOutput": "6",
                "isHidden": false
          },
          {
                "input": "Python",
                "expectedOutput": "1",
                "isHidden": true
          },
          {
                "input": "  hoc   tin   hoc  10  ",
                "expectedOutput": "4",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_24_3",
    lessonId: "bai_24_25",
    glyph: "◆",
    title: "Bài 24.3: Đếm số lượng nguyên âm tiếng Anh trong xâu",
    difficulty: "Beginner",
    description: "### Đề bài (Duyệt ký tự trong xâu - Bài 24)\nNhập vào một chuỗi ký tự tiếng Anh không dấu.\nHãy đếm tổng số lượng các chữ cái nguyên âm (`a, e, i, o, u`, không phân biệt chữ hoa hay chữ thường) xuất hiện trong chuỗi.\n\nVí dụ: `Hello World` có 3 nguyên âm là `e`, `o`, `o`.\n\n### Dữ liệu vào (Input)\n- Một dòng chứa chuỗi ký tự tiếng Anh.\n\n### Kết quả ra (Output)\n- Một số nguyên là tổng số lượng nguyên âm tìm thấy.",
    starterCode: "# Bài 24.3: Đếm số lượng nguyên âm tiếng Anh trong xâu\n",
    testCases: [
          {
                "input": "Hello World",
                "expectedOutput": "3",
                "isHidden": false
          },
          {
                "input": "PYTHON",
                "expectedOutput": "1",
                "isHidden": false
          },
          {
                "input": "rhythm",
                "expectedOutput": "0",
                "isHidden": true
          },
          {
                "input": "Education and Training",
                "expectedOutput": "8",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_25_2",
    lessonId: "bai_24_25",
    glyph: "▣",
    title: "Bài 25.2: Kiểm tra xâu đối xứng (Palindrome)",
    difficulty: "Intermediate",
    description: "### Đề bài (Xử lý xâu ký tự nâng cao - Bài 25)\nMột xâu ký tự được gọi là đối xứng (Palindrome) nếu đọc từ trái sang phải hay từ phải sang trái đều giống nhau (Ví dụ: `madam`, `racecar`, `12321`).\nNhập vào một xâu ký tự không chứa khoảng trắng. Hãy kiểm tra:\n- Nếu là xâu đối xứng: in ra `DUNG`\n- Nếu không phải: in ra `SAI`\n\n### Dữ liệu vào (Input)\n- Một dòng chứa một xâu ký tự liền nhau không chứa dấu cách.\n\n### Kết quả ra (Output)\n- In `DUNG` hoặc `SAI`.",
    starterCode: "# Bài 25.2: Kiểm tra xâu đối xứng (Palindrome)\n",
    testCases: [
          {
                "input": "madam",
                "expectedOutput": "DUNG",
                "isHidden": false
          },
          {
                "input": "python",
                "expectedOutput": "SAI",
                "isHidden": false
          },
          {
                "input": "12321",
                "expectedOutput": "DUNG",
                "isHidden": true
          },
          {
                "input": "abccba",
                "expectedOutput": "DUNG",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_25_3",
    lessonId: "bai_24_25",
    glyph: "●",
    title: "Bài 25.3: Chuẩn hóa và viết hoa chữ cái đầu mỗi từ",
    difficulty: "Intermediate",
    description: "### Đề bài (Chuẩn hóa xâu ký tự - Bài 25)\nNhập vào một chuỗi họ tên hoặc tiêu đề có khoảng trắng thừa lộn xộn và chữ hoa thường không đồng nhất.\nHãy viết chương trình chuẩn hóa xâu sao cho:\n1. Loại bỏ các khoảng trắng thừa ở đầu, cuối và giữa các từ (giữa 2 từ bất kỳ chỉ chừa đúng 1 dấu cách).\n2. Viết hoa chữ cái đầu tiên của mỗi từ và chuyển các chữ cái còn lại trong từ đó thành chữ thường (Title Case).\n\nVí dụ: `  nguyen   duc   trung ` $\\rightarrow$ `Nguyen Duc Trung`\n\n### Dữ liệu vào (Input)\n- Một dòng chứa chuỗi ký tự bất kỳ.\n\n### Kết quả ra (Output)\n- Chuỗi ký tự sau khi đã được chuẩn hóa.",
    starterCode: "# Bài 25.3: Chuẩn hóa và viết hoa chữ cái đầu mỗi từ\n",
    testCases: [
          {
                "input": "  nguyen   duc   trung ",
                "expectedOutput": "Nguyen Duc Trung",
                "isHidden": false
          },
          {
                "input": "tin HOC 10",
                "expectedOutput": "Tin Hoc 10",
                "isHidden": false
          },
          {
                "input": "ha noi",
                "expectedOutput": "Ha Noi",
                "isHidden": true
          },
          {
                "input": "   cOcOcOdE   pYtHoN   ",
                "expectedOutput": "Cococode Python",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_26_2",
    lessonId: "bai_26_28",
    glyph: "◇",
    title: "Bài 26.2: Viết hàm kiểm tra số nguyên tố và in danh sách",
    difficulty: "Intermediate",
    description: "### Đề bài (Định nghĩa hàm trong Python - Bài 26)\nViết một hàm `is_prime(n)` nhận vào số nguyên dương $n$ và trả về `True` nếu $n$ là số nguyên tố, ngược lại trả về `False`.\nSử dụng hàm vừa định nghĩa, viết chương trình chính nhận vào số nguyên $N$ ($N \\ge 2$) từ bàn phím và in ra tất cả các số nguyên tố $\\le N$ trên một dòng, cách nhau bởi dấu cách.\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $N$ ($N \\ge 2$).\n\n### Kết quả ra (Output)\n- Dãy các số nguyên tố nhỏ hơn hoặc bằng $N$ trên một dòng, cách nhau bởi dấu cách.",
    starterCode: "# Bài 26.2: Viết hàm kiểm tra số nguyên tố và liệt kê\n",
    testCases: [
          {
                "input": "10",
                "expectedOutput": "2 3 5 7",
                "isHidden": false
          },
          {
                "input": "20",
                "expectedOutput": "2 3 5 7 11 13 17 19",
                "isHidden": false
          },
          {
                "input": "2",
                "expectedOutput": "2",
                "isHidden": true
          },
          {
                "input": "30",
                "expectedOutput": "2 3 5 7 11 13 17 19 23 29",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_27_3",
    lessonId: "bai_26_28",
    glyph: "◆",
    title: "Bài 27.3: Viết hàm tính chỉ số khối cơ thể BMI",
    difficulty: "Beginner",
    description: "### Đề bài (Hàm có tham số và trả về giá trị - Bài 27)\nChỉ số khối cơ thể (Body Mass Index - BMI) được tính theo công thức:\n$$BMI = \\frac{\\text{Cân nặng (kg)}}{\\text{Chiều cao (m)}^2}$$\n\nHãy viết hàm `tinh_bmi(can_nang, chieu_cao)` nhận vào cân nặng (kg) và chiều cao (m), trả về giá trị BMI đã được làm tròn đến 1 chữ số thập phân.\nChương trình nhập vào từ bàn phím:\n- Dòng 1: Cân nặng (kg, số thực)\n- Dòng 2: Chiều cao (m, số thực)\n\nDựa vào chỉ số BMI, in ra kết quả theo định dạng: `BMI=<giá trị> | <đánh giá>`\nTrong đó đánh giá thể trạng được quy định như sau:\n- $BMI < 18.5$: `GAY`\n- $18.5 \\le BMI < 23.0$: `BINH THUONG`\n- $BMI \\ge 23.0$: `THUA CAN`\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số thực là cân nặng (kg).\n- Dòng 2: Số thực là chiều cao (m).\n\n### Kết quả ra (Output)\n- Một dòng định dạng: `BMI=<giá trị> | <đánh giá>`",
    starterCode: "# Bài 27.3: Hàm tính chỉ số khối cơ thể BMI\n",
    testCases: [
          {
                "input": "50\n1.65",
                "expectedOutput": "BMI=18.4 | GAY",
                "isHidden": false
          },
          {
                "input": "60\n1.70",
                "expectedOutput": "BMI=20.8 | BINH THUONG",
                "isHidden": false
          },
          {
                "input": "75\n1.68",
                "expectedOutput": "BMI=26.6 | THUA CAN",
                "isHidden": true
          },
          {
                "input": "65\n1.65",
                "expectedOutput": "BMI=23.9 | THUA CAN",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_28_1",
    lessonId: "bai_26_28",
    glyph: "▣",
    title: "Bài 28.1: Hàm tính tổng và tích các phần tử trong danh sách",
    difficulty: "Beginner",
    description: "### Đề bài (Phạm vi của biến và giá trị trả về của hàm - Bài 28)\nViết hàm `tinh_tong_tich(ds)` nhận vào một danh sách các số nguyên và trả về đồng thời hai giá trị: tổng và tích của tất cả các phần tử trong danh sách đó.\nChương trình nhận vào một danh sách các số nguyên trên một dòng cách nhau bởi dấu cách.\nGọi hàm và in kết quả ra màn hình theo định dạng mẫu: `TONG=<tong> | TICH=<tich>`.\n\n### Dữ liệu vào (Input)\n- Một dòng duy nhất chứa các số nguyên cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Một dòng theo cú pháp: `TONG=<tong> | TICH=<tich>`",
    starterCode: "# Bài 28.1: Hàm tính tổng và tích của danh sách số\n",
    testCases: [
          {
                "input": "1 2 3 4",
                "expectedOutput": "TONG=10 | TICH=24",
                "isHidden": false
          },
          {
                "input": "5 10",
                "expectedOutput": "TONG=15 | TICH=50",
                "isHidden": false
          },
          {
                "input": "7",
                "expectedOutput": "TONG=7 | TICH=7",
                "isHidden": true
          },
          {
                "input": "2 2 2 2",
                "expectedOutput": "TONG=8 | TICH=16",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_30_1",
    lessonId: "bai_29_31",
    glyph: "◇",
    title: "Bài 30.1: Tìm các số hoàn hảo nhỏ hơn hoặc bằng N",
    difficulty: "Intermediate",
    description: "### Đề bài (Gỡ lỗi và hoàn thiện thuật toán - Bài 30)\nSố hoàn hảo (Perfect Number) là số nguyên dương bằng tổng tất cả các ước số thực sự của nó (tức các ước nhỏ hơn chính nó). Ví dụ: $6 = 1 + 2 + 3$, $28 = 1 + 2 + 4 + 7 + 14$.\nHãy viết chương trình nhập vào một số nguyên dương $N$ ($1 \\le N \\le 1000$).\nTìm và in ra tất cả các số hoàn hảo nhỏ hơn hoặc bằng $N$ trên một dòng, cách nhau bởi dấu cách. Nếu trong phạm vi không có số hoàn hảo nào, in ra `KHONG CO`.\n\n### Dữ liệu vào (Input)\n- Một số nguyên dương $N$.\n\n### Kết quả ra (Output)\n- Các số hoàn hảo cách nhau bởi dấu cách hoặc `KHONG CO`.",
    starterCode: "# Bài 30.1: Tìm các số hoàn hảo nhỏ hơn hoặc bằng N\n",
    testCases: [
          {
                "input": "30",
                "expectedOutput": "6 28",
                "isHidden": false
          },
          {
                "input": "5",
                "expectedOutput": "KHONG CO",
                "isHidden": false
          },
          {
                "input": "500",
                "expectedOutput": "6 28 496",
                "isHidden": true
          },
          {
                "input": "1",
                "expectedOutput": "KHONG CO",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
  {
    id: "asgn_31_4",
    lessonId: "bai_29_31",
    glyph: "◆",
    title: "Bài 31.4: Thuật toán Tìm kiếm nhị phân (Binary Search)",
    difficulty: "Advanced",
    description: "### Đề bài (Thuật toán tìm kiếm nhị phân - Bài 31)\nCho một danh sách các số nguyên đã được sắp xếp tăng dần và một số nguyên $x$ cần tìm kiếm.\nHãy áp dụng thuật toán **Tìm kiếm nhị phân (Binary Search)** để xác định vị trí (chỉ số index bắt đầu từ 0) của phần tử $x$ trong danh sách.\n- Nếu tìm thấy phần tử $x$, in ra chỉ số index của $x$.\n- Nếu không tìm thấy, in ra `-1`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các số nguyên đã sắp xếp tăng dần, cách nhau bởi dấu cách.\n- Dòng 2: Số nguyên $x$ cần tìm.\n\n### Kết quả ra (Output)\n- Chỉ số index của $x$ trong danh sách hoặc `-1`.",
    starterCode: "# Bài 31.4: Thuật toán Tìm kiếm nhị phân (Binary Search)\n",
    testCases: [
          {
                "input": "1 3 5 7 9 11 13\n7",
                "expectedOutput": "3",
                "isHidden": false
          },
          {
                "input": "2 4 6 8 10\n5",
                "expectedOutput": "-1",
                "isHidden": false
          },
          {
                "input": "10 20 30 40 50\n10",
                "expectedOutput": "0",
                "isHidden": true
          },
          {
                "input": "10 20 30 40 50\n50",
                "expectedOutput": "4",
                "isHidden": true
          }
    ],
    createdBy: "usr_instructor_01",
    createdAt: "2026-11-14T15:00:00.000Z",
  },
];

export function localizeAssignment(
  asgn: Assignment,
  _lang: LanguageMode
): Assignment {
  return asgn;
}

export function localizeDifficulty(
  diff: DifficultyLevel,
  lang: LanguageMode
): string {
  if (lang === "en") return diff;
  if (diff === "Beginner") return "Cơ bản";
  if (diff === "Intermediate") return "Trung bình";
  return "Nâng cao";
}

export function sortAssignmentsByCurriculum(list: Assignment[]): Assignment[] {
  const lessonOrder = [
    "bai_16",
    "bai_17",
    "bai_18",
    "bai_19",
    "bai_20",
    "bai_21",
    "bai_22_23",
    "bai_24_25",
    "bai_26_28",
    "bai_29_31",
  ];

  return [...list].sort((a, b) => {
    const aLesson = a.lessonId || "";
    const bLesson = b.lessonId || "";
    const aOrder =
      lessonOrder.indexOf(aLesson) >= 0
        ? lessonOrder.indexOf(aLesson)
        : 999;
    const bOrder =
      lessonOrder.indexOf(bLesson) >= 0
        ? lessonOrder.indexOf(bLesson)
        : 999;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.title.localeCompare(b.title, undefined, { numeric: true });
  });
}

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "usr_student_01_asgn_16_1",
    userId: "usr_student_01",
    userDisplayName: "Nguyễn Minh An",
    userClassName: "10A7",
    userEmail: "nguyenminhan.10a7@python.edu.vn",
    assignmentId: "asgn_16_1",
    code: `# Bài 16.1: In hình chữ nhật rỗng kích thước w x 4 bằng dấu *\nw = int(input())\n\ndong_dac = "*" * w\ndong_rong = "*" + " " * (w - 2) + "*"\n\nprint(dong_dac)\nprint(dong_rong)\nprint(dong_rong)\nprint(dong_dac)\n`,
    status: "passed",
    lastExecutedOutput: "************\n*          *\n*          *\n************",
    passedCount: 3,
    totalCount: 3,
    updatedAt: "2026-11-14T08:15:00.000Z",
  },
  {
    id: "usr_student_01_asgn_17_2",
    userId: "usr_student_01",
    userDisplayName: "Nguyễn Minh An",
    userClassName: "10A7",
    userEmail: "nguyenminhan.10a7@python.edu.vn",
    assignmentId: "asgn_17_2",
    code: `# Bài 17.2: Đổi số giây sang Ngày, Giờ, Phút, Giây\nss = int(input())\n\nngay = ss // 86400\ncon_lai = ss % 86400\n\ngio = con_lai // 3600\ncon_lai = con_lai % 3600\n\nphut = con_lai // 60\ngiay = con_lai % 60\n\nprint(f"{ngay} ngay {gio} gio {phut} phut {giay} giay")\n`,
    status: "passed",
    lastExecutedOutput: "7 ngay 22 gio 8 phut 20 giay",
    passedCount: 3,
    totalCount: 3,
    updatedAt: "2026-11-14T08:25:00.000Z",
  },
  {
    id: "usr_student_02_asgn_19_2",
    userId: "usr_student_02",
    userDisplayName: "Trần Gia Bảo",
    userClassName: "10A12",
    userEmail: "trangiabao.10a12@python.edu.vn",
    assignmentId: "asgn_19_2",
    code: `# Bài 19.2: Kiểm tra năm nhuận\nn = int(input())\n\nif (n % 400 == 0) or (n % 4 == 0 and n % 100 != 0):\n    print("NAM NHUAN")\nelse:\n    print("KHONG NHUAN")\n`,
    status: "passed",
    lastExecutedOutput: "NAM NHUAN",
    passedCount: 4,
    totalCount: 4,
    updatedAt: "2026-11-14T08:32:00.000Z",
  },
];
