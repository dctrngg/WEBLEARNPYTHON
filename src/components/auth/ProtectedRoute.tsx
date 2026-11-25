import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { UserRole } from "../../types/ide";
import { BentoCell, BentoGrid, BentoSection, SectionBadge } from "../ui/BentoPrimitives";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, loading, switchRole, isCloudConnected } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 font-mono text-xs">
        <div className="border border-grid bg-surface p-8 max-w-md w-full space-y-3">
          <div className="text-brand flex items-center gap-2">
            <span>◐</span>
            <span>
              {t(
                "Đang xác thực phiên đăng nhập...",
                "Verifying authentication token..."
              )}
            </span>
          </div>
          <div className="text-muted">
            {t(
              "Đang kiểm tra quyền truy cập RBAC trên Cloud Firestore",
              "Checking Firestore RBAC claims & session state"
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center p-6">
        <BentoSection className="w-full max-w-2xl">
          <BentoGrid cols={1}>
            <BentoCell colSpan="col-span-1" className="bg-dot-matrix">
              <SectionBadge
                glyph="[▲]"
                label={t(
                  "Phân quyền RBAC // hạn chế truy cập",
                  "RBAC // access restricted"
                )}
              />
              <h1 className="text-2xl font-semibold tracking-tight text-primary mb-2">
                {t(
                  "Yêu cầu Quyền Giảng viên (Instructor)",
                  "Instructor Clearance Required"
                )}
              </h1>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                {t("Đường dẫn ", "Route ")}
                <code className="font-mono text-brand">/instructor</code>{" "}
                {t("yêu cầu quyền ", "requires Firestore role ")}
                <code className="font-mono text-primary">
                  role === &apos;instructor&apos;
                </code>
                .{" "}
                {t(
                  `Tài khoản hiện tại của bạn (${user.email}) đang có vai trò `,
                  `Your current session (${user.email}) is registered as `
                )}
                <span className="font-mono text-brand">
                  {user.role === "student"
                    ? t("Học viên (student)", "Student")
                    : user.role}
                </span>
                .
              </p>

              <div className="flex flex-wrap gap-3 font-mono text-xs">
                {/* Nâng quyền chỉ khả dụng ở chế độ giả lập cục bộ — không bao giờ trên Cloud */}
                {!isCloudConnected && (
                  <button
                    onClick={async () => {
                      await switchRole("instructor");
                    }}
                    className="px-4 py-2.5 bg-brand text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    [◆]{" "}
                    {t(
                      "Chuyển sang vai trò giảng viên (demo)",
                      "Switch to instructor role (demo elevation)"
                    )}
                  </button>
                )}
                <button
                  onClick={() => navigate("/workspace")}
                  className="px-4 py-2.5 bg-surface border border-grid text-primary hover:bg-subtle transition-colors"
                >
                  [◀]{" "}
                  {t(
                    "Quay lại không gian code học viên",
                    "Return to student workspace"
                  )}
                </button>
              </div>
            </BentoCell>
          </BentoGrid>
        </BentoSection>
      </div>
    );
  }

  return <>{children}</>;
};
