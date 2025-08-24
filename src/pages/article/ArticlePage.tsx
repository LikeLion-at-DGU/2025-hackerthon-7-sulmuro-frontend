// src/pages/article/ArticlePage.tsx
import * as S from "./ArticlePage.styled";
import { useArticle } from "./_hooks/useArticle";
import { Place } from "./_apis/getArticle";
import ArticleCard from "./_components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { buildRoute } from "@/constants/routeConstants";

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

  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Header>
        <div>Article</div>
        <S.PlaceDropdown>
          {/* 큰 필터: 전체 / 광장시장 / 양재시장 */}
          <select
            value={place}
            onChange={(e) => selectPlace(e.target.value as Place)}
          >
            <option value="전체">전체</option>
            <option value="광장시장">광장시장</option>
          </select>
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
    </S.Wrapper>
  );
};

export default ArticlePage;
