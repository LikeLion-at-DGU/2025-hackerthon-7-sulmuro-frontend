import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import styled from "styled-components";
import { useState } from "react";
import { useLanguage } from "@/components/contexts/LanguageContext";

const SelectLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useLanguage();

  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (newLanguage: "ko" | "en") => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <LanguageContainer>
      <LanguageButton onClick={toggleLanguageMenu}>
        <img
          src={
            isOpen
              ? IMAGE_CONSTANTS.LanguageOpen
              : IMAGE_CONSTANTS.LanguageClose
          }
          alt="언어 변환"
        />
      </LanguageButton>
      <LanguageOptions $isOpen={isOpen}>
        <LanguageButton onClick={() => handleLanguageChange("ko")}>
          <img src={IMAGE_CONSTANTS.LanguageKorean} alt="한국어 변환" />
        </LanguageButton>
        <LanguageButton onClick={() => handleLanguageChange("en")}>
          <img
            src={IMAGE_CONSTANTS.LanguageEnglish}
            alt="translate to English"
          />
        </LanguageButton>
      </LanguageOptions>
    </LanguageContainer>
  );
};

export default SelectLanguage;

const LanguageContainer = styled.div`
  position: absolute;
  top: 70px;
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

const LanguageButton = styled.button`
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
