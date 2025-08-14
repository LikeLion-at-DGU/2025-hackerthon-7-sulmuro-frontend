import styled from "styled-components";

export const SheetWrapper = styled.div`
pointer-events: none; /* sheet가 열릴 때만 내부에서 이벤트 허용 */
position: absolute;
inset: 0;
display: grid;
place-items: end center;
`;

export const Sheet = styled.div`
pointer-events: auto;
width: 100%;
max-width: 640px;
background: #111;
color: #fff;
border-radius: 18px 18px 0 0;
padding: 10px 12px 24px;
box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.5);

transition: transform 180ms ease;
will-change: transform;

@media (min-width: 768px) {
border-radius: 20px;
}
`;

export const Grabber = styled.div`
width: 46px;
height: 5px;
border-radius: 999px;
background: rgba(255, 255, 255, 0.28);
margin: 8px auto 12px;
`;

export const CapturedRow = styled.div`
display: flex;
gap: 12px;
padding: 8px 6px 14px;
align-items: center;
border-bottom: 1px solid rgba(255, 255, 255, 0.08);

.label {
font-weight: 700;
margin-bottom: 6px;
}
.hint {
opacity: 0.7;
font-size: 12px;
}
`;

export const CapturedImg = styled.img`
width: 84px;
height: 84px;
object-fit: cover;
border-radius: 12px;
background: #222;
flex: 0 0 auto;
`;

export const CapturedMeta = styled.div`
display: flex;
flex-direction: column;
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
