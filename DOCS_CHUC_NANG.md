# 📘 TỔNG HỢP TOÀN BỘ CHỨC NĂNG HỆ THỐNG WEBLEARNPYTHON
> **Nền tảng Lập trình Python & Chấm điểm Tự động Chuẩn Chương trình Tin học 10 (Chân trời sáng tạo / Kết nối tri thức)**  
> **Kiến trúc**: React 18, TypeScript, Tailwind CSS, Monaco Editor, Pyodide CPython 3.12 WebAssembly, Firebase Firestore.

---

## 📑 MỤC LỤC
1. [Phân hệ Học sinh (Student Workspace)](#1-phân-hệ-học-sinh-student-workspace)
2. [Bộ công cụ Sư phạm & Hiểu sâu Bản chất](#2-bộ-công-cụ-sư-phạm--hiểu-sâu-bản-chất)
3. [Phân hệ Giáo viên (Instructor Dashboard)](#3-phân-hệ-giáo-viên-instructor-dashboard)
4. [Chế độ Trình chiếu Giảng dạy (Projector Mode)](#4-chế-độ-trình-chiếu-giảng-dạy-projector-mode)
5. [Hạ tầng Kỹ thuật & Runtime Thực thi](#5-hạ-tầng-kỹ-thuật--runtime-thực-thi)
6. [Hệ thống Dữ liệu Bài học & Ngân hàng Bài tập](#6-hệ-thống-dữ-liệu-bài-học--ngân-hàng-bài-tập)
7. [Bảo mật, Chống gian lận & Phân quyền](#7-bảo-mật-chống-gian-lận--phân-quyền)

---

## 1. PHÂN HỆ HỌC SINH (STUDENT WORKSPACE)

### 1.1. Không gian Làm bài Đa năng (Multi-Pane Bento Layout)
* **Giao diện phân chia linh hoạt (Resizable Panels)**: Cho phép học sinh kéo thả điều chỉnh kích thước giữa 3 khung: Đề bài / Lý thuyết, Trình soạn thảo Code, và Màn hình Console / Chấm điểm.
* **Bộ lọc và Danh sách Bài tập Thông minh**:
  * Tìm kiếm bài tập tức thời theo từ khóa.
  * Lọc theo Bài học trong SGK (Từ Bài 16 đến Bài 31).
  * Lọc theo độ khó: *Beginner (Cơ bản)*, *Intermediate (Trung bình)*, *Advanced (Nâng cao)*.
  * Huy hiệu trạng thái nộp bài trực quan: `○ Mới (Chưa làm)`, `✓ Đạt (Passed)`, `✕ Chưa đạt (Failed)`.

### 1.2. Trình soạn thảo Code Chuyên nghiệp (Monaco Editor)
* **Tích hợp lõi VS Code (Monaco Editor)**: Mang lại trải nghiệm gõ code chân thực như một lập trình viên chuyên nghiệp.
* **Hỗ trợ tiếng Việt Unikey/Telex hoàn hảo**: Khắc phục triệt để lỗi xung đột dấu cách và gõ tiếng Việt trên trình duyệt.
* **Bộ chỉnh cỡ chữ trực quan (`A-`, `14px`, `A+`)**: Học sinh dễ dàng phóng to, thu nhỏ cỡ chữ (10px – 32px) để không bị mỏi mắt. Cài đặt được lưu tự động vào `localStorage`.
* **Hệ thống Theme đồng bộ**: Tự động chuyển đổi giữa *Chroma Carbon Dark* (Nền tối chống mỏi mắt) và *Chroma Carbon Light* (Nền sáng chuẩn phòng lab).
* **Phím tắt nhanh**:
  * `Ctrl + Enter`: Chạy thử code ngay lập tức.
  * `Ctrl + Space`: Kích hoạt bảng gợi ý tự động hoàn thành lệnh.
  * `Tab` / `Shift + Tab`: Thụt lề và hủy thụt lề chuẩn Python PEP 8.

### 1.3. Trợ lý Trí tuệ Lập trình (IntelliSense & Snippets)
* **Tự động gợi ý cú pháp chuẩn SGK Tin 10**: Gợi ý các lệnh `print()`, `input()`, `range()`, `len()`, `split()`, `append()`, `join()`, `find()`, `count()`, `sort()`, `math`, v.v.
* **Parameter Hints**: Hiển thị hướng dẫn cú pháp và đối số truyền vào khi mở ngoặc hàm.
* **Sổ tay Tra cứu Hàm Python (Cheat Sheet Modal)**:
  * Phân loại theo chủ đề: Nhập/Xuất, Chuỗi kí tự (str), Danh sách (list), Ép kiểu dữ liệu, Toán học & Điều kiện.
  * Mỗi hàm đi kèm mô tả tiếng Việt và code mẫu.
  * Nút **[Chèn vào Code]**: Cho phép đưa trực tiếp đoạn code mẫu vào vị trí con trỏ chuột trong Editor.

### 1.4. Lý thuyết Tương tác & Trắc nghiệm Củng cố (Theory & Quiz)
* **Tab Lý thuyết SGK**: Đọc nội dung tóm tắt kiến thức trọng tâm của bài học tương ứng ngay trong workspace mà không cần mở sách giáo khoa.
* **Quiz Tự kiểm tra Nhanh (Quiz Section)**:
  * Bộ câu hỏi trắc nghiệm khách quan đa dạng theo từng bài học.
  * Chấm điểm và đưa ra giải thích chi tiết ngay khi học sinh chọn đáp án.

### 1.5. Chấm điểm Tự động & Lưu trữ Đám mây
* **Nộp bài & Chấm điểm Tức thì**: Chấm code trực tiếp với bộ Test Cases (cả Test công khai và Test ẩn của giáo viên).
* **Bảng kết quả Test Cases chi tiết**:
  * Hiển thị trạng thái ĐÚNG/CHƯA ĐÚNG cho từng test case.
  * So sánh trực quan *Dữ liệu vào (Stdin)*, *Kết quả mong đợi (Expected)* và *Kết quả thực tế của học sinh (Actual Output)*.
  * Đo đạc chính xác thời gian thực thi (Latency tính bằng mili-giây).
* **Tự động sao lưu (Auto-Save)**: Lưu trạng thái bài làm lên Google Cloud Firestore, học sinh đổi máy tính hoặc tải lại trang không bị mất bài.

---

## 2. BỘ CÔNG CỤ SƯ PHẠM & HIỂU SÂU BẢN CHẤT

### 2.1. 🔍 Trực quan hóa Biến theo Từng Dòng (Step-by-Step Variable Tracer)
* **Mục tiêu**: Giúp học sinh lớp 10 hình dung bản chất biến đổi dữ liệu của vòng lặp `for`, `while` và mảng/danh sách mà không cần tưởng tượng trừu tượng.
* **Cơ chế cốt lõi**:
  * Tích hợp công nghệ `sys.settrace` trực tiếp trong CPython WebAssembly, ghi lại trạng thái bộ nhớ sau mỗi dòng lệnh.
  * Giới hạn an toàn (tối đa 150 bước) ngăn ngừa đóng băng trình duyệt khi gặp lặp vô hạn.
* **Tính năng giao diện**:
  * **Highlight dòng đang chạy**: Dòng code đang thực thi được tô sáng màu hổ phách và có biểu tượng con trỏ `▶`.
  * **Bộ điều khiển tua bước (Playback Controls)**: `[⏮ Đầu]`, `[◀ Lùi 1 bước]`, `[Bước X/N]`, `[Tiếp theo ▶]`, `[⏭ Cuối]`.
  * **Chế độ Tự động chạy (Auto-Play)**: Chạy tự động từng bước với 3 tốc độ: `0.7x (chậm)`, `1.0x (chuẩn)`, `2.0x (nhanh)`.
  * **Bảng theo dõi biến (Variables Watcher Table)**:
    * Liệt kê mọi biến trong chương trình: Tên biến, Kiểu dữ liệu (`int`, `str`, `list`, `float`, `bool`), Giá trị hiện tại.
    * **Hiệu ứng đổi màu thông minh**: Biến nào vừa thay đổi giá trị sẽ lập tức gắn nhãn nhấp nháy **`● MỚI ĐỔI`**.
  * **Preview Output đồng bộ**: Khung hiển thị riêng cho biết màn hình đã in ra những gì tính đến bước đó.
  * **Hỗ trợ `input()`**: Tự động nhận diện lệnh `input()` và mở hộp thoại cho phép nhập dữ liệu trước khi chạy, có nút lấy nhanh dữ liệu từ Test Case 1.

### 2.2. 🎯 Trình Thông dịch Lỗi Tiếng Việt Thân thiện (Friendly Error Translator)
* **Mục tiêu**: Xóa bỏ rào cản tiếng Anh kỹ thuật chuyên ngành khiến học sinh bối rối và nản lòng.
* **Cơ chế phân tích**: Bắt và phân tích cú pháp 10+ nhóm lỗi Python phổ biến nhất ở cấp THPT:
  1. `IndentationError`: Quên thụt lề sau `:`, thụt lề không đều giữa phím Tab và phím Space.
  2. `SyntaxError`: Quên dấu hai chấm `:`, mở ngoặc đơn `(` mà quên đóng ngoặc `)`.
  3. `TypeError`: Cộng chuỗi chữ với số nguyên (`str + int`), quên ép kiểu `int(input())`.
  4. `NameError`: Sử dụng biến trước khi gán, gõ sai chính tả tên biến.
  5. `ValueError`: Ép kiểu `int(...)` khi chuỗi đầu vào không phải là chữ số.
  6. `IndexError`: Chỉ số truy cập danh sách vượt quá độ dài (`list index out of range`).
  7. `ZeroDivisionError`: Phép chia cho số 0.
  8. `TimeoutError`: Phát hiện vòng lặp vô hạn vượt quá thời gian cho phép.
* **Giao diện giải thích**:
  * Hộp cảnh báo màu sắc sư phạm xuất hiện ngay trên đầu Console.
  * **Giải thích nguyên nhân**: Diễn giải bằng văn phong tiếng Việt dễ hiểu cho học sinh lớp 10.
  * **Gợi ý khắc phục**: Chỉ rõ cách sửa cụ thể.
  * **Nút `[🔍 Xem dòng X trong Code]`**: Tự động chuyển con trỏ và đưa dòng code sai vào trung tâm màn hình.
  * **Code mẫu so sánh**: Hiển thị bảng đối chiếu *✕ Code chưa đúng* vs *✓ Nên sửa thành*.

---

## 3. PHÂN HỆ GIÁO VIÊN (INSTRUCTOR DASHBOARD)

### 3.1. Soạn thảo & Quản lý Bài tập (Assignment Builder Studio)
* **Tạo và Sửa Bài tập Trực quan**:
  * Đặt tiêu đề, chọn bài học SGK (Bài 16 – Bài 31), phân cấp độ khó.
  * Soạn đề bài bằng định dạng Markdown (hỗ trợ công thức Toán LaTeX `$...$`, bảng biểu, code block, hình ảnh).
  * Khung xem trước (Preview Markdown) thời gian thực.
  * Soạn code mẫu gợi ý ban đầu (Starter Code) cho học sinh.
* **Bộ xây dựng Test Cases Chuyên sâu**:
  * Thêm, bớt, sắp xếp thứ tự các test case.
  * Thiết lập dữ liệu đầu vào (Stdin) và kết quả mong muốn (Stdout).
  * Tính năng **Ẩn/Hiện Test Case**: Cho phép tạo các bài kiểm tra ẩn để đánh giá năng lực tư duy thật sự của học sinh.
  * **Hiển thị ký tự khoảng trắng (Show Whitespace)**: Bật/tắt chế độ hiển thị dấu cách `·` và ký tự xuống dòng `↵` để tránh lỗi lệch khoảng trắng khi chấm chuỗi.
  * **Bộ tạo kết quả tự động (Generate Expected Output)**: Giáo viên gõ lời giải chuẩn (Reference Solution), hệ thống tự chạy để điền đáp án chuẩn vào tất cả các test case.
* **Đồng bộ Đám mây & Khôi phục Dữ liệu Gốc**:
  * Nút **Đẩy lên Cloud**: Đồng bộ toàn bộ bài tập trong Studio lên Firestore Database.
  * Nút **Khôi phục dữ liệu mẫu (Reset Seed Data)**: Có hộp thoại xác nhận an toàn, phòng ngừa bấm nhầm làm mất dữ liệu đã soạn.

### 3.2. Giám sát Bài nộp Thời gian thực (Submissions Monitoring)
* **Bảng danh sách bài nộp toàn trường / toàn khối**:
  * Bộ lọc theo Lớp học (`10A1`, `10A2`, `10A3`, `10A7`, `10A12`, `10A14`...).
  * Bộ lọc theo Tình trạng: Tất cả, Đạt (Passed), Chưa đạt (Failed), Đang làm (In Progress).
  * Xem trực tiếp mã nguồn code của học sinh, kết quả từng test case, thời gian nộp bài.

### 3.3. Thống kê Toàn cảnh Lớp học (Class Overview)
* **Bento Grid Thống kê Tỷ lệ Đạt**:
  * Đo lường tiến độ hoàn thành bài tập của từng lớp.
  * Thống kê số lượng học sinh tham gia, tỷ lệ làm bài thành công theo từng bài học.
  * Nhận diện nhanh các bài tập có tỷ lệ lỗi cao để giáo viên kịp thời giảng lại trên lớp.

### 3.4. Quản lý Tài khoản Học sinh (Students Manager)
* Danh sách học sinh theo từng lớp học.
* Cấp lại mật khẩu nhanh chóng cho học sinh quên tài khoản.
* Theo dõi lịch sử và điểm số cá nhân của từng em.

---

## 4. CHẾ ĐỘ TRÌNH CHIẾU GIẢNG DẠY (PROJECTOR MODE)

* **Thiết kế tối ưu cho Máy chiếu & Tivi màn hình lớn**:
  * Tương phản cao, phông chữ lớn, viền khung đậm rõ nét từ cuối lớp học.
  * Khung trình chiếu code song song với màn hình chạy kết quả.
* **Công cụ giảng bài trực quan**: Giáo viên dùng để demo thuật toán mẫu, chạy thử code của học sinh trước lớp để chữa bài chung.

---

## 5. HẠ TẦNG KỸ THUẬT & RUNTIME THỰC THI

### 5.1. Công nghệ Trình duyệt Độc lập (WebAssembly / Pyodide)
* **Thực thi CPython 3.12 trực tiếp tại Client**:
  * Chạy code Python hoàn toàn trong trình duyệt thông qua WebAssembly, không cần cài đặt Python trên máy tính phòng lab.
  * Không phụ thuộc vào máy chủ backend (Serverless Execution), giúp hệ thống chịu tải hàng ngàn học sinh làm bài đồng thời mà không bị nghẽn mạng hay sập server.
* **Dedicated Web Worker**:
  * Tách biệt luồng chạy Python sang tiến trình nền (Worker riêng biệt).
  * Giao diện người dùng (UI) luôn mượt mà 60fps, không bao giờ bị đơ lag khi học sinh chạy code nặng.
* **Cơ chế Nuốt & Hồi đáp `input()` Tương tác**:
  * Xử lý trơn tru lệnh `input()` trong Python bằng kiến trúc Continuation Replay Bridge, cho phép tương tác nhập/xuất thời gian thực qua terminal.
* **Hệ thống Bảo vệ Ngắt Tiến trình (SIGKILL)**:
  * Nút `[■ DỪNG]` cho phép học sinh hoặc giáo viên hủy ngay lập tức các chương trình bị kẹt trong vòng lặp vô hạn và khởi động lại kernel chỉ trong vài mili-giây.

### 5.2. Đa ngôn ngữ & Giao diện Kỹ thuật Chuẩn mực (Design System)
* **Chroma Technical Bento Grid**: Phong cách thiết kế công nghệ cao, góc cạnh sắc nét, viền cấu trúc 1px, bố cục Bento khoa học.
* **Hỗ trợ Song ngữ Hoàn toàn (VI / EN)**: Chuyển đổi toàn diện ngôn ngữ giao diện tiếng Việt và tiếng Anh chỉ với 1 cú click.

---

## 6. HỆ THỐNG DỮ LIỆU BÀI HỌC & NGÂN HÀNG BÀI TẬP

* **Bám sát Khung Chương trình SGK Tin học 10**:
  * **Bài 16**: Ngôn ngữ lập trình bậc cao và Python.
  * **Bài 17**: Biến và lệnh gán.
  * **Bài 18**: Các lệnh vào ra đơn giản.
  * **Bài 19**: Câu lệnh rẽ nhánh (`if - else`).
  * **Bài 20**: Câu lệnh lặp `for`.
  * **Bài 21**: Câu lệnh lặp `while`.
  * **Bài 22**: Kiểu dữ liệu danh sách (List).
  * **Bài 23 - 24**: Xâu ký tự và các hàm xử lý chuỗi.
  * **Bài 25 - 28**: Chương trình con, hàm (`def`), phạm vi biến.
  * **Bài 29 - 31**: Nhận biết và xử lý lỗi trong Python.
* **Quy mô Ngân hàng Dữ liệu**:
  * **59 bài tập lập trình hoàn chỉnh** (trung bình 5 - 6 bài tập cho mỗi bài học từ cơ bản đến nâng cao).
  * **344 bộ Test Cases chuẩn xác**, bao quát mọi trường hợp biên (edge cases).

---

## 7. BẢO MẬT, CHỐNG GIAN LẬN & PHÂN QUYỀN

### 7.1. Chống Gian lận AI & Chống Sao chép (Anti-Cheat Engine)
* **Khóa sao chép đề bài**: Đề bài tập được áp dụng thuộc tính chống bôi đen (`select-none`) và chặn sự kiện `copy`, ngăn học sinh copy đề bài ném cho ChatGPT/AI giải hộ.
* **Khóa dán code vào Editor (Anti-Paste)**:
  * Chặn triệt để thao tác `Ctrl+V`, `Cmd+V`, `Shift+Insert` và menu chuột phải Paste.
  * Bắt buộc học sinh phải tự tay gõ từng dòng lệnh, từ đó ghi nhớ cú pháp và rèn luyện tư duy lập trình thực tế.
  * Hoạt động ngầm 100%, không để lại nút bấm hay thông báo gây xao nhãng trên thanh công cụ.

### 7.2. Phân quyền Người dùng (Role-Based Access Control)
* **Phân quyền chặt chẽ (`student` vs `instructor`)**:
  * Học sinh chỉ có quyền truy cập Workspace làm bài, xem bài nộp của chính mình, không thể can thiệp vào kho đề bài hoặc xem bài bạn khác.
  * Giáo viên có quyền truy cập toàn diện Dashboard, sửa/xóa bài tập, duyệt điểm và xem mã nguồn toàn bộ học sinh.
* **Tài khoản Demo Một Chạm (One-Click Demo)**:
  * Hỗ trợ đăng nhập nhanh bằng tài khoản Demo Học sinh (`demo1` - Lớp `10A7`) và Demo Giáo viên để kiểm thử tiện lợi mà không cần nhớ mật khẩu.

---
*Tài liệu được tổng hợp tự động và đồng bộ với phiên bản mã nguồn mới nhất của dự án WEBLEARNPYTHON.*
