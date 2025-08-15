import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  padding: 8px 0;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 540px;
  width: 100%;
  height: 80px;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.WHITE};
`;

export const FooterContent = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  gap: 4px;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    ${({ theme }) => theme.fonts.SemiBold10};
  }
`;

export const ImageContainer = styled.div`
  width: 28px;
  height: 28px;
`;

export const FooterContentSearch = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.N70};
  border-radius: 24px;

  aspect-ratio: 1;
  height: 100%;
  img {
    width: 36px;
    height: 36px;
  }
`;
