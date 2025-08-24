import styled from "styled-components";
import { ROUTE_PATHS } from "@/constants/routeConstants";

//컴포넌트}
import DetailHeader from "./_components/DetailHeader";
import SavePlaceCard from "./_components/SavedPlaceCard";

//더미데이터 연결
import { savedPlaces } from "./dummy/dummyData";
const DetailPlacePage = () => {
  return (
    <Wrapper>
      <DetailHeader text="장소" />
      <SavedPlaceBox>
        {savedPlaces.map((place) => (
          <SavePlaceCard
            key={place.id}
            id={place.id}
            name={place.name}
            path={ROUTE_PATHS.MAP} //추후 지도경로로 변경핑핑
            thumbnailUrl={place.thumbnailUrl}
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
