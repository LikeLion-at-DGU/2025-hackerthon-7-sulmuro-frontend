import styled from "styled-components";
// import { ROUTE_PATHS } from "@/constants/routeConstants";

//컴포넌트}
import DetailHeader from "./_components/DetailHeader";
import SavedArticleCard from "./_components/SavedArticleCard";

//더미데이터 연결
import { savedArticles } from "./dummy/dummyData";

const DetailArticlePage = () => {
  return (
    <Wrapper>
      <DetailHeader text="아티클" />
      <SavedArticleBox>
        {savedArticles.map((article) => (
          <SavedArticleCard
            key={article.id}
            title={article.title}
            images={article.images}
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
