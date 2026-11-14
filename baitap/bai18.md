# Tổng hợp Bộ Bài Tập Lập Trình Python & Dữ Liệu Auto-Grading (Phần 3)

Tài liệu này tổng hợp đầy đủ đề bài (`problem.md`), đáp án chuẩn (`solution.py`), và dữ liệu chấm tự động (`tests.json`) cho 4 bài tập thực hành và vận dụng trong 2 hình ảnh.

---

## 1. Bài toán tin học 1: Tính tổng số nguyên và số thực (`bai_thuc_hanh_1`)

### A. Đề bài (`problem.md`)

Viết chương trình cho người dùng nhập vào một số nguyên và một số thực sau đó tính tổng giá trị và hiển thị kết quả và kiểu dữ liệu của tổng ra màn hình.

* **Input Specification:** 
  * Dòng 1: Một số nguyên `so_nguyen`.
  * Dòng 2: Một số thực `so_thuc`.
* **Output Specification:** 
  * Dòng 1: Giá trị tổng của hai số vừa nhập.
  * Dòng 2: Kiểu dữ liệu của biến `tong` (sử dụng hàm `type()`).
* **Lưu ý cho chấm tự động:** Không truyền chuỗi thông báo vào bên trong hàm `input()` để hệ thống chấm tự động không bị dính chuỗi nhắc vào kết quả xuất ra.

* **Ví dụ:**
  * **Input:**
    ```text
    5
    3.5
    ```
  * **Output:**
    ```text
    8.5
    <class 'float'>
    ```

### B. Đáp án chuẩn (`solution.py`)

```python
# Reference Solution - Bài toán tin học 1
so_nguyen = int(input())
so_thuc = float(input())

tong = so_nguyen + so_thuc

print(tong)
print(type(tong))
```

### C. Test Cases (`tests.json`)

```json
{
  "exercise_id": "bai_thuc_hanh_1",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "5\n3.5",
      "expected_output": "8.5\n<class 'float'>",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC02",
      "input": "10\n2.0",
      "expected_output": "12.0\n<class 'float'>",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC03",
      "input": "-4\n1.25",
      "expected_output": "-2.75\n<class 'float'>",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC04",
      "input": "0\n0.0",
      "expected_output": "0.0\n<class 'float'>",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC05",
      "input": "100\n-50.75",
      "expected_output": "49.25\n<class 'float'>",
      "points": 20,
      "is_hidden": true
    }
  ]
}
```

---

## 2. Bài toán tin học 2: Tính diện tích hình tròn (`bai_thuc_hanh_2`)

### A. Đề bài (`problem.md`)

Viết chương trình nhập bán kính $R$ từ bàn phím và tính diện tích hình tròn $S = \pi \cdot R^2$.

* **Quy ước bổ sung:** Lấy giá trị $\pi = 3.14$.
* **Input Specification:** Một dòng duy nhất chứa số thực dương $R$ (bán kính hình tròn).
* **Output Specification:** In ra diện tích hình tròn $S$.

* **Ví dụ:**
  * **Input:**
    ```text
    5
    ```
  * **Output:**
    ```text
    78.5
    ```

### B. Đáp án chuẩn (`solution.py`)

```python
# Reference Solution - Bài toán tin học 2
R = float(input())
Pi = 3.14
S = Pi * (R ** 2)
print(S)
```

### C. Test Cases (`tests.json`)

```json
{
  "exercise_id": "bai_thuc_hanh_2",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "5",
      "expected_output": "78.5",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC02",
      "input": "1",
      "expected_output": "3.14",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC03",
      "input": "2.5",
      "expected_output": "19.625",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC04",
      "input": "10",
      "expected_output": "314.0",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC05",
      "input": "0",
      "expected_output": "0.0",
      "points": 20,
      "is_hidden": true
    }
  ]
}
```

---

## 3. Vận dụng 1: Đổi số giây nhập từ bàn phím (`van_dung_1`)

### A. Đề bài (`problem.md`)

Viết chương trình nhập giá trị `ss` là số giây nhập từ bàn phím. Thông báo ra màn hình thời gian `ss` giây này sau khi đổi thành thời gian tính bằng ngày, giờ, phút, giây.

* **Quy ước đổi:** $1 \text{ ngày} = 86400 \text{ giây}$; $1 \text{ giờ} = 3600 \text{ giây}$; $1 \text{ phút} = 60 \text{ giây}$.
* **Input Specification:** Một dòng duy nhất chứa số nguyên không âm `ss`.
* **Output Specification:** In ra chuỗi định dạng: `<ss> giây = <ngay> ngày <gio> giờ <phut> phút <giay> giây` (không in câu nhắc trong `input()`).

* **Ví dụ:**
  * **Input:**
    ```text
    684500
    ```
  * **Output:**
    ```text
    684500 giây = 7 ngày 22 giờ 8 phút 20 giây
    ```

### B. Đáp án chuẩn (`solution.py`)

```python
# Reference Solution - Vận dụng 1
ss = int(input())

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
  "exercise_id": "van_dung_1",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "684500",
      "expected_output": "684500 giây = 7 ngày 22 giờ 8 phút 20 giây",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC02",
      "input": "3661",
      "expected_output": "3661 giây = 0 ngày 1 giờ 1 phút 1 giây",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC03",
      "input": "86400",
      "expected_output": "86400 giây = 1 ngày 0 giờ 0 phút 0 giây",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC04",
      "input": "59",
      "expected_output": "59 giây = 0 ngày 0 giờ 0 phút 59 giây",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC05",
      "input": "0",
      "expected_output": "0 giây = 0 ngày 0 giờ 0 phút 0 giây",
      "points": 20,
      "is_hidden": true
    }
  ]
}
```

---

## 4. Vận dụng 2: Chu vi và diện tích tam giác theo công thức Heron (`van_dung_2`)

### A. Đề bài (`problem.md`)

Viết chương trình nhập ba số thực dương $a, b, c$ và tính chu vi, diện tích của tam giác có độ dài các cạnh là $a, b, c$ ($a, b, c > 0$ và thoả mãn bất đẳng thức tam giác).

* **Gợi ý:** Công thức Heron tính diện tích tam giác: 
  $$S = \sqrt{p(p - a)(p - b)(p - c)}$$
  với $p = \frac{a + b + c}{2}$ là nửa chu vi tam giác.
* **Input Specification:** Một dòng duy nhất chứa 3 số thực dương $a, b, c$ cách nhau bởi dấu cách.
* **Output Specification:** 
  * Dòng 1: Chu vi $P$ của tam giác.
  * Dòng 2: Diện tích $S$ của tam giác.

* **Ví dụ:**
  * **Input:**
    ```text
    3 4 5
    ```
  * **Output:**
    ```text
    12.0
    6.0
    ```

### B. Đáp án chuẩn (`solution.py`)

```python
# Reference Solution - Vận dụng 2
import math

a, b, c = map(float, input().split())

P = a + b + c
p = P / 2
S = math.sqrt(p * (p - a) * (p - b) * (p - c))

print(P)
print(S)
```

### C. Test Cases (`tests.json`)

```json
{
  "exercise_id": "van_dung_2",
  "grading_type": "stdout",
  "tolerance": 0.000001,
  "total_points": 100,
  "test_cases": [
    {
      "id": "TC01",
      "input": "3 4 5",
      "expected_output": "12.0\n6.0",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC02",
      "input": "5 12 13",
      "expected_output": "30.0\n30.0",
      "points": 20,
      "is_hidden": false
    },
    {
      "id": "TC03",
      "input": "6 8 10",
      "expected_output": "24.0\n24.0",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC04",
      "input": "2.5 2.5 3.0",
      "expected_output": "8.0\n3.0",
      "points": 20,
      "is_hidden": true
    },
    {
      "id": "TC05",
      "input": "1 1 1",
      "expected_output": "3.0\n0.4330127018922193",
      "points": 20,
      "is_hidden": true
    }
  ]
}
```