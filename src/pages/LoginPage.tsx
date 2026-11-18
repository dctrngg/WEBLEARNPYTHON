import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { GRADE_10_CLASSES } from "../services/seedData";
import {
  preloadPyodide,
  subscribePyodidePreload,
  PyodidePreloadStatus,
} from "../services/pyodidePreloader";
import {
  BentoCell,
  BentoGrid,
  BentoSection,
  SectionBadge,
} from "../components/ui/BentoPrimitives";

export const LoginPage: React.FC = () => {
  const { loginStudent, registerStudent } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedClass, setSelectedClass] = useState(GRADE_10_CLASSES[0]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState<PyodidePreloadStatus>({
    state: "idle",
    progress: 0,
    message: "",
  });

  useEffect(() => {
    preloadPyodide();
    const unsub = subscribePyodidePreload((st) => setPyodideStatus(st));
    return unsub;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === "login") {
        await loginStudent(username, password);
        const cleanUser = username.trim().toLowerCase();
        if (cleanUser === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        await registerStudent(username, fullName, selectedClass, password);
        navigate("/");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : t("Có lỗi xảy ra, vui lòng thử lại.", "Authentication failed.");
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col justify-between">
      {/* Top Structural Header Strip */}
      <div className="border-b border-grid bg-surface">
        <div className="max-w-6xl mx-auto border-x border-grid px-6 py-3.5 flex flex-wrap items-center justify-between font-mono text-xs gap-2">
          <div className="flex items-center gap-3">
            <span className="text-brand font-bold">▣</span>
            <span className="font-semibold tracking-tight">
              {t(
                "HỆ THỐNG HỌC & THỰC HÀNH PYTHON TIN HỌC 10",
                "GRADE 10 PYTHON LEARNING & IDE PLATFORM"
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 bg-subtle border border-grid hover:border-brand text-primary font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className={lang === "vi" ? "text-brand" : "text-muted"}>
                VI
              </span>
              <span className="text-muted">/</span>
              <span className={lang === "en" ? "text-brand" : "text-muted"}>
                EN
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="px-2.5 py-1 border border-grid text-secondary hover:text-primary hover:bg-subtle transition-colors"
            >
              {theme === "dark"
                ? t("[◐] NỀN TỐI", "[◐] DARK")
                : t("[○] NỀN SÁNG", "[○] LIGHT")}
            </button>
          </div>
        </div>
      </div>

      {/* Main Structural Bento Container */}
      <BentoSection className="my-auto w-full">
        <BentoGrid cols={12}>
          {/* Left Column (6/12): Platform Overview & Key Features */}
          <BentoCell
            colSpan="md:col-span-6"
            className="bg-dot-matrix flex flex-col justify-between"
          >
            <div className="space-y-4">
              <SectionBadge
                glyph="[◆]"
                label={t(
                  "NỀN TẢNG HỌC LẬP TRÌNH PYTHON 10",
                  "GRADE 10 PYTHON LEARNING PLATFORM"
                )}
              />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-tight">
                {t(
                  "Hệ thống Học & Thực hành Python Tin học 10",
                  "Grade 10 Python Learning & Practice Platform"
                )}
              </h1>
              <p className="text-xs text-secondary leading-relaxed font-sans">
                {t(
                  "Hệ thống học tập trực tuyến bám sát chương trình SGK Tin học 10. Hỗ trợ học sinh đọc lý thuyết, làm bài tập trắc nghiệm và thực hành lập trình trực tiếp trên trình duyệt với bộ chấm điểm tự động.",
                  "An online learning platform tailored for Grade 10 Computer Science. Supports theory reading, multiple-choice quizzes, and hands-on coding with automated grading."
                )}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-3 pt-2 font-mono text-xs">
                <div className="p-3.5 bg-surface border border-grid flex items-start gap-3">
                  <span className="text-brand font-bold text-sm shrink-0">📚</span>
                  <div>
                    <strong className="text-primary block font-semibold">
                      {t("16 Chuyên đề Lý thuyết", "16 Theory Lessons")}
                    </strong>
                    <span className="text-secondary text-[11px] font-sans">
                      {t(
                        "Tóm tắt kiến thức trọng tâm từ Bài 16 đến Bài 31 SGK Tin học 10 kèm câu hỏi trắc nghiệm ôn tập.",
                        "Key concepts from Lesson 16 to 31 with practice quizzes."
                      )}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-surface border border-grid flex items-start gap-3">
                  <span className="text-brand font-bold text-sm shrink-0">💻</span>
                  <div>
                    <strong className="text-primary block font-semibold">
                      {t("Phòng Thực hành Python IDE", "Python IDE Workspace")}
                    </strong>
                    <span className="text-secondary text-[11px] font-sans">
                      {t(
                        "Môi trường code CPython 3.12 WebAssembly chạy ngay trên trình duyệt, gợi ý hàm thông minh và soi biến từng bước.",
                        "Browser-based CPython 3.12 engine with IntelliSense and step tracer."
                      )}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-surface border border-grid flex items-start gap-3">
                  <span className="text-brand font-bold text-sm shrink-0">✓</span>
                  <div>
                    <strong className="text-primary block font-semibold">
                      {t("Chấm điểm & Chẩn đoán tự động", "Auto-grading & Diagnostics")}
                    </strong>
                    <span className="text-secondary text-[11px] font-sans">
                      {t(
                        "Kiểm tra ngay lập tức qua các bộ Test cases và hỗ trợ chẩn đoán nguyên nhân khi làm sai bài tập.",
                        "Instant feedback with test cases and intelligent pedagogical error diagnostics."
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-grid text-[11px] text-secondary flex items-center justify-between font-mono">
              <span>{t("Chưa có tài khoản?", "Don't have an account?")}</span>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="text-brand font-bold hover:underline"
              >
                {t(
                  "→ Đăng ký tài khoản học sinh mới",
                  "→ Register a new student account"
                )}
              </button>
            </div>
          </BentoCell>

          {/* Right Column (6/12): Simplified Login & Register Form */}
          <BentoCell colSpan="md:col-span-6" noPadding>
            <div className="flex flex-col h-full justify-between">
              {/* Mode Selector Tabs */}
              <div className="grid grid-cols-2 bg-grid gap-[1px] border-b border-grid font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className={`py-3.5 px-4 text-center uppercase tracking-wider transition-colors ${
                    mode === "login"
                      ? "bg-surface text-brand font-bold border-t-2 border-t-brand"
                      : "bg-subtle text-secondary hover:text-primary"
                  }`}
                >
                  [01] {t("ĐĂNG NHẬP", "LOGIN")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setError(null);
                  }}
                  className={`py-3.5 px-4 text-center uppercase tracking-wider transition-colors ${
                    mode === "register"
                      ? "bg-surface text-brand font-bold border-t-2 border-t-brand"
                      : "bg-subtle text-secondary hover:text-primary"
                  }`}
                >
                  [02] {t("TẠO TÀI KHOẢN MỚI", "CREATE ACCOUNT")}
                </button>
              </div>

              {/* Form Body */}
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 space-y-4 font-mono text-xs flex-1"
              >
                <div>
                  <SectionBadge
                    glyph={mode === "login" ? "▶" : "★"}
                    label={
                      mode === "login"
                        ? t(
                            "ĐĂNG NHẬP NHANH (USERNAME & PASSWORD)",
                            "QUICK STUDENT LOGIN"
                          )
                        : t(
                            "ĐĂNG KÝ TÀI KHOẢN HỌC SINH MỚI",
                            "NEW STUDENT REGISTRATION"
                          )
                    }
                  />
                  <h2 className="font-sans text-xl font-bold text-primary tracking-tight">
                    {mode === "login"
                      ? t(
                          "Đăng nhập bằng Username và Mật khẩu",
                          "Sign In with Username & Password"
                        )
                      : t(
                          "Tạo Tài khoản Học sinh Mới",
                          "Create New Student Account"
                        )}
                  </h2>
                </div>

                {error && (
                  <div className="p-3 bg-terminal border border-brand text-brand text-xs font-mono leading-relaxed">
                    ✕ {error}
                  </div>
                )}

                {/* 1. USERNAME (Shown in both Login and Register) */}
                <div>
                  <label className="block text-secondary uppercase mb-1.5 font-semibold">
                    {t(
                      "TÊN ĐĂNG NHẬP (USERNAME)",
                      "USERNAME"
                    )}{" "}
                    <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t(
                      "Viết liền không dấu (VD: an10a7, minhkhoa...)",
                      "e.g. an10a7"
                    )}
                    className="w-full bg-background border border-grid px-3.5 py-2.5 text-primary text-sm focus:outline-none focus:border-brand"
                  />
                </div>

                {/* EXTRA FIELDS ONLY FOR REGISTER: FULL NAME & CLASS */}
                {mode === "register" && (
                  <>
                    {/* 2. HỌ VÀ TÊN HỌC SINH */}
                    <div>
                      <label className="block text-secondary uppercase mb-1.5 font-semibold">
                        {t("HỌ VÀ TÊN HỌC SINH", "STUDENT FULL NAME")}{" "}
                        <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t(
                          "Ví dụ: Nguyễn Minh An",
                          "e.g. Nguyen Minh An"
                        )}
                        className="w-full bg-background border border-grid px-3.5 py-2.5 text-primary text-sm focus:outline-none focus:border-brand"
                      />
                    </div>

                    {/* 3. CHỌN LỚP HỌC (10A7, 10A12, 10A13, 10A14, 10A15, 10A16) */}
                    <div>
                      <label className="block text-secondary uppercase font-semibold mb-1.5">
                        {t("CHỌN LỚP HỌC CỦA EM", "SELECT YOUR CLASS")}{" "}
                        <span className="text-brand">*</span>
                      </label>

                      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 bg-grid gap-[1px] border border-grid">
                        {GRADE_10_CLASSES.map((cls) => {
                          const active = selectedClass === cls;
                          return (
                            <button
                              key={cls}
                              type="button"
                              onClick={() => setSelectedClass(cls)}
                              className={`py-2.5 px-2 text-center font-bold text-xs transition-colors ${
                                active
                                  ? "bg-brand text-white"
                                  : "bg-surface text-secondary hover:text-primary hover:bg-subtle"
                              }`}
                            >
                              {cls}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* PASSWORD (Shown in both Login and Register) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-secondary uppercase font-semibold">
                      {t("MẬT KHẨU (PASSWORD)", "PASSWORD")}{" "}
                      <span className="text-brand">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="text-[11px] text-secondary hover:text-primary"
                    >
                      {showPassword
                        ? t("[🙈 ẨN MẬT KHẨU]", "[HIDE]")
                        : t("[👁 HIỆN MẬT KHẨU]", "[SHOW]")}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={4}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t(
                      "Nhập mật khẩu (ít nhất 4 ký tự, VD: 123456)",
                      "Enter password (at least 4 characters)"
                    )}
                    className="w-full bg-background border border-grid px-3.5 py-2.5 text-primary text-sm focus:outline-none focus:border-brand"
                  />
                </div>

                {/* Pyodide CPython 3.12 WebAssembly Pre-warm Progress */}
                <div className="p-2.5 bg-subtle border border-grid font-mono text-[11px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={
                          pyodideStatus.state === "ready"
                            ? "text-emerald-500 font-bold"
                            : "text-amber-500"
                        }
                      >
                        {pyodideStatus.state === "ready" ? "✓" : "◐"}
                      </span>
                      <span className="text-primary font-semibold">
                        {pyodideStatus.state === "ready"
                          ? t(
                              "CPython 3.12 WASM: ĐÃ SẴN SÀNG",
                              "CPython 3.12: READY"
                            )
                          : t(
                              "ĐANG NẠP PYTHON KERNEL VÀO CACHE...",
                              "CACHING PYTHON KERNEL..."
                            )}
                      </span>
                    </div>
                    <span className="text-secondary font-bold">
                      {pyodideStatus.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-surface border border-grid overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        pyodideStatus.state === "ready"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${pyodideStatus.progress}%` }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 bg-brand text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {submitting
                      ? t("◐ ĐANG XỬ LÝ...", "◐ PROCESSING...")
                      : mode === "login"
                      ? t(
                          "[▶] ĐĂNG NHẬP VÀO HỆ THỐNG HỌC",
                          "[▶] LOGIN TO LEARNING PORTAL"
                        )
                      : t(
                          "[★] TẠO TÀI KHOẢN & VÀO HỌC NGAY",
                          "[★] CREATE ACCOUNT & START LEARNING"
                        )}
                  </button>
                </div>
              </form>

              {/* Footer Switch Mode Helper */}
              <div className="px-6 py-3.5 bg-subtle border-t border-grid font-mono text-xs text-secondary flex items-center justify-between">
                {mode === "login" ? (
                  <>
                    <span>
                      {t("Em chưa có tài khoản?", "Don't have an account yet?")}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setError(null);
                      }}
                      className="text-brand font-semibold hover:underline"
                    >
                      {t(
                        "→ Bấm vào đây để Tạo tài khoản mới",
                        "→ Create a new account"
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      {t(
                        "Em đã có tài khoản rồi?",
                        "Already have an account?"
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError(null);
                      }}
                      className="text-brand font-semibold hover:underline"
                    >
                      {t("→ Quay lại Đăng nhập", "→ Switch to Login")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </BentoCell>
        </BentoGrid>
      </BentoSection>

      {/* Bottom Structural Footer Strip */}
      <footer className="border-t border-grid bg-surface">
        <div className="max-w-6xl mx-auto border-x border-grid px-6 py-3 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-muted gap-2">
          <span>
            {t(
              "TIN HỌC 10 — HỆ THỐNG HỌC LẬP TRÌNH PYTHON & CHẤM BÀI TỰ ĐỘNG",
              "CS GRADE 10 — PYTHON LEARNING & AUTO-GRADING SYSTEM"
            )}
          </span>
          <span>CPYTHON 3.12 WASM // CLOUD FIRESTORE</span>
        </div>
      </footer>
    </div>
  );
};
