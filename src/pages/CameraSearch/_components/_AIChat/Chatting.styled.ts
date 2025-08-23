import styled, { css } from "styled-components";

export const ChattingWrapper = styled.div`
    width: 100%;
    padding: 24px 16px 0;
    
    gap: 2rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-top: 1px solid ${({ theme }) => theme.colors.N10};
    height: fit-content; // ✅ 내용에 맞게 높이 자동 조절
    min-height: 0;
`;

export const ASK = styled.div`
    ${({ theme }) => theme.fonts.SemiBold12};
    color: ${({ theme }) => theme.colors.N70};
`;

/* ====== 대화 로그 ====== */
export const ChatLog = styled.div`
    flex: 1;              // ✅ ChatLog가 ChattingWrapper의 남은 공간을 모두 채우도록 함
    /* overflow-y: auto;     // ✅ ChatLog 내부에 스크롤이 발생하도록 함 */
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 4px;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
`;

export const MsgRow = styled.div<{ $role: "user" | "assistant" }>`
    display: flex;
    
    ${(p) =>
        p.$role === "user"
        ? css`
            justify-content: flex-end;
            `
        : css`
            justify-content: flex-start;
            `}
`;

export const BubbleBox = styled.div`
    position: relative;
    display: inline-block;   /* 버블 크기에 맞춰 감쌈 */
    max-width: 80%;
    
`;

export const Avatar = styled.img`
    position: absolute;
    top: 2px;
    left: 0px;
    width: 24px;
    height: 24px;

    img{
        width: 24px;
        height: 24px;
    }
`;

// 기존 Bubble 덮어쓰기(assistant일 때 패딩 추가)
export const Bubble = styled.div<{ $role: "user" | "assistant" }>`
    max-width: 80%;
    padding: 10px 12px;
    border-radius: 12px;
    white-space: pre-wrap;
    word-break: break-word;
    margin-bottom: 20px;
    ${(p) =>
        p.$role === "user"
        ? css`
            background: ${p.theme.colors.N00};
            color: ${p.theme.colors.N70};
        `
        : css`
            background: ${p.theme.colors.R10};
            color: ${p.theme.colors.N70};
            margin-left: 34px;
    `}
`;

/* ====== 입력 영역 ====== */
export const ChatField = styled.div`
    width: 100%;
    box-sizing: border-box;
    gap: 1rem;
    display: flex;
    flex-direction: column;
`;

export const QuickQuestions = styled.div`
    display: flex;
    gap: 8px;
    width: 100%;
    overflow-x: auto; /* ✅ 가로 스크롤 */
    padding-bottom: 4px;
    box-sizing: border-box;

    /* 스크롤바 숨기기 */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const RecommendedQuestions = styled.div`
    flex-shrink: 0; 
    padding: 8px 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.R10};
    color: ${({ theme }) => theme.colors.R60};
    ${({ theme }) => theme.fonts.SemiBold10};
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
`;

export const InputRow = styled.form`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: end;
`;

export const AiChatField = styled.textarea`
    width: 100%;
    min-height: 52px;
    max-height: 140px;
    padding: 10px 12px;
    background: ${({ theme }) => theme.colors.N00};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.N10};
    color: ${({ theme }) => theme.colors.N70};
    resize: vertical;
    line-height: 1.4;
    outline: none;

    ::placeholder {
        color: ${({ theme }) => theme.colors.N30};
    }
`;

export const SendButton = styled.button`
    height: 40px;
    min-width: 44px;
    padding: 0 10px;
    border-radius: 10px;
    border: none;
    background: ${({ theme }) => theme.colors.R60};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: Black;
    img {
        width: 18px;
        height: 18px;
        display: block;
        filter: invert(1); /* 아이콘이 어두우면 반전 */
    }

    &:active {
        transform: translateY(1px);
    }
`;
