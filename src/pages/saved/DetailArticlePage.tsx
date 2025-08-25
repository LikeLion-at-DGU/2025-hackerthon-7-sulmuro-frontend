import styled from "styled-components";
// import { ROUTE_PATHS } from "@/constants/routeConstants";

//컴포넌트}
import DetailHeader from "./_components/DetailHeader";
import SavedArticleCard from "./_components/SavedArticleCard";

import { getArticleBookmarks } from "@/utils/SavedBookMark";
import { Api } from "@/api/Api";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { ArticleType } from "./_types/ArticleType";
import {
  DetailArticleTitle,
  SavedPageArticleEmptyCase,
} from "../map/languages/Translate";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routeConstants";
import Loading from "@/components/loading/Loading";

const DetailArticlePage = () => {
  const [markedArticles, setMarkedArticles] = useState<ArticleType[]>([]);
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response2 = await Api.post("/api/v1/articles/search", {
        ids: getArticleBookmarks(),
      });
      setMarkedArticles(response2.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // 2. API 요청이 성공하든 실패하든 끝나면 로딩 상태를 false로 변경
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Wrapper>
      <DetailHeader text={DetailArticleTitle[language]} />
      {isLoading ? (
        <Wrapper2>
          <Loading />
        </Wrapper2>
      ) : markedArticles.length === 0 ? (
        <Wrapper2>{SavedPageArticleEmptyCase[language]}</Wrapper2>
      ) : (
        <SavedArticleBox>
          {markedArticles.map((article) => (
            <Link to={`${ROUTE_PATHS.ARTICLE}/${article.id}`} key={article.id}>
              <SavedArticleCard
                id={article.id}
                title={article.title}
                images={article.imageUrls}
                location={article.location}
              />
            </Link>
          ))}
        </SavedArticleBox>
      )}
    </Wrapper>
  );
};

export default DetailArticlePage;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
  box-sizing: border-box;
  flex-grow: 1;
`;

export const SavedArticleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  gap: 32px;
`;

export const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.N30};
  ${({ theme }) => theme.fonts.Regular16};
`;
