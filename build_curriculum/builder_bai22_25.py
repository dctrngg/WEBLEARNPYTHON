import sys
import os
from test_runner import verify_assignment

def get_assignments_22_to_25():
    assignments = []

    # ----------------------------------------------------
    # BÀI 22: KIỂU DỮ LIỆU DANH SÁCH (LIST) (10 BÀI)
    # ----------------------------------------------------
    # 22.1: Thống kê số bước chân (Beginner)
    asgn_22_1 = {
        "id": "asgn_22_1",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.1: Thống kê số bước chân đi bộ trong tuần từ đồng hồ thông minh (Luyện tập Bài 22)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Sức khỏe & Đời sống số)\nĐồng hồ thông minh ghi nhận số bước chân của người dùng trong 7 ngày trong tuần. Hãy viết chương trình nhập vào 7 số nguyên tương ứng số bước chân của 7 ngày (trên 1 dòng cách nhau bởi dấu cách), lưu vào danh sách `buoc_chan` và tính tổng số bước chân trong tuần cùng giá trị trung bình mỗi ngày (làm tròn số nguyên).\n\n### Dữ liệu vào (Input)\nMột dòng gồm 7 số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số bước chân: <tổng> bước`\n- Dòng 2: `Trung bình mỗi ngày: <trung bình> bước`",
        "starterCode": "# Bài 22.1: Thống kê bước chân\nbuoc_chan = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "6500 7200 8100 5900 10200 11500 8600", "expectedOutput": "Tổng số bước chân: 58000 bước\nTrung bình mỗi ngày: 8286 bước", "isHidden": False},
            {"input": "5000 5000 5000 5000 5000 5000 5000", "expectedOutput": "Tổng số bước chân: 35000 bước\nTrung bình mỗi ngày: 5000 bước", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_1 = """
buoc_chan = list(map(int, input().split()))
tong = sum(buoc_chan)
tb = round(tong / len(buoc_chan))
print(f"Tổng số bước chân: {tong} bước")
print(f"Trung bình mỗi ngày: {tb} bước")
"""
    verify_assignment(asgn_22_1, solver_22_1)
    assignments.append(asgn_22_1)

    # 22.2: Ghép danh sách thành viên 2 CLB (Beginner)
    asgn_22_2 = {
        "id": "asgn_22_2",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.2: Ghép danh sách học sinh tham gia hoạt động của hai lớp (Luyện tập Bài 22)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Hoạt động ngoại khóa trường học)\nLớp 10A và 10B cùng tham gia dự án trồng cây. Nhập danh sách tên học sinh lớp 10A (cách nhau bởi dấu phẩy) và danh sách tên học sinh lớp 10B (cách nhau bởi dấu phẩy). Dùng toán tử cộng hai danh sách `+` để tạo danh sách hợp nhất và in ra tổng số học sinh cùng danh sách đầy đủ.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Tên học sinh lớp 10A cách nhau bởi dấu phẩy.\n- Dòng 2: Tên học sinh lớp 10B cách nhau bởi dấu phẩy.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tổng số học sinh: <tổng>`\n- Dòng 2: `Danh sách: <tên cách nhau bởi dấu phẩy và cách>`",
        "starterCode": "# Bài 22.2: Ghép danh sách học sinh\nds1 = [x.strip() for x in input().split(',')]\nds2 = [x.strip() for x in input().split(',')]\n",
        "testCases": [
            {"input": "An, Binh, Cuong\nDung, Giang", "expectedOutput": "Tổng số học sinh: 5\nDanh sách: An, Binh, Cuong, Dung, Giang", "isHidden": False},
            {"input": "Hoa, Mai\nLan, Cuc, Truc", "expectedOutput": "Tổng số học sinh: 5\nDanh sách: Hoa, Mai, Lan, Cuc, Truc", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_2 = """
ds1 = [x.strip() for x in input().split(',')]
ds2 = [x.strip() for x in input().split(',')]
ds = ds1 + ds2
print(f"Tổng số học sinh: {len(ds)}")
print("Danh sách: " + ", ".join(ds))
"""
    verify_assignment(asgn_22_2, solver_22_2)
    assignments.append(asgn_22_2)

    # 22.3: Doanh thu cao nhất và thấp nhất (Beginner)
    asgn_22_3 = {
        "id": "asgn_22_3",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.3: Tìm mức doanh thu ngày cao nhất và thấp nhất của gian hàng hội chợ (Luyện tập Bài 22)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Hội chợ khởi nghiệp học sinh)\nGian hàng bánh mì của chi đoàn mở bán trong `n` ngày hội chợ. Cho danh sách doanh thu từng ngày (các số nguyên, đơn vị VNĐ). Sử dụng các hàm tích hợp `max()` và `min()` của Python để tìm doanh thu ngày đắt hàng nhất và ngày ế khách nhất.\n\n### Dữ liệu vào (Input)\nMột dòng gồm `n` số nguyên cách nhau một khoảng trắng biểu thị doanh thu các ngày.\n\n### Kết quả ra (Output)\n- Dòng 1: `Doanh thu cao nhất: <max> VNĐ`\n- Dòng 2: `Doanh thu thấp nhất: <min> VNĐ`\n- Dòng 3: `Chênh lệch: <max - min> VNĐ`",
        "starterCode": "# Bài 22.3: Doanh thu cao nhất và thấp nhất\ndoanh_thu = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "1200000 850000 1500000 920000 2100000", "expectedOutput": "Doanh thu cao nhất: 2100000 VNĐ\nDoanh thu thấp nhất: 850000 VNĐ\nChênh lệch: 1250000 VNĐ", "isHidden": False},
            {"input": "500000 500000", "expectedOutput": "Doanh thu cao nhất: 500000 VNĐ\nDoanh thu thấp nhất: 500000 VNĐ\nChênh lệch: 0 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_3 = """
doanh_thu = list(map(int, input().split()))
mx = max(doanh_thu)
mn = min(doanh_thu)
print(f"Doanh thu cao nhất: {mx} VNĐ")
print(f"Doanh thu thấp nhất: {mn} VNĐ")
print(f"Chênh lệch: {mx - mn} VNĐ")
"""
    verify_assignment(asgn_22_3, solver_22_3)
    assignments.append(asgn_22_3)

    # 22.4: Đếm sản phẩm đạt chuẩn cân nặng (Beginner)
    asgn_22_4 = {
        "id": "asgn_22_4",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.4: Đếm số sản phẩm đạt chuẩn khối lượng trên dây chuyền đóng gói (Luyện tập Bài 22)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Dây chuyền tự động hóa thực phẩm)\nMỗi gói bánh quy xuất xưởng được cân tự động. Tiêu chuẩn quy định khối lượng phải từ `min_w` đến `max_w` gram. Nhập ngưỡng chuẩn `min_w`, `max_w` và danh sách khối lượng thực tế của các gói bánh, dùng vòng lặp duyệt danh sách để đếm số gói đạt chuẩn.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Hai số thực `min_w` và `max_w` cách nhau khoảng trắng.\n- Dòng 2: Danh sách khối lượng các gói bánh (số thực) cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Số sản phẩm đạt chuẩn: <số lượng>/<tổng số>`.",
        "starterCode": "# Bài 22.4: Đếm sản phẩm đạt chuẩn khối lượng\nmin_w, max_w = map(float, input().split())\nweights = list(map(float, input().split()))\n",
        "testCases": [
            {"input": "98.0 102.0\n100.2 97.5 101.8 102.5 99.0", "expectedOutput": "Số sản phẩm đạt chuẩn: 3/5", "isHidden": False},
            {"input": "50.0 55.0\n51.0 52.0 53.0", "expectedOutput": "Số sản phẩm đạt chuẩn: 3/3", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_4 = """
min_w, max_w = map(float, input().split())
weights = list(map(float, input().split()))
dat = sum(1 for w in weights if min_w <= w <= max_w)
print(f"Số sản phẩm đạt chuẩn: {dat}/{len(weights)}")
"""
    verify_assignment(asgn_22_4, solver_22_4)
    assignments.append(asgn_22_4)

    # 22.5: Cắt danh sách lấy top 3 điểm cao nhất (Intermediate)
    asgn_22_5 = {
        "id": "asgn_22_5",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.5: Trích xuất top 3 điểm thi đua cao nhất bằng kỹ thuật cắt danh sách (Slicing) (Luyện tập Bài 22)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Khen thưởng học sinh giỏi)\nCho danh sách điểm tổng kết của các học sinh trong đội tuyển (các số thực). Hãy sắp xếp danh sách điểm theo thứ tự giảm dần, sau đó dùng kỹ thuật slicing `[:3]` để lấy ra top 3 mức điểm cao nhất.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực cách nhau bởi dấu cách (ít nhất 3 phần tử).\n\n### Kết quả ra (Output)\nIn ra 1 dòng: `Top 3 điểm cao nhất: <3 số cách nhau bởi dấu cách, làm tròn 1 chữ số thập phân>`.",
        "starterCode": "# Bài 22.5: Slicing lấy top 3 điểm\ndiem = list(map(float, input().split()))\n",
        "testCases": [
            {"input": "8.5 9.2 7.8 9.8 8.9 9.0", "expectedOutput": "Top 3 điểm cao nhất: 9.8 9.2 9.0", "isHidden": False},
            {"input": "10.0 9.5 8.0 7.5", "expectedOutput": "Top 3 điểm cao nhất: 10.0 9.5 8.0", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_5 = """
diem = list(map(float, input().split()))
diem.sort(reverse=True)
top3 = [f"{d:.1f}" for d in diem[:3]]
print("Top 3 điểm cao nhất: " + " ".join(top3))
"""
    verify_assignment(asgn_22_5, solver_22_5)
    assignments.append(asgn_22_5)

    # 22.6: Tìm vị trí ngày có nhiệt độ thấp nhất (Intermediate)
    asgn_22_6 = {
        "id": "asgn_22_6",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.6: Tìm chỉ số ngày có nhiệt độ thấp nhất trong tuần (Luyện tập Bài 22)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Dự báo thời tiết)\nNhập danh sách nhiệt độ của 7 ngày trong tuần (từ Thứ Hai đến Chủ Nhật, đánh số chỉ số từ 0 đến 6). Dùng hàm `min()` và phương thức `index()` để tìm nhiệt độ thấp nhất và ngày đầu tiên xuất hiện nhiệt độ đó trong tuần (ngày thứ mấy tính từ 1 đến 7).\n\n### Dữ liệu vào (Input)\nMột dòng gồm 7 số thực cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Nhiệt độ thấp nhất: <min>°C`\n- Dòng 2: `Xuất hiện vào ngày thứ: <ngày> trong tuần` (chỉ số + 1)",
        "starterCode": "# Bài 22.6: Ngày lạnh nhất trong tuần\ntemps = list(map(float, input().split()))\n",
        "testCases": [
            {"input": "24.5 22.0 19.5 21.0 23.5 19.5 25.0", "expectedOutput": "Nhiệt độ thấp nhất: 19.5°C\nXuất hiện vào ngày thứ: 3 trong tuần", "isHidden": False},
            {"input": "18.0 20.0 22.0 24.0 26.0 28.0 30.0", "expectedOutput": "Nhiệt độ thấp nhất: 18.0°C\nXuất hiện vào ngày thứ: 1 trong tuần", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_6 = """
temps = list(map(float, input().split()))
mn = min(temps)
idx = temps.index(mn) + 1
print(f"Nhiệt độ thấp nhất: {mn}°C")
print(f"Xuất hiện vào ngày thứ: {idx} trong tuần")
"""
    verify_assignment(asgn_22_6, solver_22_6)
    assignments.append(asgn_22_6)

    # 22.7: Tách danh sách ngày chẵn và lẻ (Intermediate)
    asgn_22_7 = {
        "id": "asgn_22_7",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.7: Tách danh sách dữ liệu theo chỉ số chẵn và chỉ số lẻ (Luyện tập Bài 22)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Xử lý tín hiệu cảm biến)\nCảm biến gửi về chuỗi số liệu đo luân phiên giữa Cảm biến A (ở vị trí chỉ số chẵn: 0, 2, 4...) và Cảm biến B (ở vị trí chỉ số lẻ: 1, 3, 5...). Dùng cú pháp cắt danh sách `A[::2]` và `A[1::2]` để tách thành 2 danh sách số liệu riêng biệt.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Cảm biến A: <các số cách nhau bởi dấu cách>`\n- Dòng 2: `Cảm biến B: <các số cách nhau bởi dấu cách>`",
        "starterCode": "# Bài 22.7: Tách dữ liệu cảm biến\ndata = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "10 20 30 40 50 60", "expectedOutput": "Cảm biến A: 10 30 50\nCảm biến B: 20 40 60", "isHidden": False},
            {"input": "1 2 3 4 5", "expectedOutput": "Cảm biến A: 1 3 5\nCảm biến B: 2 4", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_7 = """
data = list(map(int, input().split()))
a = [str(x) for x in data[::2]]
b = [str(x) for x in data[1::2]]
print("Cảm biến A: " + " ".join(a))
print("Cảm biến B: " + " ".join(b))
"""
    verify_assignment(asgn_22_7, solver_22_7)
    assignments.append(asgn_22_7)

    # 22.8: Tính lượng calo trung bình tiêu thụ (Intermediate)
    asgn_22_8 = {
        "id": "asgn_22_8",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.8: Tính trung bình calo tiêu thụ và đếm số ngày vượt mức trung bình (Luyện tập Bài 22)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Thể dục thể thao học đường)\nCho danh sách lượng calo tiêu thụ mỗi ngày trong tuần tập luyện. Viết chương trình tính lượng calo trung bình (làm tròn 1 chữ số thập phân), và đếm xem có bao nhiêu ngày người đó tiêu thụ lượng calo cao hơn mức trung bình này.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên là calo từng ngày.\n\n### Kết quả ra (Output)\n- Dòng 1: `Calo trung bình: <trung bình> calo`\n- Dòng 2: `Số ngày vượt trung bình: <số ngày> ngày`",
        "starterCode": "# Bài 22.8: Calo tập luyện\ncalo = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "450 520 600 480 700 550 400", "expectedOutput": "Calo trung bình: 528.6 calo\nSố ngày vượt trung bình: 3 ngày", "isHidden": False},
            {"input": "500 500 500", "expectedOutput": "Calo trung bình: 500.0 calo\nSố ngày vượt trung bình: 0 ngày", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_8 = """
calo = list(map(int, input().split()))
tb = sum(calo) / len(calo)
vuot = sum(1 for c in calo if c > tb)
print(f"Calo trung bình: {tb:.1f} calo")
print(f"Số ngày vượt trung bình: {vuot} ngày")
"""
    verify_assignment(asgn_22_8, solver_22_8)
    assignments.append(asgn_22_8)

    # 22.9: Lọc danh sách điểm rèn luyện trên trung bình (Advanced)
    asgn_22_9 = {
        "id": "asgn_22_9",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.9: Lọc các mức điểm rèn luyện cao hơn điểm trung bình chung (Luyện tập Bài 22)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Đánh giá thi đua lớp học)\nCho danh sách điểm rèn luyện của một tổ học sinh (các số nguyên từ 0 đến 100). Hãy dùng List Comprehension để lọc ra danh sách các mức điểm rèn luyện thực sự lớn hơn điểm trung bình cộng của cả tổ, sắp xếp danh sách lọc được theo thứ tự tăng dần.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Điểm trung bình tổ: <trung bình làm tròn 2 chữ số>`\n- Dòng 2: `Điểm trên trung bình: <danh sách điểm cách nhau bởi dấu cách>` (nếu không có ai in `Không có`)",
        "starterCode": "# Bài 22.9: Lọc điểm rèn luyện\ndiem = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "75 80 90 65 85", "expectedOutput": "Điểm trung bình tổ: 79.00\nĐiểm trên trung bình: 80 85 90", "isHidden": False},
            {"input": "80 80 80", "expectedOutput": "Điểm trung bình tổ: 80.00\nĐiểm trên trung bình: Không có", "isHidden": False},
            {"input": "60 70 80 90 100", "expectedOutput": "Điểm trung bình tổ: 80.00\nĐiểm trên trung bình: 90 100", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_9 = """
diem = list(map(int, input().split()))
tb = sum(diem) / len(diem)
loc = [x for x in diem if x > tb]
loc.sort()
print(f"Điểm trung bình tổ: {tb:.2f}")
if loc:
    print("Điểm trên trung bình: " + " ".join(str(x) for x in loc))
else:
    print("Điểm trên trung bình: Không có")
"""
    verify_assignment(asgn_22_9, solver_22_9)
    assignments.append(asgn_22_9)

    # 22.10: Mô phỏng lịch sử hoàn tác (Undo) (Advanced)
    asgn_22_10 = {
        "id": "asgn_22_10",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 22.10: Mô phỏng cơ chế Hoàn tác (Undo) bằng danh sách lịch sử thao tác (Luyện tập Bài 22)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Kỹ thuật phần mềm đồ họa)\nTrong một ứng dụng vẽ, người dùng thực hiện một chuỗi thao tác được lưu trong danh sách `history`. Khi người dùng thực hiện lệnh `UNDO k`, hệ thống sẽ hủy `k` thao tác gần nhất bằng slicing `history[:-k]`. Nếu `k >= len(history)` thì danh sách trở thành rỗng. Hãy in danh sách thao tác còn lại.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các tên thao tác cách nhau bởi dấu phẩy.\n- Dòng 2: Số nguyên `k` (số bước muốn hoàn tác).\n\n### Kết quả ra (Output)\nIn ra: `Thao tác còn lại: <các thao tác cách nhau bởi dấu phẩy và cách>` hoặc `Thao tác còn lại: Trống` nếu danh sách rỗng.",
        "starterCode": "# Bài 22.10: Mô phỏng Undo\nhistory = [x.strip() for x in input().split(',')]\nk = int(input())\n",
        "testCases": [
            {"input": "Vẽ đường, Đổi màu, Phóng to, Xóa nét\n2", "expectedOutput": "Thao tác còn lại: Vẽ đường, Đổi màu", "isHidden": False},
            {"input": "Chọn hình, Xoay\n2", "expectedOutput": "Thao tác còn lại: Trống", "isHidden": False},
            {"input": "Vẽ tròn, Tô màu, Đổ bóng\n1", "expectedOutput": "Thao tác còn lại: Vẽ tròn, Tô màu", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_22_10 = """
history = [x.strip() for x in input().split(',')]
k = int(input())
if k >= len(history):
    con_lai = []
else:
    con_lai = history[:-k]
if con_lai:
    print("Thao tác còn lại: " + ", ".join(con_lai))
else:
    print("Thao tác còn lại: Trống")
"""
    verify_assignment(asgn_22_10, solver_22_10)
    assignments.append(asgn_22_10)


    # ----------------------------------------------------
    # BÀI 23: MỘT SỐ LỆNH LÀM VIỆC VỚI LIST (10 BÀI)
    # ----------------------------------------------------
    # 23.1: Quản lý hàng chờ bốc số khám bệnh (Beginner)
    asgn_23_1 = {
        "id": "asgn_23_1",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.1: Quản lý hàng chờ bốc số khám bệnh tại trạm y tế (Luyện tập Bài 23)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Hệ thống y tế công cộng)\nTrạm y tế quản lý hàng đợi bệnh nhân bằng danh sách mã số. Cho danh sách mã số hiện tại. Khi có bệnh nhân mới đến, dùng `append()` để thêm vào cuối. Khi bác sĩ gọi bệnh nhân tiếp theo, dùng `pop(0)` để lấy bệnh nhân đầu tiên ra khám. Hãy viết chương trình thực hiện gọi 1 bệnh nhân và thêm 1 bệnh nhân mới.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các mã số bệnh nhân ban đầu cách nhau khoảng trắng.\n- Dòng 2: Mã số bệnh nhân mới đến `ma_moi`.\n\n### Kết quả ra (Output)\n- Dòng 1: `Gọi vào khám: <mã bệnh nhân đầu>`\n- Dòng 2: `Hàng đợi hiện tại: <danh sách mã số cách nhau bởi dấu cách>`",
        "starterCode": "# Bài 23.1: Hàng đợi trạm y tế\nqueue = input().split()\nma_moi = input().strip()\n",
        "testCases": [
            {"input": "BN01 BN02 BN03\nBN04", "expectedOutput": "Gọi vào khám: BN01\nHàng đợi hiện tại: BN02 BN03 BN04", "isHidden": False},
            {"input": "A10\nA11", "expectedOutput": "Gọi vào khám: A10\nHàng đợi hiện tại: A11", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_1 = """
queue = input().split()
ma_moi = input().strip()
kham = queue.pop(0)
queue.append(ma_moi)
print(f"Gọi vào khám: {kham}")
print("Hàng đợi hiện tại: " + " ".join(queue))
"""
    verify_assignment(asgn_23_1, solver_23_1)
    assignments.append(asgn_23_1)

    # 23.2: Sắp xếp bảng điểm Rung chuông vàng (Beginner)
    asgn_23_2 = {
        "id": "asgn_23_2",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.2: Sắp xếp bảng điểm thi đấu Rung chuông vàng của lớp (Luyện tập Bài 23)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Sân chơi trí tuệ học đường)\nCho danh sách điểm số của các thí sinh tham gia hội thi Rung chuông vàng (các số nguyên). Dùng phương thức `.sort()` để sắp xếp bảng điểm theo thứ tự tăng dần và giảm dần.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tăng dần: <các số cách nhau bởi dấu cách>`\n- Dòng 2: `Giảm dần: <các số cách nhau bởi dấu cách>`",
        "starterCode": "# Bài 23.2: Sắp xếp bảng điểm\ndiem = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "70 45 90 85 60", "expectedOutput": "Tăng dần: 45 60 70 85 90\nGiảm dần: 90 85 70 60 45", "isHidden": False},
            {"input": "10 50 20", "expectedOutput": "Tăng dần: 10 20 50\nGiảm dần: 50 20 10", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_2 = """
diem = list(map(int, input().split()))
tang = sorted(diem)
giam = sorted(diem, reverse=True)
print("Tăng dần: " + " ".join(str(x) for x in tang))
print("Giảm dần: " + " ".join(str(x) for x in giam))
"""
    verify_assignment(asgn_23_2, solver_23_2)
    assignments.append(asgn_23_2)

    # 23.3: Kiểm tra vé đêm nhạc hợp lệ (Beginner)
    asgn_23_3 = {
        "id": "asgn_23_3",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.3: Kiểm tra mã vé hợp lệ tại cổng soát vé đêm nhạc trường (Luyện tập Bài 23)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Sự kiện âm nhạc học sinh)\nBan tổ chức phát hành danh sách mã vé hợp lệ. Tại cửa soát vé, khách quét mã vé `ticket_id`. Hãy dùng toán tử `in` để kiểm tra mã vé có nằm trong danh sách vé đã phát hành hay không.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các mã vé đã phát hành cách nhau bởi dấu cách.\n- Dòng 2: Mã vé của khách `ticket_id`.\n\n### Kết quả ra (Output)\nIn ra: `Mã vé hợp lệ - Mời vào` nếu tìm thấy, ngược lại in `Mã vé không hợp lệ`.",
        "starterCode": "# Bài 23.3: Soát vé đêm nhạc\nve_hop_le = input().split()\nticket_id = input().strip()\n",
        "testCases": [
            {"input": "VIP01 VIP02 NOR05 NOR06\nVIP02", "expectedOutput": "Mã vé hợp lệ - Mời vào", "isHidden": False},
            {"input": "T01 T02 T03\nT99", "expectedOutput": "Mã vé không hợp lệ", "isHidden": False},
            {"input": "X1 X2\nX1", "expectedOutput": "Mã vé hợp lệ - Mời vào", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_3 = """
ve_hop_le = input().split()
ticket_id = input().strip()
if ticket_id in ve_hop_le:
    print("Mã vé hợp lệ - Mời vào")
else:
    print("Mã vé không hợp lệ")
"""
    verify_assignment(asgn_23_3, solver_23_3)
    assignments.append(asgn_23_3)

    # 23.4: Chèn kiện hàng khẩn cấp (Beginner)
    asgn_23_4 = {
        "id": "asgn_23_4",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.4: Chèn kiện hàng y tế khẩn cấp vào đầu danh sách giao hàng (Luyện tập Bài 23)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Logistics chuyển phát hỏa tốc)\nCho danh sách các mã vận đơn đang chờ giao hàng. Khi có một đơn hàng y tế khẩn cấp phát sinh, hệ thống cần ưu tiên xử lý trước bằng cách chèn kiện hàng đó vào vị trí đầu tiên (chỉ số 0) dùng phương thức `.insert(0, ma_hang)`. Hãy viết chương trình thực hiện yêu cầu trên.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách các mã kiện hàng cách nhau khoảng trắng.\n- Dòng 2: Mã kiện hàng khẩn cấp cần chèn.\n\n### Kết quả ra (Output)\nIn ra: `Danh sách giao hàng ưu tiên: <danh sách mã hàng cách nhau bởi dấu cách>`.",
        "starterCode": "# Bài 23.4: Chèn đơn hàng ưu tiên\nds_hang = input().split()\nma_khan = input().strip()\n",
        "testCases": [
            {"input": "DH101 DH102 DH103\nMED999", "expectedOutput": "Danh sách giao hàng ưu tiên: MED999 DH101 DH102 DH103", "isHidden": False},
            {"input": "A1 A2\nA0", "expectedOutput": "Danh sách giao hàng ưu tiên: A0 A1 A2", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_4 = """
ds_hang = input().split()
ma_khan = input().strip()
ds_hang.insert(0, ma_khan)
print("Danh sách giao hàng ưu tiên: " + " ".join(ds_hang))
"""
    verify_assignment(asgn_23_4, solver_23_4)
    assignments.append(asgn_23_4)

    # 23.5: Tính điểm loại bỏ điểm cực trị (Intermediate)
    asgn_23_5 = {
        "id": "asgn_23_5",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.5: Tính điểm trung bình phần thi thuyết trình sau khi bỏ điểm cực trị (Luyện tập Bài 23)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Chấm thi văn nghệ & Thể thao quốc tế)\nĐể bảo đảm khách quan, điểm số của thí sinh từ ban giám khảo sẽ được loại bỏ 1 điểm thấp nhất (`min`) và 1 điểm cao nhất (`max`). Điểm chính thức là trung bình cộng của các điểm số còn lại. Hãy dùng `.remove()` để xóa điểm min và max, rồi tính trung bình (làm tròn 2 chữ số thập phân).\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số thực là điểm của các giám khảo (ít nhất 3 giám khảo) cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Điểm bị loại: <min> và <max>`\n- Dòng 2: `Điểm chính thức: <trung bình>`",
        "starterCode": "# Bài 23.5: Bỏ điểm cực trị\nscores = list(map(float, input().split()))\n",
        "testCases": [
            {"input": "8.0 9.5 7.5 8.5 9.0", "expectedOutput": "Điểm bị loại: 7.5 và 9.5\nĐiểm chính thức: 8.50", "isHidden": False},
            {"input": "6.0 10.0 8.0", "expectedOutput": "Điểm bị loại: 6.0 và 10.0\nĐiểm chính thức: 8.00", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_5 = """
scores = list(map(float, input().split()))
mn = min(scores)
mx = max(scores)
scores.remove(mn)
scores.remove(mx)
tb = sum(scores) / len(scores)
print(f"Điểm bị loại: {mn} và {mx}")
print(f"Điểm chính thức: {tb:.2f}")
"""
    verify_assignment(asgn_23_5, solver_23_5)
    assignments.append(asgn_23_5)

    # 23.6: Lọc danh sách không trùng lặp (Intermediate)
    asgn_23_6 = {
        "id": "asgn_23_6",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.6: Lọc danh sách mã sách mượn không trùng lặp tại thư viện (Luyện tập Bài 23)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Thư viện số)\nTrong ngày hội đọc sách, hệ thống ghi nhận nhiều lượt mượn sách có thể trùng lặp cùng một mã sách. Hãy viết chương trình lọc danh sách mã sách sao cho mỗi mã sách chỉ xuất hiện đúng 1 lần nhưng vẫn giữ nguyên thứ tự xuất hiện đầu tiên của chúng.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các mã sách cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng tựa sách duy nhất: <số lượng>`\n- Dòng 2: `Danh sách: <các mã sách cách nhau bởi dấu cách>`",
        "starterCode": "# Bài 23.6: Lọc mã sách trùng lặp\nraw_codes = input().split()\n",
        "testCases": [
            {"input": "B01 B05 B02 B01 B03 B05 B07", "expectedOutput": "Số lượng tựa sách duy nhất: 5\nDanh sách: B01 B05 B02 B03 B07", "isHidden": False},
            {"input": "TH1 TH1 TH1", "expectedOutput": "Số lượng tựa sách duy nhất: 1\nDanh sách: TH1", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_6 = """
raw_codes = input().split()
unique = []
for c in raw_codes:
    if c not in unique:
        unique.append(c)
print(f"Số lượng tựa sách duy nhất: {len(unique)}")
print("Danh sách: " + " ".join(unique))
"""
    verify_assignment(asgn_23_6, solver_23_6)
    assignments.append(asgn_23_6)

    # 23.7: Đếm số lần sử dụng túi sinh thái (Intermediate)
    asgn_23_7 = {
        "id": "asgn_23_7",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.7: Đếm số lần khách hàng mang túi sinh thái đi siêu thị (Luyện tập Bài 23)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Chiến dịch Tiêu dùng xanh)\nSiêu thị ghi nhận hành vi sử dụng túi của khách hàng trong các lần thanh toán dưới dạng ký hiệu: `ECO` (dùng túi sinh thái), `PLASTIC` (lấy túi ni-lông), `BOX` (dùng thùng các-tông). Hãy dùng phương thức `.count()` của danh sách để đếm số lần khách hàng dùng `ECO` và tính số điểm thưởng tích lũy (mỗi lần dùng ECO được tặng 50 điểm thưởng).\n\n### Dữ liệu vào (Input)\nMột dòng gồm các chuỗi ký hiệu cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lần dùng túi sinh thái: <số lần>`\n- Dòng 2: `Điểm thưởng tích lũy: <điểm> điểm`",
        "starterCode": "# Bài 23.7: Đếm túi sinh thái\nlogs = input().split()\n",
        "testCases": [
            {"input": "ECO PLASTIC ECO ECO BOX ECO", "expectedOutput": "Số lần dùng túi sinh thái: 4\nĐiểm thưởng tích lũy: 200 điểm", "isHidden": False},
            {"input": "PLASTIC BOX PLASTIC", "expectedOutput": "Số lần dùng túi sinh thái: 0\nĐiểm thưởng tích lũy: 0 điểm", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_7 = """
logs = input().split()
c = logs.count("ECO")
pts = c * 50
print(f"Số lần dùng túi sinh thái: {c}")
print(f"Điểm thưởng tích lũy: {pts} điểm")
"""
    verify_assignment(asgn_23_7, solver_23_7)
    assignments.append(asgn_23_7)

    # 23.8: Xóa đơn hàng hủy khỏi hệ thống (Intermediate)
    asgn_23_8 = {
        "id": "asgn_23_8",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.8: Xóa toàn bộ các đơn hàng đã bị hủy khỏi danh sách xử lý (Luyện tập Bài 23)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Thương mại điện tử)\nDanh sách mã đơn hàng chứa một số đơn mang ký hiệu `CANCEL` (đơn đã hủy). Viết chương trình sử dụng vòng lặp `while 'CANCEL' in orders:` kết hợp phương thức `orders.remove('CANCEL')` để dọn sạch toàn bộ các đơn hàng đã hủy ra khỏi danh sách.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các mã đơn hàng cách nhau bởi dấu cách.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số đơn hợp lệ còn lại: <số lượng>`\n- Dòng 2: `Danh sách đơn hợp lệ: <các mã đơn cách nhau bởi dấu cách>` (nếu không còn đơn nào in `Trống`)",
        "starterCode": "# Bài 23.8: Xóa đơn hủy CANCEL\norders = input().split()\n",
        "testCases": [
            {"input": "ORD1 CANCEL ORD2 CANCEL CANCEL ORD3", "expectedOutput": "Số đơn hợp lệ còn lại: 3\nDanh sách đơn hợp lệ: ORD1 ORD2 ORD3", "isHidden": False},
            {"input": "CANCEL CANCEL", "expectedOutput": "Số đơn hợp lệ còn lại: 0\nDanh sách đơn hợp lệ: Trống", "isHidden": False},
            {"input": "A B C", "expectedOutput": "Số đơn hợp lệ còn lại: 3\nDanh sách đơn hợp lệ: A B C", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_8 = """
orders = input().split()
while "CANCEL" in orders:
    orders.remove("CANCEL")
print(f"Số đơn hợp lệ còn lại: {len(orders)}")
if orders:
    print("Danh sách đơn hợp lệ: " + " ".join(orders))
else:
    print("Danh sách đơn hợp lệ: Trống")
"""
    verify_assignment(asgn_23_8, solver_23_8)
    assignments.append(asgn_23_8)

    # 23.9: Hợp nhất và sắp xếp danh sách giá vé máy bay (Advanced)
    asgn_23_9 = {
        "id": "asgn_23_9",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.9: Hợp nhất và sắp xếp danh sách giá vé máy bay từ hai đại lý (Luyện tập Bài 23)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Săn vé du lịch giá rẻ)\nMột công cụ so sánh giá vé máy bay thu thập bảng giá từ Đại lý 1 và Đại lý 2 (các số nguyên, nghìn VNĐ). Hãy hợp nhất hai danh sách giá vé này thành một, loại bỏ các mức giá trùng lặp, sau đó sắp xếp theo thứ tự tăng dần từ rẻ nhất đến đắt nhất.\n\n### Dữ liệu vào (Input)\n- Dòng 1: Danh sách giá vé Đại lý 1 cách nhau khoảng trắng.\n- Dòng 2: Danh sách giá vé Đại lý 2 cách nhau khoảng trắng.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số mức giá khác nhau: <số lượng>`\n- Dòng 2: `Bảng giá tăng dần: <các mức giá cách nhau khoảng trắng>`",
        "starterCode": "# Bài 23.9: Hợp nhất giá vé máy bay\ngia1 = list(map(int, input().split()))\ngia2 = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "1200 1500 950 1800\n1500 850 1200 2100", "expectedOutput": "Số mức giá khác nhau: 6\nBảng giá tăng dần: 850 950 1200 1500 1800 2100", "isHidden": False},
            {"input": "500 600\n600 700", "expectedOutput": "Số mức giá khác nhau: 3\nBảng giá tăng dần: 500 600 700", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_9 = """
gia1 = list(map(int, input().split()))
gia2 = list(map(int, input().split()))
tong_hop = list(set(gia1 + gia2))
tong_hop.sort()
print(f"Số mức giá khác nhau: {len(tong_hop)}")
print("Bảng giá tăng dần: " + " ".join(str(x) for x in tong_hop))
"""
    verify_assignment(asgn_23_9, solver_23_9)
    assignments.append(asgn_23_9)

    # 23.10: Tìm doanh thu lớn thứ nhì (Advanced)
    asgn_23_10 = {
        "id": "asgn_23_10",
        "lessonId": "bai_22_23",
        "glyph": "●",
        "title": "Bài 23.10: Tìm mức doanh số lớn thứ nhì trong danh sách doanh thu quý (Luyện tập Bài 23)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Phân tích chỉ số kinh doanh)\nCho danh sách doanh thu của các nhân viên kinh doanh trong tháng. Hãy tìm giá trị doanh số lớn thứ nhì (người về nhì). Lưu ý: Trong danh sách có thể có nhiều người cùng đạt mức doanh số lớn nhất, khi đó giá trị lớn thứ nhì phải là mức giá trị nhỏ hơn mức lớn nhất đó. Nếu mọi người đều có doanh số bằng nhau thì in `Không có giải nhì`.\n\n### Dữ liệu vào (Input)\nMột dòng gồm các số nguyên cách nhau một khoảng trắng.\n\n### Kết quả ra (Output)\nIn ra: `Doanh số lớn thứ nhì: <giá trị> VNĐ` hoặc `Không có giải nhì`.",
        "starterCode": "# Bài 23.10: Doanh số lớn thứ nhì\nds = list(map(int, input().split()))\n",
        "testCases": [
            {"input": "500 700 900 900 850 600", "expectedOutput": "Doanh số lớn thứ nhì: 850 VNĐ", "isHidden": False},
            {"input": "1000 1000 1000", "expectedOutput": "Không có giải nhì", "isHidden": False},
            {"input": "100 200", "expectedOutput": "Doanh số lớn thứ nhì: 100 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_23_10 = """
ds = list(map(int, input().split()))
distinct = list(set(ds))
distinct.sort(reverse=True)
if len(distinct) < 2:
    print("Không có giải nhì")
else:
    print(f"Doanh số lớn thứ nhì: {distinct[1]} VNĐ")
"""
    verify_assignment(asgn_23_10, solver_23_10)
    assignments.append(asgn_23_10)


    # ----------------------------------------------------
    # BÀI 24: XÂU KÍ TỰ (STRING) (10 BÀI)
    # ----------------------------------------------------
    # 24.1: Kiểm tra độ mạnh mật khẩu (Beginner)
    asgn_24_1 = {
        "id": "asgn_24_1",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.1: Kiểm tra độ mạnh mật khẩu tài khoản cổng thông tin học sinh (Luyện tập Bài 24)",
        "difficulty": "Beginner",
        "description": "### Đề bài (An toàn bảo mật thông tin tài khoản)\nMật khẩu an toàn cơ bản cho tài khoản học sinh phải có độ dài ít nhất 8 kí tự và không chứa dấu cách. Nhập chuỗi mật khẩu `pwd`, hãy dùng hàm `len()` và toán tử `' ' in pwd` để kiểm tra.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu mật khẩu `pwd`.\n\n### Kết quả ra (Output)\nIn ra: `Mật khẩu hợp lệ` hoặc `Mật khẩu không an toàn`.",
        "starterCode": "# Bài 24.1: Độ mạnh mật khẩu\npwd = input()\n",
        "testCases": [
            {"input": "python2026", "expectedOutput": "Mật khẩu hợp lệ", "isHidden": False},
            {"input": "pass12", "expectedOutput": "Mật khẩu không an toàn", "isHidden": False},
            {"input": "pass word123", "expectedOutput": "Mật khẩu không an toàn", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_1 = """
pwd = input()
if len(pwd) >= 8 and " " not in pwd:
    print("Mật khẩu hợp lệ")
else:
    print("Mật khẩu không an toàn")
"""
    verify_assignment(asgn_24_1, solver_24_1)
    assignments.append(asgn_24_1)

    # 24.2: Đếm kí tự chữ số trong mã vận đơn (Beginner)
    asgn_24_2 = {
        "id": "asgn_24_2",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.2: Đếm số kí tự chữ số trong mã vận đơn bưu phẩm (Luyện tập Bài 24)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Logistics chuyển phát nhanh)\nMã vận đơn giao hàng kết hợp cả chữ cái và chữ số (ví dụ: `VN849204852HK`). Hãy duyệt từng kí tự trong chuỗi mã vận đơn và dùng phương thức `.isdigit()` để đếm xem mã có bao nhiêu chữ số.\n\n### Dữ liệu vào (Input)\nMột xâu kí tự `code`.\n\n### Kết quả ra (Output)\nIn ra: `Số kí tự số: <số lượng>`.",
        "starterCode": "# Bài 24.2: Đếm chữ số trong mã vận đơn\ncode = input().strip()\n",
        "testCases": [
            {"input": "VN849204852HK", "expectedOutput": "Số kí tự số: 9", "isHidden": False},
            {"input": "EXPRESS", "expectedOutput": "Số kí tự số: 0", "isHidden": False},
            {"input": "123456", "expectedOutput": "Số kí tự số: 6", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_2 = """
code = input().strip()
cnt = sum(1 for ch in code if ch.isdigit())
print(f"Số kí tự số: {cnt}")
"""
    verify_assignment(asgn_24_2, solver_24_2)
    assignments.append(asgn_24_2)

    # 24.3: Kiểm tra tem đối xứng Palindrome (Beginner)
    asgn_24_3 = {
        "id": "asgn_24_3",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.3: Kiểm tra mã tem chống hàng giả đối xứng (Palindrome) (Luyện tập Bài 24)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Chống hàng giả bằng mã đối xứng)\nMột doanh nghiệp in mã tem xác thực là một chuỗi kí tự đối xứng (Palindrome - đọc xuôi hay ngược đều giống nhau, ví dụ `RADAR`, `12321`). Dùng kỹ thuật đảo ngược xâu `s[::-1]` để kiểm tra xem mã tem có phải là chuỗi đối xứng hay không.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu mã tem `s`.\n\n### Kết quả ra (Output)\nIn ra: `Mã tem đối xứng` hoặc `Mã tem không đối xứng`.",
        "starterCode": "# Bài 24.3: Tem đối xứng\ns = input().strip()\n",
        "testCases": [
            {"input": "RADAR", "expectedOutput": "Mã tem đối xứng", "isHidden": False},
            {"input": "PYTHON", "expectedOutput": "Mã tem không đối xứng", "isHidden": False},
            {"input": "12321", "expectedOutput": "Mã tem đối xứng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_3 = """
s = input().strip()
if s == s[::-1]:
    print("Mã tem đối xứng")
else:
    print("Mã tem không đối xứng")
"""
    verify_assignment(asgn_24_3, solver_24_3)
    assignments.append(asgn_24_3)

    # 24.4: Trích xuất mã tỉnh thành từ biển số xe (Beginner)
    asgn_24_4 = {
        "id": "asgn_24_4",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.4: Trích xuất mã tỉnh thành từ biển số xe cơ giới (Luyện tập Bài 24)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Giao thông đường bộ)\nBiển số xe tại Việt Nam có 2 chữ số đầu tiên là mã tỉnh thành đăng ký (ví dụ: `29` hoặc `30` là Hà Nội, `50` đến `59` là TP. Hồ Chí Minh). Dùng slicing `s[:2]` để lấy 2 kí tự đầu tiên của biển số.\n\n### Dữ liệu vào (Input)\nMột xâu kí tự biển số xe (ví dụ `29B1-12345` hoặc `51F-98765`).\n\n### Kết quả ra (Output)\nIn ra: `Mã tỉnh thành: <2 kí tự đầu>`.",
        "starterCode": "# Bài 24.4: Mã tỉnh thành từ biển số\nplate = input().strip()\n",
        "testCases": [
            {"input": "29B1-12345", "expectedOutput": "Mã tỉnh thành: 29", "isHidden": False},
            {"input": "51F-98765", "expectedOutput": "Mã tỉnh thành: 51", "isHidden": False},
            {"input": "43A-55555", "expectedOutput": "Mã tỉnh thành: 43", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_4 = """
plate = input().strip()
print(f"Mã tỉnh thành: {plate[:2]}")
"""
    verify_assignment(asgn_24_4, solver_24_4)
    assignments.append(asgn_24_4)

    # 24.5: Tính cước phí tin nhắn SMS (Intermediate)
    asgn_24_5 = {
        "id": "asgn_24_5",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.5: Tính cước phí gửi tin nhắn SMS thông báo phụ huynh (Luyện tập Bài 24)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Sổ liên lạc điện tử nhà trường)\nMột tin nhắn SMS tiêu chuẩn không dấu chứa tối đa `160` kí tự. Nếu độ dài nội dung vượt quá 160 kí tự, tin nhắn sẽ được chia thành nhiều block (mỗi block 160 kí tự, block cuối cùng dù chưa đủ 160 kí tự vẫn tính tròn 1 tin). Đơn giá mỗi tin là `350` đồng. Viết chương trình nhập nội dung tin nhắn, tính độ dài, số lượng tin SMS và tổng cước phí.\n\n### Dữ liệu vào (Input)\nMột xâu văn bản nội dung tin nhắn.\n\n### Kết quả ra (Output)\n- Dòng 1: `Độ dài tin nhắn: <độ dài> kí tự`\n- Dòng 2: `Số tin SMS: <số tin>`\n- Dòng 3: `Tổng cước phí: <tổng cước> đồng`",
        "starterCode": "# Bài 24.5: Cước tin nhắn SMS\nmsg = input()\n",
        "testCases": [
            {"input": "Thong bao: Ngay mai hoc sinh lop 10 nghi hoc buoi chieu.", "expectedOutput": "Độ dài tin nhắn: 56 kí tự\nSố tin SMS: 1\nTổng cước phí: 350 đồng", "isHidden": False},
            {"input": "A" * 165, "expectedOutput": "Độ dài tin nhắn: 165 kí tự\nSố tin SMS: 2\nTổng cước phí: 700 đồng", "isHidden": False},
            {"input": "B" * 320, "expectedOutput": "Độ dài tin nhắn: 320 kí tự\nSố tin SMS: 2\nTổng cước phí: 700 đồng", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_5 = """
msg = input()
L = len(msg)
sms_cnt = (L + 159) // 160 if L > 0 else 0
print(f"Độ dài tin nhắn: {L} kí tự")
print(f"Số tin SMS: {sms_cnt}")
print(f"Tổng cước phí: {sms_cnt * 350} đồng")
"""
    verify_assignment(asgn_24_5, solver_24_5)
    assignments.append(asgn_24_5)

    # 24.6: Trích xuất niên khóa và lớp (Intermediate)
    asgn_24_6 = {
        "id": "asgn_24_6",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.6: Trích xuất thông tin khóa học và lớp từ mã định danh học sinh (Luyện tập Bài 24)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Cơ sở dữ liệu ngành giáo dục)\nMã định danh học sinh có định dạng chuẩn: `HS<năm>-<mã lớp>-<số thứ tự>`, ví dụ `HS2024-10A7-015`. Dùng kỹ thuật cắt xâu (slicing) hoặc phương thức tách để lấy ra: Năm nhập học (4 kí tự sau chữ HS) và Tên lớp.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu mã định danh học sinh.\n\n### Kết quả ra (Output)\n- Dòng 1: `Năm nhập học: <năm>`\n- Dòng 2: `Lớp: <tên lớp>`",
        "starterCode": "# Bài 24.6: Trích xuất mã học sinh\ncode = input().strip()\n",
        "testCases": [
            {"input": "HS2024-10A7-015", "expectedOutput": "Năm nhập học: 2024\nLớp: 10A7", "isHidden": False},
            {"input": "HS2026-10A12-001", "expectedOutput": "Năm nhập học: 2026\nLớp: 10A12", "isHidden": False},
            {"input": "HS2025-11B3-042", "expectedOutput": "Năm nhập học: 2025\nLớp: 11B3", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_6 = """
code = input().strip()
parts = code.split("-")
nam = parts[0][2:]
lop = parts[1]
print(f"Năm nhập học: {nam}")
print(f"Lớp: {lop}")
"""
    verify_assignment(asgn_24_6, solver_24_6)
    assignments.append(asgn_24_6)

    # 24.7: Đếm số lượng nguyên âm (Intermediate)
    asgn_24_7 = {
        "id": "asgn_24_7",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.7: Đếm số lượng nguyên âm tiếng Anh trong câu khẩu hiệu (Luyện tập Bài 24)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Ngôn ngữ học máy tính)\nCho một câu khẩu hiệu tiếng Anh. Hãy duyệt từng kí tự của câu và đếm số lượng các nguyên âm (`a`, `e`, `i`, `o`, `u`), không phân biệt chữ hoa hay chữ thường.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu văn bản tiếng Anh.\n\n### Kết quả ra (Output)\nIn ra: `Số nguyên âm: <số lượng>`.",
        "starterCode": "# Bài 24.7: Đếm nguyên âm tiếng Anh\ns = input()\n",
        "testCases": [
            {"input": "Hello World", "expectedOutput": "Số nguyên âm: 3", "isHidden": False},
            {"input": "Keep Coding Every Day", "expectedOutput": "Số nguyên âm: 7", "isHidden": False},
            {"input": "Fly Sky", "expectedOutput": "Số nguyên âm: 0", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_7 = """
s = input().lower()
vowels = "aeiou"
cnt = sum(1 for ch in s if ch in vowels)
print(f"Số nguyên âm: {cnt}")
"""
    verify_assignment(asgn_24_7, solver_24_7)
    assignments.append(asgn_24_7)

    # 24.8: Che giấu số điện thoại khách hàng (Intermediate)
    asgn_24_8 = {
        "id": "asgn_24_8",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.8: Che giấu thông tin số điện thoại khách hàng (Masking) (Luyện tập Bài 24)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Bảo vệ dữ liệu cá nhân Nghị định 13)\nĐể bảo vệ quyền riêng tư của khách hàng, số điện thoại gồm 10 chữ số sẽ được che giấu 4 chữ số ở giữa bằng 4 dấu sao `****` (giữ lại 3 chữ số đầu và 3 chữ số cuối). Ví dụ: `0912345678` thành `091****678`.\n\n### Dữ liệu vào (Input)\nMột xâu gồm 10 chữ số của số điện thoại.\n\n### Kết quả ra (Output)\nIn ra số điện thoại đã che giấu: `Số bảo mật: <kết quả>`.",
        "starterCode": "# Bài 24.8: Che giấu số điện thoại\nphone = input().strip()\n",
        "testCases": [
            {"input": "0912345678", "expectedOutput": "Số bảo mật: 091****678", "isHidden": False},
            {"input": "0988777666", "expectedOutput": "Số bảo mật: 098****666", "isHidden": False},
            {"input": "0345678901", "expectedOutput": "Số bảo mật: 034****901", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_8 = """
phone = input().strip()
masked = phone[:3] + "****" + phone[-3:]
print(f"Số bảo mật: {masked}")
"""
    verify_assignment(asgn_24_8, solver_24_8)
    assignments.append(asgn_24_8)

    # 24.9: Đảo ngược từng từ trong câu (Advanced)
    asgn_24_9 = {
        "id": "asgn_24_9",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.9: Đảo ngược các kí tự trong từng từ của thông điệp mật thư (Luyện tập Bài 24)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Trò chơi mật mã học sinh giỏi)\nTrong trò chơi giải mật thư, quy tắc biến đổi thông điệp là: giữ nguyên thứ tự các từ trong câu, nhưng mỗi từ bị đảo ngược các kí tự bên trong nó (ví dụ: `Python is fun` thành `nohtyP si nuf`). Hãy viết chương trình giải mã hoặc mã hóa thông điệp theo quy tắc này.\n\n### Dữ liệu vào (Input)\nMột dòng chứa câu văn bản các từ cách nhau bởi một dấu cách.\n\n### Kết quả ra (Output)\nIn ra: `Thông điệp: <kết quả>`.",
        "starterCode": "# Bài 24.9: Đảo ngược từng từ\ns = input()\n",
        "testCases": [
            {"input": "Python is fun", "expectedOutput": "Thông điệp: nohtyP si nuf", "isHidden": False},
            {"input": "Hello World", "expectedOutput": "Thông điệp: olleH dlroW", "isHidden": False},
            {"input": "Tin hoc 10", "expectedOutput": "Thông điệp: niT coh 01", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_9 = """
s = input()
words = s.split()
rev = [w[::-1] for w in words]
print("Thông điệp: " + " ".join(rev))
"""
    verify_assignment(asgn_24_9, solver_24_9)
    assignments.append(asgn_24_9)

    # 24.10: Kí tự xuất hiện nhiều nhất (Advanced)
    asgn_24_10 = {
        "id": "asgn_24_10",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 24.10: Tìm kí tự chữ cái xuất hiện nhiều nhất trong văn bản (Luyện tập Bài 24)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Phân tích tần suất chữ cái)\nCho một chuỗi văn bản gồm các chữ cái tiếng Anh (chỉ xét các chữ cái từ a đến z, bỏ qua dấu cách và dấu câu). Tìm chữ cái xuất hiện nhiều lần nhất (không phân biệt chữ hoa, chữ thường; quy về chữ thường). Nếu có nhiều chữ cái cùng có số lần xuất hiện cao nhất, chọn chữ cái xuất hiện đầu tiên trong bảng chữ cái `a-z`.\n\n### Dữ liệu vào (Input)\nMột dòng văn bản.\n\n### Kết quả ra (Output)\nIn ra: `Kí tự phổ biến nhất: '<chữ>' xuất hiện <số lần> lần`.",
        "starterCode": "# Bài 24.10: Kí tự phổ biến nhất\ntext = input()\n",
        "testCases": [
            {"input": "Google DeepMind Python", "expectedOutput": "Kí tự phổ biến nhất: 'e' xuất hiện 3 lần", "isHidden": False},
            {"input": "abacaba", "expectedOutput": "Kí tự phổ biến nhất: 'a' xuất hiện 4 lần", "isHidden": False},
            {"input": "Programming", "expectedOutput": "Kí tự phổ biến nhất: 'g' xuất hiện 2 lần", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_24_10 = """
text = input().lower()
letters = [ch for ch in text if ch.isalpha()]
best_char = ""
best_cnt = -1
for c in sorted(list(set(letters))):
    cnt = letters.count(c)
    if cnt > best_cnt:
        best_cnt = cnt
        best_char = c
print(f"Kí tự phổ biến nhất: '{best_char}' xuất hiện {best_cnt} lần")
"""
    verify_assignment(asgn_24_10, solver_24_10)
    assignments.append(asgn_24_10)


    # ----------------------------------------------------
    # BÀI 25: MỘT SỐ LỆNH LÀM VIỆC VỚI XÂU (10 BÀI)
    # ----------------------------------------------------
    # 25.1: Chuẩn hóa khoảng trắng họ tên (Beginner)
    asgn_25_1 = {
        "id": "asgn_25_1",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.1: Chuẩn hóa khoảng trắng trong họ và tên học sinh đăng ký dự thi (Luyện tập Bài 25)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Cơ sở dữ liệu tuyển sinh)\nKhi học sinh tự điền thông tin đăng ký dự thi trực tuyến, xâu họ tên thường bị gõ thừa nhiều dấu cách ở đầu, cuối và giữa các từ (ví dụ: `  Nguyễn   Văn    An   `). Hãy dùng phương thức `.split()` để tách các từ và `" ".join()` để nối lại thành xâu chuẩn chỉ có đúng 1 dấu cách giữa các từ.\n\n### Dữ liệu vào (Input)\nMột dòng chứa xâu họ tên chưa chuẩn hóa.\n\n### Kết quả ra (Output)\nIn ra: `Họ tên chuẩn hóa: <kết quả>`.",
        "starterCode": "# Bài 25.1: Chuẩn hóa khoảng trắng họ tên\ns = input()\n",
        "testCases": [
            {"input": "  Nguyễn   Văn    An   ", "expectedOutput": "Họ tên chuẩn hóa: Nguyễn Văn An", "isHidden": False},
            {"input": "Trần   Thị    Mai", "expectedOutput": "Họ tên chuẩn hóa: Trần Thị Mai", "isHidden": False},
            {"input": "   Lê      Hà   ", "expectedOutput": "Họ tên chuẩn hóa: Lê Hà", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_1 = """
s = input()
chuan = " ".join(s.split())
print(f"Họ tên chuẩn hóa: {chuan}")
"""
    verify_assignment(asgn_25_1, solver_25_1)
    assignments.append(asgn_25_1)

    # 25.2: Tạo đường dẫn SEO slug (Beginner)
    asgn_25_2 = {
        "id": "asgn_25_2",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.2: Tạo đường dẫn URL thân thiện (Slug) cho bài viết câu lạc bộ (Luyện tập Bài 25)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Phát triển website CLB Tin học)\nĐể tạo đường dẫn thân thiện (SEO Slug) từ tiêu đề bài viết tiếng Anh, hệ thống chuyển toàn bộ xâu sang chữ thường với `.lower()` và thay thế các khoảng trắng bằng dấu gạch ngang `-` bằng `\"-\".join(s.split())`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa tiêu đề bài viết.\n\n### Kết quả ra (Output)\nIn ra: `Slug: <kết quả>`.",
        "starterCode": "# Bài 25.2: Tạo SEO slug\ntitle = input()\n",
        "testCases": [
            {"input": "Hoc Lap Trinh Python Can Ban", "expectedOutput": "Slug: hoc-lap-trinh-python-can-ban", "isHidden": False},
            {"input": "Chao Mung Nam Hoc Moi", "expectedOutput": "Slug: chao-mung-nam-hoc-moi", "isHidden": False},
            {"input": "AI and Future Technology", "expectedOutput": "Slug: ai-and-future-technology", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_2 = """
title = input()
slug = "-".join(title.lower().split())
print(f"Slug: {slug}")
"""
    verify_assignment(asgn_25_2, solver_25_2)
    assignments.append(asgn_25_2)

    # 25.3: Tìm vị trí lỗi trong nhật ký máy chủ (Beginner)
    asgn_25_3 = {
        "id": "asgn_25_3",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.3: Tìm vị trí từ khóa lỗi trong nhật ký máy chủ (Server Log) (Luyện tập Bài 25)",
        "difficulty": "Beginner",
        "description": "### Đề bài (Giám sát hệ thống máy chủ)\nCho một dòng nhật ký (log) của máy chủ web. Hãy sử dụng phương thức `.find(\"ERROR\")` để tìm vị trí xuất hiện đầu tiên của từ khóa \"ERROR\". Nếu tìm thấy in ra chỉ số vị trí (bắt đầu từ 0), nếu không tìm thấy in ra `Không phát hiện lỗi`.\n\n### Dữ liệu vào (Input)\nMột dòng chứa chuỗi nhật ký máy chủ.\n\n### Kết quả ra (Output)\nIn ra: `Vị trí lỗi: <chỉ số>` hoặc `Không phát hiện lỗi`.",
        "starterCode": "# Bài 25.3: Tìm vị trí ERROR\nlog = input()\n",
        "testCases": [
            {"input": "2026-11-20 14:30:15 [ERROR] Database connection failed", "expectedOutput": "Vị trí lỗi: 21", "isHidden": False},
            {"input": "2026-11-20 14:32:00 [INFO] User login successful", "expectedOutput": "Không phát hiện lỗi", "isHidden": False},
            {"input": "ERROR at start", "expectedOutput": "Vị trí lỗi: 0", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_3 = """
log = input()
pos = log.find("ERROR")
if pos != -1:
    print(f"Vị trí lỗi: {pos}")
else:
    print("Không phát hiện lỗi")
"""
    verify_assignment(asgn_25_3, solver_25_3)
    assignments.append(asgn_25_3)

    # 25.4: Chuyển đổi họ tên sang chữ in hoa (Beginner)
    asgn_25_4 = {
        "id": "asgn_25_4",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.4: Chuyển đổi họ tên sang chữ in hoa để in giấy chứng nhận (Luyện tập Bài 25)",
        "difficulty": "Beginner",
        "description": "### Đề bài (In ấn văn bằng chứng chỉ)\nĐể in chứng nhận hoàn thành khóa học Tin học 10, họ tên của học sinh phải được chuẩn hóa khoảng trắng và chuyển sang chữ IN HOA toàn bộ bằng phương thức `.upper()`. Hãy viết chương trình thực hiện yêu cầu này.\n\n### Dữ liệu vào (Input)\nMột dòng chứa họ tên học sinh.\n\n### Kết quả ra (Output)\nIn ra: `Tên in chứng nhận: <HỌ TÊN IN HOA>`.",
        "starterCode": "# Bài 25.4: In hoa họ tên\nname = input()\n",
        "testCases": [
            {"input": "nguyen minh an", "expectedOutput": "Tên in chứng nhận: NGUYEN MINH AN", "isHidden": False},
            {"input": "  le thu ha  ", "expectedOutput": "Tên in chứng nhận: LE THU HA", "isHidden": False},
            {"input": "tran gia bao", "expectedOutput": "Tên in chứng nhận: TRAN GIA BAO", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_4 = """
name = input()
clean = " ".join(name.split()).upper()
print(f"Tên in chứng nhận: {clean}")
"""
    verify_assignment(asgn_25_4, solver_25_4)
    assignments.append(asgn_25_4)

    # 25.5: Tách dữ liệu CSV siêu thị (Intermediate)
    asgn_25_5 = {
        "id": "asgn_25_5",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.5: Tách thông tin sản phẩm từ dòng dữ liệu CSV siêu thị (Luyện tập Bài 25)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Hóa đơn siêu thị điện tử)\nMáy quét mã vạch xuất ra một dòng CSV gồm: `<Tên hàng>,<Đơn giá>,<Số lượng>`. Hãy dùng phương thức `.split(',')` để tách các trường, ép kiểu để tính thành tiền (`Đơn giá * Số lượng`) và in phiếu thanh toán.\n\n### Dữ liệu vào (Input)\nMột dòng định dạng CSV (ví dụ `Sữa tươi,12000,4`).\n\n### Kết quả ra (Output)\n- Dòng 1: `Mặt hàng: <Tên hàng>`\n- Dòng 2: `Đơn giá: <Đơn giá> VNĐ`\n- Dòng 3: `Số lượng: <Số lượng>`\n- Dòng 4: `Thành tiền: <Thành tiền> VNĐ`",
        "starterCode": "# Bài 25.5: Tách CSV siêu thị\nline = input().strip()\n",
        "testCases": [
            {"input": "Sữa tươi,12000,4", "expectedOutput": "Mặt hàng: Sữa tươi\nĐơn giá: 12000 VNĐ\nSố lượng: 4\nThành tiền: 48000 VNĐ", "isHidden": False},
            {"input": "Bánh mì,5000,10", "expectedOutput": "Mặt hàng: Bánh mì\nĐơn giá: 5000 VNĐ\nSố lượng: 10\nThành tiền: 50000 VNĐ", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_5 = """
line = input().strip()
ten, don_gia, so_luong = [x.strip() for x in line.split(",")]
dg = int(don_gia)
sl = int(so_luong)
tt = dg * sl
print(f"Mặt hàng: {ten}")
print(f"Đơn giá: {dg} VNĐ")
print(f"Số lượng: {sl}")
print(f"Thành tiền: {tt} VNĐ")
"""
    verify_assignment(asgn_25_5, solver_25_5)
    assignments.append(asgn_25_5)

    # 25.6: Tách username và domain email (Intermediate)
    asgn_25_6 = {
        "id": "asgn_25_6",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.6: Tách tên tài khoản và tên miền từ địa chỉ Email học sinh (Luyện tập Bài 25)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Hệ thống thư điện tử giáo dục)\nĐịa chỉ email học sinh có định dạng `username@domain` (ví dụ: `an10a7@python.edu.vn`). Dùng phương thức `.split('@')` để tách và hiển thị thông tin tài khoản cùng nhà cung cấp dịch vụ thư điện tử.\n\n### Dữ liệu vào (Input)\nMột dòng chứa địa chỉ email.\n\n### Kết quả ra (Output)\n- Dòng 1: `Tài khoản: <username>`\n- Dòng 2: `Tên miền: <domain>`",
        "starterCode": "# Bài 25.6: Tách Email\nemail = input().strip()\n",
        "testCases": [
            {"input": "an10a7@python.edu.vn", "expectedOutput": "Tài khoản: an10a7\nTên miền: python.edu.vn", "isHidden": False},
            {"input": "admin@cococode.site", "expectedOutput": "Tài khoản: admin\nTên miền: cococode.site", "isHidden": False},
            {"input": "student@gmail.com", "expectedOutput": "Tài khoản: student\nTên miền: gmail.com", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_6 = """
email = input().strip()
user, dom = email.split("@")
print(f"Tài khoản: {user}")
print(f"Tên miền: {dom}")
"""
    verify_assignment(asgn_25_6, solver_25_6)
    assignments.append(asgn_25_6)

    # 25.7: Bộ lọc từ khóa nhạy cảm trong bình luận (Intermediate)
    asgn_25_7 = {
        "id": "asgn_25_7",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.7: Bộ lọc từ khóa nhạy cảm trong bình luận mạng xã hội (Luyện tập Bài 25)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Văn hóa ứng xử trên không gian mạng)\nĐể xây dựng môi trường mạng xã hội văn minh, diễn đàn trường học cần tự động thay thế từ khóa nhạy cảm `spam` bằng chuỗi `***`. Hãy sử dụng phương thức `.replace(\"spam\", \"***\")` (xét không phân biệt hoa thường bằng cách xử lý chuỗi thường hoặc thay thế chuẩn) để làm sạch câu bình luận.\n\n### Dữ liệu vào (Input)\nMột dòng chứa nội dung bình luận.\n\n### Kết quả ra (Output)\nIn ra: `Bình luận sau lọc: <nội dung đã thay thế \"spam\" thành \"***\">`.",
        "starterCode": "# Bài 25.7: Lọc từ khóa spam\ncomment = input()\n",
        "testCases": [
            {"input": "Day la bai viet spam xin dung spam nua", "expectedOutput": "Bình luận sau lọc: Day la bai viet *** xin dung *** nua", "isHidden": False},
            {"input": "Chuc mung sinh nhat ban", "expectedOutput": "Bình luận sau lọc: Chuc mung sinh nhat ban", "isHidden": False},
            {"input": "spam", "expectedOutput": "Bình luận sau lọc: ***", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_7 = """
comment = input()
filtered = comment.replace("spam", "***")
print(f"Bình luận sau lọc: {filtered}")
"""
    verify_assignment(asgn_25_7, solver_25_7)
    assignments.append(asgn_25_7)

    # 25.8: Chuẩn hóa Title Case (Intermediate)
    asgn_25_8 = {
        "id": "asgn_25_8",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.8: Chuẩn hóa viết hoa chữ cái đầu mỗi từ trong tên địa danh (Luyện tập Bài 25)",
        "difficulty": "Intermediate",
        "description": "### Đề bài (Bản đồ du lịch thông minh)\nCho một chuỗi chứa tên địa danh du lịch nhưng bị viết chữ thường hoặc lộn xộn. Hãy chuẩn hóa khoảng trắng thừa và sử dụng phương thức `.title()` (hoặc viết hoa chữ cái đầu mỗi từ) để in ra tên địa danh chuẩn.\n\n### Dữ liệu vào (Input)\nMột dòng chứa tên địa danh.\n\n### Kết quả ra (Output)\nIn ra: `Địa danh chuẩn hóa: <kết quả>`.",
        "starterCode": "# Bài 25.8: Chuẩn hóa Title Case\nplace = input()\n",
        "testCases": [
            {"input": "ha noi thu do", "expectedOutput": "Địa danh chuẩn hóa: Ha Noi Thu Do", "isHidden": False},
            {"input": "  vinh ha long   quang ninh  ", "expectedOutput": "Địa danh chuẩn hóa: Vinh Ha Long Quang Ninh", "isHidden": False},
            {"input": "da nang", "expectedOutput": "Địa danh chuẩn hóa: Da Nang", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_8 = """
place = input()
words = [w.capitalize() for w in place.split()]
print("Địa danh chuẩn hóa: " + " ".join(words))
"""
    verify_assignment(asgn_25_8, solver_25_8)
    assignments.append(asgn_25_8)

    # 25.9: Trích xuất danh sách hashtag (Advanced)
    asgn_25_9 = {
        "id": "asgn_25_9",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.9: Trích xuất các thẻ Hashtag từ bài đăng truyền thông (Luyện tập Bài 25)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Truyền thông số & Tiếp thị nội dung)\nTrong các bài đăng mạng xã hội, các từ bắt đầu bằng dấu `#` được gọi là thẻ Hashtag (ví dụ `#Python`, `#STEM`). Hãy viết chương trình tách tất cả các từ trong bài đăng và lọc ra danh sách các thẻ hashtag (bắt đầu bằng kí tự `#`), sau đó in ra số lượng và danh sách các hashtag.\n\n### Dữ liệu vào (Input)\nMột dòng văn bản bài đăng mạng xã hội.\n\n### Kết quả ra (Output)\n- Dòng 1: `Số lượng Hashtag: <số lượng>`\n- Dòng 2: `Danh sách: <các hashtag cách nhau bởi dấu cách>` (nếu không có hashtag nào in `Không có`)",
        "starterCode": "# Bài 25.9: Trích xuất Hashtag\npost = input()\n",
        "testCases": [
            {"input": "Hoc lap trinh cung #Python va #STEM tai #TruongTHPT rat vui", "expectedOutput": "Số lượng Hashtag: 3\nDanh sách: #Python #STEM #TruongTHPT", "isHidden": False},
            {"input": "Hom nay troi rat dep", "expectedOutput": "Số lượng Hashtag: 0\nDanh sách: Không có", "isHidden": False},
            {"input": "#HocTap #RenLuyen", "expectedOutput": "Số lượng Hashtag: 2\nDanh sách: #HocTap #RenLuyen", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_9 = """
post = input()
words = post.split()
tags = [w for w in words if w.startswith("#")]
print(f"Số lượng Hashtag: {len(tags)}")
if tags:
    print("Danh sách: " + " ".join(tags))
else:
    print("Danh sách: Không có")
"""
    verify_assignment(asgn_25_9, solver_25_9)
    assignments.append(asgn_25_9)

    # 25.10: Nén dữ liệu chuỗi liên tiếp Run-length (Advanced)
    asgn_25_10 = {
        "id": "asgn_25_10",
        "lessonId": "bai_24_25",
        "glyph": "●",
        "title": "Bài 25.10: Nén dữ liệu cảm biến đo bằng thuật toán đếm chuỗi liên tiếp (RLE) (Luyện tập Bài 25)",
        "difficulty": "Advanced",
        "description": "### Đề bài (Nén dữ liệu IoT)\nCảm biến truyền về chuỗi tín hiệu dạng các kí tự lặp liên tiếp, ví dụ `AAABBBCCDAA`. Thuật toán Run-Length Encoding (RLE) nén chuỗi bằng cách ghi: `<kí tự><số lần lặp>`, ví dụ `A3B3C2D1A2`. Hãy viết chương trình thực hiện nén chuỗi theo thuật toán RLE.\n\n### Dữ liệu vào (Input)\nMột xâu kí tự không rỗng gồm các chữ cái in hoa liên tiếp.\n\n### Kết quả ra (Output)\nIn ra: `Chuỗi nén: <kết quả>`.",
        "starterCode": "# Bài 25.10: Nén dữ liệu Run-length\ns = input().strip()\n",
        "testCases": [
            {"input": "AAABBBCCDAA", "expectedOutput": "Chuỗi nén: A3B3C2D1A2", "isHidden": False},
            {"input": "WWWWWW", "expectedOutput": "Chuỗi nén: W6", "isHidden": False},
            {"input": "ABC", "expectedOutput": "Chuỗi nén: A1B1C1", "isHidden": True}
        ],
        "createdBy": "usr_instructor_01",
        "createdAt": "2026-11-15T08:00:00.000Z"
    }
    solver_25_10 = """
s = input().strip()
res = []
i = 0
while i < len(s):
    ch = s[i]
    cnt = 1
    while i + 1 < len(s) and s[i + 1] == ch:
        cnt += 1
        i += 1
    res.append(f"{ch}{cnt}")
    i += 1
print("Chuỗi nén: " + "".join(res))
"""
    verify_assignment(asgn_25_10, solver_25_10)
    assignments.append(asgn_25_10)

    print(f"\n===> BÀI 22 - 25: SUCCESS! Generated {len(assignments)} assignments.")
    return assignments

if __name__ == "__main__":
    get_assignments_22_to_25()
