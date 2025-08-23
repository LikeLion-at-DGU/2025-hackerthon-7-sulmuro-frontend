import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import React, { SetStateAction } from "react";
import styled from "styled-components";
import { Place } from "../_types/Marker.type";

const kwangjang: Place = {
  id: 0,
  name: "광장시장",
  address: "광장시장",
  lat: 37.570115,
  lng: 126.999706,
  category: "All",
};

interface MapControllProps {
  setMapFocusPlace: React.Dispatch<SetStateAction<Place | null>>;
}

const MapControll = ({ setMapFocusPlace }: MapControllProps) => {
  const moveFocus = () => {
    setMapFocusPlace(kwangjang);
  };
  return (
    <ControllContainer>
      <Button onClick={moveFocus}>
        <img src={IMAGE_CONSTANTS.goMarket} alt="근처 시장으로 이동" />
      </Button>
      <Button>
        <img src={IMAGE_CONSTANTS.myLocation} alt="내 위치로 이동" />
      </Button>
    </ControllContainer>
  );
};
export default MapControll;

const ControllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  bottom: 50px;
  right: 20px;
  z-index: 30;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: 40px;
  height: 40px;
`;
