import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * 1. <BentoSection />
 * Khung giới hạn chiều rộng (max-w-6xl), có đường kẻ dọc hai bên lề chạy xuyên suốt từ trên xuống dưới trang.
 */
interface BentoSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const BentoSection: React.FC<BentoSectionProps> = ({
  children,
  className = "",
  id,
}) => {
  return (
    <section
      id={id}
      className={`max-w-6xl mx-auto border-x border-grid ${className}`}
    >
      {children}
    </section>
  );
};

/**
 * 2. <BentoGrid />
 * Container chính sử dụng kỹ thuật gap-[1px] trên nền màu border (bg-grid)
 * để tạo đường kẻ mảnh 1px chuẩn xác mà không bị trùng lặp viền.
 */
interface BentoGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 12;
  className?: string;
}

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
      className={`grid ${colClasses[cols]} bg-grid gap-[1px] border border-grid neo-box ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * 3. <BentoCell />
 * Từng ô nội dung, nhận props colSpan, rowSpan, interactive (hiệu ứng đổi màu nền nhẹ khi di chuột).
 */
interface BentoCellProps {
  children: React.ReactNode;
  colSpan?: string;
  rowSpan?: string;
  interactive?: boolean;
  noPadding?: boolean;
  justify?: "between" | "start" | "center" | "end";
  className?: string;
  onClick?: () => void;
}

export const BentoCell: React.FC<BentoCellProps> = ({
  children,
  colSpan = "md:col-span-4",
  rowSpan = "",
  interactive = false,
  noPadding = false,
  justify,
  className = "",
  onClick,
}) => {
  const hasCustomJustify = className.includes("justify-");
  const justifyClass = hasCustomJustify
    ? ""
    : justify
    ? `justify-${justify}`
    : "justify-between";

  return (
    <div
      onClick={onClick}
      className={`
        bg-surface relative flex flex-col ${justifyClass} rounded-none
        ${noPadding ? "p-0" : "p-6 md:p-8"}
        ${
          interactive
            ? "transition-colors duration-150 hover:bg-subtle cursor-pointer group"
            : ""
        }
        ${colSpan} ${rowSpan} ${className}
      `}
    >
      {children}
    </div>
  );
};

/**
 * 4. <SectionBadge /> & <SectionHeader />
 */
interface SectionBadgeProps {
  glyph?: string;
  label: string;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({
  glyph = "◆",
  label,
  className = "",
}) => (
  <div
    className={`inline-flex items-center gap-2 font-mono text-xs text-secondary mb-3 ${className}`}
  >
    <span className="text-brand transition-colors group-hover:text-brand">
      {glyph}
    </span>
    <span>{label}</span>
  </div>
);

interface SectionHeaderProps {
  glyph?: string;
  badge: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  glyph = "[■]",
  badge,
  title,
  subtitle,
  rightElement,
}) => (
  <div className="bg-surface px-6 py-5 border-b border-grid flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <div className="inline-flex items-center gap-2 font-mono text-xs text-secondary mb-1">
        <span className="text-brand">{glyph}</span>
        <span>{badge}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs font-mono text-secondary mt-1">{subtitle}</p>
      )}
    </div>
    {rightElement && <div className="flex items-center gap-2">{rightElement}</div>}
  </div>
);

/**
 * Pattern 1: Value Proposition Strip (3 cột ngang + Metrics)
 */
export const ValuePropBento: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 bg-grid gap-[1px] border-t border-grid font-mono text-xs text-secondary">
        <div className="bg-subtle px-6 py-3 flex items-center justify-between">
          <span>{t("Nhân thực thi", "Runtime engine")}</span>
          <strong className="text-primary">PYODIDE WASM (CPYTHON 3.12)</strong>
        </div>
        <div className="bg-subtle px-6 py-3 flex items-center justify-between">
          <span>{t("Luồng xử lý", "Execution thread")}</span>
          <strong className="text-success">
            {t("Web worker độc lập", "Isolated web worker")}
          </strong>
        </div>
        <div className="bg-subtle px-6 py-3 flex items-center justify-between">
          <span>{t("Đồng bộ đám mây", "Cloud sync")}</span>
          <strong className="text-primary">FIRESTORE REALTIME</strong>
        </div>
      </div>

      <BentoGrid cols={3}>
        <BentoCell colSpan="md:col-span-1" interactive>
          <div>
            <SectionBadge
              glyph="◇"
              label={t("01 / Độ trễ bằng không", "01 / Zero-latency WASM")}
            />
            <h3 className="text-lg font-medium text-primary mb-2">
              {t(
                "Thực thi Python ngay trên Trình duyệt",
                "Client-Side Python Execution"
              )}
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              {t(
                "Chạy trực tiếp bytecode CPython 3.12 trong Web Worker mà không tốn chi phí máy chủ, truyền luồng stdout/stderr tức thì.",
                "Executes full CPython bytecode directly inside a browser Web Worker with zero backend container cold-starts and instant stdout/stderr streaming."
              )}
            </p>
          </div>
        </BentoCell>

        <BentoCell colSpan="md:col-span-1" interactive>
          <div>
            <SectionBadge
              glyph="◆"
              label={t("02 / Trải nghiệm chuẩn vs code", "02 / Technical ergonomics")}
            />
            <h3 className="text-lg font-medium text-primary mb-2">
              {t("Monaco Editor + Nhập liệu input()", "Monaco + Interactive Stdin")}
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              {t(
                "Trình soạn thảo chuẩn VS Code tích hợp gợi ý lệnh Python IntelliSense, ngắt vòng lặp vô hạn an toàn và hỗ trợ nhập ",
                "VS Code-grade editor with Python IntelliSense, bracket colorization, infinite-loop worker termination, and real-time interactive "
              )}
              <code className="font-mono text-xs text-brand">input()</code>{" "}
              {t("trực tiếp trên Terminal.", "prompts.")}
            </p>
          </div>
        </BentoCell>

        <BentoCell colSpan="md:col-span-1" interactive>
          <div>
            <SectionBadge
              glyph="▣"
              label={t("03 / Chấm điểm tự động", "03 / Cloud auto-grading")}
            />
            <h3 className="text-lg font-medium text-primary mb-2">
              {t(
                "Chấm Test Cases & Phân quyền RBAC",
                "Automated Test Suite & RBAC"
              )}
            </h3>
            <p className="text-sm text-secondary leading-relaxed">
              {t(
                "Giảng viên soạn đề bài Markdown và bộ test cases ẩn; học viên nhận kết quả chấm điểm tức thì và tự động lưu code lên đám mây sau mỗi 10 giây.",
                "Instructors author Markdown problems and hidden test cases; students get instant deterministic grading and automatic 10s cloud code persistence."
              )}
            </p>
          </div>
        </BentoCell>
      </BentoGrid>
    </div>
  );
};

/**
 * Pattern 2: Interactive Feature Selector + Split Code/Terminal Bento
 */
export const FeatureInteractiveBento: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("worker");
  const [copied, setCopied] = useState(false);

  const IDE_FEATURES = [
    {
      id: "worker",
      glyph: "◇",
      title: t("Nhân Pyodide trên Web Worker", "Web Worker Pyodide Engine"),
      desc: t(
        "Thực thi WASM bất đồng bộ, ngắt vòng lặp vô hạn tức thì",
        "Non-blocking WASM execution with hard loop termination"
      ),
      code: `# Quy trình thực thi Python trên Web Worker
import sys
import time

def fibonacci_stream(n: int):
    a, b = 0, 1
    for i in range(n):
        print(f"[step {i:02d}] val = {a}")
        a, b = b, a + b

fibonacci_stream(6)`,
      output: [
        "$ pyodide-worker run solution.py",
        "✓ WASM runtime warm (CPython 3.12.1)",
        "[step 00] val = 0",
        "[step 01] val = 1",
        "[step 02] val = 1",
        "[step 03] val = 2",
        "[step 04] val = 3",
        "[step 05] val = 5",
        "✓ Execution completed in 11.4ms",
      ],
    },
    {
      id: "stdin",
      glyph: "◆",
      title: t("Cầu nối Nhập liệu input() Tương tác", "Interactive Stdin Bridge"),
      desc: t(
        "Tạm dừng và tiếp tục thực thi khi gọi hàm input() trên Terminal",
        "Synchronous input() pause & resume via terminal stream"
      ),
      code: `# Cầu nối nhập dữ liệu chuẩn (stdin) tương tác
student_name = input("Nhập tên học viên: ")
target_score = int(input("Nhập điểm mục tiêu: "))

status = "PASSED" if target_score >= 80 else "IN_PROGRESS"
print(f"Học viên {student_name} -> Trạng thái: {status} ({target_score}%)")`,
      output: [
        "$ pyodide-worker run interactive_io.py",
        "? Nhập tên học viên: > alex_dev",
        "? Nhập điểm mục tiêu: > 96",
        "Học viên alex_dev -> Trạng thái: PASSED (96%)",
        "✓ Stdin stream closed cleanly (14.2ms)",
      ],
    },
    {
      id: "grading",
      glyph: "●",
      title: t("Bộ Chấm Điểm Tự Động (Auto-Grader)", "Deterministic Auto-Grader"),
      desc: t(
        "Kiểm thử bộ Test Case công khai & ẩn kèm đo độ trễ mili-giây",
        "Public & hidden test case validation with ms telemetry"
      ),
      code: `# Bộ khung chấm điểm tự động (Test Runner)
def two_sum_indices(nums: list[int], target: int) -> list[int]:
    seen = {}
    for idx, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], idx]
        seen[num] = idx
    return []`,
      output: [
        "$ chroma-grader evaluate --assignment=two-sum",
        "✓ CASE 01 [Public]  input='2 7 11 15 | 9'  -> [0, 1] (4.1ms)",
        "✓ CASE 02 [Public]  input='3 2 4 | 6'      -> [1, 2] (2.8ms)",
        "✓ CASE 03 [Hidden]  [ĐÃ ẨN // TEST ẨN]     -> PASSED (3.2ms)",
        "✓ KẾT QUẢ: ĐẠT 3/3 (100% ĐIỂM ĐÃ LƯU LÊN FIRESTORE)",
      ],
    },
    {
      id: "autosave",
      glyph: "◐",
      title: t("Tự Động Lưu Đám Mây (Auto-Save)", "Debounced Cloud Persistence"),
      desc: t(
        "Tự động đồng bộ code lên Firestore sau 10 giây ngừng gõ",
        "10-second inactivity auto-save to Firestore submissions"
      ),
      code: `// Cấu trúc Document lưu bài nộp trên Cloud Firestore
// Collection: submissions / \${uid}_\${assignmentId}
{
  "userId": "usr_98a7f1c",
  "assignmentId": "asgn_binary_search",
  "status": "passed",
  "lastExecutedOutput": "Found target at index 4\\n",
  "updatedAt": "2026-11-14T08:50:00Z"
}`,
      output: [
        "$ firestore-sync --collection=submissions",
        "✓ Debounce timer triggered (10,000ms idle)",
        "✓ Document uid_asgn_binary_search committed",
        "✓ Role-Based Security Rule verified (request.auth.uid == userId)",
      ],
    },
    {
      id: "rbac",
      glyph: "◊",
      title: t("Studio Soạn Bài cho Giảng Viên", "Instructor Assignment Studio"),
      desc: t(
        "Soạn đề bài Markdown, tạo Test Cases động & theo dõi tiến độ",
        "Markdown problem authoring & live submission telemetry"
      ),
      code: `# Cấu trúc khai báo Test Cases của Giảng viên
test_cases = [
    {"input": "10\\n20", "expectedOutput": "30", "isHidden": False},
    {"input": "-5\\n5",  "expectedOutput": "0",  "isHidden": False},
    {"input": "999999\\n1", "expectedOutput": "1000000", "isHidden": True},
]`,
      output: [
        "$ chroma-instructor publish --difficulty=Intermediate",
        "✓ Markdown problem description compiled",
        "✓ 3 test vectors registered (1 hidden)",
        "✓ Published to /workspace live feed",
      ],
    },
    {
      id: "bento",
      glyph: "▣",
      title: t(
        "Kiến Trúc Đường Viền Mảnh 1px (Chroma UI)",
        "Exposed Hairline Architecture"
      ),
      desc: t(
        "Lưới kỹ thuật 1px sắc nét, không đổ bóng, góc vuông chuẩn mực",
        "1px structural grid, zero drop-shadows, sharp geometry"
      ),
      code: `/* Quy chuẩn thiết kế Chroma Technical Blueprint */
.bento-grid {
  display: grid;
  background-color: var(--border-grid);
  gap: 1px;
  border: 1px solid var(--border-grid);
  border-radius: 0px; /* Góc vuông 0px tuyệt đối */
}`,
      output: [
        "$ design-lint verify --system=trychroma",
        "✓ Exposed 1px hairline borders verified",
        "✓ 0px corner radius enforced across all IDE panes",
        "✓ High-contrast Carbon/Paper tokens active",
      ],
    },
  ];

  const currentFeature =
    IDE_FEATURES.find((f) => f.id === activeTab) || IDE_FEATURES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFeature.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <BentoGrid cols={12}>
      <BentoCell colSpan="md:col-span-4" noPadding>
        <div className="divide-y divide-grid h-full flex flex-col">
          {IDE_FEATURES.map((item) => {
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
                <span
                  className={`font-mono text-base mt-0.5 ${
                    isActive ? "text-brand" : "text-muted"
                  }`}
                >
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

      <BentoCell
        colSpan="md:col-span-8"
        noPadding
        className="bg-terminal text-zinc-100"
      >
        <div className="flex flex-col h-full divide-y divide-zinc-800">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-zinc-800 text-white rounded-sm">
                Python 3.12
              </span>
              <span className="px-2 py-1 text-zinc-400">WASM // Worker</span>
              <span className="px-2 py-1 text-zinc-500 hidden sm:inline">
                UTF-8
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="text-zinc-400 hover:text-white px-2 py-0.5 border border-zinc-800"
            >
              {copied
                ? t("✓ Đã sao chép", "✓ Copied")
                : t("Sao chép", "Copy")}
            </button>
          </div>

          <pre className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto text-zinc-200 flex-1 bg-[#050505]">
            {currentFeature.code}
          </pre>

          <div className="p-6 bg-black/80 font-mono text-xs space-y-1.5">
            <div className="text-zinc-500 mb-2 flex items-center justify-between">
              <span>{t("Kết quả terminal", "Terminal Output")}</span>
              <span className="text-emerald-400">
                ● {t("Sẵn sàng", "Ready")}
              </span>
            </div>
            {currentFeature.output.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith("✓")
                    ? "text-emerald-400"
                    : line.startsWith("$")
                    ? "text-zinc-300 font-semibold"
                    : line.startsWith("?")
                    ? "text-amber-400"
                    : "text-zinc-400"
                }
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </BentoCell>
    </BentoGrid>
  );
};

/**
 * Pattern 3: Performance Metrics, Latency Table & ASCII Architecture Bento
 */
export const PerformanceBento: React.FC = () => {
  const { t } = useLanguage();

  return (
    <BentoGrid cols={12}>
      <BentoCell colSpan="md:col-span-4">
        <div>
          <SectionBadge
            glyph="[▲]"
            label={t("Độ trễ thực thi", "Execution latency")}
          />
          <h3 className="text-base font-medium text-primary">
            {t("Nhân Pyodide WASM", "Pyodide WASM Runtime")}
          </h3>
          <p className="text-xs font-mono text-muted mt-1 mb-6">
            {t(
              "@WebWorker so với Container truyền thống",
              "@WebWorker thread vs Cloud Container"
            )}
          </p>

          <div className="border border-grid font-mono text-xs">
            <div className="grid grid-cols-3 bg-subtle border-b border-grid py-2 px-3 text-secondary">
              <span>{t("Chỉ số", "Metric")}</span>
              <span>{t("WASM nóng", "Warm WASM")}</span>
              <span>{t("Khởi động", "Coldboot")}</span>
            </div>
            <div className="grid grid-cols-3 border-b border-grid py-2.5 px-3">
              <span className="text-muted">p50</span>
              <span className="text-success font-semibold">12ms</span>
              <span className="text-primary">1.1s</span>
            </div>
            <div className="grid grid-cols-3 border-b border-grid py-2.5 px-3">
              <span className="text-muted">p90</span>
              <span className="text-success font-semibold">24ms</span>
              <span className="text-primary">1.8s</span>
            </div>
            <div className="grid grid-cols-3 py-2.5 px-3">
              <span className="text-muted">p99</span>
              <span className="text-success font-semibold">49ms</span>
              <span className="text-primary">2.4s</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted mt-6 font-mono">
          {t(
            "Không tốn chi phí máy chủ. Vòng lặp vô hạn được ngắt an toàn qua Worker.terminate().",
            "Zero server compute bill. Infinite loops safely terminated via Worker.terminate()."
          )}
        </p>
      </BentoCell>

      <BentoCell colSpan="md:col-span-4">
        <div>
          <SectionBadge
            glyph="[■]"
            label={t("Thông số kỹ thuật", "Technical specs")}
          />
          <h3 className="text-base font-medium text-primary mb-6">
            {t("Thông số Runtime & Đám mây", "Runtime & Cloud Telemetry")}
          </h3>

          <dl className="divide-y divide-grid border-y border-grid font-mono text-xs">
            <div className="py-3 flex justify-between">
              <dt className="text-secondary">
                {t("Nhân Python", "Python Engine")}
              </dt>
              <dd className="text-primary font-medium">CPython 3.12 (WASM)</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-secondary">
                {t("Chu kỳ tự động lưu", "Auto-save Debounce")}
              </dt>
              <dd className="text-primary font-medium">10,000ms (Firestore)</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-secondary">
                {t("Giới hạn thời gian chạy", "Execution Timeout")}
              </dt>
              <dd className="text-primary font-medium">12s / Hard Kill</dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-secondary">
                {t("Độ chính xác chấm bài", "Grading Determinism")}
              </dt>
              <dd className="text-success font-medium">
                {t("100% Cô lập", "100% Isolated")}
              </dd>
            </div>
          </dl>
        </div>
        <p className="text-xs text-muted mt-6 font-mono">
          {t(
            "Hỗ trợ đầy đủ thư viện chuẩn: math, collections, itertools, heapq, functools.",
            "Full stdlib support including math, collections, itertools, heapq, functools."
          )}
        </p>
      </BentoCell>

      <BentoCell colSpan="md:col-span-4" className="bg-dot-matrix">
        <div>
          <SectionBadge
            glyph="[●]"
            label={t("Kiến trúc zero-ops", "Zero-ops architecture")}
          />
          <pre className="font-mono text-[11px] leading-tight text-primary bg-surface p-4 border border-grid overflow-x-auto my-2">
            {`┌───────────────────────────────┐
│ UI Layer (Monaco + React 18)  │
│  • Stdin / Stdout Terminal    │
│  • 10s Debounced Cloud Sync   │
└───────────────────────────────┘
        ↕ MessageChannel / Atomics
┌───────────────────────────────┐
│ Isolated Web Worker (WASM)    │
│  • Pyodide CPython Runtime    │
│  • Test Runner & Grader       │
└───────────────────────────────┘`}
          </pre>
        </div>

        <ul className="font-mono text-xs text-secondary space-y-1.5 mt-4 bg-surface/90 p-2 border border-grid">
          <li>
            <span className="text-success mr-2">✓</span>
            {t(
              "Giao diện không bao giờ đơ khi gặp while True",
              "UI never freezes on while True"
            )}
          </li>
          <li>
            <span className="text-success mr-2">✓</span>
            {t(
              "Phân quyền dữ liệu Firestore theo vai trò",
              "Role-based Firestore collections"
            )}
          </li>
          <li>
            <span className="text-success mr-2">✓</span>
            {t(
              "Chấm điểm bộ Test Cases tức thì",
              "Instant test case telemetry"
            )}
          </li>
        </ul>
      </BentoCell>
    </BentoGrid>
  );
};
