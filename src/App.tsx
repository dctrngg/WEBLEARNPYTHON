import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { StudentWorkspacePage } from "./pages/StudentWorkspacePage";
import { InstructorDashboardPage } from "./pages/InstructorDashboardPage";
import { BlueprintPage } from "./pages/BlueprintPage";
import { ProjectorPage } from "./pages/ProjectorPage";
import { ToastProvider } from "./components/ui/Primitives";

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
              {/* Default Landing Route (/): Blueprint Page with Tin học 10 Curriculum (know.md) & Lesson-Grouped Exercises */}
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

              {/* Student IDE Workspace with optional specific Assignment ID */}
              <Route
                path="/workspace/:assignmentId?"
                element={
                  <ProtectedRoute>
                    <StudentWorkspacePage />
                  </ProtectedRoute>
                }
              />

              {/* Admin / Teacher Route (/admin): Protected, requires Instructor/Admin role */}
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

              {/* Public Authentication / Switch Account Screen */}
              <Route path="/login" element={<LoginPage />} />

              {/* Fallback Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
