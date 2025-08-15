import styled from "styled-components";

export const SheetWrapper = styled.div`
    pointer-events: none; /* sheet가 열릴 때만 내부에서 이벤트 허용 */
    position: absolute;
    inset: 0;
    display: grid;
    place-items: end center;
    z-index: 1000;
`;

export const Sheet = styled.div`
    pointer-events: auto;
    width: 100%;
    max-width: 640px;
    background: white;
    color: black;
    border-radius: 18px 18px 0 0;
    padding: 0 12px 24px;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);

    transition: transform 180ms ease;
    will-change: transform;
    border-radius: 10% 10% 0 0;

    @media (min-width: 768px) {
    border-radius: 20px;
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
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 20px 0 14px;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    
    .hint {
    opacity: 0.7;
    font-size: 12px;
    }
`;

export const CapturedImg = styled.img`
    /* width: 340px;
    height: 340px; */
    max-width: 520px;
    max-height: 520px;
    width: 100%;
    height: 90dvw;
    object-fit: cover;
    /* border-radius: 12px; */
    background: #222;
    flex: 0 0 auto;
`;

export const CapturedResult = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 3rem;
    gap: 8px;
    img{
        width: 24px;
        height: 24px;
    }
    .label {
        font-weight: bold;
        font-size: 20px;
        
    }
`;

export const CapturedDescription = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 3rem;
    
    .hint {
        font-weight: regular;
        font-size: 14px;
        
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
