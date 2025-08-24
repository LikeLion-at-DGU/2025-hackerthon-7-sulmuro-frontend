import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routeConstants";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTE_PATHS.MAP, { replace: true });
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <Wrapper>
      <SplashImg src={IMAGE_CONSTANTS.splash2} />
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
  z-index: 50;
  gap: 80px;
`;
const SplashImg = styled.img`
  display: flex;
  width: 62%;
  margin-top: 40vh;
`;
