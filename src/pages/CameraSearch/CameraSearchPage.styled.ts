// pages/CameraSearch/CameraSearchPage.styled.ts
import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100dvh;
    overflow: hidden;
    background: white;
`;

export const ChatOverlay = styled.div`
    position: absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: env(safe-area-inset-bottom, 0);
    max-width: 640px;
    margin: 0 0;

    background: #111;
    color: #fff;
    border-radius: 18px 18px 0 0;

    max-height: 100vh;
    overflow: auto;
    z-index: 3;
`;