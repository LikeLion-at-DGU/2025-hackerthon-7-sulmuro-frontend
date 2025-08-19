import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
interface MainHeaderProps {
  text: string;
  path: string;
}

const MainHeader = ({ text, path }: MainHeaderProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(path);
  };
  return (
    <Wrapper>
      <Text>저장한 {text}</Text>
      <Btn onClick={handleNavigate}>
        <img src={IMAGE_CONSTANTS.RightBtn} alt="오른쪽 화실표" />
      </Btn>
    </Wrapper>
  );
};

export default MainHeader;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px 0;
  box-sizing: border-box;
`;

const Text = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.Bold20};
`;

const Btn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
