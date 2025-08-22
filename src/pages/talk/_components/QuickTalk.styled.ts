import styled from "styled-components";

//QuickTalk 컴포넌트

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
`;

export const LineContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
`;

export const ContainerHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.R50};
    ${({ theme }) => theme.fonts.SemiBold16};
`;

//QuickTalkLine 컴포넌트

export const LineWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold14};
`;

export const IconWrapper = styled.div`
    display: flex;
    gap: 10px;
    img{
        width: 1rem;
    }
`;

//QuickTalkPopup 컴포넌트

export const PopupWrapper = styled.div`
    width: 80%;
    min-height: 110px;
    background: ${({ theme }) => theme.colors.WHITE};
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
`;

export const Lines = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

`;

export const KoreanLine = styled.div`
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};
`;

export const EnglishLine = styled.div`
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};
`;

export const Sound = styled.div`
    img{
        width: 24px;
        height: 24px;
    }
`;