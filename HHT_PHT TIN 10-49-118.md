

Tin học 10 47
## BÀI 16: NGÔN NGỮ LẬP TRÌNH BẬC CAO PYTHON
## KHỞI ĐỘNG
❖ Em hãy quan sát các đoạn chương trình được viết bằng các ngôn ngữ lập
trình khác nhau trong Hình 16.1 và cho biết câu lệnh trong ngôn ngữ nào dễ
hiểu nhất?.



Ngôn ngữ ở dạng
mã nhị phân
Sử dụng các từ
viết tắt của tiếng anh
Câu lệnh được viết bằng
ngôn ngữ tự nhiên
Ngôn ngữ máy Hợp ngữ (Assembly) Ngôn ngữ bậc cao
## HÌNH THÀNH KIẾN THỨC
## 1. NGÔN NGỮ LẬP TRÌNH BẬC CAO

d) Ngôn ngữ lập trình bậc cao
− Ngôn ngữ lập trình bậc cao có các câu lệnh được viết gần với ngôn ngữ tự nhiên
giúp cho việc đọc, hiểu chương trình dễ dàng hơn.
− Muốn máy hiểu được ngôn ngữ bậc cao cần phải dùng chương trình dịch để chuyển
sang ngôn ngữ máy.
− Chương trình dịch (Compiler)
hay còn gọi là trình biên dịch là
chương trình dịch từ các ngôn ngữ
khác nhau sang ngôn ngữ máy.

e) Các ngôn ngữ lập trình bậc cao phổ
biến
− Chương trình xuất câu thông báo
“Hello, World!” ra màn hình

- Ngôn ngữ lập trình là gì? Có những loại ngôn ngữ lập trình nào?
−Ngôn ngữ lập trình là ngôn ngữ dùng để viết chương trình
−Có 3 loại ngôn ngữ lập trình: ngôn ngữ máy, hợp ngữ, ngôn ngữ bậc cao
- Hãy kể tên một số ngôn ngữ lập trình bậc cao mà em biết.
−Ngôn ngữ lập trình bậc cao: pascal, C, C++, Java, Python...

Hoạt động 1: Nhận biết ngôn ngữ lập trình

Tin học 10 48
f) Ngôn ngữ lập trình Python
− Cú pháp đơn giản
− Môi trường lập trình dễ sử dụng, không phụ thuộc hệ điều hành
− Mã nguồn mở nên dễ phát triển
− Thư viện phong phú (trí tuệ nhân tạo, phân tích dữ liệu, kĩ thuật robot, ...)
## 2. MÔI TRƯỜNG LẬP TRÌNH PYTHON



## 3. MỘT SỐ LỆNH PYTHON ĐẦU TIÊN
g)  Các lệnh đầu tiên
Các kiểu dữ liệu cơ bản trong Python
int (số nguyên) 5 (số dương), -5 (số âm)
float (số thực) 2.5
bool (logic) True, False
str (xâu kí tự) “xin chào”

h) Các lệnh với phép toán
Toán tử Ý nghĩa
## + Cộng
## - Trừ
## * Nhân
## / Chia


Chế độ gõ lệnh trực tiếp Chế độ soạn thảo
## Mục
đích
Viết từng câu lệnh để tính toán
và kiểm tra nhanh các dòng
lệnh
Viết chương trình hoàn chỉnh có nhiều dòng
lệnh
## Cách
thức
Trong một phiên làm việc, gõ
lệnh trực tiếp sau dấu nhắc
## >>>

Chọn File/NewFile để mở ra màn hình soạn
thảo chương trình

## Sử
dụng
Dấu nhắc >>> Con trỏ soạn thảo
Môi trường lập trình là phần mềm dùng để soạn thảo chương trình, gỡ lỗi, chạy chương trình.

Tin học 10 49
i) Lệnh print
− Lệnh print() có chức năng đưa dữ liệu ra (xuất dữ liệu).
− Cú pháp:
− Trong đó:
+ Object: Các đối tượng trong Python.
+ sep: Phân cách giữa các đối tượng khi in, nếu không có tham số này thì mặc định sẽ là
dấu cách
+ end: Chỉ ra kí tự được in ở cuối của dòng, nếu không có tham số này thì mặc định
sẽ là dấu xuống dòng.
− Ví dụ:
Gõ lệnh trực tiếp Kết quả thông dịch
-  >>> print (3, 7, 9) 3 7 9
-  >>> print (3, 7, 9, sep= ',') 3,7,9
-  >>> print (3, 7, 9, sep= '/', end = '#') 3/7/9#
-  >>> a, b, c = 3, 7, 9
Gán giá trị cho
a, b, c
-  >>> print (a, b, c, sep= ‘;’) 3;7;9
-  >>> print (a, b, c, sep= '#', end = '--') 3#7#9--


printf(object, sep = seperator, end = end)
Lệnh print() có thể tính toán và đưa ra
kết quả của biểu thức

Xuất xâu trên một dòng, dùng cặp
nháy đơn và nháy đôi
Xuất xâu trên nhiều dòng, dùng cặp
ba dấu nháy kép (nhấn phím
Enter để xuống dòng ở giữa xâu)

Tin học 10 50

## BÀI TẬP
- Kết quả của mỗi lệnh sau là gì? Kết quả đó có kiểu dữ liệu nào?

Lệnh Kết quả Kiểu dữ liệu
## 1
## >>> 5/2

## 2
## >>> 12 + 1.5

## 3
>>> “Bạn là học sinh lớp 10”

## 4
## >>> 10 + 7//2

- Lệnh sau sẽ in ra kết quả gì?

Lệnh Kết quả
## 1
>>> print("13+10*3/2-3*2=", 13+10*3/2-3*2)

## THỰC HÀNH

− Bài 2: Phép nối xâu dùng dấu +
>>> ‘lớp’ + ‘C2’  Kết quả:......................

▪Khi nhập giá trị số hoặc xâu kí tự từ dòng lệnh, Python tự nhận biết kiểu dữ liệu.
▪Lệnh print() có chức năng in dữ liệu ra màn hình, có thể in ra một hoặc nhiều giá trị đồng thời
Lệnh print() để xuất
xâu kí tự
Trên một dòng Trên nhiều dòng (dùng phím
Enter xuống dòng)
Xâu kí tự đặt trong  cặp dấu nháy đơn '...' hoặc
cặp nháy đôi "..."
cặp ba dấu nháy đơn (hoặc
nháy đôi)
## '''....''', """...."""
Bước 1. Khởi động Python
Bước 2. Vào chế độ soạn thảo (File/New)
Bước 3. Nhập nội dung chương trình
Bước 4. Lưu chương trình (File/Save hoặc Ctrl + S)
Bước 5. Thực thi chương trình (Run/Run Module hoặc phím F5)
Bước 6. Kết thúc phiên làm việc nháy nút  (gõ lệnh quit() hoặc exit())
Bài 1: Sử dụng chế độ soạn thảo chương trình của Python để tạo, nhập và chạy chương
trình in ra màn hình câu “Xin chào”. Lưu chương trình với tên tệp tin là Bai1.py

Tin học 10 51
− Bài 3: Phép lặp xâu dùng dấu *
>>> ‘Hi’ * 5  Kết quả:.......................
## − Bài 4:
In ra màn hình hình chữ nhật như
mẫu sau:
## ************
## ************
## ************
## ************
Gợi ý: dùng lệnh Copy để sao chép các
câu lệnh giống nhau
Đáp án:
## − Bài 5:
Hãy viết lại chương trình ở bài 4
bằng cách sử dụng phép lặp xâu và
phép nối xâu để tạo ra hình chữ
nhật.

Đáp án:
print(‘*’ * ......)
print(‘....’ + ‘......’ *......... +
## ‘......’)
print(‘*’ ...... ‘ ’ ...10 +
## ‘*’)
print(‘......’ * .........)

## − Bài 6:
Viết chương trình dùng một câu
lệnh print xuất ra màn hình các
câu ca dao tục ngữ trên nhiều
dòng như mẫu sau:
Tôn sư trọng đạo
Uống nước nhớ nguồn
Ăn quả nhớ kẻ trồng cây
Đáp án:
print(............ Tôn sư trọng đạo
Uống nước nhớ nguồn
Ăn quả nhớ kẻ trồng cây............)
## BÀI ĐỌC THÊM
Khai báo sử dụng thư viện
import <tên thư viện>
- <tên thư viện>: Là tên thư viện người dùng
có sử dụng các hàm, lớp để phục vụ các công
việc trong chương trình, ví dụ thư viện math,
random, numpy, mathplotlib,...
Định nghĩa các hàm
def <tên hàm>([danh sách tham số])
....# Cấu trúc giống với thân chương
trình chính

- <tên hàm>: Là tên hàm (chương trình con)
do người dùng định nghĩa.
- Muốn sử dụng một hàm nào đó của thư viện,
ta sử dụng cú pháp:
## <tên_thư_viện>.<tên_hàm>
- Ví dụ:

Phần thân chương trình chính
<Câu lệnh 1>
[<Khối lệnh 1.1>]
<Câu lệnh 2>
[<Khối lệnh 2.1>]
- <chương trình chính>: Chứa các câu lệnh
và khối lệnh. Khối lệnh cần thụt vào một
Tab (hoặc khoảng trống) so với câu lệnh
chứa nó.
- Các câu lệnh được canh lề trái
- Khối lệnh 1.1 và 2.1 lùi vào một Tab (hoặc
khoảng trống) so với câu lệnh 1 và 2

Tin học 10 52
STT Tên Ký hiệu Ý nghĩa
## 1  Alert
## \a
Phát ra một tiếng bíp
## 2  Backspace
## \b
Đưa con trỏ lùi về một khoảng trắng (một ký tự)
## 3  Newline
## \n
Đưa con trỏ xuống dòng và về đầu dòng tiếp theo
4  Horizontal tab
## \t
In một khoảng trắng bằng phím Tab
## 5
ASCII Carriage
## Return
## \r
Đưa con trỏ về đầu dòng
6  Single quote
## \’
In ra ký tự ‘
7  Double quote
## \"
In ra ký tự "
## 8  Blackslash
## \\
In ra ký tự \
- Ví dụ:


− Có 3 cách để chỉnh số lượng chữ số sau dấu phẩy, ví dụ in số thực với 2 chữ số sau
dấu phẩy:
− Chú thích giúp cho người đọc nhận biết ý nghĩa của chương trình đó dễ hơn.
− Chú thích không ảnh hưởng đến nội dung chương trình nguồn.
− Khi biên dịch, Python sẽ bỏ qua các chú thích.
Kiểu chú thích Ký hiệu Ví dụ
Chú thích trên 1 dòng dấu thăng (#)
# Tính tổng 3 số a, b, c
Chú thích trên nhiều
dòng
3 dấu nháy đơn ('''
## ''')
3 dấu nháy kép ("""
## """)
''' In ra màn hình
Tổng 3 số a, b, c '''
## VẬN DỤNG:
Bài tập 1. Cú pháp câu lệnh của Python rất gần với ngôn ngữ tự nhiên. Dựa vào đặc điểm này em có
thể dự đoán chương trình sau thực hiện việc gì không:
Đoạn chương trình

a = 5
b = 2
c = a + b
print (c)
.....................................................................................
.....................................................................................
.....................................................................................

Tin học 10 53
.....................................................................................
Bài tập 2. Hãy xác định kiểu của biến a trong đoạn chương trình sau :
Đoạn chương trình

a = ‘Lập trình Python’
a = 5
a = 5.5
a = True
.....................................................................................
.....................................................................................
.....................................................................................
.....................................................................................

Bài tập 3. Bạn An có 5000000 gửi vào ngân hàng, với lãi suất 0.8%/tháng. Hãy viết chương
trình hiển thị ra màn hình thông tin sau:
Đoạn chương trình

Tên người gửi: An
Số tiền gửi: 5000000 vnđ
Lãi suất/tháng: 0.8%
Tiền lãi: <số tiền lãi>
Biết rằng <số tiền lãi> được
tính theo công thức:
## 5000000*0.008.
print(............................................................)
print('Số tiền gửi: ',5000000, 'vnđ')
print(............................................................)
print('Tiền lãi: ',.............................................)
Bài tập 4.
Đường cao tốc Hà Nội – Lào Cai (kí hiệu
CT.05) có chiều dài 264 km. Một ô tô chạy
với tốc độ trung bình toàn tuyến là 70 km/h.
Em hãy dùng ngôn ngữ lập trình Python ra
lệnh cho máy tính xác định thời gian ô tô đó
đi hết đường cao tốc Hà Nội – Lào Cai.

Đáp án:

Bài tập 5.
Năm 2020 nước ta sản xuất được 247 tỉ kWh
điện. Sản lượng điện của nước ta được dự
báo sẽ tiếp tục tăng nhanh với tốc độ trung
bình là 8,6%/năm. Em hãy dùng ngôn ngữ
lập trình Python ra lệnh cho máy tính để tính
sản lượng điện của nước ta sản xuất được
trong năm 2021 theo dự báo.
Đáp án:

Bài tập 6. Viết chương trình in ra bảng nhân 7 với các số tự nhiên nhỏ hơn 10.
.....................................................................................................................................................................
.....................................................................................................................................................................
.....................................................................................................................................................................
.....................................................................................................................................................................
.....................................................................................................................................................................
.....................................................................................................................................................................
.....................................................................................................................................................................
## CÂU HỎI TRẮC NGHIỆM:
Câu 1. Ngôn ngữ lập trình là gì:
A. Là ngôn ngữ máy tính
B.  Là ngôn ngữ biểu diễn thuật toán dưới dạng dễ hiểu.
C. Là ngôn ngữ dùng để viết các chương trình máy tính.
D. Là ngôn ngữ dùng để thực hiện các giao tiếp giữa người và máy tính.
Câu 2. Chọn phát biểu SAI:
A. Lệnh print() có chức năng in dữ liệu ra màn hình.
B. Lệnh print() có thể tính toán và đưa ra kết quả của biểu thức.
C. Lệnh print() có thể đưa ra màn hình nhiều giá trị trên một dòng.
D. Lệnh print() có thể nhập dữ liệu vào máy tính.

Tin học 10 54
Câu 3. Ngôn ngữ lập trình có các câu lệnh được viết gần với ngôn ngữ tự nhiên giúp cho việc
đọc, hiểu chương trình dễ dàng hơn đó là loại ngôn ngữ lập trình nào?
A. Ngôn ngữ máy B.  Hợp ngữ
C. Ngôn ngữ lập trình bậc cao D. Ngôn ngữ Python.
Câu 4. Chọn phát biểu SAI trong các phát biểu sau:
A. Chương trình là một bản chỉ dẫn cho máy tính làm việc, được viết bằng một ngôn ngữ lập trình.
B. Chỉ có một ngôn ngữ lập trình bậc cao là Python.
C. Lập trình bằng Python có thể đưa ra các thông báo bằng tiếng Việt.
D. Môi trường lập trình hỗ trợ người lập trình phát hiện ra câu lệnh viết sai ngữ pháp
Câu 5. Trong lập trình có mấy kỹ thuật dịch?
A. 1 loại (thông dịch)     B. 2 loại (thông dịch và biên dịch)
C. 2 loại (thông dịch và hợp dịch)   D. 2 loại (hợp dịch và biên dịch)
Câu 6. Chương trình dịch không có khả năng nào trong các khả năng sau?
A. Phát hiện lỗi cú pháp   B. Phát hiện lỗi ngữ nghĩa
C. Thông báo lỗi cú pháp   D. Tạo được chương trình đích
Câu 7. Trong quá trình dịch, lỗi nào sau đây sẽ được phát hiện?
A. Chính tả  B. Cú pháp   C. Giải thuật   D. Ngữ nghĩa
Câu 8. Đa số lập trình viên lựa chọn ngôn ngữ nào để viết chương trình:
A. Ngôn ngữ máy tính    B. Hợp ngữ
C. Ngôn ngữ lập trình bậc cao   D. Ngôn ngữ tự nhiên
Câu 9. Máy tính có thể trực tiếp hiểu được các câu lệnh viết bởi:
A. Ngôn ngữ máy tính    B. Hợp ngữ
C. Ngôn ngữ lập trình bậc cao   D. Ngôn ngữ tự nhiên
Câu 11. Chọn phát biểu SAI trong các phát biểu sau:
A. Chế độ gõ trực tiếp và chế độ soạn thảo đều gõ mỗi lệnh trên một dòng.
B. Ở chế độ gõ trực tiếp, gõ một lệnh, nhấn Enter sẽ chạy ngay.
C. Ở chế độ soạn thảo chương trình thì gõ nhiều lệnh trong 1 tệp và thực hiện chạy một lần.
D. Ở chế độ soạn thảo chương trình để thấy kết quả của biểu thức ta chỉ cần gõ biểu thức.
Câu 12. Phát biểu nào sau đây chắc chắn sai?
A. Máy tính điện tử có thể chạy các chương trình.
B. Mọi người sử dụng máy tính đều phải biết lập trình.
C. Để giải bài toán bằng máy tính, cần viết chương trình mô tả thuật toán giải bài toán.
D. Một bài toán có thể có nhiều thuật toán để giải.
Câu 13: Chương trình được viết bằng NNLT bậc cao không có đặc điểm nào trong các đặc điểm
sau?
A. Chương trình có thể được thực hiện trên nhiều máy tính khác nhau.
B. Ngắn gọn, dễ hiểu, dễ hiệu chỉnh, dễ nâng cấp.
C. Kiểu dữ liệu đa dạng, thuận tiện cho mô tả thuật toán.
D. Máy tính có thể hiểu và thực hiện trực tiếp được.
Câu 14. Chức năng của chương trình dịch:
A. Nối kết chương trình nguồn với chương trình đích cho máy tính thực hiện.
B. Chuyển đổi chương trình đích sang chương trình nguồn.
C. Chuyển đổi chương trình được viết bằng NNLT bậc cao sang ngôn ngữ máy.
D. Dịch chương trình đích sang ngôn ngữ máy cho máy tính hiểu và thực hiện được.
Câu 15. Biên dịch là gì?
A. Các đại lượng trong Python   B. Dịch từng lệnh
C. Dịch toàn bộ chương trình   D. Chạy chương trình
Câu 16. Môi trường lập trình có 2 chế độ: Chế độ gõ trực tiếp và chế độ soạn thảo là của ngôn
ngữ lập trình :
A. Ngôn ngữ lập trình bậc cao. B. Ngôn ngữ Python hoặc C/C++.
C. Ngôn ngữ Python. D. Ngôn ngữ Pascal.
Câu 17. Ngôn ngữ nào sau đây không phải ngôn ngữ bậc cao?
A. C/C++  B. Assembly  C. Python   D. Java
Câu 18. Điều nào sau đây được sử dụng để xác định một khối mã trong ngôn ngữ Python?
A. Thụt lề  B. Nháy “ ”  C. Dấu ngoặc ( )  D. Dấu ngoặc [ ]

Tin học 10 55
Câu 19. Thứ tự thực hiện các phép tính trong Python ở đáp án nào đúng?
A. /, -, +, *  B. (*, /), (+, -) C. Từ trái sang phải  D. (+, -), (*, /)
Câu 20. Câu lệnh sau bị lỗi ở đâu?
## >>> 3 + * 5
A. 3    B. + hoặc *  C. *    D. Không có lỗi
Câu 21: Output của lệnh sau là:
>>> print(1+ 2 + 3+ 4)
## A. 10   B. 15   C. 1 + 2 + 3 + 4  D. 1 + 2 + 3
Câu 22: Phát biểu nào sau đây sai khi nói về python?
A. Python là ngôn ngữ lập trình bậc cao.
B. Python có mã nguồn mở thu hút được nhiều nhà khoa học cùng phát triển.
C. Python có các lệnh phức tạp nên không phổ biến trong giáo dục.
D. Python có các câu lệnh khá gần ngôn ngữ tự nhiên.
Câu 23. Chọn phát biểu đúng khi nói về môi trường lập trình Python?
A. Chế độ soạn thảo có dấu nhắc
B. Ngoài chế độ gõ lệnh trực tiếp và soạn thảo còn có các chế độ khác
C. Chế độ gõ lệnh trực tiếp thích hợp cho việc tính toán và kiểm tra nhanh các lệnh
D. Chế độ gõ lệnh trực tiếp có con trỏ soạn thảo
Câu 24. Dùng câu lệnh print và kí tự nào để viết được đoạn văn xuống dòng giữa xâu?
A. Cặp dấu nháy đơn   B. Cặp ba dấu nháy kép
C. Cặp dấu nháy kép.   D. Không thể thực hiện được
Câu25: Cho biết các khẳng định nào sau đây là ĐÚNG ?
A. Python sẽ bỏ qua chú thích khi dịch chương trình
B. Chú thích bắt buộc phải có trong chương trình
C. Chú thích làm thay đổi kết quả chạy dịch chương trình
D. Chú thích trên một dòng bắt đầu bằng cặp 3 dấu ngoặc đơn
Câu 26: Cho biết các khẳng định nào sau đây là ĐÚNG ?
A. Chú thích làm thay đổi kết quả chạy dịch chương trình
B. Chú thích dành cho các lập trình viên để hiểu rõ hơn về chương trình
C. Chú thích bắt buộc phải có trong chương trình
D. Chú thích trên một dòng bắt đầu bằng cặp 3 dấu ngoặc đơn
Câu 27: Cho a = 3, b = 7, c = 9. Lệnh print (a, b, c, sep= ‘,’) sẽ in ra màn hình kết quả nào?
## A. 379 B. 3  7  9 C. 3, 7, 9 D. 3 – 7 – 9

## BÀI 17: BIẾN VÀ LỆNH GÁN
## KHỞI ĐỘNG
− Bài toán: Hãy xây dựng chương trình để quản lý thông tin của một thí sinh gồm: Họ
tên, năm sinh và điểm thi của thí sinh theo thang điểm 10. Hiển thị lại thông tin và kết
quả thí sinh trượt hoặc đỗ, biết thí sinh trượt nếu điểm nhỏ hơn 5 và đỗ nếu điểm lớn
hơn hoặc bằng 5.
− Xác định yêu cầu bài toán:
▪ Nhập dữ liệu đầu vào (Input) là: 3 biến họ tên, năm sinh và điểm kiểu thực
▪ Xuất dữ liệu đầu ra (Output) là: kết quả thí sinh trượt/đỗ.
Tên biến Giá trị Kiểu dữ liệu trong Python
HoTen gồm các chữ cái kiểu chuỗi str
NamSinh là 1 số nguyên kiểu số nguyên int
## Diem
Điểm thi theo thang điểm 10 là 1 số hữu
tỷ
kiểu số thực float
KetQua
kiểu lôgic  bool

Tin học 10 56
Thí sinh trượt hay đỗ phụ thuộc vào
điểm lớn hơn hoặc bằng 5 là đúng,
ngược lại là sai
giá trị trả về là: True hoặc
## False
## HÌNH THÀNH KIẾN THỨC
## 1. BIẾN VÀ LỆNH GÁN

j) Khái niệm biến
− Biến là tên (định danh) của một vùng nhớ dùng để lưu trữ giá trị (dữ liệu) và giá
trị đó có thể được thay đổi khi thực hiện chương trình.
− Thông thường vùng nhớ này được quản lý bởi một tên (gọi là tên biến) và thay vì truy
xuất đến vùng nhớ thì chúng ta truy xuất đến tên biến.
− Tùy vào các kiểu dữ liệu mà ngôn ngữ lập trình Python sẽ cấp phát vùng nhớ
khác nhau biến, một biến có thể chứa kiểu dữ liệu như: số nguyên (int), số thực
(float), logic (bool), chuỗi (str), danh sách (list),.v.v
k) Khai báo biến
− Các ngôn ngữ lập trình C/C++, C#, Java thì phải khai báo kiểu dữ liệu trước
▪ Ví dụ khai báo kiểu dữ liệu trong C: float diem;
− Trong NNLT Python: Không cần khai báo kiểu dữ liệu trước, mà biến được tạo ra
khi thực hiện lệnh gán trị.
▪ Cú pháp của lệnh gán:
## VD 1:

Tạo biến tên diem
Gán giá trị 7.5 cho biến diem
 Kiểu dữ liệu của biến diem là kiểu
số thực float
## VD2:

Tạo biến tên MonHoc
Gán giá trị “Anh Văn” cho biến MonHoc
 Kiểu dữ liệu của biến MonHoc là kiểu
xâu kí tự str
 Lưu ý: Python sẽ tự động suy ra kiểu dữ liệu tương ứng cho biến. Dùng hàm
type() để xem kiểu dữ liệu

Quy tắc đặt tên biến Ví dụ
Quan sát các lệnh, hãy cho biết kiểu dữ liệu của từng dòng lệnh?
STT Câu lệnh Kiểu dữ liệu
## 1
a = 7

## 2
b = -8.25

## 3
c = -10

## 4
d = True

## 5
e = “lớp 10”

## 6
f = False

## 7
g = 7e-2

## 8
h = “8.25”

## 9
j = [“Đậu”, “Rớt”, “Thi lại”]

## 10
k = [1, 7, 5, j]
k = [1, 7, 5, [“Đậu”, “Rớt”, “Thi lại”]]


Hoạt động 1: Phân biết các kiểu dữ liệu trong Python
<biến> = <giá trị>

Tin học 10 57
▪ Chỉ gồm các chữ cái tiếng Anh, các
chữ số từ 0 đến 9 và kí tự gạch dưới
## “_”.
▪ Không bắt đầu bằng chữ số.
Hãy đánh dấu  cho tên biến ĐÚNG
 si_so  11A01  điểm/A1
 si-so  _01  diem_A1

▪ Phân biệt chữ hoa và chữ thường.  Biến tên a khác biến tên A
▪ Nên đặt tên dễ nhớ và có ý nghĩa KetQua diem tong dtb
▪ Không được đặt tên biến trùng với từ
khóa
if, while, class, import, try, return, not,
in,with
Lệnh gán đúng

Lệnh gán sai

## 2. CÁC PHÉP TOÁN TRÊN MỘT SỐ KIỂU DỮ LIỆU CƠ BẢN
l) Các phép toán trên dữ liệu kiểu số:
− Giả sử ta có biến a = 17 và b = 5, ta có các phép toán số học sau :
## Toán
tử
## Ý
nghĩa
Ví dụ
## Toán
tử
Ý nghĩa Ví dụ
## + Cộng
a + b = .........
// Lấy phần nguyên của phép chia
a // b =
## .........
## - Trừ
a - b = .........
% Lấy phần dư của phép chia
a % b =
## .........
## * Nhân
a * b = .........

** Luỹ thừa (x
y
## )
a ** b
17 mũ 5
## / Chia
a / b = 3.4

Lưu ý:
− Nếu một trong các toán hạng là số thực thì kết quả sẽ được số thực. Vd: 7.0 + 2 = .........
− Đối với toán tử // nếu một trong các toán hạng là âm, kết quả sẽ được làm tròn,
được làm tròn từ 0 (hướng tới vô cực âm). Ví dụ:
Số nguyên
## 11 // 3 = .........
-11 // 3 = -4 (số âm được làm
tròn)
Số thực
## 11.0 // 3 =
## .........
## -11.0 // 3 = -4.0
m) Các phép toán quan hệ
− Dùng để so sánh hai đại lượng, kết quả của phép toán này là True hoặc False.
− Ví dụ : a=5 và b=10 ta có phép toán so sánh trong python như sau:
## Toán
tử
## Ý
nghĩa
Ví dụ  Toán
tử
Ý nghĩa  Ví dụ
## > Lớn
hơn
a > b (5>10 → .........)

## !=
## Khác
a != b → .........
## < Nhỏ
hơn
a < b (5<10 → .........)

## >=
Lớn hơn hoặc
bằng
a >= b → .........
## == Bằng
a == b → .........

## <=
Nhỏ hơn hoặc
bằng
a <= b → .........
n) Các phép toán logic
− Thường dùng để tạo các biểu thức logic từ các biểu thức quan hệ đơn giản.

Tin học 10 58
## Toán
tử
## Ý
nghĩa
Ví dụ
and Và 5  x  11


x là số chẵn và chia hết cho 5
(x >= 5) and (x <= 11)
Có thể bỏ dấu ngoặc tròn
x >= 5 and x <= 11
(x % 2 == 0) and (x % 5 == 0)
or Hoặc KQ là đậu hoặc điểm lớn hơn
bằng 8
x khác 0 hoặc y lớn hơn 10
(KQ == “đậu”) or (diem >= 8)
(x != 0) or (x > 10)
not Không x không nhỏ hơn 1
KQ không đậu
not (x < 1)
not (KQ == “đậu”)

− Kết quả của biểu thức logic thuộc kiểu logic (True hoặc
## False)
Phép toán or
X Y X or Y
## True True True
## True False True
## False True True
## False False False

Biểu thức logic Giá trị tham chiếu Kết quả
not(a<1) a = 6 .........
(x >= 5) and (x <= 11) x = 3 .........
(a == 5) or (b > 9) a = 3, b = 10 .........
o) Các phép toán trên dữ liệu kiểu xâu:

Vd 1: NỐI XÂU họ, tên đệm và tên chính lại với
nhau
Vd 2: LẶP LẠI XÂU


## MỘT SỐ LƯU Ý:
❖ Biểu thức: Là một dãy các phép toán +, -, *, %, // từ các hằng, biến kiểu số và các hàm.
+ Một số qui tắc thể hiện biểu thức toán học trong Python:
- Chỉ dùng cặp ngoặc tròn để xác định trình tự thực hiện phép toán trong trường hợp cần thiết.
- Viết lần lượt từ trái qua phải.
+ Thứ tự thực hiện việc tính toán:
- Thực hiện các phép toán trong ngoặc trước.
Phép toán and
X Y X and Y
## True True True
## True False False
## False True False
## False False False
## X
not
## X
## True False
## False True
+ (nối xâu) và * (lặp)


Tin học 10 59
- Trong dãy các phép toán không chứa ngoặc thì thực hiện từ trái sang phải, theo thứ tự
thực hiện các phép toán nhân (*), chia (/), chia lấy phần nguyên (//), chia lấy phần dư
(%) thực hiện trước và các phép toán cộng (+), trừ (-) thực hiện sau.
❖ Một số lệnh gán trong Python có cách viết cụ thể như sau:
## Lệnh
gán
Ví dụ
Tương đương
với
## Lệnh
gán
Ví dụ
Tương đương
với
= x = 5 x = 5

/= x /= 5 x = x / 5
+= x += 5 x = x + 5

%= x %= 5 x = x % 5
-= x -= 5 x = x - 5

//= x //= 5 x = x // 5
*= x *= 5 x = x * 5

**= x **= 5 x = x ** 5
## BÀI TẬP
Biểu thức trong toán học Biểu thức trong Python
2x + y
## 7a - (3a2-5a)
a
b
ac
b
## 2
## )
## 4
## (
## 2
## −
## −


## 4a
## 2
## -(2+4ab)
## 2

## BÀI ĐỌC THÊM
p) Hàm số học chuẩn
− Một số hàm chuẩn thường dùng trong Python:
STT Toán học Python
-  Hàm bình phương: x^2 x**2
-  Hàm căn bậc hai: √x sqrt(x)
-  Hàm giá trị tuyệt đối: |x| abs(x)
-  Hàm logarit tự nhiên: ln(x) log(x)
-  Hàm lũy thừa của cơ số e: e^x exp(x)
-  Hàm sin: sin(x) sin(x)
-  Hàm cos: cos(x) cos(x)
 Lưu ý:
Trong Python, các hàm số học chuẩn này được định nghĩa trong module math. Để sử
dụng các hàm nay trong Python, chúng ta cần thực hiện hàm import math (trừ các
hàm: abs(), x**2).
− Ví dụ:
## 3. TỪ KHOÁ
− Từ khóa (keyword) của ngôn ngữ lập trình là một tập hợp các từ tiếng Anh đặc biệt được sử dụng
vào mục đích riêng. Khi viết chương trình không được đặt tên biến hay các định danh trùng với từ
khóa.

Tin học 10 60
− Một số từ khóa trong Python phiên bản 3.x.
False break else if not as from
None class except import or assert global
True continue Finally in pass del lanbda
and def for is raise elif nonlocal
while with yleld try return
## THỰC HÀNH
Tạo và làm việc với biến, tính toán với các kiểu dữ liệu cơ bản trong Python.
❖ Nhiệm vụ 1. Thực hiện các phép tính sau trong môi trường lập trình Python, so sánh kết
quả với việc tính biểu thức toán học.
a)
## (1+2+3+...+10)
## 3

## >>> (1+2+3+4+5+6+7+8+9+10)**3
b)
## 1/2 + 1/3 + 1/4 + 1/5
## >>> 1/2 + 1/3 + 1/4 + 1/5
c)
Thực hiện lệnh gán x = 2, y =
5 rồi tính giá trị biểu thức (x +
y)(x
## 2
+ y
## 2
## - 1)
## >>>
d)
Thực  hiện  gán a  =  2,  b =  3,  c
= 4 rồi tính giá trị biểu thức (a
+ b + c)(a + b – c)
## >>>
❖ Nhiệm vụ 2:
Gán giá trị cho biến R là bán kính hình
tròn rồi viết chương trình tính và in ra
kết quả theo mẫu:
Chu vi hình tròn là: .....
Diện tích hình tròn là: .....
## R = ...............
## Pi = ...............
## Print ........................................................................
.......................................................................................
## Print........................................................................

## VẬN DỤNG
- Viết các lệnh để thực hiện việc
đổi số giây ss cho trước sang số
ngày, giờ, phút, giây, in kết quả
ra màn hình.
- Ví dụ, nếu ss = 684 500 thì kết
quả in ra như sau:
684 500 giây = 7 ngày 22 giờ
8 phút 20 giây
- Gợi ý. Sử dụng các phép toán lấy
thương nguyên, lấy số dư và các
cách đổi sau:
ngày = 86 400 giây; 1 giờ = 3
600 giây; 1 phút = 60 giây.

Đáp án:
ss = 684500
ngay = ss//86400
gio =
phut =
giay =
print





684500 giây = 7 ngày 22 gio 8
phút 20 giây

## CÂU HỎI TRẮC NGHIỆM
Câu 1. Trong ngôn ngữ Python, tên nào sau đây đặt sai theo quy tắc?
A. 11tinhoc  B. tinhoc11  C. tin_hoc   D. _11
Câu 2. Đâu là qui tắc ĐÚNG khi đặt tên cho biến trong Python?
A. Tên biến có thể bắt đầu bằng Chữ  cái hoặc dấu gạch dưới _.
B. Có thể sử dụng từ khóa làm tên biến.
C. Tên biến có thể bắt đầu bằng 1 chữ số.
D. Tên biến có thể có các kí hiệu @, !, %, $, #,...
Câu 3. Lệnh gán giá trị cho biến b nguyên nào sau đây là đúng?
A. b = 10  B. B = 10  C. b == 10  D. b = ‘10’
Câu 4. (a + b > c) and (b + c > a) and (c + a > b) là:

Tin học 10 61
A. Biểu thức quan hệ     B. Hàm số học chuẩn
C. Biểu thức logic     D. Biểu thức số học
Câu 5. Chọn các phép toán quan hệ:
A. +, -, *, / B. +, -, *, %, // C. <, >, <=, >=, !=, ==  D. and, or, not
Câu 6. Xét biểu thức logic (n % 100 < 10) and (n // 100 > 0)
Với giá trị nào của n dưới đây để biểu thức trên cho giá trị True?
## A. 100   B. 250   C. 526  D. 56
Câu 7. Biểu thức logic nào sau đây kiểm tra n là một số dương chẵn?
A. (n % 2 == 0) and (n // 2 == 0)   B. (n > 0) and (n // 2 == 0)
C. (n % 2 == 0) and (n > 0)    D. (n % 2 == 0) and (n // 2 != 0)
Câu 8. Chọn câu lệnh gán SAI:
A. x+=5 B. x=x+5 C. x=5>=6 D. 8+5=x
Câu 9. Trong NNLT Python, để chú thích nội dung trên một dòng ta sử dụng:
## A. Dấu !   B. Dấu *   C. Dấu #  D. Dấu &
Câu 10. Để chia lấy phần dư ta sử dụng toán tử nào?
A. div   B. mod   C. /    D. %
Câu 11. Phép toán // dùng để:
A. Chia B. Chia lấy phần nguyên  C. Chia lấy phần dư D. Làm tròn số
Câu 12. Xác định câu lệnh gán sai, với x, y là kiểu số nguyên:
A. x:= 5   B. x+= 5   C. x*= 5   D. x = 5
Câu 13. Trong các tên sau, tên nào đặt sai qui tắc?
A. abc   B. _abc_   C. 5ABC   D. AbC
Câu 14. Tên nào sau đây là đúng khi đặt tên cho đối tượng của Python:
A. R21   B. 10A3   C. Baitap@1  D. __Tong%2
Câu 15. Các từ. continue, elif, else, not, try, while,... trong Python được gọi là:
A. Tên chuẩn B. Tên do người lập trình đặt C. Tên đặc biệt D. Từ khóa
Câu 16. Trường hợp n ào sau đây không phải lệnh gán trong python?
A. cd = 50  B. a = a * 2  C. a = 10  D. a + b = 100
Câu 17. Để tính diện tích đường tròn bán kính R, với pi = 3.14, biểu thức nào sau đây trong
Python là đúng?
A. S:=R*R*pi  B. S=R*R*pi  C. S:=2(R)*pi  D. S:=R2*pi
Câu 18. Để viết 3 mũ 4 trong Python chọn
## A. 3**4  B. 3//4   C. 3*3+3*3  D. 3%4
Câu 19. Kết quả khi thực hiện câu lệnh sau:
## >>>10 - 5 ** 2 + 8//3 +2
A. -11   B. 11   C. 7   D. Câu lệnh bị lỗi
Câu 20. Biểu thức nào sau đây không ra kết quả là 1?
A. math.sqrt(25)//4 B. math.sqrt(25)/4 C. math.sqrt(25)%4 D. math.sqrt(25)//5
Câu 21. Để khai báo thư viện, ta sử dụng từ khóa:
A. uses B. import C. include D. attach
Câu 22. Trong Python, kết quả của biến x sau khi thực hiện câu lệnh x = math.sqrt(20//5) là:
## A. 4 B. 0 C. 16 D. 2
Câu 23. Tên biến nào sau đây là hợp lệ?
A. _if B.  global C. break D. try
Câu 24. Tên biến nào sau đây là hợp lệ?
A. Bai 1 B.  23bai_1 C. tam&12 D. Bai_1
Câu 25. Tên nào đúng khi đặt tên cho đối tượng của Python:
A. 2A B. Tong*Tong C. Tam – giac D. Baitap01
Câu 26. Với a, b là hai biết kiểu số nguyên thì câu lệnh nào sau đây SAI?
A. x =a+b B. x =a==b C. x =a!=b D. x = a=>b
Câu 27. Trong NNLT Python, cho đoạn chương trình sau:

Sau khi thực hiện đoạn chương trình trên, giá trị của a và b là:

Tin học 10 62
A. a = 1, b = 2 B. a = 2, b = 1 C. a = 1, b = 1 D. a = 2, b = 2
Câu 28. Câu lệnh gán nào sau đây không hợp lệ ?
A. x = "" B. y = ["so" , 15, 7.8]   C. a,b  = 25,6,7 D. x,y,z = 3.9, "tong", 42
Bài 29. Giá trị của biến x, y sau khi thực hiện đoạn chương trình sau là gì?

A. x = 10, y = 5  B. x = 5, y = 10 C. x = 5, y = 5  D. x = 10, y = 10

## BÀI 18: CÁC CÂU LỆNH VÀO RA ĐƠN GIẢN
## KHỞI ĐỘNG
Bài toán tin học 1: Viết chương trình tính diện tích hình tròn.
❖ Xác định bài toán
## − Input: R, Pi
## − Output: S
❖ Cách giải:
Xây dựng thuật thoán: Có 2 cách (liệt kê bước và sơ đồ khối)






## HÌNH THÀNH KIẾN THỨC
## 1. CÁC LỆNH VÀO RA ĐƠN GIẢN
− Chức năng: Hàm input() là có chức năng nhận dữ liệu nhập từ bàn phím vào Python
và trả về kết quả dưới dạng kiểu xâu string(str).
− Cú pháp:

− Trong đó:
- <Tên biển>: Là biến lưu trữ dữ liệu người dùng nhập vào từ bàn phím.
- [Dòng thông báo]: Là một chuỗi thông báo cho người dùng biết nhập dữ liệu cần
nhập, chuỗi này có thể là rỗng.
− Ví dụ:
Chương trình Kết quả biên dịch
name = input("Nhập họ tên em:
## ")
print("Xin chào ",name)

 Lưu ý:
− Khi người dùng nhấn phím Enter việc nhập dữ liệu từ bàn phím sẽ kết thúc.
− Giá trị trả về của hàm input() là một xâu, do đó, ta muốn chuyển kiểu từ kiểu xâu
sang kiểu dữ liệu khác như (kiểu số nguyên, số thực ...) thì ta phải kết hợp thêm hàm
chuyển đổi kiểu dữ liệu
Liệt kê bước
− Bước 1: Nhập bán kính R và số Pi
## − Bước 2: Tính S = Pi . R
## 2

− Bước 3: Xuất kết quả S ra màn hình
Nhập từ bàn phím
Bán kính R và Pi =3.14
Xuất diện tích S
ra màn hình
## S = Pi . R
## 2
Sơ đồ khối
<Tên biến> = input(<Dòng thông báo>)

Tin học 10 63
## 2. CÁC HÀM CHUYỂN ĐỔI KIỂU DỮ LIỆU
− Chúng ta có thể chuyển đổi qua lại giữa các kiểu dữ liệu số và chuỗi thông qua các
hàm được Python tích hợp sẵn như int(), float() và str(). Điều này còn được gọi là
ép kiểu.
Lệnh int ( ) có chức năng chuyển đổi số thực hoặc xâu chứa số nguyên thành số nguyên
Chuyển đổi Chương trình Kết quả thông dịch
- Số thực
- Xâu số nguyên

- Xâu số thực
- Biểu thức

- Xâu biểu thức
>>> int(12.6)
>>> int(“123”)

>>> int(“10.35”)
>>> int(12+45.5)

>>> int(“12+45”)
## 12
123 # Chuyển đổi được

# LỖI: Không chuyển đổi được
57 #chuyển số thực thành số nguyên bằng
cách bỏ phần thập phân
# LỖI: Không chuyển đổi được
Lệnh float ( ) dùng để chuyển đổi số nguyên và xâu kí tự thành số thực
Chuyển đổi Chương trình Kết quả thông dịch
- Số nguyên
- Xâu số
>>> float(8)
>>> float(“10.23”)
## ...............
## ...............
Lệnh str ( ) dùng để chuyển đổi các kiểu dữ liệu khác thành xâu kí tự
Chuyển đổi Chương trình Kết quả thông dịch
- Biểu thức

## 2. Số
- BT xâu
>>> str(12+34)
>>> str(2>3)
>>> str(12.567)
>>> float(“12+45”)
............... # Tính tổng rồi chuyển
## ...............
## ...............
# Lỗi: Không chuyển biểu thức xâu
− Chuyển đổi kiểu cho giá trị trả về của hàm input( ) thành kiểu nguyên, thực
- Số nguyên
>>> n = int(input(“Nhập số tự nhiên:  ”))
Nhập số tự nhiên: 13
- Số thực
>>> x = float(input(“Nhập số thực x:  ”))
Nhập số thực x: 7.5
− Nhập nhiều số trên một dòng
Bước 1: Nhập cả dòng bằng hàm input.
>>> s = input('Nhập 3 số nguyên: ')
Nhập 3 số nguyên: 10 20 30
Kết quả s là một xâu kí tự
>>> print(s)
## ‘10 20 30’
Bước 2: Dùng hàm split để tách các số trong
xâu input ra.
>>> a = s.split()
Kết quả a là một danh sách (kiểu list)
gồm các phần tử được tách ra từ xâu s
>>> print(a)
## ['10', '20', '30']
Bước 3: Sử dụng map để ép các xâu được tách
ra trong input sang số int hoặc float tùy theo
đầu bài.
>>> x, y, z = map(int,a)
Kết quả x = 10, y = 20, z = 30
>>> print(x,y,z)
## 10 20 30
>>> print(‘Tổng 3 số: ’, x+y+z)
Tổng 3 số: 60
Gộp 3 bước trên ta có câu lệnh
>>> x, y, z = map(int,input('Nhập 3 số nguyên: ').split())
Nhập 3 số : 10 20 30
>>> print('Tổng 3 số x, y, z: ', x + y + z)
Tổng 3 số x, y, z:  60

Tin học 10 64
## BÀI TẬP
− Viết câu lệnh nhập 4 số thực a, b, c, d trên 1 dòng. In ra màn hình từng số a, b, c, d.
>>> a, b, c, d = map(float,input('Nhập 4 số thực: ').split())




## LUYỆN TẬP
− Mỗi lệnh sau sẽ trả lại các giá trị nào
## 1)
float(13+1)
## 2)
str(10+7.5)
## 3)
float(“13+1”)
## 4)
int(“25”)
## 5)
float(“7.5”)
## 6)
int(“12.0”)
## 7)
float(“123,5.5”)
## 8)
int(25.7)
## 9)
str(17.001)
## 10)
int(“13+1”)
## 11)
str(5==5)
## 12)
int(10+7.5)

## THỰC HÀNH
Bài toán tin học 1: Viết chương trình cho người dùng nhập vào một số nguyên và một số
thực sau đó tính tổng giá trị và hiển thị kết quả ra màn hình.
❖ B1: Xác định bài toán
− Input: 1 số nguyên, 1 số thực
− Output: tổng
❖ B3: Viết chương trình:
so_nguyen = ........................................................................
so_thuc = ........................................................................
tong = ........................................................................
print ........................................................................
## ........................................................................
print........................................................................
## ........................................................................
❖ B2: Xây dựng thuật thoán:

Bài toán tin học 2: Viết chương trình tính diện tích hình tròn.
❖ B1: Xác định bài toán
## − Input: R, Pi
## − Output: S
❖ B3: Viết chương trình:
## S = ........................................................................
## Pi = ........................................................................
## S = ........................................................................
print........................................................................
❖ B2: Xây dựng thuật thoán:

Nhập từ bàn phím
Số nguyên, số thực
Xuất Tổng và kiểu DL
của Tổng ra màn hình
Tổng = số nguyên + số thực
Sơ đồ khối
Nhập từ bàn phím
Bán kính R và Pi
Xuất diện tích S
ra màn hình
## S = Pi . R
## 2
Sơ đồ khối
Xem hướng dẫn

Tin học 10 65
## VẬN DỤNG
- Viết chương trình nhập giá trị ss là số giây nhập từ bàn phím. Thông báo ra màn hình thời
gian ss giây này sau khi đổi thành thời gian tính bằng ngày, giờ, phút, giây.
❖ B1: Xác định bài toán
− Input: ss
− Output: ngay, gio, phut, giay
❖ B3: Viết chương trình:
ss = int(input('Hãy nhập số giây: '))
ngay = ........................................................................
gio = ........................................................................
phut = ........................................................................
giay = ........................................................................
print.................................................................................
................................................................................................
................................................................................................
❖ B2: Xây dựng thuật thoán:

- Viết chương trình nhập ba số thực dương a, b, c và tính chu vi, diện tích của tam giác có
độ dài các cạnh là a, b, c (a, b, c > 0 và thoả mãn bất đẳng thức tam giác).
Gợi ý: công thức Heron tính diện tích tam giác: S =
## √
## 푝
## (
## 푝−푎
## )(
## 푝−푏
## )
(푝−푐)  với p là
nửa chu vi tam giác
❖ B1: Xác định bài toán
− Input: a, b, c (với a, b, c >0)
− Output: P và S
Gợi ý nhập 3 số: a,b,c = map(int,input('Nhập 3
cạnh:').split())
❖ B3: Viết chương trình:
import math
a, b, c = ........................................................................
........................................................................ .........................................................
p = ........................................................................
s = math.sqrt(........................................................................
print .......................................................................................
## ..............................................................................
❖ B2: Xây dựng thuật thoán:

## CÂU HỎI TRẮC NGHIỆM
Câu 1: int là kiểu dữ liệu nào sau đây ?
A. Kiểu số nguyên  B. Kiểu số thực   C. Kiểu xâu ký tự D. Kiểu logic
Câu 2: float là kiểu dữ liệu nào sau đây?
A. Kiểu số nguyên  B. Kiểu số thực   C. Kiểu xâu ký tự D. Kiểu logic
Câu 3: Kiểu dữ liệu của biểu thức nào sau đây không thuộc kiểu bool?
## A. 67>78  B. 17 !=12+3   C. 14 == 10+2 D. '12=10+2 '
Câu 4: str là kiểu dữ liệu nào sau đây?
A. Kiểu số nguyên  B. Kiểu số thực    C. Kiểu xâu ký tự D. Kiểu logic
Câu 5: Hàm nào sau đây là hàm kiểm tra kiểu dữ liệu ?
A. Style  B. Tyle   C. Type  D. type
Câu 6: Cho biến s = ‘Xin chào’, Python sẽ cung cấp cho biến s kiểu dữ liệu nào?
A. string B. bool C. float D. str
Nhập từ bàn phím
số giây ss
Xuất ngay, gio, phut,
giay ra màn hình
Tính ngay, gio, phut, giay

Sơ đồ khối
Nhập từ bàn phím
3 cạnh tam giác a, b,
c
Xuất P và S
ra màn hình
P = a + b + c
## S =
## √
## 풑
## (
## 풑−풂
## )(
## 풑−풃
## )
## (풑−풄)

Sơ đồ khối

Tin học 10 66
Câu 7: Biết x có giá trị là 5.6, vậy x thuộc kiểu giá trị nào trong các kiểu sau?
A. bool B. int C. float D. str
Câu 8: Cho x = -49 và y = 4.9  Python cung cấp kiểu dữ liệu nào cho biến x và y?
A. x là int, y là float B. x là float, y là int C. x, y là int D. x, y là float
Câu 9: Hãy cho biết kiểu dữ liệu trả về của biến a sau câu lệnh? a = float(5)
A. Kiểu nguyên B. Kiểu thực C. Kiểu kí tự D. Kiểu logic
Câu 10: Cho x = 3.4 và y = int(x). Biến y nhận giá trị là:
A. 3 B. 4 C. 3.4 D. Báo lỗi
Câu 11: Chọn đáp án đúng khi khởi tạo a là kiểu số nguyên:
A. a = 1 B. a = 1.0 C. a = “ ” D. a = True
Câu 12: Cho a, b, c là 3 cạnh của tam giác, kiểu dữ liệu là nào phù hợp với 3 biến trên?
A. str B. bool C. float D. int
Câu 13: Cho N là tổng học sinh của 1 lớp. Dữ liệu nào sẽ phù hợp với giá trị trên?
A. float B. bool C. int D. str
Câu 14: Khi thực hiện câu lệnh x = input(" nhập giá trị x:") bạn Lan gõ vào số 5. Câu lệnh
tiếp theo là print(2*x) sẽ cho kết quả như thế nào?
A. 10   B. 2*x  C. `55`   D. Thông báo câu lệnh sai.
Câu 15: Cách khởi tạo các biến nào sau đây không trả về kiểu dữ liệu là số thực?
A. a = float(4) B. b = 5.12 C. c = int(3.5) D. d = -5.0
Câu 16: Trong NNLT Python, để nhập 1 số nguyên từ bàn phím cho biến n, ta chọn câu lệnh
nào?
A. input(‘Nhập số nguyên n: ’,n) B. n=int(input(‘Nhập số nguyên n: ’))
C. n=int(‘Nhập số nguyên n: ’)  D. n:=int(input(‘Nhập số nguyên n: ’))
Câu 17: Cho đoạn lệnh sau:
## N = 3
## N = (5+N)**2+10
print (N)
Kết quả in ra màn hình:
## A. 26  B. 64  C. 74  D. 25

Câu 18: Lệnh xuất kết quả ra màn hình trong Python là:
A. print   B. input   C. prints  D. pritn
Câu 19: Để đưa ra màn hình dòng chữ “Xin chao” trong Python ta dùng lệnh:
A. print (Xin chao) B. print ("Xin chao") C. input (Xin chao) D.    input    ('Xin
chao')
Câu 20: Cho đoạn chương trình sau:
a = b = 1
c, d = 1,2
print(a+b+c+d)  Kết quả in ra màn hình là:
## A. 3   B. 4    C. 5    D. 6
Câu 21: Trong NNLT Python, để nhập số thực cho biến n. Câu lệnh nào đúng?
A. n=input(‘Nhập 1 số thực:’)   B. n=int(input(‘Nhập    1    số
thực:’))
C.  n=float(input(‘Nhập 1 số thực:’)) D. float(input(‘Nhập   số thực
n:’))
Câu 22: Output của lệnh print (3 >=3) ra kết quả:
## A. 3 >=3   B. True   C. False   D.
## None
Câu 23: Để khai báo thư viện toán học trong Python ta viết:
A. import B. math C. import_math D. import math
Câu 24: Kết quả của câu lệnh sau:    import math
abs (math.sqrt(25))
## A. Error   B. -5    C. 5    D. 5.0
Câu 25: Để nhập 2 số nguyên a, b (mỗi số trên 1 dòng) trong Python ta dùng lệnh:
A. a=int(input())
b=int(input())
B.  a=float(input())
b=float(input())

Tin học 10 67
C. a,b=map(int,input().split()) D.
a,b=map(float,input().split())
Câu 26: Để nhập 2 số thực a, b (trên cùng 1 dòng) trong Python ta dùng lệnh:
A. a=int(input())
b=int(input())
B.  a=float(input())
b=float(input())
C. a,b=map(int,input().split()) D.
a,b=map(float,input().split())
Câu 27: Hàm nhập dữ liệu vào từ bàn phím input( ) trả về kiểu dữ liệu nào sau đây?
A. kiểu logic  B. kiểu số  C. kiểu xâu  D. bất kì kiểu nào
## CÂU HỎI TỰ LUẬN
Bài tập 1.
Tiền điện được tính như sau: Mỗi 1 kW
sau 100  kW đầu tiên phải trả thêm
10% đơn giá điện quy định. Em hãy viết
chương trình tính tiền điện, trong đó
đơn giá và lượng điện tiêu thụ ( lớn hơn
100 kW) là các số nguyên được nhập
vào từ bàn phím.
Đáp án:


## BÀI 19: CÂU LỆNH RẼ NHÁNH IF
## HÌNH THÀNH KIẾN THỨC
## 1. RẼ NHÁNH
− Một việc được thực hiện hay không phụ
thuộc vào một điều kiện thì ta thể hiện
bằng câu mệnh đề có dạng điều kiện:
o Dạng thiếu:  Nếu ... thì ...
Ví dụ 1: Nếu a chia hết cho 2 thì a
là số chẳn
o Dạng đủ:  Nếu ... thì ... ngược
lại...
Ví dụ 2: Nếu a chia hết cho 2 thì a
là số chẳn ngược lại a là số lẻ
− Trong lập trình, cấu trúc dùng để mô tả
các mệnh đề có dạng như trên gọi là: cấu
trúc rẽ nhánh thiếu và đủ
## 2. LỆNH IF
q) Câu lệnh rẽ nhánh dạng thiếu
− Cú pháp:

− Trong đó:
o <Khối lệnh>: là một câu lệnh (không cần xuống hàng mà viết sau dấu “:”) hoặc nhiều
câu lệnh được viết lùi vào (bằng 1 Tab hay 4 dấu cách) và thẳng hàng.
o <Điều kiện>: là biểu thức quan hệ hoặc biểu thức logic
if <điều kiện>:
<Khối lệnh>
Sau điều kiện cần có dấu hai chấm “:”
Nhóm, khối lệnh tiếp theo cần viết lùi vào
(bằng 1 Tab hay 4 dấu cách) và thẳng hàng
## Lệnh 1 Lệnh 2
## Đúng
Điều kiện
## Sai
Hình 19.1 Sơ đồ khối của cấu trúc rẻ nhánh

Tin học 10 68
▪ Biểu thức quan hệ: là dùng phép toán quan hệ (==, >, <, >=, <=, !=) để so sánh
hai đại lượng. Vd: xem nội dung Bài 17, mục 2b
▪ Biểu thức lôgic đơn giản là biến lôgic (kiểu bool) hoặc lôgic (True hoặc False)
▪ Biểu thức lôgic là các biểu thức logic đơn giản, các biểu thức quan hệ liên kết với nhau bởi
phép toán logic (and, or, not). Vd: xem nội dung Bài 17, mục 2c
▪ Giá trị trả về của biểu thức logic và biểu thức quan hệ là True hoặc False
− Thực hiện lệnh:
Python sẽ kiểm tra <điều kiện> nếu đúng thì thực
hiện <khối lệnh>, ngược lại thì bỏ qua chuyển
sang lệnh tiếp theo sau lệnh if.
− Chạy chương trình cho biết kết quả xuất ra màn
hình:
## Câu 1:
x, y = 5, 10
if x > y:
x+=1
y+=1
print('x =', x, '; y =', y)
A. x = 6 ; y = 10  B. x = 5 ; y
## = 10
C. x = 5 ; y = 11  D. x = 6 ; y
## = 11
## Câu 2:
x, y = 5, 10
if x <= y:
x+=1
y+=1
print('x =', x, '; y =',
y)

A. x = 6 ; y = 10
B. x = 5 ; y = 10
C. x = 5 ; y = 11
D. x = 6 ; y = 11
− VD: Dùng cấu trúc rẻ nhánh dạng thiếu để mô tả các mệnh đề rẽ nhánh sau:
(1)  Nhập diem
Nếu  diem >= 23.5
thì xuất ra thông báo “đậu THPT Phú
## Nhuận”
## ...................................................................
## ...................................................................
## ...................................................................
(2)  Nhập DTB
Nếu  6.5 <= DTB <8.0
thì xuất ra thông báo “học lực khá”
## ...................................................................
## ...................................................................
## ...................................................................
(3) Nếu a chia hết cho 2 thì a là số chẳn

## ...................................................................
## ...................................................................
(4) Nếu a không chia hết cho 2 thì a là số
lẻ

## ...................................................................
## ...................................................................
r) Câu lệnh rẽ nhánh dạng đủ
− Cú pháp:

if <điều kiện>:
<Khối lệnh 1>
else:
<Khối lệnh 2>
## Khối Lệnh
## Đúng
Điều kiện
## Sai
Hình 19.2 Cấu trúc rẻ nhánh
dạng thiếu
- Từ khóa if và else cần viết thẳng lề trái
- Các khối lệnh 1 và khối lệnh 2 cần viết
lùi vào (bằng 1 Tab hay 4 dấu cách)
và thẳng hàng


Tin học 10 69
− Thực hiện lệnh:
Python sẽ kiểm tra <điều kiện> nếu
đúng thì thực hiện <khối lệnh 1>,
ngược lại thì thực hiện <khối lệnh 2>.
− Chạy chương trình cho biết kết quả xuất ra
màn hình:
## Câu 1:
x, y = 5, 10
if x <= y:
x+=1
else:
y+=1
x+=2
print('x =', x, '; y =', y)
A. x = 6 ; y = 10  B. x = 7 ; y = 11
C. x = 8 ; y = 10  D. x = 5 ; y = 11
## Câu 2:
x, y = 5, 10
if x > y:
x+=1
else:
y+=1
x+=2
print('x =', x, '; y =', y)

A. x = 6 ; y = 10
B. x = 7 ; y = 11
C. x = 8 ; y = 10
D. x = 5 ; y = 11

− VD: Dùng cấu trúc rẻ nhánh dạng thiếu để mô tả các mệnh đề rẽ nhánh sau:
(1)  Nhập a
Nếu a chia hết cho 2
thì a là số chẳn
Ngược lại a là số lẻ
## ...................................................................
## ...................................................................
## ...................................................................
## (2)  Nếu Delta <0
thì PT vô nghiệm
ngược lại  PT có nghiệm.
## ...................................................................
## ...................................................................
## ...................................................................
s) Cấu trúc if lồng nhau
− Cú pháp:



## THỰC HÀNH
Bài toán 1: Giả sử giá điện sinh hoạt trong khu vực gia đình em ở được tính luỹ kế theo
từng tháng như sau (giá tính theo từng kWh điện tiêu thụ).
− Với mức điện tiêu thụ từ 0 đến 50 kWh, giá thành mỗi kWh là 1,578 nghìn đồng
− Với mức từ 51 đến 100, giá thành mỗi kWh là 1,734 nghìn đồng
if <điều kiện>:
<khối lệnh 1>
elif <điều kiện n>:
<khối lệnh 2>
else:
<khối lệnh 3>
## Khối Lệnh 1 Khối Lệnh 2
## Đúng
Điều kiện
## Sai
Hình 19.3 Cấu trúc rẻ nhánh dạng đủ
Ví dụ: Nhập x. Nếu x lớn hơn 0 thì thông báo x là số
dương, nếu x < 0 thì thông báo x là số âm, ngược lại
thông báo x=0.
x = float(input('Hãy nhập số x: '))
if ...............:
print(x, 'là số dương')
elif ...............:
print(x, 'là số âm')
else:
print('x = 0')

Tin học 10 70
− Từ mức 101 trở lên, giá thành mỗi kWh là 2,014 nghìn đồng.
Viết chương trình nhập số điền tiêu thụ trong tháng của gia đình em và tính số tiền điện phải
trả.
❖ Hướng dẫn.
− Gọi k là số kWh điện tiêu thụ của gia đình em. Khi đó theo cách tính lũy kế trên chúng ta
cần tính dựa trên các điều kiện sau:
+ Nếu k ≤ 50 thì số tiền cần trả là k x 1678 nghìn đồng.
+ Nếu 50 < k ≤100 thì số tiền cần trả là 50 × 1.678 + (k - 50) × 1734 nghìn
đồng.
+ Nếu 100 < k thì số tiền cần trả là 50 × 1678 + 50 × 1,734 + ( k - 100) × 2014
nghìn đồng.
− Chúng ta sử dụng lệnh round (t) để làm tròn số thực t. Chương trình có thể như sau:
k = ....................................
if   k<= 50: t=....................................
elif ....................................:    t=....................................
else:    t = ....................................
print('Số tiền điện phải trả là:',round(t), 'nghìn đồng')

Bài toán 2:  Giải phương trình bậc hai  ax
## 2
## +bx+c=0 (a0)
Giải phương trình bậc hai  ax
## 2
## +bx+c=0
## (a0)
- Xác định bài toán:
- Input: a, b, c   - Ouput: nghiệm
pt
- Xây dựng thuật toán
- Viết chương trình
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
## ...............................................................
- Bộ test chương trình
## INPUT OUTPUT
a b c Nghiệm
## 4 4 6 PTVN
1 4 4 Nghiệm kép
## 1 4 1
2 nghiệm phân
biệt

## LUYỆN TẬP
1.Viết biểu thức lôgic ứng với mỗi câu sau:
a) Số x nằm trong khoảng (0; 10)
b) Số y nằm ngoài đoạn [1; 2]
c) Số z nằm trong đoạn [0; 1] hoặc [5;
## 10]
## ...................................................................
## ...................................................................
## ...................................................................
- Tìm một vài giá trị m, n thoả mãn các biểu thức sau:
## Δ<0
if
## Đ
## S
elif
In ra PTVN
## Δ b
## 2
## -4ac
Nhập a, b, c
In ra PT có 2
nghiệm phân biệt
x1, x2
## Δ=0
## Đ
## S
else
In ra PT có
nghiệm kép
x1

Tin học 10 71
a) 100%m == 0 and n%5  !=0
b) m%100 == 0 and m%400  !=0
c) n%3 == 0 or (n%3  !=0 and n%4
## == 0)

## ...................................................................
## ...................................................................
## ...................................................................
## ...................................................................
## VẬN DỤNG
## 1.
- Giá bán cam tại siêu thị tính như sau:
nếu khối lượng cam mua dưới 5 kg thì
giá bán là 12.000 đồng/kg, nếu khối
lượng mua lớn hơn hoặc bằng 5 kg thì
giá bán là 10.000 đồng/kg.
Viết chương trình nhập số lượng mua
(tính theo kg) sau đó tính số tiền phải
trả
Đáp án:

- Năm n là năm nhuận nếu giá trị n
thoả mãn điều kiện: n chia hết cho 400
hoặc n chia hết cho 4 đồng thời không
chia hết cho 100. Viết chương trình
nhập số năm n và cho biết năm n có
phải là nhuận hay không

- Em hãy viết chương trình giải phương
trình bậc nhất dạng tổng quát ax + b =
c, các số a, b, c là các số thực được
nhập vào từ bàn phím.


## CÂU HỎI TRẮC NGHIỆM
Câu 1: Cho a=15, b=8. Hãy tính giá trị của a, b trong trường hợp sau?
if a > b:
a=b-a
b=a+2
else:
a=b-a
A.  a = 15, b = 8.
B.  a = -7, b = -5
C.  a = 5, b = -7.
D.  a = 5, b = -7.
Câu 2: Phát biểu nào sau đây có thể lấy làm biếu thức điều kiện trong cấu trúc rẽ nhánh?
A. A+B   B. A>B  C. A MOD 100  D. "A nho hon B"
Câu 3: Cho đoạn chương trình sau:
if (a!=0):
x=9 // a
else:
x=-1
print (‘ x= ’, x + 1)
Khi cho a=0, đoạn chương trình trên sẽ in ra màn hình giá
trị x=?
## A.  0   B.  -1
C.  1   D.  Không xác định
Câu 4: Khối lệnh trong đoạn chương trình: if <điều kiện>:
< khối lệnh>
A. Luôn thực hiện     B. Thực hiện khi điều kiện đúng
C. Thực hiện khi điều kiện sai   D. Điều kiện không tính được.
Câu 5: Đoạn chương trình:
if <điều kiện>:
<khối lệnh 1>
else:
<khối lệnh 2>
A. Thực hiện khối lệnh 1 khi điều kiện đúng
B. Thực hiện khối lệnh 1 khi điều kiện sai
C. Thực hiện khối lệnh 2 khi điều kiện đúng
D. Thực hiện khối lệnh 1 trước rồi đến khối lệnh 2
Câu 6: Trong ngôn ngữ lập trình Python, để điễn đạt rẽ nhánh ta dùng câu lệnh if - else, sau
if là <điều kiện> vậy điều kiện là?

Tin học 10 72
A.  phép toán logic    B.  Biểu thức số học
C.  Câu lệnh đơn    D.  Biến kiều bool, biều thức so sánh, biểu thức
logic
Câu 7: Đoạn chương trình:
## Max=a
if   b>Max:
## Max=b
Hãy cho biết đoạn chương trình bên dùng để?
A.  Tính giá trị a   B.  Tính giá trị b
C.  Tìm GTLN trong 2 số a và b D.  Tìm GTNN trong 2 số a và b
Câu 8: Câu lệnh ghép được sử dụng khi?
A. Cần nhiều lệnh đơn thực hiện một công việc B. Ghép nhiều câu lệnh thành một câu lệnh
C. Tác động của câu lệnh trước đó đến nhiều câu lệnh D. Cả ba trường hợp trên
Câu 9: Cho biết giá trị của T sau khi thực hiện đoạn chương trình sau:
## T=0
## A=5
## B=7
if A<B:
## T=T+A
else:
## T=T-A
print(T)

## A.  2    B.  7

## C.  5    D.  12

Câu 10: Đoạn chương trình:
if b>a:
## Max=b
else:
## Max=a
Hãy cho biết đoạn chương trình bên dùng để?
A.  Tính giá trị a    B.  Tính giá trị b
C.  Tìm giá trị lớn nhất trong 2 số a và b D.  Cả ba lựa chọn trên
Câu 11: Cho đoạn chương trình sau:
a=3
b=2
if a>b:
a=4
else:
b=1
Sau khi thực hiện đoạn chương trình bên đáp án nào đúng?
## A.  4    B.  3
## C.  2    D.  1

Câu 12: Dạng nào không phải là câu lệnh if – else trong Python:
A.  if <điều kiện> <câu lệnh> B.  if <điều kiện> <câu lệnh1> else <câu lệnh2>
C.  if <điều kiện> else <câu lệnh> D.  Cả 3 dạng trên đều sai
Câu 13: Cho a, b là các biến thực. Câu lệnh nào dưới đây tìm min là giá trị nhỏ nhất của a và
b?
A. if a<b:
min=a;
B.    if a<b:
min=a;
else:
min=b;
C. if a<b:
min=a
else:
min=b
D. if a<b:
min=a
else
min=b
Câu 14: Cho đoạn chương trình sau:
a=20
b=15
x=a
if a<b:
x=b
Kết quả x bằng bao nhiêu?
## A.  10   B.  15

## C.  20   D.  25

Câu 15: Cho đoạn chương trình:
if A>B:
## TG=A
## A=B
## B=TG
Với A=10 và B=5 thì kết quả của A, B sau khi thực hiện đoạn
chương trình bên là?
## A. A=10; B=5   B. A=15; B=10
## C. A= 5; B=10   D. A=10; B=10
Câu 16: Trong cấu trúc rẽ nhánh. Sau else phải:
A.  Phải có dấu chấm phẩy (;)    B.  Không có dấu gì hết
C.  Phải có dấu chấm(.)     D.  Phải có dấu hai chấm(:)
Câu 17: Cho s và i là biến nguyên. Khi chạy đoạn chương trình sau:

Tin học 10 73
s = 100
if s < = 100: s=s+1
print (s)
Kết quả xuất ra màn hình là:
## A. 55   B.101  C.11   D. 100
Cho 4 đoạn chương trình sau:








Câu 18: Đoạn chương trình 1 bên trên cho kết quả C là bao nhiêu?
## A.  0 B.  1 C.  2 D.  3
Câu 19: Lựa chọn kết quả màn hình của đoạn chương trình 2 bên trên:
A.  5 + 3 = 8  B.  m x m = 15 C.  m + n = 8  D.  5 x 3 = 15
Câu 20: Đoạn chương trình 3 bên trên khi chạy cho kết quả màn hình là?
A.  1 B.  2 C.  3 D.  Chương trình báo lỗi.
Câu 21: Chọn kết quả tren màn hình của đoạn chương trình 4 bên trên:
A.  8   B.  9   C.  10   D.  Chương trình báo lỗi
Câu 22: Đọan chương trình sau cho ra kết quả trên màn hình là gì?
a=0
if a>0:
a=1
print (a)
## A.  0
## B.  1
C.  không ra gì cả
D.  Báo lỗi vì không có else
Câu 23: Trong ngôn ngữ lập trình Python, muốn kiểm tra đồng thời cả 3 giá trị của A, B, C có
lớn hơn 0 hay không ta viết điều kiện sau if nào là đúng?
A.  if A, B, C >0:  ......    B.  if A and B and C >0: .......
C.  if (A>0) or (B>0) or (C>0): .......  D.  if (A>0 and B>0 and C>0): ........
Câu 24: Biểu thức nào sau đây cho kết quả True khi n là số lẻ?
A. n // 2 == 0  B. n % 2 ==1  C. n % 2 == 0  D. n // 2 == 1
Câu 25:  Câu lệnh nào sau đây đúng:
A.  if  (n % 2 < 0): print(''Day la so chan!'')
else:  print(''Day la so le!'')
B.  if  (n % 2 > 0): print(''Day la so chan!'')
else:  print(''Day la so le!'')
C.  if  (n % 2 == 0): print(''Day la so chan!'')
else:  print(''Day la so le!'')
D.  if  (n % 2 != 0): print(''Day la so chan!'')
else:  print(''Day la so le!'')
## BÀI 20: CÂU LỆNH LẶP FOR
## KHỞI ĐỘNG
− Em có thể đã gặp những trường hợp cần thực hiện một số công việc lặp đi lặp lại nhiều
lần.
Ví dụ
công việc nào cần phải
lặp
lặp lại bao nhiêu
lần
- Viết lên bảng tên tất cả các bạn
trong lớp có 30 học sinh

- Kiểm tra lần lượt các số từ 1 đến
50 và ghi ra các số chia hết cho 3
(chẳng hạn, 3, 6, 9,.......) rồi đếm
các số đó

− Ngôn ngữ lập trình bậc cao có các câu lệnh cho phép viết một cách ngắn gọn các bước
cần thực hiện lặp đi lặp lại để tạo thành một cấu trúc lập trình được gọi là cấu trúc lặp.
## A, B = 0, 0
if A>0:
## A=1
else:
## A=2
## B=1
## C=A+B
## 1
m=5
n=3
if m < n:
print( m , ‘ x ’ , n , ‘ = ‘, m*n )
else:
print( m , ‘ + ’ , n , ‘ = ‘, m+n )

## 2
a=0
if a>0
## X=1
## Y=2
else
## X=2
print(x)
## 3
a=8
if a>0:
a=a+1
else:
a=a+2
print(a)
## 4

Tin học 10 74
## HÌNH THÀNH KIẾN THỨC
## 1. LỆNH RANGE
− Hàm range() sẽ sinh ra một dãy số và bạn sẽ sử dụng vòng for để duyệt qua từng số
trong dãy đã sinh ra.
− Cú pháp:
− Các tham số:
▪ start: Giá trị bắt đầu của dãy số (mặc định là 0).
▪ stop: Giá trị cuối cùng của dãy số (cận này không được lấy – nghĩa là dãy sinh ra
sẽ đi từ         start đến stop -1)
▪ step: Bước nhảy của dãy số (mặc định là 1).

− Ví dụ:
+ range(100) là dãy số nguyên liên tục từ .................................... (dãy số tăng)
+ range(50) là dãy số nguyên liên tục từ ....................................
+ range(2,10) là dãy số nguyên liên tục từ ....................................
+ range(5,20) là dãy số nguyên liên tục từ ....................................
+ range(2,10,2) là dãy các số nguyên ....................................
+ range(5,20,5) là dãy các số nguyên ....................................
+ range(100,0,-1) là dãy số nguyên  .................................... (dãy số giảm)
+ range(10, 1, -2) là dãy các số nguyên ....................................
+ range(100, 1) cho vùng rỗng.
## 2. LỆNH LẶP FOR
− Cú pháp:

− Trong đó:
▪ <chuỗi lặp> là chuỗi cần lặp có thể là chuỗi, danh sách (kiểu list) hoặc dãy
số.
▪ <biến lặp> là biến nhận giá trị của từng mục bên trong <chuỗi lặp> trên
mỗi lần lặp. Vòng lặp sẽ tiếp tục cho đến khi nó lặp tới mục cuối cùng trong
<chuỗi lặp>
▪ <Khối lệnh>  có thể là một câu lệnh (không cần xuống hàng mà viết sau dấu “:”)
hoặc nhiều câu lệnh được viết lùi vào (bằng 1 Tab hay 4 dấu cách) và thẳng hàng.












range (stop) trả lại vùng giá trị từ 0 đến stop - 1
range (start, stop) trả lại vùng giá trị từ start đến stop - 1
for <biến lặp> in <chuỗi lặp>:
<Khối lệnh>
range (start, stop, step)
## Khối Lệnh
i = 0
i = i + 1
i < n -1
## Đúng
## Sai
for i in range(n):
<Khối lệnh>

Tin học 10 75
Chương trình Kết quả
Vd 1: Xuất ra màn hình dãy số từ 0 đến 4
## .........................................................
## .........................................................
## 0, 1, 2, 3, 4,
Vd 2: Xuất ra màn hình 5 lần câu “Xin chào”
## .........................................................
## .........................................................
Xin chào
Xin chào
Xin chào
Xin chào
Xin chào
Vd 3: Xuất ra màn hình các số từ 1 đến 10
## .........................................................
## .........................................................
## 1 2 3 4 5 6 7 8 9 10
Vd 4: Xuất ra màn hình dãy số từ 0 đến n-1. Với n nhập từ
bàn phím
## .........................................................
## .........................................................
## .........................................................
## .........................................................
Nhập n: 10
## 0, 1, 2, 3, 4, 5, 6, 7,
## 8, 9,
Vd 5: Xuất ra màn hình dãy số chẵn từ 1 đến 10.
## .........................................................
## .........................................................
## .........................................................
## .........................................................
## 2, 4, 6, 8, 10
Vd 6: Xuất ra màn hình dãy số chẵn từ 1 đến n. Với n nhập
từ bàn phím.
## .........................................................
## .........................................................
## .........................................................
## .........................................................
n = 7
## 2, 4, 6
Vd 7: Xuất ra màn hình dãy số chia hết cho 3 và chia hết
cho 5  từ 1 đến n. Với n nhập từ bàn phím.
## .........................................................
## .........................................................
## .........................................................
## .........................................................
n = 50
## 15, 30, 45
Vd 8: Tính tổng các số tự nhiên nhỏ hơn n (0+1+2+3+...+
n-1) . Xuất tổng ra màn hình
## .........................................................
## .........................................................
## .........................................................
## .........................................................
## .........................................................
## .........................................................
Nhập n: 6
Tổng các số là 15
Vd 9: Tính tích các số từ 1 đến n
## .........................................................
## .........................................................
## ....................................................
## .........................................................
n = 4
Tích các số là 24


Tin học 10 76
## .........................................................
## .........................................................
Vd 10: Tính tổng các số tự nhiên chẳn nhỏ hơn n. Xuất
tổng ra màn hình
## .........................................................
## .........................................................
## .........................................................
## .........................................................
## .........................................................
## .........................................................
## .........................................................
Nhập n = 5
Tổng các số chẵn là 6
Vd 11: Nhập số nguyên n. In ra màn hình các số từ 1 đến
n. Tính tổng các số.
## .........................................................
## .........................................................
## ....................................................
## .........................................................
## .........................................................
## .........................................................
## .........................................................
n = 5
## 1 2 3 4 5
Tổng là: 15
Vd 12: Đếm có bao nhiêu số là bội của 3 trong dãy số tự
nhiên nhỏ hơn n. Xuất đếm ra màn hình
n = int(input ("Nhập n: "))
dem = 0
for i in range(n):
## .............................................
## ...................................................
print(...............................................................)
Nhập n: 10
Số chữ số là bội của 3
là: 4
## (0, 3, 6, 9)
Vd 13: In từng ký tự trong chuỗi “tin”
## .........................................................
## .........................................................
## ....................................................
## .........................................................
Ký tự hiện tại: t
Ký tự hiện tại: i
Ký tự hiện tại: n
Vd 14: Lặp theo danh sách (list)
## .........................................................
## .........................................................
## ....................................................
## .........................................................
Tôi yêu bố
Tôi yêu mẹ
Tôi yêu em

Vd 15: Tính tổng tất cả các số trong danh sách A:    A =
## [1, 7, 10]
## .........................................................
## .........................................................
## ....................................................
## .........................................................
## .........................................................
Tổng các số là: 18
Vd 16: Đếm có bao nhiêu số lẻ trong danh sách A:  A =
## [1, 7, 10]
## .........................................................
## .........................................................
Số chữ số lẻ là 2

Tin học 10 77
## ....................................................
## .........................................................
## .........................................................
## .........................................................


## THỰC HÀNH
Nhiệm vụ 1.
Nhập số tự nhiên n từ bàn phím và in ra
màn hình dãy các ước số của n theo chiều
ngang màn hình. Ví dụ nếu n=10 thì
chương trình sẽ in ra dãy số 1,2,5,10.
Hướng dẫn. Các ước số của n là các số tự
nhiên k thỏa mãn: n%k=0 (với k lần lượt
nhận giá trị từ 1 đến n). Muốn in các số
trên một hàng ngang cần dùng thêm tham
số end =  “ ” trong lệnh print ().
Đáp án:
n = ....................................
## ....................................
for ....................................
if  ....................................
print ....................................
Nhiệm vụ 2.
Nhập số tự nhiên n từ bàn phím và đếm số
các ước số thực sự của n. Ước số thực sự
của n là số tự nhiên k < n và là ước của n.
Hướng dẫn. Tương tự như chương trình ở
nhiệm vụ 1, điểm khác là cần đếm số các
ước số này và không tính n. Tạo một biển
có tên count để đếm số các ước số thực sự
của n.
Đáp án:
n = ....................................
## ....................................
count = 0
for ....................................
if  ....................................
count = .................................
print ....................................

## LUYỆN TẬP
- Đoạn chương trình sau in ra kết quả gì?
n = int(input("Nhập số tự nhiên  n:  " ))
## S = 0
for k in range (n+1):
S = S + k
print (S*S)
Chạy chương trình
Nhập số tự nhiên n: 5
Kết quả chương trình là:
## ....................................

- Viết đoạn chương trình tính tích 1× 2 × 3 ×...× n với n được nhập vào từ bàn phím.
n = int(input("Nhập số tự nhiên  n:  " ))
## S = 1
for k in range (n+1):
S = S * k
print(S)
## VẬN DỤNG
- Viết chương trình nhập từ
bàn phím số tự nhiên n và in
ra kết quả
## S = 1+
## 1
## 2
## +...+
## 1
## 푛


Đáp án:
n = ........................................................................
## S = 0
for ........................................................................
## S = ........................................................................
print(S)

Tin học 10 78
- Viết chương trình nhập từ
bàn phím số tự nhiên n và in
ra kết quả là tổng sau:
## S = 1
## 3
## +  2
## 3
## +...
## + 푛
## 3
## .
Đáp án:
n = ........................................................................
## S = 0
for ........................................................................
## S = ........................................................................
print(S)
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Vòng lặp nào trả về kết quả như cột bên trái dưới đây?
## 11111
## 22222
## 33333
## 44444
## 55555
A. for i in range(1, 6): print(i, i, i, i, i)
B. for i in range(1, 5): print(str(i) * 5)
C. for i in range(1, 6): print(str(i) * 5)
D. for i in range(0, 5): print(str(i) * 5)
Câu 2: Điền phần còn thiếu trong đoạn code để được out như cột bên trái dưới đây:
## 55555
## 44444
## 33333
## 22222
## 11111
for i in range(5, 0, ____ ): print(str(i) * 5)
## A. 0   B. None
## C. 1   D. -1

Câu 4: Trong NNLT Python, câu lệnh nào sau đây đúng khi in ra màn hình các số tự nhiên từ
0 đến 10 trên 1 dòng?
A. for i in range(9): print(i,end='')  B. for i in range(10): print(i,end='')
C. for i in range(11): print(i,end='')  D. for i in range(12): print(i,end='')
Câu 5: Trong NNLT Python, câu lệnh nào sau đây sai khi in ra màn hình các số tự nhiên từ 0
đến 10 trên 1 dòng?
A. for i in range(0,11,1): print(i,end='')  B. for i in range(11): print(i,end='')
C. for i in range(0,11): print(i,end='')  D. for i in range(11,1): print(i,end='')
Câu 6: Trong NNLT Python, câu lệnh nào sau đây đúng khi in ra màn hình các số tự nhiên từ
10 đến 0 trên 1 dòng?
A. for i in range(10,0,-1): print(i,end='')  B. for i in range(10,-1): print(i,end='')
C. for i in range(10,-1,-1): print(i,end='')  D. for i in range(10,1,-1): print(i,end='')
Câu 7: Cho đoạn chương trình sau:
s=0
for i in range(5):
s=s+i
Sau khi thực hiện, giá trị của s bằng bao nhiêu?
## A. 5   B. 10
## C. 0   D. 15
Câu 8: Đoạn chương trình  for i in range(5): print(i,end='')  cho kết quả là:
## A. 1234  B. 12345  C. 01234  D. 012345
Câu 9: Đoạn chương trình sau cho kết quả là gì?
for i in range(10):
if i%2==0:
print(i,end='')
## A. 02468 B. 13579
## C. 2468 D. 246810

Câu 10: Đoạn chương trình for i in range(0,10,2): print(i, end='')  cho kết quả gì?
## A. 2468 B. 13579 C. 02468 D. 246810
Câu 12: Đoạn chương trình for i in range(9, 0, -1): print(i,end='') cho kết quả gì?
## A. 123456789 B. 987654321 C. 02468 D. 86420
Câu 13: Hãy cho biết dãy các số được tạo ra của hàm range(2,6,2)?
## A. 2, 3, 4, 5 B. 2, 4 C. 1, 2, 3 D. 2, 4, 6
Câu 14: Cho đoạn chương trình:
## S= 0
for  i in range(3,7):
S = S + 10 // i
print(S)
Kết  quả của  S  sau  khi  thực  hiện đoạn chương
trình trên?
## A. 18   B. 8
## C. 9   D. 14
Câu 15: Cho đoạn chương trình:

Tin học 10 79
## S=0
for i in range(1,11,2):
if (i % 3) == 0:
S= S + i
print(S)
Kết quả của S sau khi thực hiện đoạn chương trình
trên là:
## A. 31   B. 30

## C. 34   D. 12

Câu 16: Trong NNLT Python, câu lệnh lặp với số lần biết trước là:
A. if   B. while   C. for    D. include
Câu 17: Khi thực hiện câu lệnh:  for  i in range(7,12):  print(‘Hello World’)  thì trên màn hình
sẽ xuất hiện bao nhiêu dòng chữ “Hello World” trên màn hình?
## A. 12   B. 6    C. 5    D. 7
Câu 18: Cho đoạn lệnh sau:
for i in range(5):
print(i,end= ' ')
Trên màn hình kết quả xuất hiện:
## A. 0 1 2 3 4 5 B. 1 2 3 4 5 C. 0 1 2 3 4 D.  1  2  3
## 4
Câu 19: Hày chọn dãy số do hàm range(1,10,2)tạo ra:
## A. 1,3,5,7,9 B. 1,2,3,4,5,6,7,8,9,10 C. 1,3,5,7,9,10  D.
## 1,3,5,7,10
Câu 20: Cho đoạn chương trình sau:
s=0
for i in range(6):
s=s+i
Sau khi thực hiện đoạn chương trình bên giá trị của s là:
## A. 1   B. 15
## C. 6   D. 21
Câu 21: Cho đoạn chương trình sau:
s=0
for i in
range(1,7,2):
s=s+i
Sau khi thực hiện đoạn chương trình bên giá trị của s là:
## A. 9 B. 15
## C. 6 D.  21
## CÂU HỎI TỰ LUẬN
Bài tập 1. Kết quả thực hiện câu lệnh for  dưới đây là gì
for i in range (10):  ........................................................................
print (i*i)  ........................................................................

Bài tập 2. cho đoạn chương trình sau :
sum = 0
for i in range (1,11):
sum = sum + i*i
print (sum)
a) Kết quả  thực hiện các câu lệnh trên là gì ?
....................................................................................................................
b) Nếu thay câu lệnh for i in range (1,11) bằng câu lệnh for i in range (11)
thì kết quả  thu được có thay đổi không? vì sao ?
....................................................................................................................
....................................................................................................................
....................................................................................................................
- Viết chương trình giải bài
toán dân gian :
" Vừa gà vừa chó
bó lại cho tròn
Ba mươi sáu ( 36) con
Một trăn (100) chân chẵn
Hỏi có mấy gà mấy chó ? "


Tin học 10 80
- Viết chương trình giải bài
toán dân gian  TRĂM TRÂU
## TRĂM CỎ
" Trâu đứng ăn năm
Trâu nằm ăn ba
Lụ khụ trâu già
Ba con một bó
Trăm con ăn cỏ
Trăm bó no nê
Hỏi có bao nhiêu trâu đứng,
trâu nằm, trâu già ?

## BÀI 21: CÂU LỆNH LẶP WHILE
## HÌNH THÀNH KIẾN THỨC
## 1. LỆNH WHILE
− Lệnh lặp while thực hiện khối lệnh với số lần lặp không biết trước. Khối lệnh lặp được
thực hiện cho đến khi <điều kiện> = False thì ngưng lặp
− Cú pháp:


− Trong đó:
▪ <điều kiện> là biểu thức lôgic
▪ <Khối lệnh>  có thể là một câu lệnh (không cần xuống hàng mà viết sau dấu “:”)
hoặc nhiều câu lệnh được viết lùi vào (bằng 1 Tab hay 4 dấu cách) và thẳng hàng.
− Thực hiện lệnh: Python sẽ kiểm tra <điều kiện>, nếu đúng thì thực hiện khối
lệnh lặp, nếu sai thì kết thúc lệnh while
− Số lần lặp của lệnh while phụ thuộc vào điều kiện của lệnh.

− Ví dụ 1: Tính tổng các số tự nhiên đầu
tiên sao cho tổng này nhỏ nhất và lớn hơn
## 100
## S=0
k=0
while S<100:
S=S+k
k=k+1
print (S)

− Ví dụ 2: Thực hiện các lệnh sau. Kết quả sẽ in ra những số nào?
>>> k = 2
>>> while k < 50:
print(k, end = "
## ")
k = k + 3
Giải thích: Vòng lặp while sẽ dừng khi
k vượt quá 50. Bắt đầu vòng lặp. k = 2.
Sau mỗi bước lặp k tăng lên 3 đơn vị.
Do vậy, kết quả sẽ phải in ra dãy sau:
## 2 5 8 11 14 17 20 23 26 29 32 35 38 41
## 44 47
while <điều kiện>:
<Khối lệnh>
❖Lưu ý: Để thoát khỏi một vòng lặp vô hạn. Khi thực thi chương trình Python ta sử dụng tổ hợp
phím Ctrl + C.
Khối lệnh
Điều kiện
## Đúng
## Sai
Thoát khỏi vòng lặp while
S=S+k
k=k+1

## S<100
## Đúng
## Sai

Tin học 10 81


## BÀI TẬP
- Lệnh while kiểm tra điều kiện trước hay sau khi thực hiện khối lệnh lặp?
– Trả lời: Lệnh while kiểm tra điều kiện trước khi thực hiện khối lệnh lặp.
- Viết đoạn chương trình tính tổng 2 + 4 + ... + 100 sử dụng lệnh while
n = ........................................................................
s = ........................................................................
for ........................................................................
if ........................................................................
s = ........................................................................
print........................................................................

## 2. CẤU TRÚC LẬP TRÌNH
− Ba cấu trúc lập trình cơ bản của các ngôn ngữ lập trình bậc cao gồm: cấu trúc tuần
tự, cấu trúc rẽ nhánh, cấu trúc lặp.


## THỰC HÀNH
Nhiệm vụ 1. Viết chương trình in toàn bộ dãy các số tự nhiên từ 1 đến 100 trên một hàng
ngang
k = ........................................................................
while  ........................................................................
❖ Lưu ý:
- Vì lệnh while không biết trước số lần lặp, mà phụ thuộc vào điều kiện. Do đó, cần chú ý
đến điều kiện của lệnh while để tránh bị lặp vô hạn.
- Trong trường hợp nếu muốn dừng và thoát ngay khỏi vòng lặp while hoặc for có thể dùng
lệnh break
>>> for k in range(10):
print(k, end = " ")
if k == 5:  break
Kết quả chương trình:
## 0 1 2 3 4 5




Tin học 10 82
k =
## ........................................................................
print(k, end = ' ')
Nhiệm vụ 2. Viết chương trình in ra màn hình dãy các chữ cái tiếng Anh từ “A” đến “Z” theo
ba hàng ngang trên màn hình, hai hàng ngang đầu có 10 chữ cái, hàng thứ ba có 6 chữ cái.
− Hướng dẫn: Do các chữ cái tiếng Anh từ A đến Z chiếm các vị trí từ 65 đến 90 trong bảng
mã ASCII. Với số thứ tự k của bảng mã ASCII, ta sử dụng lệnh chr(k) trả lại kí tự tương
ứng trong bảng mã này
i = ........................................................................
k = 65  # bắt đầu từ số thứ tự của chữ cái A
while ........................................................................
i = ........................................................................
if i%10 == 0: print(chr(k))
else:
print(chr(k), end = ' ')
k = k + 1
## LUYỆN TẬP
- Cho dãy số 1, 4, 7, 10, ... Viết chương trình in ra phần tử lớn nhất của dãy nhưng nhỏ
hơn 100
k = ........................................................................
while ........................................................................
s = ........................................................................
k = k + 3
print(s)
- Viết chương trình đếm trong dãy 100 số tự nhiên đầu tiên có bao nhiêu số thỏa mãn
điều kiện: hoặc chia hết cho 5 hoặc chia cho 3 dư 1.
## C = 0
k = 1
while ........................................................................
if ........................................................................: C = ........................................................................
k = ........................................................................
print(C)
## VẬN DỤNG
− Viết chương trình in ra các số tự nhiên
từ 1 đến 100 ra màn hình thành 10
hàng, mỗi hàng 10 số, có dạng như sau:
## 1  2  3 ...  10
## 11  12  ... 20
## ................
## 91 92 ...  100
## Giải:
i = ........................................................................
while ........................................................................:
if i!=0 and i%10 == 0: print(......)
else:
print(..............., end = ' ')
i = ........................................................................
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Trong câu lệnh While thì dãy câu lệnh nào chỉ được thực hiện khi điều
kiện còn?
A. True  B. True hoặc False  C. False  D. Khác 0
Câu 2: Trong câu lệnh While, ngay sau điều kiện sẽ là dấu nào?
## A. ;   B. ?    C. =    D. :
Câu 3: Cú pháp của câu lệnh lặp với số lần chưa biết trước là?
A. while <điều
kiện>:
<Khối lệnh>
B. while <điều kiện>
do
< Khối lệnh>
C. while < Khối
lệnh>:
<điều kiện>
D. while < Khối lệnh>
do
<điều kiện>
Câu 4: Cho đoạn chương trình:

Tin học 10 83
s=0
i=10
while  i >= 1:
s = s + 2*i
i = i - 2
print(s)

Kết  quả của  s  sau  khi  thực  hiện đoạn chương
trình trên là:
## A. 60  B. 15
## C. 14  D. 28
Câu 5: Cho đoạn chương trình sau:
a = 12
b = 16
while a!=b:
if a>b:
a = a - b
else:
b = b - a

Sau khi thực hiện đoạn chương trình trên, giá
trị của a và b lần lượt là:
A. 4 và 48  B. 4 và 4
C. 16 và 12  D. 12 và 16
Câu 6: Tính tống S = 1 + 2 + 3 + ... + n + ... cho đến khi S>109. Điều kiện nào
sau đây cho vòng lặp while là đúng:
## A. While S>=109:   B. While S =109:    C. While S <=109: D. While S !=109:
Câu 7: Cho đoạn chương trình sau:
s=0
i=1
while i<=5:
s=s+i
i=i+1
Sau  khi  thực  hiện  đoạn  chương  trình
trên giá trị của s là:
## A. 9  B. 15
## C. 5  D. 10
Bài tập 1. Số hoàn hảo là số tự nhiên có giá trị bằng tổng các ước thực sự của nó ( các ước số nhỏ
hơn chính nó). Ví dụ một vài số hoàn hảo :
## 6: 1+2+3 = 6
## 28: 1+2+4+7+14 = 28
## 496: 1+2+4+8+16+31+62+124+248 = 496
## 8128 : 1+2+4+8+16+32+64+127+254+508+1016+2032+4064=8128
Em hãy viết chương trình số hoàn hảo đầu tiên lớn hơn số tự nhiên  n được nhập vào từ
bàn phím.
......................................................................................................................................................
......................................................................................................................................................
......................................................................................................................................................
......................................................................................................................................................
......................................................................................................................................................
## BÀI 22: KIỂU DỮ LIỆU DANH SÁCH
## KHỞI ĐỘNG
- Em hãy liệt kê những kiểu dữ liệu cơ bản của Python đã học?
## ........................................................................
- Để lưu điểm môn tin của 45 em học sinh trong lớp thì khai báo như thế nào?
− Ta không thể khai báo 45 biến số thực để lưu điểm môn tin mà dùng kiểu dữ liệu
danh sách.
- Kiểu dữ liệu danh sách được dùng nhiều nhất trong Python là kiểu gì?
## − ........................................................................
- Em hãy tìm một số dữ liệu kiểu danh sách thường gặp trên thực tế?
− Danh sách các học sinh trong lớp, bảng điểm, danh sách học sinh được khen thưởng,
báo cáo các khoản thu, chi...

Tin học 10 84
## HÌNH THÀNH KIẾN THỨC
## 1. KIỂU DỮ LIỆU DANH SÁCH
t) Khái niệm kiểu danh sách – list
− List là kiểu dữ liệu danh sách (dãy, mảng) trong Python. Các phần tử của danh
sách có thể có các kiểu dữ liệu khác nhau.
− VD 1: Danh sách chữ cái, danh sách môn học, danh sách bài hát yêu thích,.....
u) Cách khai báo
− Cú pháp:


− Trong đó:
▪ <Tên list>: do người lập trình đặt
▪ <Các phần tử>: được nằm trong dấu ngoặc vuông [] và phân cách nhau bởi dấu
phẩy (,). Giá trị các phần tử có thể có kiểu dữ liệu khác nhau (int, float, str, bool... và
cả kiểu dữ liệu list)
− VD 2: Câu lệnh tạo danh sách     A = [1.5, 2, “Python”, “List”, 0, True
## ]
## Tên
list
Các phần tử trong list A
## A
## 1.5 2 Python List 0 True
## − VD 3:
## L1=[ ]
Danh sách .....................
## L2= [1, 2, 3, 4, 5]
Danh sách .....................
## L3= [‘a’, ‘b’, ‘c’, ‘d’]
Danh sách .....................
## L4= [1, ‘hello’, 3.5]
Danh sách gồm
## ...................................................
## L5= [[1, 2], [3, 4]]
Danh sách gồm các phần tử kiểu danh sách
## L6= [1, ‘hello’, [2,
## ‘one’]]
Danh sách gồm nhiều kiểu khác nhau
v)  Cách truy cập các phần tử trong danh sách:
a. Cú pháp:

b. Trong đó:
▪ Chỉ số các phần tử được đánh số bắt đầu từ : 0, 1, 2...( Từ trái sang phải)
▪ Hoặc chỉ số các phần tử được đánh số âm bắt đầu từ: -1, -2, -3,..... (Từ phải sang
trái)
− VD 4:          A = [1.5, 2, “Python”, “List”, 0, True ]




print(A[1])
## .....................
print(A[-1])
## .....................
print(A[2:5])
## .....................
print(A[-3:-1])
## .....................
print(A[-5:3])
## .....................
print(A[:4])
## .....................
print(A[3:])
## .....................
print(A[6])
## .....................
Tên list Các phần tử trong list A
## A
## 1.5 2 Python List 0 True
Chỉ số 0 1 2 3 4 5
Chỉ số âm -6 -5 -4 -3 -2 -1
<Tên list> = [<phần tử 0>, <phần tử 1>,...., <phần tử n-1>]
<Tên list>[ chỉ số ]

Tin học 10 85
w) Các phép toán trên danh sách
Phép nối danh sách: Sử dụng dấu  “+”
< tên list > = < tên list 1> + < tên list 2> + ......< tên list n>
## VD 5: L1 = [1, 2, 3,]
## L2 = [‘a’, ‘b’, ‘c’]
## L3 = L1+ L2
print(L3)
# Kết quả chương trình:
## ........................................................................

Phép lặp danh sách: Sử dụng dấu  “*”
## VD 6: L1 = [1]*2
print(L1)
# Kết quả:..........................................
## L2 = [1, 2, 3,]*3
print(L1)
# Kết quả:.............................................
## BÀI 23: MỘT SỐ LỆNH LÀM VIỆC VỚI DỮ LIỆU DANH SÁCH
## HÌNH THÀNH KIẾN THỨC
## 2. DUYỆT DANH SÁCH VỚI TOÁN TỬ IN
a) Kiểm tra sự tồn tại của một giá trị trong danh sách:
Cú pháp:


=> Trả về giá trị  True nếu <Giá trị> thuộc <Tên list>, ngược lại trả về giá trị  Flase
VD1:  traicay= ["tao", "le", "man"]
print ("tao" in traicay) # Kết quả: True
print ("oi" in traicay)   # Kết quả: False
b) Duyệt từng phần tử của danh sách:
Phân tích và cho biết giá trị của k trong các đoạn lệnh sau:
## A = [10, 11, 12, 13, 14,
## 15]
for k in range(6):
print(A[k], end=" ")
## A 10 11 12 13 14 15
k 0 1 2 3 4 5
## Phần
tử
## A[k]
## A[0] A[1] A[2] A[3] A[4] A[5]

## A = [10, 11, 12, 13, 14,
## 15]
- for k in A:
print(k, end=" ")
## A 10 11 12 13 14 15
k 10 11 12 13 14 15

− Cú pháp duyệt từng phần tử của danh sách:


## BÀI TẬP
- Giả sử A = ["0", "1", "01", "10"]. Các biểu thức sau trả về giá trị đúng hay sai?
a. 1 in A    b. "01" in A
..................................................................................................................................
..................................................................................................................................
- Hãy giải thích ý nghĩa từ khóa in trong câu lệnh sau:
for i in range (10):
<các lệnh>
Từ khóa in chính là toán tử in
..................................................................................................................................
..................................................................................................................................
## CÁC THAO TÁC TRÊN DANH SÁCH:
<giá trị> in <danh sách>
for k in <danh sách>:
<khối lệnh lặp>

Tin học 10 86
x) Nhập một danh sách từ bàn phím:
Nhiệm vụ 1. Viết chương trình nhập một dãy số nguyên từ bàn phím.
❖ Cách 1 : Thêm phần tử vào danh sách bằng phép toán nối dánh sách
Chương trình nhập một dãy số nguyên Ý nghĩa
- a = []
- n = int(input('Nhập tổng số phần tử list: '))
- for i in range(n):
-     num=int(input('Nhập số thứ '+ str(i+1)+ ':
## '))
-     a = a + [num]
- print(a)
## ......................
## ......................
## ......................
## ......................
## ......................
## ......................
Cách viết khác, có thể thay câu lệnh ở dòng 4 thành 2 câu lệnh sau:
print('Nhập số thứ:',i+1)
num = int(input())
❖ Cách 2 : Thêm phần tử vào danh sách bằng phương thức append()

Ví dụ. Thêm phần tử vào cuối danh sách
## >>> A = [1,2]
>>> A. append(10)
## >>> A
Chương trình nhập một dãy số nguyên Ý nghĩa
- a = []
- n = int(input('Nhập tổng số phần tử list: '))
- for i in range(n):
-     num=int(input('Nhập số thứ '+ str(i+1)+ ':
## '))
-     a.append(num)
- print(a)
## ......................
## ......................
## ......................
## ......................
## ......................
## ......................
Cách viết khác, không cần có biến num,  gộp 2 câu lệnh 4, 5 thành một câu lệnh sau:
- Cách 1: a = a + [int(input('Nhập số thứ '+ str(i+1)+ ': '))]
- Cách 2: a.append(int(input('Nhập số thứ '+ str(i+1)+ ': ')))
y) Xuất các phần tử của danh sách:
Chương trình Ý nghĩa
Cách 1: Xuất toàn bộ danh sách
a = [2, 4, 3, 1, 5, 7, 8]
print("Danh sách a:",a)

## ......................................................
## ......................................................
Cách 2: Xuất từng phần tử trong danh sách
a = [2, 4, 3, 1, 5, 7, 8]
print("Danh sách a:")
for i in a:
print(i, end= "  ")

## ......................................................
## ......................................................
## ......................................................
## ......................................................
- Python có một số lệnh dành riêng (phương thức) cho dữ liệu kiểu danh sách. Cú
pháp các lệnh đó như sau:
<danh sách>.<phương thức>
- Lệnh thêm phần tử vào cuối danh sách là
<danh sách>.append( )


Tin học 10 87
Chương trình Ý nghĩa
Cách 3: Xuất phần tử theo chỉ số trong danh
sách
a = [2, 4, 3, 1, 5, 7, 8]
n=len(a)
print("Danh sách a:")
for i in range(n):
print(a[i], end= "  ")

## ......................................................
## ......................................................
## ......................................................
## ......................................................
## ......................................................
## BÀI TẬP
- Giải thích các lệnh ở mỗi câu sau thực hiện công việc gì?
a)
## >>> A = [7, -3, 5, -1, -6, 8, 0]
## >>> S = 0
>>> for i in range(len(A)):
if A[i] > 0:  S = S + A[i]
>>> print(S)
## TL:
............................................................................................................................
b)
## >>> A = [7, -3, 5, -1, -6, 8, 0]
## >>> C = 0
>>> for i in range(len(A)):
if A[i] > 0:  C = C + 1
>>> print(C)
## TL:
............................................................................................................................
- Cho dãy các số nguyên A, viết chương trình in ra các số chẵn của A.
## A = [7, -3, 5, -1, -6, 8, 0]
for i in range(len(A)):
if A[i]%2==0:
print(A[i]), end=“ “)
## THỰC HÀNH
Nhiệm vụ 2. Nhập một dãy số từ bàn phím. Tính tổng, trung bình của dãy và in
dãy số trên một hàng ngang
Cách 1 :  Nhập dãy số, đồng thời cộng dãy số Ý nghĩa
- a = []
## 2. T = 0
- n = int(input('Nhập tổng số phần tử list: '))
- for i in range(n):
-     a.append(int(input('Nhập số thứ '+ str(i+1)+ ':
## ')))
-     T = T + a[i]
- print(a)
- print('Tổng: ',T)
- print('Trung bình: ',T/n)
## .................
## .................
## .................
## .................
## .................
## .................
## .................
## .................
## .................
Cách 2 : Nhập dãy số xong, rồi thực hiện cộng dãy số Ý nghĩa
# Nhập dãy số
- a = []
- n = int(input('Nhập tổng số phần tử list: '))
- for i in range(n):
-     a.append(int(input('Nhập số thứ '+str(i+1)+':
## ')))
## .................
## .................
## .................
## .................
## .................
## .................

Tin học 10 88
- print(a)
# Tính tổng các số trong dãy
## 6. T = 0
- for i in a
-     T = T + i
- print('Tổng: ',T)
- print('Trung bình: ',T/n)
## ................
## ................
## ................
## ................
## ................
Nhiệm vụ 2. Nhập một dãy số từ bàn phím. Đếm có bao nhiêu số chẵn trong dãy
số
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
## 4. MỘT SỐ LỆNH LÀM VIỆC VỚI DANH SÁCH:
STT Hàm Ý nghĩa Ví dụ
## 1.
len(<tên list >)
Trả về độ dài của một danh
sách
## L4= [1, 'hello', 3.5]
print(len(L4))  → 3
## 2.
max (<tên list
## >)
Trả về giá trị của phần tử lớn
nhất trong danh sách.cùng
kiểu
## L1=[456, 700, 200]
print(max(L1)) → 700.
## 3.
min(<tên list >)
Trả về giá trị của phần tử
nhỏ nhất trong danh sách
cùng kiểu Ví dụ :  L=[1, 2,
5, 'ABC'] print(min(L)) →
báo lỗi
## L2=['ABC', 'B', 'C']
print(min(L2))→ ABC
## 4.
sum (<tên list>)
Trả về tổng các phần tử
trong danh sách (Nếu là
danh sách kiểu số)
## L1=[100, 600, 200]
print (sum(L1))→ 900
## 5.
del <tên
list>[chỉ số]
Thực hiện xóa phần tử có chỉ
số trong danh sách.


Có thể xóa 1 đoạn ví dụ:
## L=[1, 2, 3, 1, 4]
del L[2]
## →L1=[1,2,1,4]
## L1=[1, 2, 3, 5, 9, 8, 10]
del L1[1:3]
## →L1=[1, 5, 9, 8, 10]
## 6.
list.append( )
Thêm 1 phần tử vào cuối
danh sách.
sole = [1,3,5]
sole.append(7)
print(sole) → [1,3,5,7]
## 7.
list.extend( )
Thêm nhiều phần tử vào
cuối danh sách.
sole = [1,5,6]
sole.extend([3,8,6])
print(sole) →
## [1,5,6,3,8,6]

Tin học 10 89
STT Hàm Ý nghĩa Ví dụ
## 8.
list.count( )
Trả về số lần xuất hiện của
chuỗi con trong danh sách.
my = [3,8,1,6,0,8,4]
print (my.count(8))
## → 2
## 9.
list.sort( )
Sắp xếp các đối tượng trong
danh sách theo thứ tự tăng
dần.
list1 = [3,7,8,2,5]
list1.sort()
print(list1) → [2,3,5,7,8]
## 10.
list.reverse( )
Đảo ngược các phần tử
trong danh sách.
list2 = [8,7,5,9,2,1]
list2.reverse( )
print (list2) →
## [1,2,9,5,7,8]
## 11.
list.index( )
Trả về vị trí xuất hiện phần
tử trong danh sách.
my_list = [3,8,1,6,5,8,4]
print(my_list.index(6))
## → 3
## 12.
list.clear( )
Xóa hết phần tử trong danh
sách.
your_list =
## [4,5,6,2,8,2]
your_list.clear( )
print (your_list)
## →[ ]
## 13.
list.remove( )
Xóa phần tử có giá trị cho
trước trong danh sách
## A = [1,4,7,8,2,6]
A.remove(8) print (A)
## → [1,4,7,2,6]
## 14.
list.insert(vt,n)
Thêm phần tử n mới vào
danh sách
ở vị trí thứ vt
vowel = [‘a’,‘e’,‘i’,‘u’]
vowel.insert(3, ‘o’)
print(vowel)
## → [‘a’,‘e’,‘i’,‘o’,‘u’]

## LUYỆN TẬP
− Bài 1. Viết lệnh xóa phần tử cuối cùng của danh sách A bằng lệnh del
>>> del A[len(A)-1]
− Bài 2. Có thể thêm một phần tử vào đầu danh sách được không? Nếu có thì nêu cách
thực hiện.
## >>> A = [100] + A
## VẬN DỤNG
− Cho dãy số A. Viết chương trình tìm giá trị và chỉ số của phần tử lớn nhất của A.
Tương tự với bài toán tìm phần tử nhỏ nhất
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
Tính giá trị và chỉ số của pt lớn nhất:
max=.....................
k=.....................
for i in range(len(A)):
if.....................
max=.....................
k=.....................
print("Giá trị của pt lớn nhất: ", .........)
print("Chỉ số của pt lớn nhất: ", .........)
Tính giá trị và chỉ số của pt nhỏ nhất:


Tin học 10 90
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Trong NNLT Python, đối tượng L = [1, 23, “Hello”, 9] thuộc kiểu dữ liệu nào?
## A. List   B. Dictionary  C. Tuple   D. Array
Câu 2: Đâu là giá trị của color[2]?
color = [‘red’, ‘orange’, ‘yellow’, ‘green’, ‘blue’, ‘indigo’, ‘violet’]
A. orange B. indigo C. blue D. yellow
Câu 3: Cho đoạn chương trình dưới đây:
mylist = [1, 5, 9, int(‘0’)]
print (sum (mylist))
Kết quả sau khi chạy chương trình bên là:
## A. 16  B. 15  C. 63  D. False
Câu 4: Cho đoạn chương trình sau đây:
list1=[1, 3]
list2 = list1
list1[0] = 4
print (list2)
Kết quả sau khi chạy chương trình bên là:
## A. [4, 3]   B. [1, 3]
## C. [1, 4]   D. [1, 3, 4]

Câu 5: Kết quả của câu lệnh num = ‘5’ * ‘5’   là gì?
## A. 333 B. 27
C. 25 D. TypeError: can't multiply sequence by non-int of type 'str'
Câu 6: Đoạn chương trình sau cho kết quả gì?

A. x,s,i,e,m,a,n,y,m  B. m,y,n,a,m,e,i,s,x
C. m,y,n,a,m,e,i,s  D. m,,y,,n,,a,,m,,e,,i,,s,,x

Câu 7: Kết quả của đoạn chương trình sau là gì?

## A. 2,4,0,6  B. True
## C. [2,4,0,6]  D. (2,4,0,6)
Câu 8: Kết quả của đoạn chương trình sau là gì?

A. [False, True, False]  B. False
C. (False, True, False)  C. Error
Câu 9: Muốn tham chiếu đến 1 phần tử nào đó trong danh sách, ta cần phải có thông tin
nào?
A. Tên danh sách, chỉ số    B. Độ dài danh sách
C. Chỉ số của kí tự trong danh sách  D. Phải biết đó là kí tự gì trong danh sách
Câu 10: Chọn câu phát biểu đúng về dữ liệu kiểu danh sách:
A. Các phần tử trong danh sách được phân cách nhau bởi dấu phẩy (,).
B. Các phần tử trong danh sách được phân cách nhau bởi dấu chấm phẩy (;).
C. Các phần tử trong danh sách được phân cách nhau bởi dấu hai chấm (:).
D. Các phần tử trong danh sách được phân cách nhau bởi dấu cách.
Câu 11: Chọn câu phát biểu sai về dữ liệu kiểu danh sách:
A. Các phần tử trong danh sách có thể khác kiểu.
B. Các phần tử trong danh sách phân biệt bằng chỉ số.
C. Các phần tử trong danh sách được giới hạn bởi cặp ngoặc tròn ( ).
D. Cấu trúc của 1 danh sách rỗng empty = [ ]
Câu 12: Cách tham chiếu đến 1 phần tử trong danh sách:
A. Tên danh sách, tiếp theo là chỉ số được viết trong cặp dấu {và}.
B. Tên danh sách, tiếp theo là chỉ số được viết trong cặp dấu [và].
C. Chỉ số được đặt ngay sau tên danh sách.
D. Tên danh sách, tiếp theo là chỉ số được viết trong cặp dấu (và).
Câu 13: Muốn truy cập đến phần tử thứ 5 của danh sách A ta phải theo cú pháp:
## A. A[4]   B. A5    C. A[5]   D. A{5}
Câu 14: Trong NNLT Python, hàm insert(vt,n) thực hiện công việc gì?
A. Thêm n phần tử mới vào danh sách ở vị trí thứ vt.
B. Thêm phần tử n mới vào danh sách ở vị trí thứ vt.
C. Thêm vt phần tử mới vào danh sách ở vị trí thứ n.
D. Thêm phần tử vt mới vào danh sách ở vị trí thứ n.
Câu 15: Cho biết kết quả in ra màn hình của đoạn chương trình sau:

Tin học 10 91

A. [False, Error, True]  B. [True, Python,
## True]
C. [False, 'Python', True]  D. [False, Python,
## True]
Câu 16: Đoạn chương trình sau dùng để làm gì?

A. Xuất ra giá trị trung bình của list.
B. Xuất ra giá trị nhỏ nhất của list.
C. Xuất ra giá trị lớn nhất của list.
D. Xuất ra tổng các giá trị số trong list.

Câu 17: Đoạn chương trình sau dùng để làm gì?

A. Xuất ra giá trị trung bình của list.
B. Xuất ra giá trị nhỏ nhất của list.
C. Xuất ra giá trị lớn nhất của list.
D. Xuất ra tổng các giá trị số trong list.

## CÂU HỎI TỰ LUẬN
Bài tập 1. Giả sử danh sách được xác định như sau :     A = [ 1,2,3,10,"Việt",
true]
Em hãy cho  biết câu lệnh sau in gì ra màn hình:
print(A[2], A[4], A[5], len(A)]
Bài tập 2. Cho A = [7, -3, 5], cho biết kết quả các câu lệnh khi thực hiện theo thứ
tự gì?
a) del A[0]
## .....................
b) A = [0, 2] + A
## .....................
c) A = A + [15]
## .....................
d) A[1] = A[1] * 2
## .....................
Bài tập 3. Cho chương trình nhập vào một danh sách các số nguyên từ bàn phím. Xuất ra màn
hình số lượng các phần tử chẵn trong danh sách. Hãy ghi ý nghĩa từng dòng lệnh

Bài tập 4. Cho chương trình nhập vào một danh sách các số nguyên từ bàn phím. Xuất ra màn
hình phần tử lớn nhất trong danh sách. Hãy ghi ý nghĩa từng dòng lệnh
Chương trình Ý nghĩa
- n = int(input("Nhập n: "))
- a = []
- for i in range(n):
-      print('Nhập số
thứ:',i+1)
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
Chương trình Ý nghĩa
- n = int(input("Nhập n: "))
- a =[]
- for i in range(n):
-     print('Nhập số thứ:',i+1)
-     num = int(input())
-     a.append(num)
- dem = 0
- for i in range(n):
-      if(a[i]%2==0):
-             dem = dem+1
-  print ("Số lượng phần tử chẵn trong
list là:", dem )
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................


Tin học 10 92
-      num = int(input())
-      a.append(num)
## 7. Maxx=a[0]
- for i in range(n):
-      if(a[i]>Max):
## 10.      Maxx=a[i]
- print ("Số lớn nhất trong list
là:",Maxx)
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................
## ....................................................................

Bài tập 5. Cho A là danh sách được xác định như sau : A = [1, -2, -3.5, 4, 6, -2.5]. Em hãy cho
biết kết quả  thực hiện các câu lệnh sau :
a
s = 0
for i in range (len(A)):
if A[i] > 0
s = s + A[i]
print(s)
....................................................................................
....................................................................................
....................................................................................
....................................................................................
b
for i in range(len(A)):
## A[i] = A[i] + 3

....................................................................................
....................................................................................
c
k = 0
for i in range(1,4):
if A[i] < 0
k = k + 1
print (k)
....................................................................................
....................................................................................
....................................................................................

- Kết quả  khảo sát về tình hình thu nhập
của n ( n>0) gia đình được chọn ngẫu nhiên
ở một địa phương  được nhập vào từ bàn
phím vào hai danh sách : danh sách thứ nhất
là họ tên các chủ hộ , danh sách thứ hai là
thu nhập tương ứng của từng hộ gia đinh
theo đơn vị triệu đồng. Viết các câu lệnh
thực hiện việc tạo hai danh sách đó.


## LUYỆN TẬP

## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2, 3 SGK Trang 117, 118
Bài tập:
- Cho dãy số [1,2,2,3,4,5,5]. Viết lệnh thực hiện:
a. Chèn số 1 vào ngày sau giá trị 1 của dãy
b. Chèn số 3 và số 4 vào danh sách để dãy có số 3 và 4 liên nhau hai lần
- Cho trước dãy số A. Viết chương trình thực hiện công việc sau:
− Xóa đi một phần tử ở chính giữa dãy nếu số phần tử của dãy là số lẻ
− Xóa đi hai phần tử ở chính giữa của dãy nếu số phần tử của dãy là số chẵn.
- Khi nào thì lệnh A.append(1) và A.insert (0,1) có tác dụng giống nhau?
## ........................................................................
- Danh sách A trước và sau lệnh insert() là [1,4,10,0] và [1,4,10,5,0]. Lệnh đã dùng là gì?
## .....................

Tin học 10 93
- Viết chương trình nhập n từ bàn phím, tạo và in ra màn hình dãy số A bao gồm n số tự
nhiên chẵn đầu tiên
- Dãy số Fibonacci được xác định như sau:
## F
## 0
## = 0, F
## 1
## = 1, F
n
## = F
n-1
## + F
n-2
( với n>=2)
Viết chưng trình nhập n từ bàn phím, tạo và in ra màn hình dãy số A bao gồm n số hạng
đầu của dãy Fibonacci
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Cho danh sách: I = [2, 78, 5, 21]
Nếu muốn danh sách này đảo ngược thứ tự ta sử dụng phương pháp
nào?
A. I.reverse( )   B. reverse(I)     C. reversed(I)   D. I(reverse[ ])
Câu 2: Cho biết hàm remove trong đoạn chương trình sau dùng để làm gì?

A. Hoán đổi vị trí phần tử trong list  B. Xóa 1 phần tử khỏi list
C. Sao chép phần tử trong list   D. Di chuyển phần tử trong list đến 1 vị trí
khác
Câu 3: Để kiểm tra một giá trị có nằm trong danh sách hay không, ta dùng cú
pháp nào sau đây?
A. <giá trị> in <danh sách>     B. <danh sách> in <giá trị>
C. <giá trị> on <danh sách>     D. <giá trị> insert <danh sách>
Câu 15: Cho đoạn chương trình sau:

Kết quả in ra màn hình là:
A. [a, aa, aaa, b, bb]        B. ['a', 'aa', 'aaa', 'b', 'bb']
C. ['a', 'aa', 'aaa', 'b', 'bb', 'bbb']     D. None of the above
Câu 5: Lệnh A . append(x) dùng để làm gì?
A. Bổ sung phần tử x vào cuối danh sách.     B. Bổ sung phần tử x vào
đầu danh sách.
C. Bổ sung phần tử x vào giữa danh sách.     D. Xoá phần tử x từ danh
sách A.
Câu 6: Để xoá toàn bộ dữ liệu của danh sách A, dùng lệnh nào sau đây?
A. A . clear()  B. A . remove()  C. A . del()  D. A . append()
Câu 7: Lệnh A . insert(k,x) dùng để làm gì?
A. Chèn phần tử x vào vị trí k của danh sách A
B. Chèn phần tử k vào vị trí x của danh sách A
C. Chèn phần tử k và x vào danh sách A
D. Xoá phần tử k và x của danh sách A
Câu 8: Để xoá phần tử x từ danh sách A, câu lệnh nào sau đây đúng?
A. A . remove(x)  B. A . clear(x)  C. A . insert(x) D.
remove.A(x)
Câu 9: Các dòng lệnh sau đây cho kết quả là gì?

## A. [1]   B. [0]   C. [0,1]  D. [1,0]
Câu 10: Các dòng lệnh sau cho kết quả là dãy số nào?

## A. [1, 4, 10, 5, 0]     B. [1, 4, 10, 3, 0]

Tin học 10 94
## C. [1, 4, 10, 0, 5]    D. [1, 4, 10, 0, 3]

Câu 11: Danh sách A trước và sau lệnh insert() là [1,4,10,0] và [1,4,10,5,0]. Lệnh
đã dùng là gì?
A. Lệnh đã dùng là A.insert(3,5)   B. Lệnh đã dùng là A.insert(2,5)
C. Lệnh đã dùng là A.insert(4,5)     D. Lệnh đã dùng là A.insert(5, 3)
Câu 12: Xét đoạn chương trình sau:

Khi chạy chương trình, nếu nhập n=5 thì kết quả là:
## A. [0, 2, 4, 6, 8]  B. [2, 4, 6, 8] C. [1, 2, 3, 4, 5] D. [0, 2, 4, 6, 8, 10]
Câu 13: Đoạn chương trình sau cho kết quả là gì?

## A. A= [ ]  B. A= [1, 2, 3, 4, 5 ]  C. A= [2, 3, 4, 5 ]  D. A= [1, 2, 3, 4 ]
Câu 14: Cho đoạn chương trình sau:

Kết quả in ra màn hình là:
A. ['Tech', 404, 3.03, 'Beamers', 33.3]    B. [404, 3.03]
C. ['Tech', 3.03]       D. None of the above

## BÀI 24: XÂU KÍ TỰ
## KHỞI ĐỘNG
Viết chương trình nhập vào một số thập phân. Thực hiện in ra phần nguyên và phần
thập phân.
Vì khi in phần thập phân sẽ không đúng nên cần phải có dữ liệu xâu kí tự mới xử lý
được.
## HÌNH THÀNH KIẾN THỨC
## 1. XÂU LÀ MỘT DÃY CÁC KÍ TỰ

## XÂU KÝ TỰ DANH SÁCH
>>> S=“THPT phú Nhuận”
>>> len(S)
## 14
## >>> S[0]
## ‘T’
>>> S[len(S)-1]
## ‘n’
## >>> S[5]=“P”
## → Báo Lỗi
## >>> A=[3,4,5,”b”,”d”]
>>> len(A)
## 5
## >>>A[0]
## 3
>>>A[len(A)-1]
## ‘d’
## >>> A[3]=“B”
→ Không Báo Lỗi, thay
đổi “b” thành “B”
− Xâu kí tự là dãy các kí tự Unicode
1.Quan sát các vd trong SGK Trang 119 để biết cấu trúc kí tự, so sánh với danh sách để
biết sự khác nhau giữa xâu (string) và danh sách (list)
Hoạt động 1: Tìm hiểu cấu trúc của xâu kí tự

Tin học 10 95
− Độ dài của xâu kí tự chính là số lượng các kí tự trong xâu
− Xâu rỗng là xâu có độ dài bằng 0 (Vd: Tạo S là xâu rỗng: S=””)
− Truy cập từng kí tự của xâu qua chỉ số, chỉ số từ 0 đến độ dài len() -1
− Không thể thay đổi từng kí tự của xâu, trong khi có thể thay đổi giá trị
từng phần tử của danh sách
## BÀI TẬP
- Các xâu kí tự sau có hợp lệ không?
a) “123&*()+-ABC”   b) “1010110&0101001”
c) “Tây nguyên”    d) 11111111 = 256
- Mỗi xâu hợp lệ ở Câu 1 có độ dài bằng bao nhiêu?
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
## 2. LỆNH DUYỆT TỪNG KÍ TỰ CỦA XÂU:
Duyệt theo chỉ số của xâu:
for i in range(len(s)):
print(s[i],end="
## ")

i 0 1 2 3 4 5 6 7
## S: X I N  C H A O
## PT S[0] S[1] S[2] S[3] S[4] S[5] S[6] S[7]
Duyệt theo từng kí tự của xâu:
for ch in s:
print(ch,end=" ")

i
## S: X I N  C H A O
ch X I N  C H A O
 Chú ý: Từ khoá in, tuỳ trường hợp cụ thể:
- Toán tử lôgic dùng để kiểm tra một giá trị có
mặt hay không trong một vùng giá trị/danh
sách/xâu.

- Để chọn lần lượt từng phần tử
trong một vùng giá trị/danh
sách/xâu.

## LUYỆN TẬP

## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2 SGK Trang 121, 122
Bài tập:
- Cho xâu S, viết đoạn lệnh trích ra xâu con của S bao gồm ba kí tự đầu tiên của S.

- Viết chương trình kiểm tra xâu S có chứa chữ số không? Thông báo "S có chứa chứ số"
hoặc "S không chứa chữ số nào".
- Sau khi thực hiện các lệnh sau, biến skq sẽ có giá trị bao nhiêu?

skq=173
- Cho s1 = “abc”, s2 = “ababcabca”. Các biểu thức sau đây biểu thức nào cho kết quả sai?
A. “abc123” in s2    B. s1 in s2
C. s1 + s1 in s2       D. “abcabca” in s2?

Tin học 10 96

- Cho hai xâu S1, S2. Viết đoạn chương trình chèn xâu S1 vào giữa S2, tại vị trí len(S2)//2.
In kết quả ra màn hình.
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
- Viết chương trình số học sinh và họ tên học sinh. Sau đó đếm xem trong danh sách có
bao nhiêu bạn tên là "Hương"
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
- Cho xâu kí tự: "gà,vịt,chó,lợn,ngựa,cá". Em hãy trình bày cách làm để xóa dấu "," và
thay thế bằng dấu "  " trong xâu này.
- Viết chương trình nhập nhiều số (số nguyên hoặc số thực) từ bàn phím, các số cách
nhau bởi dấu cách. Sau đó in ra màn hình tổng các số đã nhập
- Viết chương trình nhập họ tên đầy đủ của người dùng, sau đó in thông báo tên và họ
đệm của người đó
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Biểu thức "" in "0123" _ trả lại giá trị gì?
A. True      B.  False    C. Báo lỗi      D. Số 1
Câu 2: Biểu thức logic sau trả kết quả nào?
"010" in "001100"
## A. True      B. False    C. 4        D. -1
Câu 3: Xâu rỗng là xâu có độ dài bằng:
## A. 0     B. 1      C. 2        D. 3
Câu 4: Để biết độ dài của xâu s, ta dùng hàm:
A. str(s)      B. len(s)    C. length(s)      D. s.len( )
Câu 5: Cho xâu s1 = 'ab', xâu s2 = 'a'. Câu lệnh s1 in s2 cho kết quả là:
A. true      B. True     C. false    D. False
Câu 6: Cho xâu st = 'abc'. Xâu st có độ dài là:
## A. 1      B. 2      C. 3   D. 4
Câu 7: Để khởi tạo xâu rỗng s, ta dùng lệnh:
A. s = '0'      B. s = ' '    C. s = [ ]      D. s = 0
Câu 8: Trong NNLT Python, xâu kí tự là:
A. Dãy các kí tự trong bảng mã ASCII.   B. Dãy các kí tự Unicode
C. Mảng các kí tự.
D. Tập hợp các chữ cái và các chữ số trong bảng chữ cái tiếng Anh.
Câu 9: Trong NNLT Python, phần tử đầu tiên của xâu kí tự mang chỉ số là?
A. 0    B. 1      C. Không có chỉ số    D. Do người lập trình khai
báo
Câu 10: Trong NNLT Python, xâu không có kí tự nào được gọi là?
A. Xâu rỗng  B. Xâu trắng    C. Xâu không   D. Không phải xâu
Câu 11: Cách tham chiếu đến một phần tử trong xâu:

Tin học 10 97
A. Tên xâu, tiếp theo là chỉ số được đặt trong cặp dấu {và}.
B. Tên xâu, tiếp theo là chỉ số được đặt trong cặp dấu [và].
C. Chỉ số được đặt ngay sau tên biến xâu.
D. Tên xâu, tiếp theo là chỉ số được đặt trong cặp dấu (và).
Câu 12: Muốn truy cập đến phần tử thứ 5 của xâu A ta phải theo cú
pháp:
## A. A[4]     B. A4       C. A(4)   D. A{4}
Câu 13: Cho biết giá trị của xâu s sau khi thực hiện các lệnh sau đây:
S = ‘Hoang Anh Tuan’ x = S[3:7]
L = len(x)
A.  ang     B. ng An      C. ang An    D. ng A
Câu 14: Có bao nhiêu cách duyệt từng kí tự của xâu?
## A. 2     B. 3     C. 4      D. 1
Câu 15: Phát biểu nào sau đây là sai?
A. Truy cập từng kí tự của xâu qua chỉ số, chỉ số từ 0 đến độ dài len()
B. Truy cập từng kí tự của xâu qua chỉ số, chỉ số từ 0 đến độ dài len() -1
C. Xâu kí tự trong Python là dãy các kí tự Unicode
D. Xâu có thể được coi là danh sách các kí tự nhưng không thay đổi từng kí tự của xâu
Câu 16: Đoạn chương trình sau cho kết quả là gì?

## A. 1 7 2     B. 8 1 7     C. 8 1 7 2     D. 7 2 3
Câu 17: Đoạn chương trình sau cho kết quả là:

## A. 4     B. 3      C. 5      D. 6
Câu 18: Đoạn chương trình sau cho kết quả là:

## A. 19     B. 18      C. 20      D. 21
Câu 19: Xét đoạn chương trình:

Kết quả hiển thị nào sau đây là đúng?
A. s có chứa chữ số      B. s không có chứa chữ số
## C. 2        D. 19

Tin học 10 98
## BÀI 25: MỘT SỐ LỆNH LÀM VIỆC VỚI XÂU KÍ TỰ
## HÌNH THÀNH KIẾN THỨC
## XÂU LÀ MỘT DÃY CÁC KÍ TỰ
Phép toán và lệnh Ví dụ
- Phép ghép xâu:
Cú pháp:
<xâu 1> + <xâu 2>+....<xâu n>
Xâu được tạo thành bằng cách ghép các xâu lại với
nhau
>>> S1="Lập trình"
>>> S2="Python"
>>> print( S1 + S2)
'Lập trình Python'
- Phép lặp xâu:
Cú pháp:   <xâu>*<số lần ghép>
Hoặc:     <số lần ghép>*<xâu>
>>> S="Python"
>>> print (S*3)
'PythonPythonPython'
- So sánh xâu:
Các phép so sánh xâu: bằng (==), khác (!=), lớn hơn
(>), bé hơn (<), bé hơn hoặc bằng (<=), lớn hơn hoặc
bằng (>=).
TH1: Xâu A == B nếu chúng giống nhau hoàn toàn.
TH2: Xâu A >= B nếu kí tự đầu tiên khác nhau giữa
chúng kể từ trái sang trong xâu A có điểm mã
UNICODE lớn hơn xâu B.
Để kiểm tra điểm mã, sử dụng hàm ord ( ) trong
## Python
## >>> "TIN HOC" == "TIN HOC"
## True
>>> print (ord("b"))
## 98
>>> print (ord("c")) → 99
>>> print ("b" < "c") →
## True
- Toán tử in:
Cú pháp:  <xâu 1> in <xâu 2>
Kiểm tra xâu 1 nằm trong xâu 2. Nếu đúng trả giá trị
True, nếu sai trả giá trị False
>>> "abc" in "abc123"
## True
>>> "123" in "abc"
## False
- Lệnh len():
Cú pháp:            len(<xâu>)
Cho biết độ dài của xâu
>>> a="Python"
>>> print (len(a))
## 6
- Lệnh find():
Cú pháp đơn:       <xâu mẹ>.find(<xâu con>)
Tìm vị trí xuất hiện đầu tiên của xâu con trong xâu mẹ.
Nếu không tìm thấy thì trả về -1
Cú pháp đầy đủ:   <xâu mẹ>.find(<xâu con>,
start)
Tìm vị trí xâu con bắt đầu từ vị trí start
>>> y = "Cái xắc xinh xinh"
>>> x = "xinh"
>>> z = "bé"
>>> print (y.find(x))
## 8
>>> print (y.find(z))
## -1
- Lệnh split():
Cú pháp:    <xâu mẹ>.split(<kí tự tách>)
Tách một xâu thành các từ và đưa vào một danh sách.
Kí tự tách có thể là dấu cách hoặc kí tự khác
>>> a="Lập trình Python"
>>> print(a.split())
["Lập","trình","Python"]
- Lệnh join():
Cú pháp:   "kí tự nối".join(<danh sách>)
Nối các phần tử (là xâu) của một danh sách thành một
xâu
## >>>
a=["Lập","trình","Python"]
>>> print("  ".join(a))
'Lập trình Python'

Tin học 10 99
- Lấy xâu con:
Cú pháp:     <xâu>[m : n]
Lấy xâu con gồm các kí tự liên tiếp từ chỉ số m đến chỉ
số
n-1  (m < n)
Đảo ngược thứ tự xâu:
Cú pháp:       <xâu>[: : - 1]
>>> a="Lập trình Python"
>>> a[0:9]
'Lập trình'
>>> a="123abc"
>>> a[::-1]
## 'cba321'
- Hàm upper():
Cú pháp:       <xâu>.upper( )
Tạo xâu mới là xâu in hoa của xâu cũ
>>>a="Lập trình Python"
## >>>print(a.upper())
## LẬP TRÌNH PYTHON
- Hàm lower():
Cú pháp:       <xâu>.lower()
Tạo xâu mới là xâu in thường của xâu cũ
>>>a="LẬP TRÌNH PYTHON"
## >>>print(a.lower())
lập trình python
- Hàm count():
Cú pháp:
< y >.count(< x >)  hoặc
< y >.count(< x >, <chỉ số bắt đầu>, <chỉ số
kết thúc>)
Đếm số lần xuất hiện không giao nhau của xâu x trong
xâu y
## >>>y = "aaa"
## >>>x = "aa"
## >>>print (y.count(x))
## 1
>>> a='LẬP TRÌNH PYTHON'
>>> b="P"
>>> print
## (a.count(b,0,len(a)))
## 2
- Hàm replace():
Cú pháp:
y.replace (x1, x2)
Tạo xâu mới từ xâu y bằng cách thay thế xâu con x1
của y bằng xâu x2. Tất cả các xâu con bằng x1 và
không giao nhau của y đều được thay bằng xâu x2
>>>y = "Trúc xinh trúc mọc
sân đình"
>>>x1 = "sân đình"
>>>x2 = "bờ ao"
## >>>print(y.replace(x1,x2))
'Trúc xinh trúc mọc bờ ao'
## BÀI TẬP
- Biểu thức logic sau là đúng hay sai?
>>> "010" in "001100"
- Cho xâu kí tự: "gà,vịt,chó,lợn,ngựa,cá". Em hãy trình bày cách làm để xóa dấu ","
và thay thế bằng dấu "  " trong xâu này?
## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2, 3 SGK Trang 125, 126
Bài tập:
- Viết chương trình nhập nhiều số (số nguyên hoặc số thực) từ bàn phím, các số cách
nhau bởi dấu cách. Sau đó in ra màn hình tổng các số đã nhập.
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
- Viết chương trình nhập họ tên đầy đủ của người dùng, sau đó in thông báo tên và họ
đệm của người đó.
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................

Tin học 10 100
..................................................................................................................................
- Viết chương trình nhập hai số tự nhiên từ bàn phím, cách nhau bởi dấu cách và đưa ra
kết quả là UCLN của hai số này.
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
- Viết chương trình nhập số tự nhiên n rồi nhập n họ tên học sinh. Sau đó yêu cầu nhập
một tên và thông báo số bạn có cùng tên đó trong lớp.
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
..................................................................................................................................
- Cho trước  xâu  kí  tự S,  viết đoạn chương trình xóa đi các dấu  cách  thừa  trong xâu  S.
Dấu cách thừa là các dấu cách ở đầu, cuối và giữa các từ. Quy định giữa các từ chỉ có
một dấu cách.
Ví dụ nếu S="    baby       table      cloud         " thì sau khi sửa S sẽ trở thành "bayby
table cloud"
- Viết chương trình nhập một xâu là họ tên đầy đủ (gồm họ, đệm, tên) từ bàn phím,
sau đó in ra màn hình lần lượt họ, đệm và tên vừa nhập. Ví dụ:
Nhập họ tên đầy đủ: Nguyễn Xuân Quang Lâm
## Họ: Nguyễn
## Đệm: Xuân Quang
## Tên: Lâm
- Cho trước xâu kí tự S và xâu subs. Dùng các lệnh nào để biết được vị trí xuất hiện đầu
tiên của xâu subs trong xâu S?
- Cho trước xâu kí tự S và xâu subtr. Dùng các lệnh nào để biết được vị trí xuất hiện
cuối cùng của xâu substr trong xâu S? Ví dụ nếu S="123321243212", substr="12" thì
vị trí xuất hiện lần cuối của "12" trong xâu S sẽ là 10. Nếu không thấy sẽ trả về -1.
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Lệnh "abcde".find("")   trả lại giá trị gì?
A. -1     B.  0      C. 1        D. Báo lỗi
Câu 3: Lệnh sau trả lại giá trị gì?    "0123456789".find("012abc")
A. -1     B.  0      C. 1        D. Báo lỗi
Câu 4: Lệnh sau trả lại giá trị gì?    len("  Hà Nội Việt Nam  ".split())
A. 0     B.  4      C. 5        D. Báo lỗi
Câu 5: Lệnh sau trả lại giá trị gì?    "Trường Sơn".find("Sơn",4)
## A. 5     B. 6      C. 7        D. 8
Câu 6: Lệnh sau trả lại giá trị gì?    "Trường Sơn".find("Sơn",8)
## A. 5     B. 6      C. 7        D. -1
Câu 17: Để thay thế kí tự 'a' trong xâu s bằng một xâu mới rỗng ta
dùng lệnh:
A. s = s.replace('a',' ') B. s = s.replace('a')  C. s = replace(a,'')  D. s = s.replace( )
Câu 35: Trong NNLT Python, để tìm vị trí xuất hiện đầu tiên của xâu A
trong xâu B ta viết:
## A. <xâu A>.find<xâu B>        B. <xâu B>.find(<xâu A>)
C. find (<xâu A>,<xâu B>)        D. find (<xâu B>,<xâu A>)

Tin học 10 101
Câu 37: Trong NNLT Python, hàm y[m:n] thực hiện việc gì trong các việc sau
đây?
A. Xác định xâu con của xâu n từ vị trí y đến trước vị trí m.
B. Xác định xâu con của xâu y từ vị trí m đến trước vị trí n+1.
C. Xác định xâu con của xâu y từ vị trí n đến trước vị trí m-1.
D. Xác định xâu con của xâu y từ vị trí m đến vị trí n-1.
Câu 4: Cú pháp của lệnh split() là:
A. <xâu mẹ> . split(<kí tự tách>)      B. <xâu mẹ> . split(<xâu con>)
C. <xâu mẹ> : split(<kí tự tách>)      D. <xâu mẹ> : split(<xâu con>)
Câu 5: Cú pháp của lệnh join() là:
A. ‘kí tự nối’ . join(<danh sách>)      B. ‘kí tự nối’ : join(<danh sách>)
C. ‘kí tự nối’ . join(<xâu mẹ>)       D. ‘kí tự nối’ . join(<xâu con>)
Câu 6: Phát biểu nào sau đây là sai?
A. Lệnh join() và lệnh split() có chưc năng giống nhau là dùng để nối xâu
B. Để tìm một xâu trong một xâu khác có thể dùng toán tử in hoặc lệnh find(). Lệnh find() trả về
vị trí của xâu con trong xâu mẹ
C. Lệnh split() tách một xâu thành các từ và đưa vào một danh sách
D. Lệnh join() có tác dụng ngược với lệnh plit(), có chức năng nối các phần tử (là xâu)
của một danh sách thành một xâu
Câu 7: Các dòng lệnh sau đây cho kết quả là gì?

## A. 19      B. True      C. False      D. 20
Câu 8: Các dòng lệnh sau đây cho kết quả là gì?

## A. True      B. 19      C. False      D. 20

Câu 9: Các dòng lệnh sau đây cho kết quả là gì?


A. ['Tin', 'học', '10', 'kết', 'nối', 'tri', 'thức']      B. ['Tin, học, 10, kết, nối, tri, thức]
C. ['Tin học 10 kết nối tri thức']       D. [Tin học 10 kết nối tri thức]
Câu 10: Các dòng lệnh sau đây cho kết quả là gì?

A. 'Tin-học-10-kết-nối-tri-thức'      B. 'Tin học 10 kết nối tri thức'
C. 'Tin, học, 10, kết, nối, tri, thức'      D. 'Tin’-‘học’-‘10’-‘kết’-‘nối’-‘tri’-‘thức'
## BÀI 26: HÀM TRONG PYTHON
## KHỞI ĐỘNG
Xét  bài toán sau: Viết chương trình tính và in ra màn hình tổng sau:
X= a! + b! + c!  (Với a, b, c  khác 0)
- Xác định yêu cầu của bài toán trên
- Nêu ý tưởng giải bài toán
- Viết chương trình giải bài toán và đưa ra nhận xét.

Tin học 10 102
a, b, c=map(int,input("Nhập các
số cần tính giai thừa:").split)
gt1 =1
for i in range(1, a + 1):
gt1 = gt1 *  i
gt2=1
for i in range(1,b + 1):
gt2 = gt2 * i
gt3=1
for i in range(1, c + 1):
gt3 = gt3 * i
a, b, c=map(int,input("Nhập các
số cần tính giai thừa: ").split)
def gt (n):
giaithua=1
for i in range(1,n+ 1):
giaithua = giaithua *
i
return giaithua
print(“Tổng cần tính: ”,
gt(a)+gt(b) + gt(c) )

− Khái niệm hàm (chương trình con): Hàm là một khối lệnh đặc biệt, nó được đặt
tên và có thể gọi để sử dụng ở các nơi khác nhau trong chương trình
## HÌNH THÀNH KIẾN THỨC
## 1. MỘT SỐ HÀM THIẾT KẾ SẴN TRONG PYTHON

− Để kiểm  tra  tất  cả các  hàm  thiết  kế sẵn  trong  python  ta  sử dụng  lệnh  :
dir(__builtins__)
− Những lệnh sau đây thực hiện công việc gì?
Hàm(Lệnh) Tên hàm Tham số Giá trị trả lại
print(“Thời khóa biểu”)
print “Thời hóa biểu” ‘Thời khóa biểu’
int(“52”)
int “52” 52
y =5.2
type(y)
type

## 5.2
Kiểu dữ liệu của biến y
float
− Cú pháp gọi hàm chung trong Python:



➢ Ghi nhớ: Python  cung  cấp  sẵn  nhiều  hàm  thực  hiện  những  công  việc  khác  nhau  cho
phép người dùng được tùy ý sử dụng khi viết chương trình bằng các câu lệnh gọi hàm
tương ứng.
## 2. THIẾT LẬP CÁC HÀM TỰ ĐỊNH NGHĨA




− Trong đó:
+ Hàm được định nghĩa bằng từ khóa def
Hàm(Lệnh) Tham số x Giá trị trả lại
float(x)
Xâu kí tự chữ số, số Kiểu dữ liệu số thực
str(x)
Số hoặc xâu kí tự Kiểu dữ liệu xâu kí tự
len(x)
Danh sách, xâu kí tự Độ dài danh sách  hoặc xâu kí
tự
list(x)
Xâu    kí    tự hoặc    hàm
range()
Kiểu dữ liệu danh sách
Hàm có trả  về giá trị:

def <tên hàm> (<tham số>):
<Khối lệnh>
return <giá trị>
Hàm không trả  về giá trị:

def <tên hàm> (<tham số>):
<Khối lệnh>
return
<Tên hàm>(<Danh sách các tham số>)

Tin học 10 103
+ Tên hàm được đặt theo quy tắc đặt tên
+ Hàm có thể có hoặc không có tham số
+ Khối lệnh được viết sau dấu “:” và lùi vào 1 tab
+ Hàm kết thúc khi gặp lệnh return
+ Hàm không trả về giá trị khi viết có thể không cần lệnh return
− Quan sát các hàm sau, giải thích cách thiết lập và chức năng của mỗi hàm:
Chương trình con Giải thích chức năng

Tên hàm: ....................................................................
Tham số: ....................................................................
Giá trị trả về:...............................................................
Chức năng của hàm: ...................................................

Tên hàm: ....................................................................
Tham số: ....................................................................
Giá trị trả về:...............................................................
Chức năng của hàm: ...................................................

Tên hàm: ....................................................................
Tham số: ....................................................................
Giá trị trả về:...............................................................
Chức năng của hàm: ...................................................

Tên hàm: ....................................................................
Tham số: ....................................................................
Giá trị trả về:...............................................................
Chức năng của hàm: ...................................................

## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2 SGK Trang 129, 130
Bài tập:
- Sửa lỗi chương trình bên:
## .................................................................
## .................................................................
## .................................................................
## .................................................................
- Hàm sau có ý nghĩa gì?
.................................................................................................
.................................................................................................

- Hàm bên thực hiện công việc gì?



- Viết hàm nhập số nguyên n từ bàn phím. Hàm sẽ trả lại số đã nhập.
....................................................................................................................................
....................................................................................................................................
- Viết hàm với tham số là số tự nhiên n, in ra các số là ước nguyên tố của n
- Viết hàm numbers ( s ) đếm số các chữ số có trong xâu s.
Ví dụ numbers ("0101abc") = 4
- Viết hàm với tham số là số tự nhiên n, in ra các số là ước nguyên tố của n.

Tin học 10 104
- Viết hàm số Number () có tính năng sau:
Tham số của hàm là dãy các số nguyên A
Hàm sẽ trả lại giá trị là 2 số p, q với ý nghĩa sau: p – số các số chẵn của dãy A, q –
các số lẻ của dãy A
- Viết chương trình yêu cầu nhập từ bàn phím một xâu kí tự, sau đó thông báo:
Tổng các kí tự là chữ số của xâu
Tổng số các kí tự là chữ cái tiếng Anh trong xâu
Viết hàm cho mỗi yêu cầu trên
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Trong định nghĩa của hàm có thể có bao nhiêu từ khóa return?
A. 1      B.  2   C. Báo lỗi     D. Không hạn chế
Câu 2: Mệnh đề nào dưới đây mô tả đúng về hàm tự định nghĩa không trả lại
giá trị?
A. Trong mô tả hàm không có từ khóa return  B. Trong mô tả hàm chỉ có một từ khóa
return
C. Trong mô tả hàm phải có tối thiểu hai từ khóa return
D. Trong mô tả hàm hoặc không có return hoặc có return nhưng không có giá trị sau từ
khóa return
Câu 3: Từ khóa nào dùng để định nghĩa hàm trong Python?
A. function      B. def     C. return      D. void
Câu 4: Hãy cho biết thứ tự khi thực hiện định nghĩa một hàm trả về giá trị trong
## Python:
(1) <Khối lệnh>  (2) return <giá trị>  (3) def <tên_hàm> (<tham số>):
## A. (1), (2), (3)    B. (2), (3), (1)    C. (1), (3), (2)    D. (3), (1), (2)
Câu 5: Phát biểu nào sau đây sai?
A.  Lệnh x = int( ’52 + 25’) chuyển xâu ’52 + 25’ thành số nguyên 77
B. Lệnh print(“Thời khoá biểu”) thực hiện việc in xâu kí tự “Thời khoá biểu” trong dấu ngoặc ra màn
hình
C. Lệnh x = int( ‘52’) chuyển xâu ‘52’ thành số nguyên 52
D. Lệnh type(y) trả lại kiểu dữ liệu của biến y
Câu 6: Phát biểu nào sau đây sai?
A. len(): tham số là danh sách hoặc xâu kí tự và trả về giá trị kiểu số thực.
B. float(): tham số là một xâu kí tự hoặc số nguyên và trả về giá trị số thực.
C. str(): tham số là các kiểu dữ liệu khác nhau và trả về xâu kí tự.
D. len(): tham số là danh sách hoặc xâu kí tự và trả về giá trị kiểu số nguyên.
Câu 7: Các dòng lệnh sau đây cho kết quả là:

## A. 3       B. 4

## C. 5       D. 6

Câu 8: Các dòng lệnh sau cho kết quả là:

## A. Trần Quang Minh
B. Xin chào bạn
C. Xin chào bạn Trần Quang Minh

D. Xin chao ban Trần Quang Minh
Câu 9: Cú pháp thiết lập hàm có trả lại giá trị là:
## A.

## C.

Tin học 10 105
## B.
## D.
Câu 10: Cú pháp thiết lập hàm không trả lại giá trị là:
## A.

## B.
## C.
## D.

Câu 11: Xét đoạn chương trình sau:

Khi chạy chương trình, nếu nhập Hồ Hiếu Học thì kết quả là:
A. Xin chào Hồ Hiếu Học      B. Hồ Hiếu Học
C. Xin chào ten       D. Xin chào em Hồ Hiếu Học
## BÀI 27: THAM SỐ CỦA HÀM
## KHỞI ĐỘNG
Quan sát các lệnh sau và cho biết sự khác nhau giữa tham số và đối số?


............................................................................................................................................
............................................................................................................................................
## HÌNH THÀNH KIẾN THỨC
## 5. THAM SỐ VÀ ĐỐI SỐ CỦA HÀM

Tham số
## Đượcđịnhnghĩakhi
khaibáohàmvà
đượcdùngnhưbiến
deff(a,b,c)
return   a+b+c
Đối số
## Giátrịđượctruyền
vàokhigọihàm
f(1,2,3)
## →6
x,y,z=10,20,5
f(x,y,z)
## →35

Tin học 10 106


− Tham số là biến được ghi trong khai báo của hàm. Hàm có thể có hoặc không có tham
số
− Đối số là giá trị được truyền vào khi gọi hàm. Số lượng giá trị truyền vào phải bằng với
tham số
## 6. CÁCH SỬ DỤNG CHƯƠNG TRÌNH CON

Dòng Chương trình Ý nghĩa
## 1
## 2
## 3
## 4
## 5
## 6
## 7
## 8
## 9
## 10
## 11
## 12
## 13
## 14
## 15
def prime(n):
## C=0
k=1
while k<n:
if n%k==0:
## C=C+1
k=k+1
if C==1:
return True
else:
return False
n=int(input(“Nhập số tự nhiên n: “))
for k in range(1, n+1):
if prime(k):
print(k, end=“ “)
Chương trình con: từ dòng 1-
## >11
Tên hàm là: prime
Tham số của hàm là: n
Lời gọi hàm ở dòng 14
Đối số của hàm là: k
Giải thích: Tùy GV diễn giải
theo cách hiểu của mình
## 1
## 2
## 3
## 4
## 5
## 6
## 7
## 8
## 9
## 10
def tongduong(A):
## S=0
for k in A:
if k>0:
S=S+k
return S
## A=[0,2,-1,5,10,-3]
## B=[1,-10,-11,8,2,0,-5]p
print("tổng danh sách
A:",tongduong(A))
Chương trình con: từ dòng 1->6
Tên hàm là: tongduong
Tham số của hàm là: A
Lời gọi hàm ở dòng 9, 10
Đối số của hàm là: A, B
Công việc của hàm: thực hiện
việc tính tổng 1 danh sách
Giải thích: Tùy GV diễn giải
theo cách hiểu của mình
def f(a,b,c)
return a+b+c
f(1,2,3)
## →6
Đối số là giá trị cụ thể
x,y,z=10,20,5
f(x,y,z)
## →35
Đối số là biến đã có giá trị
x,y=5,3
f(10,x,y)
## →18
Đối số vừa là giá trị cụ thể,
vừa là biến có giá trị
f(m,n,q)
→báo lỗi
Không truyền vào đối số là
biến chưa có giá trị
Bài toán: Viết chương trình yêu cầu nhập số tự nhiên n từ bàn phím và in các số nguyên tố nhỏ hơn
hoặc  bằng n ra màn hình.

Hoạt động 1: Khi nào nên sử dụng chương trình con?

Tin học 10 107
print("tổng danh sách
B:",tongduong(B))
Lợi ích của việc sử dụng hàm:
− Chương trình con giúp phân chia việc giải một bài toán lớn thành giải quyết bài toán nhỏ
và phát huy được tinh thần làm việc nhóm.
− Giúp chương trình chính có cấu trúc rõ ràng, dễ hiểu hơn.
− Nếu cần hiệu chỉnh, phát triển và nâng cấp cũng thuận tiện hơn
## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2, 3 SGK Trang 134, 135
Bài tập:
- Viết chương trình in ra các số nguyên tố trong khoảng từ m đến n, với m, n là hai số tự
nhiên và 1<m<n.
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
- Thiết lập hàm power ( a, b, c ) với a, b, c là các số nguyên. Hàm trả lại giá trị ( a + b )
c

....................................................................................................................................
....................................................................................................................................
- Viết chương trình thực hiện: Nhập hai số tự nhiên từ bàn phím, hai số cách nhau bởi
dấu cách. Tính và in ra tổng các số này.  Yêu cầu sử dụng hàm khi viết chương trình.
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................

- Viết chương trình nhập hai số tự nhiên từ bàn phím, hai số cách nhau bởi dấu phẩy, in ra
ước chung lớn nhất (UCLN) của hai số. Yêu cầu sử dụng hàm khi viết chương trình.
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
- Thiết lập hàm change () có hai tham số là xâu ho_ten và số c. Hàm sẽ trả lại xâu kí tự
ho_ten là chữ in hoa nếu c = 0. Nếu tham số c khác 0 thì hàm trả lại xâu ho_ten là chữ in
thường.
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Hàm tự định nghĩa trong Python có thể có bao nhiêu tham số
A. 0      B.  1      C. 2      D. Không hạn chế
Câu 2: Khi gọi hàm, dữ liệu được truyền vào hàm được gọi là gì?
A. Tham số    B.  Hiệu số    C. Đối số    D. Hàm số
Câu 3: Đoạn chương trình sau sẽ in ra số nào?
>>> def  f (x, y) :
z = x + y
return  x*y*z
>>>  f (1, 4)
## A. 10      B.  18
## C. 20      D. 30
Câu 4: Hàm func(m,n) được định nghĩa như sau:
def  func(m, n):
return 3*m + n
m = 10
Kết quả sẽ in ra số nào?
## A. 30   B.  31
C. 32   D. Báo lỗi

Tin học 10 108
n = 1
print (func(m, n))

Câu 5: Cho biết tham số trong đoạn chương trình sau?
def  f (A, x):
## A.append (x*x)
return A
## C=[1, 2, 3]
print(f(C, 4))
A. A, x      B. C
C. f(A,x)      D. C, 4

Câu 6: Cho biết tham số trong đoạn chương trình sau?
def  somu (x, y=2):
return  x * x + y
print ( somu(2))
A. x      B. x, y
C. 2       D. y

Câu 7: Phát biểu nào sau đây sai?
A. Khi gọi hàm, các tham số sẽ được truyền bằng giá trị thông qua đối số của hàm, số lượng
giá trị được truyền vào hàm khác với số tham số trong khai báo của hàm.
B. Tham số của hàm được định nghĩa khi khai báo hàm và được dùng như biến trong định
nghĩa hàm.
C. Đối số là giá trị được truyền vào khi gọi hàm.
D. Khi gọi hàm, các tham số sẽ được truyền bằng giá trị thông qua đối số của hàm, số lượng
giá trị được truyền vào hàm bằng với số tham số trong khai báo của hàm.
Câu 8: Xét hai đoạn chương trình như bên dưới, phát biểu nào sau đây là
đúng?

A. (a,b,c) là tham số, (x,y) là đối số      B. (a,b,c) là đối số, (x,y) là tham số
C. (a,b,c) và (x,y) đều là đối số       D. (a,b,c) và (x,y) đều là tham số
Câu 9: Các dòng lệnh sau đây cho kết quả là:

## A. 3 B. 1
## C. 2 D. 6

Câu 10: Các dòng lệnh sau đây cho kết quả là:

## A. 10      B. 60
## C. 20      D. 30
Câu 11: Chương trình sau cho kết quả là:

## A. 10  B. 16
## C. 15  D. 11
Câu 12: Chương trình sau cho kết quả là:

## A. -10      B. 6
## C. -6      D. -16


Tin học 10 109
Câu 13: Thiết lập hàm power(a, b, c) với a, b, c là các số nguyên. Hàm
trả lại giá trị (a+b)
c
.Chương trình có thể như sau:

Khi chạy chương trình, nếu nhập a=1, b=2, c=3 thì kết quả là:
## A. 27     B. 9      C. 6      D. 16
## BÀI 28: PHẠM VI CỦA BIẾN
## HÌNH THÀNH KIẾN THỨC
## 1. PHẠM VI CỦA BIẾN KHAI BÁO TRONG HÀM
− Tất cả các biến khai báo bên trong hàm đều có tính địa phương (cục bộ)
− Biến địa phương không có tác dụng bên ngoài hàm
## BÀI TẬP
- Giả sử có các lệnh sau:
>>> a,b=1,2
>>> def f(a,b):
a = a+b
b = b*a
return a+b
Giá trị của a, b bằng bao nhiêu sau khi thực hiện lệnh sau?
a) f(1,2)  b) f(10, 20)
.............................................................................................................................
.............................................................................................................................
Ta có thể khai báo một biến bên trong hàm trùng tên với biến đã khai báo trước
đó bên ngoài hàm không?
.............................................................................................................................
## 2. PHẠM VI CỦA BIẾN KHAI BÁO BÊN NGOÀI HÀM
− Biến khai báo bên ngoài hàm gọi là biến tổng thể
− Biến tổng thể không có tác dụng bên trong hàm như một biến. Nếu muốn sử dụng
thì cần khai báo lại biến này trong hàm với từ khóa global
− Khi một biến đã khai báo ở chương trình chính thì bên trong hàm vẫn "nhìn thấy" và
có thể truy cập giá trị của biến, nhưng bên trong hàm không thể thao tác với tên này
như một biến thông thường.
## BÀI TẬP
Kết quả nào được in ra sau khi thực hiện đoạn chương trình sau:
>>> def  f( x, y ):
a = 2 * (x + y)
print ( a + n )
>>> n = 10
>>> f(1, 2)
..............................................................................................................................
## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2, 3 SGK Trang 138, 139, 140
Bài tập:
- Viết chương trình với đầu vào, đầu ra như sau:
− Đầu vào là danh sách slist, các phần tử là xâu kí tự

Tin học 10 110
− Đầu ra là danh sách clist, các phần tử là kí tự đầu tiên của các xâu kí tự tương
ứng trong danh sách slist
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
- Viết hàm Tach_day ( ) với đầu vào là danh sách A, đầu ra là hai danh sách B, C được
mô tả như sau:
− Danh sách B thu được từ A bằng cách lấy ra các phần tử có chỉ số chẵn
− Danh sách C thu được từ A bằng cách lấy ra các phần tử có chỉ số lẻ
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
- Viết hàm có hai tham số đầu vào là m, n. Đầu ra trả lại hai giá trị là:
− UCLN của m, n
− Bội chung nhỏ nhất của m, n.
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
....................................................................................................................................
- Viết chương trình nhập ba số tự nhiên từ bàn phím day, month, year, các số cách nhau
bởi dấu cách. Các số này biểu diễn giá trị của ngày, tháng, năm nào đó. Chương trình
cần kiểm tra và in ra thông báo số liệu đã nhập vào đó có hợp lệ hay không?
.......................................................................................................................................
.......................................................................................................................................
.......................................................................................................................................
.......................................................................................................................................
.......................................................................................................................................
.......................................................................................................................................
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Trong Python biến được khai báo và sử dụng bên trong 1 hàm được gọi  gì?
A. Biến địa phương  B.  Biến tổng thể  C. Biến riêng   D. Biến thông thường
Câu 2: Trong Python biến được khai báo và sử dụng bên ngoài một hàm được gọi
là gì?
A. Biến địa phương  B.  Biến tổng thể  C. Biến riêng   D. Biến thông thường
Câu 3: Mệnh đề nào dưới đây phát biểu sai về phạm vi tác dụng của biến trong
## Python?
A. Biến được khai báo bên trong hàm chỉ có tác dụng trong hàm đó, không có tác dụng
bên ngoài
B. Biến được khai báo bên ngoài hàm sẽ không có tác dụng bên trong hàm như một biến
C. Biến khai báo bên ngoài nếu muốn có tác dụng bên trong hàm thì cần khai báo lại
trong hàm với từ khóa global
D. Biến trong Python khi đã được khai báo sẽ có tác dụng trong tất cả các hàm và
bên ngoài Câu 4: Cho biết kết quả in ra màn hình của đoạn chương trình
sau:
m, n = 10, 4
def  f(a):
k = n + m +
a
## A.  10     B.  14
C.  19     D. Báo lỗi


Tin học 10 111
return  k
print ( f (5) )
Câu 5: Cho biết kết quả của đoạn chương trình sau:
m, n = 10, 4


def  f(a):


n = n + m + a


return  n


print ( f (5) )
## A. 19  B.  14
C. 0  D. Báo lỗi


Câu 6: Đoạn chương trình sau sẽ in ra giá trị gì?
def  f(s) :
m = "train"
return  m + s
m = "bayby"
s = f ("   go")
print ( s )
A. Báo lỗi    B. "train go"
C. "baby go"  D. "train baby go"

Câu 7: Đoạn chương trình sau sẽ in ra giá trị gì?
def  f(x, y):
n = x + y
m = x - y
return 2*n*(m + 1)
n = 5
m = 3
f (2, 1)
print (n, m)
## A. 2  1    B. 5  3
C. 3  1     D. Báo lỗi
Câu 8: Đoạn chương trình sau sẽ in ra giá trị gì?
def  f(a):
n = a + 1
n = (3*n+1)**2
return n
f (1)
print (n)
## A. 49      B. 2
C. 0      D. Báo lỗi
Câu 9: Đoạn chương trình sau sẽ in ra giá trị gì?
def  f( ):
n = n + 1
return n
n = 15
a = f ( )
print ( a )
## A. 15      B. 16
C. 0      D. Báo lỗi

Câu 10: Sau khi thực hiện đoạn chương trình sau, giá trị của a và b bằng
bao nhiêu?
a=10
b=14
def  f(a, b ):
a = a + 2
b = b + 10
return a + b
print ( f(a, b) )
A. a=12, b=14     B. a= 10, b=14
C. a=12, b=24     D. Báo lỗi

Câu 11: Đoạn chương trình sau cho kết quả là:

## A. 15      B. 75
## C. 80      D. 90


Tin học 10 112
Câu 12: Chương trình sau có lỗi ở dòng nào?

A. dòng 2      B. dòng 3
C. dòng 4      D. dòng 5

Câu 13: Nếu biến bên ngoài hàm muốn có tác dụng bên trong hàm ta dùng từ
khoá nào để khai báo?
A. len       B. def      C. global      D. input
Câu 10: Chương trình sau cho kết quả là:

## A. 13   B. 10
## C. 3       D. 14


## BÀI 29: NHẬN BIẾT LỖI CHƯƠNG TRÌNH
## HÌNH THÀNH KIẾN THỨC
## 1. NHẬN BIẾT LỖI CHƯƠNG TRÌNH
− Lỗi sai cú pháp hoặc sai cấu trúc ngôn ngữ Python quy định. Chương trình sẽ lập tức
dừng và thông báo lỗi Syntax Error
− Lỗi khi không thể thực hiện một lệnh trong chương trình. Chương trình dừng lại và
thông báo một mã lỗi. Lỗi này là lỗi ngoại lệ (Exceptions Error)
− Chương trình chạy không lỗi ngoại lệ, nhưng kết quả đưa ra sai, không chính xác.
Đây là lỗi logic bên trong chương trình.
Với mỗi loại lỗi trên, cách xử lí và kiểm soát lỗi sẽ khác nhau
## 2. MỘT SỐ LỖI NGOẠI LỆ THƯỜNG GẶP
Mã lỗi ngoại lệ  Mô tả lỗi
ZeroDivisionError  Lỗi thực hiện phép chia cho giá trị 0
IndexError
Lỗi truy cập phần tử có chỉ số vượt quá giới hạn của danh sách
NameError
Lỗi không tìm thấy tên trong chương trình. Ví dụ khi lệnh gọi một
hàm nhưng không có hàm đó
TypeError
Lỗi kiểu dữ liệu. Ví dụ:
Truy cập một phần tử của danh sách nhưng chỉ số không là số
nguyên
Tính biểu thức số nhưng lại có một toán hạng không phải là số.
ValueError
Lỗi liên quan đến giá trị  của đối tượng.
Lỗi khi thực hiện lệnh chuyển đổi kiểu dữ liệu, đối số của hàm có
giá trị mà hàm không hỗ trợ. Ví dụ: int("1.55")
IndentationError
Lỗi khi các dòng lệnh thụt vào không thẳng hàng hoặc không
đúng vị trí
SyntaxError  Lỗi cú pháp
## THỰC HÀNH
Nhiệm vụ: Học sinh thực hành nhiệm vụ 1, 2 SGK Trang 143, 144


Tin học 10 113
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Xác định loại lỗi của câu lệnh sau:   >>> A = list ( 12 )
A. Lỗi cú  pháp  B. Lỗi ngoại lệ  C. Lỗi khác   D. Không có lỗi
Câu 2: Nhận biết lỗi của đoạn chương trình sau:
123ab = { 1, 2, 3 } print (123ab)
A. Lỗi cú pháp  B. Lỗi ngoại lệ  C. Lỗi khác  D. Không có lỗi
Câu 3: Lỗi ngoại lệ trong Python là lỗi gì?
A. Lỗi khi viết một câu lệnh sai cú pháp của ngôn ngữ lập trình
B. Lỗi khi truy cập một biến chưa được khai báo
C. Lỗi khi không thể thực hiện một lệnh nào đó của chương trình
D. Lỗi khi chương trình biên dịch sang tệp exe.
Câu 4: Nhận biết loại lỗi của chương trình sau:
n = 10
for  i  in range ( n ) :  Print (i, end = " " )
A. SyntaxError   B. TypeError   C. ValueError   D. NameError
Câu 5: Nhận biết loại lỗi của chương trình sau:
## A = [ 1, 2, 3 ]
for i in range ( 4 ) :  print ( A [ i ] )
A. SyntaxError  B. TypeError   C. ValueError   D. IndexError
Câu 6: Nhận biết loại lỗi của chương trình sau:
n = input ("nhập số tự nhiên n: ")
k = int (input ("nhập số lần cần nhân lên: ")
print ( "kết quả là:", n*k )
A. SyntaxError   B. TypeError   C. ValueError   D. NameError
Câu 7: Trong lời gọi hàm, nếu các đối số được truyền vào hàm bị thiếu thì lỗi ngoại
lệ phát sinh thuộc loại nào dưới đây?
A. SyntaxError  B. TypeError    C. NameError       D. Không phát sinh lỗi ngoại lệ
Câu 8: Đoạn lệnh sau sẽ phát sinh lỗi ngoại lệ nào?
>>> s = "abc"
>>> s [ 10 ]
A. SyntaxError  B. TypeError  C. IndexError  D. NameError
Câu 9: Giả sử chương trình có lệnh nhập dữ liệu như sau:
N = int ( input("Nhập số nguyên n: "))
Khi chúng ta nhập 1. 5 thì chương trình có lỗi ngoại lệ nào?
A. SyntaxError  B. TypeError  C. ValueError  D. IndexError
Câu 10: Bài toán yêu cầu sắp xếp dãy số ban đầu thành dãy tăng dần. Giả sử dãy
số ban đầu là [ 3, 1, 8, 10,  5 ]. Kết quả thu được dãy [1, 3, 8, 5, 10].  Chương trình
có lỗi không? Nếu có lỗi thì đó thuộc loại gì?
A. Lỗi cú pháp          B. Lỗi logic bên trong chương trình
C. Lỗi ngoại lệ          D. Không có lỗi
Câu 12: Lệnh nào sau đây không xảy ra lỗi?
A. A [ 1.5 ]    B. int ("abc")     C. "10"*3.5       D. float("123")

## BÀI 30: KIỂM THỬ VÀ GỠ LỖI CHƯƠNG TRÌNH
## HÌNH THÀNH KIẾN THỨC
## MỘT VÀI PHƯƠNG PHÁP KIỂM THỬ CHƯƠNG TRÌNH
Một vài phương pháp kiểm thử chương trình:
− Quan sát mã lỗi ngoại lệ để biết lỗi gì.
− Thiết lập các bộ dữ liệu test để kiểm thử chương trình
− In các thông số trung gian

Tin học 10 114
− Sử dụng công cụ điểm dừng của phần mềm lập trình
## BÀI TẬP
Bài tập 1. Chương trình sau có lỗi không? Nếu có thì tìm và sửa lỗi.
m = input ("nhập số tự nhiên m: ")
n = input ("nhập số tự nhiên n: ")
print ("tổng hai số đã nhập là: ", m+n)
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
Bài tập 2. Chương trình sau có chức năng sắp xếp một dãy số cho trước. Hãy kiểm tra
xem chương trình có lỗi không. Nếu có thì tìm và sửa lỗi.
## A = [ 10, 1, 5, 2, 8, 0, 4]
for i in range (len (A)-1): j = i
while j > 1 and A [ j ] < A [ j – 1]:
A [ j ], A[ j – 1 ] = A [ j – 1], A [ j ]
j = j -1
print (A)
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
........................................................................................................................................
## CÂU HỎI TRẮC NGHIỆM
Câu 1: Mục đích của kiểm thử chương trình là gì?
A. Để tự động sửa lỗi chương trình
B. Để tìm ra lỗi của chương trình
C. Để tìm ra lỗi và phòng ngừa, ngăn chặn các lỗi phát sinh trong tương lai
D. Để tìm ra lỗi và tự động sửa lỗi chương trình
Câu 2: Nếu chương trình chạy bị lỗi với thông báo là ZeroDivisionError thì
đó là lỗi gì và em cần sửa lỗi như thế nào? Chọn phương án đúng nhất.
A. Đây là lỗi không thể sửa được
B. Đây là lỗi chia cho 0, em cần xóa lệnh này khỏi chương trình
C. Đây là lỗi chia cho 0, em cần thay thế  phép toán khác để không xảy ra lỗi này
nữa
D. Đây là lỗi chia cho 0, em cần tìm hiểu nguyên nhân vì sao lại xuất hiện 0 khi chia,
có thể bổ sung lệnh kiểm tra trước khi thực hiện phép chia.
Câu 3: Điểm dừng (break point) trong các phần mềm soạn thảo lập trình có ý
nghĩa gì?
A. Đó là vị trí chương trình chạy tới đó thì kết thúc.
B. Đó là vị trí chương trình dừng lại để người lập trình quan sát phát hiện lỗi.
C. Đó là vị trí chương trình mỗi khi chạy đến dòng lệnh đó sẽ kêu pip pip.
D. Đó là vị trí chương trình tạm dừng, người lập trình sẽ quan sát các biến của chương
trình và có thể điều khiển để chương trình tiếp tục chạy.
Câu 4: Bộ dữ liệu kiểm thử (test) có những tính chất gì?
A. Tính chất phát hiện lỗi của chương trình
B. Cần có càng nhiều càng tốt
C. Cần được sinh ngẫu nhiên và phủ kín các trường hợp biên của dữ liệu đầu vào bài
toán
D. Không cần có giá trị gì?
Câu 5: Giả sử đầu vào của dữ liệu bài toán là vùng {x≥ퟎ}. Khi đó dữ liệu
ở vùng biên là những dữ liệu nào?

Tin học 10 115
A. x = 0.   B. x = 1000000   C. x ở gần 0   D. x ở gần 0 hoặc x rất
lớn
Câu 6: Phần mềm soạn thảo lập trình có thể tạo bao nhiêu điểm dừng?
A. 0      B. 1    C. Không hạn chế      D. 10
Câu 7: Các phương pháp nào dưới đây KHÔNG được coi là phương pháp
kiểm thử chương trình?
A. In các dữ liệu trung gian
B. Sinh các bộ dữ liệu test để kiểm tra chương trình
C. Đặt tên biến và hàm có ý nghĩa
D. Tạo điểm dừng để quan sát và phát hiện lỗi chương trình

## BÀI 31: THỰC HÀNH VIẾT CHƯƠNG TRÌNH ĐƠN GIẢN
## THỰC HÀNH
Bài tập 1. Viết chương trình yêu cầu nhập số thực dương a. Chương trình cần kiểm tra
dữ liệu nhập như sau: Nếu số đã nhập nhỏ hơn hoặc bằng 0 thì thông báo: "Nhập sai, số
a phải lớn hơn 0. Hãy nhập lại". Chương trình chỉ dừng sau khi người dùng nhập đúng.

...................................................................................................................................................................................................

...................................................................................................................................................................................................

...................................................................................................................................................................................................

...................................................................................................................................................................................................

...................................................................................................................................................................................................

...................................................................................................................................................................................................
Bài tập 2. Viết chương trình in bảng cửu chương ra màn hình như sau:
- Hàng thứ nhất in ra bảng nhân 1, 2, 3, 4, 5
- Hàng thứ 2 in ra bảng nhân 6, 7, 8, 9, 10
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
............................................................................................................................................
Bài tập 3. Viết chương trình nhập hai số tự nhiên Y1, Y2 là số năm, Y2 > Y1. Tính xem
trong  khoảng  thời  gian  từ năm Y1 đến năm Y2 có bao nhiêu năm nhuận.  Áp  dụng  tính
xem trong thế kỉ XXI có bao nhiêu năm nhuận.
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................

Tin học 10 116
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
Bài tập 4. Gọi UCLN(a, b) là hàm UWLN của hai số tự nhiên a, b.
Dễ thấy ta có UCLN(a, b) = UCLN (b, a%b) nếu b > 0 và UCLN(a, 0) = a. Từ đó hãy
viết chương trình nhập hai số a, b và tính UCLN của a và b.
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
..........................................................................................................................................
