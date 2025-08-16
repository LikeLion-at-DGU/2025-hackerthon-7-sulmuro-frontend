import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import styled from "styled-components";

const SelectLanguage = () => {
  return (
    <LanguageContainer>
      <LanguageButton>
        <img src={IMAGE_CONSTANTS.LanguageOpen} alt="언어 변환" />
      </LanguageButton>
      <LanguageButton>
        <img src={IMAGE_CONSTANTS.LanguageKorean} alt="한국어 변환" />
      </LanguageButton>
      <LanguageButton>
        <img src={IMAGE_CONSTANTS.LanguageEnglish} alt="translate to English" />
      </LanguageButton>
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

const LanguageButton = styled.button`
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
