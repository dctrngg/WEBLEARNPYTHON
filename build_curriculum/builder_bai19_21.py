import sys
import os
from test_runner import verify_assignment

def get_assignments_19_to_21():
    assignments = []

    # ----------------------------------------------------
    # BÀI 19: CÂU LỆNH RẼ NHÁNH IF (10 BÀI)
    # ----------------------------------------------------
    # 19.1: Cảnh báo AQI (Beginner)
    asgn_19_1 = {
        "id": "asgn_19_1",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.1: Hệ thống cảnh báo chất lượng không khí AQI tại trường học (Luyện tập Bài 19)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Môi trường & Đô thị thông minh - Bài 19 SGK Tin học 10)\nTrạm quan trắc môi trường đặt tại cổng trường đo chỉ số chất lượng không khí `aqi` (số nguyên). Quy tắc phân loại như sau:\n- Nếu `aqi <= 50`: `Tốt`\n- Nếu `51 <= aqi <= 100`: `Trung bình`\n- Nếu `101 <= aqi <= 150`: `Kém`\n- Nếu `aqi > 150`: `Xấu`\nHãy viết chương trình nhập chỉ số `aqi` và in ra mức cảnh báo tương ứng.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên dương `aqi`.\n\n### Kết quả ra (Output)\nIn ra 1 dòng theo định dạng: `Chất lượng không khí: <Mức phân loại>`.",
        "starterCode": "# Bài 19.1: Hệ thống cảnh báo chất lượng không khí AQI tại trường học\naqi = int(input())\n# Viết câu lệnh rẽ nhánh if - elif - else tại đây:\n",
        "testCases": [
            {"input": "45", "expectedOutput": "Chất lượng không khí: Tốt", "isHidden": False},
            {"input": "85", "expectedOutput": "Chất lượng không khí: Trung bình", "isHidden": False},
            {"input": "120", "expectedOutput": "Chất lượng không khí: Kém", "isHidden": True},
            {"input": "165", "expectedOutput": "Chất lượng không khí: Xấu", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_1 = """
aqi = int(input())
if aqi <= 50:
    muc = "Tốt"
elif aqi <= 100:
    muc = "Trung bình"
elif aqi <= 150:
    muc = "Kém"
else:
    muc = "Xấu"
print(f"Chất lượng không khí: {muc}")
"""
    verify_assignment(asgn_19_1, solver_19_1)
    assignments.append(asgn_19_1)

    # 19.2: Kiểm tra độ tuổi lái xe máy điện (Beginner)
    asgn_19_2 = {
        "id": "asgn_19_2",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.2: Kiểm tra điều kiện độ tuổi lái xe máy điện (Luyện tập Bài 19)",
        "difficulty": "Beginner",
        "description": "### Đề bài (An toàn giao thông học đường)\nTheo quy định của Luật Giao thông đường bộ, người từ đủ 16 tuổi trở lên mới được phép điều khiển xe máy điện và xe gắn máy có dung tích dưới 50cc. Hãy viết chương trình nhập vào năm sinh `nam_sinh` của học sinh và năm hiện tại `nam_hien_tai`, tính tuổi của học sinh và kiểm tra xem học sinh có đủ điều kiện điều khiển xe máy điện hay không.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Năm sinh `nam_sinh` (số nguyên).\n- Dòng 2: Năm hiện tại `nam_hien_tai` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: In `Tuổi: <tuổi>`\n- Dòng 2: In `Đủ điều kiện lái xe máy điện` nếu tuổi >= 16, ngược lại in `Chưa đủ điều kiện lái xe máy điện`.",
        "starterCode": "# Bài 19.2: Kiểm tra điều kiện độ tuổi lái xe máy điện\nnam_sinh = int(input())\nnam_hien_tai = int(input())\n",
        "testCases": [
            {"input": "2010\n2026", "expectedOutput": "Tuổi: 16\nĐủ điều kiện lái xe máy điện", "isHidden": False},
            {"input": "2012\n2026", "expectedOutput": "Tuổi: 14\nChưa đủ điều kiện lái xe máy điện", "isHidden": False},
            {"input": "2008\n2026", "expectedOutput": "Tuổi: 18\nĐủ điều kiện lái xe máy điện", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_2 = """
nam_sinh = int(input())
nam_hien_tai = int(input())
tuoi = nam_hien_tai - nam_sinh
print(f"Tuổi: {tuoi}")
if tuoi >= 16:
    print("Đủ điều kiện lái xe máy điện")
else:
    print("Chưa đủ điều kiện lái xe máy điện")
"""
    verify_assignment(asgn_19_2, solver_19_2)
    assignments.append(asgn_19_2)

    # 19.3: Phân loại kiện hàng bưu điện (Beginner)
    asgn_19_3 = {
        "id": "asgn_19_3",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.3: Phân loại kiện hàng bưu điện theo khối lượng (Luyện tập Bài 19)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Logistics bưu cục thông minh)\nMột bưu cục phân loại kiện hàng gửi đi dựa trên cân nặng `m` (đơn vị kg, số thực):\n- Nếu `m <= 2.0`: Phân loại là `Gói bưu phẩm nhẹ`\n- Nếu `2.0 < m <= 10.0`: Phân loại là `Gói bưu phẩm tiêu chuẩn`\n- Nếu `m > 10.0`: Phân loại là `Gói bưu phẩm cồng kềnh`\nHãy viết chương trình nhập khối lượng `m` và in ra phân loại tương ứng.",
        "starterCode": "# Bài 19.3: Phân loại kiện hàng bưu điện\nm = float(input())\n",
        "testCases": [
            {"input": "1.5", "expectedOutput": "Phân loại: Gói bưu phẩm nhẹ", "isHidden": False},
            {"input": "5.8", "expectedOutput": "Phân loại: Gói bưu phẩm tiêu chuẩn", "isHidden": False},
            {"input": "14.2", "expectedOutput": "Phân loại: Gói bưu phẩm cồng kềnh", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_3 = """
m = float(input())
if m <= 2.0:
    loai = "Gói bưu phẩm nhẹ"
elif m <= 10.0:
    loai = "Gói bưu phẩm tiêu chuẩn"
else:
    loai = "Gói bưu phẩm cồng kềnh"
print(f"Phân loại: {loai}")
"""
    verify_assignment(asgn_19_3, solver_19_3)
    assignments.append(asgn_19_3)

    # 19.4: Kiểm tra điều kiện thời tiết cho drone nông nghiệp (Beginner)
    asgn_19_4 = {
        "id": "asgn_19_4",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.4: Kiểm tra điều kiện cất cánh thiết bị bay nông nghiệp (Luyện tập Bài 19)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Nông nghiệp công nghệ cao)\nMột thiết bị bay không người lái (drone) dùng phun phân bón vi sinh cho cánh đồng chỉ được phép cất cánh khi thỏa mãn đồng thời cả 2 điều kiện an toàn:\n1. Tốc độ gió `gio` không vượt quá 20 km/h (`gio <= 20`).\n2. Lượng mưa `mua` bằng 0 mm (`mua == 0`).\nHãy viết chương trình nhập 2 số thực `gio` và `mua`, kiểm tra và in thông báo.",
        "starterCode": "# Bài 19.4: Kiểm tra điều kiện cất cánh drone nông nghiệp\ngio = float(input())\nmua = float(input())\n",
        "testCases": [
            {"input": "15.0\n0.0", "expectedOutput": "Trạng thái: Cho phép cất cánh", "isHidden": False},
            {"input": "25.5\n0.0", "expectedOutput": "Trạng thái: Cấm bay do điều kiện thời tiết", "isHidden": False},
            {"input": "12.0\n3.5", "expectedOutput": "Trạng thái: Cấm bay do điều kiện thời tiết", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_4 = """
gio = float(input())
mua = float(input())
if gio <= 20 and mua == 0:
    print("Trạng thái: Cho phép cất cánh")
else:
    print("Trạng thái: Cấm bay do điều kiện thời tiết")
"""
    verify_assignment(asgn_19_4, solver_19_4)
    assignments.append(asgn_19_4)

    # 19.5: Tính tiền điện sinh hoạt 3 bậc thang (Intermediate)
    asgn_19_5 = {
        "id": "asgn_19_5",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.5: Tính tiền điện sinh hoạt hộ gia đình theo 3 bậc thang (Luyện tập Bài 19)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Kinh tế hộ gia đình - Bài 19 SGK Tin học 10)\nCông ty Điện lực áp dụng biểu giá điện sinh hoạt bậc thang đơn giản hóa cho hộ gia đình với lượng tiêu thụ `kwh` (số nguyên dương) trong tháng như sau:\n- Bậc 1 (cho 50 kWh đầu tiên): `1678` đ/kWh.\n- Bậc 2 (từ kWh thứ 51 đến 100): `1734` đ/kWh.\n- Bậc 3 (cho kWh thứ 101 trở lên): `2014` đ/kWh.\nHãy viết chương trình nhập số `kwh` tiêu thụ và tính tổng số tiền điện phải trả.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số nguyên dương `kwh` là số kWh điện đã dùng.\n\n### Kết quả ra (Output)\nIn ra 1 dòng: `Tiền điện: <số tiền> đồng`.",
        "starterCode": "# Bài 19.5: Tính tiền điện sinh hoạt theo 3 bậc thang\nkwh = int(input())\n",
        "testCases": [
            {"input": "40", "expectedOutput": "Tiền điện: 67120 đồng", "isHidden": False},
            {"input": "80", "expectedOutput": "Tiền điện: 135920 đồng", "isHidden": False},
            {"input": "150", "expectedOutput": "Tiền điện: 271300 đồng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_5 = """
kwh = int(input())
if kwh <= 50:
    tien = kwh * 1678
elif kwh <= 100:
    tien = 50 * 1678 + (kwh - 50) * 1734
else:
    tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014
print(f"Tiền điện: {tien} đồng")
"""
    verify_assignment(asgn_19_5, solver_19_5)
    assignments.append(asgn_19_5)

    # 19.6: Xét duyệt học bổng (Intermediate)
    asgn_19_6 = {
        "id": "asgn_19_6",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.6: Xét duyệt học bổng khuyến khích học tập cuối học kì (Luyện tập Bài 19)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Quản lý trường học)\nHọc sinh đạt học bổng khi thỏa mãn:\n- Điểm trung bình `dtb >= 8.0` và Điểm rèn luyện `drl >= 80`.\nMức học bổng xét theo quy tắc sau:\n- Nếu `dtb >= 9.0` và `drl >= 90`: Học bổng `Xuất sắc` (trị giá 1,000,000đ).\n- Nếu thỏa mãn điều kiện chung nhưng chưa đạt Xuất sắc: Học bổng `Khá giỏi` (trị giá 500,000đ).\n- Ngược lại: `Không đạt` (trị giá 0đ).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Điểm trung bình `dtb` (số thực).\n- Dòng 2: Điểm rèn luyện `drl` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Xếp loại: <Mức>`\n- Dòng 2: `Tiền thưởng: <Số tiền> VNĐ`",
        "starterCode": "# Bài 19.6: Xét duyệt học bổng\ndtb = float(input())\ndrl = int(input())\n",
        "testCases": [
            {"input": "9.2\n95", "expectedOutput": "Xếp loại: Xuất sắc\nTiền thưởng: 1000000 VNĐ", "isHidden": False},
            {"input": "8.5\n82", "expectedOutput": "Xếp loại: Khá giỏi\nTiền thưởng: 500000 VNĐ", "isHidden": False},
            {"input": "8.2\n75", "expectedOutput": "Xếp loại: Không đạt\nTiền thưởng: 0 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_6 = """
dtb = float(input())
drl = int(input())
if dtb >= 9.0 and drl >= 90:
    loai = "Xuất sắc"
    tien = 1000000
elif dtb >= 8.0 and drl >= 80:
    loai = "Khá giỏi"
    tien = 500000
else:
    loai = "Không đạt"
    tien = 0
print(f"Xếp loại: {loai}")
print(f"Tiền thưởng: {tien} VNĐ")
"""
    verify_assignment(asgn_19_6, solver_19_6)
    assignments.append(asgn_19_6)

    # 19.7: Tính cước giao hàng kèm phụ phí cao điểm (Intermediate)
    asgn_19_7 = {
        "id": "asgn_19_7",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.7: Tính cước phí giao hàng nhanh kèm phụ phí giờ cao điểm (Luyện tập Bài 19)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Ứng dụng giao hàng công nghệ)\nCước phí giao hàng được tính theo khoảng cách `km` (số thực) và khung giờ đặt hàng `gio` (số nguyên từ 0 đến 23):\n- Cước gốc: `5000` đồng cho mỗi km.\n- Phụ phí giờ cao điểm: Nếu đặt trong khoảng từ 17h đến 19h (17 <= gio <= 19) thì cộng thêm `10000` đồng phụ phí.\n- Ưu đãi: Nếu quãng đường `km > 10` thì được giảm `10%` tổng cước (lấy phần nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Quãng đường `km` (số thực).\n- Dòng 2: Giờ đặt hàng `gio` (số nguyên).\n\n### Kết quả ra (Output)\nIn ra số tiền cước cuối cùng (số nguyên): `Tổng cước: <tiền> đồng`.",
        "starterCode": "# Bài 19.7: Tính cước phí giao hàng nhanh\nkm = float(input())\ngio = int(input())\n",
        "testCases": [
            {"input": "5.0\n18", "expectedOutput": "Tổng cước: 35000 đồng", "isHidden": False},
            {"input": "12.0\n14", "expectedOutput": "Tổng cước: 54000 đồng", "isHidden": False},
            {"input": "12.0\n17", "expectedOutput": "Tổng cước: 63000 đồng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_7 = """
km = float(input())
gio = int(input())
cuoc_goc = km * 5000
phu_phi = 10000 if 17 <= gio <= 19 else 0
tong = cuoc_goc + phu_phi
if km > 10:
    tong = tong * 0.9
print(f"Tổng cước: {int(tong)} đồng")
"""
    verify_assignment(asgn_19_7, solver_19_7)
    assignments.append(asgn_19_7)

    # 19.8: Giá vé công viên nước cuối tuần (Intermediate)
    asgn_19_8 = {
        "id": "asgn_19_8",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.8: Tính giá vé tham quan công viên nước cuối tuần (Luyện tập Bài 19)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Dịch vụ giải trí cuối tuần)\nCông viên nước bán vé theo độ tuổi `tuoi` và loại ngày `la_cuoi_tuan` (nhập 1 nếu là thứ Bảy/Chủ Nhật, nhập 0 nếu là ngày trong tuần):\n- Trẻ em (tuoi < 12): Giá vé ngày thường là `80000` đồng.\n- Người lớn (tuoi >= 12): Giá vé ngày thường là `150000` đồng.\n- Nếu là ngày cuối tuần (`la_cuoi_tuan == 1`), giá vé tăng thêm 20%.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tuổi `tuoi` (số nguyên).\n- Dòng 2: `la_cuoi_tuan` (số nguyên 0 hoặc 1).\n\n### Kết quả ra (Output)\nIn ra: `Giá vé: <số tiền> đồng` (số nguyên).",
        "starterCode": "# Bài 19.8: Tính giá vé công viên nước\ntuoi = int(input())\nla_cuoi_tuan = int(input())\n",
        "testCases": [
            {"input": "10\n0", "expectedOutput": "Giá vé: 80000 đồng", "isHidden": False},
            {"input": "10\n1", "expectedOutput": "Giá vé: 96000 đồng", "isHidden": False},
            {"input": "25\n1", "expectedOutput": "Giá vé: 180000 đồng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_8 = """
tuoi = int(input())
la_cuoi_tuan = int(input())
gia = 80000 if tuoi < 12 else 150000
if la_cuoi_tuan == 1:
    gia = gia * 1.2
print(f"Giá vé: {int(gia)} đồng")
"""
    verify_assignment(asgn_19_8, solver_19_8)
    assignments.append(asgn_19_8)

    # 19.9: Hệ thống phân loại rủi ro tín dụng (Advanced)
    asgn_19_9 = {
        "id": "asgn_19_9",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.9: Hệ thống đánh giá và phân loại rủi ro tín dụng khách hàng (Luyện tập Bài 19)",
        "difficulty": "Advanced",
        "description": "### Đề bài (FinTech & Ngân hàng số)\nMột ứng dụng ngân hàng tự động đánh giá hồ sơ vay tín chấp dựa trên thu nhập tháng `thu_nhap` (VNĐ) và tỷ lệ nợ trên thu nhập `dti` (tính theo %, ví dụ 35% nhập là 35.0):\n- Nếu `thu_nhap < 8000000`: Phân loại `Từ chối vay`.\n- Nếu `thu_nhap >= 8000000`:\n  + Nếu `dti <= 30.0`: Phân loại `Rủi ro thấp - Duyệt ngay`\n  + Nếu `30.0 < dti <= 50.0`: Phân loại `Rủi ro vừa - Cần thẩm định`\n  + Nếu `dti > 50.0`: Phân loại `Rủi ro cao - Từ chối vay`\n\n### Dữ liệu vào (Input)\n- Dòng 1: Thu nhập tháng `thu_nhap` (số nguyên).\n- Dòng 2: Tỷ lệ nợ `dti` (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Kết quả: <Phân loại>`",
        "starterCode": "# Bài 19.9: Phân loại rủi ro tín dụng\nthu_nhap = int(input())\ndti = float(input())\n",
        "testCases": [
            {"input": "15000000\n25.0", "expectedOutput": "Kết quả: Rủi ro thấp - Duyệt ngay", "isHidden": False},
            {"input": "12000000\n40.5", "expectedOutput": "Kết quả: Rủi ro vừa - Cần thẩm định", "isHidden": False},
            {"input": "6000000\n20.0", "expectedOutput": "Kết quả: Từ chối vay", "isHidden": True},
            {"input": "20000000\n55.0", "expectedOutput": "Kết quả: Rủi ro cao - Từ chối vay", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_9 = """
thu_nhap = int(input())
dti = float(input())
if thu_nhap < 8000000:
    res = "Từ chối vay"
else:
    if dti <= 30.0:
        res = "Rủi ro thấp - Duyệt ngay"
    elif dti <= 50.0:
        res = "Rủi ro vừa - Cần thẩm định"
    else:
        res = "Rủi ro cao - Từ chối vay"
print(f"Kết quả: {res}")
"""
    verify_assignment(asgn_19_9, solver_19_9)
    assignments.append(asgn_19_9)

    # 19.10: Tính thuế thu nhập cá nhân lũy tiến từng phần (Advanced)
    asgn_19_10 = {
        "id": "asgn_19_10",
        "lessonId": "bai_19",
        "glyph": "●",
        "title": "Bài 19.10: Tính thuế thu nhập cá nhân lũy tiến từng phần (Luyện tập Bài 19)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Chính sách thuế & Tài chính cá nhân)\nThu nhập tính thuế `tntt` (triệu VNĐ) được tính thuế lũy tiến từng phần theo 3 bậc đơn giản hóa:\n- Bậc 1 (đến 5 triệu): thuế suất `5%`.\n- Bậc 2 (trên 5 triệu đến 10 triệu): 5 triệu đầu tính 5%, phần từ trên 5 đến 10 triệu tính `10%`.\n- Bậc 3 (trên 10 triệu): 5 triệu đầu tính 5%, 5 triệu tiếp theo tính 10%, phần vượt trên 10 triệu tính `15%`.\nNếu `tntt <= 0` thì tiền thuế bằng 0.\n\n### Dữ liệu vào (Input)\nMột dòng chứa số thực `tntt` là thu nhập tính thuế (đơn vị: triệu VNĐ).\n\n### Kết quả ra (Output)\nIn ra tiền thuế phải nộp (đơn vị: triệu VNĐ, làm tròn 2 chữ số thập phân): `Thuế TNCN: <số tiền> triệu VNĐ`.",
        "starterCode": "# Bài 19.10: Thuế thu nhập cá nhân lũy tiến\ntntt = float(input())\n",
        "testCases": [
            {"input": "4.0", "expectedOutput": "Thuế TNCN: 0.20 triệu VNĐ", "isHidden": False},
            {"input": "8.0", "expectedOutput": "Thuế TNCN: 0.55 triệu VNĐ", "isHidden": False},
            {"input": "15.0", "expectedOutput": "Thuế TNCN: 1.50 triệu VNĐ", "isHidden": True},
            {"input": "-2.0", "expectedOutput": "Thuế TNCN: 0.00 triệu VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_19_10 = """
tntt = float(input())
if tntt <= 0:
    thue = 0.0
elif tntt <= 5.0:
    thue = tntt * 0.05
elif tntt <= 10.0:
    thue = 5.0 * 0.05 + (tntt - 5.0) * 0.10
else:
    thue = 5.0 * 0.05 + 5.0 * 0.10 + (tntt - 10.0) * 0.15
print(f"Thuế TNCN: {thue:.2f} triệu VNĐ")
"""
    verify_assignment(asgn_19_10, solver_19_10)
    assignments.append(asgn_19_10)


    # ----------------------------------------------------
    # BÀI 20: CÂU LỆNH LẶP FOR (10 BÀI)
    # ----------------------------------------------------
    # 20.1: Tính tổng tiền quyên góp sách (Beginner)
    asgn_20_1 = {
        "id": "asgn_20_1",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.1: Tính tổng tiền quyên góp sách qua N ngày hội trại (Luyện tập Bài 20)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Hoạt động Đoàn & Công tác xã hội)\nTrong đợt hội trại thiện nguyện gây quỹ tủ sách cho học sinh vùng cao, ban tổ chức ghi nhận số tiền quyên góp được trong `n` ngày. Hãy viết chương trình nhập số ngày `n` và số tiền quyên góp của từng ngày, sau đó dùng vòng lặp `for` để tính tổng số tiền quyên góp được.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên dương `n` là số ngày tổ chức.\n- `n` dòng tiếp theo: Mỗi dòng là một số nguyên `tien` (VNĐ) của ngày đó.\n\n### Kết quả ra (Output)\nIn ra 1 dòng: `Tổng tiền quyên góp: <tổng> VNĐ`.",
        "starterCode": "# Bài 20.1: Tính tổng tiền quyên góp sách\nn = int(input())\n",
        "testCases": [
            {"input": "3\n150000\n200000\n180000", "expectedOutput": "Tổng tiền quyên góp: 530000 VNĐ", "isHidden": False},
            {"input": "4\n50000\n75000\n100000\n25000", "expectedOutput": "Tổng tiền quyên góp: 250000 VNĐ", "isHidden": False},
            {"input": "1\n500000", "expectedOutput": "Tổng tiền quyên góp: 500000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_1 = """
n = int(input())
tong = 0
for _ in range(n):
    tong += int(input())
print(f"Tổng tiền quyên góp: {tong} VNĐ")
"""
    verify_assignment(asgn_20_1, solver_20_1)
    assignments.append(asgn_20_1)

    # 20.2: Đếm số ngày nắng nóng (Beginner)
    asgn_20_2 = {
        "id": "asgn_20_2",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.2: Đếm số ngày nắng nóng vượt ngưỡng trong đợt quan trắc (Luyện tập Bài 20)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Khí tượng thủy văn)\nTrung tâm Dự báo Khí tượng quan trắc nhiệt độ cao nhất trong `n` ngày hè. Ngày được gọi là \"nắng nóng gay gắt\" nếu nhiệt độ đạt từ `35.0` độ C trở lên. Hãy nhập `n` và nhiệt độ của `n` ngày, dùng vòng lặp `for` để đếm số ngày nắng nóng gay gắt.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên `n` (số ngày).\n- `n` dòng tiếp theo: Mỗi dòng là nhiệt độ của 1 ngày (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Số ngày nắng nóng: <số ngày>`.",
        "starterCode": "# Bài 20.2: Đếm số ngày nắng nóng\nn = int(input())\n",
        "testCases": [
            {"input": "5\n34.5\n36.2\n35.0\n33.8\n37.1", "expectedOutput": "Số ngày nắng nóng: 3", "isHidden": False},
            {"input": "3\n30.0\n32.5\n31.0", "expectedOutput": "Số ngày nắng nóng: 0", "isHidden": False},
            {"input": "4\n35.1\n35.2\n35.0\n36.0", "expectedOutput": "Số ngày nắng nóng: 4", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_2 = """
n = int(input())
dem = 0
for _ in range(n):
    t = float(input())
    if t >= 35.0:
        dem += 1
print(f"Số ngày nắng nóng: {dem}")
"""
    verify_assignment(asgn_20_2, solver_20_2)
    assignments.append(asgn_20_2)

    # 20.3: Mốc giờ kiểm tra máy chủ định kỳ (Beginner)
    asgn_20_3 = {
        "id": "asgn_20_3",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.3: Liệt kê các mốc giờ kiểm tra máy chủ định kỳ trong ngày (Luyện tập Bài 20)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Vận hành trung tâm dữ liệu)\nHệ thống tự động thực hiện sao lưu và kiểm tra an ninh máy chủ bắt đầu từ mốc giờ `start` (0 <= start < 24) và lặp lại định kỳ sau mỗi `step` giờ cho đến hết 24 giờ trong ngày (giờ < 24). Hãy dùng `range(start, 24, step)` để in danh sách các mốc giờ kiểm tra trên cùng 1 dòng, cách nhau bởi dấu cách.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Mốc giờ bắt đầu `start` (số nguyên).\n- Dòng 2: Khoảng cách giờ `step` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra: `Các mốc giờ: <danh sách giờ cách nhau 1 khoảng trắng>`.",
        "starterCode": "# Bài 20.3: Mốc giờ kiểm tra máy chủ định kỳ\nstart = int(input())\nstep = int(input())\n",
        "testCases": [
            {"input": "2\n4", "expectedOutput": "Các mốc giờ: 2 6 10 14 18 22", "isHidden": False},
            {"input": "0\n6", "expectedOutput": "Các mốc giờ: 0 6 12 18", "isHidden": False},
            {"input": "1\n5", "expectedOutput": "Các mốc giờ: 1 6 11 16 21", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_3 = """
start = int(input())
step = int(input())
hours = [str(h) for h in range(start, 24, step)]
print("Các mốc giờ: " + " ".join(hours))
"""
    verify_assignment(asgn_20_3, solver_20_3)
    assignments.append(asgn_20_3)

    # 20.4: In bảng nhân K (Beginner)
    asgn_20_4 = {
        "id": "asgn_20_4",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.4: In bảng cửu chương nhân K phục vụ học tập (Luyện tập Bài 20)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Ứng dụng giáo dục)\nViết chương trình nhập số nguyên dương `k` (1 <= k <= 9) và dùng vòng lặp `for` với hàm `range(1, 11)` để in ra bảng cửu chương nhân `k` từ 1 đến 10 theo đúng mẫu `k x i = k*i`.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `k`.\n\n### Kết quả ra (Output)\nĐúng 10 dòng, mỗi dòng theo mẫu: `<k> x <i> = <tích>` (i chạy từ 1 đến 10).",
        "starterCode": "# Bài 20.4: In bảng cửu chương nhân K\nk = int(input())\n",
        "testCases": [
            {"input": "5", "expectedOutput": "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50", "isHidden": False},
            {"input": "7", "expectedOutput": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_4 = """
k = int(input())
for i in range(1, 11):
    print(f"{k} x {i} = {k * i}")
"""
    verify_assignment(asgn_20_4, solver_20_4)
    assignments.append(asgn_20_4)

    # 20.5: Tổng số cây xanh trồng được (Intermediate)
    asgn_20_5 = {
        "id": "asgn_20_5",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.5: Tính tổng số cây xanh trồng được trong chiến dịch Mùa hè xanh (Luyện tập Bài 20)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Chiến dịch vì môi trường)\nĐoàn thanh niên phát động chiến dịch trồng cây xanh trong `n` ngày. Ngày thứ nhất trồng được `a` cây. Mỗi ngày sau đó, lực lượng tham gia đông hơn nên số cây trồng được tăng thêm `d` cây so với ngày hôm trước (ngày 2 trồng a+d cây, ngày 3 trồng a+2d cây...). Hãy tính tổng số cây xanh trồng được sau toàn bộ `n` ngày.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên `a` (số cây ngày đầu).\n- Dòng 2: Số nguyên `d` (số cây tăng mỗi ngày).\n- Dòng 3: Số nguyên `n` (số ngày chiến dịch).\n\n### Kết quả ra (Output)\nIn ra: `Tổng số cây trồng được: <tổng> cây`.",
        "starterCode": "# Bài 20.5: Tổng số cây xanh trồng được\na = int(input())\nd = int(input())\nn = int(input())\n",
        "testCases": [
            {"input": "10\n2\n5", "expectedOutput": "Tổng số cây trồng được: 70 cây", "isHidden": False},
            {"input": "50\n5\n3", "expectedOutput": "Tổng số cây trồng được: 165 cây", "isHidden": False},
            {"input": "20\n0\n10", "expectedOutput": "Tổng số cây trồng được: 200 cây", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_5 = """
a = int(input())
d = int(input())
n = int(input())
tong = 0
cay_ngay = a
for _ in range(n):
    tong += cay_ngay
    cay_ngay += d
print(f"Tổng số cây trồng được: {tong} cây")
"""
    verify_assignment(asgn_20_5, solver_20_5)
    assignments.append(asgn_20_5)

    # 20.6: In bảng chi phí thuê sân bóng đá (Intermediate)
    asgn_20_6 = {
        "id": "asgn_20_6",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.6: In bảng ước tính chi phí thuê sân bóng đá theo số giờ (Luyện tập Bài 20)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Thể thao trường học)\nBan quản lý sân bóng mini công bố đơn giá thuê: 1 giờ đầu giá 150000đ, từ giờ thứ 2 trở đi mỗi giờ tiếp theo được giảm 20000đ (tức là giờ thứ 2 tính 130000đ, giờ 3 tính 130000đ...). Hãy viết chương trình nhập số giờ `h` mà đội bóng dự định thuê (1 <= h <= 5), in ra bảng tích lũy chi phí từ 1 đến `h` giờ.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `h`.\n\n### Kết quả ra (Output)\nIn ra `h` dòng, dòng thứ `i` có dạng: `Thuê <i> giờ: <tổng tiền> VNĐ`.",
        "starterCode": "# Bài 20.6: Chi phí thuê sân bóng\nh = int(input())\n",
        "testCases": [
            {"input": "3", "expectedOutput": "Thuê 1 giờ: 150000 VNĐ\nThuê 2 giờ: 280000 VNĐ\nThuê 3 giờ: 410000 VNĐ", "isHidden": False},
            {"input": "1", "expectedOutput": "Thuê 1 giờ: 150000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_6 = """
h = int(input())
tong = 0
for i in range(1, h + 1):
    if i == 1:
        tong += 150000
    else:
        tong += 130000
    print(f"Thuê {i} giờ: {tong} VNĐ")
"""
    verify_assignment(asgn_20_6, solver_20_6)
    assignments.append(asgn_20_6)

    # 20.7: Đếm đèn LED đạt chuẩn độ sáng (Intermediate)
    asgn_20_7 = {
        "id": "asgn_20_7",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.7: Kiểm định chất lượng độ sáng bóng đèn LED (Luyện tập Bài 20)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Quản lý chất lượng sản phẩm xưởng sản xuất)\nMột xưởng sản xuất kiểm định `n` bóng đèn LED. Đèn được xem là đạt chuẩn thương mại nếu độ sáng `lumen` (số nguyên) nằm trong dải từ `800` đến `1200` lumen (bao gồm cả 800 và 1200). Hãy dùng vòng lặp `for` để đếm số bóng đạt chuẩn và in tỷ lệ đạt chuẩn theo phần trăm (làm tròn 1 chữ số thập phân).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên dương `n` (số bóng đèn kiểm định).\n- `n` dòng tiếp theo: Mỗi dòng là độ sáng của 1 bóng đèn.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng đạt chuẩn: <số lượng>/<n>`\n- Dòng 2: `Tỷ lệ đạt chuẩn: <tỷ lệ>%`",
        "starterCode": "# Bài 20.7: Kiểm định bóng đèn LED\nn = int(input())\n",
        "testCases": [
            {"input": "5\n850\n1250\n900\n780\n1100", "expectedOutput": "Số lượng đạt chuẩn: 3/5\nTỷ lệ đạt chuẩn: 60.0%", "isHidden": False},
            {"input": "4\n800\n1200\n1000\n950", "expectedOutput": "Số lượng đạt chuẩn: 4/4\nTỷ lệ đạt chuẩn: 100.0%", "isHidden": False},
            {"input": "2\n500\n1500", "expectedOutput": "Số lượng đạt chuẩn: 0/2\nTỷ lệ đạt chuẩn: 0.0%", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_7 = """
n = int(input())
dat = 0
for _ in range(n):
    lum = int(input())
    if 800 <= lum <= 1200:
        dat += 1
pct = (dat / n) * 100.0
print(f"Số lượng đạt chuẩn: {dat}/{n}")
print(f"Tỷ lệ đạt chuẩn: {pct:.1f}%")
"""
    verify_assignment(asgn_20_7, solver_20_7)
    assignments.append(asgn_20_7)

    # 20.8: Mô phỏng lãi kép qua N năm (Intermediate)
    asgn_20_8 = {
        "id": "asgn_20_8",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.8: Bảng theo dõi tăng trưởng tiền gửi tiết kiệm lãi kép hàng năm (Luyện tập Bài 20)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Tài chính cá nhân dài hạn)\nBác Ba gửi ngân hàng số tiền gốc `p` (VNĐ) với lãi suất cố định `r`%/năm. Tiền lãi mỗi năm được tự động nhập gốc để tính lãi cho năm sau (lãi kép). Dùng vòng lặp `for` để tính và in số dư tài khoản sau từng năm qua `n` năm (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số tiền gốc `p` (số nguyên).\n- Dòng 2: Lãi suất `r` (số thực tính theo %, ví dụ 7.0 là 7%).\n- Dòng 3: Số năm `n` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra `n` dòng, mỗi dòng theo định dạng: `Năm <i>: <số dư> VNĐ` (số dư lấy phần nguyên).",
        "starterCode": "# Bài 20.8: Bảng tăng trưởng lãi kép\np = int(input())\nr = float(input())\nn = int(input())\n",
        "testCases": [
            {"input": "10000000\n10.0\n3", "expectedOutput": "Năm 1: 11000000 VNĐ\nNăm 2: 12100000 VNĐ\nNăm 3: 13310000 VNĐ", "isHidden": False},
            {"input": "5000000\n6.0\n2", "expectedOutput": "Năm 1: 5300000 VNĐ\nNăm 2: 5618000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_8 = """
p = float(input())
r = float(input()) / 100.0
n = int(input())
for i in range(1, n + 1):
    p = p * (1 + r)
    print(f"Năm {i}: {int(round(p))} VNĐ")
"""
    verify_assignment(asgn_20_8, solver_20_8)
    assignments.append(asgn_20_8)

    # 20.9: Phân phối thí sinh vào phòng thi (Advanced)
    asgn_20_9 = {
        "id": "asgn_20_9",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.9: Phân phối thí sinh vào các phòng thi tốt nghiệp THPT (Luyện tập Bài 20)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Công tác khảo thí & Quản lý thi)\nCó `tong_ts` thí sinh đăng ký dự thi. Mỗi phòng thi xếp tối đa `suc_chua` thí sinh (ví dụ 24 bạn). Hãy viết chương trình xác định tổng số phòng thi cần chuẩn bị, sau đó dùng vòng lặp `for` để in danh sách số lượng thí sinh của từng phòng thi từ phòng 1 đến phòng cuối cùng.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tổng số thí sinh `tong_ts` (số nguyên dương).\n- Dòng 2: Sức chứa tối đa của một phòng `suc_chua` (số nguyên dương).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số phòng: <số phòng>`\n- Tiếp theo là thông tin từng phòng: `Phòng <i>: <số thí sinh> thí sinh`.",
        "starterCode": "# Bài 20.9: Phân phối phòng thi\ntong_ts = int(input())\nsuc_chua = int(input())\n",
        "testCases": [
            {"input": "55\n24", "expectedOutput": "Tổng số phòng: 3\nPhòng 1: 24 thí sinh\nPhòng 2: 24 thí sinh\nPhòng 3: 7 thí sinh", "isHidden": False},
            {"input": "48\n24", "expectedOutput": "Tổng số phòng: 2\nPhòng 1: 24 thí sinh\nPhòng 2: 24 thí sinh", "isHidden": False},
            {"input": "15\n20", "expectedOutput": "Tổng số phòng: 1\nPhòng 1: 15 thí sinh", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_9 = """
tong_ts = int(input())
suc_chua = int(input())
so_phong = (tong_ts + suc_chua - 1) // suc_chua
print(f"Tổng số phòng: {so_phong}")
con_lai = tong_ts
for i in range(1, so_phong + 1):
    xep = min(con_lai, suc_chua)
    print(f"Phòng {i}: {xep} thí sinh")
    con_lai -= xep
"""
    verify_assignment(asgn_20_9, solver_20_9)
    assignments.append(asgn_20_9)

    # 20.10: Bài toán dân gian Vừa gà vừa chó tổng quát (Advanced)
    asgn_20_10 = {
        "id": "asgn_20_10",
        "lessonId": "bai_20",
        "glyph": "●",
        "title": "Bài 20.10: Giải bài toán dân gian Vừa gà vừa chó tổng quát (Luyện tập Bài 20)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Toán học ứng dụng & Tư duy thuật toán)\nCho biết tổng số con là `n` (gồm cả gà và chó) và tổng số chân là `m`. Biết mỗi con gà có 2 chân, mỗi con chó có 4 chân. Dùng vòng lặp `for ga in range(0, n + 1)` để vét cạn tìm số gà và số chó thỏa mãn. Nếu tìm thấy nghiệm in ra số gà và số chó, nếu không có nghiệm hợp lệ in ra `Không có phương án`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tổng số con `n` (số nguyên dương).\n- Dòng 2: Tổng số chân `m` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra: `Số gà: <gà>, Số chó: <chó>` hoặc `Không có phương án`.",
        "starterCode": "# Bài 20.10: Vừa gà vừa chó tổng quát\nn = int(input())\nm = int(input())\n",
        "testCases": [
            {"input": "36\n100", "expectedOutput": "Số gà: 22, Số chó: 14", "isHidden": False},
            {"input": "10\n25", "expectedOutput": "Không có phương án", "isHidden": False},
            {"input": "20\n60", "expectedOutput": "Số gà: 10, Số chó: 10", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_20_10 = """
n = int(input())
m = int(input())
found = False
for ga in range(0, n + 1):
    cho = n - ga
    if 2 * ga + 4 * cho == m:
        print(f"Số gà: {ga}, Số chó: {cho}")
        found = True
        break
if not found:
    print("Không có phương án")
"""
    verify_assignment(asgn_20_10, solver_20_10)
    assignments.append(asgn_20_10)


    # ----------------------------------------------------
    # BÀI 21: CÂU LỆNH LẶP WHILE (10 BÀI)
    # ----------------------------------------------------
    # 21.1: Tiết kiệm mua laptop (Beginner)
    asgn_21_1 = {
        "id": "asgn_21_1",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.1: Tính số tháng tiết kiệm để đủ tiền mua laptop học tập (Luyện tập Bài 21)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Kế hoạch tài chính sinh viên)\nBạn Nam muốn mua một chiếc laptop phục vụ học lập trình có giá `gia_laptop` (VNĐ). Ban đầu Nam có số tiền `hien_co` (VNĐ). Mỗi tháng Nam tiết kiệm thêm cố định `tiet_kiem` (VNĐ). Dùng vòng lặp `while` để tính sau bao nhiêu tháng Nam sẽ đủ tiền mua laptop.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Giá laptop `gia_laptop` (số nguyên).\n- Dòng 2: Số tiền hiện có `hien_co` (số nguyên).\n- Dòng 3: Tiền tiết kiệm mỗi tháng `tiet_kiem` (số nguyên dương).\n\n### Kết quả ra (Output)\nIn ra: `Số tháng cần tích lũy: <số tháng>`.",
        "starterCode": "# Bài 21.1: Tiết kiệm mua laptop\ngia_laptop = int(input())\nhien_co = int(input())\ntiet_kiem = int(input())\n",
        "testCases": [
            {"input": "15000000\n3000000\n2000000", "expectedOutput": "Số tháng cần tích lũy: 6", "isHidden": False},
            {"input": "10000000\n10000000\n1500000", "expectedOutput": "Số tháng cần tích lũy: 0", "isHidden": False},
            {"input": "20000000\n5000000\n3000000", "expectedOutput": "Số tháng cần tích lũy: 5", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_1 = """
gia_laptop = int(input())
hien_co = int(input())
tiet_kiem = int(input())
thang = 0
tien = hien_co
while tien < gia_laptop:
    tien += tiet_kiem
    thang += 1
print(f"Số tháng cần tích lũy: {thang}")
"""
    verify_assignment(asgn_21_1, solver_21_1)
    assignments.append(asgn_21_1)

    # 21.2: Mô phỏng bộ sạc nhanh xe máy điện (Beginner)
    asgn_21_2 = {
        "id": "asgn_21_2",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.2: Mô phỏng bộ sạc nhanh pin xe máy điện đến mức an toàn (Luyện tập Bài 21)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Giao thông xanh & Trạm sạc thông minh)\nMột trạm sạc pin xe máy điện bắt đầu sạc khi pin còn `muc_pin` % (số nguyên). Ở chế độ sạc nhanh, mỗi phút pin tăng thêm `2`%. Để bảo vệ tuổi thọ của cell pin Lithium-ion, trạm sẽ tự động ngắt chế độ sạc nhanh khi pin đạt từ `80`% trở lên. Dùng vòng lặp `while` để tính số phút sạc nhanh cho đến khi đạt ngưỡng 80%.\n\n### Dữ liệu vào (Input)\nMột số nguyên `muc_pin` là phần trăm pin ban đầu (0 <= muc_pin < 80).\n\n### Kết quả ra (Output)\n- Dòng 1: `Thời gian sạc: <phút> phút`\n- Dòng 2: `Mức pin đạt được: <pin>%`",
        "starterCode": "# Bài 21.2: Bộ sạc nhanh xe máy điện\nmuc_pin = int(input())\n",
        "testCases": [
            {"input": "55", "expectedOutput": "Thời gian sạc: 13 phút\nMức pin đạt được: 81%", "isHidden": False},
            {"input": "78", "expectedOutput": "Thời gian sạc: 1 phút\nMức pin đạt được: 80%", "isHidden": False},
            {"input": "20", "expectedOutput": "Thời gian sạc: 30 phút\nMức pin đạt được: 80%", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_2 = """
muc_pin = int(input())
phut = 0
while muc_pin < 80:
    muc_pin += 2
    phut += 1
print(f"Thời gian sạc: {phut} phút")
print(f"Mức pin đạt được: {muc_pin}%")
"""
    verify_assignment(asgn_21_2, solver_21_2)
    assignments.append(asgn_21_2)

    # 21.3: Rút tiền tại cây ATM (Beginner)
    asgn_21_3 = {
        "id": "asgn_21_3",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.3: Mô phỏng chuỗi rút tiền liên tiếp tại cây ATM (Luyện tập Bài 21)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Dịch vụ ngân hàng tự động)\nTài khoản của bạn có số dư ban đầu `so_du` (VNĐ). Mỗi lần thực hiện thao tác rút tiền, cây ATM nhả ra một số tiền cố định `rut` (VNĐ). Quy định số dư tối thiểu duy trì tài khoản là 50000đ. Vòng lặp `while` tiếp tục cho phép rút tiền chừng nào số dư sau khi rút vẫn >= 50000đ. Hãy đếm số lần rút tối đa và số dư còn lại cuối cùng.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số dư ban đầu `so_du` (số nguyên).\n- Dòng 2: Số tiền mỗi lần rút `rut` (số nguyên dương).\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lần rút tiền: <số lần>`\n- Dòng 2: `Số dư còn lại: <số dư> VNĐ`",
        "starterCode": "# Bài 21.3: Rút tiền tại cây ATM\nso_du = int(input())\nrut = int(input())\n",
        "testCases": [
            {"input": "2000000\n500000", "expectedOutput": "Số lần rút tiền: 3\nSố dư còn lại: 500000 VNĐ", "isHidden": False},
            {"input": "500000\n200000", "expectedOutput": "Số lần rút tiền: 2\nSố dư còn lại: 100000 VNĐ", "isHidden": False},
            {"input": "100000\n200000", "expectedOutput": "Số lần rút tiền: 0\nSố dư còn lại: 100000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_3 = """
so_du = int(input())
rut = int(input())
lan = 0
while so_du - rut >= 50000:
    so_du -= rut
    lan += 1
print(f"Số lần rút tiền: {lan}")
print(f"Số dư còn lại: {so_du} VNĐ")
"""
    verify_assignment(asgn_21_3, solver_21_3)
    assignments.append(asgn_21_3)

    # 21.4: Đếm số lần nén ảnh (Beginner)
    asgn_21_4 = {
        "id": "asgn_21_4",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.4: Đếm số lần nén tệp ảnh cho đến khi thỏa mãn dung lượng tải lên (Luyện tập Bài 21)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Xử lý đa phương tiện trên website)\nMột hệ thống nộp bài trực tuyến chỉ cho phép tệp ảnh có dung lượng không vượt quá `gioi_han` KB (số thực). Một bức ảnh hiện tại có dung lượng `dung_luong` KB. Mỗi lần chạy thuật toán nén ảnh, dung lượng tệp giảm 20% (tức dung lượng mới bằng `dung_luong * 0.8`). Hãy dùng vòng lặp `while` để tính số lần nén ảnh cần thiết.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Dung lượng ban đầu `dung_luong` (số thực).\n- Dòng 2: Giới hạn cho phép `gioi_han` (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Số lần nén: <số lần>`.",
        "starterCode": "# Bài 21.4: Đếm số lần nén ảnh\ndung_luong = float(input())\ngioi_han = float(input())\n",
        "testCases": [
            {"input": "1000.0\n600.0", "expectedOutput": "Số lần nén: 3", "isHidden": False},
            {"input": "500.0\n500.0", "expectedOutput": "Số lần nén: 0", "isHidden": False},
            {"input": "2048.0\n500.0", "expectedOutput": "Số lần nén: 7", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_4 = """
dung_luong = float(input())
gioi_han = float(input())
lan = 0
while dung_luong > gioi_han:
    dung_luong *= 0.8
    lan += 1
print(f"Số lần nén: {lan}")
"""
    verify_assignment(asgn_21_4, solver_21_4)
    assignments.append(asgn_21_4)

    # 21.5: Thuật toán Euclid chia quà từ thiện (Intermediate)
    asgn_21_5 = {
        "id": "asgn_21_5",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.5: Chia tối đa số túi quà cứu trợ đồng đều (Thuật toán Euclid) (Luyện tập Bài 21)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Hoạt động cứu trợ đồng bào lũ lụt)\nĐoàn thiện nguyện có `a` gói bánh và `b` chai nước khoáng. Cần chia toàn bộ số bánh và nước này vào các túi quà sao cho mỗi túi đều có số bánh như nhau và số nước như nhau (không còn thừa). Số lượng túi quà nhiều nhất có thể chia chính là Ước chung lớn nhất (UCLN) của `a` và `b`. Hãy dùng thuật toán Euclid với vòng lặp `while a != b` (hoặc phép chia lấy dư) để tìm UCLN.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số nguyên dương `a`.\n- Dòng 2: Số nguyên dương `b`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số túi quà tối đa: <UCLN>`\n- Dòng 2: `Mỗi túi gồm: <a//UCLN> gói bánh, <b//UCLN> chai nước`",
        "starterCode": "# Bài 21.5: Chia quà thiện nguyện - Thuật toán Euclid\na = int(input())\nb = int(input())\n",
        "testCases": [
            {"input": "48\n36", "expectedOutput": "Số túi quà tối đa: 12\nMỗi túi gồm: 4 gói bánh, 3 chai nước", "isHidden": False},
            {"input": "30\n45", "expectedOutput": "Số túi quà tối đa: 15\nMỗi túi gồm: 2 gói bánh, 3 chai nước", "isHidden": False},
            {"input": "17\n19", "expectedOutput": "Số túi quà tối đa: 1\nMỗi túi gồm: 17 gói bánh, 19 chai nước", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_5 = """
a = int(input())
b = int(input())
orig_a, orig_b = a, b
while b != 0:
    a, b = b, a % b
ucln = a
print(f"Số túi quà tối đa: {ucln}")
print(f"Mỗi túi gồm: {orig_a // ucln} gói bánh, {orig_b // ucln} chai nước")
"""
    verify_assignment(asgn_21_5, solver_21_5)
    assignments.append(asgn_21_5)

    # 21.6: Theo dõi xả lũ hồ chứa (Intermediate)
    asgn_21_6 = {
        "id": "asgn_21_6",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.6: Theo dõi mực nước hồ chứa thủy lợi trong mùa khô (Luyện tập Bài 21)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Thủy lợi & Phòng chống hạn mặn)\nMực nước hồ thủy lợi hiện tại là `h` mét. Vào mùa khô, mỗi ngày nước bốc hơi và phục vụ tưới tiêu làm mực nước giảm `d` mét. Đồng thời có dòng suối nhỏ bổ sung thêm `s` mét nước mỗi ngày (biết `d > s`). Hồ được xem là đạt ngưỡng báo động khô hạn khi mực nước giảm xuống dưới hoặc bằng `h_alert` mét. Dùng `while` để tính số ngày đến khi đạt ngưỡng báo động.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Mực nước ban đầu `h` (số thực).\n- Dòng 2: Mực nước giảm mỗi ngày `d` (số thực).\n- Dòng 3: Mực nước bù mỗi ngày `s` (số thực).\n- Dòng 4: Ngưỡng báo động `h_alert` (số thực).\n\n### Kết quả ra (Output)\nIn ra: `Số ngày đến ngưỡng báo động: <số ngày> ngày`.",
        "starterCode": "# Bài 21.6: Mực nước hồ thủy lợi\nh = float(input())\nd = float(input())\ns = float(input())\nh_alert = float(input())\n",
        "testCases": [
            {"input": "20.0\n0.8\n0.3\n15.0", "expectedOutput": "Số ngày đến ngưỡng báo động: 10 ngày", "isHidden": False},
            {"input": "18.0\n1.0\n0.5\n18.0", "expectedOutput": "Số ngày đến ngưỡng báo động: 0 ngày", "isHidden": False},
            {"input": "25.0\n1.5\n0.5\n10.0", "expectedOutput": "Số ngày đến ngưỡng báo động: 15 ngày", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_6 = """
h = float(input())
d = float(input())
s = float(input())
h_alert = float(input())
ngay = 0
while h > h_alert:
    h = h - (d - s)
    ngay += 1
print(f"Số ngày đến ngưỡng báo động: {ngay} ngày")
"""
    verify_assignment(asgn_21_6, solver_21_6)
    assignments.append(asgn_21_6)

    # 21.7: Tính tổng các chữ số của mã số (Intermediate)
    asgn_21_7 = {
        "id": "asgn_21_7",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.7: Tính tổng các chữ số để tạo mã kiểm tra (Checksum) thẻ học sinh (Luyện tập Bài 21)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Bảo mật thông tin thẻ học sinh điện tử)\nMã số thẻ học sinh là một số nguyên dương `n`. Để tạo mã kiểm tra tính hợp lệ (Checksum), hệ thống cần tính tổng tất cả các chữ số của `n`. Hãy sử dụng vòng lặp `while n > 0` cùng các phép toán chia nguyên `// 10` và chia dư `% 10` để trích xuất từng chữ số và tính tổng.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `n`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số chữ số: <số chữ số>`\n- Dòng 2: `Tổng các chữ số: <tổng>`",
        "starterCode": "# Bài 21.7: Tổng các chữ số bằng vòng lặp while\nn = int(input())\n",
        "testCases": [
            {"input": "2026", "expectedOutput": "Số chữ số: 4\nTổng các chữ số: 10", "isHidden": False},
            {"input": "13579", "expectedOutput": "Số chữ số: 5\nTổng các chữ số: 25", "isHidden": False},
            {"input": "8", "expectedOutput": "Số chữ số: 1\nTổng các chữ số: 8", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_7 = """
n = int(input())
tong = 0
so_cs = 0
while n > 0:
    cs = n % 10
    tong += cs
    so_cs += 1
    n = n // 10
print(f"Số chữ số: {so_cs}")
print(f"Tổng các chữ số: {tong}")
"""
    verify_assignment(asgn_21_7, solver_21_7)
    assignments.append(asgn_21_7)

    # 21.8: Mô phỏng phân rã chất phóng xạ y tế (Intermediate)
    asgn_21_8 = {
        "id": "asgn_21_8",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.8: Mô phỏng phân rã đồng vị phóng xạ y tế theo chu kỳ bán rã (Luyện tập Bài 21)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Vật lý hạt nhân & Y học phóng xạ)\nMột liều đồng vị phóng xạ dùng trong chẩn đoán y tế có khối lượng ban đầu `m0` (mg). Chất này có chu kỳ bán rã là `T` giờ (cứ sau `T` giờ khối lượng chất phóng xạ còn lại một nửa: `m = m / 2`). Liều thuốc được coi là an toàn đào thải khi khối lượng còn lại nhỏ hơn hoặc bằng `0.01 * m0` (dưới 1%). Dùng vòng lặp `while` để tính tổng số giờ cần thiết đến khi an toàn.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Khối lượng ban đầu `m0` (số thực mg).\n- Dòng 2: Chu kỳ bán rã `T` (số nguyên giờ).\n\n### Kết quả ra (Output)\n- Dòng 1: `Số chu kỳ bán rã: <chu kỳ>`\n- Dòng 2: `Thời gian an toàn: <tổng giờ> giờ`",
        "starterCode": "# Bài 21.8: Phân rã phóng xạ y tế\nm0 = float(input())\nT = int(input())\n",
        "testCases": [
            {"input": "100.0\n6", "expectedOutput": "Số chu kỳ bán rã: 7\nThời gian an toàn: 42 giờ", "isHidden": False},
            {"input": "50.0\n12", "expectedOutput": "Số chu kỳ bán rã: 7\nThời gian an toàn: 84 giờ", "isHidden": False},
            {"input": "20.0\n4", "expectedOutput": "Số chu kỳ bán rã: 7\nThời gian an toàn: 28 giờ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_8 = """
m0 = float(input())
T = int(input())
m = m0
threshold = 0.01 * m0
chu_ky = 0
while m > threshold:
    m = m / 2.0
    chu_ky += 1
print(f"Số chu kỳ bán rã: {chu_ky}")
print(f"Thời gian an toàn: {chu_ky * T} giờ")
"""
    verify_assignment(asgn_21_8, solver_21_8)
    assignments.append(asgn_21_8)

    # 21.9: Mô phỏng trò chơi đoán số nhị phân (Advanced)
    asgn_21_9 = {
        "id": "asgn_21_9",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.9: Mô phỏng thuật toán tìm kiếm nhị phân đoán giá trị bí mật (Luyện tập Bài 21)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Trò chơi trí tuệ & Thuật toán tìm kiếm nhị phân)\nCho một số nguyên bí mật `target` nằm trong đoạn `[1, 1000]`. Máy tính đoán theo thuật toán nhị phân: mỗi lượt tính `mid = (low + high) // 2`. Nếu `mid == target` thì dừng; nếu `mid < target` thì nâng cận dưới `low = mid + 1`; nếu `mid > target` thì hạ cận trên `high = mid - 1`. Hãy dùng vòng lặp `while` mô phỏng quá trình này và in ra số bước đoán.\n\n### Dữ liệu vào (Input)\nMột số nguyên `target` (1 <= target <= 1000).\n\n### Kết quả ra (Output)\nIn ra: `Số lần đoán để tìm thấy: <số lần>`.",
        "starterCode": "# Bài 21.9: Thuật toán tìm kiếm nhị phân\ntarget = int(input())\n",
        "testCases": [
            {"input": "500", "expectedOutput": "Số lần đoán để tìm thấy: 1", "isHidden": False},
            {"input": "250", "expectedOutput": "Số lần đoán để tìm thấy: 2", "isHidden": False},
            {"input": "753", "expectedOutput": "Số lần đoán để tìm thấy: 8", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_9 = """
target = int(input())
low = 1
high = 1000
buoc = 0
while low <= high:
    buoc += 1
    mid = (low + high) // 2
    if mid == target:
        break
    elif mid < target:
        low = mid + 1
    else:
        high = mid - 1
print(f"Số lần đoán để tìm thấy: {buoc}")
"""
    verify_assignment(asgn_21_9, solver_21_9)
    assignments.append(asgn_21_9)

    # 21.10: Mô phỏng biến động quần thể vi sinh vật (Advanced)
    asgn_21_10 = {
        "id": "asgn_21_10",
        "lessonId": "bai_21",
        "glyph": "●",
        "title": "Bài 21.10: Mô phỏng tăng trưởng quần thể vi khuẩn trong phòng thí nghiệm (Luyện tập Bài 21)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Sinh học tế bào & Mô phỏng máy tính)\nBan đầu có `n0` cá thể vi khuẩn trong đĩa nuôi cấy. Cứ sau mỗi giờ, số vi khuẩn nhân đôi (`* 2`), tuy nhiên do môi trường dinh dưỡng giới hạn nên mỗi giờ có một lượng cố định `k` cá thể bị đào thải (sau khi nhân đôi, số cá thể mới là `n * 2 - k`, với điều kiện `n0 * 2 > k`). Dùng vòng lặp `while` để tính sau bao nhiêu giờ quần thể vi khuẩn đạt hoặc vượt mức ngưỡng `target` cá thể.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số cá thể ban đầu `n0` (số nguyên).\n- Dòng 2: Số cá thể hao hụt mỗi giờ `k` (số nguyên).\n- Dòng 3: Ngưỡng mục tiêu `target` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Thời gian đạt ngưỡng: <giờ> giờ`\n- Dòng 2: `Số cá thể cuối cùng: <số cá thể>`",
        "starterCode": "# Bài 21.10: Tăng trưởng quần thể vi khuẩn\nn0 = int(input())\nk = int(input())\ntarget = int(input())\n",
        "testCases": [
            {"input": "100\n20\n1000", "expectedOutput": "Thời gian đạt ngưỡng: 4 giờ\nSố cá thể cuối cùng: 1300", "isHidden": False},
            {"input": "50\n10\n150", "expectedOutput": "Thời gian đạt ngưỡng: 2 giờ\nSố cá thể cuối cùng: 170", "isHidden": False},
            {"input": "200\n50\n2000", "expectedOutput": "Thời gian đạt ngưỡng: 4 giờ\nSố cá thể cuối cùng: 2450", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_21_10 = """
n0 = int(input())
k = int(input())
target = int(input())
gio = 0
n = n0
while n < target:
    n = n * 2 - k
    gio += 1
print(f"Thời gian đạt ngưỡng: {gio} giờ")
print(f"Số cá thể cuối cùng: {n}")
"""
    verify_assignment(asgn_21_10, solver_21_10)
    assignments.append(asgn_21_10)

    print(f"\n===> BÀI 19 - 21: SUCCESS! Generated {len(assignments)} assignments.")
    return assignments

if __name__ == "__main__":
    get_assignments_19_to_21()
