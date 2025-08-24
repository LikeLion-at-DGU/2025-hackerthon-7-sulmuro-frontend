// src/pages/article/ArticlePage.tsx
import * as S from "./ArticlePage.styled";
import { useArticle } from "./_hooks/useArticle";
import { Place } from "./_apis/getArticle";
import ArticleCard from "./_components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { buildRoute } from "@/constants/routeConstants";
import { useState, useCallback } from "react";
import PlaceSheet from "./_components/PlaceSheet";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

const ArticlePage = () => {
  const {
    place,
    category,
    articles,
    loading,
    errorMsg,
    selectPlace,
    selectCategory,
  } = useArticle();

  const [isPlaceSheetOpen, setPlaceSheetOpen] = useState(false);
  const openPlaceSheet = useCallback(() => setPlaceSheetOpen(true), []);
  const closePlaceSheet = useCallback(() => setPlaceSheetOpen(false), []);

  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Header>
        <div>Article</div>

        {/* ▼ 기존 <select> 제거 → 버튼 + 바텀시트 */}
        <S.PlaceDropdown>
          <S.PlaceTrigger
            type="button"
            onClick={openPlaceSheet}
            aria-haspopup="dialog"
            aria-expanded={isPlaceSheetOpen}
          >
            {place} 
            <img src={IMAGE_CONSTANTS.DropDown} alt = "▽" />
          </S.PlaceTrigger>
        </S.PlaceDropdown>
      </S.Header>

      <S.FilterRow>
        {(["음식", "쇼핑", "역사"] as const).map((c) => (
          <S.CategoryButton
            key={c}
            selected={category === c}
            onClick={() => selectCategory(c)}
          >
            {c}
          </S.CategoryButton>
        ))}
      </S.FilterRow>

      <S.Contents>
        {loading && <div>불러오는 중...</div>}
        {!loading && errorMsg && <div>{errorMsg}</div>}
        {!loading && !errorMsg && (
          <S.ArticleBox>
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                article={a}
                onClick={(id) => navigate(buildRoute.articleDetail(id))}
              />
            ))}
          </S.ArticleBox>
        )}
      </S.Contents>

      {isPlaceSheetOpen && (
        <PlaceSheet
          setIsOpen={setPlaceSheetOpen}      // ✅ 일관된 setter
          current={place}
          onSelect={(p: Place) => {
            selectPlace(p);
            closePlaceSheet();
          }}
          // options={["전체","광장시장"] as const} // 필요시 커스터마이즈
        />
      )}
    </S.Wrapper>
  );
};

export default ArticlePage;
