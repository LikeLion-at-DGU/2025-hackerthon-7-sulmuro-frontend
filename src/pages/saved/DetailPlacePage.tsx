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
import { DetailPlaceTitle } from "../map/languages/Translate";
const DetailPlacePage = () => {
  const [markedPlaces, setMarkedPlaces] = useState<PlaceWithImage[]>([]);
  const { language } = useLanguage();
  const fetchData = async () => {
    try {
      const response = await Api.post("/api/v1/places/search", {
        ids: getPlaceBookmarks(),
      });
      setMarkedPlaces(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Wrapper>
      <DetailHeader text={DetailPlaceTitle[language]} />
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
