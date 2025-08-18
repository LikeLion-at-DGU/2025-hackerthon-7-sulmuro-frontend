import styled, { css } from "styled-components";

export const ChattingWrapper = styled.div`
    width: 100%;
    padding: 24px 16px 0 ;
    gap: 2rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-top: 1px solid ${({ theme }) => theme.colors.N10};
    height: fit-content;
    min-height: 0;
`;

export const ASK = styled.div`
    ${({ theme }) => theme.fonts.SemiBold12};
    color: ${({ theme }) => theme.colors.N70};
`;

/* ====== 대화 로그 ====== */
export const ChatLog = styled.div`
    flex: 1 1 auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 4px;
    scroll-behavior: smooth;     /* ✅ 기본 스무스 스크롤 */
    overscroll-behavior: contain;/* ✅ 모달/바텀시트 내에서 바운스 방지 */
    scrollbar-gutter: stable;    /* ✅ 스크롤바 뜰 때 레이아웃 흔들림 최소화 */
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

export const Bubble = styled.div<{ $role: "user" | "assistant" }>`
    max-width: 80%;
    padding: 10px 12px;
    border-radius: 12px;
    white-space: pre-wrap;
    word-break: break-word;

    ${(p) =>
        p.$role === "user"
        ? css`
            background: ${p.theme.colors.R10};
            color: ${p.theme.colors.R60};
            `
        : css`
            background: ${p.theme.colors.N20};
            color: ${p.theme.colors.WHITE};
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
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;
`;

export const RecommendedQuestions = styled.div`
    width: fit-content;
    padding: 8px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.R10};
    color: ${({ theme }) => theme.colors.R60};
    ${({ theme }) => theme.fonts.SemiBold10};
    cursor: pointer;
    user-select: none;
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
