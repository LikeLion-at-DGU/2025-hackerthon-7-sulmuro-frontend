import styled from "styled-components";
import { Category } from "../_types/Marker.type";
import {
  ComponentType,
  SetStateAction,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
type SvgComp = ComponentType<SVGProps<SVGSVGElement>>;

interface ChooseCategoryProps {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<SetStateAction<Category>>;
}

const CATEGORIES: Category[] = [
  "ATM",
  "Food",
  "Clothes",
  "Goods",
  "Cafe",
  "Bar",
];

const CATEGORY_ICONS: Record<Category, SvgComp> = {
  All: IMAGE_CONSTANTS.Food,
  ATM: IMAGE_CONSTANTS.Atm,
  Food: IMAGE_CONSTANTS.Food,
  Clothes: IMAGE_CONSTANTS.Clothes,
  Goods: IMAGE_CONSTANTS.Goods,
  Cafe: IMAGE_CONSTANTS.Cafe,
  Bar: IMAGE_CONSTANTS.Bar,
};

const ChooseCategory = ({
  selectedCategory,
  setSelectedCategory,
}: ChooseCategoryProps) => {
  const hadleCategory = (c: Category) => {
    if (selectedCategory === c) {
      setSelectedCategory("All");
    } else {
      setSelectedCategory(c);
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  // 마우스
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    isDownRef.current = true;
    setDragging(true);
    startXRef.current = e.clientX;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !isDownRef.current) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = scrollLeftRef.current - dx;
  };

  const endDrag = () => {
    isDownRef.current = false;
    setDragging(false);
  };

  // 터치
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    isDownRef.current = true;
    setDragging(true);
    startXRef.current = e.touches[0].clientX;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !isDownRef.current) return;
    const dx = e.touches[0].clientX - startXRef.current;
    el.scrollLeft = scrollLeftRef.current - dx;
  };

  const onTouchEnd = endDrag;

  // 드래그 중 텍스트 선택 방지
  useEffect(() => {
    document.body.style.userSelect = dragging ? "none" : "";
    return () => {
      document.body.style.userSelect = "";
    };
  }, [dragging]);
  return (
    <CategoryContainer
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      $dragging={dragging}
    >
      {CATEGORIES.map((c) => {
        const Icon = CATEGORY_ICONS[c];
        const active = selectedCategory === c;

        return (
          <CategoryButton
            key={c}
            $active={active}
            onClick={() => hadleCategory(c)}
            type="button"
          >
            <MaskIcon $active={active}>
              <Icon />
            </MaskIcon>
            {c}
          </CategoryButton>
        );
      })}
    </CategoryContainer>
  );
};

export default ChooseCategory;

const CategoryContainer = styled.div<{ $dragging?: boolean }>`
  box-sizing: border-box;
  position: absolute;
  top: 80px;
  width: 100%;
  padding: 0 16px;
  max-width: 540px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 8px;
  overflow-x: hidden;
  -ms-overflow-style: none;
  pointer-events: none;
  z-index: 5;
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
  pointer-events: auto;

  @media (min-width: 768px) {
    width: 80px;
    font-size: 14px;
  }
`;

const MaskIcon = styled.span<{ $active?: boolean }>`
  width: 18px;
  height: 18px;
  display: inline-block;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.WHITE : theme.colors.N70}; /* 세미콜론 추가 */

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
