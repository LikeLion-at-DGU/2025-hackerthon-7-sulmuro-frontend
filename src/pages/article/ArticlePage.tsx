// src/pages/article/ArticlePage.tsx
import * as S from "./ArticlePage.styled";
import { useArticle } from "./_hooks/useArticle";
import { Place, Category } from "./_apis/getArticle";
import ArticleCard from "./_components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { buildRoute } from "@/constants/routeConstants";
import { useState, useCallback, useMemo } from "react";
import PlaceSheet from "./_components/PlaceSheet";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useLanguage } from "@/components/contexts/LanguageContext";

const CATEGORY_KEYS: readonly Category[] = ["음식", "쇼핑", "역사"] as const;

const ArticlePage = () => {
  const { place, category, articles, loading, errorMsg, selectPlace, selectCategory } = useArticle();
  const [isPlaceSheetOpen, setPlaceSheetOpen] = useState(false);
  const openPlaceSheet = useCallback(() => setPlaceSheetOpen(true), []);
  const closePlaceSheet = useCallback(() => setPlaceSheetOpen(false), []);
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t = useMemo(() => {
    return {
      header: language === "ko" ? "아티클" : language === "zh" ? "文章" : "Articles",
      categories: {
        음식: language === "ko" ? "음식" : language === "zh" ? "美食" : "Food",
        쇼핑: language === "ko" ? "쇼핑" : language === "zh" ? "购物" : "Shopping",
        역사: language === "ko" ? "역사" : language === "zh" ? "历史" : "History",
      } as Record<Category, string>,
      loading: language === "ko" ? "불러오는 중..." : language === "zh" ? "加载中..." : "Loading...",
      errorPrefix: language === "ko" ? "" : language === "zh" ? "" : "",
      placeTriggerSuffix: language === "ko" ? "" : language === "zh" ? "" : "",
      placeLabel: (p: Place) =>
        p === "전체"
          ? language === "ko"
            ? "전체"
            : language === "zh"
            ? "全部"
            : "All"
          : language === "ko"
          ? "서울광장시장"
          : language === "zh"
          ? "广藏市场"
          : "Gwangjang Market",
    };
  }, [language]);

  return (
    <S.Wrapper>
      <S.Header>
        <div>{t.header}</div>

        <S.PlaceDropdown>
          <S.PlaceTrigger
            type="button"
            onClick={openPlaceSheet}
            aria-haspopup="dialog"
            aria-expanded={isPlaceSheetOpen}
          >
            {t.placeLabel(place)}
            <img src={IMAGE_CONSTANTS.DropDown} alt="▽" />
          </S.PlaceTrigger>
        </S.PlaceDropdown>
      </S.Header>

      <S.FilterRow>
        {CATEGORY_KEYS.map((c) => (
          <S.CategoryButton key={c} selected={category === c} onClick={() => selectCategory(c)}>
            {t.categories[c]}
          </S.CategoryButton>
        ))}
      </S.FilterRow>

      <S.Contents>
        {loading && <div>{t.loading}</div>}
        {!loading && errorMsg && <div>{errorMsg}</div>}
        {!loading && !errorMsg && (
          <S.ArticleBox>
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} onClick={(id) => navigate(buildRoute.articleDetail(id))} />
            ))}
          </S.ArticleBox>
        )}
      </S.Contents>

      {isPlaceSheetOpen && (
        <PlaceSheet
          setIsOpen={setPlaceSheetOpen}
          current={place}
          onSelect={(p: Place) => {
            selectPlace(p);
            closePlaceSheet();
          }}
        />
      )}
    </S.Wrapper>
  );
};

export default ArticlePage;
