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
import { useLanguage } from "@/components/contexts/LanguageContext";
// import { useResetGoogleMaps } from "./_hooks/useResetGoogleMap";

import Loading from "@/components/loading/Loading";
import { useSearchParams } from "react-router-dom";
const MapPage = () => {
  const [isPlaceInfo, setIsPlaceInfo] = useState<boolean>(false);
  const [selectPlace, setSelectPlace] = useState<Place | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [mapFocusPlace, setMapFocusPlace] = useState<Place | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMarketMode, setIsMarketMode] = useState(false);
  const [searchParams] = useSearchParams();
  const focusPlaceId = searchParams.get("place");
  const { language } = useLanguage();

  // const LANG = {
  //   ko: { language: "ko", region: "KR" },
  //   en: { language: "en", region: "US" },
  //   zh: { language: "zh-CN", region: "CN" },
  // } as const;

  // const { language: gLang, region: gRegion } = LANG[language];
  // const scriptId = `gmaps-script-${gLang}-${gRegion}`;
  // const wrapperKey = `gmaps-wrapper-${gLang}-${gRegion}`;
  // const gmReady = useResetGoogleMaps(scriptId);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "540px",
              height: "90vh",
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
    // places 로딩 후에만 처리
    if (!focusPlaceId || !places.length) return;

    const p = places.find((pl) => String(pl.id) === String(focusPlaceId));
    if (!p) return;
    setSelectPlace(p);
    setIsRegister(!!p.id);
    setIsPlaceInfo(true);
    setMapFocusPlace({ ...p, zoom: 19 });

    const url = new URL(window.location.href);
    url.searchParams.delete("place");
    window.history.replaceState({}, "", url.toString());
  }, [focusPlaceId, places]);

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
  }, [language]);
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
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            setIsMarketMode={setIsMarketMode}
          />
          <SelectLanguage />
          <MapControll
            setMapFocusPlace={setMapFocusPlace}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            isMarketMode={isMarketMode}
            setIsMarketMode={setIsMarketMode}
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
