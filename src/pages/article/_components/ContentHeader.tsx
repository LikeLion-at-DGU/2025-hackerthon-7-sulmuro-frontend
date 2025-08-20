// src/pages/article/_components/MainHeader.tsx
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  text: string;
  path: string; // 이동할 경로
};

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 0;
  box-sizing: border-box;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.ExtraBold24};
`;

const More = styled(Link)`
  ${({ theme }) => theme.fonts.SemiBold14};
  color: ${({ theme }) => theme.colors.N50};
  text-decoration: none;
`;

const ContentHeader = ({ text, path }: Props) => {
  return (
    <Row>
      <div>{text}</div>
      <More to={path}>더보기</More>
    </Row>
  );
};

export default ContentHeader;
