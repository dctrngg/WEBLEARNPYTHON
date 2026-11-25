import React, { useState } from "react";
import {
  activeConfig,
  FirebaseConfigValues,
  isFirebaseConfigured,
  saveRuntimeFirebaseConfig,
} from "../../firebase/config";
import { seedCloudFirestoreData } from "../../services/firestoreService";
import { useLanguage } from "../../contexts/LanguageContext";
import { SectionBadge } from "./BentoPrimitives";

interface FirebaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const [rawSnippet, setRawSnippet] = useState("");
  const [apiKey, setApiKey] = useState(activeConfig?.apiKey || "");
  const [authDomain, setAuthDomain] = useState(activeConfig?.authDomain || "");
  const [projectId, setProjectId] = useState(activeConfig?.projectId || "");
  const [storageBucket, setStorageBucket] = useState(
    activeConfig?.storageBucket || ""
  );
  const [messagingSenderId, setMessagingSenderId] = useState(
    activeConfig?.messagingSenderId || ""
  );
  const [appId, setAppId] = useState(activeConfig?.appId || "");

  const [parseMessage, setParseMessage] = useState<string | null>(null);
  const [seedStatus, setSeedStatus] = useState<{
    loading: boolean;
    msg: string | null;
    isError?: boolean;
  }>({ loading: false, msg: null });

  if (!isOpen) return null;

  // Automatically extract keys when user pastes the Firebase SDK snippet
  const handleAutoParseSnippet = (text: string) => {
    setRawSnippet(text);
    if (!text.trim()) {
      setParseMessage(null);
      return;
    }

    const extractField = (key: string): string => {
      const regex = new RegExp(`${key}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`, "i");
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    const foundApiKey = extractField("apiKey");
    const foundAuthDomain = extractField("authDomain");
    const foundProjectId = extractField("projectId");
    const foundStorageBucket = extractField("storageBucket");
    const foundMessagingSenderId = extractField("messagingSenderId");
    const foundAppId = extractField("appId");

    if (foundApiKey && foundProjectId) {
      setApiKey(foundApiKey);
      setProjectId(foundProjectId);
      if (foundAuthDomain) setAuthDomain(foundAuthDomain);
      if (foundStorageBucket) setStorageBucket(foundStorageBucket);
      if (foundMessagingSenderId) setMessagingSenderId(foundMessagingSenderId);
      if (foundAppId) setAppId(foundAppId);
      setParseMessage(
        t(
          `✓ Đã tự động nhận diện cấu hình của dự án "${foundProjectId}"! Bấm [ÁP DỤNG & KẾT NỐI FIREBASE] bên dưới.`,
          `✓ Auto-extracted config for project "${foundProjectId}"! Click [APPLY & CONNECT] below.`
        )
      );
    } else {
      setParseMessage(
        t(
          "⚠ Chưa tìm thấy apiKey và projectId trong đoạn mã vừa dán. Bạn có thể điền trực tiếp vào các ô bên dưới.",
          "⚠ Could not find apiKey and projectId in pasted text. You can fill the fields below manually."
        )
      );
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || !projectId.trim()) {
      saveRuntimeFirebaseConfig(null);
      return;
    }
    const cleanProject = projectId.trim();
    const cfg: FirebaseConfigValues = {
      apiKey: apiKey.trim(),
      authDomain: authDomain.trim() || `${cleanProject}.firebaseapp.com`,
      projectId: cleanProject,
      storageBucket: storageBucket.trim() || `${cleanProject}.appspot.com`,
      messagingSenderId: messagingSenderId.trim(),
      appId: appId.trim(),
    };
    saveRuntimeFirebaseConfig(cfg);
  };

  const handleResetEmulator = () => {
    saveRuntimeFirebaseConfig(null);
  };

  const handleSeedCloudNow = async () => {
    setSeedStatus({
      loading: true,
      msg: t(
        "Đang đẩy 22 bài tập Tin học 10 & tài khoản mẫu lên Cloud Firestore...",
        "Uploading 22 assignments & sample users to Cloud Firestore..."
      ),
    });
    const res = await seedCloudFirestoreData();
    if (res.success) {
      setSeedStatus({
        loading: false,
        isError: false,
        msg: t(
          `🎉 Thành công! Đã đồng bộ ${res.count} bài tập Tin học 10 lên Cloud Firestore của bạn!`,
          `🎉 Success! Synced ${res.count} assignments to your Cloud Firestore!`
        ),
      });
    } else {
      setSeedStatus({
        loading: false,
        isError: true,
        msg: t(
          `✕ Lỗi ghi Firestore: ${res.error}. Hãy kiểm tra bạn đã bật "Firestore Database" và chỉnh tab "Rules" thành allow read, write: if true; trên Firebase Console chưa.`,
          `✕ Firestore write error: ${res.error}. Make sure Firestore Database is created and Rules allow read/write.`
        ),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border border-grid max-w-2xl w-full p-6 space-y-5 my-8 max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-grid pb-4">
          <div>
            <SectionBadge
              glyph="[☁]"
              label={t(
                "Kết nối cơ sở dữ liệu Firebase thực tế",
                "Live Firebase cloud configuration"
              )}
            />
            <h3 className="text-lg font-bold text-primary">
              {t(
                "Thiết lập Kết nối Firebase & Đồng bộ Dữ liệu thật",
                "Connect Your Firebase Project & Sync Data"
              )}
            </h3>
            <p className="text-xs font-mono text-secondary mt-1">
              {t("Trạng thái hiện tại:", "Current status:")}{" "}
              <span
                className={
                  isFirebaseConfigured
                    ? "text-success font-bold"
                    : "text-brand font-bold"
                }
              >
                {isFirebaseConfigured
                  ? t(
                      `● ĐANG KẾT NỐI FIREBASE THẬT (Project: ${activeConfig?.projectId})`,
                      `● CONNECTED TO LIVE FIREBASE (${activeConfig?.projectId})`
                    )
                  : t(
                      "◆ Đang chạy mock data cục bộ (localstorage)",
                      "◆ Running local mock data (localstorage)"
                    )}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-xs text-secondary hover:text-primary px-2.5 py-1 border border-grid"
          >
            [✕] {t("Đóng", "Close")}
          </button>
        </div>

        {/* 3-Step Quick Guide */}
        <div className="bg-subtle border border-grid p-4 font-mono text-xs space-y-2">
          <div className="text-brand font-bold">
            📋 {t("3 Bước lấy mã kết nối từ Firebase console:", "3 Steps to connect Firebase:")}
          </div>
          <ol className="list-decimal list-inside space-y-1 text-secondary leading-relaxed">
            <li>
              {t(
                "Vào ",
                "Go to "
              )}
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-brand underline font-semibold"
              >
                console.firebase.google.com
              </a>{" "}
              {t(
                "→ Tạo Project → Vào Project Settings (⚙️) → Chọn ứng dụng Web (</>) → Copy đoạn ",
                "→ Create Project → Project Settings (⚙️) → Web App (</>) → Copy "
              )}
              <code className="text-primary">const firebaseConfig = &#123;...&#125;</code>.
            </li>
            <li>
              {t(
                "Trong menu trái của Firebase Console, vào mục ",
                "In the left menu, open "
              )}
              <strong className="text-primary">Build → Firestore Database</strong>{" "}
              {t(
                "→ Bấm Create database → Chọn ",
                "→ Click Create database → Choose "
              )}
              <strong className="text-success">Start in test mode</strong>{" "}
              {t(
                "(hoặc trong tab Rules đặt ",
                "(or in Rules tab set "
              )}
              <code className="text-emerald-400">allow read, write: if true;</code>
              {t(").", ").")}
            </li>
            <li>
              {t(
                "(Tùy chọn) Vào ",
                "(Optional) Open "
              )}
              <strong className="text-primary">Build → Authentication → Sign-in method</strong>{" "}
              {t(
                "→ Bật Email/Password và Google nếu muốn đăng nhập bằng tài khoản thực.",
                "→ Enable Email/Password and Google sign-in."
              )}
            </li>
          </ol>
        </div>

        {/* Quick Paste Box */}
        <div className="space-y-1.5 font-mono text-xs">
          <label className="block text-primary font-semibold">
            ⚡{" "}
            {t(
              "CÁCH NHANH NHẤT: Dán nguyên đoạn code firebaseConfig vào đây",
              "QUICK PASTE: Paste your raw firebaseConfig snippet here"
            )}
          </label>
          <textarea
            rows={4}
            value={rawSnippet}
            onChange={(e) => handleAutoParseSnippet(e.target.value)}
            placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "ten-project.firebaseapp.com",\n  projectId: "ten-project",\n  appId: "1:123456:web:abcdef"\n};`}
            className="w-full bg-canvas border border-grid p-3 text-primary focus:outline-none focus:border-brand text-xs"
          />
          {parseMessage && (
            <div className="text-emerald-400 text-[11px]">{parseMessage}</div>
          )}
        </div>

        {/* If already connected to Firebase, allow 1-click seeding of the 22 exercises */}
        {isFirebaseConfigured && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 font-mono text-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-success font-bold">
                  ✓ {t("Đã kết nối với project:", "Connected to project:")}{" "}
                  {activeConfig?.projectId}
                </div>
                <div className="text-secondary text-[11px]">
                  {t(
                    "Bấm nút bên phải để đẩy toàn bộ 22 bài tập Tin học 10 (Bài 16 - 31) lên bảng assignments trên Cloud Firestore của bạn.",
                    "Click the button to upload all 22 Grade 10 Python exercises to your Cloud Firestore."
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleSeedCloudNow}
                disabled={seedStatus.loading}
                className="px-3.5 py-2 bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors shrink-0 disabled:opacity-50"
              >
                {seedStatus.loading
                  ? t("◐ Đang đồng bộ...", "◐ Syncing...")
                  : t(
                      "🚀 Đẩy 22 bài tập lên Firestore",
                      "🚀 Seed 22 exercises to Firestore"
                    )}
              </button>
            </div>
            {seedStatus.msg && (
              <div
                className={`p-2 border text-[11px] ${
                  seedStatus.isError
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-emerald-500/40 bg-canvas text-emerald-400"
                }`}
              >
                {seedStatus.msg}
              </div>
            )}
          </div>
        )}

        {/* Manual Form Fields */}
        <form onSubmit={handleSave} className="space-y-3 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-secondary mb-1">
                apiKey <span className="text-brand">*</span>
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-canvas border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-secondary mb-1">
                projectId <span className="text-brand">*</span>
              </label>
              <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="weblearnpython-10"
                className="w-full bg-canvas border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-secondary mb-1">
                authDomain
              </label>
              <input
                type="text"
                value={authDomain}
                onChange={(e) => setAuthDomain(e.target.value)}
                placeholder="weblearnpython-10.firebaseapp.com"
                className="w-full bg-canvas border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-secondary mb-1">
                appId
              </label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="1:123456789:web:abcdef"
                className="w-full bg-canvas border border-grid px-3 py-2 text-primary focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-grid">
            <button
              type="button"
              onClick={handleResetEmulator}
              className="px-3 py-2 border border-grid text-secondary hover:text-primary hover:bg-subtle transition-colors"
            >
              {t("Quay về mock data cục bộ", "Use local mock data")}
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-grid text-secondary hover:text-primary"
              >
                {t("Đóng", "Close")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand text-white font-semibold hover:opacity-90"
              >
                [✓]{" "}
                {t(
                  "Áp dụng & kết nối Firebase",
                  "Apply & connect Firebase"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
