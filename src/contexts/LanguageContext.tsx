import React, { createContext, useCallback, useContext, useState } from "react";

export type LanguageMode = "vi" | "en";

interface LanguageContextValue {
  lang: LanguageMode;
  toggleLanguage: () => void;
  setLanguage: (mode: LanguageMode) => void;
  t: (vi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "vi",
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: (vi) => vi,
});

const LANG_STORAGE_KEY = "chroma_py_language_mode";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Default to Vietnamese ('vi') as requested by user
  const [lang, setLangState] = useState<LanguageMode>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "vi" || saved === "en") return saved;
    return "vi";
  });

  const setLanguage = useCallback((mode: LanguageMode) => {
    setLangState(mode);
    localStorage.setItem(LANG_STORAGE_KEY, mode);
    document.documentElement.lang = mode;
  }, []);

  const toggleLanguage = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "vi" ? "en" : "vi";
      localStorage.setItem(LANG_STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const t = useCallback(
    (vi: string, en: string) => {
      return lang === "vi" ? vi : en;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLanguage, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

