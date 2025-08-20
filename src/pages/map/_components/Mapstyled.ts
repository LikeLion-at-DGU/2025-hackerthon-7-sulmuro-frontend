import styled from "styled-components";

export const MapContainer = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 80px);
`;

export const Button = styled.button`
  position: absolute;
  bottom: 100px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.WHITE};

  &.right {
    right: 15px;
  }
  &.left {
    left: 15px;
  }
`;

// PlaceInfo
export const FindButton = styled.button`
  position: absolute;
  left: 15px;
  bottom: 120px;

  display: flex;
  flex-direction: row;

  padding: 8px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.R50};
  color: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.fonts.SemiBold14}
`;

export const PlaceInfoWrapper = styled.div<{ $expanded?: boolean }>`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 540px;
  height: ${({ $expanded }) => ($expanded ? "250px" : "140px")};

  z-index: 15;

  border-radius: 50px 50px 0 0;
  background-color: ${({ theme }) => theme.colors.WHITE};

  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 0 32px;

  overflow-y: auto;
  -ms-overflow-style: none;
`;

export const SwipeButton = styled.div`
  width: 50%;
  height: 7px;
  border-radius: 5px;
  background-color: #d9d9d9;
  justify-self: center;
`;

export const InfoContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.N70};
  .title {
    ${({ theme }) => theme.fonts.Bold20}
  }
  .address {
    ${({ theme }) => theme.fonts.Regular14}
  }
`;

export const ExtendsContaiener = styled.div`
  margin-top: 28px !important;
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    ${({ theme }) => theme.fonts.SemiBold14};
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
  }
  button {
    ${({ theme }) => theme.fonts.Regular12};
    color: ${({ theme }) => theme.colors.N70};
    background-color: ${({ theme }) => theme.colors.N00};
    padding: 8px 4px;
    border-radius: 4px;
  }
`;

export const AdditionalInfo = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    ${({ theme }) => theme.fonts.Regular14}
  }
`;
