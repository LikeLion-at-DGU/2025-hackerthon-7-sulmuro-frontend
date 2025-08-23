import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { SetStateAction } from "react";
import styled from "styled-components";
import { Place } from "../_types/Marker.type";

interface MarketModalProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  setMapFocusPlace: React.Dispatch<SetStateAction<Place | null>>;
}
const kwangjang: Place = {
  id: 0,
  name: "광장시장",
  address: "광장시장",
  lat: 37.570115,
  lng: 126.999706,
  category: "All",
};
const MarketModal = ({
  setIsModalOpen,
  setMapFocusPlace,
}: MarketModalProps) => {
  const modalClose = () => {
    setIsModalOpen(false);
  };

  const moveFocus = () => {
    setMapFocusPlace(kwangjang);
  };
  return (
    <MarketModalContainer>
      <ModalHeader>
        <div />
        <p>시장 이동</p>
        <button onClick={modalClose}>
          <img src={IMAGE_CONSTANTS.CLoseIcon} alt="" />
        </button>
      </ModalHeader>
      <ModalBody>
        <Title>서울의 대표 전통시작</Title>
        <button onClick={moveFocus}>서울광장시장</button>
        <span>더 많은 시장들이 업데이트될 예정이예요.</span>
      </ModalBody>
    </MarketModalContainer>
  );
};

export default MarketModal;

const MarketModalContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 540px;
  height: 250px;
  box-sizing: border-box;
  padding: 24px 32px;

  z-index: 15;

  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 50px 50px 0 0;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.Bold16}
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 20px;

  gap: 16px;

  button {
    padding: 12px 8px;
    border-radius: 8px;
    border-color: ${({ theme }) => theme.colors.R50};
    border-width: 1px;
    border-style: solid;
    color: ${({ theme }) => theme.colors.R50};
    ${({ theme }) => theme.fonts.Bold16};
  }

  display: flex;
  justify-content: flex-start;
  span {
    ${({ theme }) => theme.fonts.Regular14}
    color: ${({ theme }) => theme.colors.N40}
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.SemiBold14}
  color: ${({ theme }) => theme.colors.N70}
`;
