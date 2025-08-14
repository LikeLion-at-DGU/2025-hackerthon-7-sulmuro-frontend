// pages/CameraSearch/_components/_camera/CameraCapture.styled.ts
import styled from "styled-components";

export const Wrap = styled.div`
position: relative;
width: 100%;
height: 100%;
`;

export const Video = styled.video`
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
`;

export const Frame = styled.div`
position: absolute;
left: 50%;
top: 50%;
width: min(78vw, 480px);
height: min(50vh, 360px);
transform: translate(-50%, -50%);
border-radius: 24px;
pointer-events: none;
box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.8);
outline: 2px solid rgba(255, 255, 255, 0.15);
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
`;

export const BottomBar = styled.div`
position: absolute;
left: 0;
right: 0;
bottom: env(safe-area-inset-bottom, 0);
display: flex;
flex-direction: column;
align-items: center;
gap: 12px;
padding: 24px 16px 28px;
pointer-events: none;
`;

export const Hint = styled.div`
color: #fff;
opacity: 0.9;
font-size: 16px;
font-weight: 600;
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

export const Actions = styled.div`
width: 100%;
display: flex;
justify-content: center;
gap: 16px;
align-items: center;
pointer-events: auto;
`;

export const CaptureButton = styled.button`
border: none;
outline: none;
width: 68px;
height: 68px;
border-radius: 50%;
background: #ff7570;
color: #fff;
font-size: 28px;
font-weight: 700;
cursor: pointer;
box-shadow: 0 8px 18px rgba(255, 117, 112, 0.5);
transition: transform 0.08s ease;
&:active { transform: scale(0.96); }
`;

export const UploadLabel = styled.label`
margin-left: 12px;
padding: 10px 12px;
border-radius: 12px;
background: rgba(255, 255, 255, 0.12);
color: #fff;
font-size: 12px;
font-weight: 600;
cursor: pointer;
user-select: none;
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
