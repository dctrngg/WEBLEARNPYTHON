# REVISION_COLORS.md — Đổi bảng màu sang tone cam xám ấm

> Tài liệu giao việc cho AI coding agent.
> Dự án đã áp dụng `REVISION_UI_FEATURES.md`. Đợt này **chỉ đổi màu sắc**, không đổi gì khác.

---

## 0. Phạm vi và nguyên tắc

**Chỉ được sửa:** giá trị màu (CSS variables, Tailwind color tokens, class màu, theme Monaco, `design_system.md`).

**Không được sửa:** layout, khoảng cách, typography, hành vi component, logic, nội dung chữ, ánh xạ glyph trạng thái, tên token đã có (chỉ đổi **giá trị**; token mới thì thêm).

**Hướng thiết kế:** tone **cam xám ấm**. Thay dải xám lạnh `zinc` (hơi ngả xanh) bằng dải xám ấm `stone`, giữ cam Chroma làm điểm nhấn. Không dùng thêm màu ngoài bảng ở mục 1, không gradient, không shadow.

**Cách làm:**
1. Tìm tên token/file thật trong repo (thường là `globals.css`, `tailwind.config.*`, theme Monaco, `design_system.md`). Nếu tên khác với file này, thích ứng theo tên thật.
2. Làm theo thứ tự mục 1 → 6, chạy build/lint sau khi xong, rồi nộp báo cáo (mục 7).

---

## 1. Bảng màu mới

Các giá trị là điểm bắt đầu; hãy kiểm tra tương phản ở mục 6.

### 1.1. Light

| Token | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| `--bg-primary` | `#FAFAF9` | Nền trang (giấy ấm) |
| `--bg-surface` | `#FFFFFF` | Nền ô Bento |
| `--bg-subtle` | `#F5F5F4` | Hover, header bảng |
| `--bg-terminal` | `#0E0C0B` | Terminal luôn tối |
| `--bg-active` | `#FDF1EB` | **Token mới:** nền hàng/tab đang chọn (xám pha cam rất nhạt) |
| `--border-grid` | `#E7E5E4` | Đường kẻ 1px |
| `--border-strong` | `#D6D3D1` | Viền nhấn |
| `--text-primary` | `#1C1917` | |
| `--text-secondary` | `#57534E` | |
| `--text-muted` | `#78716C` | Chỉ dùng cho nhãn phụ, không dùng cho nội dung chính hoặc lỗi |
| `--accent-brand` | `#FF5722` | Glyph, viền, nền nút |
| `--accent-brand-text` | `#C2410C` | Chỉ cho chữ nhỏ |
| `--accent-success` | `#10B981` | Glyph, viền |
| `--accent-success-text` | `#047857` | Chỉ cho chữ nhỏ |
| `--accent-warn` | `#F59E0B` | |
| `--accent-danger` | `#C2332E` | Đỏ gạch ấm |

### 1.2. Dark

| Token | Giá trị | Ghi chú |
| :--- | :--- | :--- |
| `--bg-primary` | `#0C0A09` | |
| `--bg-surface` | `#12100F` | |
| `--bg-subtle` | `#1C1917` | |
| `--bg-terminal` | `#070605` | |
| `--bg-active` | `#1C1511` | **Token mới** |
| `--border-grid` | `#292524` | |
| `--border-strong` | `#44403C` | |
| `--text-primary` | `#FAFAF9` | |
| `--text-secondary` | `#A8A29E` | |
| `--text-muted` | `#8A847D` | Có thể hạ xuống `#78716C` nếu muốn mềm hơn (tương phản chỉ ~4:1) |
| `--accent-brand` | `#FF6433` | |
| `--accent-brand-text` | `#FF6433` | |
| `--accent-success` | `#34D399` | |
| `--accent-success-text` | `#34D399` | |
| `--accent-warn` | `#FBBF24` | |
| `--accent-danger` | `#F0716A` | |

### 1.3. Terminal (cố định ở cả hai theme)

| Token | Giá trị |
| :--- | :--- |
| `--term-fg` | `#D6D3D1` |
| `--term-muted` | `#8A847D` |
| `--term-success` | `#34D399` |
| `--term-error` | `#F0716A` |
| `--term-warn` | `#FBBF24` |
| `--term-prompt` | `#FF6433` |

---

## 2. Thay giá trị trong `globals.css`

- [ ] Cập nhật toàn bộ biến ở `:root` (Light) và `.dark` (Dark) theo mục 1.1, 1.2; cập nhật khối `--term-*` theo mục 1.3.
- [ ] Thêm `--bg-active` vào cả hai theme.
- [ ] Nếu cấu hình Tailwind khai báo màu dạng kênh RGB (`--x-rgb`), cập nhật đúng các kênh tương ứng.
- [ ] Khai báo `active` trong Tailwind (`bg-active`) cùng cách với `subtle`.
- [ ] **P2:** thêm vào `@layer base` để đồng bộ tông ấm:

```css
::selection { background: #FF572233; }
* { scrollbar-color: var(--border-strong) transparent; }
```

---

## 3. Thay giá trị cũ còn rải rác trong code

Tìm và thay bằng **token** (ưu tiên). Nếu bắt buộc phải giữ class/hex trực tiếp, dùng bảng ánh xạ dưới đây.

```bash
grep -rEn "zinc-|gray-|slate-|neutral-" src
grep -rEn "#(27272A|3F3F46|A1A1AA|71717A|18181B|111111|0A0A0A|050505|0D0D0D|FAFAFA|09090B|52525B|E4E4E7|D4D4D8|F4F4F5|8A8A94|63636B|F87171|B91C1C)\b" src -i
```

| Giá trị cũ | Giá trị mới |
| :--- | :--- |
| `#0A0A0A` | `#0C0A09` |
| `#111111` | `#12100F` |
| `#18181B` | `#1C1917` |
| `#050505` | `#070605` |
| `#0D0D0D` | `#0E0C0B` |
| `#27272A` | `#292524` |
| `#3F3F46` | `#44403C` |
| `#A1A1AA` | `#A8A29E` |
| `#71717A`, `#8A8A94` (Dark) | `#8A847D` |
| `#71717A`, `#63636B` (Light) | `#78716C` |
| `#FAFAFA` (nền Light) | `#FAFAF9` |
| `#09090B` | `#1C1917` |
| `#52525B` | `#57534E` |
| `#E4E4E7` | `#E7E5E4` |
| `#D4D4D8` | `#D6D3D1` |
| `#F4F4F5` | `#F5F5F4` |
| `#B91C1C` | `#C2332E` |
| `#F87171` | `#F0716A` |

Tailwind class: `zinc-N` → `stone-N` (cùng số). Các class `gray/slate/neutral` cũng đổi sang `stone`.

---

## 4. Dùng `--bg-active` cho trạng thái đang chọn

- [ ] Dòng bài tập đang mở (danh sách EXERCISES), mục đang chọn trong bộ chuyển bài nhanh, hàng đang chọn trong bảng/ma trận: nền `bg-active` + giữ `border-l-2 border-l-brand` (đang dùng `bg-subtle` thì đổi sang `bg-active`).
- [ ] Hover vẫn dùng `bg-subtle` (không đổi). Tab ngang đang chọn giữ `border-b-2 border-brand`, không thêm nền.

---

## 5. Theme Monaco và các màu hard-code còn lại

- [ ] Cập nhật theme Monaco (cả Dark và Light) bằng giá trị mới. Theme phải được định nghĩa lại khi đổi theme app. Gợi ý (điều chỉnh nếu repo đã có tên key khác):

| Thành phần | Giá trị |
| :--- | :--- |
| `editor.background` | giá trị `--bg-terminal` của theme hiện tại |
| `editor.foreground` | `#D6D3D1` |
| `editorLineNumber.foreground` | `#57534E` |
| `editorLineNumber.activeForeground` | `#A8A29E` |
| `editor.lineHighlightBackground` | `#1C1917` |
| `editor.selectionBackground` | `#FF643333` |
| `editorCursor.foreground` | `#FF6433` |
| `editorIndentGuide.background1` | `#292524` |
| `editorBracketMatch.border` | `#FF6433` |

- [ ] Màu cú pháp Python (gợi ý, có thể tinh chỉnh):

| Token | Màu |
| :--- | :--- |
| comment | `#78716C` (nghiêng) |
| keyword | `#FF8A5C` |
| string | `#E7C9A5` |
| number | `#FBBF24` |
| function / identifier | `#F5F5F4` |
| decorator, builtin | `#D6A77A` |

- [ ] Mọi chỗ khác còn hard-code (SVG nội tuyến, ASCII, biểu đồ, thanh tiến độ) đổi sang token.

---

## 6. Kiểm tra

### 6.1. Tương phản (công cụ contrast bất kỳ)

Chữ thường ≥ 4.5:1. Các cặp tối thiểu cần kiểm:

- [ ] `text-secondary` và `text-primary` trên `bg-primary`, `bg-surface`, `bg-subtle`, `bg-active` (cả hai theme).
- [ ] `text-brand-text`, `text-success-text`, `text-danger` trên `bg-primary`, `bg-surface`, `bg-subtle`.
- [ ] `term-fg`, `term-muted`, `term-success`, `term-error`, `term-warn`, `term-prompt` trên `bg-terminal`.
- [ ] Chữ đen trên nền nút `primary` (cam) đạt ≥ 4.5:1.
- [ ] `text-muted` chỉ ở nhãn phụ. Nếu thấp hơn 4.5:1 trên `bg-subtle`/`bg-active`, chấp nhận nhưng ghi vào báo cáo; không dùng cho nội dung chính hoặc lỗi.

### 6.2. Kiểm tra bằng lệnh

```bash
# Kết quả mong đợi: không còn dòng nào
grep -rEn "zinc-|gray-|slate-|neutral-" src
grep -rEn "#(27272A|3F3F46|A1A1AA|71717A|18181B|0A0A0A|050505|09090B|52525B|E4E4E7|F4F4F5)\b" src -i

npx tsc --noEmit && npm run lint && npm run build
```

> Ngoại lệ hợp lệ (nếu có) phải có chú thích giải thích.

### 6.3. Kiểm tra bằng mắt (Dark và Light)

- [ ] Trang đăng nhập, Workspace (panel trái, editor, console, bảng test), Instructor (metrics, builder, ma trận).
- [ ] Nền không còn ngả xanh lạnh; viền 1px vẫn rõ nhưng không chói.
- [ ] Hàng đang chọn nhìn thấy được nền cam xám nhạt cùng viền cam bên trái.
- [ ] Focus ring cam vẫn hiện rõ trên mọi nền.
- [ ] Đổi theme khi Monaco đang mở: màu editor đổi theo ngay.

### 6.4. Cập nhật tài liệu

- [ ] Cập nhật bảng màu và đoạn `globals.css` trong `design_system.md` theo mục 1 (thêm `--bg-active`, ghi rõ "xám ấm stone, không dùng zinc").
- [ ] **Tùy chọn:** cập nhật danh sách màu trong `prompt.md` cho đồng bộ.

---

## 7. Mẫu báo cáo cuối

```
## Đã đổi
- <file>: <một dòng mô tả>

## Còn hard-code / ngoại lệ
- <vị trí> — <lý do>

## Tương phản đã kiểm tra
| Cặp màu | Theme | Tỉ lệ | Đạt? |
| :--- | :--- | :--- | :--- |

## Kết quả kiểm tra
- tsc / lint / build / grep: <kết quả>
```

---

## 8. Các điều cấm

- Không đổi layout, spacing, typography, logic, nội dung chữ hay ánh xạ glyph (D2).
- Không thêm màu ngoài bảng ở mục 1; không gradient, không shadow, không đổi bo góc.
- Không để sót `zinc/gray/slate/neutral` hoặc hex xám lạnh cũ.
- Không dùng màu làm kênh thông tin duy nhất.
