// src/pages/article/_components/ArticleCard.tsx
import * as S from "./ArticleCard.styled";
import { useState, useEffect, useRef, useMemo } from "react";
import { Article } from "../_apis/getArticle";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { addArticle, hasArticle, removeArticle } from "@/utils/SavedBookMark";

type Props = {
  article: Article;
  onClick?: (id: number) => void;
};

const ArticleCard = ({ article, onClick }: Props) => {
  const { id, title, images = [], subtitle, place } = article;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ 북마크 상태
  const [isBookmarked, setIsBookmarked] = useState(false);

  // ✅ 다국어 처리
  const { language } = useLanguage();
  const t = useMemo(() => {
    const placeLabel = (p: string) => {
      if (p === "서울광장시장") {
        return language === "ko" ? "서울광장시장" : language === "zh" ? "广藏市场" : "Gwangjang Market";
      }
      if (p === "전체") {
        return language === "ko" ? "전체" : language === "zh" ? "全部" : "All";
      }
      return language === "ko" ? "기타" : language === "zh" ? "其他" : "Others";
    };
    return {
      rightArrowAlt: language === "ko" ? "오른쪽 화살표" : language === "zh" ? "右箭头" : "Right arrow",
      bookmarkedAlt: language === "ko" ? "북마크 설정됨" : language === "zh" ? "已收藏" : "Bookmarked",
      unbookmarkedAlt: language === "ko" ? "북마크 해제됨" : language === "zh" ? "未收藏" : "Not bookmarked",
      locationAlt: language === "ko" ? "위치" : language === "zh" ? "位置" : "Location",
      placeLabel,
    };
  }, [language]);

  // ✅ 북마크 토글 함수 (Incoming Changes 반영)
  const handleArticleExplicit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (id == null) return;
    setIsBookmarked((prev) => {
      if (prev) removeArticle(id);
      else addArticle(id);
      return !prev;
    });
  };

  // ✅ 초기 북마크 상태 설정 (Incoming Changes 반영)
  useEffect(() => {
    if (id != null) {
      setIsBookmarked(hasArticle(id));
    }
  }, [id]);

  // ✅ 이미지 스크롤 (Incoming Changes 반영)
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
        <img src={IMAGE_CONSTANTS.RightBtn} alt={t.rightArrowAlt} />
      </S.Header>

      <S.SubTitle title={subtitle}>{subtitle}</S.SubTitle>

      <S.ImageScrollContainer ref={containerRef}>
        <S.BookmarkIcon
          src={isBookmarked ? IMAGE_CONSTANTS.Bookmark : IMAGE_CONSTANTS.FalseBookmark}
          alt={isBookmarked ? t.bookmarkedAlt : t.unbookmarkedAlt}
          onClick={handleArticleExplicit}
        />
        {images.map((src, idx) => (
          <S.ArticleImage key={idx} src={src} alt={`${title} ${idx + 1}`} />
        ))}
      </S.ImageScrollContainer>

      <S.LocationWrapper>
        <img src={IMAGE_CONSTANTS.PlaceIcon} alt={t.locationAlt} />
        <S.Address title={t.placeLabel(place)}>{t.placeLabel(place)}</S.Address>
      </S.LocationWrapper>
    </S.Wrapper>
  );
};

export default ArticleCard;