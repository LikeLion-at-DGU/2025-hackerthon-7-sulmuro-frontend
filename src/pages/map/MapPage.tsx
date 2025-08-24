import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMapView from "./_components/GoogleMapView";
import ChooseCategory from "./_components/ChooseCategory";
import SelectLanguage from "./_components/SelectLagnuage";
import PlaceInfo from "./_components/PlaceInfo";

import { useEffect, useState } from "react";
import { Category, Place } from "./_types/Marker.type";
import { usePointhooks } from "./_hooks/usePointhooks";
import ChooseMarket from "./_components/ChooseMarket";
import MarketModal from "./_components/MarketModal";
import MapControll from "./_components/MapControll";

import Loading from "@/pages/splash/SplashPage";
const MapPage = () => {
  const [isPlaceInfo, setIsPlaceInfo] = useState<boolean>(false);
  const [selectPlace, setSelectPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [mapFocusPlace, setMapFocusPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "540px",
              height: "100%",
              zIndex: 20,
            }}
          >
            <Loading />
          </div>
        );
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
            isfollowing={isFollowing}
            setIsFollowing={setIsFollowing}
          />
          <SelectLanguage />
          <MapControll
            setMapFocusPlace={setMapFocusPlace}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
          />
          {isModalOpen && (
            <MarketModal
              setIsModalOpen={setIsModalOpen}
              setMapFocusPlace={setMapFocusPlace}
            />
          )}
          {isPlaceInfo && (
            <>
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
