# Tổng hợp Bộ Bài Tập Lập Trình Python & Dữ Liệu Auto-Grading (Phần 2)

Tài liệu này tổng hợp đầy đủ đề bài (`problem.md`), đáp án chuẩn (`solution.py`), và dữ liệu chấm tự động (`tests.json`) cho các bài tập trong hình ảnh.

---

## 1. Nhiệm vụ 1: Thực hiện các phép tính cơ bản (`nhiem_vu_1`)

### A. Đề bài (`problem.md`)
Thực hiện các phép tính sau trong môi trường lập trình Python, so sánh kết quả với việc tính biểu thức toán học:
* **a)** $(1 + 2 + 3 + ... + 10)^3$
* **b)** $\frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \frac{1}{5}$
* **c)** Thực hiện lệnh gán $x = 2$, $y = 5$ rồi tính giá trị biểu thức $(x + y)(x^2 + y^2 - 1)$
* **d)** Thực hiện lệnh gán $a = 2$, $b = 3$, $c = 4$ rồi tính giá trị biểu thức $(a + b + c)(a + b - c)$

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra giá trị kết quả của từng câu a, b, c, d trên các dòng riêng biệt theo đúng thứ tự.

### B. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Nhiệm vụ 1
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
```

### C. Test Cases (`tests.json`)
```json
{
  "exercise_id": "nhiem_vu_1",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "166375\n1.2833333333333332\n196\n9",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```

---

## 2. Nhiệm vụ 2: Tính chu vi và diện tích hình tròn (`nhiem_vu_2`)

### A. Đề bài (`problem.md`)
Gán giá trị cho biến `R` là bán kính hình tròn rồi viết chương trình tính và in ra kết quả theo mẫu:
* `Chu vi hình tròn là: .....`
* `Diện tích hình tròn là: .....`

*(Quy ước bổ sung phục vụ chấm tự động: Gán giá trị `R = 5` và hằng số `Pi = 3.14`)*

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra đúng định dạng 2 dòng như mẫu.

### B. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Nhiệm vụ 2
R = 5
Pi = 3.14

chu_vi = 2 * Pi * R
dien_tich = Pi * R * R

print("Chu vi hình tròn là:", chu_vi)
print("Diện tích hình tròn là:", dien_tich)
```

### C. Test Cases (`tests.json`)
```json
{
  "exercise_id": "nhiem_vu_2",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "Chu vi hình tròn là: 31.400000000000002\nDiện tích hình tròn là: 78.5",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```

---

## 3. Vận dụng: Đổi số giây sang ngày, giờ, phút, giây (`van_dung_doi_giay`)

### A. Đề bài (`problem.md`)
Viết các lệnh để thực hiện việc đổi số giây `ss` cho trước sang số ngày, giờ, phút, giây, in kết quả ra màn hình.
* **Ví dụ:** Nếu `ss = 684500` thì kết quả in ra như sau:
  `684500 giây = 7 ngày 22 giờ 8 phút 20 giây`
* **Gợi ý:** Sử dụng các phép toán lấy thương nguyên (`//`), lấy số dư (`%`) và các cách đổi sau:
  * `1 ngày = 86400 giây`
  * `1 giờ = 3600 giây`
  * `1 phút = 60 giây`

*(Quy ước bổ sung phục vụ chấm tự động: Khởi tạo sẵn biến `ss = 684500` trong chương trình)*

* **Input Specification:** Không có input từ bàn phím.
* **Output Specification:** In ra 1 dòng duy nhất theo đúng định dạng ví dụ.

### B. Đáp án chuẩn (`solution.py`)
```python
# Reference Solution - Vận dụng đổi số giây
ss = 684500

ngay = ss // 86400
du_ngay = ss % 86400

gio = du_ngay // 3600
du_gio = du_ngay % 3600

phut = du_gio // 60
giay = du_gio % 60

print(f"{ss} giây = {ngay} ngày {gio} giờ {phut} phút {giay} giây")
```

### C. Test Cases (`tests.json`)
```json
{
  "exercise_id": "van_dung_doi_giay",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "",
      "expected_output": "684500 giây = 7 ngày 22 giờ 8 phút 20 giây",
      "points": 100,
      "is_hidden": false
    }
  ]
}
```