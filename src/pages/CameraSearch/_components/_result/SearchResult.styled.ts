import styled from "styled-components";

export const SheetWrapper = styled.div`
    pointer-events: none;
    position: fixed;
    inset: 0;
    display: grid;
    place-items: end center;
    z-index: 1000;
`;
export const Backfill = styled.div`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 100%;
    max-width: 540px;
    background: ${({ theme }) => theme.colors.WHITE};
    z-index: 999;               /* 시트보다 아래 */
    pointer-events: none;
`;
export const Sheet = styled.div`
    pointer-events: auto;
    width: 100%;
    max-width: 540px;
    /* 시트가 꽉 찼을 때 내부 스크롤이 생기도록 */
    max-height: calc(100dvh - 12px);
    overflow-y: auto;

    color: Black;
    border-radius: 40px 40px 0 0;
    background-color: ${({ theme }) => theme.colors.WHITE};
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);

    transition: transform 180ms ease;
    will-change: transform;

    /* 드래그 중 바디 스크롤 끌고 가지 않게 */
    overscroll-behavior: contain;
    touch-action: pan-y;

    /* 안전 영역 (iOS 하단 홈바) */
    padding-bottom: env(safe-area-inset-bottom);

    @media (min-width: 768px) {
        border-radius: 40px 40px 0 0;
    }
`;

export const Grabber = styled.div`
    width: 58%;
    height: 6px;
    border-radius: 999px;
    background: #D9D9D9;
    margin: 0 auto 12px;
`;

export const Result = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 10px 14px 10px;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    .hint {
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
    margin: 0.8rem 0;
`;

export const CapturedResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    gap: 8px;
    padding: 0.5rem 0;
    img{
        width: 24px;
        height: 24px;
    }
    .label {
        font-weight: bold;
        font-size: 20px;
        box-sizing: border-box;
    }
`;

export const CapturedDescription = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.4rem;
    gap: 0;
    .hint {
        width: 100%;
        color: ${({ theme }) => theme.colors.N70};
        ${({ theme }) => theme.fonts.Regular14};
        line-height: 1.5; /* Add this line */
    }

`;

export const AveragePrice = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    color: ${({theme}) => theme.colors.N40};
    ${({ theme }) => theme.fonts.SemiBold14};
    .Tag{
        color: ${({theme}) => theme.colors.R50};
        ${({ theme }) => theme.fonts.SemiBold14};
    }

    .Price{
        color: ${({theme}) => theme.colors.N70};
        ${({ theme }) => theme.fonts.Regular12};
    }
`;

export const RecommendStrores = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    height: fit-content;
    color: ${({theme}) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold14};
    .Tag{
        color: ${({theme}) => theme.colors.R50};
        ${({ theme }) => theme.fonts.SemiBold14};
    }

`;

export const PriceWrapper = styled.div`
    padding: 5px 8px;
    background: ${({theme}) => theme.colors.N00};
    color: ${({theme}) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold12}
    border-radius: 8px;
    .price{
        padding: 5px 8px;
    background: ${({theme}) => theme.colors.N00};
    color: ${({theme}) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold12}
    border-radius: 8px;
    }
`;

export const RecommendedStoreList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none; /* 불릿 제거 */
    padding: 0;
    gap: 1rem; /* 항목 간의 간격 */
`;
export const RecommendedStoreItem = styled.li`
    padding: 5px 8px;
    background: ${({theme}) => theme.colors.N00};
    color: ${({theme}) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold12}

    border-radius: 8px;
`;
export const ToAIChat = styled.div`
    width: 100%;
    padding: 28px 0 12px 0;
    .scrollToAI{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${({theme}) => theme.colors.N70};
        ${({ theme }) => theme.fonts.Regular14}
    }
`; 

export const List = styled.div`
display: flex;
flex-direction: column;
padding-top: 10px;
`;

export const Item = styled.div`
display: grid;
grid-template-columns: 72px 1fr;
gap: 12px;
padding: 10px 6px;
align-items: center;
border-bottom: 1px solid rgba(255, 255, 255, 0.06);

.body {
display: flex;
flex-direction: column;
gap: 4px;
}
.title {
font-size: 16px;
font-weight: 700;
}
.sub {
font-size: 13px;
opacity: 0.8;
}
`;

export const Thumb = styled.img`
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 10px;
    background: #222;
`;
