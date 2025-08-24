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
import { DetailArticleTitle } from "../map/languages/Translate";

const DetailArticlePage = () => {
  const [markedArticles, setMarkedArticles] = useState<ArticleType[]>([]);
  const { language } = useLanguage();
  const fetchData = async () => {
    try {
      const response2 = await Api.post("/api/v1/articles/search", {
        ids: getArticleBookmarks(),
      });
      setMarkedArticles(response2.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Wrapper>
      <DetailHeader text={DetailArticleTitle[language]} />
      <SavedArticleBox>
        {markedArticles.map((article) => (
          <SavedArticleCard
            key={article.id}
            id={article.id}
            title={article.title}
            images={article.imageUrls}
            location={article.location}
          />
        ))}
      </SavedArticleBox>
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
