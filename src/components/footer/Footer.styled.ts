import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  padding: 16px 0;
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  max-width: 540px;
  width: 100%;
  height: 60px;
  z-index: 10;
`;

export const FooterContent = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
`;

export const FooterContentSearch = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.N70};
  border-radius: 24px;

  width: 60%;
  height: 100%;
  img {
    width: 36px;
    height: 36px;
  }
`;
