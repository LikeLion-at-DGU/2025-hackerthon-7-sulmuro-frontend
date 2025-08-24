import * as S from "./SavedPage.styled";

import { ROUTE_PATHS } from "@/constants/routeConstants";

//컴포넌트
import MainHeader from "./_components/MainHeader";
import SavePlaceCard from "./_components/SavedPlaceCard";
import SavedArticleCard from "./_components/SavedArticleCard";

//더미데이터 연결
import { savedPlaces, savedArticles } from "./dummy/dummyData";
import { useState } from "react";
import { Article } from "../article/_apis/getArticle";
const SavePage = () => {
  const [_markedPlaces, _setMarkedPlaces] = useState<Article[]>();
  // const sfetchData = () => {};
  return (
    <S.Wrapper>
      <S.Header>Saved</S.Header>
      <S.Contents>
        <MainHeader text="장소" path={ROUTE_PATHS.SAVED_PLACE} />
        <S.SavedPlaceBox>
          {savedPlaces.slice(0, 2).map((place) => (
            <SavePlaceCard
              key={place.id}
              id={place.id}
              name={place.name}
              path={`${ROUTE_PATHS.MAP}?place=${place.id}`}
              thumbnailUrl={place.thumbnailUrl}
              address={place.address}
            />
          ))}
        </S.SavedPlaceBox>
        <MainHeader text="아티클" path={ROUTE_PATHS.SAVED_ARTICLE} />
        <S.SavedArticleBox>
          {savedArticles.slice(0, 1).map((article) => (
            <SavedArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              images={article.images}
              location={article.location}
            />
          ))}
        </S.SavedArticleBox>
      </S.Contents>
    </S.Wrapper>
  );
};

export default SavePage;
