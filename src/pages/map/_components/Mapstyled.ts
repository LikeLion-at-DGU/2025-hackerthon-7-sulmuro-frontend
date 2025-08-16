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

export const PlaceInfoWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 540px;
  height: 150px;

  z-index: 15;

  border-radius: 30px 30px 0 0;
  background-color: ${({ theme }) => theme.colors.WHITE};

  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 0 32px;
`;

export const SwipeButton = styled.div`
  width: 50%;
  height: 7px;
  border-radius: 5px;
  background-color: #d9d9d9;
  justify-self: center;
`;

export const InfoContainer = styled.div`
  margin-top: 50px;
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
