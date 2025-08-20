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
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.ExtraBold24};
`;


// export const Header = styled.header`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   justify-content: space-between;
//   margin-bottom: 16px;
//   font-size: 1.25rem;
//   font-weight: 700;
// `;
export const PlaceDropdown = styled.div`
  select {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: #fff;
  }
`;
export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const SavedPlaceBox = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

export const SavedArticleBox = styled.div`
  display: flex;
  flex-direction: column; /* ✅ 세로로 리스트 */
  width: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  gap: 12px; /* 카드 간격 */
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  align-items: center;

  select {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.N20};
    background: #fff;
  }
`;

export const CategoryButton = styled.button<{ selected?: boolean }>`
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid ${({ selected, theme }) =>
    selected ? theme.colors.N70 : theme.colors.N20};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.N70 : "#fff"};
  color: ${({ selected, theme }) =>
    selected ? "#fff" : theme.colors.N70};
  cursor: pointer;
`;
