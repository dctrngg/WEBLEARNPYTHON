import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Code2,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { GRADE_10_CLASSES } from "../services/seedData";
import {
  preloadPyodide,
  subscribePyodidePreload,
  PyodidePreloadStatus,
} from "../services/pyodidePreloader";

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
    return subscribePyodidePreload((st) => setPyodideStatus(st));
  }, []);

  const switchMode = (next: "login" | "register") => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    try {
      if (mode === "login") {
        const profile = await loginStudent(username, password);
        // Điều hướng theo vai trò thực tế, không theo tên đăng nhập
        navigate(profile.role === "instructor" ? "/admin" : "/");
      } else {
        await registerStudent(username, fullName, selectedClass, password);
        navigate("/");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : t("Có lỗi xảy ra, vui lòng thử lại.", "Something went wrong.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    {
      icon: BookOpen,
      title: t("10 chuyên đề lý thuyết", "10 theory modules"),
      desc: t(
        "Tóm tắt kiến thức Bài 16 → 31 SGK Tin học 10, kèm câu hỏi ôn tập.",
        "Lessons 16 → 31 with review quizzes."
      ),
    },
    {
      icon: Code2,
      title: t("Viết và chạy Python ngay trên trình duyệt", "Run Python in the browser"),
      desc: t(
        "Không cần cài đặt. Có gợi ý lệnh và chạy từng bước để xem biến thay đổi.",
        "No install needed. Autocomplete and step-by-step tracing."
      ),
    },
    {
      icon: CheckCircle2,
      title: t("Chấm bài tự động", "Instant auto-grading"),
      desc: t(
        "Biết ngay đúng/sai từng test và gợi ý nguyên nhân khi làm sai.",
        "See per-test results and hints when something is wrong."
      ),
    },
  ];

  const runtimeReady = pyodideStatus.state === "ready";

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col">
      <header className="h-14 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-[9px] bg-brand text-on-brand grid place-items-center font-bold text-sm">
            Py
          </span>
          <span className="font-bold">CoCode</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            className="btn btn-ghost btn-sm px-2.5 text-xs"
            title={t("Chuyển ngôn ngữ", "Switch language")}
          >
            <span className={lang === "vi" ? "text-brand-text" : "text-muted"}>VI</span>
            <span className="text-muted">/</span>
            <span className={lang === "en" ? "text-brand-text" : "text-muted"}>EN</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-icon"
            aria-label={t("Đổi giao diện sáng/tối", "Toggle theme")}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-14 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Giới thiệu */}
        <section className="order-2 lg:order-1">
          <span className="chip chip-brand mb-4">
            {t("Tin học 10 · Lập trình Python", "Grade 10 · Python")}
          </span>
          <h1 className="text-hero text-primary mb-4">
            {t("Học Python dễ hiểu,", "Learn Python the easy way,")}
            <br />
            <span className="text-brand">{t("thực hành mỗi ngày.", "practice every day.")}</span>
          </h1>
          <p className="text-body text-secondary max-w-lg mb-8">
            {t(
              "Nền tảng học tập bám sát SGK Tin học 10: đọc lý thuyết, làm trắc nghiệm và luyện code với bộ chấm điểm tự động.",
              "A platform aligned with the Grade 10 textbook: read theory, take quizzes and practice code with automatic grading."
            )}
          </p>
          <ul className="grid auto-rows-fr gap-3 max-w-lg">
            {features.map(({ icon: Icon, title, desc }) => (
              <li
                key={title}
                className="flex items-center gap-3 p-3.5 rounded-[12px] bg-surface border border-grid shadow-card"
              >
                <span className="w-10 h-10 rounded-[10px] bg-brand-soft grid place-items-center text-brand shrink-0">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="font-semibold text-primary text-[15px]">{title}</p>
                  <p className="text-sm text-secondary">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Form */}
        <section className="order-1 lg:order-2 card p-6 sm:p-8 w-full max-w-md mx-auto lg:ml-auto">
          <div className="segmented mb-6" role="tablist">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className="segmented-item flex-1 h-9 text-sm font-semibold text-secondary"
              >
                {m === "login" ? t("Đăng nhập", "Log in") : t("Tạo tài khoản", "Sign up")}
              </button>
            ))}
          </div>

          <h2 className="text-h2 text-primary mb-1">
            {mode === "login"
              ? t("Chào mừng em trở lại 👋", "Welcome back 👋")
              : t("Tạo tài khoản học sinh", "Create a student account")}
          </h2>
          <p className="text-sm text-secondary mb-6">
            {mode === "login"
              ? t("Đăng nhập bằng tên đăng nhập và mật khẩu của em.", "Log in with your username and password.")
              : t("Chỉ mất 30 giây để bắt đầu học.", "Takes 30 seconds to get started.")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 p-3 rounded-[10px] bg-danger-soft text-danger text-sm"
              >
                <AlertCircle size={17} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="login-username" className="block text-sm font-semibold text-primary mb-1.5">
                {t("Tên đăng nhập", "Username")}
              </label>
              <input
                id="login-username"
                type="text"
                required
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("VD: an10a7", "e.g. an10a7")}
                className="input w-full"
              />
              {mode === "register" && (
                <p className="text-xs text-muted mt-1.5">
                  {t("Viết liền, không dấu, ít nhất 3 ký tự.", "No spaces or accents, at least 3 characters.")}
                </p>
              )}
            </div>

            {mode === "register" && (
              <>
                <div>
                  <label htmlFor="login-fullname" className="block text-sm font-semibold text-primary mb-1.5">
                    {t("Họ và tên", "Full name")}
                  </label>
                  <input
                    id="login-fullname"
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("VD: Nguyễn Minh An", "e.g. Nguyen Minh An")}
                    className="input w-full"
                  />
                </div>

                <fieldset>
                  <legend className="block text-sm font-semibold text-primary mb-1.5">
                    {t("Lớp của em", "Your class")}
                  </legend>
                  <div className="flex flex-wrap gap-1.5">
                    {GRADE_10_CLASSES.map((cls) => {
                      const active = selectedClass === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedClass(cls)}
                          className={`h-9 px-3 text-sm font-semibold border transition-colors ${
                            active
                              ? "bg-brand text-on-brand border-brand"
                              : "bg-surface text-secondary border-grid-strong hover:text-primary hover:border-brand"
                          }`}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            )}

            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-primary mb-1.5">
                {t("Mật khẩu", "Password")}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={4}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("Ít nhất 4 ký tự", "At least 4 characters")}
                  className="input w-full pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-1 top-1 w-8 h-8 grid place-items-center text-muted hover:text-primary"
                  aria-label={showPassword ? t("Ẩn mật khẩu", "Hide password") : t("Hiện mật khẩu", "Show password")}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full h-11 text-[15px]"
            >
              {submitting && <Loader2 size={17} className="animate-spin" />}
              {submitting
                ? t("Đang xử lý...", "Please wait...")
                : mode === "login"
                ? t("Đăng nhập", "Log in")
                : t("Tạo tài khoản và vào học", "Create account")}
            </button>

            <p className="text-sm text-secondary text-center">
              {mode === "login" ? t("Chưa có tài khoản?", "No account yet?") : t("Đã có tài khoản?", "Already have an account?")}{" "}
              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "register" : "login")}
                className="font-semibold text-brand-text hover:underline"
              >
                {mode === "login" ? t("Tạo tài khoản mới", "Sign up") : t("Đăng nhập", "Log in")}
              </button>
            </p>
          </form>

          <div className="mt-6 pt-4 border-t border-grid flex items-center gap-2 text-xs text-muted">
            {runtimeReady ? (
              <CheckCircle2 size={14} className="text-success" />
            ) : (
              <Loader2 size={14} className="animate-spin text-warn" />
            )}
            <span className="flex-1">
              {runtimeReady
                ? t("Trình chạy Python đã sẵn sàng", "Python runtime ready")
                : t("Đang chuẩn bị trình chạy Python…", "Preparing Python runtime…")}
            </span>
            {!runtimeReady && <span className="tabular-nums">{pyodideStatus.progress}%</span>}
          </div>
        </section>
      </main>

      <footer className="py-5 text-center text-xs text-muted">
        CoCode · {t("Học lập trình Python Tin học 10", "Python for Grade 10")}
      </footer>
    </div>
  );
};
