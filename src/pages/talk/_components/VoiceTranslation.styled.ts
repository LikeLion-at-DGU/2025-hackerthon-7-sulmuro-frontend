import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 96px);
  height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;

  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.Bold20};

  img {
    width: 24px;
    height: 24px;
  }
`;

export const TranslationWrapper = styled.div`
  width: 100%;
  //   height: 80%;
  display: grid;
  grid-template: 1fr, 1fr;
`;

export const FirstLanguageBox = styled.div`
  width: 100%;
  min-height: 320px;
  height: 1rem;
  padding: 1.2rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.R10};
  position: relative;
`;

export const FirstLanguageSelect = styled.div`
  select {
    background: ${({ theme }) => theme.colors.R10};
    color: ${({ theme }) => theme.colors.R60};
    ${({ theme }) => theme.fonts.SemiBold16};
    border-radius: 4px;
    border: none;
  }
`;
export const LanguageTrigger = styled.button<{ boxType: "first" | "second" }>`
  padding: 6px 12px;
  border-radius: 8px;
  ${({ theme }) => theme.fonts.SemiBold16};
  color: ${({ theme, boxType }) =>
    boxType === "first" ? theme.colors.R60 : theme.colors.N70};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  img {
    width: 14px;
    height: 14px;
  }
`;
export const FristLanguageResult = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.R60};
  ${({ theme }) => theme.fonts.Semibold32};
`;

export const VoiceIcon = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const SecondLanguageBox = styled.div`
  width: 100%;
  min-height: 320px;
  height: 50%;
  padding: 1.2rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.WHITE};
`;

export const SecondLanguageSelect = styled.div`
  select {
    background: ${({ theme }) => theme.colors.WHITE};
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold16};
    border-radius: 4px;
    border: none;
  }
`;

export const SecondLanguageResult = styled.div`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.Semibold32};
`;

export const BottomContainer = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  position: fixed;
  bottom: 4.8rem;
  max-width: 540px;
`;

export const TextTranslate = styled.div`
  width: 100%;
  margin: 0 0.6rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.N00};
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.SemiBold16};
  box-sizing: border-box;
`;
