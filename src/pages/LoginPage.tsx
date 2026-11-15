import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getAllUsers } from "../services/firestoreService";
import { GRADE_10_CLASSES } from "../services/seedData";
import { isFirebaseConfigured, activeConfig } from "../firebase/config";
import { UserProfile } from "../types/ide";
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
  const [existingStudents, setExistingStudents] = useState<UserProfile[]>([]);
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

  useEffect(() => {
    async function fetchRegisteredStudents() {
      const all = await getAllUsers();
      setExistingStudents(all.filter((u) => u.role === "student"));
    }
    fetchRegisteredStudents();
  }, [mode]);

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

  const handleSelectAdminCard = () => {
    setMode("login");
    setUsername("admin");
    setPassword("admin123");
    setError(null);
  };

  const handleSelectStudentCard = (stu: UserProfile) => {
    setMode("login");
    setUsername(stu.username || stu.uid.replace(/^usr_/, ""));
    setPassword(stu.password || "123456");
    setError(null);
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
        {/* Top Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 bg-grid gap-[1px] border-t border-grid font-mono text-xs text-secondary">
          <div className="bg-subtle px-6 py-2.5 flex items-center justify-between">
            <span>{t("CHƯƠNG TRÌNH HỌC", "CURRICULUM")}</span>
            <strong className="text-primary">
              {t("TIN HỌC 10 (BÀI 16 → BÀI 31)", "CS 10 (LESSONS 16 → 31)")}
            </strong>
          </div>
          <div className="bg-subtle px-6 py-2.5 flex items-center justify-between">
            <span>{t("CƠ SỞ DỮ LIỆU CLOUD", "CLOUD DATABASE")}</span>
            <strong className={isFirebaseConfigured ? "text-success font-bold" : "text-brand font-bold"}>
              {isFirebaseConfigured
                ? `● FIREBASE (${activeConfig?.projectId || "ONLINE"})`
                : "◆ LOCAL MOCK DATA"}
            </strong>
          </div>
          <div className="bg-subtle px-6 py-2.5 flex items-center justify-between">
            <span>{t("DANH SÁCH LỚP HỌC", "CLASSES")}</span>
            <strong className="text-brand">
              {GRADE_10_CLASSES.join(" • ")}
            </strong>
          </div>
        </div>

        <BentoGrid cols={12}>
          {/* Left Column (6/12): Clear distinction of Teacher vs Student accounts */}
          <BentoCell
            colSpan="md:col-span-6"
            className="bg-dot-matrix flex flex-col justify-between"
          >
            <div>
              <SectionBadge
                glyph="[◆]"
                label={t(
                  "CỔNG PHÂN QUYỀN: GIÁO VIÊN & HỌC SINH",
                  "ROLE ACCESS: TEACHER & STUDENTS"
                )}
              />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-tight mb-2">
                {t(
                  "Hệ thống Học & Thực hành Python Tin học 10",
                  "Grade 10 Python Learning & Practice Platform"
                )}
              </h1>
              <p className="text-xs text-secondary leading-relaxed mb-4">
                {t(
                  "Chọn tài khoản bên dưới để đăng nhập nhanh theo đúng vai trò Giáo viên hoặc Học sinh.",
                  "Select an account below to quickly login with Teacher or Student clearance."
                )}
              </p>

              {/* 1. KHU VỰC TÀI KHOẢN GIÁO VIÊN / ADMIN */}
              <div className="bg-surface border-2 border-brand/60 p-4 font-mono text-xs mb-4">
                <div className="flex items-center justify-between border-b border-grid pb-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-brand text-white font-bold text-[11px]">
                      👑 GIÁO VIÊN
                    </span>
                    <span className="font-bold text-primary">
                      Giáo viên Tin học 10
                    </span>
                  </div>
                  <span className="text-[10px] text-success font-semibold">
                    ROLE: INSTRUCTOR / ADMIN
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] mb-3 text-secondary">
                  <div>
                    {t("Tên đăng nhập:", "Username:")}{" "}
                    <strong className="text-brand font-bold">admin</strong>
                  </div>
                  <div>
                    {t("Mật khẩu:", "Password:")}{" "}
                    <strong className="text-primary font-bold">admin123</strong>
                  </div>
                  <div className="col-span-2 text-[10px] text-muted">
                    {t(
                      "Quyền hạn: Quản trị 6 lớp, theo dõi tiến độ, chấm bài & đồng bộ Firebase.",
                      "Access: Manage 6 classes, grading, dashboard & Firebase sync."
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAdminCard}
                  className="w-full py-2 bg-brand/10 border border-brand text-brand hover:bg-brand hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>👑</span>
                  <span>
                    {t(
                      "ĐIỀN NHANH TÀI KHOẢN GIÁO VIÊN (ADMIN)",
                      "FILL TEACHER / ADMIN CREDENTIALS"
                    )}
                  </span>
                </button>
              </div>

              {/* 2. KHU VỰC TÀI KHOẢN HỌC SINH (STUDENT) */}
              <div className="bg-surface border border-grid p-4 font-mono text-xs">
                <div className="font-mono text-xs uppercase tracking-wider text-secondary mb-2 flex items-center justify-between border-b border-grid pb-2">
                  <span className="flex items-center gap-1.5 font-bold text-primary">
                    <span className="text-brand">👤</span>
                    {t(
                      `HỌC SINH ĐÃ ĐĂNG KÝ (${existingStudents.length})`,
                      `REGISTERED STUDENTS (${existingStudents.length})`
                    )}
                  </span>
                  <span className="text-[11px] text-muted">
                    {t("Mật khẩu mẫu: 123456", "Default pass: 123456")}
                  </span>
                </div>

                <p className="text-[11px] text-secondary mb-2.5">
                  {t(
                    "Bấm vào học sinh bất kỳ để điền nhanh Username vào form đăng nhập:",
                    "Click any student below to autofill their login credentials:"
                  )}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-44 overflow-y-auto">
                  {existingStudents.map((stu) => {
                    const stuUser = stu.username || stu.uid.replace(/^usr_/, "");
                    return (
                      <button
                        key={stu.uid}
                        type="button"
                        onClick={() => handleSelectStudentCard(stu)}
                        className="p-2.5 bg-subtle border border-grid hover:border-brand text-left transition-colors flex items-center justify-between gap-2 group"
                      >
                        <div className="min-w-0">
                          <div className="text-primary font-semibold truncate group-hover:text-brand">
                            {stu.displayName}
                          </div>
                          <div className="text-[11px] text-secondary flex items-center gap-1.5 mt-0.5">
                            <span className="text-brand font-bold">
                              @{stuUser}
                            </span>
                            <span>•</span>
                            <span className="text-primary font-medium">
                              {stu.className || "10A7"}
                            </span>
                          </div>
                        </div>
                        <span className="text-muted group-hover:text-brand text-[11px] shrink-0 font-bold">
                          {t("Chọn →", "Select →")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-grid text-[11px] text-secondary flex items-center justify-between font-mono">
              <span>{t("Học sinh mới?", "New student?")}</span>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="text-brand font-bold hover:underline"
              >
                {t(
                  "→ Bấm tab [02] để Đăng ký tài khoản học sinh mới",
                  "→ Click [02] to Register new student"
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
