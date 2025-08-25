import styled from "styled-components";
import { ROUTE_PATHS } from "@/constants/routeConstants";

//컴포넌트}
import DetailHeader from "./_components/DetailHeader";
import SavePlaceCard from "./_components/SavedPlaceCard";

import { useLanguage } from "@/components/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { PlaceWithImage } from "../map/_types/Marker.type";
import { Api } from "@/api/Api";
import { getPlaceBookmarks } from "@/utils/SavedBookMark";
import {
  DetailPlaceTitle,
  SavedPagePlaceEmptyCase,
} from "../map/languages/Translate";
import Loading from "@/components/loading/Loading";
const DetailPlacePage = () => {
  const [markedPlaces, setMarkedPlaces] = useState<PlaceWithImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await Api.post("/api/v1/places/search", {
        ids: getPlaceBookmarks(),
      });
      setMarkedPlaces(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Wrapper2>
        <Loading />
      </Wrapper2>
    );
  }
  return (
    <Wrapper>
      <DetailHeader text={DetailPlaceTitle[language]} />
      {markedPlaces.length === 0 ? (
        <Wrapper2>{SavedPagePlaceEmptyCase[language]}</Wrapper2>
      ) : (
        <SavedPlaceBox>
          {markedPlaces.map((place) => (
            <SavePlaceCard
              key={place.id}
              id={place.id}
              name={place.name}
              path={`${ROUTE_PATHS.MAP}?place=${place.id}`}
              thumbnailUrl={place.image[0]}
              address={place.address}
            />
          ))}
        </SavedPlaceBox>
      )}
    </Wrapper>
  );
};

export default DetailPlacePage;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
  box-sizing: border-box;
  flex-grow: 1;
`;
export const SavedPlaceBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 16px;
`;

export const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: ${({ theme }) => theme.colors.N30};
  ${({ theme }) => theme.fonts.Regular16};
`;
