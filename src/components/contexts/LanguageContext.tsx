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
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode; // children을 ReactNode 타입으로 설정
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}: any) => {
  const [language, setLanguage] = useState<Language>("ko");

  useEffect(() => {
    setApiLanguage(language);
    localStorage.setItem("lang", language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
