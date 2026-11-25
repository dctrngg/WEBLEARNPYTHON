import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Code2,
  LayoutDashboard,
  LogOut,
  Moon,
  MonitorPlay,
  Sun,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { PyodideEngineState } from "../../types/ide";

interface TopNavigationBarProps {
  breadcrumb?: string;
  engineState?: PyodideEngineState;
  engineStatusText?: string;
  syncStatus?: string;
  studentProgressText?: string;
  onOpenCheatSheet?: () => void;
}

/** Chữ cái đầu của tên để làm avatar */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter((w) => /\p{L}/u.test(w));
  if (parts.length === 0) return "?";
  const last = parts[parts.length - 1][0] || "";
  return last.toUpperCase();
}

export const TopNavigationBar: React.FC<TopNavigationBarProps> = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === "instructor";
  const isBlueprintRoute =
    location.pathname === "/" || location.pathname.startsWith("/blueprint");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItem = (active: boolean) =>
    `h-9 px-3 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-brand-soft text-brand-text"
        : "text-secondary hover:text-primary hover:bg-subtle"
    }`;

  return (
    <header className="h-14 bg-surface/95 backdrop-blur border-b border-grid px-3 sm:px-5 flex items-center justify-between gap-3 select-none shrink-0 z-30">
      <div className="flex items-center gap-2 sm:gap-5 min-w-0">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 text-primary"
          aria-label="CoCode"
        >
          <span className="w-8 h-8 rounded-[9px] bg-brand text-on-brand grid place-items-center font-bold text-sm shadow-card">
            Py
          </span>
          <span className="hidden md:flex flex-col leading-tight">
            <span className="font-bold text-[15px]">CoCode</span>
            <span className="text-[11px] text-muted">
              {t("Python Tin học 10", "Python · Grade 10")}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label={t("Điều hướng chính", "Main")}>
          <Link to="/" className={navItem(isBlueprintRoute)}>
            <BookOpen size={16} />
            <span className="hidden sm:inline">{t("Bài học", "Lessons")}</span>
          </Link>
          <NavLink
            to="/workspace"
            className={({ isActive }) => navItem(isActive)}
          >
            <Code2 size={16} />
            <span className="hidden sm:inline">{t("Luyện code", "Practice")}</span>
          </NavLink>
          {isAdmin && (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  navItem(isActive || location.pathname.startsWith("/instructor"))
                }
              >
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">{t("Quản lý lớp", "Teacher")}</span>
              </NavLink>
              <NavLink
                to="/projector"
                className={({ isActive }) => navItem(isActive)}
                title={t("Chế độ máy chiếu lớp học", "Classroom projector mode")}
              >
                <MonitorPlay size={16} />
                <span className="hidden lg:inline">{t("Máy chiếu", "Projector")}</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={toggleLanguage}
          title={t("Chuyển ngôn ngữ", "Switch language")}
          className="btn btn-ghost btn-sm px-2.5 text-xs"
        >
          <span className={lang === "vi" ? "text-brand-text" : "text-muted"}>VI</span>
          <span className="text-muted">/</span>
          <span className={lang === "en" ? "text-brand-text" : "text-muted"}>EN</span>
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          title={
            theme === "dark"
              ? t("Chuyển sang giao diện sáng", "Switch to light")
              : t("Chuyển sang giao diện tối", "Switch to dark")
          }
          aria-label={t("Đổi giao diện sáng/tối", "Toggle theme")}
          className="btn btn-ghost btn-sm btn-icon"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {user ? (
          <div className="flex items-center gap-2 pl-2 ml-1 border-l border-grid">
            <span
              className={`w-8 h-8 rounded-full grid place-items-center text-sm font-bold shrink-0 ${
                isAdmin ? "bg-warn-soft text-warn" : "bg-brand-soft text-brand-text"
              }`}
              aria-hidden
            >
              {initialsOf(user.displayName)}
            </span>
            <span className="hidden sm:flex flex-col leading-tight max-w-[180px] min-w-0">
              <span className="text-sm font-semibold text-primary truncate">
                {user.displayName}
              </span>
              <span className="text-[11px] text-muted truncate">
                {isAdmin
                  ? t("Giáo viên", "Teacher")
                  : `${t("Lớp", "Class")} ${user.className || "—"}`}
              </span>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              title={t("Đăng xuất", "Log out")}
              aria-label={t("Đăng xuất", "Log out")}
              className="btn btn-ghost btn-sm btn-icon"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            {t("Đăng nhập", "Log in")}
          </Link>
        )}
      </div>
    </header>
  );
};
