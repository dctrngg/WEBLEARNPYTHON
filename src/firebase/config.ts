import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const RUNTIME_CONFIG_KEY = "chroma_py_firebase_runtime_config";

export interface FirebaseConfigValues {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

function getEffectiveFirebaseConfig(): FirebaseConfigValues | null {
  // 1. Check Runtime Config saved via UI Modal
  try {
    const raw = localStorage.getItem(RUNTIME_CONFIG_KEY);
    if (raw === "LOCAL_MOCK_ONLY") {
      return null;
    }
    if (raw) {
      const parsed = JSON.parse(raw) as FirebaseConfigValues;
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage parse errors
  }

  // 2. Check Vite Environment Variables (.env)
  const envKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const envProject = import.meta.env.VITE_FIREBASE_PROJECT_ID;

  if (
    envKey &&
    envProject &&
    envKey !== "your-api-key" &&
    !envKey.includes("PLACEHOLDER")
  ) {
    return {
      apiKey: envKey,
      authDomain:
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
        `${envProject}.firebaseapp.com`,
      projectId: envProject,
      storageBucket:
        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
        `${envProject}.appspot.com`,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
      appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
    };
  }

  return null;
}

const activeConfig = getEffectiveFirebaseConfig();

export const isFirebaseConfigured: boolean = Boolean(activeConfig);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (activeConfig) {
  try {
    app = initializeApp(activeConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
  } catch (err) {
    console.warn("[CHROMA_FIREBASE] Falling back to Local Cloud Emulator:", err);
  }
}

export function saveRuntimeFirebaseConfig(config: FirebaseConfigValues | null) {
  if (!config) {
    localStorage.setItem(RUNTIME_CONFIG_KEY, "LOCAL_MOCK_ONLY");
  } else {
    localStorage.setItem(RUNTIME_CONFIG_KEY, JSON.stringify(config));
  }
  window.location.reload();
}

export { app, auth, db, googleProvider, activeConfig };
