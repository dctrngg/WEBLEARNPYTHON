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
  "Lớp khác",
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
  {
    uid: "usr_hskhac",
    username: "hskhac",
    email: "hskhac@python.edu.vn",
    displayName: "Học sinh (Lớp khác)",
    className: "Lớp khác",
    password: "123456",
    role: "student",
    createdAt: "2026-11-13T10:00:00.000Z",
  },
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
{
    "id": "asgn_16_1",
    "lessonId": "bai_16",
    "glyph": "●",
    "title": "Bài 16.1: Tính tiền lãi gửi tiết kiệm ngân hàng của bạn An (Luyện tập Bài 16)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Tài chính cá nhân - Bài 16 SGK Tin học 10)\nBạn An gửi tiết kiệm trực tuyến vào ngân hàng với mức lãi suất cố định `0.8%/tháng` (tương đương hệ số `0.008`). Hãy sử dụng lệnh `int(input())` để nhập số tiền gốc `so_tien` (VNĐ) và viết các câu lệnh `print()` hiển thị thông tin sổ tiết kiệm và số tiền lãi sau 1 tháng theo đúng định dạng mẫu.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nTên người gửi: An\nSố tiền gửi: 5000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi: 40000.0\n```\n\n*Tiền lãi được tính theo công thức: `so_tien * 0.008`.*\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên `so_tien` là số tiền gửi ban đầu.\n\n### Kết quả ra (Output)\nIn ra màn hình đúng 4 dòng thông tin theo mẫu: Tên người gửi, Số tiền gửi, Lãi suất/tháng và Tiền lãi.",
    "starterCode": "# Bài 16.1: Tính tiền lãi gửi tiết kiệm ngân hàng của bạn An\n# Hãy viết các câu lệnh nhập số tiền và in kết quả:\n",
    "testCases": [
      {
        "input": "5000000",
        "expectedOutput": "Tên người gửi: An\nSố tiền gửi: 5000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi: 40000.0",
        "isHidden": false
      },
      {
        "input": "10000000",
        "expectedOutput": "Tên người gửi: An\nSố tiền gửi: 10000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi: 80000.0",
        "isHidden": false
      },
      {
        "input": "2500000",
        "expectedOutput": "Tên người gửi: An\nSố tiền gửi: 2500000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi: 20000.0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_16_2",
    "lessonId": "bai_16",
    "glyph": "●",
    "title": "Bài 16.2: Ước tính chi phí điện năng tiêu thụ của máy điều hòa (Luyện tập Bài 16)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Tiết kiệm năng lượng gia đình - Bài 16 SGK Tin học 10)\nMột máy điều hòa tại phòng học tiêu thụ trung bình `1.5` kWh điện mỗi giờ hoạt động. Giá điện trung bình là `3000` VNĐ/kWh. Hãy sử dụng lệnh `int(input())` để nhập số giờ sử dụng `so_gio`, sau đó dùng biểu thức toán học và lệnh `print()` để in báo cáo điện năng tiêu thụ và tiền điện phải trả.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nSố giờ sử dụng: 100 giờ\nĐiện năng tiêu thụ: 150.0 kWh\nChi phí tiền điện: 450000.0 vnđ\n```\n\n*Điện năng tiêu thụ = `so_gio * 1.5`, Chi phí = `so_gio * 1.5 * 3000`.*\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên `so_gio` là tổng số giờ bật điều hòa trong tháng.\n\n### Kết quả ra (Output)\nIn ra 3 dòng gồm: Số giờ sử dụng, Điện năng tiêu thụ (kWh) và Chi phí tiền điện (VNĐ).",
    "starterCode": "# Bài 16.2: Ước tính chi phí điện năng tiêu thụ của máy điều hòa\n# Hãy viết các câu lệnh nhập số giờ sử dụng và in kết quả:\n",
    "testCases": [
      {
        "input": "100",
        "expectedOutput": "Số giờ sử dụng: 100 giờ\nĐiện năng tiêu thụ: 150.0 kWh\nChi phí tiền điện: 450000.0 vnđ",
        "isHidden": false
      },
      {
        "input": "60",
        "expectedOutput": "Số giờ sử dụng: 60 giờ\nĐiện năng tiêu thụ: 90.0 kWh\nChi phí tiền điện: 270000.0 vnđ",
        "isHidden": false
      },
      {
        "input": "120",
        "expectedOutput": "Số giờ sử dụng: 120 giờ\nĐiện năng tiêu thụ: 180.0 kWh\nChi phí tiền điện: 540000.0 vnđ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_16_3",
    "lessonId": "bai_16",
    "glyph": "●",
    "title": "Bài 16.3: Chia phần quà từ thiện cho học sinh vùng cao (Luyện tập Bài 16)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Hoạt động thiện nguyện học đường - Bài 16 SGK Tin học 10)\nHãy nhập vào `tong_so_vo` quyển vở mà đoàn trường quyên góp được để chia đều cho `25` học sinh tại một điểm trường vùng cao. Hãy sử dụng phép chia lấy thương nguyên (`//`) và phép chia lấy số dư (`%`) trong Python để tính số quyển vở mỗi học sinh nhận được và số quyển vở còn dư lại.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nTổng số vở: 260\nMỗi học sinh nhận: 10 quyển\nSố vở còn dư: 10 quyển\n```\n\n*Sử dụng toán tử `// 25` để tính thương nguyên và `% 25` để tính phần dư.*\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên `tong_so_vo`.\n\n### Kết quả ra (Output)\nIn ra 3 dòng theo mẫu: Tổng số vở, Số vở mỗi học sinh nhận và Số vở còn dư.",
    "starterCode": "# Bài 16.3: Chia phần quà từ thiện cho học sinh vùng cao\n# Hãy viết các câu lệnh nhập tổng số vở và in kết quả:\n",
    "testCases": [
      {
        "input": "260",
        "expectedOutput": "Tổng số vở: 260\nMỗi học sinh nhận: 10 quyển\nSố vở còn dư: 10 quyển",
        "isHidden": false
      },
      {
        "input": "500",
        "expectedOutput": "Tổng số vở: 500\nMỗi học sinh nhận: 20 quyển\nSố vở còn dư: 0 quyển",
        "isHidden": false
      },
      {
        "input": "312",
        "expectedOutput": "Tổng số vở: 312\nMỗi học sinh nhận: 12 quyển\nSố vở còn dư: 12 quyển",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_16_4",
    "lessonId": "bai_16",
    "glyph": "●",
    "title": "Bài 16.4: Tính thời gian tải tệp bài giảng qua mạng cáp quang (Luyện tập Bài 16)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Viễn thông & Internet - Bài 16 SGK Tin học 10)\nMột tệp video bài giảng Tin học có dung lượng `dung_luong_mb` (MB). Đường truyền mạng của trường có tốc độ tải xuống thực tế ổn định là `12.5` MB/giây. Hãy viết chương trình hiển thị dung lượng tệp, tốc độ mạng và thời gian cần thiết (tính bằng giây) để tải xong tệp đó.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nDung lượng tệp: 250 MB\nTốc độ mạng: 12.5 MB/s\nThời gian tải: 20.0 giây\n```\n\n*Thời gian tải được tính bằng công thức: `dung_luong_mb / 12.5`.*\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên `dung_luong_mb` là dung lượng tệp tính theo MB.\n\n### Kết quả ra (Output)\nIn ra đúng 3 dòng thông tin theo định dạng mẫu.",
    "starterCode": "# Bài 16.4: Tính thời gian tải tệp bài giảng qua mạng cáp quang\n# Hãy viết các câu lệnh nhập dung lượng tệp và in kết quả:\n",
    "testCases": [
      {
        "input": "250",
        "expectedOutput": "Dung lượng tệp: 250 MB\nTốc độ mạng: 12.5 MB/s\nThời gian tải: 20.0 giây",
        "isHidden": false
      },
      {
        "input": "500",
        "expectedOutput": "Dung lượng tệp: 500 MB\nTốc độ mạng: 12.5 MB/s\nThời gian tải: 40.0 giây",
        "isHidden": false
      },
      {
        "input": "125",
        "expectedOutput": "Dung lượng tệp: 125 MB\nTốc độ mạng: 12.5 MB/s\nThời gian tải: 10.0 giây",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_16_5",
    "lessonId": "bai_16",
    "glyph": "●",
    "title": "Bài 16.5: Tính diện tích phủ sóng bộ phát Wi-Fi thư viện (Luyện tập Bài 16)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Hạ tầng mạng trường học - Bài 16 SGK Tin học 10)\nThư viện trường lắp đặt một bộ phát Wi-Fi ở chính giữa phòng với bán kính phủ sóng ổn định là `ban_kinh` (mét). Hãy sử dụng toán tử lũy thừa (`**`) với số `pi = 3.14` để tính và in ra diện tích vùng phủ sóng Wi-Fi hình tròn.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nBán kính phủ sóng: 10 m\nDiện tích phủ sóng: 314.0 m2\n```\n\n*Công thức diện tích hình tròn: `3.14 * (ban_kinh ** 2)`.*\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên `ban_kinh` (mét) đã được đọc sẵn trong `starterCode`.\n\n### Kết quả ra (Output)\nIn ra 2 dòng gồm Bán kính phủ sóng và Diện tích phủ sóng (m2).",
    "starterCode": "# Bài 16.5: Tính diện tích phủ sóng bộ phát Wi-Fi thư viện\n# Hãy viết các câu lệnh nhập bán kính và in diện tích:\n",
    "testCases": [
      {
        "input": "10",
        "expectedOutput": "Bán kính phủ sóng: 10 m\nDiện tích phủ sóng: 314.0 m2",
        "isHidden": false
      },
      {
        "input": "20",
        "expectedOutput": "Bán kính phủ sóng: 20 m\nDiện tích phủ sóng: 1256.0 m2",
        "isHidden": false
      },
      {
        "input": "15",
        "expectedOutput": "Bán kính phủ sóng: 15 m\nDiện tích phủ sóng: 706.5 m2",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_17_1",
    "lessonId": "bai_17",
    "glyph": "●",
    "title": "Bài 17.1: Cập nhật điểm thưởng thẻ thành viên siêu thị (Luyện tập Bài 17)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Thương mại bán lẻ - Bài 17 SGK Tin học 10)\nKhách hàng có số điểm tích lũy ban đầu là `diem_hien_tai`. Khi mua hàng với hóa đơn `tien_mua_hang` (VNĐ), cứ mỗi `10000` VNĐ (tính phần nguyên) khách được cộng thêm 1 điểm thưởng. Sau đó khách dùng `50` điểm để đổi phiếu giảm giá. Hãy dùng biến và các phép gán cập nhật để tính số điểm cuối cùng.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nĐiểm ban đầu: 120\nĐiểm cộng thêm: 35\nTổng điểm còn lại: 105\n```\n\n*Điểm cộng thêm = `tien_mua_hang // 10000`; Điểm còn lại = `diem_hien_tai + diem_cong - 50`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Số nguyên `diem_hien_tai`.\nDòng 2: Số nguyên `tien_mua_hang`.\n\n### Kết quả ra (Output)\nIn ra 3 dòng: Điểm ban đầu, Điểm cộng thêm và Tổng điểm còn lại.",
    "starterCode": "# Bài 17.1: Cập nhật điểm thưởng thẻ thành viên siêu thị\n# Hãy viết các câu lệnh nhập điểm hiện tại, tiền mua hàng và in kết quả:\n",
    "testCases": [
      {
        "input": "120\n350000",
        "expectedOutput": "Điểm ban đầu: 120\nĐiểm cộng thêm: 35\nTổng điểm còn lại: 105",
        "isHidden": false
      },
      {
        "input": "80\n500000",
        "expectedOutput": "Điểm ban đầu: 80\nĐiểm cộng thêm: 50\nTổng điểm còn lại: 80",
        "isHidden": false
      },
      {
        "input": "200\n185000",
        "expectedOutput": "Điểm ban đầu: 200\nĐiểm cộng thêm: 18\nTổng điểm còn lại: 168",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_17_2",
    "lessonId": "bai_17",
    "glyph": "●",
    "title": "Bài 17.2: Tính chỉ số khối cơ thể BMI tại phòng y tế trường (Luyện tập Bài 17)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Sức khỏe học đường - Bài 17 SGK Tin học 10)\nPhòng y tế trường học cần tính chỉ số khối cơ thể (`BMI`) cho học sinh dựa trên biến cân nặng `can_nang` (kg) và chiều cao `chieu_cao` (m). Hãy gán công thức tính BMI vào biến `bmi` (làm tròn 2 chữ số thập phân bằng hàm `round(bmi, 2)`) và hiển thị ra màn hình.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nCân nặng: 54.0 kg\nChiều cao: 1.65 m\nChỉ số BMI: 19.83\n```\n\n*Công thức: `bmi = round(can_nang / (chieu_cao ** 2), 2)`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Số thực `can_nang` (kg).\nDòng 2: Số thực `chieu_cao` (m).\n\n### Kết quả ra (Output)\nIn ra 3 dòng gồm Cân nặng, Chiều cao và Chỉ số BMI.",
    "starterCode": "# Bài 17.2: Tính chỉ số khối cơ thể BMI tại phòng y tế trường\n# Hãy viết các câu lệnh nhập cân nặng, chiều cao và in kết quả:\n",
    "testCases": [
      {
        "input": "54.0\n1.65",
        "expectedOutput": "Cân nặng: 54.0 kg\nChiều cao: 1.65 m\nChỉ số BMI: 19.83",
        "isHidden": false
      },
      {
        "input": "60.0\n1.5",
        "expectedOutput": "Cân nặng: 60.0 kg\nChiều cao: 1.5 m\nChỉ số BMI: 26.67",
        "isHidden": false
      },
      {
        "input": "48.0\n1.6",
        "expectedOutput": "Cân nặng: 48.0 kg\nChiều cao: 1.6 m\nChỉ số BMI: 18.75",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_17_3",
    "lessonId": "bai_17",
    "glyph": "●",
    "title": "Bài 17.3: Hoán đổi vị trí hai thùng hàng trong kho tự động (Luyện tập Bài 17)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Kho vận thông minh - Bài 17 SGK Tin học 10)\nTrong hệ thống kho hàng tự động, robot cần hoán đổi mã kiện hàng giữa hai kệ `ke_A` và `ke_B`. Hãy sử dụng cú pháp gán đồng thời của Python (`ke_A, ke_B = ke_B, ke_A`) để đổi giá trị của hai biến và in trạng thái trước và sau khi hoán đổi.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nTrước khi đổi: Kệ A = BOX_101, Kệ B = BOX_205\nSau khi đổi: Kệ A = BOX_205, Kệ B = BOX_101\n```\n\n*Sử dụng lệnh gán đồng thời `ke_A, ke_B = ke_B, ke_A`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Chuỗi mã hàng ở `ke_A`.\nDòng 2: Chuỗi mã hàng ở `ke_B`.\n\n### Kết quả ra (Output)\nIn ra 2 dòng: Trạng thái trước khi đổi và Trạng thái sau khi đổi.",
    "starterCode": "# Bài 17.3: Hoán đổi vị trí hai thùng hàng trong kho tự động\n# Hãy viết các câu lệnh nhập tên hai kệ hàng và thực hiện hoán đổi:\n",
    "testCases": [
      {
        "input": "BOX_101\nBOX_205",
        "expectedOutput": "Trước khi đổi: Kệ A = BOX_101, Kệ B = BOX_205\nSau khi đổi: Kệ A = BOX_205, Kệ B = BOX_101",
        "isHidden": false
      },
      {
        "input": "LAPTOP_01\nMONITOR_09",
        "expectedOutput": "Trước khi đổi: Kệ A = LAPTOP_01, Kệ B = MONITOR_09\nSau khi đổi: Kệ A = MONITOR_09, Kệ B = LAPTOP_01",
        "isHidden": false
      },
      {
        "input": "BOOK_A\nBOOK_B",
        "expectedOutput": "Trước khi đổi: Kệ A = BOOK_A, Kệ B = BOOK_B\nSau khi đổi: Kệ A = BOOK_B, Kệ B = BOOK_A",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_17_4",
    "lessonId": "bai_17",
    "glyph": "●",
    "title": "Bài 17.4: Quy đổi chi phí du học từ USD sang VNĐ (Luyện tập Bài 17)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Tài chính & Du học - Bài 17 SGK Tin học 10)\nMột học sinh chuẩn bị hồ sơ du học cần đóng lệ phí thi chứng chỉ quốc tế là `phi_usd` (USD) và phí dịch thuật hồ sơ là `phi_dich_thuat` (VNĐ). Biết tỷ giá quy đổi hiện tại được gán vào biến `ty_gia = 25400`. Hãy gán và tính tổng chi phí bằng VNĐ.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nLệ phí quy đổi: 3810000 vnđ\nPhí dịch thuật: 500000 vnđ\nTổng chi phí: 4310000 vnđ\n```\n\n*Lệ phí quy đổi = `phi_usd * 25400`; Tổng chi phí = `le_phi_vnd + phi_dich_thuat`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Số nguyên `phi_usd`.\nDòng 2: Số nguyên `phi_dich_thuat`.\n\n### Kết quả ra (Output)\nIn ra 3 dòng gồm: Lệ phí quy đổi (VNĐ), Phí dịch thuật (VNĐ) và Tổng chi phí (VNĐ).",
    "starterCode": "# Bài 17.4: Quy đổi chi phí du học từ USD sang VNĐ\n# Hãy viết các câu lệnh nhập phí USD, phí dịch thuật và in kết quả:\n",
    "testCases": [
      {
        "input": "150\n500000",
        "expectedOutput": "Lệ phí quy đổi: 3810000 vnđ\nPhí dịch thuật: 500000 vnđ\nTổng chi phí: 4310000 vnđ",
        "isHidden": false
      },
      {
        "input": "200\n300000",
        "expectedOutput": "Lệ phí quy đổi: 5080000 vnđ\nPhí dịch thuật: 300000 vnđ\nTổng chi phí: 5380000 vnđ",
        "isHidden": false
      },
      {
        "input": "80\n250000",
        "expectedOutput": "Lệ phí quy đổi: 2032000 vnđ\nPhí dịch thuật: 250000 vnđ\nTổng chi phí: 2282000 vnđ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_17_5",
    "lessonId": "bai_17",
    "glyph": "●",
    "title": "Bài 17.5: Tính tổng thanh toán đơn đặt đồ ăn trực tuyến (Luyện tập Bài 17)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Ứng dụng giao đồ ăn - Bài 17 SGK Tin học 10)\nKhi đặt suất ăn trưa qua ứng dụng, khách hàng mua `so_suat` phần cơm với đơn giá `35000` VNĐ/phần, phí giao hàng cố định là `15000` VNĐ và được áp dụng mã giảm giá `giam_gia` (VNĐ). Hãy sử dụng các biến để tính tiền món ăn và tổng số tiền thực tế phải thanh toán.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nTiền món ăn: 140000 vnđ\nPhí giao hàng: 15000 vnđ\nTổng thanh toán: 135000 vnđ\n```\n\n*Tổng thanh toán = `so_suat * 35000 + 15000 - giam_gia`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Số nguyên `so_suat`.\nDòng 2: Số nguyên `giam_gia`.\n\n### Kết quả ra (Output)\nIn ra 3 dòng: Tiền món ăn, Phí giao hàng và Tổng thanh toán.",
    "starterCode": "# Bài 17.5: Tính tổng thanh toán đơn đặt đồ ăn trực tuyến\n# Hãy viết các câu lệnh nhập số suất ăn, số tiền giảm giá và in kết quả:\n",
    "testCases": [
      {
        "input": "4\n20000",
        "expectedOutput": "Tiền món ăn: 140000 vnđ\nPhí giao hàng: 15000 vnđ\nTổng thanh toán: 135000 vnđ",
        "isHidden": false
      },
      {
        "input": "2\n10000",
        "expectedOutput": "Tiền món ăn: 70000 vnđ\nPhí giao hàng: 15000 vnđ\nTổng thanh toán: 75000 vnđ",
        "isHidden": false
      },
      {
        "input": "5\n30000",
        "expectedOutput": "Tiền món ăn: 175000 vnđ\nPhí giao hàng: 15000 vnđ\nTổng thanh toán: 160000 vnđ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_18_1",
    "lessonId": "bai_18",
    "glyph": "●",
    "title": "Bài 18.1: Tạo thẻ thư viện điện tử cho học sinh lớp 10 (Luyện tập Bài 18)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Quản lý trường học số - Bài 18 SGK Tin học 10)\nThư viện nhà trường triển khai cấp thẻ bạn đọc điện tử. Hãy viết chương trình sử dụng lệnh `input()` để nhập lần lượt Họ và tên, Lớp và Năm sinh của học sinh, sau đó tính tuổi hiện tại (lấy năm `2026` trừ đi năm sinh) và in thông tin thẻ thư viện ra màn hình.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\n=== THẺ THƯ VIỆN ===\nHọ tên: Nguyen Minh Khoa\nLớp: 10A1\nTuổi: 16\n```\n\n*Sử dụng `int(input())` để chuyển năm sinh sang số nguyên trước khi tính `2026 - nam_sinh`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Chuỗi họ và tên học sinh.\nDòng 2: Chuỗi tên lớp (ví dụ: `10A1`).\nDòng 3: Số nguyên năm sinh.\n\n### Kết quả ra (Output)\nIn ra 4 dòng thông tin thẻ thư viện theo đúng định dạng mẫu.",
    "starterCode": "# Bài 18.1: Tạo thẻ thư viện điện tử cho học sinh lớp 10\n",
    "testCases": [
      {
        "input": "Nguyen Minh Khoa\n10A1\n2010",
        "expectedOutput": "=== THẺ THƯ VIỆN ===\nHọ tên: Nguyen Minh Khoa\nLớp: 10A1\nTuổi: 16",
        "isHidden": false
      },
      {
        "input": "Tran Thu Ha\n10A5\n2011",
        "expectedOutput": "=== THẺ THƯ VIỆN ===\nHọ tên: Tran Thu Ha\nLớp: 10A5\nTuổi: 15",
        "isHidden": false
      },
      {
        "input": "Le Hoang Nam\n10T2\n2010",
        "expectedOutput": "=== THẺ THƯ VIỆN ===\nHọ tên: Le Hoang Nam\nLớp: 10T2\nTuổi: 16",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_18_2",
    "lessonId": "bai_18",
    "glyph": "●",
    "title": "Bài 18.2: Chia đều hóa đơn liên hoan lớp (Bill Splitter) (Luyện tập Bài 18)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Đời sống học sinh - Bài 18 SGK Tin học 10)\nSau buổi liên hoan cuối tuần, nhóm học sinh cần chia đều tổng hóa đơn thanh toán (đã cộng thêm 10% phí phục vụ) cho tất cả thành viên tham gia. Hãy viết chương trình nhập vào tổng tiền món ăn (số thực) và số người tham gia (số nguyên), sau đó in ra tổng tiền sau phí phục vụ và số tiền mỗi người cần đóng.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nTổng hóa đơn: 550000.0 vnđ\nMỗi người đóng: 110000.0 vnđ\n```\n\n*Tổng hóa đơn = `round(tong_tien * 1.1, 1)`, Mỗi người đóng = `round(tong_hoa_don / so_nguoi, 1)`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Số thực `tong_tien` là tiền món ăn chưa tính phí.\nDòng 2: Số nguyên `so_nguoi` là số thành viên.\n\n### Kết quả ra (Output)\nIn ra 2 dòng: Tổng hóa đơn (gồm 10% phí) và Số tiền mỗi người đóng (làm tròn 1 chữ số thập phân bằng `round(..., 1)`).",
    "starterCode": "# Bài 18.2: Chia đều hóa đơn liên hoan lớp (Bill Splitter)\n",
    "testCases": [
      {
        "input": "500000\n5",
        "expectedOutput": "Tổng hóa đơn: 550000.0 vnđ\nMỗi người đóng: 110000.0 vnđ",
        "isHidden": false
      },
      {
        "input": "800000\n8",
        "expectedOutput": "Tổng hóa đơn: 880000.0 vnđ\nMỗi người đóng: 110000.0 vnđ",
        "isHidden": false
      },
      {
        "input": "360000\n4",
        "expectedOutput": "Tổng hóa đơn: 396000.0 vnđ\nMỗi người đóng: 99000.0 vnđ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_18_3",
    "lessonId": "bai_18",
    "glyph": "●",
    "title": "Bài 18.3: Quy đổi thời gian chạy bộ từ giây sang giờ - phút - giây (Luyện tập Bài 18)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Thể thao & Đồng hồ bấm giờ - Bài 18 SGK Tin học 10)\nĐồng hồ bấm giờ tại giải chạy việt dã của trường ghi nhận thành tích của vận động viên bằng tổng số giây `tong_giay`. Hãy viết chương trình nhập vào số nguyên `tong_giay` và quy đổi ra số giờ, số phút và số giây tương ứng.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\n1 giờ 1 phút 5 giây\n```\n\n*Gợi ý: `gio = tong_giay // 3600`, `phut = (tong_giay % 3600) // 60`, `giay = tong_giay % 60`.*\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên dương `tong_giay`.\n\n### Kết quả ra (Output)\nIn ra 1 dòng theo định dạng: `<gio> giờ <phut> phút <giay> giây`.",
    "starterCode": "# Bài 18.3: Quy đổi thời gian chạy bộ từ giây sang giờ - phút - giây\n",
    "testCases": [
      {
        "input": "3665",
        "expectedOutput": "1 giờ 1 phút 5 giây",
        "isHidden": false
      },
      {
        "input": "7322",
        "expectedOutput": "2 giờ 2 phút 2 giây",
        "isHidden": false
      },
      {
        "input": "1845",
        "expectedOutput": "0 giờ 30 phút 45 giây",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_18_4",
    "lessonId": "bai_18",
    "glyph": "●",
    "title": "Bài 18.4: Dự toán lượng sơn cần mua để trang trí bức tường lớp học (Luyện tập Bài 18)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Xây dựng & Trang trí nội thất - Bài 18 SGK Tin học 10)\nLớp 10A muốn sơn lại bức tường cuối lớp hình chữ nhật có chiều dài `dai` (m) và chiều cao `cao` (m). Biết rằng mỗi lít sơn phủ được `5` m2 tường. Hãy nhập chiều dài và chiều cao từ bàn phím, sau đó tính diện tích bức tường và số lít sơn cần mua.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nDiện tích tường: 28.0 m2\nLượng sơn cần dùng: 5.6 lít\n```\n\n*Diện tích = `dai * cao`, Lượng sơn = `dien_tich / 5`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Số thực `dai` (m).\nDòng 2: Số thực `cao` (m).\n\n### Kết quả ra (Output)\nIn ra 2 dòng: Diện tích tường (m2) và Lượng sơn cần dùng (lít).",
    "starterCode": "# Bài 18.4: Dự toán lượng sơn cần mua để trang trí bức tường lớp học\n",
    "testCases": [
      {
        "input": "8.0\n3.5",
        "expectedOutput": "Diện tích tường: 28.0 m2\nLượng sơn cần dùng: 5.6 lít",
        "isHidden": false
      },
      {
        "input": "10.0\n4.0",
        "expectedOutput": "Diện tích tường: 40.0 m2\nLượng sơn cần dùng: 8.0 lít",
        "isHidden": false
      },
      {
        "input": "6.5\n3.0",
        "expectedOutput": "Diện tích tường: 19.5 m2\nLượng sơn cần dùng: 3.9 lít",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_18_5",
    "lessonId": "bai_18",
    "glyph": "●",
    "title": "Bài 18.5: In phiếu xác nhận đặt vé xem phim rạp chiếu phim (Luyện tập Bài 18)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Giải trí & Đặt vé trực tuyến - Bài 18 SGK Tin học 10)\nHệ thống bán vé rạp chiếu phim cần in hóa đơn tóm tắt cho khách hàng. Hãy viết chương trình nhập vào Tên bộ phim, Số lượng vé và Đơn giá 1 vé (số nguyên), sau đó in ra phiếu xác nhận kèm tổng số tiền phải trả.\n\nVí dụ minh họa kết quả hiển thị trên màn hình:\n```text\nPhim: Dao Pho Va Piano\nSố vé: 3\nThành tiền: 180000 vnđ\n```\n\n*Thành tiền = `so_ve * don_gia`.*\n\n### Dữ liệu vào (Input)\nDòng 1: Chuỗi tên bộ phim.\nDòng 2: Số nguyên `so_ve`.\nDòng 3: Số nguyên `don_gia` (VNĐ).\n\n### Kết quả ra (Output)\nIn ra 3 dòng gồm Tên phim, Số lượng vé và Thành tiền.",
    "starterCode": "# Bài 18.5: In phiếu xác nhận đặt vé xem phim rạp chiếu phim\n",
    "testCases": [
      {
        "input": "Dao Pho Va Piano\n3\n60000",
        "expectedOutput": "Phim: Dao Pho Va Piano\nSố vé: 3\nThành tiền: 180000 vnđ",
        "isHidden": false
      },
      {
        "input": "Mat Biec\n2\n75000",
        "expectedOutput": "Phim: Mat Biec\nSố vé: 2\nThành tiền: 150000 vnđ",
        "isHidden": false
      },
      {
        "input": "Lat Mat 7\n5\n80000",
        "expectedOutput": "Phim: Lat Mat 7\nSố vé: 5\nThành tiền: 400000 vnđ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_1",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.1: Hệ thống cảnh báo chất lượng không khí AQI tại trường học (Luyện tập Bài 19)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Môi trường & Đô thị thông minh - Bài 19 SGK Tin học 10)\nTrạm quan trắc môi trường đặt tại cổng trường đo chỉ số chất lượng không khí `aqi` (số nguyên). Quy tắc phân loại như sau:\n- Nếu `aqi <= 50`: `Tốt`\n- Nếu `51 <= aqi <= 100`: `Trung bình`\n- Nếu `101 <= aqi <= 150`: `Kém`\n- Nếu `aqi > 150`: `Xấu`\nHãy viết chương trình nhập chỉ số `aqi` và in ra mức cảnh báo tương ứng.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên dương `aqi`.\n\n### Kết quả ra (Output)\nIn ra 1 dòng theo định dạng: `Chất lượng không khí: <Mức phân loại>`.",
    "starterCode": "# Bài 19.1: Hệ thống cảnh báo chất lượng không khí AQI tại trường học\naqi = int(input())\n# Viết câu lệnh rẽ nhánh if - elif - else tại đây:\n",
    "testCases": [
      {
        "input": "45",
        "expectedOutput": "Chất lượng không khí: Tốt",
        "isHidden": false
      },
      {
        "input": "85",
        "expectedOutput": "Chất lượng không khí: Trung bình",
        "isHidden": false
      },
      {
        "input": "120",
        "expectedOutput": "Chất lượng không khí: Kém",
        "isHidden": true
      },
      {
        "input": "165",
        "expectedOutput": "Chất lượng không khí: Xấu",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_2",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.2: Kiểm tra điều kiện độ tuổi lái xe máy điện (Luyện tập Bài 19)",
    "difficulty": "Beginner",
    "description": "### Đề bài (An toàn giao thông học đường)\nTheo quy định của Luật Giao thông đường bộ, người từ đủ 16 tuổi trở lên mới được phép điều khiển xe máy điện và xe gắn máy có dung tích dưới 50cc. Hãy viết chương trình nhập vào năm sinh `nam_sinh` của học sinh và năm hiện tại `nam_hien_tai`, tính tuổi của học sinh và kiểm tra xem học sinh có đủ điều kiện điều khiển xe máy điện hay không.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Năm sinh `nam_sinh` (số nguyên).\n- Dòng 2: Năm hiện tại `nam_hien_tai` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: In `Tuổi: <tuổi>`\n- Dòng 2: In `Đủ điều kiện lái xe máy điện` nếu tuổi >= 16, ngược lại in `Chưa đủ điều kiện lái xe máy điện`.",
    "starterCode": "# Bài 19.2: Kiểm tra điều kiện độ tuổi lái xe máy điện\nnam_sinh = int(input())\nnam_hien_tai = int(input())\n",
    "testCases": [
      {
        "input": "2010\n2026",
        "expectedOutput": "Tuổi: 16\nĐủ điều kiện lái xe máy điện",
        "isHidden": false
      },
      {
        "input": "2012\n2026",
        "expectedOutput": "Tuổi: 14\nChưa đủ điều kiện lái xe máy điện",
        "isHidden": false
      },
      {
        "input": "2008\n2026",
        "expectedOutput": "Tuổi: 18\nĐủ điều kiện lái xe máy điện",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_3",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.3: Phân loại kiện hàng bưu điện theo khối lượng (Luyện tập Bài 19)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Logistics bưu cục thông minh)\nMột bưu cục phân loại kiện hàng gửi đi dựa trên cân nặng `m` (đơn vị kg, số thực):\n- Nếu `m <= 2.0`: Phân loại là `Gói bưu phẩm nhẹ`\n- Nếu `2.0 < m <= 10.0`: Phân loại là `Gói bưu phẩm tiêu chuẩn`\n- Nếu `m > 10.0`: Phân loại là `Gói bưu phẩm cồng kềnh`\nHãy viết chương trình nhập khối lượng `m` và in ra phân loại tương ứng.",
    "starterCode": "# Bài 19.3: Phân loại kiện hàng bưu điện\nm = float(input())\n",
    "testCases": [
      {
        "input": "1.5",
        "expectedOutput": "Phân loại: Gói bưu phẩm nhẹ",
        "isHidden": false
      },
      {
        "input": "5.8",
        "expectedOutput": "Phân loại: Gói bưu phẩm tiêu chuẩn",
        "isHidden": false
      },
      {
        "input": "14.2",
        "expectedOutput": "Phân loại: Gói bưu phẩm cồng kềnh",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_4",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.4: Kiểm tra điều kiện cất cánh thiết bị bay nông nghiệp (Luyện tập Bài 19)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Nông nghiệp công nghệ cao)\nMột thiết bị bay không người lái (drone) dùng phun phân bón vi sinh cho cánh đồng chỉ được phép cất cánh khi thỏa mãn đồng thời cả 2 điều kiện an toàn:\n1. Tốc độ gió `gio` không vượt quá 20 km/h (`gio <= 20`).\n2. Lượng mưa `mua` bằng 0 mm (`mua == 0`).\nHãy viết chương trình nhập 2 số thực `gio` và `mua`, kiểm tra và in thông báo.",
    "starterCode": "# Bài 19.4: Kiểm tra điều kiện cất cánh drone nông nghiệp\ngio = float(input())\nmua = float(input())\n",
    "testCases": [
      {
        "input": "15.0\n0.0",
        "expectedOutput": "Trạng thái: Cho phép cất cánh",
        "isHidden": false
      },
      {
        "input": "25.5\n0.0",
        "expectedOutput": "Trạng thái: Cấm bay do điều kiện thời tiết",
        "isHidden": false
      },
      {
        "input": "12.0\n3.5",
        "expectedOutput": "Trạng thái: Cấm bay do điều kiện thời tiết",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_5",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.5: Tính tiền điện sinh hoạt hộ gia đình theo 3 bậc thang (Luyện tập Bài 19)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Kinh tế hộ gia đình - Bài 19 SGK Tin học 10)\nCông ty Điện lực áp dụng biểu giá điện sinh hoạt bậc thang đơn giản hóa cho hộ gia đình với lượng tiêu thụ `kwh` (số nguyên dương) trong tháng như sau:\n- Bậc 1 (cho 50 kWh đầu tiên): `1678` đ/kWh.\n- Bậc 2 (từ kWh thứ 51 đến 100): `1734` đ/kWh.\n- Bậc 3 (cho kWh thứ 101 trở lên): `2014` đ/kWh.\nHãy viết chương trình nhập số `kwh` tiêu thụ và tính tổng số tiền điện phải trả.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên dương `kwh` là số kWh điện đã dùng.\n\n### Kết quả ra (Output)\nIn ra 1 dòng: `Tiền điện: <số tiền> đồng`.",
    "starterCode": "# Bài 19.5: Tính tiền điện sinh hoạt theo 3 bậc thang\nkwh = int(input())\n",
    "testCases": [
      {
        "input": "40",
        "expectedOutput": "Tiền điện: 67120 đồng",
        "isHidden": false
      },
      {
        "input": "80",
        "expectedOutput": "Tiền điện: 135920 đồng",
        "isHidden": false
      },
      {
        "input": "150",
        "expectedOutput": "Tiền điện: 271300 đồng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_6",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.6: Xét duyệt học bổng khuyến khích học tập cuối học kì (Luyện tập Bài 19)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Quản lý trường học)\nHọc sinh đạt học bổng khi thỏa mãn:\n- Điểm trung bình `dtb >= 8.0` và Điểm rèn luyện `drl >= 80`.\nMức học bổng xét theo quy tắc sau:\n- Nếu `dtb >= 9.0` và `drl >= 90`: Học bổng `Xuất sắc` (trị giá 1,000,000đ).\n- Nếu thỏa mãn điều kiện chung nhưng chưa đạt Xuất sắc: Học bổng `Khá giỏi` (trị giá 500,000đ).\n- Ngược lại: `Không đạt` (trị giá 0đ).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Điểm trung bình `dtb` (số thực).\n- Dòng 2: Điểm rèn luyện `drl` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Xếp loại: <Mức>`\n- Dòng 2: `Tiền thưởng: <Số tiền> VNĐ`",
    "starterCode": "# Bài 19.6: Xét duyệt học bổng\ndtb = float(input())\ndrl = int(input())\n",
    "testCases": [
      {
        "input": "9.2\n95",
        "expectedOutput": "Xếp loại: Xuất sắc\nTiền thưởng: 1000000 VNĐ",
        "isHidden": false
      },
      {
        "input": "8.5\n82",
        "expectedOutput": "Xếp loại: Khá giỏi\nTiền thưởng: 500000 VNĐ",
        "isHidden": false
      },
      {
        "input": "8.2\n75",
        "expectedOutput": "Xếp loại: Không đạt\nTiền thưởng: 0 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_7",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.7: Tính cước phí giao hàng nhanh kèm phụ phí giờ cao điểm (Luyện tập Bài 19)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Ứng dụng giao hàng công nghệ)\nCước phí giao hàng được tính theo khoảng cách `km` (số thực) và khung giờ đặt hàng `gio` (số nguyên từ 0 đến 23):\n- Cước gốc: `5000` đồng cho mỗi km.\n- Phụ phí giờ cao điểm: Nếu đặt trong khoảng từ 17h đến 19h (17 <= gio <= 19) thì cộng thêm `10000` đồng phụ phí.\n- Ưu đãi: Nếu quãng đường `km > 10` thì được giảm `10%` tổng cước (lấy phần nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Quãng đường `km` (số thực).\n- Dòng 2: Giờ đặt hàng `gio` (số nguyên).\n\n### Kết quả ra (Output)\nIn ra số tiền cước cuối cùng (số nguyên): `Tổng cước: <tiền> đồng`.",
    "starterCode": "# Bài 19.7: Tính cước phí giao hàng nhanh\nkm = float(input())\ngio = int(input())\n",
    "testCases": [
      {
        "input": "5.0\n18",
        "expectedOutput": "Tổng cước: 35000 đồng",
        "isHidden": false
      },
      {
        "input": "12.0\n14",
        "expectedOutput": "Tổng cước: 54000 đồng",
        "isHidden": false
      },
      {
        "input": "12.0\n17",
        "expectedOutput": "Tổng cước: 63000 đồng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_8",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.8: Tính giá vé tham quan công viên nước cuối tuần (Luyện tập Bài 19)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Dịch vụ giải trí cuối tuần)\nCông viên nước bán vé theo độ tuổi `tuoi` và loại ngày `la_cuoi_tuan` (nhập 1 nếu là thứ Bảy/Chủ Nhật, nhập 0 nếu là ngày trong tuần):\n- Trẻ em (tuoi < 12): Giá vé ngày thường là `80000` đồng.\n- Người lớn (tuoi >= 12): Giá vé ngày thường là `150000` đồng.\n- Nếu là ngày cuối tuần (`la_cuoi_tuan == 1`), giá vé tăng thêm 20%.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tuổi `tuoi` (số nguyên).\n- Dòng 2: `la_cuoi_tuan` (số nguyên 0 hoặc 1).\n\n### Kết quả ra (Output)\nIn ra: `Giá vé: <số tiền> đồng` (số nguyên).",
    "starterCode": "# Bài 19.8: Tính giá vé công viên nước\ntuoi = int(input())\nla_cuoi_tuan = int(input())\n",
    "testCases": [
      {
        "input": "10\n0",
        "expectedOutput": "Giá vé: 80000 đồng",
        "isHidden": false
      },
      {
        "input": "10\n1",
        "expectedOutput": "Giá vé: 96000 đồng",
        "isHidden": false
      },
      {
        "input": "25\n1",
        "expectedOutput": "Giá vé: 180000 đồng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_9",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.9: Hệ thống đánh giá và phân loại rủi ro tín dụng khách hàng (Luyện tập Bài 19)",
    "difficulty": "Advanced",
    "description": "### Đề bài (FinTech & Ngân hàng số)\nMột ứng dụng ngân hàng tự động đánh giá hồ sơ vay tín chấp dựa trên thu nhập tháng `thu_nhap` (VNĐ) và tỷ lệ nợ trên thu nhập `dti` (tính theo %, ví dụ 35% nhập là 35.0):\n- Nếu `thu_nhap < 8000000`: Phân loại `Từ chối vay`.\n- Nếu `thu_nhap >= 8000000`:\n  + Nếu `dti <= 30.0`: Phân loại `Rủi ro thấp - Duyệt ngay`\n  + Nếu `30.0 < dti <= 50.0`: Phân loại `Rủi ro vừa - Cần thẩm định`\n  + Nếu `dti > 50.0`: Phân loại `Rủi ro cao - Từ chối vay`\n\n### Dữ liệu vào (Input)\n- Dòng 1: Thu nhập tháng `thu_nhap` (số nguyên).\n- Dòng 2: Tỷ lệ nợ `dti` (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Kết quả: <Phân loại>`",
    "starterCode": "# Bài 19.9: Phân loại rủi ro tín dụng\nthu_nhap = int(input())\ndti = float(input())\n",
    "testCases": [
      {
        "input": "15000000\n25.0",
        "expectedOutput": "Kết quả: Rủi ro thấp - Duyệt ngay",
        "isHidden": false
      },
      {
        "input": "12000000\n40.5",
        "expectedOutput": "Kết quả: Rủi ro vừa - Cần thẩm định",
        "isHidden": false
      },
      {
        "input": "6000000\n20.0",
        "expectedOutput": "Kết quả: Từ chối vay",
        "isHidden": true
      },
      {
        "input": "20000000\n55.0",
        "expectedOutput": "Kết quả: Rủi ro cao - Từ chối vay",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_19_10",
    "lessonId": "bai_19",
    "glyph": "●",
    "title": "Bài 19.10: Tính thuế thu nhập cá nhân lũy tiến từng phần (Luyện tập Bài 19)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Chính sách thuế & Tài chính cá nhân)\nThu nhập tính thuế `tntt` (triệu VNĐ) được tính thuế lũy tiến từng phần theo 3 bậc đơn giản hóa:\n- Bậc 1 (đến 5 triệu): thuế suất `5%`.\n- Bậc 2 (trên 5 triệu đến 10 triệu): 5 triệu đầu tính 5%, phần từ trên 5 đến 10 triệu tính `10%`.\n- Bậc 3 (trên 10 triệu): 5 triệu đầu tính 5%, 5 triệu tiếp theo tính 10%, phần vượt trên 10 triệu tính `15%`.\nNếu `tntt <= 0` thì tiền thuế bằng 0.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số thực `tntt` là thu nhập tính thuế (đơn vị: triệu VNĐ).\n\n### Kết quả ra (Output)\nIn ra tiền thuế phải nộp (đơn vị: triệu VNĐ, làm tròn 2 chữ số thập phân): `Thuế TNCN: <số tiền> triệu VNĐ`.",
    "starterCode": "# Bài 19.10: Thuế thu nhập cá nhân lũy tiến\ntntt = float(input())\n",
    "testCases": [
      {
        "input": "4.0",
        "expectedOutput": "Thuế TNCN: 0.20 triệu VNĐ",
        "isHidden": false
      },
      {
        "input": "8.0",
        "expectedOutput": "Thuế TNCN: 0.55 triệu VNĐ",
        "isHidden": false
      },
      {
        "input": "15.0",
        "expectedOutput": "Thuế TNCN: 1.50 triệu VNĐ",
        "isHidden": true
      },
      {
        "input": "-2.0",
        "expectedOutput": "Thuế TNCN: 0.00 triệu VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_1",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.1: Tính tổng tiền quyên góp sách qua N ngày hội trại (Luyện tập Bài 20)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Hoạt động Đoàn & Công tác xã hội)\nTrong đợt hội trại thiện nguyện gây quỹ tủ sách cho học sinh vùng cao, ban tổ chức ghi nhận số tiền quyên góp được trong `n` ngày. Hãy viết chương trình nhập số ngày `n` và số tiền quyên góp của từng ngày, sau đó dùng vòng lặp `for` để tính tổng số tiền quyên góp được.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên dương `n` là số ngày tổ chức.\n- `n` dòng tiếp theo: Mỗi dòng là một số nguyên `tien` (VNĐ) của ngày đó.\n\n### Kết quả ra (Output)\nIn ra 1 dòng: `Tổng tiền quyên góp: <tổng> VNĐ`.",
    "starterCode": "# Bài 20.1: Tính tổng tiền quyên góp sách\nn = int(input())\n",
    "testCases": [
      {
        "input": "3\n150000\n200000\n180000",
        "expectedOutput": "Tổng tiền quyên góp: 530000 VNĐ",
        "isHidden": false
      },
      {
        "input": "4\n50000\n75000\n100000\n25000",
        "expectedOutput": "Tổng tiền quyên góp: 250000 VNĐ",
        "isHidden": false
      },
      {
        "input": "1\n500000",
        "expectedOutput": "Tổng tiền quyên góp: 500000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_2",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.2: Đếm số ngày nắng nóng vượt ngưỡng trong đợt quan trắc (Luyện tập Bài 20)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Khí tượng thủy văn)\nTrung tâm Dự báo Khí tượng quan trắc nhiệt độ cao nhất trong `n` ngày hè. Ngày được gọi là \"nắng nóng gay gắt\" nếu nhiệt độ đạt từ `35.0` độ C trở lên. Hãy nhập `n` và nhiệt độ của `n` ngày, dùng vòng lặp `for` để đếm số ngày nắng nóng gay gắt.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên `n` (số ngày).\n- `n` dòng tiếp theo: Mỗi dòng là nhiệt độ của 1 ngày (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Số ngày nắng nóng: <số ngày>`.",
    "starterCode": "# Bài 20.2: Đếm số ngày nắng nóng\nn = int(input())\n",
    "testCases": [
      {
        "input": "5\n34.5\n36.2\n35.0\n33.8\n37.1",
        "expectedOutput": "Số ngày nắng nóng: 3",
        "isHidden": false
      },
      {
        "input": "3\n30.0\n32.5\n31.0",
        "expectedOutput": "Số ngày nắng nóng: 0",
        "isHidden": false
      },
      {
        "input": "4\n35.1\n35.2\n35.0\n36.0",
        "expectedOutput": "Số ngày nắng nóng: 4",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_3",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.3: Liệt kê các mốc giờ kiểm tra máy chủ định kỳ trong ngày (Luyện tập Bài 20)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Vận hành trung tâm dữ liệu)\nHệ thống tự động thực hiện sao lưu và kiểm tra an ninh máy chủ bắt đầu từ mốc giờ `start` (0 <= start < 24) và lặp lại định kỳ sau mỗi `step` giờ cho đến hết 24 giờ trong ngày (giờ < 24). Hãy dùng `range(start, 24, step)` để in danh sách các mốc giờ kiểm tra trên cùng 1 dòng, cách nhau bởi dấu cách.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Mốc giờ bắt đầu `start` (số nguyên).\n- Dòng 2: Khoảng cách giờ `step` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra: `Các mốc giờ: <danh sách giờ cách nhau 1 khoảng trắng>`.",
    "starterCode": "# Bài 20.3: Mốc giờ kiểm tra máy chủ định kỳ\nstart = int(input())\nstep = int(input())\n",
    "testCases": [
      {
        "input": "2\n4",
        "expectedOutput": "Các mốc giờ: 2 6 10 14 18 22",
        "isHidden": false
      },
      {
        "input": "0\n6",
        "expectedOutput": "Các mốc giờ: 0 6 12 18",
        "isHidden": false
      },
      {
        "input": "1\n5",
        "expectedOutput": "Các mốc giờ: 1 6 11 16 21",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_4",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.4: In bảng cửu chương nhân K phục vụ học tập (Luyện tập Bài 20)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Ứng dụng giáo dục)\nViết chương trình nhập số nguyên dương `k` (1 <= k <= 9) và dùng vòng lặp `for` với hàm `range(1, 11)` để in ra bảng cửu chương nhân `k` từ 1 đến 10 theo đúng mẫu `k x i = k*i`.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `k`.\n\n### Kết quả ra (Output)\nĐúng 10 dòng, mỗi dòng theo mẫu: `<k> x <i> = <tích>` (i chạy từ 1 đến 10).",
    "starterCode": "# Bài 20.4: In bảng cửu chương nhân K\nk = int(input())\n",
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
        "isHidden": false
      },
      {
        "input": "7",
        "expectedOutput": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_5",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.5: Tính tổng số cây xanh trồng được trong chiến dịch Mùa hè xanh (Luyện tập Bài 20)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Chiến dịch vì môi trường)\nĐoàn thanh niên phát động chiến dịch trồng cây xanh trong `n` ngày. Ngày thứ nhất trồng được `a` cây. Mỗi ngày sau đó, lực lượng tham gia đông hơn nên số cây trồng được tăng thêm `d` cây so với ngày hôm trước (ngày 2 trồng a+d cây, ngày 3 trồng a+2d cây...). Hãy tính tổng số cây xanh trồng được sau toàn bộ `n` ngày.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên `a` (số cây ngày đầu).\n- Dòng 2: Số nguyên `d` (số cây tăng mỗi ngày).\n- Dòng 3: Số nguyên `n` (số ngày chiến dịch).\n\n### Kết quả ra (Output)\nIn ra: `Tổng số cây trồng được: <tổng> cây`.",
    "starterCode": "# Bài 20.5: Tổng số cây xanh trồng được\na = int(input())\nd = int(input())\nn = int(input())\n",
    "testCases": [
      {
        "input": "10\n2\n5",
        "expectedOutput": "Tổng số cây trồng được: 70 cây",
        "isHidden": false
      },
      {
        "input": "50\n5\n3",
        "expectedOutput": "Tổng số cây trồng được: 165 cây",
        "isHidden": false
      },
      {
        "input": "20\n0\n10",
        "expectedOutput": "Tổng số cây trồng được: 200 cây",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_6",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.6: In bảng ước tính chi phí thuê sân bóng đá theo số giờ (Luyện tập Bài 20)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Thể thao trường học)\nBan quản lý sân bóng mini công bố đơn giá thuê: 1 giờ đầu giá 150000đ, từ giờ thứ 2 trở đi mỗi giờ tiếp theo được giảm 20000đ (tức là giờ thứ 2 tính 130000đ, giờ 3 tính 130000đ...). Hãy viết chương trình nhập số giờ `h` mà đội bóng dự định thuê (1 <= h <= 5), in ra bảng tích lũy chi phí từ 1 đến `h` giờ.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `h`.\n\n### Kết quả ra (Output)\nIn ra `h` dòng, dòng thứ `i` có dạng: `Thuê <i> giờ: <tổng tiền> VNĐ`.",
    "starterCode": "# Bài 20.6: Chi phí thuê sân bóng\nh = int(input())\n",
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "Thuê 1 giờ: 150000 VNĐ\nThuê 2 giờ: 280000 VNĐ\nThuê 3 giờ: 410000 VNĐ",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "Thuê 1 giờ: 150000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_7",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.7: Kiểm định chất lượng độ sáng bóng đèn LED (Luyện tập Bài 20)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Quản lý chất lượng sản phẩm xưởng sản xuất)\nMột xưởng sản xuất kiểm định `n` bóng đèn LED. Đèn được xem là đạt chuẩn thương mại nếu độ sáng `lumen` (số nguyên) nằm trong dải từ `800` đến `1200` lumen (bao gồm cả 800 và 1200). Hãy dùng vòng lặp `for` để đếm số bóng đạt chuẩn và in tỷ lệ đạt chuẩn theo phần trăm (làm tròn 1 chữ số thập phân).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên dương `n` (số bóng đèn kiểm định).\n- `n` dòng tiếp theo: Mỗi dòng là độ sáng của 1 bóng đèn.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng đạt chuẩn: <số lượng>/<n>`\n- Dòng 2: `Tỷ lệ đạt chuẩn: <tỷ lệ>%`",
    "starterCode": "# Bài 20.7: Kiểm định bóng đèn LED\nn = int(input())\n",
    "testCases": [
      {
        "input": "5\n850\n1250\n900\n780\n1100",
        "expectedOutput": "Số lượng đạt chuẩn: 3/5\nTỷ lệ đạt chuẩn: 60.0%",
        "isHidden": false
      },
      {
        "input": "4\n800\n1200\n1000\n950",
        "expectedOutput": "Số lượng đạt chuẩn: 4/4\nTỷ lệ đạt chuẩn: 100.0%",
        "isHidden": false
      },
      {
        "input": "2\n500\n1500",
        "expectedOutput": "Số lượng đạt chuẩn: 0/2\nTỷ lệ đạt chuẩn: 0.0%",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_8",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.8: Bảng theo dõi tăng trưởng tiền gửi tiết kiệm lãi kép hàng năm (Luyện tập Bài 20)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Tài chính cá nhân dài hạn)\nBác Ba gửi ngân hàng số tiền gốc `p` (VNĐ) với lãi suất cố định `r`%/năm. Tiền lãi mỗi năm được tự động nhập gốc để tính lãi cho năm sau (lãi kép). Dùng vòng lặp `for` để tính và in số dư tài khoản sau từng năm qua `n` năm (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền gốc `p` (số nguyên).\n- Dòng 2: Lãi suất `r` (số thực tính theo %, ví dụ 7.0 là 7%).\n- Dòng 3: Số năm `n` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra `n` dòng, mỗi dòng theo định dạng: `Năm <i>: <số dư> VNĐ` (số dư lấy phần nguyên).",
    "starterCode": "# Bài 20.8: Bảng tăng trưởng lãi kép\np = int(input())\nr = float(input())\nn = int(input())\n",
    "testCases": [
      {
        "input": "10000000\n10.0\n3",
        "expectedOutput": "Năm 1: 11000000 VNĐ\nNăm 2: 12100000 VNĐ\nNăm 3: 13310000 VNĐ",
        "isHidden": false
      },
      {
        "input": "5000000\n6.0\n2",
        "expectedOutput": "Năm 1: 5300000 VNĐ\nNăm 2: 5618000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_9",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.9: Phân phối thí sinh vào các phòng thi tốt nghiệp THPT (Luyện tập Bài 20)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Công tác khảo thí & Quản lý thi)\nCó `tong_ts` thí sinh đăng ký dự thi. Mỗi phòng thi xếp tối đa `suc_chua` thí sinh (ví dụ 24 bạn). Hãy viết chương trình xác định tổng số phòng thi cần chuẩn bị, sau đó dùng vòng lặp `for` để in danh sách số lượng thí sinh của từng phòng thi từ phòng 1 đến phòng cuối cùng.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tổng số thí sinh `tong_ts` (số nguyên dương).\n- Dòng 2: Sức chứa tối đa của một phòng `suc_chua` (số nguyên dương).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số phòng: <số phòng>`\n- Tiếp theo là thông tin từng phòng: `Phòng <i>: <số thí sinh> thí sinh`.",
    "starterCode": "# Bài 20.9: Phân phối phòng thi\ntong_ts = int(input())\nsuc_chua = int(input())\n",
    "testCases": [
      {
        "input": "55\n24",
        "expectedOutput": "Tổng số phòng: 3\nPhòng 1: 24 thí sinh\nPhòng 2: 24 thí sinh\nPhòng 3: 7 thí sinh",
        "isHidden": false
      },
      {
        "input": "48\n24",
        "expectedOutput": "Tổng số phòng: 2\nPhòng 1: 24 thí sinh\nPhòng 2: 24 thí sinh",
        "isHidden": false
      },
      {
        "input": "15\n20",
        "expectedOutput": "Tổng số phòng: 1\nPhòng 1: 15 thí sinh",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_20_10",
    "lessonId": "bai_20",
    "glyph": "●",
    "title": "Bài 20.10: Giải bài toán dân gian Vừa gà vừa chó tổng quát (Luyện tập Bài 20)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Toán học ứng dụng & Tư duy thuật toán)\nCho biết tổng số con là `n` (gồm cả gà và chó) và tổng số chân là `m`. Biết mỗi con gà có 2 chân, mỗi con chó có 4 chân. Dùng vòng lặp `for ga in range(0, n + 1)` để vét cạn tìm số gà và số chó thỏa mãn. Nếu tìm thấy nghiệm in ra số gà và số chó, nếu không có nghiệm hợp lệ in ra `Không có phương án`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tổng số con `n` (số nguyên dương).\n- Dòng 2: Tổng số chân `m` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra: `Số gà: <gà>, Số chó: <chó>` hoặc `Không có phương án`.",
    "starterCode": "# Bài 20.10: Vừa gà vừa chó tổng quát\nn = int(input())\nm = int(input())\n",
    "testCases": [
      {
        "input": "36\n100",
        "expectedOutput": "Số gà: 22, Số chó: 14",
        "isHidden": false
      },
      {
        "input": "10\n25",
        "expectedOutput": "Không có phương án",
        "isHidden": false
      },
      {
        "input": "20\n60",
        "expectedOutput": "Số gà: 10, Số chó: 10",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_1",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.1: Tính số tháng tiết kiệm để đủ tiền mua laptop học tập (Luyện tập Bài 21)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Kế hoạch tài chính sinh viên)\nBạn Nam muốn mua một chiếc laptop phục vụ học lập trình có giá `gia_laptop` (VNĐ). Ban đầu Nam có số tiền `hien_co` (VNĐ). Mỗi tháng Nam tiết kiệm thêm cố định `tiet_kiem` (VNĐ). Dùng vòng lặp `while` để tính sau bao nhiêu tháng Nam sẽ đủ tiền mua laptop.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Giá laptop `gia_laptop` (số nguyên).\n- Dòng 2: Số tiền hiện có `hien_co` (số nguyên).\n- Dòng 3: Tiền tiết kiệm mỗi tháng `tiet_kiem` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra: `Số tháng cần tích lũy: <số tháng>`.",
    "starterCode": "# Bài 21.1: Tiết kiệm mua laptop\ngia_laptop = int(input())\nhien_co = int(input())\ntiet_kiem = int(input())\n",
    "testCases": [
      {
        "input": "15000000\n3000000\n2000000",
        "expectedOutput": "Số tháng cần tích lũy: 6",
        "isHidden": false
      },
      {
        "input": "10000000\n10000000\n1500000",
        "expectedOutput": "Số tháng cần tích lũy: 0",
        "isHidden": false
      },
      {
        "input": "20000000\n5000000\n3000000",
        "expectedOutput": "Số tháng cần tích lũy: 5",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_2",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.2: Mô phỏng bộ sạc nhanh pin xe máy điện đến mức an toàn (Luyện tập Bài 21)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Giao thông xanh & Trạm sạc thông minh)\nMột trạm sạc pin xe máy điện bắt đầu sạc khi pin còn `muc_pin` % (số nguyên). Ở chế độ sạc nhanh, mỗi phút pin tăng thêm `2`%. Để bảo vệ tuổi thọ của cell pin Lithium-ion, trạm sẽ tự động ngắt chế độ sạc nhanh khi pin đạt từ `80`% trở lên. Dùng vòng lặp `while` để tính số phút sạc nhanh cho đến khi đạt ngưỡng 80%.\n\n### Dữ liệu vào (Input)\nMột số nguyên `muc_pin` là phần trăm pin ban đầu (0 <= muc_pin < 80).\n\n### Kết quả ra (Output)\n- Dòng 1: `Thời gian sạc: <phút> phút`\n- Dòng 2: `Mức pin đạt được: <pin>%`",
    "starterCode": "# Bài 21.2: Bộ sạc nhanh xe máy điện\nmuc_pin = int(input())\n",
    "testCases": [
      {
        "input": "55",
        "expectedOutput": "Thời gian sạc: 13 phút\nMức pin đạt được: 81%",
        "isHidden": false
      },
      {
        "input": "78",
        "expectedOutput": "Thời gian sạc: 1 phút\nMức pin đạt được: 80%",
        "isHidden": false
      },
      {
        "input": "20",
        "expectedOutput": "Thời gian sạc: 30 phút\nMức pin đạt được: 80%",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_3",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.3: Mô phỏng chuỗi rút tiền liên tiếp tại cây ATM (Luyện tập Bài 21)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Dịch vụ ngân hàng tự động)\nTài khoản của bạn có số dư ban đầu `so_du` (VNĐ). Mỗi lần thực hiện thao tác rút tiền, cây ATM nhả ra một số tiền cố định `rut` (VNĐ). Quy định số dư tối thiểu duy trì tài khoản là 50000đ. Vòng lặp `while` tiếp tục cho phép rút tiền chừng nào số dư sau khi rút vẫn >= 50000đ. Hãy đếm số lần rút tối đa và số dư còn lại cuối cùng.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số dư ban đầu `so_du` (số nguyên).\n- Dòng 2: Số tiền mỗi lần rút `rut` (số nguyên dương).\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lần rút tiền: <số lần>`\n- Dòng 2: `Số dư còn lại: <số dư> VNĐ`",
    "starterCode": "# Bài 21.3: Rút tiền tại cây ATM\nso_du = int(input())\nrut = int(input())\n",
    "testCases": [
      {
        "input": "2000000\n500000",
        "expectedOutput": "Số lần rút tiền: 3\nSố dư còn lại: 500000 VNĐ",
        "isHidden": false
      },
      {
        "input": "500000\n200000",
        "expectedOutput": "Số lần rút tiền: 2\nSố dư còn lại: 100000 VNĐ",
        "isHidden": false
      },
      {
        "input": "100000\n200000",
        "expectedOutput": "Số lần rút tiền: 0\nSố dư còn lại: 100000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_4",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.4: Đếm số lần nén tệp ảnh cho đến khi thỏa mãn dung lượng tải lên (Luyện tập Bài 21)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Xử lý đa phương tiện trên website)\nMột hệ thống nộp bài trực tuyến chỉ cho phép tệp ảnh có dung lượng không vượt quá `gioi_han` KB (số thực). Một bức ảnh hiện tại có dung lượng `dung_luong` KB. Mỗi lần chạy thuật toán nén ảnh, dung lượng tệp giảm 20% (tức dung lượng mới bằng `dung_luong * 0.8`). Hãy dùng vòng lặp `while` để tính số lần nén ảnh cần thiết.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng ban đầu `dung_luong` (số thực).\n- Dòng 2: Giới hạn cho phép `gioi_han` (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Số lần nén: <số lần>`.",
    "starterCode": "# Bài 21.4: Đếm số lần nén ảnh\ndung_luong = float(input())\ngioi_han = float(input())\n",
    "testCases": [
      {
        "input": "1000.0\n600.0",
        "expectedOutput": "Số lần nén: 3",
        "isHidden": false
      },
      {
        "input": "500.0\n500.0",
        "expectedOutput": "Số lần nén: 0",
        "isHidden": false
      },
      {
        "input": "2048.0\n500.0",
        "expectedOutput": "Số lần nén: 7",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_5",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.5: Chia tối đa số túi quà cứu trợ đồng đều (Thuật toán Euclid) (Luyện tập Bài 21)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Hoạt động cứu trợ đồng bào lũ lụt)\nĐoàn thiện nguyện có `a` gói bánh và `b` chai nước khoáng. Cần chia toàn bộ số bánh và nước này vào các túi quà sao cho mỗi túi đều có số bánh như nhau và số nước như nhau (không còn thừa). Số lượng túi quà nhiều nhất có thể chia chính là Ước chung lớn nhất (UCLN) của `a` và `b`. Hãy dùng thuật toán Euclid với vòng lặp `while a != b` (hoặc phép chia lấy dư) để tìm UCLN.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên dương `a`.\n- Dòng 2: Số nguyên dương `b`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số túi quà tối đa: <UCLN>`\n- Dòng 2: `Mỗi túi gồm: <a//UCLN> gói bánh, <b//UCLN> chai nước`",
    "starterCode": "# Bài 21.5: Chia quà thiện nguyện - Thuật toán Euclid\na = int(input())\nb = int(input())\n",
    "testCases": [
      {
        "input": "48\n36",
        "expectedOutput": "Số túi quà tối đa: 12\nMỗi túi gồm: 4 gói bánh, 3 chai nước",
        "isHidden": false
      },
      {
        "input": "30\n45",
        "expectedOutput": "Số túi quà tối đa: 15\nMỗi túi gồm: 2 gói bánh, 3 chai nước",
        "isHidden": false
      },
      {
        "input": "17\n19",
        "expectedOutput": "Số túi quà tối đa: 1\nMỗi túi gồm: 17 gói bánh, 19 chai nước",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_6",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.6: Theo dõi mực nước hồ chứa thủy lợi trong mùa khô (Luyện tập Bài 21)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Thủy lợi & Phòng chống hạn mặn)\nMực nước hồ thủy lợi hiện tại là `h` mét. Vào mùa khô, mỗi ngày nước bốc hơi và phục vụ tưới tiêu làm mực nước giảm `d` mét. Đồng thời có dòng suối nhỏ bổ sung thêm `s` mét nước mỗi ngày (biết `d > s`). Hồ được xem là đạt ngưỡng báo động khô hạn khi mực nước giảm xuống dưới hoặc bằng `h_alert` mét. Dùng `while` để tính số ngày đến khi đạt ngưỡng báo động.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Mực nước ban đầu `h` (số thực).\n- Dòng 2: Mực nước giảm mỗi ngày `d` (số thực).\n- Dòng 3: Mực nước bù mỗi ngày `s` (số thực).\n- Dòng 4: Ngưỡng báo động `h_alert` (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Số ngày đến ngưỡng báo động: <số ngày> ngày`.",
    "starterCode": "# Bài 21.6: Mực nước hồ thủy lợi\nh = float(input())\nd = float(input())\ns = float(input())\nh_alert = float(input())\n",
    "testCases": [
      {
        "input": "20.0\n0.8\n0.3\n15.0",
        "expectedOutput": "Số ngày đến ngưỡng báo động: 10 ngày",
        "isHidden": false
      },
      {
        "input": "18.0\n1.0\n0.5\n18.0",
        "expectedOutput": "Số ngày đến ngưỡng báo động: 0 ngày",
        "isHidden": false
      },
      {
        "input": "25.0\n1.5\n0.5\n10.0",
        "expectedOutput": "Số ngày đến ngưỡng báo động: 15 ngày",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_7",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.7: Tính tổng các chữ số để tạo mã kiểm tra (Checksum) thẻ học sinh (Luyện tập Bài 21)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Bảo mật thông tin thẻ học sinh điện tử)\nMã số thẻ học sinh là một số nguyên dương `n`. Để tạo mã kiểm tra tính hợp lệ (Checksum), hệ thống cần tính tổng tất cả các chữ số của `n`. Hãy sử dụng vòng lặp `while n > 0` cùng các phép toán chia nguyên `// 10` và chia dư `% 10` để trích xuất từng chữ số và tính tổng.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `n`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số chữ số: <số chữ số>`\n- Dòng 2: `Tổng các chữ số: <tổng>`",
    "starterCode": "# Bài 21.7: Tổng các chữ số bằng vòng lặp while\nn = int(input())\n",
    "testCases": [
      {
        "input": "2026",
        "expectedOutput": "Số chữ số: 4\nTổng các chữ số: 10",
        "isHidden": false
      },
      {
        "input": "13579",
        "expectedOutput": "Số chữ số: 5\nTổng các chữ số: 25",
        "isHidden": false
      },
      {
        "input": "8",
        "expectedOutput": "Số chữ số: 1\nTổng các chữ số: 8",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_8",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.8: Mô phỏng phân rã đồng vị phóng xạ y tế theo chu kỳ bán rã (Luyện tập Bài 21)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Vật lý hạt nhân & Y học phóng xạ)\nMột liều đồng vị phóng xạ dùng trong chẩn đoán y tế có khối lượng ban đầu `m0` (mg). Chất này có chu kỳ bán rã là `T` giờ (cứ sau `T` giờ khối lượng chất phóng xạ còn lại một nửa: `m = m / 2`). Liều thuốc được coi là an toàn đào thải khi khối lượng còn lại nhỏ hơn hoặc bằng `0.01 * m0` (dưới 1%). Dùng vòng lặp `while` để tính tổng số giờ cần thiết đến khi an toàn.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Khối lượng ban đầu `m0` (số thực mg).\n- Dòng 2: Chu kỳ bán rã `T` (số nguyên giờ).\n\n### Kết quả ra (Output)\n- Dòng 1: `Số chu kỳ bán rã: <chu kỳ>`\n- Dòng 2: `Thời gian an toàn: <tổng giờ> giờ`",
    "starterCode": "# Bài 21.8: Phân rã phóng xạ y tế\nm0 = float(input())\nT = int(input())\n",
    "testCases": [
      {
        "input": "100.0\n6",
        "expectedOutput": "Số chu kỳ bán rã: 7\nThời gian an toàn: 42 giờ",
        "isHidden": false
      },
      {
        "input": "50.0\n12",
        "expectedOutput": "Số chu kỳ bán rã: 7\nThời gian an toàn: 84 giờ",
        "isHidden": false
      },
      {
        "input": "20.0\n4",
        "expectedOutput": "Số chu kỳ bán rã: 7\nThời gian an toàn: 28 giờ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_9",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.9: Mô phỏng thuật toán tìm kiếm nhị phân đoán giá trị bí mật (Luyện tập Bài 21)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Trò chơi trí tuệ & Thuật toán tìm kiếm nhị phân)\nCho một số nguyên bí mật `target` nằm trong đoạn `[1, 1000]`. Máy tính đoán theo thuật toán nhị phân: mỗi lượt tính `mid = (low + high) // 2`. Nếu `mid == target` thì dừng; nếu `mid < target` thì nâng cận dưới `low = mid + 1`; nếu `mid > target` thì hạ cận trên `high = mid - 1`. Hãy dùng vòng lặp `while` mô phỏng quá trình này và in ra số bước đoán.\n\n### Dữ liệu vào (Input)\nMột số nguyên `target` (1 <= target <= 1000).\n\n### Kết quả ra (Output)\nIn ra: `Số lần đoán để tìm thấy: <số lần>`.",
    "starterCode": "# Bài 21.9: Thuật toán tìm kiếm nhị phân\ntarget = int(input())\n",
    "testCases": [
      {
        "input": "500",
        "expectedOutput": "Số lần đoán để tìm thấy: 1",
        "isHidden": false
      },
      {
        "input": "250",
        "expectedOutput": "Số lần đoán để tìm thấy: 2",
        "isHidden": false
      },
      {
        "input": "753",
        "expectedOutput": "Số lần đoán để tìm thấy: 8",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_21_10",
    "lessonId": "bai_21",
    "glyph": "●",
    "title": "Bài 21.10: Mô phỏng tăng trưởng quần thể vi khuẩn trong phòng thí nghiệm (Luyện tập Bài 21)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Sinh học tế bào & Mô phỏng máy tính)\nBan đầu có `n0` cá thể vi khuẩn trong đĩa nuôi cấy. Cứ sau mỗi giờ, số vi khuẩn nhân đôi (`* 2`), tuy nhiên do môi trường dinh dưỡng giới hạn nên mỗi giờ có một lượng cố định `k` cá thể bị đào thải (sau khi nhân đôi, số cá thể mới là `n * 2 - k`, với điều kiện `n0 * 2 > k`). Dùng vòng lặp `while` để tính sau bao nhiêu giờ quần thể vi khuẩn đạt hoặc vượt mức ngưỡng `target` cá thể.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số cá thể ban đầu `n0` (số nguyên).\n- Dòng 2: Số cá thể hao hụt mỗi giờ `k` (số nguyên).\n- Dòng 3: Ngưỡng mục tiêu `target` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Thời gian đạt ngưỡng: <giờ> giờ`\n- Dòng 2: `Số cá thể cuối cùng: <số cá thể>`",
    "starterCode": "# Bài 21.10: Tăng trưởng quần thể vi khuẩn\nn0 = int(input())\nk = int(input())\ntarget = int(input())\n",
    "testCases": [
      {
        "input": "100\n20\n1000",
        "expectedOutput": "Thời gian đạt ngưỡng: 4 giờ\nSố cá thể cuối cùng: 1300",
        "isHidden": false
      },
      {
        "input": "50\n10\n150",
        "expectedOutput": "Thời gian đạt ngưỡng: 2 giờ\nSố cá thể cuối cùng: 170",
        "isHidden": false
      },
      {
        "input": "200\n50\n2000",
        "expectedOutput": "Thời gian đạt ngưỡng: 4 giờ\nSố cá thể cuối cùng: 2450",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_1",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.1: Thống kê số bước chân đi bộ trong tuần từ đồng hồ thông minh (Luyện tập Bài 22)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Sức khỏe & Đời sống số)\nĐồng hồ thông minh ghi nhận số bước chân của người dùng trong 7 ngày trong tuần. Hãy viết chương trình nhập vào 7 số nguyên tương ứng số bước chân của 7 ngày (trên 1 dòng cách nhau bởi dấu cách), lưu vào danh sách `buoc_chan` và tính tổng số bước chân trong tuần cùng giá trị trung bình mỗi ngày (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\nMột dòng gồm 7 số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số bước chân: <tổng> bước`\n- Dòng 2: `Trung bình mỗi ngày: <trung bình> bước`",
    "starterCode": "# Bài 22.1: Thống kê bước chân\nbuoc_chan = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "6500 7200 8100 5900 10200 11500 8600",
        "expectedOutput": "Tổng số bước chân: 58000 bước\nTrung bình mỗi ngày: 8286 bước",
        "isHidden": false
      },
      {
        "input": "5000 5000 5000 5000 5000 5000 5000",
        "expectedOutput": "Tổng số bước chân: 35000 bước\nTrung bình mỗi ngày: 5000 bước",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_2",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.2: Ghép danh sách học sinh tham gia hoạt động của hai lớp (Luyện tập Bài 22)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Hoạt động ngoại khóa trường học)\nLớp 10A và 10B cùng tham gia dự án trồng cây. Nhập danh sách tên học sinh lớp 10A (cách nhau bởi dấu phẩy) và danh sách tên học sinh lớp 10B (cách nhau bởi dấu phẩy). Dùng toán tử cộng hai danh sách `+` để tạo danh sách hợp nhất và in ra tổng số học sinh cùng danh sách đầy đủ.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tên học sinh lớp 10A cách nhau bởi dấu phẩy.\n- Dòng 2: Tên học sinh lớp 10B cách nhau bởi dấu phẩy.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số học sinh: <tổng>`\n- Dòng 2: `Danh sách: <tên cách nhau bởi dấu phẩy và cách>`",
    "starterCode": "# Bài 22.2: Ghép danh sách học sinh\nds1 = [x.strip() for x in input().split(',')]\nds2 = [x.strip() for x in input().split(',')]\n",
    "testCases": [
      {
        "input": "An, Binh, Cuong\nDung, Giang",
        "expectedOutput": "Tổng số học sinh: 5\nDanh sách: An, Binh, Cuong, Dung, Giang",
        "isHidden": false
      },
      {
        "input": "Hoa, Mai\nLan, Cuc, Truc",
        "expectedOutput": "Tổng số học sinh: 5\nDanh sách: Hoa, Mai, Lan, Cuc, Truc",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_3",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.3: Tìm mức doanh thu ngày cao nhất và thấp nhất của gian hàng hội chợ (Luyện tập Bài 22)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Hội chợ khởi nghiệp học sinh)\nGian hàng bánh mì của chi đoàn mở bán trong `n` ngày hội chợ. Cho danh sách doanh thu từng ngày (các số nguyên, đơn vị VNĐ). Sử dụng các hàm tích hợp `max()` và `min()` của Python để tìm doanh thu ngày đắt hàng nhất và ngày ế khách nhất.\n\n### Dữ liệu vào (Input)\nMột dòng gồm `n` số nguyên cách nhau một khoảng trắng biểu thị doanh thu các ngày.\n\n### Kết quả ra (Output)\n- Dòng 1: `Doanh thu cao nhất: <max> VNĐ`\n- Dòng 2: `Doanh thu thấp nhất: <min> VNĐ`\n- Dòng 3: `Chênh lệch: <max - min> VNĐ`",
    "starterCode": "# Bài 22.3: Doanh thu cao nhất và thấp nhất\ndoanh_thu = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "1200000 850000 1500000 920000 2100000",
        "expectedOutput": "Doanh thu cao nhất: 2100000 VNĐ\nDoanh thu thấp nhất: 850000 VNĐ\nChênh lệch: 1250000 VNĐ",
        "isHidden": false
      },
      {
        "input": "500000 500000",
        "expectedOutput": "Doanh thu cao nhất: 500000 VNĐ\nDoanh thu thấp nhất: 500000 VNĐ\nChênh lệch: 0 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_4",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.4: Đếm số sản phẩm đạt chuẩn khối lượng trên dây chuyền đóng gói (Luyện tập Bài 22)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Dây chuyền tự động hóa thực phẩm)\nMỗi gói bánh quy xuất xưởng được cân tự động. Tiêu chuẩn quy định khối lượng phải từ `min_w` đến `max_w` gram. Nhập ngưỡng chuẩn `min_w`, `max_w` và danh sách khối lượng thực tế của các gói bánh, dùng vòng lặp duyệt danh sách để đếm số gói đạt chuẩn.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Hai số thực `min_w` và `max_w` cách nhau khoảng trắng.\n- Dòng 2: Danh sách khối lượng các gói bánh (số thực) cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Số sản phẩm đạt chuẩn: <số lượng>/<tổng số>`.",
    "starterCode": "# Bài 22.4: Đếm sản phẩm đạt chuẩn khối lượng\nmin_w, max_w = map(float, input().split())\nweights = list(map(float, input().split()))\n",
    "testCases": [
      {
        "input": "98.0 102.0\n100.2 97.5 101.8 102.5 99.0",
        "expectedOutput": "Số sản phẩm đạt chuẩn: 3/5",
        "isHidden": false
      },
      {
        "input": "50.0 55.0\n51.0 52.0 53.0",
        "expectedOutput": "Số sản phẩm đạt chuẩn: 3/3",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_5",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.5: Trích xuất top 3 điểm thi đua cao nhất bằng kỹ thuật cắt danh sách (Slicing) (Luyện tập Bài 22)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Khen thưởng học sinh giỏi)\nCho danh sách điểm tổng kết của các học sinh trong đội tuyển (các số thực). Hãy sắp xếp danh sách điểm theo thứ tự giảm dần, sau đó dùng kỹ thuật slicing `[:3]` để lấy ra top 3 mức điểm cao nhất.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực cách nhau bởi dấu cách (ít nhất 3 phần tử).\n\n### Kết quả ra (Output)\nIn ra 1 dòng: `Top 3 điểm cao nhất: <3 số cách nhau bởi dấu cách, làm tròn 1 chữ số thập phân>`.",
    "starterCode": "# Bài 22.5: Slicing lấy top 3 điểm\ndiem = list(map(float, input().split()))\n",
    "testCases": [
      {
        "input": "8.5 9.2 7.8 9.8 8.9 9.0",
        "expectedOutput": "Top 3 điểm cao nhất: 9.8 9.2 9.0",
        "isHidden": false
      },
      {
        "input": "10.0 9.5 8.0 7.5",
        "expectedOutput": "Top 3 điểm cao nhất: 10.0 9.5 8.0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_6",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.6: Tìm chỉ số ngày có nhiệt độ thấp nhất trong tuần (Luyện tập Bài 22)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Dự báo thời tiết)\nNhập danh sách nhiệt độ của 7 ngày trong tuần (từ Thứ Hai đến Chủ Nhật, đánh số chỉ số từ 0 đến 6). Dùng hàm `min()` và phương thức `index()` để tìm nhiệt độ thấp nhất và ngày đầu tiên xuất hiện nhiệt độ đó trong tuần (ngày thứ mấy tính từ 1 đến 7).\n\n### Dữ liệu vào (Input)\nMột dòng gồm 7 số thực cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Nhiệt độ thấp nhất: <min>°C`\n- Dòng 2: `Xuất hiện vào ngày thứ: <ngày> trong tuần` (chỉ số + 1)",
    "starterCode": "# Bài 22.6: Ngày lạnh nhất trong tuần\ntemps = list(map(float, input().split()))\n",
    "testCases": [
      {
        "input": "24.5 22.0 19.5 21.0 23.5 19.5 25.0",
        "expectedOutput": "Nhiệt độ thấp nhất: 19.5°C\nXuất hiện vào ngày thứ: 3 trong tuần",
        "isHidden": false
      },
      {
        "input": "18.0 20.0 22.0 24.0 26.0 28.0 30.0",
        "expectedOutput": "Nhiệt độ thấp nhất: 18.0°C\nXuất hiện vào ngày thứ: 1 trong tuần",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_7",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.7: Tách danh sách dữ liệu theo chỉ số chẵn và chỉ số lẻ (Luyện tập Bài 22)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Xử lý tín hiệu cảm biến)\nCảm biến gửi về chuỗi số liệu đo luân phiên giữa Cảm biến A (ở vị trí chỉ số chẵn: 0, 2, 4...) và Cảm biến B (ở vị trí chỉ số lẻ: 1, 3, 5...). Dùng cú pháp cắt danh sách `A[::2]` và `A[1::2]` để tách thành 2 danh sách số liệu riêng biệt.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Cảm biến A: <các số cách nhau bởi dấu cách>`\n- Dòng 2: `Cảm biến B: <các số cách nhau bởi dấu cách>`",
    "starterCode": "# Bài 22.7: Tách dữ liệu cảm biến\ndata = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "10 20 30 40 50 60",
        "expectedOutput": "Cảm biến A: 10 30 50\nCảm biến B: 20 40 60",
        "isHidden": false
      },
      {
        "input": "1 2 3 4 5",
        "expectedOutput": "Cảm biến A: 1 3 5\nCảm biến B: 2 4",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_8",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.8: Tính trung bình calo tiêu thụ và đếm số ngày vượt mức trung bình (Luyện tập Bài 22)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Thể dục thể thao học đường)\nCho danh sách lượng calo tiêu thụ mỗi ngày trong tuần tập luyện. Viết chương trình tính lượng calo trung bình (làm tròn 1 chữ số thập phân), và đếm xem có bao nhiêu ngày người đó tiêu thụ lượng calo cao hơn mức trung bình này.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên là calo từng ngày.\n\n### Kết quả ra (Output)\n- Dòng 1: `Calo trung bình: <trung bình> calo`\n- Dòng 2: `Số ngày vượt trung bình: <số ngày> ngày`",
    "starterCode": "# Bài 22.8: Calo tập luyện\ncalo = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "450 520 600 480 700 550 400",
        "expectedOutput": "Calo trung bình: 528.6 calo\nSố ngày vượt trung bình: 3 ngày",
        "isHidden": false
      },
      {
        "input": "500 500 500",
        "expectedOutput": "Calo trung bình: 500.0 calo\nSố ngày vượt trung bình: 0 ngày",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_9",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.9: Lọc các mức điểm rèn luyện cao hơn điểm trung bình chung (Luyện tập Bài 22)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Đánh giá thi đua lớp học)\nCho danh sách điểm rèn luyện của một tổ học sinh (các số nguyên từ 0 đến 100). Hãy dùng List Comprehension để lọc ra danh sách các mức điểm rèn luyện thực sự lớn hơn điểm trung bình cộng của cả tổ, sắp xếp danh sách lọc được theo thứ tự tăng dần.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Điểm trung bình tổ: <trung bình làm tròn 2 chữ số>`\n- Dòng 2: `Điểm trên trung bình: <danh sách điểm cách nhau bởi dấu cách>` (nếu không có ai in `Không có`)",
    "starterCode": "# Bài 22.9: Lọc điểm rèn luyện\ndiem = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "75 80 90 65 85",
        "expectedOutput": "Điểm trung bình tổ: 79.00\nĐiểm trên trung bình: 80 85 90",
        "isHidden": false
      },
      {
        "input": "80 80 80",
        "expectedOutput": "Điểm trung bình tổ: 80.00\nĐiểm trên trung bình: Không có",
        "isHidden": false
      },
      {
        "input": "60 70 80 90 100",
        "expectedOutput": "Điểm trung bình tổ: 80.00\nĐiểm trên trung bình: 90 100",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_22_10",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 22.10: Mô phỏng cơ chế Hoàn tác (Undo) bằng danh sách lịch sử thao tác (Luyện tập Bài 22)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Kỹ thuật phần mềm đồ họa)\nTrong một ứng dụng vẽ, người dùng thực hiện một chuỗi thao tác được lưu trong danh sách `history`. Khi người dùng thực hiện lệnh `UNDO k`, hệ thống sẽ hủy `k` thao tác gần nhất bằng slicing `history[:-k]`. Nếu `k >= len(history)` thì danh sách trở thành rỗng. Hãy in danh sách thao tác còn lại.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các tên thao tác cách nhau bởi dấu phẩy.\n- Dòng 2: Số nguyên `k` (số bước muốn hoàn tác).\n\n### Kết quả ra (Output)\nIn ra: `Thao tác còn lại: <các thao tác cách nhau bởi dấu phẩy và cách>` hoặc `Thao tác còn lại: Trống` nếu danh sách rỗng.",
    "starterCode": "# Bài 22.10: Mô phỏng Undo\nhistory = [x.strip() for x in input().split(',')]\nk = int(input())\n",
    "testCases": [
      {
        "input": "Vẽ đường, Đổi màu, Phóng to, Xóa nét\n2",
        "expectedOutput": "Thao tác còn lại: Vẽ đường, Đổi màu",
        "isHidden": false
      },
      {
        "input": "Chọn hình, Xoay\n2",
        "expectedOutput": "Thao tác còn lại: Trống",
        "isHidden": false
      },
      {
        "input": "Vẽ tròn, Tô màu, Đổ bóng\n1",
        "expectedOutput": "Thao tác còn lại: Vẽ tròn, Tô màu",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_1",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.1: Quản lý hàng chờ bốc số khám bệnh tại trạm y tế (Luyện tập Bài 23)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Hệ thống y tế công cộng)\nTrạm y tế quản lý hàng đợi bệnh nhân bằng danh sách mã số. Cho danh sách mã số hiện tại. Khi có bệnh nhân mới đến, dùng `append()` để thêm vào cuối. Khi bác sĩ gọi bệnh nhân tiếp theo, dùng `pop(0)` để lấy bệnh nhân đầu tiên ra khám. Hãy viết chương trình thực hiện gọi 1 bệnh nhân và thêm 1 bệnh nhân mới.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các mã số bệnh nhân ban đầu cách nhau khoảng trắng.\n- Dòng 2: Mã số bệnh nhân mới đến `ma_moi`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Gọi vào khám: <mã bệnh nhân đầu>`\n- Dòng 2: `Hàng đợi hiện tại: <danh sách mã số cách nhau bởi dấu cách>`",
    "starterCode": "# Bài 23.1: Hàng đợi trạm y tế\nqueue = input().split()\nma_moi = input().strip()\n",
    "testCases": [
      {
        "input": "BN01 BN02 BN03\nBN04",
        "expectedOutput": "Gọi vào khám: BN01\nHàng đợi hiện tại: BN02 BN03 BN04",
        "isHidden": false
      },
      {
        "input": "A10\nA11",
        "expectedOutput": "Gọi vào khám: A10\nHàng đợi hiện tại: A11",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_2",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.2: Sắp xếp bảng điểm thi đấu Rung chuông vàng của lớp (Luyện tập Bài 23)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Sân chơi trí tuệ học đường)\nCho danh sách điểm số của các thí sinh tham gia hội thi Rung chuông vàng (các số nguyên). Dùng phương thức `.sort()` để sắp xếp bảng điểm theo thứ tự tăng dần và giảm dần.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tăng dần: <các số cách nhau bởi dấu cách>`\n- Dòng 2: `Giảm dần: <các số cách nhau bởi dấu cách>`",
    "starterCode": "# Bài 23.2: Sắp xếp bảng điểm\ndiem = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "70 45 90 85 60",
        "expectedOutput": "Tăng dần: 45 60 70 85 90\nGiảm dần: 90 85 70 60 45",
        "isHidden": false
      },
      {
        "input": "10 50 20",
        "expectedOutput": "Tăng dần: 10 20 50\nGiảm dần: 50 20 10",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_3",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.3: Kiểm tra mã vé hợp lệ tại cổng soát vé đêm nhạc trường (Luyện tập Bài 23)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Sự kiện âm nhạc học sinh)\nBan tổ chức phát hành danh sách mã vé hợp lệ. Tại cửa soát vé, khách quét mã vé `ticket_id`. Hãy dùng toán tử `in` để kiểm tra mã vé có nằm trong danh sách vé đã phát hành hay không.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các mã vé đã phát hành cách nhau bởi dấu cách.\n- Dòng 2: Mã vé của khách `ticket_id`.\n\n### Kết quả ra (Output)\nIn ra: `Mã vé hợp lệ - Mời vào` nếu tìm thấy, ngược lại in `Mã vé không hợp lệ`.",
    "starterCode": "# Bài 23.3: Soát vé đêm nhạc\nve_hop_le = input().split()\nticket_id = input().strip()\n",
    "testCases": [
      {
        "input": "VIP01 VIP02 NOR05 NOR06\nVIP02",
        "expectedOutput": "Mã vé hợp lệ - Mời vào",
        "isHidden": false
      },
      {
        "input": "T01 T02 T03\nT99",
        "expectedOutput": "Mã vé không hợp lệ",
        "isHidden": false
      },
      {
        "input": "X1 X2\nX1",
        "expectedOutput": "Mã vé hợp lệ - Mời vào",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_4",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.4: Chèn kiện hàng y tế khẩn cấp vào đầu danh sách giao hàng (Luyện tập Bài 23)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Logistics chuyển phát hỏa tốc)\nCho danh sách các mã vận đơn đang chờ giao hàng. Khi có một đơn hàng y tế khẩn cấp phát sinh, hệ thống cần ưu tiên xử lý trước bằng cách chèn kiện hàng đó vào vị trí đầu tiên (chỉ số 0) dùng phương thức `.insert(0, ma_hang)`. Hãy viết chương trình thực hiện yêu cầu trên.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các mã kiện hàng cách nhau khoảng trắng.\n- Dòng 2: Mã kiện hàng khẩn cấp cần chèn.\n\n### Kết quả ra (Output)\nIn ra: `Danh sách giao hàng ưu tiên: <danh sách mã hàng cách nhau bởi dấu cách>`.",
    "starterCode": "# Bài 23.4: Chèn đơn hàng ưu tiên\nds_hang = input().split()\nma_khan = input().strip()\n",
    "testCases": [
      {
        "input": "DH101 DH102 DH103\nMED999",
        "expectedOutput": "Danh sách giao hàng ưu tiên: MED999 DH101 DH102 DH103",
        "isHidden": false
      },
      {
        "input": "A1 A2\nA0",
        "expectedOutput": "Danh sách giao hàng ưu tiên: A0 A1 A2",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_5",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.5: Tính điểm trung bình phần thi thuyết trình sau khi bỏ điểm cực trị (Luyện tập Bài 23)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Chấm thi văn nghệ & Thể thao quốc tế)\nĐể bảo đảm khách quan, điểm số của thí sinh từ ban giám khảo sẽ được loại bỏ 1 điểm thấp nhất (`min`) và 1 điểm cao nhất (`max`). Điểm chính thức là trung bình cộng của các điểm số còn lại. Hãy dùng `.remove()` để xóa điểm min và max, rồi tính trung bình (làm tròn 2 chữ số thập phân).\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực là điểm của các giám khảo (ít nhất 3 giám khảo) cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Điểm bị loại: <min> và <max>`\n- Dòng 2: `Điểm chính thức: <trung bình>`",
    "starterCode": "# Bài 23.5: Bỏ điểm cực trị\nscores = list(map(float, input().split()))\n",
    "testCases": [
      {
        "input": "8.0 9.5 7.5 8.5 9.0",
        "expectedOutput": "Điểm bị loại: 7.5 và 9.5\nĐiểm chính thức: 8.50",
        "isHidden": false
      },
      {
        "input": "6.0 10.0 8.0",
        "expectedOutput": "Điểm bị loại: 6.0 và 10.0\nĐiểm chính thức: 8.00",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_6",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.6: Lọc danh sách mã sách mượn không trùng lặp tại thư viện (Luyện tập Bài 23)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Thư viện số)\nTrong ngày hội đọc sách, hệ thống ghi nhận nhiều lượt mượn sách có thể trùng lặp cùng một mã sách. Hãy viết chương trình lọc danh sách mã sách sao cho mỗi mã sách chỉ xuất hiện đúng 1 lần nhưng vẫn giữ nguyên thứ tự xuất hiện đầu tiên của chúng.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các mã sách cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng tựa sách duy nhất: <số lượng>`\n- Dòng 2: `Danh sách: <các mã sách cách nhau bởi dấu cách>`",
    "starterCode": "# Bài 23.6: Lọc mã sách trùng lặp\nraw_codes = input().split()\n",
    "testCases": [
      {
        "input": "B01 B05 B02 B01 B03 B05 B07",
        "expectedOutput": "Số lượng tựa sách duy nhất: 5\nDanh sách: B01 B05 B02 B03 B07",
        "isHidden": false
      },
      {
        "input": "TH1 TH1 TH1",
        "expectedOutput": "Số lượng tựa sách duy nhất: 1\nDanh sách: TH1",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_7",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.7: Đếm số lần khách hàng mang túi sinh thái đi siêu thị (Luyện tập Bài 23)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Chiến dịch Tiêu dùng xanh)\nSiêu thị ghi nhận hành vi sử dụng túi của khách hàng trong các lần thanh toán dưới dạng ký hiệu: `ECO` (dùng túi sinh thái), `PLASTIC` (lấy túi ni-lông), `BOX` (dùng thùng các-tông). Hãy dùng phương thức `.count()` của danh sách để đếm số lần khách hàng dùng `ECO` và tính số điểm thưởng tích lũy (mỗi lần dùng ECO được tặng 50 điểm thưởng).\n\n### Dữ liệu vào (Input)\nMột dòng gồm các chuỗi ký hiệu cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lần dùng túi sinh thái: <số lần>`\n- Dòng 2: `Điểm thưởng tích lũy: <điểm> điểm`",
    "starterCode": "# Bài 23.7: Đếm túi sinh thái\nlogs = input().split()\n",
    "testCases": [
      {
        "input": "ECO PLASTIC ECO ECO BOX ECO",
        "expectedOutput": "Số lần dùng túi sinh thái: 4\nĐiểm thưởng tích lũy: 200 điểm",
        "isHidden": false
      },
      {
        "input": "PLASTIC BOX PLASTIC",
        "expectedOutput": "Số lần dùng túi sinh thái: 0\nĐiểm thưởng tích lũy: 0 điểm",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_8",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.8: Xóa toàn bộ các đơn hàng đã bị hủy khỏi danh sách xử lý (Luyện tập Bài 23)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Thương mại điện tử)\nDanh sách mã đơn hàng chứa một số đơn mang ký hiệu `CANCEL` (đơn đã hủy). Viết chương trình sử dụng vòng lặp `while 'CANCEL' in orders:` kết hợp phương thức `orders.remove('CANCEL')` để dọn sạch toàn bộ các đơn hàng đã hủy ra khỏi danh sách.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các mã đơn hàng cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số đơn hợp lệ còn lại: <số lượng>`\n- Dòng 2: `Danh sách đơn hợp lệ: <các mã đơn cách nhau bởi dấu cách>` (nếu không còn đơn nào in `Trống`)",
    "starterCode": "# Bài 23.8: Xóa đơn hủy CANCEL\norders = input().split()\n",
    "testCases": [
      {
        "input": "ORD1 CANCEL ORD2 CANCEL CANCEL ORD3",
        "expectedOutput": "Số đơn hợp lệ còn lại: 3\nDanh sách đơn hợp lệ: ORD1 ORD2 ORD3",
        "isHidden": false
      },
      {
        "input": "CANCEL CANCEL",
        "expectedOutput": "Số đơn hợp lệ còn lại: 0\nDanh sách đơn hợp lệ: Trống",
        "isHidden": false
      },
      {
        "input": "A B C",
        "expectedOutput": "Số đơn hợp lệ còn lại: 3\nDanh sách đơn hợp lệ: A B C",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_9",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.9: Hợp nhất và sắp xếp danh sách giá vé máy bay từ hai đại lý (Luyện tập Bài 23)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Săn vé du lịch giá rẻ)\nMột công cụ so sánh giá vé máy bay thu thập bảng giá từ Đại lý 1 và Đại lý 2 (các số nguyên, nghìn VNĐ). Hãy hợp nhất hai danh sách giá vé này thành một, loại bỏ các mức giá trùng lặp, sau đó sắp xếp theo thứ tự tăng dần từ rẻ nhất đến đắt nhất.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách giá vé Đại lý 1 cách nhau khoảng trắng.\n- Dòng 2: Danh sách giá vé Đại lý 2 cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số mức giá khác nhau: <số lượng>`\n- Dòng 2: `Bảng giá tăng dần: <các mức giá cách nhau khoảng trắng>`",
    "starterCode": "# Bài 23.9: Hợp nhất giá vé máy bay\ngia1 = list(map(int, input().split()))\ngia2 = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "1200 1500 950 1800\n1500 850 1200 2100",
        "expectedOutput": "Số mức giá khác nhau: 6\nBảng giá tăng dần: 850 950 1200 1500 1800 2100",
        "isHidden": false
      },
      {
        "input": "500 600\n600 700",
        "expectedOutput": "Số mức giá khác nhau: 3\nBảng giá tăng dần: 500 600 700",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_23_10",
    "lessonId": "bai_22_23",
    "glyph": "●",
    "title": "Bài 23.10: Tìm mức doanh số lớn thứ nhì trong danh sách doanh thu quý (Luyện tập Bài 23)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Phân tích chỉ số kinh doanh)\nCho danh sách doanh thu của các nhân viên kinh doanh trong tháng. Hãy tìm giá trị doanh số lớn thứ nhì (người về nhì). Lưu ý: Trong danh sách có thể có nhiều người cùng đạt mức doanh số lớn nhất, khi đó giá trị lớn thứ nhì phải là mức giá trị nhỏ hơn mức lớn nhất đó. Nếu mọi người đều có doanh số bằng nhau thì in `Không có giải nhì`.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Doanh số lớn thứ nhì: <giá trị> VNĐ` hoặc `Không có giải nhì`.",
    "starterCode": "# Bài 23.10: Doanh số lớn thứ nhì\nds = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "500 700 900 900 850 600",
        "expectedOutput": "Doanh số lớn thứ nhì: 850 VNĐ",
        "isHidden": false
      },
      {
        "input": "1000 1000 1000",
        "expectedOutput": "Không có giải nhì",
        "isHidden": false
      },
      {
        "input": "100 200",
        "expectedOutput": "Doanh số lớn thứ nhì: 100 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_1",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.1: Kiểm tra độ mạnh mật khẩu tài khoản cổng thông tin học sinh (Luyện tập Bài 24)",
    "difficulty": "Beginner",
    "description": "### Đề bài (An toàn bảo mật thông tin tài khoản)\nMật khẩu an toàn cơ bản cho tài khoản học sinh phải có độ dài ít nhất 8 kí tự và không chứa dấu cách. Nhập chuỗi mật khẩu `pwd`, hãy dùng hàm `len()` và toán tử `' ' in pwd` để kiểm tra.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu mật khẩu `pwd`.\n\n### Kết quả ra (Output)\nIn ra: `Mật khẩu hợp lệ` hoặc `Mật khẩu không an toàn`.",
    "starterCode": "# Bài 24.1: Độ mạnh mật khẩu\npwd = input()\n",
    "testCases": [
      {
        "input": "python2026",
        "expectedOutput": "Mật khẩu hợp lệ",
        "isHidden": false
      },
      {
        "input": "pass12",
        "expectedOutput": "Mật khẩu không an toàn",
        "isHidden": false
      },
      {
        "input": "pass word123",
        "expectedOutput": "Mật khẩu không an toàn",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_2",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.2: Đếm số kí tự chữ số trong mã vận đơn bưu phẩm (Luyện tập Bài 24)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Logistics chuyển phát nhanh)\nMã vận đơn giao hàng kết hợp cả chữ cái và chữ số (ví dụ: `VN849204852HK`). Hãy duyệt từng kí tự trong chuỗi mã vận đơn và dùng phương thức `.isdigit()` để đếm xem mã có bao nhiêu chữ số.\n\n### Dữ liệu vào (Input)\nMột xâu kí tự `code`.\n\n### Kết quả ra (Output)\nIn ra: `Số kí tự số: <số lượng>`.",
    "starterCode": "# Bài 24.2: Đếm chữ số trong mã vận đơn\ncode = input().strip()\n",
    "testCases": [
      {
        "input": "VN849204852HK",
        "expectedOutput": "Số kí tự số: 9",
        "isHidden": false
      },
      {
        "input": "EXPRESS",
        "expectedOutput": "Số kí tự số: 0",
        "isHidden": false
      },
      {
        "input": "123456",
        "expectedOutput": "Số kí tự số: 6",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_3",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.3: Kiểm tra mã tem chống hàng giả đối xứng (Palindrome) (Luyện tập Bài 24)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Chống hàng giả bằng mã đối xứng)\nMột doanh nghiệp in mã tem xác thực là một chuỗi kí tự đối xứng (Palindrome - đọc xuôi hay ngược đều giống nhau, ví dụ `RADAR`, `12321`). Dùng kỹ thuật đảo ngược xâu `s[::-1]` để kiểm tra xem mã tem có phải là chuỗi đối xứng hay không.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu mã tem `s`.\n\n### Kết quả ra (Output)\nIn ra: `Mã tem đối xứng` hoặc `Mã tem không đối xứng`.",
    "starterCode": "# Bài 24.3: Tem đối xứng\ns = input().strip()\n",
    "testCases": [
      {
        "input": "RADAR",
        "expectedOutput": "Mã tem đối xứng",
        "isHidden": false
      },
      {
        "input": "PYTHON",
        "expectedOutput": "Mã tem không đối xứng",
        "isHidden": false
      },
      {
        "input": "12321",
        "expectedOutput": "Mã tem đối xứng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_4",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.4: Trích xuất mã tỉnh thành từ biển số xe cơ giới (Luyện tập Bài 24)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Giao thông đường bộ)\nBiển số xe tại Việt Nam có 2 chữ số đầu tiên là mã tỉnh thành đăng ký (ví dụ: `29` hoặc `30` là Hà Nội, `50` đến `59` là TP. Hồ Chí Minh). Dùng slicing `s[:2]` để lấy 2 kí tự đầu tiên của biển số.\n\n### Dữ liệu vào (Input)\nMột xâu kí tự biển số xe (ví dụ `29B1-12345` hoặc `51F-98765`).\n\n### Kết quả ra (Output)\nIn ra: `Mã tỉnh thành: <2 kí tự đầu>`.",
    "starterCode": "# Bài 24.4: Mã tỉnh thành từ biển số\nplate = input().strip()\n",
    "testCases": [
      {
        "input": "29B1-12345",
        "expectedOutput": "Mã tỉnh thành: 29",
        "isHidden": false
      },
      {
        "input": "51F-98765",
        "expectedOutput": "Mã tỉnh thành: 51",
        "isHidden": false
      },
      {
        "input": "43A-55555",
        "expectedOutput": "Mã tỉnh thành: 43",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_5",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.5: Tính cước phí gửi tin nhắn SMS thông báo phụ huynh (Luyện tập Bài 24)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Sổ liên lạc điện tử nhà trường)\nMột tin nhắn SMS tiêu chuẩn không dấu chứa tối đa `160` kí tự. Nếu độ dài nội dung vượt quá 160 kí tự, tin nhắn sẽ được chia thành nhiều block (mỗi block 160 kí tự, block cuối cùng dù chưa đủ 160 kí tự vẫn tính tròn 1 tin). Đơn giá mỗi tin là `350` đồng. Viết chương trình nhập nội dung tin nhắn, tính độ dài, số lượng tin SMS và tổng cước phí.\n\n### Dữ liệu vào (Input)\nMột xâu văn bản nội dung tin nhắn.\n\n### Kết quả ra (Output)\n- Dòng 1: `Độ dài tin nhắn: <độ dài> kí tự`\n- Dòng 2: `Số tin SMS: <số tin>`\n- Dòng 3: `Tổng cước phí: <tổng cước> đồng`",
    "starterCode": "# Bài 24.5: Cước tin nhắn SMS\nmsg = input()\n",
    "testCases": [
      {
        "input": "Thong bao: Ngay mai hoc sinh lop 10 nghi hoc buoi chieu.",
        "expectedOutput": "Độ dài tin nhắn: 56 kí tự\nSố tin SMS: 1\nTổng cước phí: 350 đồng",
        "isHidden": false
      },
      {
        "input": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "expectedOutput": "Độ dài tin nhắn: 165 kí tự\nSố tin SMS: 2\nTổng cước phí: 700 đồng",
        "isHidden": false
      },
      {
        "input": "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
        "expectedOutput": "Độ dài tin nhắn: 320 kí tự\nSố tin SMS: 2\nTổng cước phí: 700 đồng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_6",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.6: Trích xuất thông tin khóa học và lớp từ mã định danh học sinh (Luyện tập Bài 24)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Cơ sở dữ liệu ngành giáo dục)\nMã định danh học sinh có định dạng chuẩn: `HS<năm>-<mã lớp>-<số thứ tự>`, ví dụ `HS2024-10A7-015`. Dùng kỹ thuật cắt xâu (slicing) hoặc phương thức tách để lấy ra: Năm nhập học (4 kí tự sau chữ HS) và Tên lớp.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu mã định danh học sinh.\n\n### Kết quả ra (Output)\n- Dòng 1: `Năm nhập học: <năm>`\n- Dòng 2: `Lớp: <tên lớp>`",
    "starterCode": "# Bài 24.6: Trích xuất mã học sinh\ncode = input().strip()\n",
    "testCases": [
      {
        "input": "HS2024-10A7-015",
        "expectedOutput": "Năm nhập học: 2024\nLớp: 10A7",
        "isHidden": false
      },
      {
        "input": "HS2026-10A12-001",
        "expectedOutput": "Năm nhập học: 2026\nLớp: 10A12",
        "isHidden": false
      },
      {
        "input": "HS2025-11B3-042",
        "expectedOutput": "Năm nhập học: 2025\nLớp: 11B3",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_7",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.7: Đếm số lượng nguyên âm tiếng Anh trong câu khẩu hiệu (Luyện tập Bài 24)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Ngôn ngữ học máy tính)\nCho một câu khẩu hiệu tiếng Anh. Hãy duyệt từng kí tự của câu và đếm số lượng các nguyên âm (`a`, `e`, `i`, `o`, `u`), không phân biệt chữ hoa hay chữ thường.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu văn bản tiếng Anh.\n\n### Kết quả ra (Output)\nIn ra: `Số nguyên âm: <số lượng>`.",
    "starterCode": "# Bài 24.7: Đếm nguyên âm tiếng Anh\ns = input()\n",
    "testCases": [
      {
        "input": "Hello World",
        "expectedOutput": "Số nguyên âm: 3",
        "isHidden": false
      },
      {
        "input": "Keep Coding Every Day",
        "expectedOutput": "Số nguyên âm: 7",
        "isHidden": false
      },
      {
        "input": "Fly Sky",
        "expectedOutput": "Số nguyên âm: 0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_8",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.8: Che giấu thông tin số điện thoại khách hàng (Masking) (Luyện tập Bài 24)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Bảo vệ dữ liệu cá nhân Nghị định 13)\nĐể bảo vệ quyền riêng tư của khách hàng, số điện thoại gồm 10 chữ số sẽ được che giấu 4 chữ số ở giữa bằng 4 dấu sao `****` (giữ lại 3 chữ số đầu và 3 chữ số cuối). Ví dụ: `0912345678` thành `091****678`.\n\n### Dữ liệu vào (Input)\nMột xâu gồm 10 chữ số của số điện thoại.\n\n### Kết quả ra (Output)\nIn ra số điện thoại đã che giấu: `Số bảo mật: <kết quả>`.",
    "starterCode": "# Bài 24.8: Che giấu số điện thoại\nphone = input().strip()\n",
    "testCases": [
      {
        "input": "0912345678",
        "expectedOutput": "Số bảo mật: 091****678",
        "isHidden": false
      },
      {
        "input": "0988777666",
        "expectedOutput": "Số bảo mật: 098****666",
        "isHidden": false
      },
      {
        "input": "0345678901",
        "expectedOutput": "Số bảo mật: 034****901",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_9",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.9: Đảo ngược các kí tự trong từng từ của thông điệp mật thư (Luyện tập Bài 24)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Trò chơi mật mã học sinh giỏi)\nTrong trò chơi giải mật thư, quy tắc biến đổi thông điệp là: giữ nguyên thứ tự các từ trong câu, nhưng mỗi từ bị đảo ngược các kí tự bên trong nó (ví dụ: `Python is fun` thành `nohtyP si nuf`). Hãy viết chương trình giải mã hoặc mã hóa thông điệp theo quy tắc này.\n\n### Dữ liệu vào (Input)\nMột dòng chứa câu văn bản các từ cách nhau bởi một dấu cách.\n\n### Kết quả ra (Output)\nIn ra: `Thông điệp: <kết quả>`.",
    "starterCode": "# Bài 24.9: Đảo ngược từng từ\ns = input()\n",
    "testCases": [
      {
        "input": "Python is fun",
        "expectedOutput": "Thông điệp: nohtyP si nuf",
        "isHidden": false
      },
      {
        "input": "Hello World",
        "expectedOutput": "Thông điệp: olleH dlroW",
        "isHidden": false
      },
      {
        "input": "Tin hoc 10",
        "expectedOutput": "Thông điệp: niT coh 01",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_24_10",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 24.10: Tìm kí tự chữ cái xuất hiện nhiều nhất trong văn bản (Luyện tập Bài 24)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Phân tích tần suất chữ cái)\nCho một chuỗi văn bản gồm các chữ cái tiếng Anh (chỉ xét các chữ cái từ a đến z, bỏ qua dấu cách và dấu câu). Tìm chữ cái xuất hiện nhiều lần nhất (không phân biệt chữ hoa, chữ thường; quy về chữ thường). Nếu có nhiều chữ cái cùng có số lần xuất hiện cao nhất, chọn chữ cái xuất hiện đầu tiên trong bảng chữ cái `a-z`.\n\n### Dữ liệu vào (Input)\nMột dòng văn bản.\n\n### Kết quả ra (Output)\nIn ra: `Kí tự phổ biến nhất: '<chữ>' xuất hiện <số lần> lần`.",
    "starterCode": "# Bài 24.10: Kí tự phổ biến nhất\ntext = input()\n",
    "testCases": [
      {
        "input": "Google DeepMind Python",
        "expectedOutput": "Kí tự phổ biến nhất: 'e' xuất hiện 3 lần",
        "isHidden": false
      },
      {
        "input": "abacaba",
        "expectedOutput": "Kí tự phổ biến nhất: 'a' xuất hiện 4 lần",
        "isHidden": false
      },
      {
        "input": "Programming",
        "expectedOutput": "Kí tự phổ biến nhất: 'g' xuất hiện 2 lần",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_1",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.1: Chuẩn hóa khoảng trắng trong họ và tên học sinh đăng ký dự thi (Luyện tập Bài 25)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Cơ sở dữ liệu tuyển sinh)\nKhi học sinh tự điền thông tin đăng ký dự thi trực tuyến, xâu họ tên thường bị gõ thừa nhiều dấu cách ở đầu, cuối và giữa các từ (ví dụ: `  Nguyễn   Văn    An   `). Hãy dùng phương thức `.split()` để tách các từ và `.join()` để nối lại thành xâu chuẩn chỉ có đúng 1 dấu cách giữa các từ.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu họ tên chưa chuẩn hóa.\n\n### Kết quả ra (Output)\nIn ra: `Họ tên chuẩn hóa: <kết quả>`.",
    "starterCode": "# Bài 25.1: Chuẩn hóa khoảng trắng họ tên\ns = input()\n",
    "testCases": [
      {
        "input": "  Nguyễn   Văn    An   ",
        "expectedOutput": "Họ tên chuẩn hóa: Nguyễn Văn An",
        "isHidden": false
      },
      {
        "input": "Trần   Thị    Mai",
        "expectedOutput": "Họ tên chuẩn hóa: Trần Thị Mai",
        "isHidden": false
      },
      {
        "input": "   Lê      Hà   ",
        "expectedOutput": "Họ tên chuẩn hóa: Lê Hà",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_2",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.2: Tạo đường dẫn URL thân thiện (Slug) cho bài viết câu lạc bộ (Luyện tập Bài 25)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Phát triển website CLB Tin học)\nĐể tạo đường dẫn thân thiện (SEO Slug) từ tiêu đề bài viết tiếng Anh, hệ thống chuyển toàn bộ xâu sang chữ thường với `.lower()` và thay thế các khoảng trắng bằng dấu gạch ngang `-` bằng `\"-\".join(s.split())`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa tiêu đề bài viết.\n\n### Kết quả ra (Output)\nIn ra: `Slug: <kết quả>`.",
    "starterCode": "# Bài 25.2: Tạo SEO slug\ntitle = input()\n",
    "testCases": [
      {
        "input": "Hoc Lap Trinh Python Can Ban",
        "expectedOutput": "Slug: hoc-lap-trinh-python-can-ban",
        "isHidden": false
      },
      {
        "input": "Chao Mung Nam Hoc Moi",
        "expectedOutput": "Slug: chao-mung-nam-hoc-moi",
        "isHidden": false
      },
      {
        "input": "AI and Future Technology",
        "expectedOutput": "Slug: ai-and-future-technology",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_3",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.3: Tìm vị trí từ khóa lỗi trong nhật ký máy chủ (Server Log) (Luyện tập Bài 25)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Giám sát hệ thống máy chủ)\nCho một dòng nhật ký (log) của máy chủ web. Hãy sử dụng phương thức `.find(\"ERROR\")` để tìm vị trí xuất hiện đầu tiên của từ khóa \"ERROR\". Nếu tìm thấy in ra chỉ số vị trí (bắt đầu từ 0), nếu không tìm thấy in ra `Không phát hiện lỗi`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa chuỗi nhật ký máy chủ.\n\n### Kết quả ra (Output)\nIn ra: `Vị trí lỗi: <chỉ số>` hoặc `Không phát hiện lỗi`.",
    "starterCode": "# Bài 25.3: Tìm vị trí ERROR\nlog = input()\n",
    "testCases": [
      {
        "input": "2026-11-20 14:30:15 [ERROR] Database connection failed",
        "expectedOutput": "Vị trí lỗi: 21",
        "isHidden": false
      },
      {
        "input": "2026-11-20 14:32:00 [INFO] User login successful",
        "expectedOutput": "Không phát hiện lỗi",
        "isHidden": false
      },
      {
        "input": "ERROR at start",
        "expectedOutput": "Vị trí lỗi: 0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_4",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.4: Chuyển đổi họ tên sang chữ in hoa để in giấy chứng nhận (Luyện tập Bài 25)",
    "difficulty": "Beginner",
    "description": "### Đề bài (In ấn văn bằng chứng chỉ)\nĐể in chứng nhận hoàn thành khóa học Tin học 10, họ tên của học sinh phải được chuẩn hóa khoảng trắng và chuyển sang chữ IN HOA toàn bộ bằng phương thức `.upper()`. Hãy viết chương trình thực hiện yêu cầu này.\n\n### Dữ liệu vào (Input)\nMột dòng chứa họ tên học sinh.\n\n### Kết quả ra (Output)\nIn ra: `Tên in chứng nhận: <HỌ TÊN IN HOA>`.",
    "starterCode": "# Bài 25.4: In hoa họ tên\nname = input()\n",
    "testCases": [
      {
        "input": "nguyen minh an",
        "expectedOutput": "Tên in chứng nhận: NGUYEN MINH AN",
        "isHidden": false
      },
      {
        "input": "  le thu ha  ",
        "expectedOutput": "Tên in chứng nhận: LE THU HA",
        "isHidden": false
      },
      {
        "input": "tran gia bao",
        "expectedOutput": "Tên in chứng nhận: TRAN GIA BAO",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_5",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.5: Tách thông tin sản phẩm từ dòng dữ liệu CSV siêu thị (Luyện tập Bài 25)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Hóa đơn siêu thị điện tử)\nMáy quét mã vạch xuất ra một dòng CSV gồm: `<Tên hàng>,<Đơn giá>,<Số lượng>`. Hãy dùng phương thức `.split(',')` để tách các trường, ép kiểu để tính thành tiền (`Đơn giá * Số lượng`) và in phiếu thanh toán.\n\n### Dữ liệu vào (Input)\nMột dòng định dạng CSV (ví dụ `Sữa tươi,12000,4`).\n\n### Kết quả ra (Output)\n- Dòng 1: `Mặt hàng: <Tên hàng>`\n- Dòng 2: `Đơn giá: <Đơn giá> VNĐ`\n- Dòng 3: `Số lượng: <Số lượng>`\n- Dòng 4: `Thành tiền: <Thành tiền> VNĐ`",
    "starterCode": "# Bài 25.5: Tách CSV siêu thị\nline = input().strip()\n",
    "testCases": [
      {
        "input": "Sữa tươi,12000,4",
        "expectedOutput": "Mặt hàng: Sữa tươi\nĐơn giá: 12000 VNĐ\nSố lượng: 4\nThành tiền: 48000 VNĐ",
        "isHidden": false
      },
      {
        "input": "Bánh mì,5000,10",
        "expectedOutput": "Mặt hàng: Bánh mì\nĐơn giá: 5000 VNĐ\nSố lượng: 10\nThành tiền: 50000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_6",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.6: Tách tên tài khoản và tên miền từ địa chỉ Email học sinh (Luyện tập Bài 25)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Hệ thống thư điện tử giáo dục)\nĐịa chỉ email học sinh có định dạng `username@domain` (ví dụ: `an10a7@python.edu.vn`). Dùng phương thức `.split('@')` để tách và hiển thị thông tin tài khoản cùng nhà cung cấp dịch vụ thư điện tử.\n\n### Dữ liệu vào (Input)\nMột dòng chứa địa chỉ email.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tài khoản: <username>`\n- Dòng 2: `Tên miền: <domain>`",
    "starterCode": "# Bài 25.6: Tách Email\nemail = input().strip()\n",
    "testCases": [
      {
        "input": "an10a7@python.edu.vn",
        "expectedOutput": "Tài khoản: an10a7\nTên miền: python.edu.vn",
        "isHidden": false
      },
      {
        "input": "admin@cococode.site",
        "expectedOutput": "Tài khoản: admin\nTên miền: cococode.site",
        "isHidden": false
      },
      {
        "input": "student@gmail.com",
        "expectedOutput": "Tài khoản: student\nTên miền: gmail.com",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_7",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.7: Bộ lọc từ khóa nhạy cảm trong bình luận mạng xã hội (Luyện tập Bài 25)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Văn hóa ứng xử trên không gian mạng)\nĐể xây dựng môi trường mạng xã hội văn minh, diễn đàn trường học cần tự động thay thế từ khóa nhạy cảm `spam` bằng chuỗi `***`. Hãy sử dụng phương thức `.replace(\"spam\", \"***\")` (xét không phân biệt hoa thường bằng cách xử lý chuỗi thường hoặc thay thế chuẩn) để làm sạch câu bình luận.\n\n### Dữ liệu vào (Input)\nMột dòng chứa nội dung bình luận.\n\n### Kết quả ra (Output)\nIn ra: `Bình luận sau lọc: <nội dung đã thay thế \"spam\" thành \"***\">`.",
    "starterCode": "# Bài 25.7: Lọc từ khóa spam\ncomment = input()\n",
    "testCases": [
      {
        "input": "Day la bai viet spam xin dung spam nua",
        "expectedOutput": "Bình luận sau lọc: Day la bai viet *** xin dung *** nua",
        "isHidden": false
      },
      {
        "input": "Chuc mung sinh nhat ban",
        "expectedOutput": "Bình luận sau lọc: Chuc mung sinh nhat ban",
        "isHidden": false
      },
      {
        "input": "spam",
        "expectedOutput": "Bình luận sau lọc: ***",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_8",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.8: Chuẩn hóa viết hoa chữ cái đầu mỗi từ trong tên địa danh (Luyện tập Bài 25)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Bản đồ du lịch thông minh)\nCho một chuỗi chứa tên địa danh du lịch nhưng bị viết chữ thường hoặc lộn xộn. Hãy chuẩn hóa khoảng trắng thừa và sử dụng phương thức `.title()` (hoặc viết hoa chữ cái đầu mỗi từ) để in ra tên địa danh chuẩn.\n\n### Dữ liệu vào (Input)\nMột dòng chứa tên địa danh.\n\n### Kết quả ra (Output)\nIn ra: `Địa danh chuẩn hóa: <kết quả>`.",
    "starterCode": "# Bài 25.8: Chuẩn hóa Title Case\nplace = input()\n",
    "testCases": [
      {
        "input": "ha noi thu do",
        "expectedOutput": "Địa danh chuẩn hóa: Ha Noi Thu Do",
        "isHidden": false
      },
      {
        "input": "  vinh ha long   quang ninh  ",
        "expectedOutput": "Địa danh chuẩn hóa: Vinh Ha Long Quang Ninh",
        "isHidden": false
      },
      {
        "input": "da nang",
        "expectedOutput": "Địa danh chuẩn hóa: Da Nang",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_9",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.9: Trích xuất các thẻ Hashtag từ bài đăng truyền thông (Luyện tập Bài 25)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Truyền thông số & Tiếp thị nội dung)\nTrong các bài đăng mạng xã hội, các từ bắt đầu bằng dấu `#` được gọi là thẻ Hashtag (ví dụ `#Python`, `#STEM`). Hãy viết chương trình tách tất cả các từ trong bài đăng và lọc ra danh sách các thẻ hashtag (bắt đầu bằng kí tự `#`), sau đó in ra số lượng và danh sách các hashtag.\n\n### Dữ liệu vào (Input)\nMột dòng văn bản bài đăng mạng xã hội.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng Hashtag: <số lượng>`\n- Dòng 2: `Danh sách: <các hashtag cách nhau bởi dấu cách>` (nếu không có hashtag nào in `Không có`)",
    "starterCode": "# Bài 25.9: Trích xuất Hashtag\npost = input()\n",
    "testCases": [
      {
        "input": "Hoc lap trinh cung #Python va #STEM tai #TruongTHPT rat vui",
        "expectedOutput": "Số lượng Hashtag: 3\nDanh sách: #Python #STEM #TruongTHPT",
        "isHidden": false
      },
      {
        "input": "Hom nay troi rat dep",
        "expectedOutput": "Số lượng Hashtag: 0\nDanh sách: Không có",
        "isHidden": false
      },
      {
        "input": "#HocTap #RenLuyen",
        "expectedOutput": "Số lượng Hashtag: 2\nDanh sách: #HocTap #RenLuyen",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_25_10",
    "lessonId": "bai_24_25",
    "glyph": "●",
    "title": "Bài 25.10: Nén dữ liệu cảm biến đo bằng thuật toán đếm chuỗi liên tiếp (RLE) (Luyện tập Bài 25)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Nén dữ liệu IoT)\nCảm biến truyền về chuỗi tín hiệu dạng các kí tự lặp liên tiếp, ví dụ `AAABBBCCDAA`. Thuật toán Run-Length Encoding (RLE) nén chuỗi bằng cách ghi: `<kí tự><số lần lặp>`, ví dụ `A3B3C2D1A2`. Hãy viết chương trình thực hiện nén chuỗi theo thuật toán RLE.\n\n### Dữ liệu vào (Input)\nMột xâu kí tự không rỗng gồm các chữ cái in hoa liên tiếp.\n\n### Kết quả ra (Output)\nIn ra: `Chuỗi nén: <kết quả>`.",
    "starterCode": "# Bài 25.10: Nén dữ liệu Run-length\ns = input().strip()\n",
    "testCases": [
      {
        "input": "AAABBBCCDAA",
        "expectedOutput": "Chuỗi nén: A3B3C2D1A2",
        "isHidden": false
      },
      {
        "input": "WWWWWW",
        "expectedOutput": "Chuỗi nén: W6",
        "isHidden": false
      },
      {
        "input": "ABC",
        "expectedOutput": "Chuỗi nén: A1B1C1",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_1",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.1: Xây dựng hàm tính cước taxi công nghệ theo quãng đường (Luyện tập Bài 26)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Ứng dụng gọi xe công nghệ)\nHãy định nghĩa hàm `tinh_cuoc_taxi(km)` nhận vào số km di chuyển (số thực) và trả về số tiền cước (số nguyên VNĐ) theo biểu giá:\n- Km đầu tiên (hoặc dưới 1 km): `10000` VNĐ.\n- Các km tiếp theo: `12000` VNĐ cho mỗi km.\nVí dụ đi 3.5 km: 1 km đầu giá 10000, 2.5 km tiếp theo giá `2.5 * 12000 = 30000` -> Tổng: 40000 VNĐ.\nChương trình chính: Nhập `km`, gọi hàm và in kết quả.\n\n### Dữ liệu vào (Input)\nMột số thực `km` (> 0).\n\n### Kết quả ra (Output)\nIn ra: `Cước taxi: <số tiền> VNĐ`.",
    "starterCode": "# Bài 26.1: Hàm tính cước taxi\ndef tinh_cuoc_taxi(km):\n    # Viết mã hàm tại đây\n    pass\n\nkm = float(input())\nprint(f\"Cước taxi: {tinh_cuoc_taxi(km)} VNĐ\")\n",
    "testCases": [
      {
        "input": "3.5",
        "expectedOutput": "Cước taxi: 40000 VNĐ",
        "isHidden": false
      },
      {
        "input": "0.8",
        "expectedOutput": "Cước taxi: 10000 VNĐ",
        "isHidden": false
      },
      {
        "input": "10.0",
        "expectedOutput": "Cước taxi: 118000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_2",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.2: Xây dựng hàm chuyển đổi nhiệt độ Celsius sang Fahrenheit (Luyện tập Bài 26)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Trạm khí tượng thông minh)\nViết hàm `c_to_f(celsius)` nhận vào nhiệt độ thang Celsius (số thực) và trả về nhiệt độ tương ứng ở thang Fahrenheit theo công thức: `F = C * 1.8 + 32`.\nChương trình chính: Nhập độ C, gọi hàm và in nhiệt độ F làm tròn 1 chữ số thập phân.\n\n### Dữ liệu vào (Input)\nMột số thực `celsius`.\n\n### Kết quả ra (Output)\nIn ra: `Nhiệt độ F: <kết quả>°F`.",
    "starterCode": "# Bài 26.2: Hàm chuyển C sang F\ndef c_to_f(c):\n    pass\n\nc = float(input())\n",
    "testCases": [
      {
        "input": "25.0",
        "expectedOutput": "Nhiệt độ F: 77.0°F",
        "isHidden": false
      },
      {
        "input": "0.0",
        "expectedOutput": "Nhiệt độ F: 32.0°F",
        "isHidden": false
      },
      {
        "input": "100.0",
        "expectedOutput": "Nhiệt độ F: 212.0°F",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_3",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.3: Xây dựng hàm kiểm tra năm nhuận để lập lịch làm việc (Luyện tập Bài 26)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Lịch vạn niên & Quản lý thời gian)\nĐịnh nghĩa hàm `la_nam_nhuan(nam)` nhận vào số nguyên dương `nam`. Hàm trả về `True` nếu là năm nhuận (chia hết cho 400 HOẶC chia hết cho 4 nhưng không chia hết cho 100), ngược lại trả về `False`.\nChương trình chính: Nhập `nam`, gọi hàm và in kết quả.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `nam`.\n\n### Kết quả ra (Output)\nIn ra: `Năm <nam>: Năm nhuận` hoặc `Năm <nam>: Năm thường`.",
    "starterCode": "# Bài 26.3: Hàm kiểm tra năm nhuận\ndef la_nam_nhuan(nam):\n    pass\n\nnam = int(input())\n",
    "testCases": [
      {
        "input": "2024",
        "expectedOutput": "Năm 2024: Năm nhuận",
        "isHidden": false
      },
      {
        "input": "2023",
        "expectedOutput": "Năm 2023: Năm thường",
        "isHidden": false
      },
      {
        "input": "2000",
        "expectedOutput": "Năm 2000: Năm nhuận",
        "isHidden": true
      },
      {
        "input": "1900",
        "expectedOutput": "Năm 1900: Năm thường",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_4",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.4: Xây dựng hàm tính diện tích và chu vi sân thể thao (Luyện tập Bài 26)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Cơ sở vật chất nhà thi đấu trường học)\nViết hàm `tinh_san(dai, rong)` nhận vào chiều dài và chiều rộng (số thực). Hàm trả về bộ hai giá trị `(chu_vi, dien_tich)` theo công thức hình chữ nhật.\nChương trình chính: Nhập `dai` và `rong`, gọi hàm và in kết quả làm tròn 2 chữ số thập phân.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Chiều dài `dai` (số thực).\n- Dòng 2: Chiều rộng `rong` (số thực).\n\n### Kết quả ra (Output)\n- Dòng 1: `Chu vi: <chu vi> m`\n- Dòng 2: `Diện tích: <diện tích> m2`",
    "starterCode": "# Bài 26.4: Hàm tính sân thể thao\ndef tinh_san(dai, rong):\n    pass\n\ndai = float(input())\nrong = float(input())\n",
    "testCases": [
      {
        "input": "13.4\n6.1",
        "expectedOutput": "Chu vi: 39.00 m\nDiện tích: 81.74 m2",
        "isHidden": false
      },
      {
        "input": "10.0\n5.0",
        "expectedOutput": "Chu vi: 30.00 m\nDiện tích: 50.00 m2",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_5",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.5: Xây dựng hàm đánh giá mức tiêu hao nhiên liệu xe máy (Luyện tập Bài 26)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Đăng kiểm và Bảo vệ môi trường)\nViết hàm `danh_gia_nhien_lieu(lit, km)` nhận vào số lít xăng đã đổ và số km đã đi được. Hàm tính mức tiêu hao trên 100km theo công thức: `tieu_hao = (lit / km) * 100`. Nếu `tieu_hao <= 2.0`: trả về `('Tiết kiệm', tieu_hao)`, nếu `<= 2.5`: `('Bình thường', tieu_hao)`, còn lại: `('Tốn xăng', tieu_hao)`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số lít xăng `lit` (số thực).\n- Dòng 2: Quãng đường `km` (số thực).\n\n### Kết quả ra (Output)\n- Dòng 1: `Mức tiêu hao: <tieu_hao làm tròn 2 chữ số> lít/100km`\n- Dòng 2: `Đánh giá: <Xếp loại>`",
    "starterCode": "# Bài 26.5: Đánh giá tiêu hao nhiên liệu\ndef danh_gia_nhien_lieu(lit, km):\n    pass\n\nlit = float(input())\nkm = float(input())\n",
    "testCases": [
      {
        "input": "3.5\n200.0",
        "expectedOutput": "Mức tiêu hao: 1.75 lít/100km\nĐánh giá: Tiết kiệm",
        "isHidden": false
      },
      {
        "input": "4.6\n200.0",
        "expectedOutput": "Mức tiêu hao: 2.30 lít/100km\nĐánh giá: Bình thường",
        "isHidden": false
      },
      {
        "input": "6.0\n200.0",
        "expectedOutput": "Mức tiêu hao: 3.00 lít/100km\nĐánh giá: Tốn xăng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_6",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.6: Hàm tính tiền lãi và tổng tích lũy gửi tiết kiệm có kỳ hạn 1 năm (Luyện tập Bài 26)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Tài chính gia đình)\nViết hàm `tinh_tiet_kiem(goc, lai_suat)` nhận vào số tiền gốc `goc` (VNĐ, số nguyên) và lãi suất năm `lai_suat` (số thực %). Hàm trả về bộ hai giá trị `(tien_lai, tong_nhan)` sau 1 năm (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tiền gốc `goc` (số nguyên).\n- Dòng 2: Lãi suất năm `lai_suat` (số thực %, ví dụ 6.5).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền lãi sau 1 năm: <tien_lai> VNĐ`\n- Dòng 2: `Tổng tiền nhận được: <tong_nhan> VNĐ`",
    "starterCode": "# Bài 26.6: Tiết kiệm 1 năm\ndef tinh_tiet_kiem(goc, lai_suat):\n    pass\n\ngoc = int(input())\nlai_suat = float(input())\n",
    "testCases": [
      {
        "input": "50000000\n6.0",
        "expectedOutput": "Tiền lãi sau 1 năm: 3000000 VNĐ\nTổng tiền nhận được: 53000000 VNĐ",
        "isHidden": false
      },
      {
        "input": "20000000\n7.5",
        "expectedOutput": "Tiền lãi sau 1 năm: 1500000 VNĐ\nTổng tiền nhận được: 21500000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_7",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.7: Xây dựng hàm xác thực số điện thoại di động hợp lệ (Luyện tập Bài 26)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Xác thực dữ liệu người dùng Form Web)\nViết hàm `kiem_tra_sdt(s)` nhận vào một xâu `s`. Hàm trả về `True` nếu thỏa mãn 3 điều kiện:\n1. Độ dài đúng 10 kí tự (`len(s) == 10`).\n2. Kí tự đầu tiên là chữ số `'0'` (`s[0] == '0'`).\n3. Toàn bộ các kí tự đều là chữ số (`s.isdigit()`).\nNgược lại trả về `False`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu số điện thoại `s`.\n\n### Kết quả ra (Output)\nIn ra: `Số điện thoại hợp lệ` hoặc `Số điện thoại không hợp lệ`.",
    "starterCode": "# Bài 26.7: Xác thực số điện thoại\ndef kiem_tra_sdt(s):\n    pass\n\ns = input().strip()\n",
    "testCases": [
      {
        "input": "0912345678",
        "expectedOutput": "Số điện thoại hợp lệ",
        "isHidden": false
      },
      {
        "input": "912345678",
        "expectedOutput": "Số điện thoại không hợp lệ",
        "isHidden": false
      },
      {
        "input": "091234567a",
        "expectedOutput": "Số điện thoại không hợp lệ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_8",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.8: Hàm tính chỉ số khối cơ thể BMI và phân loại thể trạng (Luyện tập Bài 26)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Y tế học đường & Thể chất thanh thiếu niên)\nViết hàm `tinh_bmi(can_nang, chieu_cao)` với `can_nang` (kg) và `chieu_cao` (m). Công thức: `bmi = can_nang / (chieu_cao ** 2)`.\nPhân loại thể trạng theo chuẩn WHO cho người châu Á:\n- `bmi < 18.5`: `Gầy`\n- `18.5 <= bmi < 23.0`: `Bình thường`\n- `23.0 <= bmi < 25.0`: `Tiền béo phì`\n- `bmi >= 25.0`: `Béo phì`\nHàm trả về `(bmi, phan_loai)`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Cân nặng (kg, số thực).\n- Dòng 2: Chiều cao (m, số thực).\n\n### Kết quả ra (Output)\n- Dòng 1: `Chỉ số BMI: <bmi làm tròn 2 chữ số>`\n- Dòng 2: `Phân loại: <thể trạng>`",
    "starterCode": "# Bài 26.8: Hàm tính BMI\ndef tinh_bmi(can_nang, chieu_cao):\n    pass\n\ncan_nang = float(input())\nchieu_cao = float(input())\n",
    "testCases": [
      {
        "input": "55.0\n1.65",
        "expectedOutput": "Chỉ số BMI: 20.20\nPhân loại: Bình thường",
        "isHidden": false
      },
      {
        "input": "45.0\n1.68",
        "expectedOutput": "Chỉ số BMI: 15.94\nPhân loại: Gầy",
        "isHidden": false
      },
      {
        "input": "75.0\n1.70",
        "expectedOutput": "Chỉ số BMI: 25.95\nPhân loại: Béo phì",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_9",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.9: Xây dựng hàm kiểm tra số nguyên tố phục vụ hệ thống mã hóa bảo mật (Luyện tập Bài 26)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Mật mã học & Khóa công khai RSA)\nHệ thống mã hóa khóa công khai RSA đòi hỏi các số nguyên tố lớn. Hãy xây dựng hàm `la_so_nguyen_to(n)` tối ưu: trả về `True` nếu `n` là số nguyên tố, `False` nếu không.\nChương trình chính: Nhập hai số nguyên `a` và `b` (`a <= b`), gọi hàm để đếm và liệt kê các số nguyên tố trong đoạn `[a, b]`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên `a`.\n- Dòng 2: Số nguyên `b`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng số nguyên tố: <số lượng>`\n- Dòng 2: `Danh sách: <các số cách nhau bởi dấu cách>` (nếu không có số nào in `Không có`)",
    "starterCode": "# Bài 26.9: Hàm kiểm tra số nguyên tố\ndef la_so_nguyen_to(n):\n    pass\n\na = int(input())\nb = int(input())\n",
    "testCases": [
      {
        "input": "10\n30",
        "expectedOutput": "Số lượng số nguyên tố: 6\nDanh sách: 11 13 17 19 23 29",
        "isHidden": false
      },
      {
        "input": "1\n10",
        "expectedOutput": "Số lượng số nguyên tố: 4\nDanh sách: 2 3 5 7",
        "isHidden": false
      },
      {
        "input": "24\n28",
        "expectedOutput": "Số lượng số nguyên tố: 0\nDanh sách: Không có",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_26_10",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 26.10: Hàm tính cước phí dữ liệu di động 4G theo từng gói dung lượng (Luyện tập Bài 26)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Viễn thông số)\nGói cước 4G bao gồm `dung_luong_chuan` MB miễn phí mỗi tháng. Khi người dùng sử dụng vượt mức chuẩn, phần dung lượng phát sinh được chia thành các gói phụ `500` MB. Cứ mỗi block 500 MB (dù dùng 1 MB trong block vẫn tính đủ block) có giá `10000` VNĐ. Hãy viết hàm `tinh_cuoc_4g(dung_luong_dung, dung_luong_chuan)` trả về số tiền phát sinh.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng chuẩn của gói (MB, số nguyên).\n- Dòng 2: Dung lượng thực tế đã dùng (MB, số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Dung lượng vượt gói: <vượt> MB`\n- Dòng 2: `Cước phát sinh: <tiền> VNĐ`",
    "starterCode": "# Bài 26.10: Cước 4G vượt gói\ndef tinh_cuoc_4g(dung, chuan):\n    pass\n\nchuan = int(input())\ndung = int(input())\n",
    "testCases": [
      {
        "input": "3000\n4200",
        "expectedOutput": "Dung lượng vượt gói: 1200 MB\nCước phát sinh: 30000 VNĐ",
        "isHidden": false
      },
      {
        "input": "5000\n4500",
        "expectedOutput": "Dung lượng vượt gói: 0 MB\nCước phát sinh: 0 VNĐ",
        "isHidden": false
      },
      {
        "input": "2000\n2001",
        "expectedOutput": "Dung lượng vượt gói: 1 MB\nCước phát sinh: 10000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_1",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.1: Hàm tính giá thanh toán sản phẩm với tham số thuế VAT mặc định (Luyện tập Bài 27)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Thương mại điện tử & Kế toán bán hàng)\nĐịnh nghĩa hàm `tinh_tong_tien(gia_goc, thue_vat=0.08)` với tham số `thue_vat` có giá trị mặc định là `0.08` (8%). Công thức: `tong = gia_goc * (1 + thue_vat)`.\nChương trình chính nhận vào đơn giá gốc và thuế VAT (nếu người dùng nhập -1 thì dùng giá trị mặc định của hàm).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Giá gốc `gia_goc` (số nguyên VNĐ).\n- Dòng 2: Thuế suất `vat` (số thực %, ví dụ 10.0 là 0.10, hoặc -1 nếu dùng mặc định).\n\n### Kết quả ra (Output)\nIn ra: `Tổng thanh toán: <tiền làm tròn số nguyên> VNĐ`.",
    "starterCode": "# Bài 27.1: Tham số thuế VAT mặc định\ndef tinh_tong_tien(gia_goc, thue_vat=0.08):\n    pass\n\ngia_goc = int(input())\nvat = float(input())\n",
    "testCases": [
      {
        "input": "100000\n-1",
        "expectedOutput": "Tổng thanh toán: 108000 VNĐ",
        "isHidden": false
      },
      {
        "input": "200000\n10.0",
        "expectedOutput": "Tổng thanh toán: 220000 VNĐ",
        "isHidden": false
      },
      {
        "input": "50000\n0.0",
        "expectedOutput": "Tổng thanh toán: 50000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_2",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.2: Hàm tính tiền lương làm thêm giờ với hệ số lương mặc định (Luyện tập Bài 27)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Quản trị nhân sự quán cà phê)\nViết hàm `tinh_luong_ot(gio, luong_gio=25000, he_so=1.5)` tính tiền làm thêm giờ (OT). Công thức: `luong = gio * luong_gio * he_so`. Mặc định lương giờ là 25000đ, hệ số làm thêm là 1.5 (ngày thường).\nNếu là ngày lễ (`la_ngay_le == 1`), hệ số tăng lên `2.0`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số giờ làm thêm `gio` (số thực).\n- Dòng 2: `la_ngay_le` (số nguyên 0 hoặc 1).\n\n### Kết quả ra (Output)\nIn ra: `Tiền làm thêm: <số tiền làm tròn số nguyên> VNĐ`.",
    "starterCode": "# Bài 27.2: Tính lương làm thêm\ndef tinh_luong_ot(gio, luong_gio=25000, he_so=1.5):\n    pass\n\ngio = float(input())\nla_ngay_le = int(input())\n",
    "testCases": [
      {
        "input": "4.0\n0",
        "expectedOutput": "Tiền làm thêm: 150000 VNĐ",
        "isHidden": false
      },
      {
        "input": "4.0\n1",
        "expectedOutput": "Tiền làm thêm: 200000 VNĐ",
        "isHidden": false
      },
      {
        "input": "2.5\n0",
        "expectedOutput": "Tiền làm thêm: 93750 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_3",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.3: Hàm gửi lời chào người dùng với tham số danh xưng mặc định (Luyện tập Bài 27)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Trợ lý ảo trường học)\nViết hàm `gui_loi_chao(ten, danh_xung=\"Bạn\")` trả về chuỗi chào mừng: `\"Xin chào \" + danh_xung + \" \" + ten + \"! Chúc một ngày học tập tốt lành.\"`. Nếu người dùng không nhập danh xưng (nhập chuỗi rỗng `\"\"`), hàm sẽ tự dùng giá trị mặc định `\"Bạn\"`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tên người dùng `ten`.\n- Dòng 2: Danh xưng (ví dụ `Thầy`, `Cô`, hoặc rỗng `NONE` nếu dùng mặc định).\n\n### Kết quả ra (Output)\nIn ra lời chào hoàn chỉnh.",
    "starterCode": "# Bài 27.3: Lời chào danh xưng\ndef gui_loi_chao(ten, danh_xung=\"Bạn\"):\n    pass\n\nten = input().strip()\ndx = input().strip()\n",
    "testCases": [
      {
        "input": "Minh An\nNONE",
        "expectedOutput": "Xin chào Bạn Minh An! Chúc một ngày học tập tốt lành.",
        "isHidden": false
      },
      {
        "input": "Nguyễn Văn Hùng\nThầy",
        "expectedOutput": "Xin chào Thầy Nguyễn Văn Hùng! Chúc một ngày học tập tốt lành.",
        "isHidden": false
      },
      {
        "input": "Thu Hà\nNONE",
        "expectedOutput": "Xin chào Bạn Thu Hà! Chúc một ngày học tập tốt lành.",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_4",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.4: Hàm tính cước giao hàng với tham số bảo hiểm tùy chọn (Luyện tập Bài 27)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Logistics bưu kiện)\nViết hàm `tinh_cuoc(khoi_luong, bao_hiem=0)` tính cước giao hàng: cước gốc là `15000 * khoi_luong` (VNĐ). Nếu khách chọn bảo hiểm hàng dễ vỡ (`bao_hiem == 1`), cộng thêm phụ phí cố định `20000` VNĐ.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Khối lượng bưu kiện (kg, số thực).\n- Dòng 2: Có mua bảo hiểm hay không (0 hoặc 1).\n\n### Kết quả ra (Output)\nIn ra: `Cước giao hàng: <tiền làm tròn số nguyên> VNĐ`.",
    "starterCode": "# Bài 27.4: Cước giao hàng bảo hiểm\ndef tinh_cuoc(khoi_luong, bao_hiem=0):\n    pass\n\nm = float(input())\nbh = int(input())\n",
    "testCases": [
      {
        "input": "2.0\n0",
        "expectedOutput": "Cước giao hàng: 30000 VNĐ",
        "isHidden": false
      },
      {
        "input": "2.0\n1",
        "expectedOutput": "Cước giao hàng: 50000 VNĐ",
        "isHidden": false
      },
      {
        "input": "4.5\n1",
        "expectedOutput": "Cước giao hàng: 87500 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_5",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.5: Hàm đếm số học sinh đạt điểm chuẩn với ngưỡng mặc định (Luyện tập Bài 27)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Khảo sát chất lượng giáo dục)\nViết hàm `dem_dat_chuan(ds_diem, nguong=5.0)` nhận vào danh sách điểm số và ngưỡng điểm chuẩn (mặc định là `5.0`). Hàm trả về số lượng học sinh có điểm `>= nguong`.\nChương trình chính nhận danh sách điểm và ngưỡng chuẩn (nếu nhập -1 thì dùng ngưỡng mặc định).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách điểm số (số thực) cách nhau khoảng trắng.\n- Dòng 2: Ngưỡng điểm chuẩn `nguong` (hoặc -1 nếu dùng mặc định).\n\n### Kết quả ra (Output)\nIn ra: `Số học sinh đạt chuẩn: <số lượng>/<tổng số>`.",
    "starterCode": "# Bài 27.5: Đếm đạt chuẩn\ndef dem_dat_chuan(ds_diem, nguong=5.0):\n    pass\n\nds_diem = list(map(float, input().split()))\nnguong = float(input())\n",
    "testCases": [
      {
        "input": "4.5 6.0 7.5 3.0 8.0\n-1",
        "expectedOutput": "Số học sinh đạt chuẩn: 3/5",
        "isHidden": false
      },
      {
        "input": "4.5 6.0 7.5 3.0 8.0\n7.0",
        "expectedOutput": "Số học sinh đạt chuẩn: 2/5",
        "isHidden": false
      },
      {
        "input": "5.0 5.0 5.0\n-1",
        "expectedOutput": "Số học sinh đạt chuẩn: 3/3",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_6",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.6: Hàm tính điểm trung bình môn Tin học theo trọng số thông tư (Luyện tập Bài 27)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Thông tư đánh giá học sinh THPT)\nĐiểm môn học gồm: Điểm thường xuyên `tx` (hệ số 1), Điểm giữa kỳ `gk` (hệ số 2 mặc định), Điểm cuối kỳ `ck` (hệ số 3 mặc định). Định nghĩa hàm:\n`tinh_diem_tb(tx, gk, ck, w_tx=1, w_gk=2, w_ck=3)`\ntính trung bình theo công thức: `(tx * w_tx + gk * w_gk + ck * w_ck) / (w_tx + w_gk + w_ck)`.\n\n### Dữ liệu vào (Input)\nMột dòng gồm 3 số thực `tx`, `gk`, `ck` cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Điểm trung bình môn: <kết quả làm tròn 1 chữ số thập phân>`.",
    "starterCode": "# Bài 27.6: Điểm trung bình theo trọng số\ndef tinh_diem_tb(tx, gk, ck, w_tx=1, w_gk=2, w_ck=3):\n    pass\n\ntx, gk, ck = map(float, input().split())\n",
    "testCases": [
      {
        "input": "8.0 7.5 9.0",
        "expectedOutput": "Điểm trung bình môn: 8.3",
        "isHidden": false
      },
      {
        "input": "10.0 10.0 10.0",
        "expectedOutput": "Điểm trung bình môn: 10.0",
        "isHidden": false
      },
      {
        "input": "6.0 6.5 7.0",
        "expectedOutput": "Điểm trung bình môn: 6.7",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_7",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.7: Hàm tính tiền lãi kép với tham số kỳ hạn ghép lãi (Luyện tập Bài 27)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Đầu tư tài chính cá nhân)\nViết hàm `tinh_lai_kep(p, r, t, n=1)` tính giá trị tương lai: `A = p * (1 + r / n) ** (n * t)`.\nTrong đó: `p` là tiền gốc, `r` là lãi suất năm (dạng số thập phân, ví dụ 0.06), `t` là số năm, `n` là số lần ghép lãi trong năm (mặc định `n=1` ghép lãi hàng năm; nếu `n=12` ghép lãi hàng tháng).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tiền gốc `p` (số nguyên).\n- Dòng 2: Lãi suất năm `r` (số thực %, ví dụ 6.0 là 0.06).\n- Dòng 3: Số năm `t` (số nguyên).\n- Dòng 4: `n` (số nguyên, nhập 1 hoặc 12).\n\n### Kết quả ra (Output)\nIn ra: `Tổng tiền sau <t> năm: <A làm tròn số nguyên> VNĐ`.",
    "starterCode": "# Bài 27.7: Lãi kép chu kỳ\ndef tinh_lai_kep(p, r, t, n=1):\n    pass\n\np = int(input())\nr = float(input())\nt = int(input())\nn = int(input())\n",
    "testCases": [
      {
        "input": "10000000\n6.0\n2\n1",
        "expectedOutput": "Tổng tiền sau 2 năm: 11236000 VNĐ",
        "isHidden": false
      },
      {
        "input": "10000000\n6.0\n2\n12",
        "expectedOutput": "Tổng tiền sau 2 năm: 11271598 VNĐ",
        "isHidden": false
      },
      {
        "input": "50000000\n8.0\n3\n1",
        "expectedOutput": "Tổng tiền sau 3 năm: 62985600 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_8",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.8: Hàm định dạng hiển thị tiền tệ đa quốc gia với tỷ giá mặc định (Luyện tập Bài 27)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Cổng thanh toán quốc tế)\nViết hàm `dinh_dang_tien(so_tien_vnd, don_vi=\"VND\", ty_gia_usd=25000)`:\n- Nếu `don_vi == \"VND\"`: in `<so_tien_vnd> VNĐ`.\n- Nếu `don_vi == \"USD\"`: đổi sang USD bằng `so_tien_vnd / ty_gia_usd` và in ra dạng `<USD làm tròn 2 chữ số> USD`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền VNĐ (số nguyên).\n- Dòng 2: Đơn vị quy đổi (`VND` hoặc `USD`).\n\n### Kết quả ra (Output)\nIn ra chuỗi hiển thị tương ứng.",
    "starterCode": "# Bài 27.8: Định dạng tiền tệ\ndef dinh_dang_tien(so_tien_vnd, don_vi=\"VND\", ty_gia_usd=25000):\n    pass\n\ntien = int(input())\ndv = input().strip()\n",
    "testCases": [
      {
        "input": "500000\nVND",
        "expectedOutput": "Số tiền: 500000 VNĐ",
        "isHidden": false
      },
      {
        "input": "500000\nUSD",
        "expectedOutput": "Số tiền: 20.00 USD",
        "isHidden": false
      },
      {
        "input": "1250000\nUSD",
        "expectedOutput": "Số tiền: 50.00 USD",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_9",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.9: Hàm tìm giá trị lớn nhất với tham số tùy chọn loại trừ số âm (Luyện tập Bài 27)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Thống kê và Xử lý số liệu tài chính)\nViết hàm `tim_lon_nhat(ds, loai_tru_am=False)`:\n- Nếu `loai_tru_am=False`: trả về giá trị lớn nhất trong toàn bộ danh sách `ds`.\n- Nếu `loai_tru_am=True`: chỉ xét các phần tử `>= 0`. Nếu không có phần tử không âm nào thì trả về `None`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các số nguyên cách nhau khoảng trắng.\n- Dòng 2: Cờ loại trừ số âm (0 là False, 1 là True).\n\n### Kết quả ra (Output)\nIn ra: `Giá trị lớn nhất: <kết quả>` (nếu None thì in `Không có`).",
    "starterCode": "# Bài 27.9: Tìm max với tùy chọn\ndef tim_lon_nhat(ds, loai_tru_am=False):\n    pass\n\nds = list(map(int, input().split()))\nflag = int(input()) == 1\n",
    "testCases": [
      {
        "input": "-10 -5 8 12 -2\n0",
        "expectedOutput": "Giá trị lớn nhất: 12",
        "isHidden": false
      },
      {
        "input": "-10 -5 -2\n1",
        "expectedOutput": "Giá trị lớn nhất: Không có",
        "isHidden": false
      },
      {
        "input": "-20 0 5 -1\n1",
        "expectedOutput": "Giá trị lớn nhất: 5",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_27_10",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 27.10: Hàm mã hóa văn bản Caesar Cipher với bước dịch mặc định (Luyện tập Bài 27)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Lịch sử Mật mã học La Mã)\nThuật toán mã hóa Caesar dịch chuyển mỗi chữ cái tiếng Anh in hoa một khoảng `shift` vị trí trong bảng chữ cái (vòng tròn từ A đến Z). Định nghĩa hàm `caesar_encode(text, shift=3)` dịch chuyển các chữ cái in hoa (các kí tự khác giữ nguyên). Mặc định `shift=3`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Xâu văn bản in hoa.\n- Dòng 2: Bước dịch `shift` (số nguyên, nhập -1 nếu dùng mặc định 3).\n\n### Kết quả ra (Output)\nIn ra: `Mã hóa: <kết quả>`.",
    "starterCode": "# Bài 27.10: Caesar cipher\ndef caesar_encode(text, shift=3):\n    pass\n\ntext = input()\nshift = int(input())\n",
    "testCases": [
      {
        "input": "HELLO PYTHON\n-1",
        "expectedOutput": "Mã hóa: KHOOR SBWKRQ",
        "isHidden": false
      },
      {
        "input": "XYZ\n1",
        "expectedOutput": "Mã hóa: YZA",
        "isHidden": false
      },
      {
        "input": "ANTIGRAVITY\n5",
        "expectedOutput": "Mã hóa: FSYNLWFANYD",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_1",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.1: Quản lý số dư quỹ lớp bằng biến toàn cục (global) (Luyện tập Bài 28)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Tài chính chi đoàn lớp 10)\nKhai báo biến toàn cục `quy_lop = 0`. Định nghĩa hàm `thu_quy(so_tien)` sử dụng từ khóa `global quy_lop` để cộng dồn số tiền thu được. Định nghĩa hàm `chi_quy(so_tien)` trừ tiền chi tiêu khỏi `quy_lop`.\nChương trình chính nhận vào số tiền ban đầu, số tiền thu thêm và số tiền chi ra.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tiền ban đầu (số nguyên).\n- Dòng 2: Tiền thu thêm (số nguyên).\n- Dòng 3: Tiền chi ra (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Số dư quỹ lớp hiện tại: <quy_lop> VNĐ`.",
    "starterCode": "# Bài 28.1: Quỹ lớp toàn cục\nquy_lop = 0\n\ndef thu_quy(so_tien):\n    pass\n\ndef chi_quy(so_tien):\n    pass\n",
    "testCases": [
      {
        "input": "500000\n300000\n150000",
        "expectedOutput": "Số dư quỹ lớp hiện tại: 650000 VNĐ",
        "isHidden": false
      },
      {
        "input": "1000000\n0\n200000",
        "expectedOutput": "Số dư quỹ lớp hiện tại: 800000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_2",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.2: Bộ đếm tổng lượt bạn đọc vào thư viện qua hai cổng (Luyện tập Bài 28)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Cổng tự động thư viện thông minh)\nBiến toàn cục `tong_luot = 0`. Định nghĩa hàm `dem_luot(so_nguoi)` dùng `global tong_luot` để cộng thêm lượt bạn đọc đi qua cổng. Hãy gọi hàm cho Cổng A và Cổng B để in tổng số lượt phục vụ.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số người qua Cổng A (số nguyên).\n- Dòng 2: Số người qua Cổng B (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Tổng lượt bạn đọc: <tong_luot> lượt`.",
    "starterCode": "# Bài 28.2: Bộ đếm bạn đọc\ntong_luot = 0\n\ndef dem_luot(n):\n    pass\n",
    "testCases": [
      {
        "input": "45\n62",
        "expectedOutput": "Tổng lượt bạn đọc: 107 lượt",
        "isHidden": false
      },
      {
        "input": "120\n85",
        "expectedOutput": "Tổng lượt bạn đọc: 205 lượt",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_3",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.3: Quản lý dung lượng lưu trữ đám mây khi tải tệp lên (Luyện tập Bài 28)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Lưu trữ đám mây học tập)\nDung lượng đám mây còn trống ban đầu được lưu trong biến toàn cục `dung_luong_con_lai` (MB). Định nghĩa hàm `tai_tep_len(mb)` dùng `global dung_luong_con_lai`. Nếu dung lượng tệp `<= dung_luong_con_lai`, trừ dung lượng và in `Tải lên thành công`, ngược lại in `Dung lượng không đủ`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng còn lại ban đầu (MB, số nguyên).\n- Dòng 2: Dung lượng tệp tải lên (MB, số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Trạng thái: <thông báo>`\n- Dòng 2: `Dung lượng còn trống: <dung_luong_con_lai> MB`",
    "starterCode": "# Bài 28.3: Dung lượng đám mây\ndef tai_tep_len(mb):\n    pass\n",
    "testCases": [
      {
        "input": "1024\n500",
        "expectedOutput": "Trạng thái: Tải lên thành công\nDung lượng còn trống: 524 MB",
        "isHidden": false
      },
      {
        "input": "200\n350",
        "expectedOutput": "Trạng thái: Dung lượng không đủ\nDung lượng còn trống: 200 MB",
        "isHidden": false
      },
      {
        "input": "500\n500",
        "expectedOutput": "Trạng thái: Tải lên thành công\nDung lượng còn trống: 0 MB",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_4",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.4: Phân biệt tỷ giá mặc định toàn cục và tỷ giá ưu đãi cục bộ (Luyện tập Bài 28)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Tài chính ngoại hối)\nBiến toàn cục `ty_gia = 25000` (1 USD = 25000 VNĐ). Trong hàm `doi_ngoai_te(usd, la_vip)`, nếu `la_vip == 1`, định nghĩa một biến cục bộ `ty_gia = 25500` chỉ có tác dụng trong hàm. Nếu không VIP thì dùng `ty_gia` toàn cục. In số tiền quy đổi trong hàm và kiểm tra xem biến toàn cục bên ngoài có bị thay đổi không.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền USD (số nguyên).\n- Dòng 2: `la_vip` (0 hoặc 1).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền quy đổi: <VNĐ> VNĐ`\n- Dòng 2: `Tỷ giá niêm yết hệ thống: 25000`",
    "starterCode": "# Bài 28.4: Biến toàn cục vs cục bộ\nty_gia = 25000\n",
    "testCases": [
      {
        "input": "100\n1",
        "expectedOutput": "Tiền quy đổi: 2550000 VNĐ\nTỷ giá niêm yết hệ thống: 25000",
        "isHidden": false
      },
      {
        "input": "100\n0",
        "expectedOutput": "Tiền quy đổi: 2500000 VNĐ\nTỷ giá niêm yết hệ thống: 25000",
        "isHidden": false
      },
      {
        "input": "50\n1",
        "expectedOutput": "Tiền quy đổi: 1275000 VNĐ\nTỷ giá niêm yết hệ thống: 25000",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_5",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.5: Theo dõi số lượng vé hội thảo STEM còn lại sau các đợt đăng ký (Luyện tập Bài 28)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Tổ chức sự kiện Khoa học - Kỹ thuật)\nHội thảo có tổng số vé ban đầu lưu ở biến toàn cục `ve_con_lai`. Hàm `dang_ky_ve(so_luong)` kiểm tra nếu `so_luong <= ve_con_lai` thì giảm số vé và trả về `True`, ngược lại trả về `False`. Nhập số vé ban đầu và 2 đợt đăng ký, in số vé còn lại sau từng đợt.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số vé ban đầu (số nguyên).\n- Dòng 2: Số vé đợt 1 (số nguyên).\n- Dòng 3: Số vé đợt 2 (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Đợt 1: Thành công` (hoặc `Thất bại`)\n- Dòng 2: `Đợt 2: Thành công` (hoặc `Thất bại`)\n- Dòng 3: `Vé còn lại: <ve_con_lai>`",
    "starterCode": "# Bài 28.5: Đăng ký vé hội thảo\nve_con_lai = 0\n",
    "testCases": [
      {
        "input": "50\n30\n25",
        "expectedOutput": "Đợt 1: Thành công\nĐợt 2: Thất bại\nVé còn lại: 20",
        "isHidden": false
      },
      {
        "input": "100\n40\n60",
        "expectedOutput": "Đợt 1: Thành công\nĐợt 2: Thành công\nVé còn lại: 0",
        "isHidden": false
      },
      {
        "input": "10\n15\n5",
        "expectedOutput": "Đợt 1: Thất bại\nĐợt 2: Thành công\nVé còn lại: 5",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_6",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.6: Tích lũy điểm thưởng thẻ thành viên siêu thị qua các hóa đơn (Luyện tập Bài 28)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Hệ thống Khách hàng thân thiết)\nBiến toàn cục `tong_diem = 0`. Cứ mỗi 100,000 VNĐ chi tiêu tích lũy được 5 điểm thưởng (`so_tien // 100000 * 5`). Viết hàm `tich_luy(hoa_don)` sử dụng `global tong_diem` để cập nhật điểm. Nhập danh sách các hóa đơn mua sắm trong tháng và in điểm thưởng tích lũy.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên là giá trị hóa đơn (VNĐ) cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\nIn ra: `Tổng điểm thưởng: <tong_diem> điểm`.",
    "starterCode": "# Bài 28.6: Tích lũy điểm thưởng\ntong_diem = 0\n\ndef tich_luy(hoa_don):\n    pass\n",
    "testCases": [
      {
        "input": "250000 120000 480000",
        "expectedOutput": "Tổng điểm thưởng: 35 điểm",
        "isHidden": false
      },
      {
        "input": "90000 80000",
        "expectedOutput": "Tổng điểm thưởng: 0 điểm",
        "isHidden": false
      },
      {
        "input": "1000000",
        "expectedOutput": "Tổng điểm thưởng: 50 điểm",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_7",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.7: Theo dõi và cập nhật mức nhiệt độ kỷ lục ghi nhận toàn cục (Luyện tập Bài 28)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Quan trắc biến đổi khí hậu)\nBiến toàn cục `ky_luc = -999.0`. Định nghĩa hàm `cap_nhat_nhiet_do(t)` dùng `global ky_luc`. Nếu giá trị đo `t > ky_luc` thì cập nhật `ky_luc = t`. Nhập danh sách nhiệt độ quan trắc được trong ngày, gọi hàm và in kỷ lục nhiệt độ cao nhất ghi nhận được.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Nhiệt độ cao nhất ghi nhận: <ky_luc làm tròn 1 chữ số>°C`.",
    "starterCode": "# Bài 28.7: Nhiệt độ kỷ lục\nky_luc = -999.0\n",
    "testCases": [
      {
        "input": "32.5 35.8 38.2 37.1 34.0",
        "expectedOutput": "Nhiệt độ cao nhất ghi nhận: 38.2°C",
        "isHidden": false
      },
      {
        "input": "20.0 25.0 22.0",
        "expectedOutput": "Nhiệt độ cao nhất ghi nhận: 25.0°C",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_8",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.8: Bộ đếm số lần cảnh báo bảo mật vượt quá giới hạn an toàn (Luyện tập Bài 28)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (An ninh mạng trường học)\nBiến toàn cục `so_lan_sai = 0`. Định nghĩa hàm `nhap_sai_mat_khau()` dùng `global so_lan_sai` để tăng thêm 1. Nếu `so_lan_sai >= 3`, hàm trả về chuỗi `\"KHOA_TAI_KHOAN\"`, ngược lại trả về `\"CANH_BAO\"`.\n\n### Dữ liệu vào (Input)\nMột số nguyên `n` là số lần người dùng nhập sai mật khẩu liên tiếp.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lần nhập sai: <so_lan_sai>`\n- Dòng 2: `Trạng thái: <Trạng thái cuối cùng>`",
    "starterCode": "# Bài 28.8: Cảnh báo bảo mật\nso_lan_sai = 0\n",
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "Số lần nhập sai: 2\nTrạng thái: CANH_BAO",
        "isHidden": false
      },
      {
        "input": "3",
        "expectedOutput": "Số lần nhập sai: 3\nTrạng thái: KHOA_TAI_KHOAN",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "Số lần nhập sai: 5\nTrạng thái: KHOA_TAI_KHOAN",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_9",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.9: Quản lý giỏ hàng mua sắm trực tuyến với các biến toàn cục (Luyện tập Bài 28)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Thương mại điện tử E-Commerce)\nHệ thống giỏ hàng sử dụng 2 biến toàn cục: `tong_mon = 0` và `tong_tien = 0`. Định nghĩa hai hàm:\n- `them_hang(so_luong, don_gia)`: tăng `tong_mon` thêm `so_luong` và `tong_tien` thêm `so_luong * don_gia`.\n- `ap_dung_voucher(giam_gia)`: giảm `tong_tien` một lượng `giam_gia` (nếu `tong_tien < 0` thì đặt `tong_tien = 0`).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số món và đơn giá mặt hàng 1 (cách nhau khoảng trắng).\n- Dòng 2: Số món và đơn giá mặt hàng 2 (cách nhau khoảng trắng).\n- Dòng 3: Giá trị voucher giảm giá (số nguyên VNĐ).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số món: <tong_mon>`\n- Dòng 2: `Tổng thanh toán: <tong_tien> VNĐ`",
    "starterCode": "# Bài 28.9: Giỏ hàng toàn cục\ntong_mon = 0\ntong_tien = 0\n",
    "testCases": [
      {
        "input": "2 50000\n3 20000\n30000",
        "expectedOutput": "Tổng số món: 5\nTổng thanh toán: 130000 VNĐ",
        "isHidden": false
      },
      {
        "input": "1 100000\n0 0\n150000",
        "expectedOutput": "Tổng số món: 1\nTổng thanh toán: 0 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_28_10",
    "lessonId": "bai_26_28",
    "glyph": "●",
    "title": "Bài 28.10: Mô phỏng trạm lưu trữ năng lượng mặt trời nạp và xả liên tục (Luyện tập Bài 28)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Năng lượng tái tạo & Lưới điện thông minh)\nMột trạm ắc quy có dung lượng tối đa `dung_luong_max` (kWh) và dung lượng hiện tại lưu trong biến toàn cục `pin_hien_tai` (kWh). Định nghĩa hai hàm:\n- `nap_dien(kwh)`: tăng `pin_hien_tai`, nếu vượt `dung_luong_max` thì gán bằng `dung_luong_max`.\n- `su_dung_dien(kwh)`: giảm `pin_hien_tai`, nếu không đủ điện thì xả hết về 0 và in `Cảnh báo: Hết pin`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng tối đa `dung_luong_max` (số thực).\n- Dòng 2: Dung lượng ban đầu (số thực).\n- Dòng 3: Lượng nạp vào ban ngày (số thực).\n- Dòng 4: Lượng sử dụng ban đêm (số thực).\n\n### Kết quả ra (Output)\n- Dòng thông báo cảnh báo (nếu có).\n- Dòng cuối: `Dung lượng pin còn lại: <pin_hien_tai làm tròn 1 chữ số> kWh`.",
    "starterCode": "# Bài 28.10: Trạm năng lượng mặt trời\ndef nap_dien(kwh):\n    pass\n\ndef su_dung_dien(kwh):\n    pass\n",
    "testCases": [
      {
        "input": "100.0\n30.0\n50.0\n40.0",
        "expectedOutput": "Dung lượng pin còn lại: 40.0 kWh",
        "isHidden": false
      },
      {
        "input": "50.0\n20.0\n40.0\n80.0",
        "expectedOutput": "Cảnh báo: Hết pin\nDung lượng pin còn lại: 0.0 kWh",
        "isHidden": false
      },
      {
        "input": "100.0\n90.0\n30.0\n20.0",
        "expectedOutput": "Dung lượng pin còn lại: 80.0 kWh",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_1",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.1: Bắt lỗi chia cho 0 khi tính đơn giá sản phẩm bình quân (Luyện tập Bài 29)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Kế toán bán lẻ & Xử lý ngoại lệ)\nKhi tính đơn giá bình quân: `don_gia = tong_tien / so_luong`. Nếu khách hàng chưa mua sản phẩm nào (`so_luong == 0`), phép toán sẽ phát sinh lỗi `ZeroDivisionError`. Dùng cấu trúc `try - except ZeroDivisionError` để bắt lỗi này và in thông báo an toàn `Không thể chia cho 0: Số lượng sản phẩm phải lớn hơn 0` thay vì để chương trình bị dừng đột ngột.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tổng tiền `tong_tien` (số nguyên VNĐ).\n- Dòng 2: Số lượng `so_luong` (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Đơn giá bình quân: <đơn giá làm tròn số nguyên> VNĐ` hoặc thông báo lỗi nếu `so_luong == 0`.",
    "starterCode": "# Bài 29.1: Bắt lỗi ZeroDivisionError\ntong_tien = int(input())\nso_luong = int(input())\n",
    "testCases": [
      {
        "input": "150000\n3",
        "expectedOutput": "Đơn giá bình quân: 50000 VNĐ",
        "isHidden": false
      },
      {
        "input": "200000\n0",
        "expectedOutput": "Không thể chia cho 0: Số lượng sản phẩm phải lớn hơn 0",
        "isHidden": false
      },
      {
        "input": "0\n5",
        "expectedOutput": "Đơn giá bình quân: 0 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_2",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.2: Xử lý ngoại lệ dữ liệu nhập không phải số nguyên (ValueError) (Luyện tập Bài 29)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Xác thực dữ liệu mua vé xem phim)\nKhi nhập số lượng vé cần mua `so_ve`, nếu người dùng nhập chữ cái hoặc kí tự đặc biệt (ví dụ `hai`, `abc`), lệnh `int(input())` sẽ phát sinh ngoại lệ `ValueError`. Hãy dùng khối `try - except ValueError` để bắt lỗi này và in thông báo `Lỗi: Dữ liệu nhập vào phải là số nguyên!`.\nNếu hợp lệ, tính tiền với giá vé 75000đ/vé.\n\n### Dữ liệu vào (Input)\nMột dòng chứa chuỗi người dùng nhập vào.\n\n### Kết quả ra (Output)\nIn ra: `Tổng tiền vé: <tiền> VNĐ` hoặc thông báo lỗi nếu phát sinh `ValueError`.",
    "starterCode": "# Bài 29.2: Bắt lỗi ValueError\nraw_input_data = input().strip()\n",
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "Tổng tiền vé: 225000 VNĐ",
        "isHidden": false
      },
      {
        "input": "hai ve",
        "expectedOutput": "Lỗi: Dữ liệu nhập vào phải là số nguyên!",
        "isHidden": false
      },
      {
        "input": "abc12",
        "expectedOutput": "Lỗi: Dữ liệu nhập vào phải là số nguyên!",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_3",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.3: Bắt lỗi truy cập vị trí ghế ngồi vượt chỉ số danh sách (IndexError) (Luyện tập Bài 29)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Đặt chỗ rạp hát học sinh)\nDanh sách `ghes` chứa tên người đã đặt ở các hàng ghế (đánh số chỉ số từ 0). Khi nhập chỉ số `idx`, nếu `idx` nằm ngoài phạm vi `[0, len(ghes) - 1]`, Python sẽ ném ngoại lệ `IndexError`. Dùng `try - except IndexError` để bắt lỗi và in `Lỗi: Chỉ số ghế không tồn tại trong danh sách!`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách tên người đặt ghế cách nhau khoảng trắng.\n- Dòng 2: Chỉ số ghế `idx` (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Người đặt ghế: <tên>` hoặc thông báo lỗi.",
    "starterCode": "# Bài 29.3: Bắt lỗi IndexError\nghes = input().split()\nidx = int(input())\n",
    "testCases": [
      {
        "input": "An Binh Cuong Dung\n2",
        "expectedOutput": "Người đặt ghế: Cuong",
        "isHidden": false
      },
      {
        "input": "An Binh Cuong\n5",
        "expectedOutput": "Lỗi: Chỉ số ghế không tồn tại trong danh sách!",
        "isHidden": false
      },
      {
        "input": "Hoa Mai\n1",
        "expectedOutput": "Người đặt ghế: Mai",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_4",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.4: Nhận biết và ngăn chặn lỗi sai kiểu dữ liệu phép toán (TypeError) (Luyện tập Bài 29)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Phần mềm tính cước)\nTrong Python, phép cộng giữa số thực `float` và chuỗi `str` chưa ép kiểu (ví dụ `10000 + \"5000\"`) sẽ gây ra lỗi `TypeError: unsupported operand type(s)`. Hãy viết chương trình nhận vào 2 giá trị dưới dạng xâu, dùng cấu trúc `try - except (TypeError, ValueError)` để kiểm tra nếu cả hai ép kiểu số thực thành công thì in tổng, ngược lại in `Lỗi: Dữ liệu không tương thích kiểu số!`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Giá trị thứ nhất.\n- Dòng 2: Giá trị thứ hai.\n\n### Kết quả ra (Output)\nIn ra: `Tổng giá trị: <tổng làm tròn 2 chữ số>` hoặc thông báo lỗi.",
    "starterCode": "# Bài 29.4: Bắt lỗi kiểu dữ liệu\nv1 = input().strip()\nv2 = input().strip()\n",
    "testCases": [
      {
        "input": "15000.5\n20000",
        "expectedOutput": "Tổng giá trị: 35000.50",
        "isHidden": false
      },
      {
        "input": "15000\nnam nghin",
        "expectedOutput": "Lỗi: Dữ liệu không tương thích kiểu số!",
        "isHidden": false
      },
      {
        "input": "abc\nxyz",
        "expectedOutput": "Lỗi: Dữ liệu không tương thích kiểu số!",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_5",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.5: Bắt lỗi tra cứu phần tử không tồn tại trong danh sách (ValueError) (Luyện tập Bài 29)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Quản lý điểm thi trường học)\nKhi sử dụng phương thức `ds.index(item)`, nếu `item` không có trong danh sách thì Python sẽ dừng chương trình và báo lỗi `ValueError: 'item' is not in list`. Hãy dùng `try - except ValueError` (hoặc kiểm tra `if item in ds:`) để tra cứu vị trí xếp hạng của học sinh theo mã định danh `sid`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách mã học sinh theo thứ tự xếp hạng (cách nhau khoảng trắng).\n- Dòng 2: Mã học sinh cần tra cứu `sid`.\n\n### Kết quả ra (Output)\nIn ra: `Hạng của học sinh: <chỉ số + 1>` hoặc `Lỗi: Không tìm thấy mã học sinh trong danh sách xếp hạng!`.",
    "starterCode": "# Bài 29.5: Tra cứu mã an toàn\nds = input().split()\nsid = input().strip()\n",
    "testCases": [
      {
        "input": "HS01 HS05 HS02 HS08\nHS05",
        "expectedOutput": "Hạng của học sinh: 2",
        "isHidden": false
      },
      {
        "input": "HS01 HS05 HS02\nHS99",
        "expectedOutput": "Lỗi: Không tìm thấy mã học sinh trong danh sách xếp hạng!",
        "isHidden": false
      },
      {
        "input": "A1 A2 A3\nA1",
        "expectedOutput": "Hạng của học sinh: 1",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_6",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.6: Xác thực giá trị đầu vào không âm và xử lý lỗi miền giá trị (Luyện tập Bài 29)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Tính căn bậc hai độ dài cạnh tam giác)\nKhi tính cạnh tam giác vuông bằng công thức Pitago `c = math.sqrt(a**2 + b**2)` hoặc tính căn bậc hai `math.sqrt(x)`, nếu `x < 0` sẽ bị lỗi miền giá trị `ValueError: math domain error`. Hãy viết chương trình nhập số thực `x`, dùng `try - except` kết hợp sinh lỗi `raise ValueError` khi `x < 0` để in ra căn bậc hai của `x` (làm tròn 2 chữ số) hoặc in `Lỗi: Không thể tính căn bậc hai của số âm!`.\n\n### Dữ liệu vào (Input)\nMột số thực `x`.\n\n### Kết quả ra (Output)\nIn ra: `Căn bậc hai: <kết quả>` hoặc thông báo lỗi.",
    "starterCode": "# Bài 29.6: Căn bậc hai an toàn\nimport math\nx = float(input())\n",
    "testCases": [
      {
        "input": "25.0",
        "expectedOutput": "Căn bậc hai: 5.00",
        "isHidden": false
      },
      {
        "input": "-9.0",
        "expectedOutput": "Lỗi: Không thể tính căn bậc hai của số âm!",
        "isHidden": false
      },
      {
        "input": "2.0",
        "expectedOutput": "Căn bậc hai: 1.41",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_7",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.7: Bắt lỗi giao dịch chuyển khoản ngân hàng vượt số dư hoặc số tiền âm (Luyện tập Bài 29)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Ngân hàng số Mobile Banking)\nViết hàm thực hiện giao dịch chuyển khoản nhận vào `so_du` hiện tại và số tiền muốn chuyển `so_tien`. Kiểm tra các ngoại lệ:\n- Nếu `so_tien <= 0`: in `Lỗi giao dịch: Số tiền chuyển phải lớn hơn 0`.\n- Nếu `so_tien > so_du`: in `Lỗi giao dịch: Số dư không đủ để thực hiện`.\n- Nếu hợp lệ: trừ số dư và in số dư mới.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số dư hiện tại (số nguyên VNĐ).\n- Dòng 2: Số tiền chuyển (số nguyên VNĐ).\n\n### Kết quả ra (Output)\nIn thông báo lỗi hoặc: `Chuyển khoản thành công. Số dư mới: <số dư> VNĐ`.",
    "starterCode": "# Bài 29.7: Xác thực chuyển khoản\nso_du = int(input())\nso_tien = int(input())\n",
    "testCases": [
      {
        "input": "5000000\n2000000",
        "expectedOutput": "Chuyển khoản thành công. Số dư mới: 3000000 VNĐ",
        "isHidden": false
      },
      {
        "input": "1000000\n1500000",
        "expectedOutput": "Lỗi giao dịch: Số dư không đủ để thực hiện",
        "isHidden": false
      },
      {
        "input": "500000\n-50000",
        "expectedOutput": "Lỗi giao dịch: Số tiền chuyển phải lớn hơn 0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_8",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.8: Tự động phân loại nguyên nhân lỗi từ tên mã ngoại lệ Python (Luyện tập Bài 29)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Công cụ chẩn đoán mã nguồn IDE)\nMột công cụ phân tích lỗi cần phân loại mã ngoại lệ Python thành nhóm tương ứng:\n- `ZeroDivisionError`: in `Nhóm: Lỗi toán học chia cho 0`\n- `IndexError`: in `Nhóm: Lỗi vượt quá chỉ số dãy dữ liệu`\n- `ValueError`: in `Nhóm: Lỗi giá trị dữ liệu không hợp lệ`\n- `TypeError`: in `Nhóm: Lỗi sai kiểu dữ liệu toán tử`\n- Khác: in `Nhóm: Lỗi ngoại lệ khác`\n\n### Dữ liệu vào (Input)\nMột dòng chứa tên lớp ngoại lệ (chuỗi).\n\n### Kết quả ra (Output)\nIn ra dòng phân loại nhóm lỗi.",
    "starterCode": "# Bài 29.8: Phân loại ngoại lệ\nerr = input().strip()\n",
    "testCases": [
      {
        "input": "ZeroDivisionError",
        "expectedOutput": "Nhóm: Lỗi toán học chia cho 0",
        "isHidden": false
      },
      {
        "input": "IndexError",
        "expectedOutput": "Nhóm: Lỗi vượt quá chỉ số dãy dữ liệu",
        "isHidden": false
      },
      {
        "input": "KeyError",
        "expectedOutput": "Nhóm: Lỗi ngoại lệ khác",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_9",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.9: Bộ lọc làm sạch dữ liệu cảm biến IoT loại bỏ giá trị lỗi (Luyện tập Bài 29)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Internet vạn vật IoT)\nCảm biến truyền về danh sách các giá trị đo nhiệt độ, nhưng một số dòng bị nhiễu chứa chuỗi ký tự lạ (như `null`, `ERR`, `FAIL`). Hãy duyệt qua danh sách, dùng `try - except ValueError` để lọc ra các giá trị có thể chuyển đổi thành số thực hợp lệ, sau đó tính nhiệt độ trung bình của các giá trị hợp lệ (làm tròn 1 chữ số thập phân).\n\n### Dữ liệu vào (Input)\nMột dòng gồm các chuỗi dữ liệu đo cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số mẫu đo hợp lệ: <số lượng>/<tổng số>`\n- Dòng 2: `Nhiệt độ trung bình hợp lệ: <trung bình>°C`",
    "starterCode": "# Bài 29.9: Làm sạch dữ liệu cảm biến\nraw_data = input().split()\n",
    "testCases": [
      {
        "input": "28.5 ERR 29.0 null 30.5 FAIL 31.0",
        "expectedOutput": "Số mẫu đo hợp lệ: 4/7\nNhiệt độ trung bình hợp lệ: 29.8°C",
        "isHidden": false
      },
      {
        "input": "25.0 26.0 27.0",
        "expectedOutput": "Số mẫu đo hợp lệ: 3/3\nNhiệt độ trung bình hợp lệ: 26.0°C",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_29_10",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 29.10: Xây dựng bộ xác thực nhập điểm thi an toàn đa tầng (Luyện tập Bài 29)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Cổng nhập điểm thi học sinh)\nViết hàm xác thực chuỗi nhập điểm thi `diem_str`:\n- Tầng 1: Thử ép kiểu sang số thực `float(diem_str)`. Nếu thất bại, ném lỗi: `Lỗi: Điểm phải là số thực hợp lệ`.\n- Tầng 2: Kiểm tra miền giá trị `0.0 <= diem <= 10.0`. Nếu vi phạm, ném lỗi: `Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]`.\n- Nếu hợp lệ: in `Điểm hợp lệ: <diem làm tròn 1 chữ số>`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa chuỗi nhập liệu.\n\n### Kết quả ra (Output)\nIn ra thông báo hợp lệ hoặc thông báo lỗi tương ứng.",
    "starterCode": "# Bài 29.10: Xác thực điểm an toàn\ns = input().strip()\n",
    "testCases": [
      {
        "input": "8.5",
        "expectedOutput": "Điểm hợp lệ: 8.5",
        "isHidden": false
      },
      {
        "input": "tam diem",
        "expectedOutput": "Lỗi: Điểm phải là số thực hợp lệ",
        "isHidden": false
      },
      {
        "input": "12.5",
        "expectedOutput": "Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]",
        "isHidden": false
      },
      {
        "input": "-1.0",
        "expectedOutput": "Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_1",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.1: Gỡ lỗi chia cho 0 (ZeroDivisionError) khi tính vận tốc trung bình (Luyện tập Bài 30)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Kiểm thử hộp đen - Bài 30 SGK Tin học 10)\nChương trình ban đầu tính vận tốc `v = s / t` gặp sự cố khi xe chưa chạy (`t == 0`). Hãy viết lại chương trình kiểm tra: nếu `t <= 0` hoặc `s < 0`, in ra `Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!`. Ngược lại tính và in `Vận tốc trung bình: <v làm tròn 2 chữ số> km/h`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Quãng đường `s` (km, số thực).\n- Dòng 2: Thời gian `t` (giờ, số thực).\n\n### Kết quả ra (Output)\nIn ra vận tốc hoặc thông báo lỗi.",
    "starterCode": "# Bài 30.1: Sửa lỗi tính vận tốc\ns = float(input())\nt = float(input())\n",
    "testCases": [
      {
        "input": "120.0\n2.5",
        "expectedOutput": "Vận tốc trung bình: 48.00 km/h",
        "isHidden": false
      },
      {
        "input": "50.0\n0.0",
        "expectedOutput": "Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!",
        "isHidden": false
      },
      {
        "input": "-10.0\n1.0",
        "expectedOutput": "Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_2",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.2: Gỡ lỗi ngữ nghĩa (Semantic Error) trong công thức tính trung bình cộng (Luyện tập Bài 30)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Lỗi thứ tự ưu tiên toán tử)\nHọc sinh viết: `tb = a + b + c / 3` (bị lỗi chia trước cộng sau). Hãy sửa lại công thức đúng `tb = (a + b + c) / 3` và in kết quả làm tròn 2 chữ số thập phân.\n\n### Dữ liệu vào (Input)\nMột dòng gồm 3 số thực `a`, `b`, `c` cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Điểm trung bình đúng: <tb làm tròn 2 chữ số>`.",
    "starterCode": "# Bài 30.2: Sửa công thức trung bình\na, b, c = map(float, input().split())\n",
    "testCases": [
      {
        "input": "7.0 8.0 9.0",
        "expectedOutput": "Điểm trung bình đúng: 8.00",
        "isHidden": false
      },
      {
        "input": "6.5 7.5 8.0",
        "expectedOutput": "Điểm trung bình đúng: 7.33",
        "isHidden": false
      },
      {
        "input": "10.0 10.0 10.0",
        "expectedOutput": "Điểm trung bình đúng: 10.00",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_3",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.3: Gỡ lỗi tìm giá trị lớn nhất khi danh sách chứa toàn số âm (Luyện tập Bài 30)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Lỗi khởi tạo biến biên)\nĐoạn mã: `max_val = 0; for x in ds: if x > max_val: max_val = x` sẽ cho kết quả sai `0` khi danh sách chứa toàn số âm. Hãy sửa lại bằng cách khởi tạo `max_val = ds[0]` và tìm giá trị lớn nhất chính xác.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Giá trị lớn nhất: <max_val>`.",
    "starterCode": "# Bài 30.3: Sửa lỗi tìm max toàn số âm\nds = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "-15 -8 -22 -3 -10",
        "expectedOutput": "Giá trị lớn nhất: -3",
        "isHidden": false
      },
      {
        "input": "-5 -2 -1",
        "expectedOutput": "Giá trị lớn nhất: -1",
        "isHidden": false
      },
      {
        "input": "-100",
        "expectedOutput": "Giá trị lớn nhất: -100",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_4",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.4: Gỡ lỗi vượt quá chỉ số danh sách (IndexError) khi duyệt mảng (Luyện tập Bài 30)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Lỗi Off-by-one trong lập trình)\nĐoạn mã `for i in range(1, len(a) + 1): print(a[i])` bị lỗi `IndexError` vì chỉ số mảng chạy từ `0` đến `len(a) - 1`. Hãy viết lại chương trình duyệt mảng đúng cách từ chỉ số 0 đến `len(a)-1` và in các phần tử trên 1 dòng.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các từ cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Duyệt chuẩn: <các phần tử cách nhau khoảng trắng>`.",
    "starterCode": "# Bài 30.4: Sửa lỗi Off-by-one\na = input().split()\n",
    "testCases": [
      {
        "input": "Cam Quyt Mit Dua",
        "expectedOutput": "Duyệt chuẩn: Cam Quyt Mit Dua",
        "isHidden": false
      },
      {
        "input": "Python Java C++",
        "expectedOutput": "Duyệt chuẩn: Python Java C++",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_5",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.5: Kiểm thử biên và sửa lỗi thiếu dấu bằng trong phân loại chiết khấu (Luyện tập Bài 30)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Kiểm thử giá trị biên Boundary Value Testing)\nChính sách chiết khấu: Hóa đơn từ 500,000 VNĐ trở lên (`hoa_don >= 500000`) được giảm 10%. Lập trình viên viết nhầm thành `hoa_don > 500000` khiến các khách hàng mua đúng 500,000đ bị mất quyền lợi giảm giá. Hãy sửa lại đúng và in số tiền thanh toán thực tế.\n\n### Dữ liệu vào (Input)\nMột số nguyên `hoa_don` (VNĐ).\n\n### Kết quả ra (Output)\nIn ra: `Thanh toán: <tiền làm tròn số nguyên> VNĐ`.",
    "starterCode": "# Bài 30.5: Kiểm thử biên chiết khấu\nhoa_don = int(input())\n",
    "testCases": [
      {
        "input": "500000",
        "expectedOutput": "Thanh toán: 450000 VNĐ",
        "isHidden": false
      },
      {
        "input": "499000",
        "expectedOutput": "Thanh toán: 499000 VNĐ",
        "isHidden": false
      },
      {
        "input": "600000",
        "expectedOutput": "Thanh toán: 540000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_6",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.6: Gỡ lỗi logic kiểm tra năm nhuận khi thiếu điều kiện thế kỷ (Luyện tập Bài 30)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Sửa lỗi logic thuật toán lịch pháp)\nNhiều bạn học sinh viết đơn giản `if nam % 4 == 0:` dẫn đến các năm đầu thế kỷ như `1900`, `2100` bị nhận diện sai là năm nhuận (theo quy tắc quốc tế, năm tròn thế kỷ phải chia hết cho 400 mới là năm nhuận). Hãy viết điều kiện logic đầy đủ và chính xác.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `nam`.\n\n### Kết quả ra (Output)\nIn ra: `Năm <nam>: Nhuận` hoặc `Năm <nam>: Không nhuận`.",
    "starterCode": "# Bài 30.6: Sửa lỗi năm nhuận\nnam = int(input())\n",
    "testCases": [
      {
        "input": "1900",
        "expectedOutput": "Năm 1900: Không nhuận",
        "isHidden": false
      },
      {
        "input": "2000",
        "expectedOutput": "Năm 2000: Nhuận",
        "isHidden": false
      },
      {
        "input": "2024",
        "expectedOutput": "Năm 2024: Nhuận",
        "isHidden": false
      },
      {
        "input": "2023",
        "expectedOutput": "Năm 2023: Không nhuận",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_7",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.7: Gỡ lỗi vòng lặp vô hạn while do quên tăng biến đếm (Luyện tập Bài 30)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Lỗi treo chương trình Infinite Loop)\nTính tổng các số tự nhiên từ 1 đến `n`. Đoạn mã: `i = 1; s = 0; while i <= n: s += i` bị treo vĩnh viễn vì thiếu lệnh `i += 1` bên trong thân vòng lặp. Hãy sửa lỗi này để chương trình chạy hoàn thành và in tổng `s`.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `n`.\n\n### Kết quả ra (Output)\nIn ra: `Tổng từ 1 đến <n>: <s>`.",
    "starterCode": "# Bài 30.7: Sửa lỗi vòng lặp while\nn = int(input())\n",
    "testCases": [
      {
        "input": "10",
        "expectedOutput": "Tổng từ 1 đến 10: 55",
        "isHidden": false
      },
      {
        "input": "100",
        "expectedOutput": "Tổng từ 1 đến 100: 5050",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "Tổng từ 1 đến 1: 1",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_8",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.8: Gỡ lỗi xâu rỗng và khoảng trắng thừa trong bộ lọc tên miền email (Luyện tập Bài 30)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Làm sạch dữ liệu xâu)\nNgười dùng nhập địa chỉ email có chứa khoảng trắng thừa ở đầu hoặc cuối (ví dụ `  student@edu.vn   `). Lệnh `email.endswith(\"@edu.vn\")` trả về `False` do khoảng trắng thừa. Hãy dùng phương thức `.strip()` để làm sạch trước khi kiểm tra đuôi miền `@edu.vn`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu email.\n\n### Kết quả ra (Output)\nIn ra: `Email hợp lệ ngành giáo dục` hoặc `Email không hợp lệ`.",
    "starterCode": "# Bài 30.8: Gỡ lỗi khoảng trắng email\nemail = input()\n",
    "testCases": [
      {
        "input": "  an@edu.vn  ",
        "expectedOutput": "Email hợp lệ ngành giáo dục",
        "isHidden": false
      },
      {
        "input": "an@gmail.com",
        "expectedOutput": "Email không hợp lệ",
        "isHidden": false
      },
      {
        "input": "teacher@edu.vn",
        "expectedOutput": "Email hợp lệ ngành giáo dục",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_9",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.9: Gỡ lỗi logic trong thuật toán tìm kiếm nhị phân (Binary Search) (Luyện tập Bài 30)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Gỡ lỗi thuật toán nâng cao)\nCho danh sách đã sắp xếp tăng dần. Thuật toán tìm kiếm nhị phân gặp lỗi: khi `target > a[mid]`, lập trình viên viết `low = mid` thay vì `low = mid + 1`, làm vòng lặp bị lặp vô hạn. Hãy sửa lại thuật toán tìm kiếm nhị phân chuẩn và in chỉ số tìm thấy (0-based) hoặc -1 nếu không có.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các số nguyên tăng dần cách nhau khoảng trắng.\n- Dòng 2: Số nguyên cần tìm `target`.\n\n### Kết quả ra (Output)\nIn ra: `Vị trí tìm thấy: <chỉ số>` (hoặc `Không tìm thấy` nếu không có).",
    "starterCode": "# Bài 30.9: Gỡ lỗi tìm kiếm nhị phân\na = list(map(int, input().split()))\ntarget = int(input())\n",
    "testCases": [
      {
        "input": "2 5 8 12 16 23 38 56\n16",
        "expectedOutput": "Vị trí tìm thấy: 4",
        "isHidden": false
      },
      {
        "input": "1 3 5 7 9\n4",
        "expectedOutput": "Không tìm thấy",
        "isHidden": false
      },
      {
        "input": "10 20 30\n10",
        "expectedOutput": "Vị trí tìm thấy: 0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_30_10",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 30.10: Kiểm thử toàn diện biểu giá điện bậc thang bao phủ các mốc biên (Luyện tập Bài 30)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Kiểm thử phần mềm tự động)\nBiểu giá điện lũy tiến:\n- Mức 1: Đến 50 kWh: 1678 đ/kWh.\n- Mức 2: Từ 51 đến 100 kWh: 1734 đ/kWh.\n- Mức 3: Trên 100 kWh: 2014 đ/kWh.\nChương trình cần xử lý chính xác và chặt chẽ cả trường hợp `kwh <= 0` (in `Lỗi: Số kWh phải lớn hơn 0`) và đúng chính xác tại các mốc biên 50, 51, 100, 101 kWh.\n\n### Dữ liệu vào (Input)\nMột số nguyên `kwh`.\n\n### Kết quả ra (Output)\nIn ra: `Tiền điện: <số tiền> đồng` hoặc thông báo lỗi.",
    "starterCode": "# Bài 30.10: Kiểm thử toàn diện tiền điện\nkwh = int(input())\n",
    "testCases": [
      {
        "input": "50",
        "expectedOutput": "Tiền điện: 83900 đồng",
        "isHidden": false
      },
      {
        "input": "100",
        "expectedOutput": "Tiền điện: 170600 đồng",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "Lỗi: Số kWh phải lớn hơn 0",
        "isHidden": false
      },
      {
        "input": "101",
        "expectedOutput": "Tiền điện: 172614 đồng",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_1",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.1: Hệ thống tổng hợp bảng điểm và xếp loại học lực cuối năm (Luyện tập Bài 31)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Đánh giá xếp loại học sinh theo Thông tư mới)\nCho danh sách điểm trung bình các môn học của học sinh. Hãy tính điểm trung bình chung `dtb` của tất cả các môn (làm tròn 2 chữ số thập phân) và xếp loại học lực:\n- `dtb >= 8.0`: `Giỏi`\n- `6.5 <= dtb < 8.0`: `Khá`\n- `5.0 <= dtb < 6.5`: `Trung bình`\n- `dtb < 5.0`: `Chưa đạt`\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực là điểm các môn cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Điểm trung bình chung: <dtb>`\n- Dòng 2: `Xếp loại học lực: <loại>`",
    "starterCode": "# Bài 31.1: Tổng hợp điểm và xếp loại\nscores = list(map(float, input().split()))\n",
    "testCases": [
      {
        "input": "8.5 9.0 8.0 7.5 8.5",
        "expectedOutput": "Điểm trung bình chung: 8.30\nXếp loại học lực: Giỏi",
        "isHidden": false
      },
      {
        "input": "6.5 7.0 6.0 7.5",
        "expectedOutput": "Điểm trung bình chung: 6.75\nXếp loại học lực: Khá",
        "isHidden": false
      },
      {
        "input": "4.5 5.0 4.0",
        "expectedOutput": "Điểm trung bình chung: 4.50\nXếp loại học lực: Chưa đạt",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_2",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.2: Trình phân tích chi tiêu cá nhân và cảnh báo ngân sách (Luyện tập Bài 31)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Kỹ năng quản lý tài chính sinh viên)\nBạn có một khoản ngân sách chi tiêu trong tuần `ngan_sach` (VNĐ) và danh sách các khoản chi thực tế trong 7 ngày. Hãy tính tổng chi tiêu trong tuần và kiểm tra:\n- Nếu `tong_chi <= ngan_sach`: in `Chi tiêu hợp lý. Tiền còn dư: <ngan_sach - tong_chi> VNĐ`\n- Nếu `tong_chi > ngan_sach`: in `Cảnh báo: Bội chi ngân sách <tong_chi - ngan_sach> VNĐ`\n\n### Dữ liệu vào (Input)\n- Dòng 1: Ngân sách tuần (số nguyên VNĐ).\n- Dòng 2: 7 số nguyên là chi tiêu 7 ngày cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng chi tiêu: <tong_chi> VNĐ`\n- Dòng 2: Thông báo đánh giá.",
    "starterCode": "# Bài 31.2: Phân tích chi tiêu\nngan_sach = int(input())\nchi_tieu = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "500000\n50000 70000 60000 45000 80000 55000 60000",
        "expectedOutput": "Tổng chi tiêu: 420000 VNĐ\nChi tiêu hợp lý. Tiền còn dư: 80000 VNĐ",
        "isHidden": false
      },
      {
        "input": "300000\n50000 60000 50000 70000 40000 30000 50000",
        "expectedOutput": "Tổng chi tiêu: 350000 VNĐ\nCảnh báo: Bội chi ngân sách 50000 VNĐ",
        "isHidden": false
      },
      {
        "input": "200000\n30000 30000 20000 20000 30000 30000 40000",
        "expectedOutput": "Tổng chi tiêu: 200000 VNĐ\nChi tiêu hợp lý. Tiền còn dư: 0 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_3",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.3: Chương trình kiểm kê kho sách và lập danh sách cần nhập thêm (Luyện tập Bài 31)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Thư viện trường học)\nCho danh sách tên sách và số lượng tồn tương ứng. Một đầu sách cần nhập thêm nếu số lượng tồn kho `< 5`. Hãy lọc và in ra danh sách các đầu sách cần nhập thêm kèm số lượng tồn.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách tên sách cách nhau bởi dấu phẩy.\n- Dòng 2: Danh sách số lượng tồn tương ứng (số nguyên) cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số tựa sách cần nhập thêm: <số lượng>`\n- Tiếp theo là danh sách: `<Tên sách>: còn <tồn> cuốn` (nếu không có cuốn nào in `Kho sách đầy đủ`).",
    "starterCode": "# Bài 31.3: Kiểm kê kho sách\ntitles = [x.strip() for x in input().split(',')]\nstocks = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "Tin học 10, Toán 10, Vật lý 10, Hóa học 10\n3 12 2 15",
        "expectedOutput": "Số tựa sách cần nhập thêm: 2\nTin học 10: còn 3 cuốn\nVật lý 10: còn 2 cuốn",
        "isHidden": false
      },
      {
        "input": "Văn 10, Sử 10\n8 10",
        "expectedOutput": "Số tựa sách cần nhập thêm: 0\nKho sách đầy đủ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_4",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.4: Hệ thống tính hóa đơn tiền nước sinh hoạt kèm phí môi trường (Luyện tập Bài 31)",
    "difficulty": "Beginner",
    "description": "### Đề bài (Dịch vụ cấp thoát nước đô thị)\nTiền nước sinh hoạt tính theo biểu giá: `8000` VNĐ/m3. Ngoài tiền nước gốc, khách hàng phải đóng thêm:\n- Phí bảo vệ môi trường: `10%` tiền nước gốc.\n- Thuế VAT: `5%` tiền nước gốc.\nTổng thanh toán = Tiền nước gốc + Phí BVMT + Thuế VAT.\nViết chương trình nhập số mét khối nước `m3` (số thực) và in hóa đơn chi tiết.\n\n### Dữ liệu vào (Input)\nMột số thực `m3`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền nước gốc: <tiền làm tròn số nguyên> VNĐ`\n- Dòng 2: `Phí bảo vệ môi trường: <tiền làm tròn số nguyên> VNĐ`\n- Dòng 3: `Thuế VAT: <tiền làm tròn số nguyên> VNĐ`\n- Dòng 4: `Tổng thanh toán: <tổng làm tròn số nguyên> VNĐ`",
    "starterCode": "# Bài 31.4: Hóa đơn tiền nước\nm3 = float(input())\n",
    "testCases": [
      {
        "input": "15.0",
        "expectedOutput": "Tiền nước gốc: 120000 VNĐ\nPhí bảo vệ môi trường: 12000 VNĐ\nThuế VAT: 6000 VNĐ\nTổng thanh toán: 138000 VNĐ",
        "isHidden": false
      },
      {
        "input": "10.0",
        "expectedOutput": "Tiền nước gốc: 80000 VNĐ\nPhí bảo vệ môi trường: 8000 VNĐ\nThuế VAT: 4000 VNĐ\nTổng thanh toán: 92000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_5",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.5: Thống kê kết quả bình chọn dự án sáng tạo STEM (Luyện tập Bài 31)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Ngày hội Sáng tạo STEM)\nCho danh sách tên các dự án tham gia và số phiếu bình chọn tương ứng. Hãy tìm dự án đạt giải Nhất (có số phiếu cao nhất) và tính tỷ lệ phần trăm phiếu của dự án đó trên tổng số phiếu bầu (làm tròn 1 chữ số thập phân).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tên các dự án cách nhau bởi dấu phẩy.\n- Dòng 2: Số phiếu bầu của các dự án cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Dự án đạt giải Nhất: <Tên dự án> (<số phiếu> phiếu)`\n- Dòng 2: `Tỷ lệ bình chọn: <tỷ lệ>%`",
    "starterCode": "# Bài 31.5: Bình chọn STEM\nprojects = [x.strip() for x in input().split(',')]\nvotes = list(map(int, input().split()))\n",
    "testCases": [
      {
        "input": "Thùng rác thông minh, Nhà kính IoT, Robot cứu hỏa\n120 250 130",
        "expectedOutput": "Dự án đạt giải Nhất: Nhà kính IoT (250 phiếu)\nTỷ lệ bình chọn: 50.0%",
        "isHidden": false
      },
      {
        "input": "Pin mặt trời, Xe tự hành\n80 120",
        "expectedOutput": "Dự án đạt giải Nhất: Xe tự hành (120 phiếu)\nTỷ lệ bình chọn: 60.0%",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_6",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.6: Ứng dụng đặt vé xem phim trực tuyến với chiết khấu thành viên (Luyện tập Bài 31)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Đặt vé rạp chiếu phim Online)\nKhách hàng chọn loại ghế: `THUONG` giá 80000 VNĐ, hoặc `VIP` giá 110000 VNĐ. Nhập loại ghế, số lượng vé `n`, và mã giảm giá (nếu mã là `HOCSINH` thì giảm 15% tổng tiền). Hãy tính và in hóa đơn thanh toán.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Loại ghế (`THUONG` hoặc `VIP`).\n- Dòng 2: Số lượng vé `n` (số nguyên dương).\n- Dòng 3: Mã giảm giá (chuỗi).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền vé gốc: <gốc> VNĐ`\n- Dòng 2: `Thanh toán: <thanh_toan làm tròn số nguyên> VNĐ`",
    "starterCode": "# Bài 31.6: Đặt vé rạp chiếu phim\nloai_ghe = input().strip()\nso_ve = int(input())\nma_giam = input().strip()\n",
    "testCases": [
      {
        "input": "VIP\n2\nHOCSINH",
        "expectedOutput": "Tiền vé gốc: 220000 VNĐ\nThanh toán: 187000 VNĐ",
        "isHidden": false
      },
      {
        "input": "THUONG\n3\nKHONG",
        "expectedOutput": "Tiền vé gốc: 240000 VNĐ\nThanh toán: 240000 VNĐ",
        "isHidden": false
      },
      {
        "input": "THUONG\n1\nHOCSINH",
        "expectedOutput": "Tiền vé gốc: 80000 VNĐ\nThanh toán: 68000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_7",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.7: Hệ thống chấm điểm tự động bài thi trắc nghiệm học sinh (Luyện tập Bài 31)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Khảo thí & Chấm thi trắc nghiệm)\nBài thi gồm 10 câu trắc nghiệm. Cho đáp án chuẩn của 10 câu và bài làm của thí sinh (mỗi câu chọn A, B, C hoặc D, viết liền nhau không cách, ví dụ `ABCDABCDAB`). Mỗi câu đúng được 1.0 điểm. Hãy so khớp từng vị trí để đếm số câu đúng, số câu sai và tính tổng điểm.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Chuỗi 10 đáp án chuẩn.\n- Dòng 2: Chuỗi 10 câu trả lời của thí sinh.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số câu đúng: <đúng>/10`\n- Dòng 2: `Số câu sai: <sai>/10`\n- Dòng 3: `Tổng điểm: <điểm làm tròn 1 chữ số>`",
    "starterCode": "# Bài 31.7: Chấm thi trắc nghiệm\nkey = input().strip()\nans = input().strip()\n",
    "testCases": [
      {
        "input": "ABCDABCDAB\nABCDABCCAA",
        "expectedOutput": "Số câu đúng: 8/10\nSố câu sai: 2/10\nTổng điểm: 8.0",
        "isHidden": false
      },
      {
        "input": "AAAAAAAAAA\nAAAAAAAAAA",
        "expectedOutput": "Số câu đúng: 10/10\nSố câu sai: 0/10\nTổng điểm: 10.0",
        "isHidden": false
      },
      {
        "input": "ABCDABCDAB\nDCBADCBADC",
        "expectedOutput": "Số câu đúng: 0/10\nSố câu sai: 10/10\nTổng điểm: 0.0",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_8",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.8: Chương trình quản lý phòng trọ sinh viên và in hóa đơn chi tiết (Luyện tập Bài 31)",
    "difficulty": "Intermediate",
    "description": "### Đề bài (Đời sống sinh viên xa nhà)\nChủ nhà trọ tính tiền phòng tháng gồm:\n- Tiền thuê phòng cố định: `2,000,000` VNĐ.\n- Tiền điện: `3500` VNĐ / kWh.\n- Tiền nước: `25000` VNĐ / khối (m3).\n- Tiền internet và rác cố định: `150,000` VNĐ.\nViết chương trình nhập số kWh điện và khối nước đã dùng, tính tổng hóa đơn và chia đều cho số người cùng ở trong phòng `so_nguoi`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số điện tiêu thụ (kWh, số thực).\n- Dòng 2: Số nước tiêu thụ (m3, số thực).\n- Dòng 3: Số người ở ghép `so_nguoi` (số nguyên dương).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng hóa đơn phòng: <tổng làm tròn số nguyên> VNĐ`\n- Dòng 2: `Mỗi người đóng: <chia đều làm tròn số nguyên> VNĐ`",
    "starterCode": "# Bài 31.8: Hóa đơn phòng trọ\ndien = float(input())\nnuoc = float(input())\nso_nguoi = int(input())\n",
    "testCases": [
      {
        "input": "80.0\n6.0\n2",
        "expectedOutput": "Tổng hóa đơn phòng: 2580000 VNĐ\nMỗi người đóng: 1290000 VNĐ",
        "isHidden": false
      },
      {
        "input": "120.0\n10.0\n3",
        "expectedOutput": "Tổng hóa đơn phòng: 2820000 VNĐ\nMỗi người đóng: 940000 VNĐ",
        "isHidden": false
      },
      {
        "input": "50.0\n4.0\n1",
        "expectedOutput": "Tổng hóa đơn phòng: 2425000 VNĐ\nMỗi người đóng: 2425000 VNĐ",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_9",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.9: Trình tính toán chỉ số sức khỏe toàn diện (BMI, BMR và Calo mục tiêu) (Luyện tập Bài 31)",
    "difficulty": "Advanced",
    "description": "### Đề bài (Khoa học dinh dưỡng & Sức khỏe thể thao)\nChương trình tính chỉ số trao đổi chất cơ bản BMR theo công thức Harris-Benedict cho nam giới:\n`BMR = 88.362 + (13.397 * can_nang) + (4.799 * chieu_cao_cm) - (5.677 * tuoi)`\nCalo mục tiêu duy trì hoạt động vừa phải: `TDEE = BMR * 1.55`.\nNhập cân nặng (kg), chiều cao (cm), tuổi. In ra chỉ số BMR và lượng Calo mục tiêu TDEE mỗi ngày (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Cân nặng `can_nang` (kg, số thực).\n- Dòng 2: Chiều cao `chieu_cao_cm` (cm, số thực).\n- Dòng 3: Tuổi `tuoi` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Chỉ số BMR: <BMR> calo/ngày`\n- Dòng 2: `Calo mục tiêu TDEE: <TDEE> calo/ngày`",
    "starterCode": "# Bài 31.9: Sức khỏe BMR & TDEE\ncan_nang = float(input())\nchieu_cao = float(input())\ntuoi = int(input())\n",
    "testCases": [
      {
        "input": "65.0\n170.0\n16",
        "expectedOutput": "Chỉ số BMR: 1684 calo/ngày\nCalo mục tiêu TDEE: 2610 calo/ngày",
        "isHidden": false
      },
      {
        "input": "70.0\n175.0\n20",
        "expectedOutput": "Chỉ số BMR: 1752 calo/ngày\nCalo mục tiêu TDEE: 2716 calo/ngày",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  },
  {
    "id": "asgn_31_10",
    "lessonId": "bai_29_31",
    "glyph": "●",
    "title": "Bài 31.10: Hệ thống phân tích log giao dịch ngân hàng phát hiện giao dịch bất thường (Luyện tập Bài 31)",
    "difficulty": "Advanced",
    "description": "### Đề bài (FinTech & Phòng chống gian lận tài chính Fraud Detection)\nMột giao dịch được hệ thống cảnh báo là `BẤT THƯỜNG` nếu thỏa mãn ít nhất một trong hai điều kiện:\n1. Số tiền giao dịch `so_tien` vượt quá hạn mức `50,000,000` VNĐ (`so_tien > 50000000`).\n2. Giao dịch diễn ra trong khoảng thời gian đêm khuya từ 0h đến 4h sáng (`0 <= gio <= 4`).\nNgược lại, giao dịch là `HỢP LỆ`.\nHãy viết chương trình nhận vào số lượng giao dịch `n`, và thông tin từng giao dịch dạng: `<Mã GD> <Số tiền> <Giờ>`, in danh sách các giao dịch bị cảnh báo.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số lượng giao dịch `n` (số nguyên).\n- `n` dòng tiếp theo: Mỗi dòng gồm `<Mã GD> <Số tiền> <Giờ>` cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số giao dịch cảnh báo bất thường: <số lượng>/<n>`\n- Tiếp theo là danh sách các giao dịch bị cảnh báo: `<Mã GD>: Cảnh báo bất thường` (nếu không có giao dịch nào bất thường in `Toàn bộ giao dịch an toàn`).",
    "starterCode": "# Bài 31.10: Phát hiện giao dịch bất thường\nn = int(input())\n",
    "testCases": [
      {
        "input": "3\nTX01 20000000 14\nTX02 60000000 10\nTX03 5000000 2",
        "expectedOutput": "Số giao dịch cảnh báo bất thường: 2/3\nTX02: Cảnh báo bất thường\nTX03: Cảnh báo bất thường",
        "isHidden": false
      },
      {
        "input": "2\nTX10 10000000 9\nTX11 15000000 15",
        "expectedOutput": "Số giao dịch cảnh báo bất thường: 0/2\nToàn bộ giao dịch an toàn",
        "isHidden": false
      },
      {
        "input": "1\nTX99 100000000 3",
        "expectedOutput": "Số giao dịch cảnh báo bất thường: 1/1\nTX99: Cảnh báo bất thường",
        "isHidden": true
      }
    ],
    "createdBy": "usr_instructor_01",
    "createdAt": "2026-11-15T08:00:00.000Z"
  }
];

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
  if (diff === "Advanced") return "Nâng cao";
  return diff;
}

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "usr_an10a7_asgn_16_1",
    userId: "usr_an10a7",
    userDisplayName: "Nguyễn Minh An",
    userClassName: "10A7",
    userEmail: "an10a7@python.edu.vn",
    assignmentId: "asgn_16_1",
    code: `# Bài 16.1: Tính tiền lãi gửi tiết kiệm ngân hàng của bạn An\nso_tien = int(input())\ntien_lai = so_tien * 0.008\nprint("Tên người gửi: An")\nprint(f"Số tiền gửi: {so_tien} vnđ")\nprint("Lãi suất/tháng: 0.8%")\nprint(f"Tiền lãi: {tien_lai}")\n`,
    status: "passed",
    lastExecutedOutput: "Tên người gửi: An\nSố tiền gửi: 5000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi: 40000.0",
    passedCount: 3,
    totalCount: 3,
    updatedAt: "2026-11-15T08:15:00.000Z",
  }
];