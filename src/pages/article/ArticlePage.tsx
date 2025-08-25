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
import Loading from "@/components/loading/Loading";

const CATEGORY_KEYS: readonly Category[] = ["음식", "쇼핑", "역사"] as const;

enum Status {
  LOADING = "LOADING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

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
      errorFallback: language === "ko" ? "에러가 발생했습니다." : language === "zh" ? "发生错误。" : "Something went wrong.",
      empty: language === "ko" ? "아티클이 없습니다." : language === "zh" ? "暂无文章。" : "No articles found.",
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

  // ✅ 로딩/에러를 하나의 Status로 매핑
  const status: Status = useMemo(() => {
    if (loading) return Status.LOADING;
    if (errorMsg) return Status.FAILURE;
    return Status.SUCCESS;
  }, [loading, errorMsg]);

  // ✅ 상태별 렌더 함수
  const render = useCallback(
    (s: Status) => {
      switch (s) {
        case Status.LOADING:
          return (
            <div
              aria-busy="true"
              aria-live="polite"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "540px",
                height: "90vh",
                zIndex: 20,
                margin: "0 auto",
              }}
            >
              <Loading />
              {/* 스크린리더 접근성용 텍스트 */}
              <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                {t.loading}
              </span>
            </div>
          );

        case Status.FAILURE:
          return (
            <div role="alert" style={{ padding: "1rem", textAlign: "center" }}>
              {errorMsg || t.errorFallback}
            </div>
          );

        case Status.SUCCESS:
          if (!articles || articles.length === 0) {
            return <div style={{ padding: "1rem", textAlign: "center" }}>{t.empty}</div>;
          }
          return (
            <S.ArticleBox>
              {articles.map((a) => (
                <ArticleCard
                  key={a.id}
                  article={a}
                  onClick={(id) => navigate(buildRoute.articleDetail(id))}
                />
              ))}
            </S.ArticleBox>
          );
      }
    },
    [articles, errorMsg, navigate, t.loading, t.errorFallback, t.empty]
  );

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

      <S.Contents>{render(status)}</S.Contents>

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
