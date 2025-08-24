// article/_components/ArticleCard.tsx
import * as S from "./ArticleCard.styled";
import { useState, useEffect, useRef } from "react";
import { Article } from "../_apis/getArticle";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { addArticle, hasArticle, removeArticle } from "@/utils/SavedBookMark";

type Props = {
  article: Article;
  onClick?: (id: number) => void; // ✅ string → number
};

const ArticleCard = ({ article, onClick }: Props) => {
  const { id, title, images = [], subtitle, place } = article;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleArticleExplicit = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (id == null) return;
    setIsBookmarked((prev) => {
      if (prev) removeArticle(id!);
      else addArticle(id!);
      return !prev;
    });
  };
  useEffect(() => {
    if (id != null) {
      setIsBookmarked(hasArticle(id));
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <S.Wrapper
      onClick={() => onClick?.(id)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      aria-label={title}
    >
      <S.Header>
        <S.Name title={title}>{title}</S.Name>
        <img src={IMAGE_CONSTANTS.RightBtn} alt="오른쪽 화실표" />
      </S.Header>
      <S.SubTitle title={subtitle}>{subtitle}</S.SubTitle>
      <S.ImageScrollContainer ref={containerRef}>
        <S.BookmarkIcon
          src={
            isBookmarked
              ? IMAGE_CONSTANTS.Bookmark
              : IMAGE_CONSTANTS.FalseBookmark
          }
          alt={isBookmarked ? "북마크 설정됨" : "북마크 해제됨"}
          onClick={handleArticleExplicit}
        />
        {images.map((src, idx) => (
          <S.ArticleImage
            key={idx}
            src={src}
            alt={`${title} 이미지 ${idx + 1}`}
          />
        ))}
      </S.ImageScrollContainer>
      <S.LocationWrapper>
        <img src={IMAGE_CONSTANTS.PlaceIcon} alt="위치" />
        <S.Address title={place}>{place}</S.Address>
      </S.LocationWrapper>
    </S.Wrapper>
  );
};

export default ArticleCard;
