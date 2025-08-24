import styled from "styled-components";

//QuickTalk 컴포넌트

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
    overflow: scroll;
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
    padding: 0.25rem 0%;
`;

export const IconWrapper = styled.div`
    display: flex;
    gap: 10px;
    img{
        width: 1rem;
    }
`;

//QuickTalkPopup 컴포넌트
export const ModalOverlay = styled.div`
    position: fixed;
    top: 40%;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999; /* 페이지 최상단 */
`;

export const PopupWrapper = styled.div`
    width: 80%;
    max-width: 320px;
    background: ${({ theme }) => theme.colors.WHITE};
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
`;

// export const PopupHeader = styled.div`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     color: ${({ theme }) => theme.colors.N70};
//     ${({ theme }) => theme.fonts.Bold20};
// `;

export const Lines = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: fit-content;
`;

export const KoreanLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};
`;

export const EnglishLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Regular16};
    box-sizing: border-box;

`;

export const Sound = styled.div`
display: flex;
align-items: flex-start;

    img{
        width: 24px;
        height: 25px;
    }
`;