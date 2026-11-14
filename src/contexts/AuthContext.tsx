import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase/config";
import { UserProfile, UserRole } from "../types/ide";
import {
  getAllUsers,
  getUserProfile,
  upsertUserProfile,
} from "../services/firestoreService";
import { INITIAL_USERS } from "../services/seedData";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  isCloudConnected: boolean;
  loginStudent: (username: string, password: string) => Promise<void>;
  registerStudent: (
    username: string,
    fullName: string,
    className: string,
    password: string
  ) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    displayName: string,
    role?: UserRole,
    className?: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginDemoAccount: (role: UserRole) => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOCAL_SESSION_KEY = "chroma_py_active_session_v3";

/**
 * Helper to normalize username (lowercase, remove accents/spaces)
 */
export function normalizeUsername(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9_.-]+/g, "");
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    async function restoreSession() {
      const savedSession = localStorage.getItem(LOCAL_SESSION_KEY);
      if (savedSession) {
        try {
          const parsed = JSON.parse(savedSession) as UserProfile;
          const latest = await getUserProfile(parsed.uid);
          if (mounted) {
            setUser(latest || parsed);
          }
        } catch {
          if (mounted) setUser(null);
        }
      } else {
        if (mounted) setUser(null);
      }
      if (mounted) setLoading(false);
    }
    restoreSession();
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Đăng nhập học sinh chỉ cần: Username + Password
   */
  const loginStudent = async (username: string, password: string) => {
    const cleanUser = normalizeUsername(username);
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      throw new Error("Vui lòng nhập đầy đủ Tên đăng nhập (Username) và Mật khẩu!");
    }

    const expectedUid = `usr_${cleanUser}`;

    // 1. Direct lookup by UID in Firestore / local storage
    let foundUser = await getUserProfile(expectedUid);

    // 2. Fallback search across all users by username or uid
    if (!foundUser) {
      const allUsers = await getAllUsers();
      foundUser =
        allUsers.find(
          (u) =>
            (u.username && normalizeUsername(u.username) === cleanUser) ||
            u.uid === expectedUid
        ) || null;
    }

    if (!foundUser) {
      throw new Error(
        `Không tìm thấy tài khoản có username "${cleanUser}". Nếu em chưa có tài khoản, hãy bấm sang tab [02] TẠO TÀI KHOẢN MỚI!`
      );
    }

    if (foundUser.password && foundUser.password !== cleanPass) {
      throw new Error("Mật khẩu không chính xác. Vui lòng kiểm tra lại!");
    }

    if (isFirebaseConfigured && auth && foundUser.email && cleanPass.length >= 6) {
      try {
        await signInWithEmailAndPassword(auth, foundUser.email, cleanPass);
      } catch {
        // Firestore profile auth already verified
      }
    }

    setUser(foundUser);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(foundUser));
  };

  /**
   * Đăng ký tài khoản học sinh: Username + Họ và tên + Lớp học + Mật khẩu
   */
  const registerStudent = async (
    username: string,
    fullName: string,
    className: string,
    password: string
  ) => {
    const cleanUser = normalizeUsername(username);
    const cleanName = fullName.trim().replace(/\s+/g, " ");
    const cleanClass = className.trim().toUpperCase();
    const cleanPass = password.trim();

    if (cleanUser.length < 3) {
      throw new Error(
        "Tên đăng nhập (Username) phải có ít nhất 3 ký tự (viết liền, không dấu, ví dụ: an10a7)."
      );
    }
    if (cleanName.length < 2) {
      throw new Error("Vui lòng nhập đầy đủ Họ và tên học sinh.");
    }
    if (!cleanClass) {
      throw new Error("Vui lòng chọn Lớp học của em.");
    }
    if (cleanPass.length < 4) {
      throw new Error("Mật khẩu phải có ít nhất 4 ký tự.");
    }

    const uid = `usr_${cleanUser}`;
    const syntheticEmail = `${cleanUser}@tinhoc10.edu.vn`;

    // Check if username already exists
    const existingByUid = await getUserProfile(uid);
    const allUsers = await getAllUsers();
    const existingByUsername = allUsers.find(
      (u) =>
        (u.username && normalizeUsername(u.username) === cleanUser) ||
        u.uid === uid
    );

    if (existingByUid || existingByUsername) {
      throw new Error(
        `Tên đăng nhập "${cleanUser}" đã có người sử dụng! Em hãy chọn thêm số hoặc lớp vào sau (ví dụ: ${cleanUser}_${cleanClass.toLowerCase()}) hoặc chuyển sang tab [01] ĐĂNG NHẬP.`
      );
    }

    if (isFirebaseConfigured && auth && cleanPass.length >= 6) {
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          syntheticEmail,
          cleanPass
        );
        await updateProfile(cred.user, {
          displayName: `${cleanName} (${cleanClass})`,
        });
      } catch {
        // Proceed with Firestore users collection persistence
      }
    }

    const newProfile: UserProfile = {
      uid,
      username: cleanUser,
      email: syntheticEmail,
      displayName: cleanName,
      className: cleanClass,
      password: cleanPass,
      role: "student",
      createdAt: new Date().toISOString(),
    };

    await upsertUserProfile(newProfile);

    setUser(newProfile);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newProfile));
  };

  const loginWithEmail = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const usernamePart = cleanEmail.split("@")[0];
    await loginStudent(usernamePart, password);
  };

  const registerWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    role: UserRole = "student",
    className: string = "10A7"
  ) => {
    const usernamePart = email.split("@")[0];
    await registerStudent(usernamePart, displayName, className, password);
    if (role === "instructor") {
      await switchRole("instructor");
    }
  };

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      const cred = await signInWithPopup(auth, googleProvider);
      let profile = await getUserProfile(cred.user.uid);
      if (!profile) {
        profile = {
          uid: cred.user.uid,
          username: cred.user.email?.split("@")[0] || "google_user",
          email: cred.user.email || "oauth@trychroma.dev",
          displayName: cred.user.displayName || "Học sinh Google",
          className: "10A7",
          role: "student",
          createdAt: new Date().toISOString(),
        };
        await upsertUserProfile(profile);
      }
      setUser(profile);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(profile));
      return;
    }
  };

  const loginDemoAccount = async (role: UserRole) => {
    const preset =
      role === "instructor" ? INITIAL_USERS[1] : INITIAL_USERS[0];
    await upsertUserProfile(preset);
    setUser(preset);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(preset));
  };

  const switchRole = async (role: UserRole) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      role,
    };
    await upsertUserProfile(updated);
    setUser(updated);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(updated));
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch {
        // Ignore signOut errors
      }
    }
    localStorage.removeItem(LOCAL_SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isCloudConnected: isFirebaseConfigured,
        loginStudent,
        registerStudent,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginDemoAccount,
        switchRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
