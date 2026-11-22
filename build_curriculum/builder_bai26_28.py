import sys
import os
from test_runner import verify_assignment

def get_assignments_26_to_28():
    assignments = []

    # ----------------------------------------------------
    # BÀI 26: HÀM TRONG PYTHON (10 BÀI)
    # ----------------------------------------------------
    # 26.1: Hàm tính cước taxi công nghệ (Beginner)
    asgn_26_1 = {
        "id": "asgn_26_1",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.1: Xây dựng hàm tính cước taxi công nghệ theo quãng đường (Luyện tập Bài 26)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Ứng dụng gọi xe công nghệ)\nHãy định nghĩa hàm `tinh_cuoc_taxi(km)` nhận vào số km di chuyển (số thực) và trả về số tiền cước (số nguyên VNĐ) theo biểu giá:\n- Km đầu tiên (hoặc dưới 1 km): `10000` VNĐ.\n- Các km tiếp theo: `12000` VNĐ cho mỗi km.\nVí dụ đi 3.5 km: 1 km đầu giá 10000, 2.5 km tiếp theo giá `2.5 * 12000 = 30000` -> Tổng: 40000 VNĐ.\nChương trình chính: Nhập `km`, gọi hàm và in kết quả.\n\n### Dữ liệu vào (Input)\nMột số thực `km` (> 0).\n\n### Kết quả ra (Output)\nIn ra: `Cước taxi: <số tiền> VNĐ`.",
        "starterCode": "# Bài 26.1: Hàm tính cước taxi\ndef tinh_cuoc_taxi(km):\n    # Viết mã hàm tại đây\n    pass\n\nkm = float(input())\nprint(f\"Cước taxi: {tinh_cuoc_taxi(km)} VNĐ\")\n",
        "testCases": [
            {"input": "3.5", "expectedOutput": "Cước taxi: 40000 VNĐ", "isHidden": False},
            {"input": "0.8", "expectedOutput": "Cước taxi: 10000 VNĐ", "isHidden": False},
            {"input": "10.0", "expectedOutput": "Cước taxi: 118000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_1 = """
def tinh_cuoc_taxi(km):
    if km <= 1.0:
        return 10000
    return int(10000 + (km - 1.0) * 12000)

km = float(input())
print(f"Cước taxi: {tinh_cuoc_taxi(km)} VNĐ")
"""
    verify_assignment(asgn_26_1, solver_26_1)
    assignments.append(asgn_26_1)

    # 26.2: Hàm chuyển đổi nhiệt độ C sang F (Beginner)
    asgn_26_2 = {
        "id": "asgn_26_2",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.2: Xây dựng hàm chuyển đổi nhiệt độ Celsius sang Fahrenheit (Luyện tập Bài 26)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Trạm khí tượng thông minh)\nViết hàm `c_to_f(celsius)` nhận vào nhiệt độ thang Celsius (số thực) và trả về nhiệt độ tương ứng ở thang Fahrenheit theo công thức: `F = C * 1.8 + 32`.\nChương trình chính: Nhập độ C, gọi hàm và in nhiệt độ F làm tròn 1 chữ số thập phân.\n\n### Dữ liệu vào (Input)\nMột số thực `celsius`.\n\n### Kết quả ra (Output)\nIn ra: `Nhiệt độ F: <kết quả>°F`.",
        "starterCode": "# Bài 26.2: Hàm chuyển C sang F\ndef c_to_f(c):\n    pass\n\nc = float(input())\n",
        "testCases": [
            {"input": "25.0", "expectedOutput": "Nhiệt độ F: 77.0°F", "isHidden": False},
            {"input": "0.0", "expectedOutput": "Nhiệt độ F: 32.0°F", "isHidden": False},
            {"input": "100.0", "expectedOutput": "Nhiệt độ F: 212.0°F", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_2 = """
def c_to_f(c):
    return c * 1.8 + 32

c = float(input())
print(f"Nhiệt độ F: {c_to_f(c):.1f}°F")
"""
    verify_assignment(asgn_26_2, solver_26_2)
    assignments.append(asgn_26_2)

    # 26.3: Hàm kiểm tra năm nhuận (Beginner)
    asgn_26_3 = {
        "id": "asgn_26_3",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.3: Xây dựng hàm kiểm tra năm nhuận để lập lịch làm việc (Luyện tập Bài 26)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Lịch vạn niên & Quản lý thời gian)\nĐịnh nghĩa hàm `la_nam_nhuan(nam)` nhận vào số nguyên dương `nam`. Hàm trả về `True` nếu là năm nhuận (chia hết cho 400 HOẶC chia hết cho 4 nhưng không chia hết cho 100), ngược lại trả về `False`.\nChương trình chính: Nhập `nam`, gọi hàm và in kết quả.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `nam`.\n\n### Kết quả ra (Output)\nIn ra: `Năm <nam>: Năm nhuận` hoặc `Năm <nam>: Năm thường`.",
        "starterCode": "# Bài 26.3: Hàm kiểm tra năm nhuận\ndef la_nam_nhuan(nam):\n    pass\n\nnam = int(input())\n",
        "testCases": [
            {"input": "2024", "expectedOutput": "Năm 2024: Năm nhuận", "isHidden": False},
            {"input": "2023", "expectedOutput": "Năm 2023: Năm thường", "isHidden": False},
            {"input": "2000", "expectedOutput": "Năm 2000: Năm nhuận", "isHidden": True},
            {"input": "1900", "expectedOutput": "Năm 1900: Năm thường", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_3 = """
def la_nam_nhuan(nam):
    return (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0)

nam = int(input())
if la_nam_nhuan(nam):
    print(f"Năm {nam}: Năm nhuận")
else:
    print(f"Năm {nam}: Năm thường")
"""
    verify_assignment(asgn_26_3, solver_26_3)
    assignments.append(asgn_26_3)

    # 26.4: Hàm tính chu vi và diện tích sân cầu lông (Beginner)
    asgn_26_4 = {
        "id": "asgn_26_4",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.4: Xây dựng hàm tính diện tích và chu vi sân thể thao (Luyện tập Bài 26)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Cơ sở vật chất nhà thi đấu trường học)\nViết hàm `tinh_san(dai, rong)` nhận vào chiều dài và chiều rộng (số thực). Hàm trả về bộ hai giá trị `(chu_vi, dien_tich)` theo công thức hình chữ nhật.\nChương trình chính: Nhập `dai` và `rong`, gọi hàm và in kết quả làm tròn 2 chữ số thập phân.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Chiều dài `dai` (số thực).\n- Dòng 2: Chiều rộng `rong` (số thực).\n\n### Kết quả ra (Output)\n- Dòng 1: `Chu vi: <chu vi> m`\n- Dòng 2: `Diện tích: <diện tích> m2`",
        "starterCode": "# Bài 26.4: Hàm tính sân thể thao\ndef tinh_san(dai, rong):\n    pass\n\ndai = float(input())\nrong = float(input())\n",
        "testCases": [
            {"input": "13.4\n6.1", "expectedOutput": "Chu vi: 39.00 m\nDiện tích: 81.74 m2", "isHidden": False},
            {"input": "10.0\n5.0", "expectedOutput": "Chu vi: 30.00 m\nDiện tích: 50.00 m2", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_4 = """
def tinh_san(dai, rong):
    cv = 2 * (dai + rong)
    dt = dai * rong
    return cv, dt

dai = float(input())
rong = float(input())
cv, dt = tinh_san(dai, rong)
print(f"Chu vi: {cv:.2f} m")
print(f"Diện tích: {dt:.2f} m2")
"""
    verify_assignment(asgn_26_4, solver_26_4)
    assignments.append(asgn_26_4)

    # 26.5: Hàm đánh giá tiêu hao nhiên liệu (Intermediate)
    asgn_26_5 = {
        "id": "asgn_26_5",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.5: Xây dựng hàm đánh giá mức tiêu hao nhiên liệu xe máy (Luyện tập Bài 26)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Đăng kiểm và Bảo vệ môi trường)\nViết hàm `danh_gia_nhien_lieu(lit, km)` nhận vào số lít xăng đã đổ và số km đã đi được. Hàm tính mức tiêu hao trên 100km theo công thức: `tieu_hao = (lit / km) * 100`. Nếu `tieu_hao <= 2.0`: trả về `('Tiết kiệm', tieu_hao)`, nếu `<= 2.5`: `('Bình thường', tieu_hao)`, còn lại: `('Tốn xăng', tieu_hao)`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số lít xăng `lit` (số thực).\n- Dòng 2: Quãng đường `km` (số thực).\n\n### Kết quả ra (Output)\n- Dòng 1: `Mức tiêu hao: <tieu_hao làm tròn 2 chữ số> lít/100km`\n- Dòng 2: `Đánh giá: <Xếp loại>`",
        "starterCode": "# Bài 26.5: Đánh giá tiêu hao nhiên liệu\ndef danh_gia_nhien_lieu(lit, km):\n    pass\n\nlit = float(input())\nkm = float(input())\n",
        "testCases": [
            {"input": "3.5\n200.0", "expectedOutput": "Mức tiêu hao: 1.75 lít/100km\nĐánh giá: Tiết kiệm", "isHidden": False},
            {"input": "4.6\n200.0", "expectedOutput": "Mức tiêu hao: 2.30 lít/100km\nĐánh giá: Bình thường", "isHidden": False},
            {"input": "6.0\n200.0", "expectedOutput": "Mức tiêu hao: 3.00 lít/100km\nĐánh giá: Tốn xăng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_5 = """
def danh_gia_nhien_lieu(lit, km):
    th = (lit / km) * 100
    if th <= 2.0:
        return "Tiết kiệm", th
    elif th <= 2.5:
        return "Bình thường", th
    else:
        return "Tốn xăng", th

lit = float(input())
km = float(input())
loai, th = danh_gia_nhien_lieu(lit, km)
print(f"Mức tiêu hao: {th:.2f} lít/100km")
print(f"Đánh giá: {loai}")
"""
    verify_assignment(asgn_26_5, solver_26_5)
    assignments.append(asgn_26_5)

    # 26.6: Hàm tính tiền tiết kiệm sau 1 năm (Intermediate)
    asgn_26_6 = {
        "id": "asgn_26_6",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.6: Hàm tính tiền lãi và tổng tích lũy gửi tiết kiệm có kỳ hạn 1 năm (Luyện tập Bài 26)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Tài chính gia đình)\nViết hàm `tinh_tiet_kiem(goc, lai_suat)` nhận vào số tiền gốc `goc` (VNĐ, số nguyên) và lãi suất năm `lai_suat` (số thực %). Hàm trả về bộ hai giá trị `(tien_lai, tong_nhan)` sau 1 năm (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tiền gốc `goc` (số nguyên).\n- Dòng 2: Lãi suất năm `lai_suat` (số thực %, ví dụ 6.5).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền lãi sau 1 năm: <tien_lai> VNĐ`\n- Dòng 2: `Tổng tiền nhận được: <tong_nhan> VNĐ`",
        "starterCode": "# Bài 26.6: Tiết kiệm 1 năm\ndef tinh_tiet_kiem(goc, lai_suat):\n    pass\n\ngoc = int(input())\nlai_suat = float(input())\n",
        "testCases": [
            {"input": "50000000\n6.0", "expectedOutput": "Tiền lãi sau 1 năm: 3000000 VNĐ\nTổng tiền nhận được: 53000000 VNĐ", "isHidden": False},
            {"input": "20000000\n7.5", "expectedOutput": "Tiền lãi sau 1 năm: 1500000 VNĐ\nTổng tiền nhận được: 21500000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_6 = """
def tinh_tiet_kiem(goc, lai_suat):
    lai = round(goc * (lai_suat / 100.0))
    tong = goc + lai
    return lai, tong

goc = int(input())
lai_suat = float(input())
lai, tong = tinh_tiet_kiem(goc, lai_suat)
print(f"Tiền lãi sau 1 năm: {lai} VNĐ")
print(f"Tổng tiền nhận được: {tong} VNĐ")
"""
    verify_assignment(asgn_26_6, solver_26_6)
    assignments.append(asgn_26_6)

    # 26.7: Hàm xác thực số điện thoại hợp lệ (Intermediate)
    asgn_26_7 = {
        "id": "asgn_26_7",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.7: Xây dựng hàm xác thực số điện thoại di động hợp lệ (Luyện tập Bài 26)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Xác thực dữ liệu người dùng Form Web)\nViết hàm `kiem_tra_sdt(s)` nhận vào một xâu `s`. Hàm trả về `True` nếu thỏa mãn 3 điều kiện:\n1. Độ dài đúng 10 kí tự (`len(s) == 10`).\n2. Kí tự đầu tiên là chữ số `'0'` (`s[0] == '0'`).\n3. Toàn bộ các kí tự đều là chữ số (`s.isdigit()`).\nNgược lại trả về `False`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu số điện thoại `s`.\n\n### Kết quả ra (Output)\nIn ra: `Số điện thoại hợp lệ` hoặc `Số điện thoại không hợp lệ`.",
        "starterCode": "# Bài 26.7: Xác thực số điện thoại\ndef kiem_tra_sdt(s):\n    pass\n\ns = input().strip()\n",
        "testCases": [
            {"input": "0912345678", "expectedOutput": "Số điện thoại hợp lệ", "isHidden": False},
            {"input": "912345678", "expectedOutput": "Số điện thoại không hợp lệ", "isHidden": False},
            {"input": "091234567a", "expectedOutput": "Số điện thoại không hợp lệ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_7 = """
def kiem_tra_sdt(s):
    return len(s) == 10 and s[0] == '0' and s.isdigit()

s = input().strip()
if kiem_tra_sdt(s):
    print("Số điện thoại hợp lệ")
else:
    print("Số điện thoại không hợp lệ")
"""
    verify_assignment(asgn_26_7, solver_26_7)
    assignments.append(asgn_26_7)

    # 26.8: Hàm tính BMI và phân loại thể trạng (Intermediate)
    asgn_26_8 = {
        "id": "asgn_26_8",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.8: Hàm tính chỉ số khối cơ thể BMI và phân loại thể trạng (Luyện tập Bài 26)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Y tế học đường & Thể chất thanh thiếu niên)\nViết hàm `tinh_bmi(can_nang, chieu_cao)` với `can_nang` (kg) và `chieu_cao` (m). Công thức: `bmi = can_nang / (chieu_cao ** 2)`.\nPhân loại thể trạng theo chuẩn WHO cho người châu Á:\n- `bmi < 18.5`: `Gầy`\n- `18.5 <= bmi < 23.0`: `Bình thường`\n- `23.0 <= bmi < 25.0`: `Tiền béo phì`\n- `bmi >= 25.0`: `Béo phì`\nHàm trả về `(bmi, phan_loai)`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Cân nặng (kg, số thực).\n- Dòng 2: Chiều cao (m, số thực).\n\n### Kết quả ra (Output)\n- Dòng 1: `Chỉ số BMI: <bmi làm tròn 2 chữ số>`\n- Dòng 2: `Phân loại: <thể trạng>`",
        "starterCode": "# Bài 26.8: Hàm tính BMI\ndef tinh_bmi(can_nang, chieu_cao):\n    pass\n\ncan_nang = float(input())\nchieu_cao = float(input())\n",
        "testCases": [
            {"input": "55.0\n1.65", "expectedOutput": "Chỉ số BMI: 20.20\nPhân loại: Bình thường", "isHidden": False},
            {"input": "45.0\n1.68", "expectedOutput": "Chỉ số BMI: 15.94\nPhân loại: Gầy", "isHidden": False},
            {"input": "75.0\n1.70", "expectedOutput": "Chỉ số BMI: 25.95\nPhân loại: Béo phì", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_8 = """
def tinh_bmi(can_nang, chieu_cao):
    bmi = can_nang / (chieu_cao ** 2)
    if bmi < 18.5:
        loai = "Gầy"
    elif bmi < 23.0:
        loai = "Bình thường"
    elif bmi < 25.0:
        loai = "Tiền béo phì"
    else:
        loai = "Béo phì"
    return bmi, loai

can_nang = float(input())
chieu_cao = float(input())
bmi, loai = tinh_bmi(can_nang, chieu_cao)
print(f"Chỉ số BMI: {bmi:.2f}")
print(f"Phân loại: {loai}")
"""
    verify_assignment(asgn_26_8, solver_26_8)
    assignments.append(asgn_26_8)

    # 26.9: Hàm kiểm tra số nguyên tố cho bảo mật (Advanced)
    asgn_26_9 = {
        "id": "asgn_26_9",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.9: Xây dựng hàm kiểm tra số nguyên tố phục vụ hệ thống mã hóa bảo mật (Luyện tập Bài 26)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Mật mã học & Khóa công khai RSA)\nHệ thống mã hóa khóa công khai RSA đòi hỏi các số nguyên tố lớn. Hãy xây dựng hàm `la_so_nguyen_to(n)` tối ưu: trả về `True` nếu `n` là số nguyên tố, `False` nếu không.\nChương trình chính: Nhập hai số nguyên `a` và `b` (`a <= b`), gọi hàm để đếm và liệt kê các số nguyên tố trong đoạn `[a, b]`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên `a`.\n- Dòng 2: Số nguyên `b`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng số nguyên tố: <số lượng>`\n- Dòng 2: `Danh sách: <các số cách nhau bởi dấu cách>` (nếu không có số nào in `Không có`)",
        "starterCode": "# Bài 26.9: Hàm kiểm tra số nguyên tố\ndef la_so_nguyen_to(n):\n    pass\n\na = int(input())\nb = int(input())\n",
        "testCases": [
            {"input": "10\n30", "expectedOutput": "Số lượng số nguyên tố: 6\nDanh sách: 11 13 17 19 23 29", "isHidden": False},
            {"input": "1\n10", "expectedOutput": "Số lượng số nguyên tố: 4\nDanh sách: 2 3 5 7", "isHidden": False},
            {"input": "24\n28", "expectedOutput": "Số lượng số nguyên tố: 0\nDanh sách: Không có", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_9 = """
def la_so_nguyen_to(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

a = int(input())
b = int(input())
snt = [x for x in range(a, b + 1) if la_so_nguyen_to(x)]
print(f"Số lượng số nguyên tố: {len(snt)}")
if snt:
    print("Danh sách: " + " ".join(str(x) for x in snt))
else:
    print("Danh sách: Không có")
"""
    verify_assignment(asgn_26_9, solver_26_9)
    assignments.append(asgn_26_9)

    # 26.10: Hàm tính cước dữ liệu mạng 4G vượt gói (Advanced)
    asgn_26_10 = {
        "id": "asgn_26_10",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 26.10: Hàm tính cước phí dữ liệu di động 4G theo từng gói dung lượng (Luyện tập Bài 26)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Viễn thông số)\nGói cước 4G bao gồm `dung_luong_chuan` MB miễn phí mỗi tháng. Khi người dùng sử dụng vượt mức chuẩn, phần dung lượng phát sinh được chia thành các gói phụ `500` MB. Cứ mỗi block 500 MB (dù dùng 1 MB trong block vẫn tính đủ block) có giá `10000` VNĐ. Hãy viết hàm `tinh_cuoc_4g(dung_luong_dung, dung_luong_chuan)` trả về số tiền phát sinh.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng chuẩn của gói (MB, số nguyên).\n- Dòng 2: Dung lượng thực tế đã dùng (MB, số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Dung lượng vượt gói: <vượt> MB`\n- Dòng 2: `Cước phát sinh: <tiền> VNĐ`",
        "starterCode": "# Bài 26.10: Cước 4G vượt gói\ndef tinh_cuoc_4g(dung, chuan):\n    pass\n\nchuan = int(input())\ndung = int(input())\n",
        "testCases": [
            {"input": "3000\n4200", "expectedOutput": "Dung lượng vượt gói: 1200 MB\nCước phát sinh: 30000 VNĐ", "isHidden": False},
            {"input": "5000\n4500", "expectedOutput": "Dung lượng vượt gói: 0 MB\nCước phát sinh: 0 VNĐ", "isHidden": False},
            {"input": "2000\n2001", "expectedOutput": "Dung lượng vượt gói: 1 MB\nCước phát sinh: 10000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_26_10 = """
def tinh_cuoc_4g(dung, chuan):
    if dung <= chuan:
        return 0, 0
    vuot = dung - chuan
    blocks = (vuot + 499) // 500
    return vuot, blocks * 10000

chuan = int(input())
dung = int(input())
vuot, tien = tinh_cuoc_4g(dung, chuan)
print(f"Dung lượng vượt gói: {vuot} MB")
print(f"Cước phát sinh: {tien} VNĐ")
"""
    verify_assignment(asgn_26_10, solver_26_10)
    assignments.append(asgn_26_10)


    # ----------------------------------------------------
    # BÀI 27: THAM SỐ CỦA HÀM (10 BÀI)
    # ----------------------------------------------------
    # 27.1: Tham số thuế VAT mặc định (Beginner)
    asgn_27_1 = {
        "id": "asgn_27_1",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.1: Hàm tính giá thanh toán sản phẩm với tham số thuế VAT mặc định (Luyện tập Bài 27)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Thương mại điện tử & Kế toán bán hàng)\nĐịnh nghĩa hàm `tinh_tong_tien(gia_goc, thue_vat=0.08)` với tham số `thue_vat` có giá trị mặc định là `0.08` (8%). Công thức: `tong = gia_goc * (1 + thue_vat)`.\nChương trình chính nhận vào đơn giá gốc và thuế VAT (nếu người dùng nhập -1 thì dùng giá trị mặc định của hàm).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Giá gốc `gia_goc` (số nguyên VNĐ).\n- Dòng 2: Thuế suất `vat` (số thực %, ví dụ 10.0 là 0.10, hoặc -1 nếu dùng mặc định).\n\n### Kết quả ra (Output)\nIn ra: `Tổng thanh toán: <tiền làm tròn số nguyên> VNĐ`.",
        "starterCode": "# Bài 27.1: Tham số thuế VAT mặc định\ndef tinh_tong_tien(gia_goc, thue_vat=0.08):\n    pass\n\ngia_goc = int(input())\nvat = float(input())\n",
        "testCases": [
            {"input": "100000\n-1", "expectedOutput": "Tổng thanh toán: 108000 VNĐ", "isHidden": False},
            {"input": "200000\n10.0", "expectedOutput": "Tổng thanh toán: 220000 VNĐ", "isHidden": False},
            {"input": "50000\n0.0", "expectedOutput": "Tổng thanh toán: 50000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_1 = """
def tinh_tong_tien(gia_goc, thue_vat=0.08):
    return round(gia_goc * (1 + thue_vat))

gia_goc = int(input())
vat = float(input())
if vat == -1:
    res = tinh_tong_tien(gia_goc)
else:
    res = tinh_tong_tien(gia_goc, vat / 100.0)
print(f"Tổng thanh toán: {res} VNĐ")
"""
    verify_assignment(asgn_27_1, solver_27_1)
    assignments.append(asgn_27_1)

    # 27.2: Hàm tính lương làm thêm giờ tham số mặc định (Beginner)
    asgn_27_2 = {
        "id": "asgn_27_2",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.2: Hàm tính tiền lương làm thêm giờ với hệ số lương mặc định (Luyện tập Bài 27)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Quản trị nhân sự quán cà phê)\nViết hàm `tinh_luong_ot(gio, luong_gio=25000, he_so=1.5)` tính tiền làm thêm giờ (OT). Công thức: `luong = gio * luong_gio * he_so`. Mặc định lương giờ là 25000đ, hệ số làm thêm là 1.5 (ngày thường).\nNếu là ngày lễ (`la_ngay_le == 1`), hệ số tăng lên `2.0`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số giờ làm thêm `gio` (số thực).\n- Dòng 2: `la_ngay_le` (số nguyên 0 hoặc 1).\n\n### Kết quả ra (Output)\nIn ra: `Tiền làm thêm: <số tiền làm tròn số nguyên> VNĐ`.",
        "starterCode": "# Bài 27.2: Tính lương làm thêm\ndef tinh_luong_ot(gio, luong_gio=25000, he_so=1.5):\n    pass\n\ngio = float(input())\nla_ngay_le = int(input())\n",
        "testCases": [
            {"input": "4.0\n0", "expectedOutput": "Tiền làm thêm: 150000 VNĐ", "isHidden": False},
            {"input": "4.0\n1", "expectedOutput": "Tiền làm thêm: 200000 VNĐ", "isHidden": False},
            {"input": "2.5\n0", "expectedOutput": "Tiền làm thêm: 93750 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_2 = """
def tinh_luong_ot(gio, luong_gio=25000, he_so=1.5):
    return round(gio * luong_gio * he_so)

gio = float(input())
la_ngay_le = int(input())
if la_ngay_le == 1:
    tien = tinh_luong_ot(gio, he_so=2.0)
else:
    tien = tinh_luong_ot(gio)
print(f"Tiền làm thêm: {tien} VNĐ")
"""
    verify_assignment(asgn_27_2, solver_27_2)
    assignments.append(asgn_27_2)

    # 27.3: Lời chào người dùng danh xưng mặc định (Beginner)
    asgn_27_3 = {
        "id": "asgn_27_3",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.3: Hàm gửi lời chào người dùng với tham số danh xưng mặc định (Luyện tập Bài 27)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Trợ lý ảo trường học)\nViết hàm `gui_loi_chao(ten, danh_xung=\"Bạn\")` trả về chuỗi chào mừng: `\"Xin chào \" + danh_xung + \" \" + ten + \"! Chúc một ngày học tập tốt lành.\"`. Nếu người dùng không nhập danh xưng (nhập chuỗi rỗng `\"\"`), hàm sẽ tự dùng giá trị mặc định `\"Bạn\"`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tên người dùng `ten`.\n- Dòng 2: Danh xưng (ví dụ `Thầy`, `Cô`, hoặc rỗng `NONE` nếu dùng mặc định).\n\n### Kết quả ra (Output)\nIn ra lời chào hoàn chỉnh.",
        "starterCode": "# Bài 27.3: Lời chào danh xưng\ndef gui_loi_chao(ten, danh_xung=\"Bạn\"):\n    pass\n\nten = input().strip()\ndx = input().strip()\n",
        "testCases": [
            {"input": "Minh An\nNONE", "expectedOutput": "Xin chào Bạn Minh An! Chúc một ngày học tập tốt lành.", "isHidden": False},
            {"input": "Nguyễn Văn Hùng\nThầy", "expectedOutput": "Xin chào Thầy Nguyễn Văn Hùng! Chúc một ngày học tập tốt lành.", "isHidden": False},
            {"input": "Thu Hà\nNONE", "expectedOutput": "Xin chào Bạn Thu Hà! Chúc một ngày học tập tốt lành.", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_3 = """
def gui_loi_chao(ten, danh_xung="Bạn"):
    return f"Xin chào {danh_xung} {ten}! Chúc một ngày học tập tốt lành."

ten = input().strip()
dx = input().strip()
if dx == "NONE":
    print(gui_loi_chao(ten))
else:
    print(gui_loi_chao(ten, dx))
"""
    verify_assignment(asgn_27_3, solver_27_3)
    assignments.append(asgn_27_3)

    # 27.4: Cước vận chuyển phụ phí bảo hiểm (Beginner)
    asgn_27_4 = {
        "id": "asgn_27_4",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.4: Hàm tính cước giao hàng với tham số bảo hiểm tùy chọn (Luyện tập Bài 27)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Logistics bưu kiện)\nViết hàm `tinh_cuoc(khoi_luong, bao_hiem=0)` tính cước giao hàng: cước gốc là `15000 * khoi_luong` (VNĐ). Nếu khách chọn bảo hiểm hàng dễ vỡ (`bao_hiem == 1`), cộng thêm phụ phí cố định `20000` VNĐ.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Khối lượng bưu kiện (kg, số thực).\n- Dòng 2: Có mua bảo hiểm hay không (0 hoặc 1).\n\n### Kết quả ra (Output)\nIn ra: `Cước giao hàng: <tiền làm tròn số nguyên> VNĐ`.",
        "starterCode": "# Bài 27.4: Cước giao hàng bảo hiểm\ndef tinh_cuoc(khoi_luong, bao_hiem=0):\n    pass\n\nm = float(input())\nbh = int(input())\n",
        "testCases": [
            {"input": "2.0\n0", "expectedOutput": "Cước giao hàng: 30000 VNĐ", "isHidden": False},
            {"input": "2.0\n1", "expectedOutput": "Cước giao hàng: 50000 VNĐ", "isHidden": False},
            {"input": "4.5\n1", "expectedOutput": "Cước giao hàng: 87500 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_4 = """
def tinh_cuoc(khoi_luong, bao_hiem=0):
    cuoc = khoi_luong * 15000
    if bao_hiem == 1:
        cuoc += 20000
    return round(cuoc)

m = float(input())
bh = int(input())
print(f"Cước giao hàng: {tinh_cuoc(m, bh)} VNĐ")
"""
    verify_assignment(asgn_27_4, solver_27_4)
    assignments.append(asgn_27_4)

    # 27.5: Đếm học sinh đạt điểm chuẩn ngưỡng mặc định (Intermediate)
    asgn_27_5 = {
        "id": "asgn_27_5",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.5: Hàm đếm số học sinh đạt điểm chuẩn với ngưỡng mặc định (Luyện tập Bài 27)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Khảo sát chất lượng giáo dục)\nViết hàm `dem_dat_chuan(ds_diem, nguong=5.0)` nhận vào danh sách điểm số và ngưỡng điểm chuẩn (mặc định là `5.0`). Hàm trả về số lượng học sinh có điểm `>= nguong`.\nChương trình chính nhận danh sách điểm và ngưỡng chuẩn (nếu nhập -1 thì dùng ngưỡng mặc định).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách điểm số (số thực) cách nhau khoảng trắng.\n- Dòng 2: Ngưỡng điểm chuẩn `nguong` (hoặc -1 nếu dùng mặc định).\n\n### Kết quả ra (Output)\nIn ra: `Số học sinh đạt chuẩn: <số lượng>/<tổng số>`.",
        "starterCode": "# Bài 27.5: Đếm đạt chuẩn\ndef dem_dat_chuan(ds_diem, nguong=5.0):\n    pass\n\nds_diem = list(map(float, input().split()))\nnguong = float(input())\n",
        "testCases": [
            {"input": "4.5 6.0 7.5 3.0 8.0\n-1", "expectedOutput": "Số học sinh đạt chuẩn: 3/5", "isHidden": False},
            {"input": "4.5 6.0 7.5 3.0 8.0\n7.0", "expectedOutput": "Số học sinh đạt chuẩn: 2/5", "isHidden": False},
            {"input": "5.0 5.0 5.0\n-1", "expectedOutput": "Số học sinh đạt chuẩn: 3/3", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_5 = """
def dem_dat_chuan(ds_diem, nguong=5.0):
    return sum(1 for d in ds_diem if d >= nguong)

ds_diem = list(map(float, input().split()))
nguong = float(input())
if nguong == -1:
    dat = dem_dat_chuan(ds_diem)
else:
    dat = dem_dat_chuan(ds_diem, nguong)
print(f"Số học sinh đạt chuẩn: {dat}/{len(ds_diem)}")
"""
    verify_assignment(asgn_27_5, solver_27_5)
    assignments.append(asgn_27_5)

    # 27.6: Điểm trung bình theo trọng số (Intermediate)
    asgn_27_6 = {
        "id": "asgn_27_6",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.6: Hàm tính điểm trung bình môn Tin học theo trọng số thông tư (Luyện tập Bài 27)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Thông tư đánh giá học sinh THPT)\nĐiểm môn học gồm: Điểm thường xuyên `tx` (hệ số 1), Điểm giữa kỳ `gk` (hệ số 2 mặc định), Điểm cuối kỳ `ck` (hệ số 3 mặc định). Định nghĩa hàm:\n`tinh_diem_tb(tx, gk, ck, w_tx=1, w_gk=2, w_ck=3)`\ntính trung bình theo công thức: `(tx * w_tx + gk * w_gk + ck * w_ck) / (w_tx + w_gk + w_ck)`.\n\n### Dữ liệu vào (Input)\nMột dòng gồm 3 số thực `tx`, `gk`, `ck` cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Điểm trung bình môn: <kết quả làm tròn 1 chữ số thập phân>`.",
        "starterCode": "# Bài 27.6: Điểm trung bình theo trọng số\ndef tinh_diem_tb(tx, gk, ck, w_tx=1, w_gk=2, w_ck=3):\n    pass\n\ntx, gk, ck = map(float, input().split())\n",
        "testCases": [
            {"input": "8.0 7.5 9.0", "expectedOutput": "Điểm trung bình môn: 8.3", "isHidden": False},
            {"input": "10.0 10.0 10.0", "expectedOutput": "Điểm trung bình môn: 10.0", "isHidden": False},
            {"input": "6.0 6.5 7.0", "expectedOutput": "Điểm trung bình môn: 6.7", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_6 = """
def tinh_diem_tb(tx, gk, ck, w_tx=1, w_gk=2, w_ck=3):
    return (tx * w_tx + gk * w_gk + ck * w_ck) / (w_tx + w_gk + w_ck)

tx, gk, ck = map(float, input().split())
tb = tinh_diem_tb(tx, gk, ck)
print(f"Điểm trung bình môn: {tb:.1f}")
"""
    verify_assignment(asgn_27_6, solver_27_6)
    assignments.append(asgn_27_6)

    # 27.7: Hàm lãi kép theo chu kỳ (Intermediate)
    asgn_27_7 = {
        "id": "asgn_27_7",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.7: Hàm tính tiền lãi kép với tham số kỳ hạn ghép lãi (Luyện tập Bài 27)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Đầu tư tài chính cá nhân)\nViết hàm `tinh_lai_kep(p, r, t, n=1)` tính giá trị tương lai: `A = p * (1 + r / n) ** (n * t)`.\nTrong đó: `p` là tiền gốc, `r` là lãi suất năm (dạng số thập phân, ví dụ 0.06), `t` là số năm, `n` là số lần ghép lãi trong năm (mặc định `n=1` ghép lãi hàng năm; nếu `n=12` ghép lãi hàng tháng).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tiền gốc `p` (số nguyên).\n- Dòng 2: Lãi suất năm `r` (số thực %, ví dụ 6.0 là 0.06).\n- Dòng 3: Số năm `t` (số nguyên).\n- Dòng 4: `n` (số nguyên, nhập 1 hoặc 12).\n\n### Kết quả ra (Output)\nIn ra: `Tổng tiền sau <t> năm: <A làm tròn số nguyên> VNĐ`.",
        "starterCode": "# Bài 27.7: Lãi kép chu kỳ\ndef tinh_lai_kep(p, r, t, n=1):\n    pass\n\np = int(input())\nr = float(input())\nt = int(input())\nn = int(input())\n",
        "testCases": [
            {"input": "10000000\n6.0\n2\n1", "expectedOutput": "Tổng tiền sau 2 năm: 11236000 VNĐ", "isHidden": False},
            {"input": "10000000\n6.0\n2\n12", "expectedOutput": "Tổng tiền sau 2 năm: 11271598 VNĐ", "isHidden": False},
            {"input": "50000000\n8.0\n3\n1", "expectedOutput": "Tổng tiền sau 3 năm: 62985600 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_7 = """
def tinh_lai_kep(p, r, t, n=1):
    return round(p * ((1 + r / n) ** (n * t)))

p = int(input())
r = float(input()) / 100.0
t = int(input())
n = int(input())
ans = tinh_lai_kep(p, r, t, n)
print(f"Tổng tiền sau {t} năm: {ans} VNĐ")
"""
    verify_assignment(asgn_27_7, solver_27_7)
    assignments.append(asgn_27_7)

    # 27.8: Hàm định dạng tiền tệ đa quốc gia (Intermediate)
    asgn_27_8 = {
        "id": "asgn_27_8",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.8: Hàm định dạng hiển thị tiền tệ đa quốc gia với tỷ giá mặc định (Luyện tập Bài 27)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Cổng thanh toán quốc tế)\nViết hàm `dinh_dang_tien(so_tien_vnd, don_vi=\"VND\", ty_gia_usd=25000)`:\n- Nếu `don_vi == \"VND\"`: in `<so_tien_vnd> VNĐ`.\n- Nếu `don_vi == \"USD\"`: đổi sang USD bằng `so_tien_vnd / ty_gia_usd` và in ra dạng `<USD làm tròn 2 chữ số> USD`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền VNĐ (số nguyên).\n- Dòng 2: Đơn vị quy đổi (`VND` hoặc `USD`).\n\n### Kết quả ra (Output)\nIn ra chuỗi hiển thị tương ứng.",
        "starterCode": "# Bài 27.8: Định dạng tiền tệ\ndef dinh_dang_tien(so_tien_vnd, don_vi=\"VND\", ty_gia_usd=25000):\n    pass\n\ntien = int(input())\ndv = input().strip()\n",
        "testCases": [
            {"input": "500000\nVND", "expectedOutput": "Số tiền: 500000 VNĐ", "isHidden": False},
            {"input": "500000\nUSD", "expectedOutput": "Số tiền: 20.00 USD", "isHidden": False},
            {"input": "1250000\nUSD", "expectedOutput": "Số tiền: 50.00 USD", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_8 = """
def dinh_dang_tien(so_tien_vnd, don_vi="VND", ty_gia_usd=25000):
    if don_vi == "USD":
        usd = so_tien_vnd / ty_gia_usd
        return f"{usd:.2f} USD"
    return f"{so_tien_vnd} VNĐ"

tien = int(input())
dv = input().strip()
print("Số tiền: " + dinh_dang_tien(tien, don_vi=dv))
"""
    verify_assignment(asgn_27_8, solver_27_8)
    assignments.append(asgn_27_8)

    # 27.9: Hàm tìm max với cờ tùy chọn bỏ số âm (Advanced)
    asgn_27_9 = {
        "id": "asgn_27_9",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.9: Hàm tìm giá trị lớn nhất với tham số tùy chọn loại trừ số âm (Luyện tập Bài 27)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Thống kê và Xử lý số liệu tài chính)\nViết hàm `tim_lon_nhat(ds, loai_tru_am=False)`:\n- Nếu `loai_tru_am=False`: trả về giá trị lớn nhất trong toàn bộ danh sách `ds`.\n- Nếu `loai_tru_am=True`: chỉ xét các phần tử `>= 0`. Nếu không có phần tử không âm nào thì trả về `None`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các số nguyên cách nhau khoảng trắng.\n- Dòng 2: Cờ loại trừ số âm (0 là False, 1 là True).\n\n### Kết quả ra (Output)\nIn ra: `Giá trị lớn nhất: <kết quả>` (nếu None thì in `Không có`).",
        "starterCode": "# Bài 27.9: Tìm max với tùy chọn\ndef tim_lon_nhat(ds, loai_tru_am=False):\n    pass\n\nds = list(map(int, input().split()))\nflag = int(input()) == 1\n",
        "testCases": [
            {"input": "-10 -5 8 12 -2\n0", "expectedOutput": "Giá trị lớn nhất: 12", "isHidden": False},
            {"input": "-10 -5 -2\n1", "expectedOutput": "Giá trị lớn nhất: Không có", "isHidden": False},
            {"input": "-20 0 5 -1\n1", "expectedOutput": "Giá trị lớn nhất: 5", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_9 = """
def tim_lon_nhat(ds, loai_tru_am=False):
    if loai_tru_am:
        hop_le = [x for x in ds if x >= 0]
        return max(hop_le) if hop_le else None
    return max(ds)

ds = list(map(int, input().split()))
flag = int(input()) == 1
res = tim_lon_nhat(ds, loai_tru_am=flag)
if res is None:
    print("Giá trị lớn nhất: Không có")
else:
    print(f"Giá trị lớn nhất: {res}")
"""
    verify_assignment(asgn_27_9, solver_27_9)
    assignments.append(asgn_27_9)

    # 27.10: Mã hóa Caesar với bước dịch mặc định (Advanced)
    asgn_27_10 = {
        "id": "asgn_27_10",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 27.10: Hàm mã hóa văn bản Caesar Cipher với bước dịch mặc định (Luyện tập Bài 27)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Lịch sử Mật mã học La Mã)\nThuật toán mã hóa Caesar dịch chuyển mỗi chữ cái tiếng Anh in hoa một khoảng `shift` vị trí trong bảng chữ cái (vòng tròn từ A đến Z). Định nghĩa hàm `caesar_encode(text, shift=3)` dịch chuyển các chữ cái in hoa (các kí tự khác giữ nguyên). Mặc định `shift=3`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Xâu văn bản in hoa.\n- Dòng 2: Bước dịch `shift` (số nguyên, nhập -1 nếu dùng mặc định 3).\n\n### Kết quả ra (Output)\nIn ra: `Mã hóa: <kết quả>`.",
        "starterCode": "# Bài 27.10: Caesar cipher\ndef caesar_encode(text, shift=3):\n    pass\n\ntext = input()\nshift = int(input())\n",
        "testCases": [
            {"input": "HELLO PYTHON\n-1", "expectedOutput": "Mã hóa: KHOOR SBWKRQ", "isHidden": False},
            {"input": "XYZ\n1", "expectedOutput": "Mã hóa: YZA", "isHidden": False},
            {"input": "ANTIGRAVITY\n5", "expectedOutput": "Mã hóa: FSYNLWFANYD", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_27_10 = """
def caesar_encode(text, shift=3):
    res = []
    for ch in text:
        if 'A' <= ch <= 'Z':
            new_c = chr((ord(ch) - ord('A') + shift) % 26 + ord('A'))
            res.append(new_c)
        else:
            res.append(ch)
    return "".join(res)

text = input()
shift = int(input())
if shift == -1:
    out = caesar_encode(text)
else:
    out = caesar_encode(text, shift)
print(f"Mã hóa: {out}")
"""
    verify_assignment(asgn_27_10, solver_27_10)
    assignments.append(asgn_27_10)


    # ----------------------------------------------------
    # BÀI 28: PHẠM VI CỦA BIẾN (10 BÀI)
    # ----------------------------------------------------
    # 28.1: Quản lý quỹ lớp bằng global (Beginner)
    asgn_28_1 = {
        "id": "asgn_28_1",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.1: Quản lý số dư quỹ lớp bằng biến toàn cục (global) (Luyện tập Bài 28)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Tài chính chi đoàn lớp 10)\nKhai báo biến toàn cục `quy_lop = 0`. Định nghĩa hàm `thu_quy(so_tien)` sử dụng từ khóa `global quy_lop` để cộng dồn số tiền thu được. Định nghĩa hàm `chi_quy(so_tien)` trừ tiền chi tiêu khỏi `quy_lop`.\nChương trình chính nhận vào số tiền ban đầu, số tiền thu thêm và số tiền chi ra.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tiền ban đầu (số nguyên).\n- Dòng 2: Tiền thu thêm (số nguyên).\n- Dòng 3: Tiền chi ra (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Số dư quỹ lớp hiện tại: <quy_lop> VNĐ`.",
        "starterCode": "# Bài 28.1: Quỹ lớp toàn cục\nquy_lop = 0\n\ndef thu_quy(so_tien):\n    pass\n\ndef chi_quy(so_tien):\n    pass\n",
        "testCases": [
            {"input": "500000\n300000\n150000", "expectedOutput": "Số dư quỹ lớp hiện tại: 650000 VNĐ", "isHidden": False},
            {"input": "1000000\n0\n200000", "expectedOutput": "Số dư quỹ lớp hiện tại: 800000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_1 = """
quy_lop = int(input())

def thu_quy(so_tien):
    global quy_lop
    quy_lop += so_tien

def chi_quy(so_tien):
    global quy_lop
    quy_lop -= so_tien

thu = int(input())
chi = int(input())
thu_quy(thu)
chi_quy(chi)
print(f"Số dư quỹ lớp hiện tại: {quy_lop} VNĐ")
"""
    verify_assignment(asgn_28_1, solver_28_1)
    assignments.append(asgn_28_1)

    # 28.2: Bộ đếm lượt bạn đọc qua cổng (Beginner)
    asgn_28_2 = {
        "id": "asgn_28_2",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.2: Bộ đếm tổng lượt bạn đọc vào thư viện qua hai cổng (Luyện tập Bài 28)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Cổng tự động thư viện thông minh)\nBiến toàn cục `tong_luot = 0`. Định nghĩa hàm `dem_luot(so_nguoi)` dùng `global tong_luot` để cộng thêm lượt bạn đọc đi qua cổng. Hãy gọi hàm cho Cổng A và Cổng B để in tổng số lượt phục vụ.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số người qua Cổng A (số nguyên).\n- Dòng 2: Số người qua Cổng B (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Tổng lượt bạn đọc: <tong_luot> lượt`.",
        "starterCode": "# Bài 28.2: Bộ đếm bạn đọc\ntong_luot = 0\n\ndef dem_luot(n):\n    pass\n",
        "testCases": [
            {"input": "45\n62", "expectedOutput": "Tổng lượt bạn đọc: 107 lượt", "isHidden": False},
            {"input": "120\n85", "expectedOutput": "Tổng lượt bạn đọc: 205 lượt", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_2 = """
tong_luot = 0

def dem_luot(n):
    global tong_luot
    tong_luot += n

a = int(input())
b = int(input())
dem_luot(a)
dem_luot(b)
print(f"Tổng lượt bạn đọc: {tong_luot} lượt")
"""
    verify_assignment(asgn_28_2, solver_28_2)
    assignments.append(asgn_28_2)

    # 28.3: Quản lý dung lượng đám mây (Beginner)
    asgn_28_3 = {
        "id": "asgn_28_3",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.3: Quản lý dung lượng lưu trữ đám mây khi tải tệp lên (Luyện tập Bài 28)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Lưu trữ đám mây học tập)\nDung lượng đám mây còn trống ban đầu được lưu trong biến toàn cục `dung_luong_con_lai` (MB). Định nghĩa hàm `tai_tep_len(mb)` dùng `global dung_luong_con_lai`. Nếu dung lượng tệp `<= dung_luong_con_lai`, trừ dung lượng và in `Tải lên thành công`, ngược lại in `Dung lượng không đủ`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng còn lại ban đầu (MB, số nguyên).\n- Dòng 2: Dung lượng tệp tải lên (MB, số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Trạng thái: <thông báo>`\n- Dòng 2: `Dung lượng còn trống: <dung_luong_con_lai> MB`",
        "starterCode": "# Bài 28.3: Dung lượng đám mây\ndef tai_tep_len(mb):\n    pass\n",
        "testCases": [
            {"input": "1024\n500", "expectedOutput": "Trạng thái: Tải lên thành công\nDung lượng còn trống: 524 MB", "isHidden": False},
            {"input": "200\n350", "expectedOutput": "Trạng thái: Dung lượng không đủ\nDung lượng còn trống: 200 MB", "isHidden": False},
            {"input": "500\n500", "expectedOutput": "Trạng thái: Tải lên thành công\nDung lượng còn trống: 0 MB", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_3 = """
dung_luong_con_lai = int(input())

def tai_tep_len(mb):
    global dung_luong_con_lai
    if mb <= dung_luong_con_lai:
        dung_luong_con_lai -= mb
        print("Trạng thái: Tải lên thành công")
    else:
        print("Trạng thái: Dung lượng không đủ")

file_size = int(input())
tai_tep_len(file_size)
print(f"Dung lượng còn trống: {dung_luong_con_lai} MB")
"""
    verify_assignment(asgn_28_3, solver_28_3)
    assignments.append(asgn_28_3)

    # 28.4: Phân biệt tỷ giá toàn cục và ưu đãi cục bộ (Beginner)
    asgn_28_4 = {
        "id": "asgn_28_4",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.4: Phân biệt tỷ giá mặc định toàn cục và tỷ giá ưu đãi cục bộ (Luyện tập Bài 28)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Tài chính ngoại hối)\nBiến toàn cục `ty_gia = 25000` (1 USD = 25000 VNĐ). Trong hàm `doi_ngoai_te(usd, la_vip)`, nếu `la_vip == 1`, định nghĩa một biến cục bộ `ty_gia = 25500` chỉ có tác dụng trong hàm. Nếu không VIP thì dùng `ty_gia` toàn cục. In số tiền quy đổi trong hàm và kiểm tra xem biến toàn cục bên ngoài có bị thay đổi không.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền USD (số nguyên).\n- Dòng 2: `la_vip` (0 hoặc 1).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền quy đổi: <VNĐ> VNĐ`\n- Dòng 2: `Tỷ giá niêm yết hệ thống: 25000`",
        "starterCode": "# Bài 28.4: Biến toàn cục vs cục bộ\nty_gia = 25000\n",
        "testCases": [
            {"input": "100\n1", "expectedOutput": "Tiền quy đổi: 2550000 VNĐ\nTỷ giá niêm yết hệ thống: 25000", "isHidden": False},
            {"input": "100\n0", "expectedOutput": "Tiền quy đổi: 2500000 VNĐ\nTỷ giá niêm yết hệ thống: 25000", "isHidden": False},
            {"input": "50\n1", "expectedOutput": "Tiền quy đổi: 1275000 VNĐ\nTỷ giá niêm yết hệ thống: 25000", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_4 = """
ty_gia = 25000

def doi_ngoai_te(usd, la_vip):
    if la_vip == 1:
        local_rate = 25500
        return usd * local_rate
    else:
        return usd * ty_gia

usd = int(input())
la_vip = int(input())
vnd = doi_ngoai_te(usd, la_vip)
print(f"Tiền quy đổi: {vnd} VNĐ")
print(f"Tỷ giá niêm yết hệ thống: {ty_gia}")
"""
    verify_assignment(asgn_28_4, solver_28_4)
    assignments.append(asgn_28_4)

    # 28.5: Theo dõi số lượng vé hội thảo còn lại (Intermediate)
    asgn_28_5 = {
        "id": "asgn_28_5",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.5: Theo dõi số lượng vé hội thảo STEM còn lại sau các đợt đăng ký (Luyện tập Bài 28)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Tổ chức sự kiện Khoa học - Kỹ thuật)\nHội thảo có tổng số vé ban đầu lưu ở biến toàn cục `ve_con_lai`. Hàm `dang_ky_ve(so_luong)` kiểm tra nếu `so_luong <= ve_con_lai` thì giảm số vé và trả về `True`, ngược lại trả về `False`. Nhập số vé ban đầu và 2 đợt đăng ký, in số vé còn lại sau từng đợt.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số vé ban đầu (số nguyên).\n- Dòng 2: Số vé đợt 1 (số nguyên).\n- Dòng 3: Số vé đợt 2 (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Đợt 1: Thành công` (hoặc `Thất bại`)\n- Dòng 2: `Đợt 2: Thành công` (hoặc `Thất bại`)\n- Dòng 3: `Vé còn lại: <ve_con_lai>`",
        "starterCode": "# Bài 28.5: Đăng ký vé hội thảo\nve_con_lai = 0\n",
        "testCases": [
            {"input": "50\n30\n25", "expectedOutput": "Đợt 1: Thành công\nĐợt 2: Thất bại\nVé còn lại: 20", "isHidden": False},
            {"input": "100\n40\n60", "expectedOutput": "Đợt 1: Thành công\nĐợt 2: Thành công\nVé còn lại: 0", "isHidden": False},
            {"input": "10\n15\n5", "expectedOutput": "Đợt 1: Thất bại\nĐợt 2: Thành công\nVé còn lại: 5", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_5 = """
ve_con_lai = int(input())

def dang_ky_ve(sl):
    global ve_con_lai
    if sl <= ve_con_lai:
        ve_con_lai -= sl
        return True
    return False

d1 = int(input())
d2 = int(input())
res1 = "Thành công" if dang_ky_ve(d1) else "Thất bại"
res2 = "Thành công" if dang_ky_ve(d2) else "Thất bại"
print(f"Đợt 1: {res1}")
print(f"Đợt 2: {res2}")
print(f"Vé còn lại: {ve_con_lai}")
"""
    verify_assignment(asgn_28_5, solver_28_5)
    assignments.append(asgn_28_5)

    # 28.6: Tích lũy điểm thưởng thành viên (Intermediate)
    asgn_28_6 = {
        "id": "asgn_28_6",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.6: Tích lũy điểm thưởng thẻ thành viên siêu thị qua các hóa đơn (Luyện tập Bài 28)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Hệ thống Khách hàng thân thiết)\nBiến toàn cục `tong_diem = 0`. Cứ mỗi 100,000 VNĐ chi tiêu tích lũy được 5 điểm thưởng (`so_tien // 100000 * 5`). Viết hàm `tich_luy(hoa_don)` sử dụng `global tong_diem` để cập nhật điểm. Nhập danh sách các hóa đơn mua sắm trong tháng và in điểm thưởng tích lũy.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên là giá trị hóa đơn (VNĐ) cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\nIn ra: `Tổng điểm thưởng: <tong_diem> điểm`.",
        "starterCode": "# Bài 28.6: Tích lũy điểm thưởng\ntong_diem = 0\n\ndef tich_luy(hoa_don):\n    pass\n",
        "testCases": [
            {"input": "250000 120000 480000", "expectedOutput": "Tổng điểm thưởng: 35 điểm", "isHidden": False},
            {"input": "90000 80000", "expectedOutput": "Tổng điểm thưởng: 0 điểm", "isHidden": False},
            {"input": "1000000", "expectedOutput": "Tổng điểm thưởng: 50 điểm", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_6 = """
tong_diem = 0

def tich_luy(hoa_don):
    global tong_diem
    tong_diem += (hoa_don // 100000) * 5

ds = list(map(int, input().split()))
for hd in ds:
    tich_luy(hd)
print(f"Tổng điểm thưởng: {tong_diem} điểm")
"""
    verify_assignment(asgn_28_6, solver_28_6)
    assignments.append(asgn_28_6)

    # 28.7: Ghi nhận nhiệt độ cao nhất toàn cục (Intermediate)
    asgn_28_7 = {
        "id": "asgn_28_7",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.7: Theo dõi và cập nhật mức nhiệt độ kỷ lục ghi nhận toàn cục (Luyện tập Bài 28)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Quan trắc biến đổi khí hậu)\nBiến toàn cục `ky_luc = -999.0`. Định nghĩa hàm `cap_nhat_nhiet_do(t)` dùng `global ky_luc`. Nếu giá trị đo `t > ky_luc` thì cập nhật `ky_luc = t`. Nhập danh sách nhiệt độ quan trắc được trong ngày, gọi hàm và in kỷ lục nhiệt độ cao nhất ghi nhận được.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Nhiệt độ cao nhất ghi nhận: <ky_luc làm tròn 1 chữ số>°C`.",
        "starterCode": "# Bài 28.7: Nhiệt độ kỷ lục\nky_luc = -999.0\n",
        "testCases": [
            {"input": "32.5 35.8 38.2 37.1 34.0", "expectedOutput": "Nhiệt độ cao nhất ghi nhận: 38.2°C", "isHidden": False},
            {"input": "20.0 25.0 22.0", "expectedOutput": "Nhiệt độ cao nhất ghi nhận: 25.0°C", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_7 = """
ky_luc = -999.0

def cap_nhat_nhiet_do(t):
    global ky_luc
    if t > ky_luc:
        ky_luc = t

temps = list(map(float, input().split()))
for t in temps:
    cap_nhat_nhiet_do(t)
print(f"Nhiệt độ cao nhất ghi nhận: {ky_luc:.1f}°C")
"""
    verify_assignment(asgn_28_7, solver_28_7)
    assignments.append(asgn_28_7)

    # 28.8: Bộ đếm cảnh báo bảo mật (Intermediate)
    asgn_28_8 = {
        "id": "asgn_28_8",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.8: Bộ đếm số lần cảnh báo bảo mật vượt quá giới hạn an toàn (Luyện tập Bài 28)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (An ninh mạng trường học)\nBiến toàn cục `so_lan_sai = 0`. Định nghĩa hàm `nhap_sai_mat_khau()` dùng `global so_lan_sai` để tăng thêm 1. Nếu `so_lan_sai >= 3`, hàm trả về chuỗi `\"KHOA_TAI_KHOAN\"`, ngược lại trả về `\"CANH_BAO\"`.\n\n### Dữ liệu vào (Input)\nMột số nguyên `n` là số lần người dùng nhập sai mật khẩu liên tiếp.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lần nhập sai: <so_lan_sai>`\n- Dòng 2: `Trạng thái: <Trạng thái cuối cùng>`",
        "starterCode": "# Bài 28.8: Cảnh báo bảo mật\nso_lan_sai = 0\n",
        "testCases": [
            {"input": "2", "expectedOutput": "Số lần nhập sai: 2\nTrạng thái: CANH_BAO", "isHidden": False},
            {"input": "3", "expectedOutput": "Số lần nhập sai: 3\nTrạng thái: KHOA_TAI_KHOAN", "isHidden": False},
            {"input": "5", "expectedOutput": "Số lần nhập sai: 5\nTrạng thái: KHOA_TAI_KHOAN", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_8 = """
so_lan_sai = 0

def nhap_sai_mat_khau():
    global so_lan_sai
    so_lan_sai += 1
    if so_lan_sai >= 3:
        return "KHOA_TAI_KHOAN"
    return "CANH_BAO"

n = int(input())
status = ""
for _ in range(n):
    status = nhap_sai_mat_khau()
print(f"Số lần nhập sai: {so_lan_sai}")
print(f"Trạng thái: {status}")
"""
    verify_assignment(asgn_28_8, solver_28_8)
    assignments.append(asgn_28_8)

    # 28.9: Quản lý giỏ hàng trực tuyến (Advanced)
    asgn_28_9 = {
        "id": "asgn_28_9",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.9: Quản lý giỏ hàng mua sắm trực tuyến với các biến toàn cục (Luyện tập Bài 28)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Thương mại điện tử E-Commerce)\nHệ thống giỏ hàng sử dụng 2 biến toàn cục: `tong_mon = 0` và `tong_tien = 0`. Định nghĩa hai hàm:\n- `them_hang(so_luong, don_gia)`: tăng `tong_mon` thêm `so_luong` và `tong_tien` thêm `so_luong * don_gia`.\n- `ap_dung_voucher(giam_gia)`: giảm `tong_tien` một lượng `giam_gia` (nếu `tong_tien < 0` thì đặt `tong_tien = 0`).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số món và đơn giá mặt hàng 1 (cách nhau khoảng trắng).\n- Dòng 2: Số món và đơn giá mặt hàng 2 (cách nhau khoảng trắng).\n- Dòng 3: Giá trị voucher giảm giá (số nguyên VNĐ).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số món: <tong_mon>`\n- Dòng 2: `Tổng thanh toán: <tong_tien> VNĐ`",
        "starterCode": "# Bài 28.9: Giỏ hàng toàn cục\ntong_mon = 0\ntong_tien = 0\n",
        "testCases": [
            {"input": "2 50000\n3 20000\n30000", "expectedOutput": "Tổng số món: 5\nTổng thanh toán: 130000 VNĐ", "isHidden": False},
            {"input": "1 100000\n0 0\n150000", "expectedOutput": "Tổng số món: 1\nTổng thanh toán: 0 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_9 = """
tong_mon = 0
tong_tien = 0

def them_hang(so_luong, don_gia):
    global tong_mon, tong_tien
    tong_mon += so_luong
    tong_tien += so_luong * don_gia

def ap_dung_voucher(giam_gia):
    global tong_tien
    tong_tien -= giam_gia
    if tong_tien < 0:
        tong_tien = 0

sl1, dg1 = map(int, input().split())
sl2, dg2 = map(int, input().split())
vc = int(input())

them_hang(sl1, dg1)
them_hang(sl2, dg2)
ap_dung_voucher(vc)

print(f"Tổng số món: {tong_mon}")
print(f"Tổng thanh toán: {tong_tien} VNĐ")
"""
    verify_assignment(asgn_28_9, solver_28_9)
    assignments.append(asgn_28_9)

    # 28.10: Mô phỏng bình ắc quy năng lượng mặt trời (Advanced)
    asgn_28_10 = {
        "id": "asgn_28_10",
        "lessonId": "bai_26_28",
        "glyph": "●",
        "title": "Bài 28.10: Mô phỏng trạm lưu trữ năng lượng mặt trời nạp và xả liên tục (Luyện tập Bài 28)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Năng lượng tái tạo & Lưới điện thông minh)\nMột trạm ắc quy có dung lượng tối đa `dung_luong_max` (kWh) và dung lượng hiện tại lưu trong biến toàn cục `pin_hien_tai` (kWh). Định nghĩa hai hàm:\n- `nap_dien(kwh)`: tăng `pin_hien_tai`, nếu vượt `dung_luong_max` thì gán bằng `dung_luong_max`.\n- `su_dung_dien(kwh)`: giảm `pin_hien_tai`, nếu không đủ điện thì xả hết về 0 và in `Cảnh báo: Hết pin`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng tối đa `dung_luong_max` (số thực).\n- Dòng 2: Dung lượng ban đầu (số thực).\n- Dòng 3: Lượng nạp vào ban ngày (số thực).\n- Dòng 4: Lượng sử dụng ban đêm (số thực).\n\n### Kết quả ra (Output)\n- Dòng thông báo cảnh báo (nếu có).\n- Dòng cuối: `Dung lượng pin còn lại: <pin_hien_tai làm tròn 1 chữ số> kWh`.",
        "starterCode": "# Bài 28.10: Trạm năng lượng mặt trời\ndef nap_dien(kwh):\n    pass\n\ndef su_dung_dien(kwh):\n    pass\n",
        "testCases": [
            {"input": "100.0\n30.0\n50.0\n40.0", "expectedOutput": "Dung lượng pin còn lại: 40.0 kWh", "isHidden": False},
            {"input": "50.0\n20.0\n40.0\n80.0", "expectedOutput": "Cảnh báo: Hết pin\nDung lượng pin còn lại: 0.0 kWh", "isHidden": False},
            {"input": "100.0\n90.0\n30.0\n20.0", "expectedOutput": "Dung lượng pin còn lại: 80.0 kWh", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_28_10 = """
dung_luong_max = float(input())
pin_hien_tai = float(input())

def nap_dien(kwh):
    global pin_hien_tai
    pin_hien_tai = min(dung_luong_max, pin_hien_tai + kwh)

def su_dung_dien(kwh):
    global pin_hien_tai
    if kwh > pin_hien_tai:
        pin_hien_tai = 0.0
        print("Cảnh báo: Hết pin")
    else:
        pin_hien_tai -= kwh

nap = float(input())
dung = float(input())
nap_dien(nap)
su_dung_dien(dung)
print(f"Dung lượng pin còn lại: {pin_hien_tai:.1f} kWh")
"""
    verify_assignment(asgn_28_10, solver_28_10)
    assignments.append(asgn_28_10)

    print(f"\n===> BÀI 26 - 28: SUCCESS! Generated {len(assignments)} assignments.")
    return assignments

if __name__ == "__main__":
    get_assignments_26_to_28()
