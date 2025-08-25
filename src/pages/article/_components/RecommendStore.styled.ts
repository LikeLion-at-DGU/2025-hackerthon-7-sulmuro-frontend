// src/pages/article/_components/RecommendStore.styled.ts
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1rem;
    box-sizing: border-box;
    gap: 1rem;
    border-top: 1px solid ${({ theme }) => theme.colors.N10};
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    color: ${({ theme }) => theme.colors.N40};
    ${({ theme }) => theme.fonts.Regular14};
    .title {
        color: ${({ theme }) => theme.colors.N70};
        ${({ theme }) => theme.fonts.Bold20};
    }
`;

export const PlaceGrid = styled.div`
    display: grid;
    width: 100%;
    padding: 1rem 0;

    /* ✅ 가로 2개 고정 */
    grid-template-columns: repeat(2, minmax(0, 1fr));

    /* 카드 간격 */
    column-gap: 12px;
    row-gap: 16px;
`;
