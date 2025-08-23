import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapView from "./_components/GoogleMapView";
import ChooseCategory from "./_components/ChooseCategory";
import SelectLanguage from "./_components/SelectLagnuage";
import PlaceInfo from "./_components/PlaceInfo";
import { Button } from "./_components/Mapstyled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

import { useEffect, useState } from "react";
import { Category, Place } from "./_types/Marker.type";
import { usePointhooks } from "./_hooks/usePointhooks";
import ChooseMarket from "./_components/ChooseMarket";
import MarketModal from "./_components/MarketModal";
const MapPage = () => {
  const [isPlaceInfo, setIsPlaceInfo] = useState<boolean>(false);
  const [selectPlace, setSelectPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [mapFocusPlace, setMapFocusPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <>로딩중...</>;
      case Status.FAILURE:
        return <>에러 발생</>;
      case Status.SUCCESS:
        return <>로드 성공</>;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usePointhooks();
        setPlaces(data.data);
      } catch (error) {
        console.log("err", error);
      }
    };
    fetchData();
    console.log(places);
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        <Wrapper
          apiKey={import.meta.env.VITE_GOOGLEMAP_API_KEY}
          libraries={["places"]}
          render={render}
        >
          <ChooseMarket setIsModalOpen={setIsModalOpen} />
          <ChooseCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <GoogleMapView
            places={places}
            selectedCategory={selectedCategory}
            setSelectedPlace={setSelectPlace}
            setIsRegister={setIsRegister}
            setIsPlaceInfo={setIsPlaceInfo}
            mapFocusPlace={mapFocusPlace}
            setMapFocusPlace={setMapFocusPlace}
          />
          <SelectLanguage />
          {isModalOpen && (
            <MarketModal
              setIsModalOpen={setIsModalOpen}
              setMapFocusPlace={setMapFocusPlace}
            />
          )}
          {isPlaceInfo && (
            <>
              {!selectPlace && (
                <>
                  <Button className="left">
                    <img src={IMAGE_CONSTANTS.information} alt="상세 정보" />
                  </Button>
                  <Button className="right">
                    <img
                      src={IMAGE_CONSTANTS.CurrentLocation}
                      alt="현재 위치 추적"
                    />
                  </Button>
                </>
              )}
              {selectPlace && (
                <PlaceInfo
                  type={isRegister}
                  place={selectPlace}
                  setMapFocusPlace={setMapFocusPlace}
                />
              )}
            </>
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default MapPage;
