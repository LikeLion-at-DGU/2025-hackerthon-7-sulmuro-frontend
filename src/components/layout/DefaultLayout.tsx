import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../footer/Footer";
import useFooterVisible from "@/hooks/useFooterVisible";
const DefaultLayout = () => {
  const showFooter = useFooterVisible();
  return (
    <Wrapper className="tt">
      <Outlet />
      {showFooter && <Footer />}
    </Wrapper>
  );
};

export default DefaultLayout;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: calc(var(--vh, 1vh) * 100);
  /* padding-top: 3.5rem; */

  background-color: ${({ theme }) => theme.colors.WHITE};
`;
