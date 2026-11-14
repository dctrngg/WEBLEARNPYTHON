# CHROMA_PY // Cloud-Based Educational Python Web IDE

Một môi trường phát triển tích hợp (IDE) Python chạy trực tiếp trên trình duyệt được thiết kế cho mục đích giáo dục, tuân thủ nghiêm ngặt ngôn ngữ thiết kế **Chroma UI — Technical Bento Grid Design System** (*Exposed Hairline Bento Grid / Technical Blueprint*).

---

## 1. Kiến trúc & Công nghệ cốt lõi

* **Frontend Framework:** React 18 + Vite + TypeScript.
* **UI & Styling:** Tailwind CSS kết hợp hệ thống biến thiết kế Chroma UI (`--bg-primary`, `--bg-surface`, `--bg-subtle`, `--bg-terminal`, `--border-grid`, `--accent-brand`), hỗ trợ chuyển đổi **Dark Mode (Carbon)** và **Light Mode (Paper/Stone)**, hệ thống ký tự hình học Unicode (`◇`, `◆`, `●`, `◐`, `▣`, `[▶]`, `[■]`), cùng bố cục chia khung linh hoạt (`react-resizable-panels`).
* **Trình soạn thảo Code:** `@monaco-editor/react` cấu hình cho Python 3.12 với theme `chroma-carbon-dark` (`#050505`), tô màu cặp ngoặc, và gợi ý lệnh thông minh (IntelliSense).
* **Client-Side Python Engine:** **Pyodide (CPython 3.12 WebAssembly)** thực thi bên trong một **Dedicated Web Worker** (`/pyodideWorker.js`) giúp:
  * Không bao giờ làm đơ giao diện (UI thread) kể cả khi học viên viết vòng lặp vô hạn `while True`.
  * Hỗ trợ nút **`[■] STOP`** để hủy (`worker.terminate()`) và khởi tạo lại Worker tức thì.
  * Chuyển hướng `sys.stdout`, `sys.stderr` và hỗ trợ hàm **`input()` tương tác trực tiếp** trên Terminal.
  * Chấm điểm tự động (**Automated Test Runner**) đối chiếu các bộ test case công khai và ẩn (`isHidden`) kèm đo độ trễ thực thi (`ms`).
* **Backend-as-a-Service (BaaS):** Firebase v10+ Modular SDK (`Authentication` + `Cloud Firestore` cho 3 collections `users`, `assignments`, `submissions`), tích hợp sẵn chế độ **Local Cloud Emulator** tự động kích hoạt khi chưa cấu hình `.env` (có sẵn 5 bài tập thuật toán Python và dữ liệu mẫu).

---

## 2. Cấu trúc thư mục

```text
├── public/
│   └── pyodideWorker.js                 # Web Worker chạy Pyodide WASM, xử lý stdout/stderr/input() & chấm bài
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.tsx       # Route Guard kiểm tra đăng nhập & phân quyền RBAC (student / instructor)
│   │   ├── layout/
│   │   │   └── TopNavigationBar.tsx     # Thanh trạng thái Monospace, báo hiệu WASM, đổi Theme & Role
│   │   └── ui/
│   │       ├── BentoPrimitives.tsx      # BentoSection, BentoGrid, BentoCell, SectionBadge & 3 Chroma Patterns
│   │       ├── FirebaseConfigModal.tsx  # Cửa sổ cấu hình khóa Firebase v10 trực tiếp trên giao diện
│   │       └── MarkdownRenderer.tsx     # Bộ hiển thị đề bài Markdown chuẩn kỹ thuật
│   ├── contexts/
│   │   ├── AuthContext.tsx              # Quản lý phiên đăng nhập Firebase Auth / Google OAuth / Demo Emulator
│   │   └── ThemeContext.tsx             # Quản lý chế độ Carbon Dark / Paper Light
│   ├── firebase/
│   │   └── config.ts                    # Khởi tạo Firebase v10 Modular SDK
│   ├── hooks/
│   │   └── usePyodide.ts                # Custom Hook điều phối Web Worker, input() bridge & Test Suite
│   ├── pages/
│   │   ├── BlueprintPage.tsx            # Trang tổng quan kiến trúc & các mẫu Chroma Bento Grid
│   │   ├── LoginPage.tsx                # Trang Đăng nhập / Đăng ký & truy cập nhanh 1-click Demo
│   │   ├── StudentWorkspacePage.tsx     # Giao diện IDE 3 khung (Đề bài, Monaco Editor, Terminal & Test Cases)
│   │   └── InstructorDashboardPage.tsx  # Bảng điều khiển Giảng viên (CRUD bài tập, Test Cases, Bảng điểm)
│   ├── services/
│   │   ├── firestoreService.ts          # Lớp truy xuất Firestore cho users, assignments, submissions
│   │   └── seedData.ts                  # 5 bài tập Python mẫu kèm bộ Test Cases công khai & ẩn
│   ├── types/
│   │   └── ide.ts                       # Định nghĩa kiểu dữ liệu TypeScript
│   ├── App.tsx                          # Định tuyến React Router v6
│   ├── globals.css                      # Biến màu CSS Chroma UI, .bg-dot-matrix, .bg-diagonal-stripes
│   └── main.tsx                         # Điểm khởi chạy ứng dụng
├── firestore.rules                      # Quy tắc bảo mật Cloud Firestore RBAC
├── tailwind.config.js                   # Cấu hình Tailwind CSS theo Chroma Design Tokens
└── package.json
```

---

## 3. Hướng dẫn khởi chạy

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```

3. **Build bản Production:**
   ```bash
   npm run build
   ```

