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
export const Header = styled.header`
  transition: opacity 0.3s ease;
  padding-top: 20px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  z-index: 16;
  button {
    padding: 0;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

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

export const PlaceInfoWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "animate",
})<{
  $expanded?: boolean;
  animate?: boolean;
}>`
  touch-action: pan-x;

  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 540px;
  height: ${({ $expanded }) => ($expanded ? "250px" : "140px")};

  z-index: 15;

  background-color: ${({ theme }) => theme.colors.WHITE};

  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  padding: 0 32px;

  overflow-y: hidden;
  transition: ${(props) => (props.animate ? "height 0.3s ease" : "none")};
  flex-grow: 1;
`;

export const SwipeButton = styled.div`
  width: 50%;
  height: 7px;
  border-radius: 5px;
  background-color: #d9d9d9;
  justify-self: center;
`;

export const InfoContainer = styled.div`
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
  overflow-y: auto;
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
  position: relative;
  margin-top: 50px;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  flex-grow: 1;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    ${({ theme }) => theme.fonts.Regular14}
  }
`;

export const AnotherContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FindForMapButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  max-width: 440px;
  width: 100%;
  color: ${({ theme }) => theme.colors.R60};
  ${({ theme }) => theme.fonts.SemiBold14};
  background-color: ${({ theme }) => theme.colors.R10};
  img {
    width: 12px;
    height: 12px;
  }
`;

export const ImageCarousel = styled.div<{ $dragging?: boolean }>`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 16px;

  cursor: ${({ $dragging }) => ($dragging ? "grabbing" : "grab")};
  user-select: none;
  touch-action: pan-x;
`;

export const ImageSlide = styled.div`
  flex: 0 0 100%;
  flex-shrink: 0
  scroll-snap-align: start;
  border-radius: 12px;
  overflow-x: hidden;
  background: #00000010;

  img {
    width: 100%;
    object-fit: cover;
    display: block;
  }
`;
