import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100dvh;
`;

export const TopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

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

    img{
        width: 24px;
        height: 24px;
    }
`;

export const LanguageSwitch = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    gap : 4px;
    img{
        width: 24px;
        height: 24px;
    }
`;

export const LanguageSelect = styled.div`
    select {
        background: ${({ theme }) => theme.colors.N00};
        color: ${({ theme }) => theme.colors.N70};
        ${({ theme }) => theme.fonts.Regular14};
        border-radius: 4px; 
        border: none;
        padding: 0.5rem; 
    }
`;

export const LanguageTrigger = styled.button`
    padding: 6px 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.N00};
    ${({ theme }) => theme.fonts.Regular14};
    color: ${({ theme }) => theme.colors.N70};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    img{
        width: 14px;
        height: 14px;
    }
`;

export const TranslateInput = styled.input`
    width: 100%;
    height: 74px;
    padding: 1rem 1.2rem;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold20};
    border: none; /* input 기본 테두리 제거 */
    border-bottom: 1px solid #E4E4E7;
    background-color: transparent; /* 배경 투명하게 */
    outline: none; /* 클릭 시 테두리 제거 */

    &::placeholder {
        color: ${({ theme }) => theme.colors.N30};
    }
    box-sizing: border-box;
`;

export const TranslateResult = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    color: ${({ theme }) => theme.colors.N30};
    ${({ theme }) => theme.fonts.SemiBold20};
    box-sizing: border-box;

`;

export const BottomContainer = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 5rem;

`;

export const RecommendedLines = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background:  ${({ theme }) => theme.colors.N00};
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold16};
    border-radius: 8px;
    padding: 1rem;
    gap: 1rem;
    box-sizing: border-box;
`;

export const Line = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
        box-sizing: border-box;

`;

export const KoreanLine = styled.div`
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold14};
        box-sizing: border-box;

`;

export const EnglishLine = styled.div`
    color: ${({ theme }) => theme.colors.N30};
    ${({ theme }) => theme.fonts.SemiBold14};
        box-sizing: border-box;

`;

export const IconContainer = styled.div`
    img{
        height: 20px;
        width: 20px;
    }
        box-sizing: border-box;

`;

export const VoiceTranslate = styled.div`
    width: 100%;
    margin: 0.8rem 0.6rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.R10};
    color: ${({ theme }) => theme.colors.R60};
    ${({ theme }) => theme.fonts.SemiBold16};
    box-sizing: border-box;
`;