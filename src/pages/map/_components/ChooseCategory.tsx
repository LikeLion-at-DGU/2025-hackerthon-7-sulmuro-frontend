import styled from "styled-components";
import { Category } from "../_types/Marker.type";
import { SetStateAction } from "react";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

interface ChooseCategoryProps {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<SetStateAction<Category>>;
}

const CATEGORIES: Category[] = [
  "ATM",
  "Foods",
  "Clothes",
  "Goods",
  "Cafe",
  "Bar",
];

const CATEGORY_ICONS: Record<Category, string> = {
  All: IMAGE_CONSTANTS.Food,
  ATM: IMAGE_CONSTANTS.Atm,
  Foods: IMAGE_CONSTANTS.Food,
  Clothes: IMAGE_CONSTANTS.Clothes,
  Goods: IMAGE_CONSTANTS.Goods,
  Cafe: IMAGE_CONSTANTS.Cafe,
  Bar: IMAGE_CONSTANTS.Bar,
};

const ChooseCategory = ({
  selectedCategory,
  setSelectedCategory,
}: ChooseCategoryProps) => {
  return (
    <CategoryContainer>
      {CATEGORIES.map((c) => (
        <>
          <CategoryButton
            key={c}
            $active={selectedCategory === c}
            onClick={() => setSelectedCategory(c)}
            type="button"
          >
            <MaskIcon
              $src={CATEGORY_ICONS[c]}
              $active={selectedCategory === c}
            />
            {c}
          </CategoryButton>
        </>
      ))}
    </CategoryContainer>
  );
};

export default ChooseCategory;

const CategoryContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 20px;
  width: 100%;
  padding: 0 16px;
  max-width: 540px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 8px;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 768px) {
    gap: 16px;
  }
`;

const CategoryButton = styled.button<{ $active?: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.R50 : theme.colors.WHITE};

  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-width: 100px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  color: ${({ theme, $active }) =>
    $active ? theme.colors.WHITE : theme.colors.N70};
  ${({ theme }) => theme.fonts.SemiBold12};

  @media (min-width: 768px) {
    width: 80px;
    font-size: 14px;
  }
`;

const MaskIcon = styled.span<{ $src: string; $active?: boolean }>`
  width: 18px;
  height: 18px;
  display: inline-block;
  mask: url(${({ $src }) => $src}) no-repeat center / contain;
  -webkit-mask: url(${({ $src }) => $src}) no-repeat center / contain;

  /* ← 여기 색만 바꾸면 아이콘 색이 바뀜 */
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.WHITE : theme.colors.N70};
`;
