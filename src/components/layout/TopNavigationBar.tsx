import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

export const TopNavigationBar: React.FC<TopNavigationBarProps> = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === "instructor" || user?.role === ("admin" as any);

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/instructor");

  const isBlueprintRoute =
    location.pathname === "/" || location.pathname.startsWith("/blueprint");
  const isWorkspaceRoute = location.pathname.startsWith("/workspace");

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="h-11 bg-surface border-b border-grid px-3 sm:px-5 flex items-center justify-between font-mono text-xs select-none shrink-0 z-30">
      {/* 1. Bên trái: Logo + Chuyển đổi giữa [BÀI HỌC LÝ THUYẾT] và [PHÒNG CODE IDE] */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Logo / Tên hệ thống */}
        <Link
          to="/"
          className="flex items-center gap-2 text-primary font-bold tracking-tight shrink-0 hover:text-brand transition-colors text-xs"
        >
          <span className="text-brand font-bold text-sm">▣</span>
          <span className="hidden sm:inline">{t("TIN HỌC 10", "CS GRADE 10")}</span>
        </Link>

        <span className="text-grid-strong hidden sm:inline">|</span>

        {/* Chuyển đổi Bài học lý thuyết ↔ Phòng Code IDE */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            to="/"
            className={`px-3 py-1 border transition-colors font-medium flex items-center gap-1.5 ${isBlueprintRoute
                ? "bg-brand text-white border-brand font-semibold shadow-none"
                : "bg-subtle border-grid text-secondary hover:text-primary hover:border-brand"
              }`}
          >
            <span>📚</span>
            <span>{t("BÀI HỌC LÝ THUYẾT", "LÝ THUYẾT")}</span>
          </Link>

          <Link
            to="/workspace"
            className={`px-3 py-1 border transition-colors font-medium flex items-center gap-1.5 ${isWorkspaceRoute
                ? "bg-brand text-white border-brand font-semibold shadow-none"
                : "bg-subtle border-grid text-secondary hover:text-primary hover:border-brand"
              }`}
          >
            <span>💻</span>
            <span>{t("CODE", "CODE")}</span>
          </Link>

          {/* Dành cho Giảng viên / Quản trị viên */}
          {isAdmin && (
            <>
              <Link
                to={isAdminRoute ? "/" : "/admin"}
                className="ml-1 px-2.5 py-1 border border-brand/40 text-brand bg-brand/10 hover:bg-brand hover:text-white transition-colors font-semibold"
              >
                {isAdminRoute
                  ? t("[◀ VỀ GIAO DIỆN HỌC]", "[◀ STUDENT VIEW]")
                  : t("[⚙ QUẢN TRỊ]", "[⚙ ADMIN]")}
              </Link>
              <Link
                to="/projector"
                className="px-2.5 py-1 border border-grid bg-subtle text-secondary hover:text-brand hover:border-brand transition-colors font-semibold flex items-center gap-1"
                title={t(
                  "Mở chế độ trình chiếu máy chiếu lớp học",
                  "Open Classroom Projector Mode"
                )}
              >
                <span>📺</span>
                <span className="hidden md:inline">
                  {t("MÁY CHIẾU", "PROJECTOR")}
                </span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 2. Bên phải: Ngôn ngữ, Đổi Theme, Tài khoản */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Chuyển đổi Ngôn ngữ (VI / EN) */}
        <button
          type="button"
          onClick={toggleLanguage}
          title={t("Chuyển đổi ngôn ngữ", "Switch Language")}
          className="px-2.5 py-1 bg-subtle border border-grid hover:border-brand text-primary font-semibold transition-colors flex items-center gap-1"
        >
          <span className={lang === "vi" ? "text-brand font-bold" : "text-muted"}>
            VI
          </span>
          <span className="text-muted">/</span>
          <span className={lang === "en" ? "text-brand font-bold" : "text-muted"}>
            EN
          </span>
        </button>

        {/* Chuyển đổi Giao diện Theme (Sáng / Tối) */}
        <button
          type="button"
          onClick={toggleTheme}
          title={t("Chuyển đổi giao diện Sáng / Tối", "Toggle Dark / Light Theme")}
          className="px-2.5 py-1 bg-surface border border-grid text-secondary hover:text-primary hover:bg-subtle transition-colors"
        >
          {theme === "dark"
            ? t("[◐] NỀN TỐI", "[◐] DARK")
            : t("[○] NỀN SÁNG", "[○] LIGHT")}
        </button>

        {/* Thông tin Tài khoản & Nút Đăng xuất */}
        {user ? (
          <div className="flex items-center border border-grid bg-subtle">
            <span className="px-2.5 py-1 text-primary flex items-center gap-1.5 max-w-[200px] sm:max-w-[320px] truncate">
              {isAdmin ? (
                <span className="px-1.5 py-0.5 bg-brand text-white font-bold text-[10px] shrink-0">
                  👑 GIÁO VIÊN
                </span>
              ) : (
                <span className="px-1.5 py-0.5 bg-surface border border-grid text-secondary font-bold text-[10px] shrink-0">
                  👤 HỌC SINH
                </span>
              )}
              <span className="truncate font-semibold">{user.displayName}</span>
              {user.className && !isAdmin && (
                <span className="px-1.5 py-0.2 bg-brand/15 border border-brand/40 text-brand text-[10px] font-bold shrink-0">
                  {user.className}
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              title={t("Đăng xuất tài khoản", "Logout")}
              className="px-2.5 py-1 border-l border-grid text-secondary hover:text-brand hover:bg-surface transition-colors font-semibold"
            >
              {t("ĐĂNG XUẤT", "LOGOUT")}
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 bg-brand text-white font-medium hover:opacity-90"
          >
            [▶] {t("ĐĂNG NHẬP", "LOGIN")}
          </Link>
        )}
      </div>
    </header>
  );
};
