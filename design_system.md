# Chroma UI — Technical Bento Grid Design System

Tài liệu này phân tích chi tiết ngôn ngữ thiết kế của **trychroma.com** và chuyển hóa thành một **Design System** tiêu chuẩn để xây dựng ứng dụng React (kết hợp Tailwind CSS).

---

## Phần 1: Phân tích UI & Kiến trúc Bento Grid của TryChroma

Khác với phong cách Bento Grid của Apple (sử dụng bo góc lớn `24px–32px`, đổ bóng mờ và khoảng trắng `gap` rộng), **TryChroma** sử dụng trường phái **"Exposed Hairline Bento Grid"** (hay còn gọi là *Technical Blueprint / Swiss Developer Grid*).

### 1.1. Đặc trưng cốt lõi của Bento Grid trên TryChroma
1. **Exposed Hairline Borders (Đường viền 1px xuyên suốt):**
   * Các khối (cells) trong Bento Grid không tách rời nhau bằng khoảng trống (`margin`), mà dính liền nhau thông qua hệ thống đường kẻ mỏng `1px solid`.
   * Kỹ thuật CSS chủ đạo: Sử dụng `gap-[1px]` trên một container có màu nền chính là màu của đường viền (`bg-border`), còn các thẻ con bên trong có màu nền trùng với màu trang (`bg-surface`). Cách này giúp tránh hiện tượng đường viền bị dày lên `2px` khi 2 ô nằm cạnh nhau.
2. **Sharp / Micro-Radius Corners (Góc vuông hoặc bo cực nhẹ):**
   * Gần như toàn bộ khung Bento lớn dùng góc vuông (`rounded-none` / `0px`) để tạo cảm giác kiến trúc vững chãi như một bảng mạch hoặc bản vẽ kỹ thuật. Các nút bấm hoặc thẻ code bên trong chỉ bo góc cực nhỏ (`rounded-sm` đến `rounded-md`, khoảng `2px - 6px`).
3. **Typography mang đậm chất Terminal / Kỹ thuật:**
   * Kết hợp giữa **Geometric Sans-serif** (Inter / Geist Sans) cho tiêu đề lớn có độ tương phản cao và **Monospace** (JetBrains Mono / Geist Mono) cho các thông số kỹ thuật, nhãn (badges), bảng độ trễ (latency table) và sơ đồ ASCII.
4. **Sử dụng ASCII Art & Geometric Glyphs làm đồ họa:**
   * Thay vì dùng ảnh minh họa 3D nặng nề, mỗi ô Bento sử dụng các ký tự hình học (`◇`, `◆`, `●`, `◐`, `▣`, `[▶]`) và sơ đồ khối vẽ bằng ký tự ASCII (`┌───┐`, `│`, `░`, `▓`) để minh họa kiến trúc Data Plane / Control Plane và Object Storage.
5. **Bố cục bất đối xứng (Asymmetric Span):**
   * Khung chính chia làm **12 cột** (hoặc 4 cột lớn trên Desktop).
   * Ví dụ phần *Features*: Cột trái chiếm 4/12 cột chứa danh sách các tab tính năng xếp dọc; Cột phải chiếm 8/12 cột chia đôi theo chiều dọc (trên là Code Editor, dưới là Terminal Output).
   * Phần *Performance*: Chia 3 khối bất đối xứng gồm Bảng đo Latency (`p50`, `p90`, `p99`), Thông số kỹ thuật (Key-Value list) và Sơ đồ kiến trúc Zero-ops.

---

## Phần 2: Design Tokens (Hệ thống biến thiết kế)

### 2.1. Bảng màu (Color Palette)
TryChroma sử dụng nền sáng ấm pha chút xám kỹ thuật (Paper/Stone Light Mode) kết hợp với các khối Terminal tối sâu (Dark Carbon) và điểm nhấn màu Cam/Đỏ-Cam đặc trưng của thương hiệu Chroma.

| Token | CSS Variable | Hex (Light Mode) | Hex (Dark Mode) | Mục đích sử dụng |
| :--- | :--- | :--- | :--- | :--- |
| **Background Primary** | `--bg-primary` | `#FAFAFA` | `#0A0A0A` | Nền tổng thể của trang |
| **Surface / Cell Bg** | `--bg-surface` | `#FFFFFF` | `#111111` | Nền của từng ô Bento |
| **Surface Subtle** | `--bg-subtle` | `#F4F4F5` | `#18181B` | Nền phụ, trạng thái hover của ô Bento, header bảng |
| **Surface Terminal** | `--bg-terminal` | `#0D0D0D` | `#050505` | Nền cố định cho khung Code & ASCII Architecture |
| **Border Hairline** | `--border-grid` | `#E4E4E7` | `#27272A` | Đường kẻ `1px` chia cắt các ô Bento |
| **Border Strong** | `--border-strong` | `#D4D4D8` | `#3F3F46` | Viền khi active hoặc đường kẻ nhấn mạnh |
| **Text Primary** | `--text-primary` | `#09090B` | `#FAFAFA` | Tiêu đề, số liệu chính |
| **Text Secondary** | `--text-secondary`| `#52525B` | `#A1A1AA` | Mô tả tính năng trong ô Bento |
| **Text Muted / Mono** | `--text-muted` | `#71717A` | `#71717A` | Nhãn phụ, chú thích đơn vị (`ms`, `QPS`), ký tự ASCII mờ |
| **Accent Brand** | `--accent-brand` | `#FF5722` | `#FF6433` | Màu cam Chroma (Icon điểm nhấn, trạng thái active) |
| **Accent Green** | `--accent-success`| `#10B981` | `#34D399` | Dấu check `✓`, chỉ số latency tốt (`20ms`) |
| **Accent Amber** | `--accent-warn` | `#F59E0B` | `#FBBF24` | Chỉ số Cold Start hoặc highlight phụ |

### 2.2. Typography (Hệ thống chữ)
* **Font Sans (Tiêu đề & Nội dung):** `'Geist Sans'`, `'Inter'`, hoặc `-apple-system, BlinkMacSystemFont, sans-serif`.
* **Font Mono (Code, Specs, ASCII, Badges):** `'Geist Mono'`, `'JetBrains Mono'`, hoặc `'Fira Code', monospace`.

| Cấp độ | Class gợi ý | Kích thước | Line Height | Letter Spacing | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `text-hero` | `3.25rem` (52px) | `1.08` | `-0.03em` | Sans (`font-semibold`) |
| **Section Heading** | `text-h2` | `2rem` (32px) | `1.15` | `-0.025em` | Sans (`font-semibold`) |
| **Bento Card Title**| `text-h3` | `1.125rem` (18px)| `1.4` | `-0.01em` | Sans (`font-medium`) |
| **Body Copy** | `text-body` | `0.9375rem` (15px)| `1.6` | `0em` | Sans (`font-normal`) |
| **Mono Label/Badge**| `text-mono-sm` | `0.75rem` (12px) | `1.2` | `+0.04em` | Mono (`uppercase`) |
| **Code / ASCII** | `text-mono-code`| `0.8125rem` (13px)| `1.5` | `0em` | Mono |

### 2.3. Hệ thống Ký tự Hình học (Geometric Glyphs)
Sử dụng trực tiếp các ký tự Unicode trong font Monospace để làm icon giống hệt TryChroma:
* Features: `◇` (Sparse), `◆` (Vector), `●` (Full-text), `◐` (Metadata), `◊` (Forking), `▣` (CLI)
* Section Markers: `[▶]` (Videos), `[●]` (Community), `[◆]` (Support), `[▲]` (Research), `[■]` (Updates)

---

## Phần 3: Cấu hình Tailwind CSS (`tailwind.config.js` & `globals.css`)

### 3.1. File `globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg-primary: #FAFAFA;
    --bg-surface: #FFFFFF;
    --bg-subtle: #F4F4F5;
    --bg-terminal: #0D0D0D;
    --border-grid: #E4E4E7;
    --border-strong: #D4D4D8;
    --text-primary: #09090B;
    --text-secondary: #52525B;
    --text-muted: #71717A;
    --accent-brand: #FF5722;
    --accent-success: #10B981;
  }

  .dark {
    --bg-primary: #0A0A0A;
    --bg-surface: #111111;
    --bg-subtle: #18181B;
    --bg-terminal: #050505;
    --border-grid: #27272A;
    --border-strong: #3F3F46;
    --text-primary: #FAFAFA;
    --text-secondary: #A1A1AA;
    --text-muted: #71717A;
    --accent-brand: #FF6433;
    --accent-success: #34D399;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
    -webkit-font-smoothing: antialiased;
  }
}

/* Tiện ích tạo nền chấm bi (Dot Matrix) hoặc sọc chéo kỹ thuật bên trong Bento Cell */
.bg-dot-matrix {
  background-image: radial-gradient(var(--border-strong) 1px, transparent 1px);
  background-size: 16px 16px;
}

.bg-diagonal-stripes {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 6px,
    var(--bg-subtle) 6px,
    var(--bg-subtle) 12px
  );
}
```

### 3.2. File `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        subtle: "var(--bg-subtle)",
        terminal: "var(--bg-terminal)",
        grid: "var(--border-grid)",
        "grid-strong": "var(--border-strong)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        brand: "var(--accent-brand)",
        success: "var(--accent-success)",
      },
      fontFamily: {
        sans: ["Geist Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
```

---

## Phần 4: Kiến trúc React Components cho Bento Grid

Để tái sử dụng chuẩn xác phong cách của TryChroma, bạn nên xây dựng bộ khung gồm 4 Component chính:
1. `<BentoSection />`: Khung giới hạn chiều rộng (`max-w-6xl`), có đường kẻ dọc hai bên lề chạy xuyên suốt từ trên xuống dưới trang.
2. `<BentoGrid />`: Khung CSS Grid sử dụng kỹ thuật `bg-grid gap-[1px] border border-grid` để tự động vẽ đường kẻ `1px` giữa mọi ô con.
3. `<BentoCell />`: Từng ô nội dung, nhận props `colSpan`, `rowSpan`, `interactive` (có hiệu ứng đổi màu nền nhẹ khi di chuột).
4. `<SectionHeader />`: Thanh tiêu đề phân tách các khu vực kèm theo ký tự vuông `[■]` hoặc hình thoi `◆`.

### 4.1. Code mẫu `BentoPrimitives.tsx`

```tsx
import React from "react";

interface BentoGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 12;
  className?: string;
}

/**
 * Container chính sử dụng kỹ thuật gap-[1px] trên nền màu border (bg-grid)
 * để tạo đường kẻ mảnh 1px chuẩn xác mà không bị trùng lặp viền.
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  cols = 12,
  className = "",
}) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    12: "grid-cols-1 md:grid-cols-12",
  };

  return (
    <div
      className={`grid ${colClasses[cols]} bg-grid gap-[1px] border border-grid ${className}`}
    >
      {children}
    </div>
  );
};

interface BentoCellProps {
  children: React.ReactNode;
  colSpan?: string; // Ví dụ: "md:col-span-4", "md:col-span-8"
  rowSpan?: string;
  interactive?: boolean;
  noPadding?: boolean;
  className?: string;
}

export const BentoCell: React.FC<BentoCellProps> = ({
  children,
  colSpan = "md:col-span-4",
  rowSpan = "",
  interactive = false,
  noPadding = false,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-surface relative flex flex-col justify-between
        ${noPadding ? "p-0" : "p-6 md:p-8"}
        ${interactive ? "transition-colors duration-150 hover:bg-subtle cursor-pointer group" : ""}
        ${colSpan} ${rowSpan} ${className}
      `}
    >
      {children}
    </div>
  );
};

interface SectionBadgeProps {
  glyph?: string;
  label: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  glyph = "◆",
  label,
}) => (
  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-secondary mb-3">
    <span className="text-brand">{glyph}</span>
    <span>{label}</span>
  </div>
);
```

---

## Phần 5: Các Mẫu Bento Block Đặc Trưng (Chroma Patterns)

Dưới đây là 3 cụm Bento đặc trưng nhất trên trang chủ `trychroma.com` đã được viết thành React Component để bạn đưa thẳng vào dự án:

### 5.1. Pattern 1: Value Proposition Strip (3 cột ngang + Metrics)
Khối nằm ngay dưới phần Hero, kết hợp các con số thống kê dạng Mono ở thanh trên và 3 trụ cột giá trị ở dưới.

```tsx
export const ValuePropBento = () => {
  return (
    <section className="max-w-6xl mx-auto my-12">
      {/* Thanh thông số kỹ thuật nhỏ phía trên */}
      <div className="grid grid-cols-3 bg-grid gap-[1px] border-x border-t border-grid font-mono text-xs text-secondary">
        <div className="bg-subtle px-4 py-2.5 flex items-center justify-between">
          <span>DOWNLOADS</span>
          <strong className="text-primary">15M+ / MO</strong>
        </div>
        <div className="bg-subtle px-4 py-2.5 flex items-center justify-between">
          <span>LICENSE</span>
          <strong className="text-primary">APACHE 2.0</strong>
        </div>
        <div className="bg-subtle px-4 py-2.5 flex items-center justify-between">
          <span>GITHUB</span>
          <strong className="text-primary">★ 27.0K</strong>
        </div>
      </div>

      {/* 3 Ô Bento chính */}
      <BentoGrid cols={3}>
        <BentoCell colSpan="md:col-span-1" interactive>
          <div>
            <SectionBadge glyph="◇" label="01 / SPEED" />
            <h3 className="text-lg font-medium text-primary mb-2">
              Low latency search
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              Fast queries over billions of multi-tenant indexes with hot memory
              and warm SSD caching.
            </p>
          </div>
        </BentoCell>

        <BentoCell colSpan="md:col-span-1" interactive>
          <div>
            <SectionBadge glyph="◆" label="02 / ECONOMICS" />
            <h3 className="text-lg font-medium text-primary mb-2">
              Up to 10x cheaper
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              Built natively on object storage with automatic query-aware data
              tiering.
            </p>
          </div>
        </BentoCell>

        <BentoCell colSpan="md:col-span-1" interactive>
          <div>
            <SectionBadge glyph="▣" label="03 / INFRASTRUCTURE" />
            <h3 className="text-lg font-medium text-primary mb-2">
              No engineering ops
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              Scales seamlessly with your data and traffic. SOC 2 Type II
              certified.
            </p>
          </div>
        </BentoCell>
      </BentoGrid>
    </section>
  );
};
```

### 5.2. Pattern 2: Interactive Feature Selector + Split Code/Terminal Bento
Khối Bento phức tạp nhất trên trang: Cột trái (4 cột) là danh sách 6 tính năng có viền phân cách `1px`, cột phải (8 cột) chia làm khung Code phía trên và khung Terminal Output phía dưới.

```tsx
import React, { useState } from "react";

const FEATURES = [
  { id: "sparse", glyph: "◇", title: "Sparse vector search", desc: "Lexical search (BM25, SPLADE)" },
  { id: "vector", glyph: "◆", title: "Vector search", desc: "Semantic similarity search" },
  { id: "fulltext", glyph: "●", title: "Full-text search", desc: "Trigram and regex search" },
  { id: "metadata", glyph: "◐", title: "Metadata search", desc: "Filtering and faceted search" },
  { id: "forking", glyph: "◊", title: "Forking", desc: "Dataset versioning & A/B testing" },
  { id: "cli", glyph: "▣", title: "CLI", desc: "Command-line tools for development" },
];

export const FeatureInteractiveBento = () => {
  const [activeTab, setActiveTab] = useState("sparse");

  return (
    <section className="max-w-6xl mx-auto my-16">
      <BentoGrid cols={12}>
        {/* CỘT TRÁI (4/12): Danh sách Tab chia từng ô 1px */}
        <BentoCell colSpan="md:col-span-4" noPadding>
          <div className="divide-y divide-grid h-full flex flex-col">
            {FEATURES.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left p-5 transition-colors flex items-start gap-3.5 flex-1 ${
                    isActive
                      ? "bg-subtle border-l-2 border-l-brand"
                      : "bg-surface hover:bg-subtle/60"
                  }`}
                >
                  <span className={`font-mono text-base mt-0.5 ${isActive ? "text-brand" : "text-muted"}`}>
                    {item.glyph}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-primary">
                      {item.title}
                    </div>
                    <div className="text-xs text-secondary mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </BentoCell>

        {/* CỘT PHẢI (8/12): Khung Code & Terminal Output */}
        <BentoCell colSpan="md:col-span-8" noPadding className="bg-terminal text-zinc-100">
          <div className="flex flex-col h-full divide-y divide-zinc-800">
            {/* Header thanh ngôn ngữ */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 font-mono text-xs">
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-zinc-800 text-white rounded-sm">TypeScript</span>
                <span className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer">Python</span>
                <span className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer">Rust</span>
              </div>
              <button className="text-zinc-400 hover:text-white">Copy</button>
            </div>

            {/* Khung Code */}
            <pre className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto text-zinc-300 flex-1">
{`// Configure client for ${activeTab} embeddings
const sparseRank = Knn({ query: "ML", key: "sparse_embedding" });

// Build and execute search
const search = new Search()
  .rank(sparseRank)
  .limit(10)
  .select(K.DOCUMENT, K.SCORE);

const results = await collection.search(search);`}
            </pre>

            {/* Khung Terminal Output */}
            <div className="p-6 bg-black/60 font-mono text-xs space-y-1.5">
              <div className="text-zinc-500 uppercase tracking-wider mb-2">Terminal Output</div>
              <div className="text-zinc-300">$ node sparse-search.js</div>
              <div className="text-emerald-400">✓ Connected successfully</div>
              <div className="text-emerald-400">✓ Query completed in 18ms</div>
              <div className="text-zinc-400 pt-1">
                {`[ { id: "id1", score: 0.87 }, { id: "id2", score: 0.45 } ]`}
              </div>
            </div>
          </div>
        </BentoCell>
      </BentoGrid>
    </section>
  );
};
```

### 5.3. Pattern 3: Performance Metrics, Latency Table & ASCII Architecture Bento
Khối Bento trình diễn năng lực kỹ thuật với bảng dữ liệu `p50/p90/p99` và sơ đồ kiến trúc vẽ bằng ký tự ASCII.

```tsx
export const PerformanceBento = () => {
  return (
    <section className="max-w-6xl mx-auto my-16">
      <BentoGrid cols={12}>
        {/* Ô 1 (4/12): Bảng Latency */}
        <BentoCell colSpan="md:col-span-4">
          <div>
            <SectionBadge glyph="[▲]" label="LATENCY" />
            <h3 className="text-base font-medium text-primary">Query Latency</h3>
            <p className="text-xs font-mono text-muted mt-1 mb-6">
              @384 dim at 100k vectors
            </p>

            {/* Bảng kẻ ô vuông vức */}
            <div className="border border-grid font-mono text-xs">
              <div className="grid grid-cols-3 bg-subtle border-b border-grid py-2 px-3 text-secondary">
                <span>METRIC</span>
                <span>WARM</span>
                <span>COLD</span>
              </div>
              <div className="grid grid-cols-3 border-b border-grid py-2.5 px-3">
                <span className="text-muted">p50</span>
                <span className="text-success font-semibold">20ms</span>
                <span className="text-primary">650ms</span>
              </div>
              <div className="grid grid-cols-3 border-b border-grid py-2.5 px-3">
                <span className="text-muted">p90</span>
                <span className="text-success font-semibold">27ms</span>
                <span className="text-primary">1.2s</span>
              </div>
              <div className="grid grid-cols-3 py-2.5 px-3">
                <span className="text-muted">p99</span>
                <span className="text-success font-semibold">57ms</span>
                <span className="text-primary">1.5s</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted mt-6">
            Dedicated clusters can be scaled to your specific requirements.
          </p>
        </BentoCell>

        {/* Ô 2 (4/12): Technical Specs (Key - Value) */}
        <BentoCell colSpan="md:col-span-4">
          <div>
            <SectionBadge glyph="[■]" label="TECHNICAL SPECS" />
            <h3 className="text-base font-medium text-primary mb-6">
              System Throughput
            </h3>

            <dl className="divide-y divide-grid border-y border-grid font-mono text-xs">
              <div className="py-3 flex justify-between">
                <dt className="text-secondary">Write throughput</dt>
                <dd className="text-primary font-medium">30 MB/s (2000+ QPS)</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-secondary">Concurrent reads</dt>
                <dd className="text-primary font-medium">10 (200+ QPS)</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-secondary">Collections / DB</dt>
                <dd className="text-primary font-medium">1,000,000</dd>
              </div>
              <div className="py-3 flex justify-between">
                <dt className="text-secondary">Recall accuracy</dt>
                <dd className="text-success font-medium">90–100%</dd>
              </div>
            </dl>
          </div>
        </BentoCell>

        {/* Ô 3 (4/12): Sơ đồ ASCII Zero-ops Infra */}
        <BentoCell colSpan="md:col-span-4" className="bg-dot-matrix">
          <div>
            <SectionBadge glyph="[●]" label="ZERO-OPS INFRA" />
            <pre className="font-mono text-[11px] leading-tight text-primary bg-surface p-4 border border-grid overflow-x-auto my-2">
{`┌───────────────────────────────┐
│ Query Layer                   │
│  • Fast memory cache (hot)    │
│  • SSD cache (warm)           │
└───────────────────────────────┘
        ↕ Intelligent tiering
┌───────────────────────────────┐
│ Storage Layer (S3 / GCS)      │
│  • All vectors & metadata     │
└───────────────────────────────┘`}
            </pre>
          </div>

          <ul className="font-mono text-xs text-secondary space-y-1.5 mt-4">
            <li><span className="text-success mr-2">✓</span>Auto-scales with usage</li>
            <li><span className="text-success mr-2">✓</span>No manual index tuning</li>
            <li><span className="text-success mr-2">✓</span>Object storage ($0.02/GB/mo)</li>
          </ul>
        </BentoCell>
      </BentoGrid>
    </section>
  );
};
```

---

## Phần 6: Quy tắc Vàng (Do's & Don'ts) khi phát triển dự án

1. **KHÔNG dùng `shadow-lg` hay `rounded-2xl`:** Phong cách của TryChroma dựa hoàn toàn vào độ sắc nét của đường kẻ `1px` (`border-grid`). Mọi hiệu ứng đổ bóng mờ đều làm mất chất "Technical Blueprint".
2. **LUÔN căn lề theo trục dọc xuyên suốt (Structural Guide Lines):** Toàn bộ các khối Bento từ đầu trang đến cuối trang phải nằm gọn trong một trục `max-w-6xl border-x border-grid` để tạo hiệu ứng như một trang tài liệu kỹ thuật liền mạch.
3. **Tương phản Font chữ rõ ràng:**
   * Tiêu đề lớn: Dùng font Sans-serif, căn sát chữ (`tracking-tight`).
   * Mọi con số, đơn vị đo lường, nhãn danh mục, nút chuyển tab: Bắt buộc dùng font `font-mono`.
4. **Hiệu ứng Hover tiết chế:** Khi hover vào một ô Bento, không phóng to (`scale-105`) mà chỉ đổi màu nền từ `bg-surface` sang `bg-subtle` kèm theo việc đổi màu ký tự hình học (`◇` -> màu cam `text-brand`).