import { SetStateAction } from "react";
import styled from "styled-components";

interface ChooseMaketProps {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ChooseMarket = ({ setIsModalOpen }: ChooseMaketProps) => {
  const modalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <ChooseMarketContainer>
      <MarketButton onClick={modalOpen}>서울 광장 시장 ▼</MarketButton>
    </ChooseMarketContainer>
  );
};

export default ChooseMarket;

const ChooseMarketContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 20px;
  width: 100%;
  padding: 0 16px;
  z-index: 5;
`;

const MarketButton = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.N70};
  color: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.fonts.SemiBold14};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
