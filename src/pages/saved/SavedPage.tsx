import * as S from "./SavedPage.styled";

import { ROUTE_PATHS } from "@/constants/routeConstants";

//컴포넌트
import MainHeader from "./_components/MainHeader";
import SavePlaceCard from "./_components/SavedPlaceCard";
import SavedArticleCard from "./_components/SavedArticleCard";

import { useEffect, useState } from "react";

import { useLanguage } from "@/components/contexts/LanguageContext";
import {
  SavedPageArticleEmptyCase,
  savedPageArticleTitle,
  SavedPagePlaceEmptyCase,
  SavedPagePlaceTitle,
} from "../map/languages/Translate";
import { ArticleType } from "./_types/ArticleType";
import { PlaceWithImage } from "../map/_types/Marker.type";
import { Api } from "@/api/Api";
import { getArticleBookmarks, getPlaceBookmarks } from "@/utils/SavedBookMark";
const SavePage = () => {
  const [markedPlaces, setMarkedPlaces] = useState<PlaceWithImage[]>([]);
  const [markedArticles, setMarkedArticles] = useState<ArticleType[]>([]);
  const { language } = useLanguage();
  const fetchData = async () => {
    try {
      const response = await Api.post("/api/v1/places/search", {
        ids: getPlaceBookmarks(),
      });
      const response2 = await Api.post("/api/v1/articles/search", {
        ids: getArticleBookmarks(),
      });
      setMarkedPlaces(response.data.data);
      setMarkedArticles(response2.data.data);
      console.log("places:", response.data.data);
      console.log("articles:", response2.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Wrapper>
      <S.Header>Marked</S.Header>
      <S.Contents>
        <MainHeader
          text={SavedPagePlaceTitle[language]}
          path={ROUTE_PATHS.SAVED_PLACE}
        />
        <S.SavedPlaceBox isEmpty={markedPlaces.length === 0}>
          {markedPlaces.length === 0 ? (
            <S.EmptyBox>{SavedPagePlaceEmptyCase[language]}</S.EmptyBox>
          ) : (
            markedPlaces
              .slice(0, 2)
              .map((place) => (
                <SavePlaceCard
                  key={place.id}
                  id={place.id}
                  name={place.name}
                  path={`${ROUTE_PATHS.MAP}?place=${place.id}`}
                  thumbnailUrl={place.image[0]}
                  address={place.location}
                />
              ))
          )}
        </S.SavedPlaceBox>
        <MainHeader
          text={savedPageArticleTitle[language]}
          path={ROUTE_PATHS.SAVED_ARTICLE}
        />
        <S.SavedArticleBox>
          {markedArticles.length === 0 ? (
            <S.EmptyBox>{SavedPageArticleEmptyCase[language]}</S.EmptyBox>
          ) : (
            markedArticles
              .slice(0, 1)
              .map((article) => (
                <SavedArticleCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  images={article.imageUrls}
                  location={article.location}
                />
              ))
          )}
        </S.SavedArticleBox>
      </S.Contents>
    </S.Wrapper>
  );
};

export default SavePage;
