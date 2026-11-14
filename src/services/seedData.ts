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
w = int(input())

dong_dac = "*" * w
dong_rong = "*" + " " * (w - 2) + "*"

print(dong_dac)
print(dong_rong)
print(dong_rong)
print(dong_dac)
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
P = int(input())

tien_lai = int(P * 0.008)
tong_tien = P + tien_lai

print(f"LAI={tien_lai} | TONG={tong_tien}")
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
x = int(input())
y = int(input())

ket_qua = (x + y) * (x**2 + y**2 - 1)
print(ket_qua)
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
ss = int(input())

ngay = ss // 86400
con_lai = ss % 86400

gio = con_lai // 3600
con_lai = con_lai % 3600

phut = con_lai // 60
giay = con_lai % 60

print(f"{ngay} ngay {gio} gio {phut} phut {giay} giay")
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
import math

a, b, c = map(float, input().split())

chu_vi = a + b + c
p = chu_vi / 2
dien_tich = math.sqrt(p * (p - a) * (p - b) * (p - c))

print(f"CHU_VI={chu_vi:.2f} | DIEN_TICH={dien_tich:.2f}")
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
don_gia, so_kw = map(int, input().split())

tien_100kw_dau = 100 * don_gia
tien_vuot_muc = (so_kw - 100) * don_gia * 1.1
tong_tien = round(tien_100kw_dau + tien_vuot_muc)

print(tong_tien)
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
kg = int(input())

if kg < 5:
    thanh_tien = kg * 12000
else:
    thanh_tien = kg * 10000

print(thanh_tien)
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
n = int(input())

if (n % 400 == 0) or (n % 4 == 0 and n % 100 != 0):
    print("NAM NHUAN")
else:
    print("KHONG NHUAN")
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
k = int(input())

if k <= 50:
    tien = k * 1678
elif k <= 100:
    tien = 50 * 1678 + (k - 50) * 1734
else:
    tien = 50 * 1678 + 50 * 1734 + (k - 100) * 2014

print(tien)
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
n = int(input())

cac_uoc = []
dem_uoc_thuc_su = 0

for i in range(1, n + 1):
    if n % i == 0:
        cac_uoc.append(str(i))
        if i < n:
            dem_uoc_thuc_su += 1

print(" ".join(cac_uoc))
print(f"SO_UOC_THUC_SU={dem_uoc_thuc_su}")
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
n = int(input())

S = 0
for i in range(1, n + 1):
    S += i ** 3

print(S)
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
tong_con, tong_chan = map(int, input().split())

for ga in range(0, tong_con + 1):
    cho = tong_con - ga
    if 2 * ga + 4 * cho == tong_chan:
        print(f"GA={ga} | CHO={cho}")
        break
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
n = int(input())

k = 0
dem = 0
while k < n:
    if (k % 5 == 0) or (k % 3 == 1):
        dem += 1
    k += 1

print(dem)
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
n = int(input())

 ứng_vien = n + 1
while True:
    tong_uoc = 0
    for i in range(1, ứng_vien):
        if ứng_vien % i == 0:
            tong_uoc += i
    if tong_uoc == ứng_vien:
        print(ứng_vien)
        break
    ứng_vien += 1
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
A = [int(x) for x in input().split()]

tong = sum(A)
so_chan = len([x for x in A if x % 2 == 0])
gt_max = max(A)
vi_tri_max = A.index(gt_max)

print(f"TONG={tong} | CHAN={so_chan} | MAX={gt_max} | VI_TRI={vi_tri_max}")
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
n = int(input())

A = [0, 1]
for i in range(2, n):
    A.append(A[i - 1] + A[i - 2])

print(A[:n])
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
s = input()

skq = ""
for ch in s:
    if ch in "13579":
        skq = skq + ch

if skq == "":
    print("KHONG CO")
else:
    print(skq)
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
s = input()

cac_tu = s.split()
chuan_hoa = " ".join(cac_tu)
ho = cac_tu[0]
ten = cac_tu[-1]

print(chuan_hoa)
print(f"HO={ho} | TEN={ten}")
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
def Number(A: list[int]) -> tuple[int, int]:
    p = 0
    q = 0
    for x in A:
        if x % 2 == 0:
            p += 1
        else:
            q += 1
    return p, q

if __name__ == "__main__":
    ds = [int(x) for x in input().split()]
    chan, le = Number(ds)
    print(f"CHAN={chan} | LE={le}")
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
def ucln_bcnn(m: int, n: int) -> tuple[int, int]:
    a, b = m, n
    while b != 0:
        a, b = b, a % b
    ucln = a
    bcnn = (m * n) // ucln
    return ucln, bcnn

if __name__ == "__main__":
    m, n = map(int, input().split())
    u, b = ucln_bcnn(m, n)
    print(f"UCLN={u} | BCNN={b}")
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
A = [int(x) for x in input().split()]

for i in range(1, len(A)):
    j = i
    while j > 0 and A[j] < A[j - 1]:
        A[j], A[j - 1] = A[j - 1], A[j]
        j = j - 1

print(A)
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
def la_nam_nhuan(nam: int) -> bool:
    return (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0)

Y1, Y2 = map(int, input().split())

dem = 0
for nam in range(Y1, Y2 + 1):
    if la_nam_nhuan(nam):
        dem += 1

print(dem)
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

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "usr_student_01_asgn_16_1",
    userId: "usr_student_01",
    userDisplayName: "Nguyễn Minh An",
    userClassName: "10A7",
    userEmail: "nguyenminhan.10a7@python.edu.vn",
    assignmentId: "asgn_16_1",
    code: INITIAL_ASSIGNMENTS[0].starterCode,
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
    code: INITIAL_ASSIGNMENTS[3].starterCode,
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
    code: INITIAL_ASSIGNMENTS[7].starterCode,
    status: "passed",
    lastExecutedOutput: "NAM NHUAN",
    passedCount: 4,
    totalCount: 4,
    updatedAt: "2026-11-14T08:32:00.000Z",
  },
];
