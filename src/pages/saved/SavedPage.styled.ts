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
  flex-grow: 1;
`;

export const SavedPlaceBox = styled.div<{ isEmpty: boolean }>`
  display: grid;
  grid-template-columns: ${(props) => (props.isEmpty ? "1fr" : "1fr 1fr")};
  width: 100%;
  height: 40%;
  gap: 16px;
`;

export const SavedArticleBox = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: calc(var(--vh, 1vh) * 25);
  ${({ theme }) => theme.fonts.Regular14};
  color: ${({ theme }) => theme.colors.N30};
`;
