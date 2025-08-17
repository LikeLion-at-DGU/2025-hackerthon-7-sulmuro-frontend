import styled from "styled-components";

export const SheetWrapper = styled.div`
    pointer-events: none;
    position: absolute;
    inset: 0;
    display: grid;
    place-items: end center;
    z-index: 1000;
`;

export const Sheet = styled.div`
    pointer-events: auto;
    width: 100%;
    max-width: 540px;
    height: fit-content;
    max-height: 100dvh;
    color: Black;
    border-radius: 40px 40px 0 0;
    background-color: ${({ theme }) => theme.colors.WHITE};
    
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);

    transition: transform 180ms ease;
    will-change: transform;
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
    gap: 1rem;
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
`;

export const CapturedResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    gap: 8px;
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
    .hint {
        font-weight: regular;
        font-size: 14px;
        width: 80%;
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
