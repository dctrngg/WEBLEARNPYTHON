import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ToastProvider } from "./components/ui/Primitives";
import { preloadPyodide } from "./services/pyodidePreloader";

// Lazy-loaded routes for optimal initial bundle size and instant loading
const LoginPage = React.lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const StudentWorkspacePage = React.lazy(() =>
  import("./pages/StudentWorkspacePage").then((m) => ({
    default: m.StudentWorkspacePage,
  }))
);
const InstructorDashboardPage = React.lazy(() =>
  import("./pages/InstructorDashboardPage").then((m) => ({
    default: m.InstructorDashboardPage,
  }))
);
const BlueprintPage = React.lazy(() =>
  import("./pages/BlueprintPage").then((m) => ({ default: m.BlueprintPage }))
);
const ProjectorPage = React.lazy(() =>
  import("./pages/ProjectorPage").then((m) => ({ default: m.ProjectorPage }))
);

const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center font-mono text-xs gap-3">
    <div className="w-8 h-8 border-2 border-brand border-t-transparent animate-spin" />
    <span className="text-secondary uppercase tracking-wider animate-pulse">
      ĐANG NẠP MÔ-ĐUN HỆ THỐNG...
    </span>
  </div>
);

export const App: React.FC = () => {
  useEffect(() => {
    // Start pre-warming CPython WebAssembly runtime in background
    preloadPyodide();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Default Landing Route (/): Blueprint Page */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <BlueprintPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Alias /blueprint also points to BlueprintPage */}
                  <Route
                    path="/blueprint"
                    element={
                      <ProtectedRoute>
                        <BlueprintPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Student IDE Workspace */}
                  <Route
                    path="/workspace/:assignmentId?"
                    element={
                      <ProtectedRoute>
                        <StudentWorkspacePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin / Teacher Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requiredRole="instructor">
                        <InstructorDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/instructor"
                    element={
                      <ProtectedRoute requiredRole="instructor">
                        <InstructorDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/projector"
                    element={
                      <ProtectedRoute requiredRole="instructor">
                        <ProjectorPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Public Authentication Screen */}
                  <Route path="/login" element={<LoginPage />} />

                  {/* Fallback Redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
