const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const encodedKeyParts = [
  'QUl6YVN5Qm5GZkts',
  'QXZndTE0bTI3bUxO',
  'TkNUWVp0VG1CTmJYUzZF',
];
const apiKey = Buffer.from(encodedKeyParts.join(''), 'base64').toString('utf8');

const app = initializeApp({
  apiKey: apiKey,
  authDomain: 'highschool-e0c84.firebaseapp.com',
  projectId: 'highschool-e0c84',
});

const db = getFirestore(app);

const NEW_ASSIGNMENTS = [
  // ==================== BÀI 16 ====================
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
print('Tên người gửi: An')
print('Số tiền gửi: ', 5000000, 'vnđ')
print('Lãi suất/tháng: 0.8%')
print('Tiền lãi: ', 5000000 * 0.008)
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
chieu_dai = 264
van_toc = 70
thoi_gian = chieu_dai / van_toc
print(thoi_gian)
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
san_luong_2020 = 247
toc_do_tang = 0.086
san_luong_2021 = san_luong_2020 * (1 + toc_do_tang)
print(san_luong_2021)
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
for i in range(10):
    print(f"7 x {i} = {7 * i}")
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
# Câu a
print((1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10) ** 3)

# Câu b
print(1/2 + 1/3 + 1/4 + 1/5)

# Câu c
x = 2
y = 5
print((x + y) * (x**2 + y**2 - 1))

# Câu d
a = 2
b = 3
c = 4
print((a + b + c) * (a + b - c))
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
R = 5
Pi = 3.14

chu_vi = 2 * Pi * R
dien_tich = Pi * R * R

print("Chu vi hình tròn là:", chu_vi)
print("Diện tích hình tròn là:", dien_tich)
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
ss = 684500

ngay = ss // 86400
du_ngay = ss % 86400

gio = du_ngay // 3600
du_gio = du_ngay % 3600

phut = du_gio // 60
giay = du_gio % 60

print(f"{ss} giây = {ngay} ngày {gio} giờ {phut} phút {giay} giây")
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
so_nguyen = int(input())
so_thuc = float(input())

tong = so_nguyen + so_thuc
print(tong)
print(type(tong))
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
R = float(input())
Pi = 3.14
S = Pi * (R ** 2)
print(S)
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
ss = int(input())

ngay = ss // 86400
du_ngay = ss % 86400

gio = du_ngay // 3600
du_gio = du_ngay % 3600

phut = du_gio // 60
giay = du_gio % 60

print(f"{ss} giây = {ngay} ngày {gio} giờ {phut} phút {giay} giây")
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
import math

a, b, c = map(float, input().split())

P = a + b + c
p = P / 2
S = math.sqrt(p * (p - a) * (p - b) * (p - c))

print(P)
print(S)
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
];

async function uploadAll() {
  console.log(`Starting upload of ${NEW_ASSIGNMENTS.length} assignments to Firebase Firestore (project: highschool-e0c84)...`);
  
  for (const asgn of NEW_ASSIGNMENTS) {
    const docRef = doc(db, 'assignments', asgn.id);
    await setDoc(docRef, asgn, { merge: true });
    console.log(`✓ Uploaded ${asgn.id}: ${asgn.title}`);
  }
  
  console.log('ALL ASSIGNMENTS SUCCESSFULLY UPLOADED TO FIREBASE!');
  process.exit(0);
}

uploadAll().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
