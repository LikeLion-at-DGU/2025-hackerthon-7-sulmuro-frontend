// article/_components/EmptyState.tsx
import styled from "styled-components";

const Box = styled.div`
  padding: 48px 16px;
  text-align: center;
  color: #666;
`;

type Props = { message?: string };

const EmptyState = ({ message = "조건에 맞는 아티클이 없습니다." }: Props) => {
  return <Box>{message}</Box>;
};

export default EmptyState;
