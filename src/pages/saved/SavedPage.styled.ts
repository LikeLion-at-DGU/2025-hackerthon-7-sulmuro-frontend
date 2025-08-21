import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
  box-sizing: border-box;
  margin-bottom: 80px; //푸터높이

  flex-grow: 1;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px 0;
  box-sizing: border-box;

  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.ExtraBold24};
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const SavedPlaceBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 16px;
`;

export const SavedArticleBox = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0;
  box-sizing: border-box;
`;
