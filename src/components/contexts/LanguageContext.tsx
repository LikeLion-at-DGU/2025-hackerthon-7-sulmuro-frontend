import { setApiLanguage } from "@/api/Api";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Language = "ko" | "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};

interface LanguageProviderProps {
  children: ReactNode; // children을 ReactNode 타입으로 설정
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}: any) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("lang");
      const initial: Language =
        saved === "ko" || saved === "en" || saved === "zh" ? saved : "en";

      // 바로 헤더/문서 lang 반영 (첫 렌더 전에)
      setApiLanguage(initial);
      document.documentElement.lang = initial === "zh" ? "zh-CN" : initial;
      if (!saved) localStorage.setItem("lang", initial);

      return initial;
    } catch {
      setApiLanguage("en");
      document.documentElement.lang = "en";
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", language);
    } catch {}
    setApiLanguage(language);
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
