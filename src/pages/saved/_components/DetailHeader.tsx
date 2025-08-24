import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { ROUTE_PATHS } from "@/constants/routeConstants";
import { useNavigate } from "react-router-dom";
interface MainHeaderProps {
  text: string;
}

const DetailHeader = ({ text }: MainHeaderProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(ROUTE_PATHS.SAVED);
  };
  return (
    <Wrapper>
      <Btn onClick={handleNavigate}>
        <img src={IMAGE_CONSTANTS.LeftBtn} alt="왼쪽 화실표" />
      </Btn>
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default DetailHeader;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px 0;
  box-sizing: border-box;
  gap: 4px;
`;

const Text = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.Bold20};
`;

const Btn = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
