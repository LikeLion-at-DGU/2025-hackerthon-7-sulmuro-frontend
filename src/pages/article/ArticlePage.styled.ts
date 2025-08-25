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


export const PlaceTrigger = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.fonts.SemiBold14};
  color: ${({ theme }) => theme.colors.N70};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
    position: relative;
    padding: 8px 4px;
    margin-left: 1rem;
    height: 100%;
    
    // 선택 여부에 따라 폰트 스타일과 색상 변경
    color: ${({ selected, theme }) => (selected ? theme.colors.R50 : theme.colors.N30)};
    ${({ selected, theme }) => (selected ? theme.fonts.Bold16 : theme.fonts.SemiBold16)};

    cursor: pointer;
    border-bottom: none;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        height: 2.5px;
        background: ${({ selected, theme }) => (selected ? theme.colors.R50 : "transparent")};
        pointer-events: none;
    }
`;