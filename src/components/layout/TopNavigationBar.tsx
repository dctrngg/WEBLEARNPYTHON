import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { activeConfig, isFirebaseConfigured } from "../../firebase/config";
import { PyodideEngineState } from "../../types/ide";
import { FirebaseConfigModal } from "../ui/FirebaseConfigModal";

interface TopNavigationBarProps {
  breadcrumb: string;
  engineState?: PyodideEngineState;
  engineStatusText?: string;
  syncStatus?: string;
  studentProgressText?: string;
  onOpenCheatSheet?: () => void;
}

export const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
  breadcrumb,
  engineState = "ready",
  engineStatusText = "RUNTIME READY",
  syncStatus,
  studentProgressText,
  onOpenCheatSheet,
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [configOpen, setConfigOpen] = useState(false);

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/instructor");

  const isBlueprintRoute =
    location.pathname === "/" || location.pathname.startsWith("/blueprint");
  const isWorkspaceRoute = location.pathname.startsWith("/workspace");

  const handleSwitchAccount = async () => {
    await logout();
    navigate("/login");
  };

  const renderEngineIndicator = () => {
    if (engineState === "ready") {
      return (
        <span className="inline-flex items-center gap-1.5 text-success">
          <span>●</span>
          <span>{t("PYTHON 3.12 SẴN SÀNG", "PYTHON 3.12 READY")}</span>
        </span>
      );
    }
    if (engineState === "initializing") {
      return (
        <span className="inline-flex items-center gap-1.5 text-warn animate-pulse">
          <span>◐</span>
          <span>
            {t("ĐANG TẢI NHÂN PYTHON...", "LOADING PYTHON KERNEL...")}
          </span>
        </span>
      );
    }
    if (engineState === "running" || engineState === "awaiting_input") {
      return (
        <span className="inline-flex items-center gap-1.5 text-brand animate-pulse">
          <span>◆</span>
          <span>
            {engineState === "awaiting_input"
              ? t("ĐANG CHỜ NHẬP INPUT()...", "WAITING FOR INPUT()...")
              : t("ĐANG CHẠY CODE...", "RUNNING CODE...")}
          </span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-brand">
        <span>✕</span>
        <span>{engineStatusText}</span>
      </span>
    );
  };

  return (
    <>
      <header className="h-11 bg-surface border-b border-grid px-4 flex items-center justify-between font-mono text-xs select-none shrink-0">
        {/* Left: Logo + Student Curriculum / IDE Switcher */}
        <div className="flex items-center gap-2.5 overflow-x-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-semibold tracking-tight shrink-0 hover:text-brand transition-colors"
          >
            <span className="text-brand">▣</span>
            <span>{breadcrumb}</span>
          </Link>

          {!isAdminRoute && (
            <>
              <span className="text-grid-strong hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Link
                  to="/"
                  className={`px-2.5 py-1 border transition-colors font-medium ${
                    isBlueprintRoute
                      ? "bg-brand text-white border-brand"
                      : "bg-subtle border-grid text-secondary hover:text-primary hover:border-brand"
                  }`}
                >
                  [📚 {t("BÀI HỌC LÝ THUYẾT", "CURRICULUM")}]
                </Link>
                <Link
                  to="/workspace"
                  className={`px-2.5 py-1 border transition-colors font-medium ${
                    isWorkspaceRoute
                      ? "bg-brand text-white border-brand"
                      : "bg-subtle border-grid text-secondary hover:text-primary hover:border-brand"
                  }`}
                >
                  [💻 {t("PHÒNG CODE IDE", "PYTHON IDE")}]
                </Link>
              </div>
            </>
          )}

          {studentProgressText && !isAdminRoute && (
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-subtle border border-grid text-success font-medium shrink-0">
              <span>★</span>
              <span>{studentProgressText}</span>
            </div>
          )}

          {onOpenCheatSheet && !isAdminRoute && (
            <button
              onClick={onOpenCheatSheet}
              className="px-2.5 py-1 bg-brand/10 border border-brand/40 text-brand hover:bg-brand hover:text-white transition-colors font-medium shrink-0"
            >
              [📖 {t("SỔ TAY PYTHON", "CHEAT SHEET")}]
            </button>
          )}

          {isAdminRoute && (
            <>
              <span className="text-grid-strong hidden sm:inline">|</span>
              <Link
                to="/"
                className="px-2.5 py-1 bg-subtle border border-grid text-primary hover:border-brand transition-colors"
              >
                [◀] {t("VỀ TRANG HỌC SINH", "BACK TO STUDENT VIEW")}
              </Link>
            </>
          )}
        </div>

        {/* Right: Admin Firebase Cloud Status, Sync Status, Engine Indicator, Language VI/EN, Theme, Student Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Firebase Cloud Connection Button (ONLY visible for Admin at /admin) */}
          {isAdminRoute && (
            <button
              onClick={() => setConfigOpen(true)}
              title={t(
                "Nhấn để cấu hình kết nối Firebase thực tế hoặc đồng bộ 22 bài tập lên Cloud Firestore",
                "Click to configure live Firebase connection or sync exercises to Cloud Firestore"
              )}
              className={`px-2.5 py-1 border font-semibold transition-colors flex items-center gap-1.5 ${
                isFirebaseConfigured
                  ? "bg-success/10 border-success/40 text-success hover:bg-success hover:text-black"
                  : "bg-warn/10 border-warn/40 text-warn hover:bg-brand hover:text-white hover:border-brand"
              }`}
            >
              <span>☁</span>
              <span>
                {isFirebaseConfigured
                  ? `FIREBASE: ${activeConfig?.projectId}`
                  : t("MOCK DATA → KẾT NỐI FIREBASE", "CONNECT FIREBASE")}
              </span>
            </button>
          )}
          {syncStatus && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-subtle border border-grid text-secondary">
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Pyodide WASM Engine Status */}
          <div className="hidden lg:flex items-center px-2.5 py-1 bg-subtle border border-grid">
            {renderEngineIndicator()}
          </div>

          {/* Language Toggle Button (VI <-> EN) */}
          <button
            onClick={toggleLanguage}
            title={t(
              "Chuyển sang Tiếng Anh (Switch to English)",
              "Chuyển sang Tiếng Việt (Switch to Vietnamese)"
            )}
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

          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={toggleTheme}
            title={t(
              "Chuyển đổi giao diện Tối / Sáng",
              "Toggle Dark / Light Theme"
            )}
            className="px-2.5 py-1 bg-surface border border-grid text-secondary hover:text-primary hover:bg-subtle transition-colors"
          >
            {theme === "dark"
              ? t("[◐] NỀN TỐI", "[◐] DARK")
              : t("[○] NỀN SÁNG", "[○] LIGHT")}
          </button>

          {/* Student Profile Badge */}
          {user ? (
            <div className="flex items-center border border-grid bg-subtle">
              <span className="px-2.5 py-1 text-primary hidden sm:inline-flex items-center gap-1.5 max-w-[220px] truncate">
                <span className="text-brand">●</span>
                <span className="truncate font-semibold">{user.displayName}</span>
                {user.className && (
                  <span className="px-1.5 py-0.2 bg-brand/15 border border-brand/40 text-brand text-[10px] font-bold shrink-0">
                    {user.className}
                  </span>
                )}
              </span>
              <button
                onClick={handleSwitchAccount}
                title={t("Đăng xuất / Đổi tài khoản học sinh", "Logout / Switch Account")}
                className="px-2.5 py-1 border-l border-grid text-secondary hover:text-brand hover:bg-surface transition-colors"
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

      <FirebaseConfigModal
        isOpen={configOpen}
        onClose={() => setConfigOpen(false)}
      />
    </>
  );
};
