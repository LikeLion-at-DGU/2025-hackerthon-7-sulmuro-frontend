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
    <ChooseMarketContainer onClick={modalOpen}>
      서울 광장 시장 ▼
    </ChooseMarketContainer>
  );
};

export default ChooseMarket;

const ChooseMarketContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 50px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.N70};
  color: ${({ theme }) => theme.colors.WHITE};
  ${({ theme }) => theme.fonts.SemiBold14};
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
