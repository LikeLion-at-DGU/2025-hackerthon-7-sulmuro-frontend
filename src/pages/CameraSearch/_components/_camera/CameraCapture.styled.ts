// pages/CameraSearch/_components/_camera/CameraCapture.styled.ts
import styled from "styled-components";

export const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

`;

export const BackIcon = styled.img`
    width: 26px;
    height: 26px;
    position: absolute;
    top: 25px;
    left: 16px;
    color: #fff;
    opacity: 0.9;
    z-index:3;
`;
export const Video = styled.video`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    object-fit: cover;
`;

export const Frame = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: min(50vh, 318px);
    height: min(50vh, 318px);
    transform: translate(-50%, -50%);
    border-radius: 24px;
    pointer-events: none;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
    outline: 2px solid rgba(255, 255, 255, 0.15);
    z-index:1;
`;

export const Crosshair = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -52%);
    font-size: 28px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.7);
    mix-blend-mode: screen;
    img{
        width: 22px;
    height: 22px;
    }
    z-index:1;
`;
export const Hint = styled.div`
    position: absolute;
    top: 72%;
    width: 100%;
    display: flex;
    justify-content: center;
    color: #fff;
    opacity: 0.9;
    font-size: 16px;
    font-weight: 600;
    z-index:2;
`;
export const BottomBar = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 90%;
    bottom: env(safe-area-inset-bottom, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 16px 28px;
    pointer-events: none;
    z-index:2;
`;


export const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    pointer-events: auto;
`;

export const Nothing = styled.div`
    width: 53px;
    display: hidden;
`;
export const CaptureButton = styled.button`
    border: none;
    outline: none;
    width: 58px;
    height: 58px;
    
    color: #fff;
    font-size: 28px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.08s ease;
    &:active { transform: scale(0.96); }
    img{
        width: 58px;
        height: 58px;
    }

`;

export const UploadLabel = styled.label`
    position: relative;
    width: 53px;
    height: 37px;
    
    cursor: pointer;
    user-select: none;  
    img{
        width: 53px;
        height: 37px;
    
    }
`;

/* ====== ⬇️ 추가: 에러/로딩 오버레이 UI ====== */
export const Overlay = styled.div`
position: absolute;
inset: 0;
background: rgba(0,0,0,0.6);
color: #fff;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 12px;
padding: 20px;
text-align: center;
`;

export const Spinner = styled.div`
width: 28px;
height: 28px;
border-radius: 50%;
border: 3px solid rgba(255,255,255,0.3);
border-top-color: #fff;
animation: spin 1s linear infinite;
@keyframes spin { to { transform: rotate(360deg); } }
`;

export const OverlayTitle = styled.div`
font-size: 18px;
font-weight: 800;
`;

export const OverlayDesc = styled.div`
font-size: 13px;
opacity: 0.9;
max-width: 560px;
`;

export const OverlayActions = styled.div`
display: flex;
gap: 10px;
margin-top: 6px;
`;

export const PrimaryButton = styled.button`
padding: 10px 14px;
border-radius: 12px;
background: #ff7570;
color: #fff;
font-weight: 700;
cursor: pointer;
border: none;
`;

export const OverlayHint = styled.div`
margin-top: 6px;
font-size: 12px;
opacity: 0.8;
`;
