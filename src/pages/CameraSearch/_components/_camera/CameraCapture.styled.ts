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
    top: calc(50% + min(50vh, 318px) / 2 + 2rem); // Frame 하단 + 2rem
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    color: #fff;
    opacity: 0.9;
    font-size: 16px;
    font-weight: 600;
    z-index: 2;
    white-space: nowrap; // 텍스트가 줄바꿈되지 않도록 설정
`;

export const BottomBar = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: env(safe-area-inset-bottom, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 24px 28px;
    pointer-events: none;
    z-index:2;
    box-sizing: border-box;
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
    display: flex;
    justify-content: center;
    align-items: center;
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


