import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    background: ${({theme}) => theme.colors.WHITE};
    height: 100vh;
    overflow-y: auto;   // ✅ 내용이 넘칠 때 전체 컨테이너가 스크롤되도록 설정
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
`;

export const ChatHeader = styled.div`
    width: 100%;
    height: 56px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    background : ${({theme}) => theme.colors.WHITE};
    img{
        width: 24px;
        height: 24px;
    }
`;

export const Result = styled.div`
    // Result는 자연스럽게 내용만큼 높이를 차지하게 됩니다.
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 20px 10px 14px 10px;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-top: 40px;
    .hint {
        width: 100%;
        opacity: 0.7;
        font-size: 12px;
    }
`;

export const CapturedImg = styled.img`
    max-width: 440px;
    max-height: 440px;
    width: 100%;
    height: 90dvw;
    object-fit: cover;
    border-radius: 12px;
    background: #222;
    flex: 0 0 auto;
`;

export const CapturedResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    gap: 8px;
    color: ${({theme}) => theme.colors.N70};
    ${({theme}) => theme.fonts.Regular14}
    img{
        width: 24px;
        height: 24px;
    }
    .label {
        color: ${({theme}) => theme.colors.N70};
        ${({theme}) => theme.fonts.Bold20}
    }
`;

export const CapturedDescription = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: ${({theme}) => theme.colors.N70};
    ${({theme}) => theme.fonts.Regular14}
    
    .hint {
        ${({theme}) => theme.fonts.Regular14}
        width: 100%;
    }
`;

export const ToAIChat = styled.div`
    width: 100%;
    padding: 32px 0 0 0;
    .scrollToAI{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({theme}) => theme.colors.N40};
        ${({ theme }) => theme.fonts.SemiBold14}
    }
`; 

export const ChattingWrapper = styled.div`
    width: 100%;
`;