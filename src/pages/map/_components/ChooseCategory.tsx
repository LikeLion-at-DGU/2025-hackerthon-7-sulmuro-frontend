import styled from "styled-components";
const ChooseCategory = () => {
  return (
    <CategoryContainer>
      <CategoryButton>ALL</CategoryButton>
      <CategoryButton>￦ ATM</CategoryButton>
      <CategoryButton>Food</CategoryButton>
      <CategoryButton>Clothes</CategoryButton>
      <CategoryButton>Goods</CategoryButton>
    </CategoryContainer>
  );
};

export default ChooseCategory;

const CategoryContainer = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  max-width: 540px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const CategoryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.SemiBold12};

  @media (min-width: 768px) {
    width: 80px;
    font-size: 14px;
  }
`;
