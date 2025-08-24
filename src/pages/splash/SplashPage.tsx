import styled from "styled-components";
import Loading from "./Loading";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
const SplashPage = () => {
  return (
    <Wrapper>
      <SplashImg src={IMAGE_CONSTANTS.splash} />
      <Loading />
    </Wrapper>
  );
};

export default SplashPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.WHITE};
  z-index: 200;
  gap: 80px;
`;
const SplashImg = styled.img`
  display: flex;
  width: 62%;
  margin-top: 40vh;
`;
