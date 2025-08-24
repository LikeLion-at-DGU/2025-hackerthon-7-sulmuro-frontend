import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import styled from "styled-components";
import { useState } from "react";
import { useLanguage } from "@/components/contexts/LanguageContext";

const SelectLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLanguage: "ko" | "en" | "zh") => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const ICON = {
    ko: IMAGE_CONSTANTS.LanguageKorean,
    en: IMAGE_CONSTANTS.LanguageEnglish,
    zh: IMAGE_CONSTANTS.LanguageChinese,
  } as const;

  const ALT = {
    ko: "한국어",
    en: "English",
    zh: "中文",
  } as const;

  const options: Array<"ko" | "en" | "zh"> = ["ko", "en", "zh"].filter(
    (l) => l !== language
  ) as Array<"ko" | "en" | "zh">;
  return (
    <LanguageContainer>
      {/* 현재 선택된 언어 아이콘: 펼쳐졌을 때만 강조 */}
      <LanguageButton
        onClick={toggleLanguageMenu}
        aria-expanded={isOpen}
        aria-label="언어 선택"
        $active={isOpen} // ✅ 펼쳐졌을 때만 배경 강조
      >
        <img src={ICON[language]} alt={ALT[language]} />
      </LanguageButton>

      {/* 나머지 언어만 노출 */}
      <LanguageOptions $isOpen={isOpen}>
        {options.map((l) => (
          <LanguageButton key={l} onClick={() => handleLanguageChange(l)}>
            <img src={ICON[l]} alt={ALT[l]} />
          </LanguageButton>
        ))}
      </LanguageOptions>
    </LanguageContainer>
  );
};

export default SelectLanguage;

const LanguageContainer = styled.div`
  position: absolute;
  top: 130px;
  right: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface LanguageOptionsProps {
  $isOpen: boolean;
}

const LanguageOptions = styled.div<LanguageOptionsProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-10px)"};
`;

const LanguageButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.R20 : theme.colors.WHITE};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 0 2px #AECBFA inset"
      : "0 0 4px rgba(0,0,0,0.1)"}; /* 테두리 강조 */
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
