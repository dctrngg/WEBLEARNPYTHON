import sys
import os
from test_runner import verify_assignment

def get_assignments_29_to_31():
    assignments = []

    # ----------------------------------------------------
    # BÀI 29: NHẬN BIẾT LỖI CHƯƠNG TRÌNH (10 BÀI)
    # ----------------------------------------------------
    # 29.1: Bắt lỗi chia cho 0 ZeroDivisionError (Beginner)
    asgn_29_1 = {
        "id": "asgn_29_1",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.1: Bắt lỗi chia cho 0 khi tính đơn giá sản phẩm bình quân (Luyện tập Bài 29)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Kế toán bán lẻ & Xử lý ngoại lệ)\nKhi tính đơn giá bình quân: `don_gia = tong_tien / so_luong`. Nếu khách hàng chưa mua sản phẩm nào (`so_luong == 0`), phép toán sẽ phát sinh lỗi `ZeroDivisionError`. Dùng cấu trúc `try - except ZeroDivisionError` để bắt lỗi này và in thông báo an toàn `Không thể chia cho 0: Số lượng sản phẩm phải lớn hơn 0` thay vì để chương trình bị dừng đột ngột.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tổng tiền `tong_tien` (số nguyên VNĐ).\n- Dòng 2: Số lượng `so_luong` (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Đơn giá bình quân: <đơn giá làm tròn số nguyên> VNĐ` hoặc thông báo lỗi nếu `so_luong == 0`.",
        "starterCode": "# Bài 29.1: Bắt lỗi ZeroDivisionError\ntong_tien = int(input())\nso_luong = int(input())\n",
        "testCases": [
            {"input": "150000\n3", "expectedOutput": "Đơn giá bình quân: 50000 VNĐ", "isHidden": False},
            {"input": "200000\n0", "expectedOutput": "Không thể chia cho 0: Số lượng sản phẩm phải lớn hơn 0", "isHidden": False},
            {"input": "0\n5", "expectedOutput": "Đơn giá bình quân: 0 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_1 = """
tong_tien = int(input())
so_luong = int(input())
try:
    dg = round(tong_tien / so_luong)
    print(f"Đơn giá bình quân: {dg} VNĐ")
except ZeroDivisionError:
    print("Không thể chia cho 0: Số lượng sản phẩm phải lớn hơn 0")
"""
    verify_assignment(asgn_29_1, solver_29_1)
    assignments.append(asgn_29_1)

    # 29.2: Bắt lỗi ValueError khi ép kiểu số (Beginner)
    asgn_29_2 = {
        "id": "asgn_29_2",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.2: Xử lý ngoại lệ dữ liệu nhập không phải số nguyên (ValueError) (Luyện tập Bài 29)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Xác thực dữ liệu mua vé xem phim)\nKhi nhập số lượng vé cần mua `so_ve`, nếu người dùng nhập chữ cái hoặc kí tự đặc biệt (ví dụ `hai`, `abc`), lệnh `int(input())` sẽ phát sinh ngoại lệ `ValueError`. Hãy dùng khối `try - except ValueError` để bắt lỗi này và in thông báo `Lỗi: Dữ liệu nhập vào phải là số nguyên!`.\nNếu hợp lệ, tính tiền với giá vé 75000đ/vé.\n\n### Dữ liệu vào (Input)\nMột dòng chứa chuỗi người dùng nhập vào.\n\n### Kết quả ra (Output)\nIn ra: `Tổng tiền vé: <tiền> VNĐ` hoặc thông báo lỗi nếu phát sinh `ValueError`.",
        "starterCode": "# Bài 29.2: Bắt lỗi ValueError\nraw_input_data = input().strip()\n",
        "testCases": [
            {"input": "3", "expectedOutput": "Tổng tiền vé: 225000 VNĐ", "isHidden": False},
            {"input": "hai ve", "expectedOutput": "Lỗi: Dữ liệu nhập vào phải là số nguyên!", "isHidden": False},
            {"input": "abc12", "expectedOutput": "Lỗi: Dữ liệu nhập vào phải là số nguyên!", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_2 = """
raw = input().strip()
try:
    so_ve = int(raw)
    print(f"Tổng tiền vé: {so_ve * 75000} VNĐ")
except ValueError:
    print("Lỗi: Dữ liệu nhập vào phải là số nguyên!")
"""
    verify_assignment(asgn_29_2, solver_29_2)
    assignments.append(asgn_29_2)

    # 29.3: Bắt lỗi vượt chỉ số IndexError (Beginner)
    asgn_29_3 = {
        "id": "asgn_29_3",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.3: Bắt lỗi truy cập vị trí ghế ngồi vượt chỉ số danh sách (IndexError) (Luyện tập Bài 29)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Đặt chỗ rạp hát học sinh)\nDanh sách `ghes` chứa tên người đã đặt ở các hàng ghế (đánh số chỉ số từ 0). Khi nhập chỉ số `idx`, nếu `idx` nằm ngoài phạm vi `[0, len(ghes) - 1]`, Python sẽ ném ngoại lệ `IndexError`. Dùng `try - except IndexError` để bắt lỗi và in `Lỗi: Chỉ số ghế không tồn tại trong danh sách!`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách tên người đặt ghế cách nhau khoảng trắng.\n- Dòng 2: Chỉ số ghế `idx` (số nguyên).\n\n### Kết quả ra (Output)\nIn ra: `Người đặt ghế: <tên>` hoặc thông báo lỗi.",
        "starterCode": "# Bài 29.3: Bắt lỗi IndexError\nghes = input().split()\nidx = int(input())\n",
        "testCases": [
            {"input": "An Binh Cuong Dung\n2", "expectedOutput": "Người đặt ghế: Cuong", "isHidden": False},
            {"input": "An Binh Cuong\n5", "expectedOutput": "Lỗi: Chỉ số ghế không tồn tại trong danh sách!", "isHidden": False},
            {"input": "Hoa Mai\n1", "expectedOutput": "Người đặt ghế: Mai", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_3 = """
ghes = input().split()
idx = int(input())
try:
    if idx < 0:
        raise IndexError
    ten = ghes[idx]
    print(f"Người đặt ghế: {ten}")
except IndexError:
    print("Lỗi: Chỉ số ghế không tồn tại trong danh sách!")
"""
    verify_assignment(asgn_29_3, solver_29_3)
    assignments.append(asgn_29_3)

    # 29.4: Ngăn chặn lỗi TypeError (Beginner)
    asgn_29_4 = {
        "id": "asgn_29_4",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.4: Nhận biết và ngăn chặn lỗi sai kiểu dữ liệu phép toán (TypeError) (Luyện tập Bài 29)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Phần mềm tính cước)\nTrong Python, phép cộng giữa số thực `float` và chuỗi `str` chưa ép kiểu (ví dụ `10000 + \"5000\"`) sẽ gây ra lỗi `TypeError: unsupported operand type(s)`. Hãy viết chương trình nhận vào 2 giá trị dưới dạng xâu, dùng cấu trúc `try - except (TypeError, ValueError)` để kiểm tra nếu cả hai ép kiểu số thực thành công thì in tổng, ngược lại in `Lỗi: Dữ liệu không tương thích kiểu số!`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Giá trị thứ nhất.\n- Dòng 2: Giá trị thứ hai.\n\n### Kết quả ra (Output)\nIn ra: `Tổng giá trị: <tổng làm tròn 2 chữ số>` hoặc thông báo lỗi.",
        "starterCode": "# Bài 29.4: Bắt lỗi kiểu dữ liệu\nv1 = input().strip()\nv2 = input().strip()\n",
        "testCases": [
            {"input": "15000.5\n20000", "expectedOutput": "Tổng giá trị: 35000.50", "isHidden": False},
            {"input": "15000\nnam nghin", "expectedOutput": "Lỗi: Dữ liệu không tương thích kiểu số!", "isHidden": False},
            {"input": "abc\nxyz", "expectedOutput": "Lỗi: Dữ liệu không tương thích kiểu số!", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_4 = """
v1 = input().strip()
v2 = input().strip()
try:
    num1 = float(v1)
    num2 = float(v2)
    print(f"Tổng giá trị: {num1 + num2:.2f}")
except ValueError:
    print("Lỗi: Dữ liệu không tương thích kiểu số!")
"""
    verify_assignment(asgn_29_4, solver_29_4)
    assignments.append(asgn_29_4)

    # 29.5: Kiểm tra mã tồn tại tránh ValueError khi dùng index (Intermediate)
    asgn_29_5 = {
        "id": "asgn_29_5",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.5: Bắt lỗi tra cứu phần tử không tồn tại trong danh sách (ValueError) (Luyện tập Bài 29)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Quản lý điểm thi trường học)\nKhi sử dụng phương thức `ds.index(item)`, nếu `item` không có trong danh sách thì Python sẽ dừng chương trình và báo lỗi `ValueError: 'item' is not in list`. Hãy dùng `try - except ValueError` (hoặc kiểm tra `if item in ds:`) để tra cứu vị trí xếp hạng của học sinh theo mã định danh `sid`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách mã học sinh theo thứ tự xếp hạng (cách nhau khoảng trắng).\n- Dòng 2: Mã học sinh cần tra cứu `sid`.\n\n### Kết quả ra (Output)\nIn ra: `Hạng của học sinh: <chỉ số + 1>` hoặc `Lỗi: Không tìm thấy mã học sinh trong danh sách xếp hạng!`.",
        "starterCode": "# Bài 29.5: Tra cứu mã an toàn\nds = input().split()\nsid = input().strip()\n",
        "testCases": [
            {"input": "HS01 HS05 HS02 HS08\nHS05", "expectedOutput": "Hạng của học sinh: 2", "isHidden": False},
            {"input": "HS01 HS05 HS02\nHS99", "expectedOutput": "Lỗi: Không tìm thấy mã học sinh trong danh sách xếp hạng!", "isHidden": False},
            {"input": "A1 A2 A3\nA1", "expectedOutput": "Hạng của học sinh: 1", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_5 = """
ds = input().split()
sid = input().strip()
try:
    idx = ds.index(sid)
    print(f"Hạng của học sinh: {idx + 1}")
except ValueError:
    print("Lỗi: Không tìm thấy mã học sinh trong danh sách xếp hạng!")
"""
    verify_assignment(asgn_29_5, solver_29_5)
    assignments.append(asgn_29_5)

    # 29.6: Kiểm tra số không âm và xử lý ngoại lệ (Intermediate)
    asgn_29_6 = {
        "id": "asgn_29_6",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.6: Xác thực giá trị đầu vào không âm và xử lý lỗi miền giá trị (Luyện tập Bài 29)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Tính căn bậc hai độ dài cạnh tam giác)\nKhi tính cạnh tam giác vuông bằng công thức Pitago `c = math.sqrt(a**2 + b**2)` hoặc tính căn bậc hai `math.sqrt(x)`, nếu `x < 0` sẽ bị lỗi miền giá trị `ValueError: math domain error`. Hãy viết chương trình nhập số thực `x`, dùng `try - except` kết hợp sinh lỗi `raise ValueError` khi `x < 0` để in ra căn bậc hai của `x` (làm tròn 2 chữ số) hoặc in `Lỗi: Không thể tính căn bậc hai của số âm!`.\n\n### Dữ liệu vào (Input)\nMột số thực `x`.\n\n### Kết quả ra (Output)\nIn ra: `Căn bậc hai: <kết quả>` hoặc thông báo lỗi.",
        "starterCode": "# Bài 29.6: Căn bậc hai an toàn\nimport math\nx = float(input())\n",
        "testCases": [
            {"input": "25.0", "expectedOutput": "Căn bậc hai: 5.00", "isHidden": False},
            {"input": "-9.0", "expectedOutput": "Lỗi: Không thể tính căn bậc hai của số âm!", "isHidden": False},
            {"input": "2.0", "expectedOutput": "Căn bậc hai: 1.41", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_6 = """
import math
x = float(input())
try:
    if x < 0:
        raise ValueError
    res = math.sqrt(x)
    print(f"Căn bậc hai: {res:.2f}")
except ValueError:
    print("Lỗi: Không thể tính căn bậc hai của số âm!")
"""
    verify_assignment(asgn_29_6, solver_29_6)
    assignments.append(asgn_29_6)

    # 29.7: Xác thực chuyển khoản ngân hàng (Intermediate)
    asgn_29_7 = {
        "id": "asgn_29_7",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.7: Bắt lỗi giao dịch chuyển khoản ngân hàng vượt số dư hoặc số tiền âm (Luyện tập Bài 29)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Ngân hàng số Mobile Banking)\nViết hàm thực hiện giao dịch chuyển khoản nhận vào `so_du` hiện tại và số tiền muốn chuyển `so_tien`. Kiểm tra các ngoại lệ:\n- Nếu `so_tien <= 0`: in `Lỗi giao dịch: Số tiền chuyển phải lớn hơn 0`.\n- Nếu `so_tien > so_du`: in `Lỗi giao dịch: Số dư không đủ để thực hiện`.\n- Nếu hợp lệ: trừ số dư và in số dư mới.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số dư hiện tại (số nguyên VNĐ).\n- Dòng 2: Số tiền chuyển (số nguyên VNĐ).\n\n### Kết quả ra (Output)\nIn thông báo lỗi hoặc: `Chuyển khoản thành công. Số dư mới: <số dư> VNĐ`.",
        "starterCode": "# Bài 29.7: Xác thực chuyển khoản\nso_du = int(input())\nso_tien = int(input())\n",
        "testCases": [
            {"input": "5000000\n2000000", "expectedOutput": "Chuyển khoản thành công. Số dư mới: 3000000 VNĐ", "isHidden": False},
            {"input": "1000000\n1500000", "expectedOutput": "Lỗi giao dịch: Số dư không đủ để thực hiện", "isHidden": False},
            {"input": "500000\n-50000", "expectedOutput": "Lỗi giao dịch: Số tiền chuyển phải lớn hơn 0", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_7 = """
so_du = int(input())
so_tien = int(input())
if so_tien <= 0:
    print("Lỗi giao dịch: Số tiền chuyển phải lớn hơn 0")
elif so_tien > so_du:
    print("Lỗi giao dịch: Số dư không đủ để thực hiện")
else:
    print(f"Chuyển khoản thành công. Số dư mới: {so_du - so_tien} VNĐ")
"""
    verify_assignment(asgn_29_7, solver_29_7)
    assignments.append(asgn_29_7)

    # 29.8: Phân loại nguyên nhân mã lỗi hệ thống (Intermediate)
    asgn_29_8 = {
        "id": "asgn_29_8",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.8: Tự động phân loại nguyên nhân lỗi từ tên mã ngoại lệ Python (Luyện tập Bài 29)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Công cụ chẩn đoán mã nguồn IDE)\nMột công cụ phân tích lỗi cần phân loại mã ngoại lệ Python thành nhóm tương ứng:\n- `ZeroDivisionError`: in `Nhóm: Lỗi toán học chia cho 0`\n- `IndexError`: in `Nhóm: Lỗi vượt quá chỉ số dãy dữ liệu`\n- `ValueError`: in `Nhóm: Lỗi giá trị dữ liệu không hợp lệ`\n- `TypeError`: in `Nhóm: Lỗi sai kiểu dữ liệu toán tử`\n- Khác: in `Nhóm: Lỗi ngoại lệ khác`\n\n### Dữ liệu vào (Input)\nMột dòng chứa tên lớp ngoại lệ (chuỗi).\n\n### Kết quả ra (Output)\nIn ra dòng phân loại nhóm lỗi.",
        "starterCode": "# Bài 29.8: Phân loại ngoại lệ\nerr = input().strip()\n",
        "testCases": [
            {"input": "ZeroDivisionError", "expectedOutput": "Nhóm: Lỗi toán học chia cho 0", "isHidden": False},
            {"input": "IndexError", "expectedOutput": "Nhóm: Lỗi vượt quá chỉ số dãy dữ liệu", "isHidden": False},
            {"input": "KeyError", "expectedOutput": "Nhóm: Lỗi ngoại lệ khác", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_8 = """
err = input().strip()
if err == "ZeroDivisionError":
    print("Nhóm: Lỗi toán học chia cho 0")
elif err == "IndexError":
    print("Nhóm: Lỗi vượt quá chỉ số dãy dữ liệu")
elif err == "ValueError":
    print("Nhóm: Lỗi giá trị dữ liệu không hợp lệ")
elif err == "TypeError":
    print("Nhóm: Lỗi sai kiểu dữ liệu toán tử")
else:
    print("Nhóm: Lỗi ngoại lệ khác")
"""
    verify_assignment(asgn_29_8, solver_29_8)
    assignments.append(asgn_29_8)

    # 29.9: Bộ lọc chuỗi cảm biến IoT an toàn ngoại lệ (Advanced)
    asgn_29_9 = {
        "id": "asgn_29_9",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.9: Bộ lọc làm sạch dữ liệu cảm biến IoT loại bỏ giá trị lỗi (Luyện tập Bài 29)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Internet vạn vật IoT)\nCảm biến truyền về danh sách các giá trị đo nhiệt độ, nhưng một số dòng bị nhiễu chứa chuỗi ký tự lạ (như `null`, `ERR`, `FAIL`). Hãy duyệt qua danh sách, dùng `try - except ValueError` để lọc ra các giá trị có thể chuyển đổi thành số thực hợp lệ, sau đó tính nhiệt độ trung bình của các giá trị hợp lệ (làm tròn 1 chữ số thập phân).\n\n### Dữ liệu vào (Input)\nMột dòng gồm các chuỗi dữ liệu đo cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số mẫu đo hợp lệ: <số lượng>/<tổng số>`\n- Dòng 2: `Nhiệt độ trung bình hợp lệ: <trung bình>°C`",
        "starterCode": "# Bài 29.9: Làm sạch dữ liệu cảm biến\nraw_data = input().split()\n",
        "testCases": [
            {"input": "28.5 ERR 29.0 null 30.5 FAIL 31.0", "expectedOutput": "Số mẫu đo hợp lệ: 4/7\nNhiệt độ trung bình hợp lệ: 29.8°C", "isHidden": False},
            {"input": "25.0 26.0 27.0", "expectedOutput": "Số mẫu đo hợp lệ: 3/3\nNhiệt độ trung bình hợp lệ: 26.0°C", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_9 = """
raw_data = input().split()
valid = []
for item in raw_data:
    try:
        val = float(item)
        valid.append(val)
    except ValueError:
        pass
print(f"Số mẫu đo hợp lệ: {len(valid)}/{len(raw_data)}")
tb = sum(valid) / len(valid)
print(f"Nhiệt độ trung bình hợp lệ: {tb:.1f}°C")
"""
    verify_assignment(asgn_29_9, solver_29_9)
    assignments.append(asgn_29_9)

    # 29.10: Bộ nhập điểm thi an toàn đa tầng (Advanced)
    asgn_29_10 = {
        "id": "asgn_29_10",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 29.10: Xây dựng bộ xác thực nhập điểm thi an toàn đa tầng (Luyện tập Bài 29)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Cổng nhập điểm thi học sinh)\nViết hàm xác thực chuỗi nhập điểm thi `diem_str`:\n- Tầng 1: Thử ép kiểu sang số thực `float(diem_str)`. Nếu thất bại, ném lỗi: `Lỗi: Điểm phải là số thực hợp lệ`.\n- Tầng 2: Kiểm tra miền giá trị `0.0 <= diem <= 10.0`. Nếu vi phạm, ném lỗi: `Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]`.\n- Nếu hợp lệ: in `Điểm hợp lệ: <diem làm tròn 1 chữ số>`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa chuỗi nhập liệu.\n\n### Kết quả ra (Output)\nIn ra thông báo hợp lệ hoặc thông báo lỗi tương ứng.",
        "starterCode": "# Bài 29.10: Xác thực điểm an toàn\ns = input().strip()\n",
        "testCases": [
            {"input": "8.5", "expectedOutput": "Điểm hợp lệ: 8.5", "isHidden": False},
            {"input": "tam diem", "expectedOutput": "Lỗi: Điểm phải là số thực hợp lệ", "isHidden": False},
            {"input": "12.5", "expectedOutput": "Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]", "isHidden": False},
            {"input": "-1.0", "expectedOutput": "Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_29_10 = """
s = input().strip()
try:
    diem = float(s)
    if not (0.0 <= diem <= 10.0):
        print("Lỗi: Điểm thi phải nằm trong thang điểm [0, 10]")
    else:
        print(f"Điểm hợp lệ: {diem:.1f}")
except ValueError:
    print("Lỗi: Điểm phải là số thực hợp lệ")
"""
    verify_assignment(asgn_29_10, solver_29_10)
    assignments.append(asgn_29_10)


    # ----------------------------------------------------
    # BÀI 30: KIỂM THỬ VÀ GỠ LỖI CHƯƠNG TRÌNH (10 BÀI)
    # ----------------------------------------------------
    # 30.1: Gỡ lỗi vận tốc trung bình (Beginner)
    asgn_30_1 = {
        "id": "asgn_30_1",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.1: Gỡ lỗi chia cho 0 (ZeroDivisionError) khi tính vận tốc trung bình (Luyện tập Bài 30)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Kiểm thử hộp đen - Bài 30 SGK Tin học 10)\nChương trình ban đầu tính vận tốc `v = s / t` gặp sự cố khi xe chưa chạy (`t == 0`). Hãy viết lại chương trình kiểm tra: nếu `t <= 0` hoặc `s < 0`, in ra `Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!`. Ngược lại tính và in `Vận tốc trung bình: <v làm tròn 2 chữ số> km/h`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Quãng đường `s` (km, số thực).\n- Dòng 2: Thời gian `t` (giờ, số thực).\n\n### Kết quả ra (Output)\nIn ra vận tốc hoặc thông báo lỗi.",
        "starterCode": "# Bài 30.1: Sửa lỗi tính vận tốc\ns = float(input())\nt = float(input())\n",
        "testCases": [
            {"input": "120.0\n2.5", "expectedOutput": "Vận tốc trung bình: 48.00 km/h", "isHidden": False},
            {"input": "50.0\n0.0", "expectedOutput": "Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!", "isHidden": False},
            {"input": "-10.0\n1.0", "expectedOutput": "Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_1 = """
s = float(input())
t = float(input())
if t <= 0 or s < 0:
    print("Lỗi dữ liệu: Thời gian và quãng đường không hợp lệ!")
else:
    v = s / t
    print(f"Vận tốc trung bình: {v:.2f} km/h")
"""
    verify_assignment(asgn_30_1, solver_30_1)
    assignments.append(asgn_30_1)

    # 30.2: Gỡ lỗi ngữ nghĩa tính trung bình cộng (Beginner)
    asgn_30_2 = {
        "id": "asgn_30_2",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.2: Gỡ lỗi ngữ nghĩa (Semantic Error) trong công thức tính trung bình cộng (Luyện tập Bài 30)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Lỗi thứ tự ưu tiên toán tử)\nHọc sinh viết: `tb = a + b + c / 3` (bị lỗi chia trước cộng sau). Hãy sửa lại công thức đúng `tb = (a + b + c) / 3` và in kết quả làm tròn 2 chữ số thập phân.\n\n### Dữ liệu vào (Input)\nMột dòng gồm 3 số thực `a`, `b`, `c` cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Điểm trung bình đúng: <tb làm tròn 2 chữ số>`.",
        "starterCode": "# Bài 30.2: Sửa công thức trung bình\na, b, c = map(float, input().split())\n",
        "testCases": [
            {"input": "7.0 8.0 9.0", "expectedOutput": "Điểm trung bình đúng: 8.00", "isHidden": False},
            {"input": "6.5 7.5 8.0", "expectedOutput": "Điểm trung bình đúng: 7.33", "isHidden": False},
            {"input": "10.0 10.0 10.0", "expectedOutput": "Điểm trung bình đúng: 10.00", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_2 = """
a, b, c = map(float, input().split())
tb = (a + b + c) / 3
print(f"Điểm trung bình đúng: {tb:.2f}")
"""
    verify_assignment(asgn_30_2, solver_30_2)
    assignments.append(asgn_30_2)

    # 30.3: Gỡ lỗi tìm max khi danh sách toàn số âm (Beginner)
    asgn_30_3 = {
        "id": "asgn_30_3",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.3: Gỡ lỗi tìm giá trị lớn nhất khi danh sách chứa toàn số âm (Luyện tập Bài 30)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Lỗi khởi tạo biến biên)\nĐoạn mã: `max_val = 0; for x in ds: if x > max_val: max_val = x` sẽ cho kết quả sai `0` khi danh sách chứa toàn số âm. Hãy sửa lại bằng cách khởi tạo `max_val = ds[0]` và tìm giá trị lớn nhất chính xác.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Giá trị lớn nhất: <max_val>`.",
        "starterCode": "# Bài 30.3: Sửa lỗi tìm max toàn số âm\nds = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "-15 -8 -22 -3 -10", "expectedOutput": "Giá trị lớn nhất: -3", "isHidden": False},
            {"input": "-5 -2 -1", "expectedOutput": "Giá trị lớn nhất: -1", "isHidden": False},
            {"input": "-100", "expectedOutput": "Giá trị lớn nhất: -100", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_3 = """
ds = list(map(int, input().split()))
max_val = ds[0]
for x in ds:
    if x > max_val:
        max_val = x
print(f"Giá trị lớn nhất: {max_val}")
"""
    verify_assignment(asgn_30_3, solver_30_3)
    assignments.append(asgn_30_3)

    # 30.4: Gỡ lỗi vượt chỉ số trong vòng lặp (Beginner)
    asgn_30_4 = {
        "id": "asgn_30_4",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.4: Gỡ lỗi vượt quá chỉ số danh sách (IndexError) khi duyệt mảng (Luyện tập Bài 30)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Lỗi Off-by-one trong lập trình)\nĐoạn mã `for i in range(1, len(a) + 1): print(a[i])` bị lỗi `IndexError` vì chỉ số mảng chạy từ `0` đến `len(a) - 1`. Hãy viết lại chương trình duyệt mảng đúng cách từ chỉ số 0 đến `len(a)-1` và in các phần tử trên 1 dòng.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các từ cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Duyệt chuẩn: <các phần tử cách nhau khoảng trắng>`.",
        "starterCode": "# Bài 30.4: Sửa lỗi Off-by-one\na = input().split()\n",
        "testCases": [
            {"input": "Cam Quyt Mit Dua", "expectedOutput": "Duyệt chuẩn: Cam Quyt Mit Dua", "isHidden": False},
            {"input": "Python Java C++", "expectedOutput": "Duyệt chuẩn: Python Java C++", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_4 = """
a = input().split()
res = []
for i in range(len(a)):
    res.append(a[i])
print("Duyệt chuẩn: " + " ".join(res))
"""
    verify_assignment(asgn_30_4, solver_30_4)
    assignments.append(asgn_30_4)

    # 30.5: Sửa lỗi thiếu dấu bằng tại điểm biên (Intermediate)
    asgn_30_5 = {
        "id": "asgn_30_5",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.5: Kiểm thử biên và sửa lỗi thiếu dấu bằng trong phân loại chiết khấu (Luyện tập Bài 30)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Kiểm thử giá trị biên Boundary Value Testing)\nChính sách chiết khấu: Hóa đơn từ 500,000 VNĐ trở lên (`hoa_don >= 500000`) được giảm 10%. Lập trình viên viết nhầm thành `hoa_don > 500000` khiến các khách hàng mua đúng 500,000đ bị mất quyền lợi giảm giá. Hãy sửa lại đúng và in số tiền thanh toán thực tế.\n\n### Dữ liệu vào (Input)\nMột số nguyên `hoa_don` (VNĐ).\n\n### Kết quả ra (Output)\nIn ra: `Thanh toán: <tiền làm tròn số nguyên> VNĐ`.",
        "starterCode": "# Bài 30.5: Kiểm thử biên chiết khấu\nhoa_don = int(input())\n",
        "testCases": [
            {"input": "500000", "expectedOutput": "Thanh toán: 450000 VNĐ", "isHidden": False},
            {"input": "499000", "expectedOutput": "Thanh toán: 499000 VNĐ", "isHidden": False},
            {"input": "600000", "expectedOutput": "Thanh toán: 540000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_5 = """
hoa_don = int(input())
if hoa_don >= 500000:
    thanh_toan = hoa_don * 0.9
else:
    thanh_toan = hoa_don
print(f"Thanh toán: {int(thanh_toan)} VNĐ")
"""
    verify_assignment(asgn_30_5, solver_30_5)
    assignments.append(asgn_30_5)

    # 30.6: Gỡ lỗi năm nhuận (Intermediate)
    asgn_30_6 = {
        "id": "asgn_30_6",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.6: Gỡ lỗi logic kiểm tra năm nhuận khi thiếu điều kiện thế kỷ (Luyện tập Bài 30)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Sửa lỗi logic thuật toán lịch pháp)\nNhiều bạn học sinh viết đơn giản `if nam % 4 == 0:` dẫn đến các năm đầu thế kỷ như `1900`, `2100` bị nhận diện sai là năm nhuận (theo quy tắc quốc tế, năm tròn thế kỷ phải chia hết cho 400 mới là năm nhuận). Hãy viết điều kiện logic đầy đủ và chính xác.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `nam`.\n\n### Kết quả ra (Output)\nIn ra: `Năm <nam>: Nhuận` hoặc `Năm <nam>: Không nhuận`.",
        "starterCode": "# Bài 30.6: Sửa lỗi năm nhuận\nnam = int(input())\n",
        "testCases": [
            {"input": "1900", "expectedOutput": "Năm 1900: Không nhuận", "isHidden": False},
            {"input": "2000", "expectedOutput": "Năm 2000: Nhuận", "isHidden": False},
            {"input": "2024", "expectedOutput": "Năm 2024: Nhuận", "isHidden": False},
            {"input": "2023", "expectedOutput": "Năm 2023: Không nhuận", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_6 = """
nam = int(input())
is_leap = (nam % 400 == 0) or (nam % 4 == 0 and nam % 100 != 0)
if is_leap:
    print(f"Năm {nam}: Nhuận")
else:
    print(f"Năm {nam}: Không nhuận")
"""
    verify_assignment(asgn_30_6, solver_30_6)
    assignments.append(asgn_30_6)

    # 30.7: Gỡ lỗi vòng lặp vô hạn (Intermediate)
    asgn_30_7 = {
        "id": "asgn_30_7",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.7: Gỡ lỗi vòng lặp vô hạn while do quên tăng biến đếm (Luyện tập Bài 30)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Lỗi treo chương trình Infinite Loop)\nTính tổng các số tự nhiên từ 1 đến `n`. Đoạn mã: `i = 1; s = 0; while i <= n: s += i` bị treo vĩnh viễn vì thiếu lệnh `i += 1` bên trong thân vòng lặp. Hãy sửa lỗi này để chương trình chạy hoàn thành và in tổng `s`.\n\n### Dữ liệu vào (Input)\nMột số nguyên dương `n`.\n\n### Kết quả ra (Output)\nIn ra: `Tổng từ 1 đến <n>: <s>`.",
        "starterCode": "# Bài 30.7: Sửa lỗi vòng lặp while\nn = int(input())\n",
        "testCases": [
            {"input": "10", "expectedOutput": "Tổng từ 1 đến 10: 55", "isHidden": False},
            {"input": "100", "expectedOutput": "Tổng từ 1 đến 100: 5050", "isHidden": False},
            {"input": "1", "expectedOutput": "Tổng từ 1 đến 1: 1", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_7 = """
n = int(input())
s = 0
i = 1
while i <= n:
    s += i
    i += 1
print(f"Tổng từ 1 đến {n}: {s}")
"""
    verify_assignment(asgn_30_7, solver_30_7)
    assignments.append(asgn_30_7)

    # 30.8: Gỡ lỗi khoảng trắng thừa khi kiểm tra email (Intermediate)
    asgn_30_8 = {
        "id": "asgn_30_8",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.8: Gỡ lỗi xâu rỗng và khoảng trắng thừa trong bộ lọc tên miền email (Luyện tập Bài 30)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Làm sạch dữ liệu xâu)\nNgười dùng nhập địa chỉ email có chứa khoảng trắng thừa ở đầu hoặc cuối (ví dụ `  student@edu.vn   `). Lệnh `email.endswith(\"@edu.vn\")` trả về `False` do khoảng trắng thừa. Hãy dùng phương thức `.strip()` để làm sạch trước khi kiểm tra đuôi miền `@edu.vn`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu email.\n\n### Kết quả ra (Output)\nIn ra: `Email hợp lệ ngành giáo dục` hoặc `Email không hợp lệ`.",
        "starterCode": "# Bài 30.8: Gỡ lỗi khoảng trắng email\nemail = input()\n",
        "testCases": [
            {"input": "  an@edu.vn  ", "expectedOutput": "Email hợp lệ ngành giáo dục", "isHidden": False},
            {"input": "an@gmail.com", "expectedOutput": "Email không hợp lệ", "isHidden": False},
            {"input": "teacher@edu.vn", "expectedOutput": "Email hợp lệ ngành giáo dục", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_8 = """
email = input().strip()
if email.endswith("@edu.vn"):
    print("Email hợp lệ ngành giáo dục")
else:
    print("Email không hợp lệ")
"""
    verify_assignment(asgn_30_8, solver_30_8)
    assignments.append(asgn_30_8)

    # 30.9: Gỡ lỗi tìm kiếm nhị phân (Advanced)
    asgn_30_9 = {
        "id": "asgn_30_9",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.9: Gỡ lỗi logic trong thuật toán tìm kiếm nhị phân (Binary Search) (Luyện tập Bài 30)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Gỡ lỗi thuật toán nâng cao)\nCho danh sách đã sắp xếp tăng dần. Thuật toán tìm kiếm nhị phân gặp lỗi: khi `target > a[mid]`, lập trình viên viết `low = mid` thay vì `low = mid + 1`, làm vòng lặp bị lặp vô hạn. Hãy sửa lại thuật toán tìm kiếm nhị phân chuẩn và in chỉ số tìm thấy (0-based) hoặc -1 nếu không có.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các số nguyên tăng dần cách nhau khoảng trắng.\n- Dòng 2: Số nguyên cần tìm `target`.\n\n### Kết quả ra (Output)\nIn ra: `Vị trí tìm thấy: <chỉ số>` (hoặc `Không tìm thấy` nếu không có).",
        "starterCode": "# Bài 30.9: Gỡ lỗi tìm kiếm nhị phân\na = list(map(int, input().split()))\ntarget = int(input())\n",
        "testCases": [
            {"input": "2 5 8 12 16 23 38 56\n16", "expectedOutput": "Vị trí tìm thấy: 4", "isHidden": False},
            {"input": "1 3 5 7 9\n4", "expectedOutput": "Không tìm thấy", "isHidden": False},
            {"input": "10 20 30\n10", "expectedOutput": "Vị trí tìm thấy: 0", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_9 = """
a = list(map(int, input().split()))
target = int(input())
low = 0
high = len(a) - 1
found = -1
while low <= high:
    mid = (low + high) // 2
    if a[mid] == target:
        found = mid
        break
    elif a[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
if found != -1:
    print(f"Vị trí tìm thấy: {found}")
else:
    print("Không tìm thấy")
"""
    verify_assignment(asgn_30_9, solver_30_9)
    assignments.append(asgn_30_9)

    # 30.10: Thiết kế kiểm thử bao phủ toàn diện điểm biên (Advanced)
    asgn_30_10 = {
        "id": "asgn_30_10",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 30.10: Kiểm thử toàn diện biểu giá điện bậc thang bao phủ các mốc biên (Luyện tập Bài 30)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Kiểm thử phần mềm tự động)\nBiểu giá điện lũy tiến:\n- Mức 1: Đến 50 kWh: 1678 đ/kWh.\n- Mức 2: Từ 51 đến 100 kWh: 1734 đ/kWh.\n- Mức 3: Trên 100 kWh: 2014 đ/kWh.\nChương trình cần xử lý chính xác và chặt chẽ cả trường hợp `kwh <= 0` (in `Lỗi: Số kWh phải lớn hơn 0`) và đúng chính xác tại các mốc biên 50, 51, 100, 101 kWh.\n\n### Dữ liệu vào (Input)\nMột số nguyên `kwh`.\n\n### Kết quả ra (Output)\nIn ra: `Tiền điện: <số tiền> đồng` hoặc thông báo lỗi.",
        "starterCode": "# Bài 30.10: Kiểm thử toàn diện tiền điện\nkwh = int(input())\n",
        "testCases": [
            {"input": "50", "expectedOutput": "Tiền điện: 83900 đồng", "isHidden": False},
            {"input": "100", "expectedOutput": "Tiền điện: 170600 đồng", "isHidden": False},
            {"input": "0", "expectedOutput": "Lỗi: Số kWh phải lớn hơn 0", "isHidden": False},
            {"input": "101", "expectedOutput": "Tiền điện: 172614 đồng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_30_10 = """
kwh = int(input())
if kwh <= 0:
    print("Lỗi: Số kWh phải lớn hơn 0")
else:
    if kwh <= 50:
        tien = kwh * 1678
    elif kwh <= 100:
        tien = 50 * 1678 + (kwh - 50) * 1734
    else:
        tien = 50 * 1678 + 50 * 1734 + (kwh - 100) * 2014
    print(f"Tiền điện: {tien} đồng")
"""
    verify_assignment(asgn_30_10, solver_30_10)
    assignments.append(asgn_30_10)


    # ----------------------------------------------------
    # BÀI 31: THỰC HÀNH VIẾT CHƯƠNG TRÌNH ĐƠN GIẢN (10 BÀI)
    # ----------------------------------------------------
    # 31.1: Hệ thống tổng hợp bảng điểm và xếp loại (Beginner)
    asgn_31_1 = {
        "id": "asgn_31_1",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.1: Hệ thống tổng hợp bảng điểm và xếp loại học lực cuối năm (Luyện tập Bài 31)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Đánh giá xếp loại học sinh theo Thông tư mới)\nCho danh sách điểm trung bình các môn học của học sinh. Hãy tính điểm trung bình chung `dtb` của tất cả các môn (làm tròn 2 chữ số thập phân) và xếp loại học lực:\n- `dtb >= 8.0`: `Giỏi`\n- `6.5 <= dtb < 8.0`: `Khá`\n- `5.0 <= dtb < 6.5`: `Trung bình`\n- `dtb < 5.0`: `Chưa đạt`\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực là điểm các môn cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Điểm trung bình chung: <dtb>`\n- Dòng 2: `Xếp loại học lực: <loại>`",
        "starterCode": "# Bài 31.1: Tổng hợp điểm và xếp loại\nscores = list(map(float, input().split()))\n",
        "testCases": [
            {"input": "8.5 9.0 8.0 7.5 8.5", "expectedOutput": "Điểm trung bình chung: 8.30\nXếp loại học lực: Giỏi", "isHidden": False},
            {"input": "6.5 7.0 6.0 7.5", "expectedOutput": "Điểm trung bình chung: 6.75\nXếp loại học lực: Khá", "isHidden": False},
            {"input": "4.5 5.0 4.0", "expectedOutput": "Điểm trung bình chung: 4.50\nXếp loại học lực: Chưa đạt", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_1 = """
scores = list(map(float, input().split()))
dtb = sum(scores) / len(scores)
if dtb >= 8.0:
    loai = "Giỏi"
elif dtb >= 6.5:
    loai = "Khá"
elif dtb >= 5.0:
    loai = "Trung bình"
else:
    loai = "Chưa đạt"
print(f"Điểm trung bình chung: {dtb:.2f}")
print(f"Xếp loại học lực: {loai}")
"""
    verify_assignment(asgn_31_1, solver_31_1)
    assignments.append(asgn_31_1)

    # 31.2: Phân tích chi tiêu cá nhân (Beginner)
    asgn_31_2 = {
        "id": "asgn_31_2",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.2: Trình phân tích chi tiêu cá nhân và cảnh báo ngân sách (Luyện tập Bài 31)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Kỹ năng quản lý tài chính sinh viên)\nBạn có một khoản ngân sách chi tiêu trong tuần `ngan_sach` (VNĐ) và danh sách các khoản chi thực tế trong 7 ngày. Hãy tính tổng chi tiêu trong tuần và kiểm tra:\n- Nếu `tong_chi <= ngan_sach`: in `Chi tiêu hợp lý. Tiền còn dư: <ngan_sach - tong_chi> VNĐ`\n- Nếu `tong_chi > ngan_sach`: in `Cảnh báo: Bội chi ngân sách <tong_chi - ngan_sach> VNĐ`\n\n### Dữ liệu vào (Input)\n- Dòng 1: Ngân sách tuần (số nguyên VNĐ).\n- Dòng 2: 7 số nguyên là chi tiêu 7 ngày cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng chi tiêu: <tong_chi> VNĐ`\n- Dòng 2: Thông báo đánh giá.",
        "starterCode": "# Bài 31.2: Phân tích chi tiêu\nngan_sach = int(input())\nchi_tieu = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "500000\n50000 70000 60000 45000 80000 55000 60000", "expectedOutput": "Tổng chi tiêu: 420000 VNĐ\nChi tiêu hợp lý. Tiền còn dư: 80000 VNĐ", "isHidden": False},
            {"input": "300000\n50000 60000 50000 70000 40000 30000 50000", "expectedOutput": "Tổng chi tiêu: 350000 VNĐ\nCảnh báo: Bội chi ngân sách 50000 VNĐ", "isHidden": False},
            {"input": "200000\n30000 30000 20000 20000 30000 30000 40000", "expectedOutput": "Tổng chi tiêu: 200000 VNĐ\nChi tiêu hợp lý. Tiền còn dư: 0 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_2 = """
ngan_sach = int(input())
chi_tieu = list(map(int, input().split()))
tong_chi = sum(chi_tieu)
print(f"Tổng chi tiêu: {tong_chi} VNĐ")
if tong_chi <= ngan_sach:
    print(f"Chi tiêu hợp lý. Tiền còn dư: {ngan_sach - tong_chi} VNĐ")
else:
    print(f"Cảnh báo: Bội chi ngân sách {tong_chi - ngan_sach} VNĐ")
"""
    verify_assignment(asgn_31_2, solver_31_2)
    assignments.append(asgn_31_2)

    # 31.3: Kiểm kê kho sách thư viện (Beginner)
    asgn_31_3 = {
        "id": "asgn_31_3",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.3: Chương trình kiểm kê kho sách và lập danh sách cần nhập thêm (Luyện tập Bài 31)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Thư viện trường học)\nCho danh sách tên sách và số lượng tồn tương ứng. Một đầu sách cần nhập thêm nếu số lượng tồn kho `< 5`. Hãy lọc và in ra danh sách các đầu sách cần nhập thêm kèm số lượng tồn.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách tên sách cách nhau bởi dấu phẩy.\n- Dòng 2: Danh sách số lượng tồn tương ứng (số nguyên) cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số tựa sách cần nhập thêm: <số lượng>`\n- Tiếp theo là danh sách: `<Tên sách>: còn <tồn> cuốn` (nếu không có cuốn nào in `Kho sách đầy đủ`).",
        "starterCode": "# Bài 31.3: Kiểm kê kho sách\ntitles = [x.strip() for x in input().split(',')]\nstocks = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "Tin học 10, Toán 10, Vật lý 10, Hóa học 10\n3 12 2 15", "expectedOutput": "Số tựa sách cần nhập thêm: 2\nTin học 10: còn 3 cuốn\nVật lý 10: còn 2 cuốn", "isHidden": False},
            {"input": "Văn 10, Sử 10\n8 10", "expectedOutput": "Số tựa sách cần nhập thêm: 0\nKho sách đầy đủ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_3 = """
titles = [x.strip() for x in input().split(',')]
stocks = list(map(int, input().split()))
need = []
for t, s in zip(titles, stocks):
    if s < 5:
        need.append((t, s))
print(f"Số tựa sách cần nhập thêm: {len(need)}")
if need:
    for t, s in need:
        print(f"{t}: còn {s} cuốn")
else:
    print("Kho sách đầy đủ")
"""
    verify_assignment(asgn_31_3, solver_31_3)
    assignments.append(asgn_31_3)

    # 31.4: Hóa đơn tiền nước sinh hoạt (Beginner)
    asgn_31_4 = {
        "id": "asgn_31_4",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.4: Hệ thống tính hóa đơn tiền nước sinh hoạt kèm phí môi trường (Luyện tập Bài 31)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Dịch vụ cấp thoát nước đô thị)\nTiền nước sinh hoạt tính theo biểu giá: `8000` VNĐ/m3. Ngoài tiền nước gốc, khách hàng phải đóng thêm:\n- Phí bảo vệ môi trường: `10%` tiền nước gốc.\n- Thuế VAT: `5%` tiền nước gốc.\nTổng thanh toán = Tiền nước gốc + Phí BVMT + Thuế VAT.\nViết chương trình nhập số mét khối nước `m3` (số thực) và in hóa đơn chi tiết.\n\n### Dữ liệu vào (Input)\nMột số thực `m3`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền nước gốc: <tiền làm tròn số nguyên> VNĐ`\n- Dòng 2: `Phí bảo vệ môi trường: <tiền làm tròn số nguyên> VNĐ`\n- Dòng 3: `Thuế VAT: <tiền làm tròn số nguyên> VNĐ`\n- Dòng 4: `Tổng thanh toán: <tổng làm tròn số nguyên> VNĐ`",
        "starterCode": "# Bài 31.4: Hóa đơn tiền nước\nm3 = float(input())\n",
        "testCases": [
            {"input": "15.0", "expectedOutput": "Tiền nước gốc: 120000 VNĐ\nPhí bảo vệ môi trường: 12000 VNĐ\nThuế VAT: 6000 VNĐ\nTổng thanh toán: 138000 VNĐ", "isHidden": False},
            {"input": "10.0", "expectedOutput": "Tiền nước gốc: 80000 VNĐ\nPhí bảo vệ môi trường: 8000 VNĐ\nThuế VAT: 4000 VNĐ\nTổng thanh toán: 92000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_4 = """
m3 = float(input())
goc = round(m3 * 8000)
bvmt = round(goc * 0.10)
vat = round(goc * 0.05)
tong = goc + bvmt + vat
print(f"Tiền nước gốc: {goc} VNĐ")
print(f"Phí bảo vệ môi trường: {bvmt} VNĐ")
print(f"Thuế VAT: {vat} VNĐ")
print(f"Tổng thanh toán: {tong} VNĐ")
"""
    verify_assignment(asgn_31_4, solver_31_4)
    assignments.append(asgn_31_4)

    # 31.5: Thống kê kết quả bình chọn dự án STEM (Intermediate)
    asgn_31_5 = {
        "id": "asgn_31_5",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.5: Thống kê kết quả bình chọn dự án sáng tạo STEM (Luyện tập Bài 31)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Ngày hội Sáng tạo STEM)\nCho danh sách tên các dự án tham gia và số phiếu bình chọn tương ứng. Hãy tìm dự án đạt giải Nhất (có số phiếu cao nhất) và tính tỷ lệ phần trăm phiếu của dự án đó trên tổng số phiếu bầu (làm tròn 1 chữ số thập phân).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tên các dự án cách nhau bởi dấu phẩy.\n- Dòng 2: Số phiếu bầu của các dự án cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Dự án đạt giải Nhất: <Tên dự án> (<số phiếu> phiếu)`\n- Dòng 2: `Tỷ lệ bình chọn: <tỷ lệ>%`",
        "starterCode": "# Bài 31.5: Bình chọn STEM\nprojects = [x.strip() for x in input().split(',')]\nvotes = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "Thùng rác thông minh, Nhà kính IoT, Robot cứu hỏa\n120 250 130", "expectedOutput": "Dự án đạt giải Nhất: Nhà kính IoT (250 phiếu)\nTỷ lệ bình chọn: 50.0%", "isHidden": False},
            {"input": "Pin mặt trời, Xe tự hành\n80 120", "expectedOutput": "Dự án đạt giải Nhất: Xe tự hành (120 phiếu)\nTỷ lệ bình chọn: 60.0%", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_5 = """
projects = [x.strip() for x in input().split(',')]
votes = list(map(int, input().split()))
mx_vote = max(votes)
idx = votes.index(mx_vote)
best_proj = projects[idx]
tong_phieu = sum(votes)
pct = (mx_vote / tong_phieu) * 100.0
print(f"Dự án đạt giải Nhất: {best_proj} ({mx_vote} phiếu)")
print(f"Tỷ lệ bình chọn: {pct:.1f}%")
"""
    verify_assignment(asgn_31_5, solver_31_5)
    assignments.append(asgn_31_5)

    # 31.6: Ứng dụng đặt vé xem phim trực tuyến (Intermediate)
    asgn_31_6 = {
        "id": "asgn_31_6",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.6: Ứng dụng đặt vé xem phim trực tuyến với chiết khấu thành viên (Luyện tập Bài 31)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Đặt vé rạp chiếu phim Online)\nKhách hàng chọn loại ghế: `THUONG` giá 80000 VNĐ, hoặc `VIP` giá 110000 VNĐ. Nhập loại ghế, số lượng vé `n`, và mã giảm giá (nếu mã là `HOCSINH` thì giảm 15% tổng tiền). Hãy tính và in hóa đơn thanh toán.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Loại ghế (`THUONG` hoặc `VIP`).\n- Dòng 2: Số lượng vé `n` (số nguyên dương).\n- Dòng 3: Mã giảm giá (chuỗi).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tiền vé gốc: <gốc> VNĐ`\n- Dòng 2: `Thanh toán: <thanh_toan làm tròn số nguyên> VNĐ`",
        "starterCode": "# Bài 31.6: Đặt vé rạp chiếu phim\nloai_ghe = input().strip()\nso_ve = int(input())\nma_giam = input().strip()\n",
        "testCases": [
            {"input": "VIP\n2\nHOCSINH", "expectedOutput": "Tiền vé gốc: 220000 VNĐ\nThanh toán: 187000 VNĐ", "isHidden": False},
            {"input": "THUONG\n3\nKHONG", "expectedOutput": "Tiền vé gốc: 240000 VNĐ\nThanh toán: 240000 VNĐ", "isHidden": False},
            {"input": "THUONG\n1\nHOCSINH", "expectedOutput": "Tiền vé gốc: 80000 VNĐ\nThanh toán: 68000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_6 = """
loai_ghe = input().strip()
so_ve = int(input())
ma_giam = input().strip()
don_gia = 110000 if loai_ghe == "VIP" else 80000
goc = so_ve * don_gia
if ma_giam == "HOCSINH":
    thanh_toan = round(goc * 0.85)
else:
    thanh_toan = goc
print(f"Tiền vé gốc: {goc} VNĐ")
print(f"Thanh toán: {thanh_toan} VNĐ")
"""
    verify_assignment(asgn_31_6, solver_31_6)
    assignments.append(asgn_31_6)

    # 31.7: Hệ thống chấm thi trắc nghiệm tự động (Intermediate)
    asgn_31_7 = {
        "id": "asgn_31_7",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.7: Hệ thống chấm điểm tự động bài thi trắc nghiệm học sinh (Luyện tập Bài 31)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Khảo thí & Chấm thi trắc nghiệm)\nBài thi gồm 10 câu trắc nghiệm. Cho đáp án chuẩn của 10 câu và bài làm của thí sinh (mỗi câu chọn A, B, C hoặc D, viết liền nhau không cách, ví dụ `ABCDABCDAB`). Mỗi câu đúng được 1.0 điểm. Hãy so khớp từng vị trí để đếm số câu đúng, số câu sai và tính tổng điểm.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Chuỗi 10 đáp án chuẩn.\n- Dòng 2: Chuỗi 10 câu trả lời của thí sinh.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số câu đúng: <đúng>/10`\n- Dòng 2: `Số câu sai: <sai>/10`\n- Dòng 3: `Tổng điểm: <điểm làm tròn 1 chữ số>`",
        "starterCode": "# Bài 31.7: Chấm thi trắc nghiệm\nkey = input().strip()\nans = input().strip()\n",
        "testCases": [
            {"input": "ABCDABCDAB\nABCDABCCAA", "expectedOutput": "Số câu đúng: 8/10\nSố câu sai: 2/10\nTổng điểm: 8.0", "isHidden": False},
            {"input": "AAAAAAAAAA\nAAAAAAAAAA", "expectedOutput": "Số câu đúng: 10/10\nSố câu sai: 0/10\nTổng điểm: 10.0", "isHidden": False},
            {"input": "ABCDABCDAB\nDCBADCBADC", "expectedOutput": "Số câu đúng: 0/10\nSố câu sai: 10/10\nTổng điểm: 0.0", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_7 = """
key = input().strip()
ans = input().strip()
dung = sum(1 for k, a in zip(key, ans) if k == a)
sai = len(key) - dung
print(f"Số câu đúng: {dung}/10")
print(f"Số câu sai: {sai}/10")
print(f"Tổng điểm: {float(dung):.1f}")
"""
    verify_assignment(asgn_31_7, solver_31_7)
    assignments.append(asgn_31_7)

    # 31.8: Quản lý phòng trọ sinh viên (Intermediate)
    asgn_31_8 = {
        "id": "asgn_31_8",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.8: Chương trình quản lý phòng trọ sinh viên và in hóa đơn chi tiết (Luyện tập Bài 31)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Đời sống sinh viên xa nhà)\nChủ nhà trọ tính tiền phòng tháng gồm:\n- Tiền thuê phòng cố định: `2,000,000` VNĐ.\n- Tiền điện: `3500` VNĐ / kWh.\n- Tiền nước: `25000` VNĐ / khối (m3).\n- Tiền internet và rác cố định: `150,000` VNĐ.\nViết chương trình nhập số kWh điện và khối nước đã dùng, tính tổng hóa đơn và chia đều cho số người cùng ở trong phòng `so_nguoi`.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số điện tiêu thụ (kWh, số thực).\n- Dòng 2: Số nước tiêu thụ (m3, số thực).\n- Dòng 3: Số người ở ghép `so_nguoi` (số nguyên dương).\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng hóa đơn phòng: <tổng làm tròn số nguyên> VNĐ`\n- Dòng 2: `Mỗi người đóng: <chia đều làm tròn số nguyên> VNĐ`",
        "starterCode": "# Bài 31.8: Hóa đơn phòng trọ\ndien = float(input())\nnuoc = float(input())\nso_nguoi = int(input())\n",
        "testCases": [
            {"input": "80.0\n6.0\n2", "expectedOutput": "Tổng hóa đơn phòng: 2580000 VNĐ\nMỗi người đóng: 1290000 VNĐ", "isHidden": False},
            {"input": "120.0\n10.0\n3", "expectedOutput": "Tổng hóa đơn phòng: 2820000 VNĐ\nMỗi người đóng: 940000 VNĐ", "isHidden": False},
            {"input": "50.0\n4.0\n1", "expectedOutput": "Tổng hóa đơn phòng: 2425000 VNĐ\nMỗi người đóng: 2425000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_8 = """
dien = float(input())
nuoc = float(input())
so_nguoi = int(input())
tien_phong = 2000000
tien_dien = dien * 3500
tien_nuoc = nuoc * 25000
tien_dv = 150000
tong = round(tien_phong + tien_dien + tien_nuoc + tien_dv)
moi_nguoi = round(tong / so_nguoi)
print(f"Tổng hóa đơn phòng: {tong} VNĐ")
print(f"Mỗi người đóng: {moi_nguoi} VNĐ")
"""
    verify_assignment(asgn_31_8, solver_31_8)
    assignments.append(asgn_31_8)

    # 31.9: Trình tính toán chỉ số sức khỏe toàn diện (Advanced)
    asgn_31_9 = {
        "id": "asgn_31_9",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.9: Trình tính toán chỉ số sức khỏe toàn diện (BMI, BMR và Calo mục tiêu) (Luyện tập Bài 31)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Khoa học dinh dưỡng & Sức khỏe thể thao)\nChương trình tính chỉ số trao đổi chất cơ bản BMR theo công thức Harris-Benedict cho nam giới:\n`BMR = 88.362 + (13.397 * can_nang) + (4.799 * chieu_cao_cm) - (5.677 * tuoi)`\nCalo mục tiêu duy trì hoạt động vừa phải: `TDEE = BMR * 1.55`.\nNhập cân nặng (kg), chiều cao (cm), tuổi. In ra chỉ số BMR và lượng Calo mục tiêu TDEE mỗi ngày (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\n- Dòng 1: Cân nặng `can_nang` (kg, số thực).\n- Dòng 2: Chiều cao `chieu_cao_cm` (cm, số thực).\n- Dòng 3: Tuổi `tuoi` (số nguyên).\n\n### Kết quả ra (Output)\n- Dòng 1: `Chỉ số BMR: <BMR> calo/ngày`\n- Dòng 2: `Calo mục tiêu TDEE: <TDEE> calo/ngày`",
        "starterCode": "# Bài 31.9: Sức khỏe BMR & TDEE\ncan_nang = float(input())\nchieu_cao = float(input())\ntuoi = int(input())\n",
        "testCases": [
            {"input": "65.0\n170.0\n16", "expectedOutput": "Chỉ số BMR: 1684 calo/ngày\nCalo mục tiêu TDEE: 2610 calo/ngày", "isHidden": False},
            {"input": "70.0\n175.0\n20", "expectedOutput": "Chỉ số BMR: 1752 calo/ngày\nCalo mục tiêu TDEE: 2716 calo/ngày", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_9 = """
can_nang = float(input())
chieu_cao = float(input())
tuoi = int(input())
bmr = 88.362 + (13.397 * can_nang) + (4.799 * chieu_cao) - (5.677 * tuoi)
tdee = bmr * 1.55
print(f"Chỉ số BMR: {round(bmr)} calo/ngày")
print(f"Calo mục tiêu TDEE: {round(tdee)} calo/ngày")
"""
    verify_assignment(asgn_31_9, solver_31_9)
    assignments.append(asgn_31_9)

    # 31.10: Phát hiện giao dịch ngân hàng bất thường (Advanced)
    asgn_31_10 = {
        "id": "asgn_31_10",
        "lessonId": "bai_29_31",
        "glyph": "●",
        "title": "Bài 31.10: Hệ thống phân tích log giao dịch ngân hàng phát hiện giao dịch bất thường (Luyện tập Bài 31)",
        "difficulty": "Advanced",
        "description": "### Đề bài (FinTech & Phòng chống gian lận tài chính Fraud Detection)\nMột giao dịch được hệ thống cảnh báo là `BẤT THƯỜNG` nếu thỏa mãn ít nhất một trong hai điều kiện:\n1. Số tiền giao dịch `so_tien` vượt quá hạn mức `50,000,000` VNĐ (`so_tien > 50000000`).\n2. Giao dịch diễn ra trong khoảng thời gian đêm khuya từ 0h đến 4h sáng (`0 <= gio <= 4`).\nNgược lại, giao dịch là `HỢP LỆ`.\nHãy viết chương trình nhận vào số lượng giao dịch `n`, và thông tin từng giao dịch dạng: `<Mã GD> <Số tiền> <Giờ>`, in danh sách các giao dịch bị cảnh báo.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Số lượng giao dịch `n` (số nguyên).\n- `n` dòng tiếp theo: Mỗi dòng gồm `<Mã GD> <Số tiền> <Giờ>` cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số giao dịch cảnh báo bất thường: <số lượng>/<n>`\n- Tiếp theo là danh sách các giao dịch bị cảnh báo: `<Mã GD>: Cảnh báo bất thường` (nếu không có giao dịch nào bất thường in `Toàn bộ giao dịch an toàn`).",
        "starterCode": "# Bài 31.10: Phát hiện giao dịch bất thường\nn = int(input())\n",
        "testCases": [
            {"input": "3\nTX01 20000000 14\nTX02 60000000 10\nTX03 5000000 2", "expectedOutput": "Số giao dịch cảnh báo bất thường: 2/3\nTX02: Cảnh báo bất thường\nTX03: Cảnh báo bất thường", "isHidden": False},
            {"input": "2\nTX10 10000000 9\nTX11 15000000 15", "expectedOutput": "Số giao dịch cảnh báo bất thường: 0/2\nToàn bộ giao dịch an toàn", "isHidden": False},
            {"input": "1\nTX99 100000000 3", "expectedOutput": "Số giao dịch cảnh báo bất thường: 1/1\nTX99: Cảnh báo bất thường", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_31_10 = """
n = int(input())
alerts = []
for _ in range(n):
    code, tien, gio = input().split()
    tien = int(tien)
    gio = int(gio)
    if tien > 50000000 or (0 <= gio <= 4):
        alerts.append(code)
print(f"Số giao dịch cảnh báo bất thường: {len(alerts)}/{n}")
if alerts:
    for code in alerts:
        print(f"{code}: Cảnh báo bất thường")
else:
    print("Toàn bộ giao dịch an toàn")
"""
    verify_assignment(asgn_31_10, solver_31_10)
    assignments.append(asgn_31_10)

    print(f"\n===> BÀI 29 - 31: SUCCESS! Generated {len(assignments)} assignments.")
    return assignments

if __name__ == "__main__":
    get_assignments_29_to_31()
