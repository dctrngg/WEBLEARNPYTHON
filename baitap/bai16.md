# Tổng hợp Bộ Bài Tập Lập Trình Python & Dữ Liệu Auto-Grading

Tài liệu này tổng hợp đầy đủ đề bài (`problem.md`), đáp án chuẩn (`solution.py`), và dữ liệu chấm tự động (`tests.json`) cho hệ thống Online Judge / IDE học tập.

---

## Bài tập 3: Tính tiền lãi ngân hàng (`bai_003`)

### 1. Đề bài (`problem.md`)
Bạn An có 5000000 gửi vào ngân hàng, với lãi suất 0.8%/tháng. Hãy viết chương trình hiển thị ra màn hình thông tin gửi tiết kiệm và tiền lãi theo mẫu dưới đây:

**Yêu cầu hiển thị (Đoạn chương trình mẫu):**
- Tên người gửi: An
- Số tiền gửi: 5000000 vnđ
- Lãi suất/tháng: 0.8%
- Tiền lãi: `<số tiền lãi>`

Biết rằng `<số tiền lãi>` được tính theo công thức: `5000000 * 0.008`.

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra màn hình đúng 4 dòng thông tin theo định dạng mẫu.

### 2. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Bài tập 3
print('Tên người gửi: An')
print('Số tiền gửi: ', 5000000, 'vnđ')
print('Lãi suất/tháng: 0.8%')
print('Tiền lãi: ', 5000000 * 0.008)
```

### 3. Test Cases (`tests.json`)
```json
{
  "exercise_id": "bai_003",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "Tên người gửi: An\nSố tiền gửi:  5000000 vnđ\nLãi suất/tháng: 0.8%\nTiền lãi:  40000.0",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```

---

## Bài tập 4: Tính thời gian đi trên đường cao tốc (`bai_004`)

### 1. Đề bài (`problem.md`)
Đường cao tốc Hà Nội – Lào Cai (kí hiệu CT.05) có chiều dài 264 km. Một ô tô chạy với tốc độ trung bình toàn tuyến là 70 km/h. Em hãy dùng ngôn ngữ lập trình Python ra lệnh cho máy tính xác định thời gian ô tô đó đi hết đường cao tốc Hà Nội – Lào Cai.

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra thời gian ô tô đi hết tuyến đường (tính bằng giờ).

### 2. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Bài tập 4
chieu_dai = 264
van_toc = 70
thoi_gian = chieu_dai / van_toc
print(thoi_gian)
```

### 3. Test Cases (`tests.json`)
```json
{
  "exercise_id": "bai_004",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "3.7714285714285714",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```

---

## Bài tập 5: Dự báo sản lượng điện (`bai_005`)

### 1. Đề bài (`problem.md`)
Năm 2020 nước ta sản xuất được 247 tỉ kWh điện. Sản lượng điện của nước ta được dự báo sẽ tiếp tục tăng nhanh với tốc độ trung bình là 8,6%/năm. Em hãy dùng ngôn ngữ lập trình Python ra lệnh cho máy tính để tính sản lượng điện của nước ta sản xuất được trong năm 2021 theo dự báo.

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra sản lượng điện dự báo trong năm 2021 (tính bằng tỉ kWh).

### 2. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Bài tập 5
san_luong_2020 = 247
toc_do_tang = 0.086
san_luong_2021 = san_luong_2020 * (1 + toc_do_tang)
print(san_luong_2021)
```

### 3. Test Cases (`tests.json`)
```json
{
  "exercise_id": "bai_005",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "268.2422",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```

---

## Bài tập 6: Bảng nhân 7 (`bai_006`)

### 1. Đề bài (`problem.md`)
Viết chương trình in ra bảng nhân 7 với các số tự nhiên nhỏ hơn 10 (từ 0 đến 9).

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra bảng nhân 7 tương ứng, mỗi phép tính nằm trên một dòng theo định dạng chuẩn (ví dụ: `7 x 0 = 0`, `7 x 1 = 7`,...).

### 2. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Bài tập 6
for i in range(10):
    print(f"7 x {i} = {7 * i}")
```

### 3. Test Cases (`tests.json`)
```json
{
  "exercise_id": "bai_006",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "7 x 0 = 0\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```