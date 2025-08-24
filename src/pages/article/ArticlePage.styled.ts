import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* padding: 0 16px;
  box-sizing: border-box; */
  margin-bottom: 80px; //푸터높이

  flex-grow: 1;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 1rem ;
  box-sizing: border-box;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.ExtraBold24};
`;

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
  padding: 1rem 1rem 0;
  box-sizing: border-box;
`;

export const SavedPlaceBox = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;

export const ArticleBox = styled.div`
  display: flex;
  flex-direction: column; /* ✅ 세로로 리스트 */
  width: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  gap: 1rem; /* 카드 간격 */
`;

export const FilterRow = styled.div`
  display: flex;
  height: 2.4rem;
  width: 100%;
  align-items: flex-end;
  border-bottom: 2px solid ${({ theme }) => theme.colors.N10};
  select {
    padding: 8px 10px;
    border-radius: 8px;
    background: #fff;
    
  }
`;
export const CategoryButton = styled.button<{ selected?: boolean }>`
  position: relative; /* ::after 기준점 */
  padding: 8px 4px;
  margin-left: 1rem;
  height: 100%;
  ${({ theme }) => theme.fonts.Bold16};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.R50 : theme.colors.N70};
  cursor: pointer;

  /* 기존 border-bottom은 제거 */
  border-bottom: none;

  /* 선택 시 밑줄을 부모의 1px 보더 위에 겹치도록 살짝 내려그림 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px; /* 부모의 1px 보더 라인과 겹치도록 1px 아래로 */
    height: 2.5px;
    background: ${({ selected, theme }) =>
      selected ? theme.colors.R50 : "transparent"};
    pointer-events: none;
  }
`;