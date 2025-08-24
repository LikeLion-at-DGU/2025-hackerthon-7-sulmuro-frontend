import * as S from "./Mapstyled";
import { useEffect, useRef, useState } from "react";
import testmark from "@/assets/icons/test_marker.svg";

import { Category, Place } from "../_types/Marker.type";
import { mapTypesToCategory } from "../_hooks/useMaphooks";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

const CATEGORY_ICONS: Partial<
  Record<Category, { selected: string; unselected: string }>
> = {
  Goods: {
    selected: IMAGE_CONSTANTS.GoodsPinSelect,
    unselected: IMAGE_CONSTANTS.GoodsPinUnSelect,
  },
  Food: {
    selected: IMAGE_CONSTANTS.FoodPinSelect,
    unselected: IMAGE_CONSTANTS.FoodPinUnSelect,
  },
  Clothes: {
    selected: IMAGE_CONSTANTS.ClothesPinSelect,
    unselected: IMAGE_CONSTANTS.ClothesPinUnSelect,
  },
  ATM: {
    selected: IMAGE_CONSTANTS.ATMPinSelect,
    unselected: IMAGE_CONSTANTS.ATMPinUnSelect,
  },
  Cafe: {
    selected: IMAGE_CONSTANTS.CafePinSelect,
    unselected: IMAGE_CONSTANTS.CafePinUnSelect,
  },
};

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapViewProps {
  places: Place[];
  selectedCategory: Category;
  mapFocusPlace: Place | null;
  setSelectedPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  setIsPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setMapFocusPlace: React.Dispatch<React.SetStateAction<Place | null>>;
}

const GoogleMapView = ({
  places,
  setSelectedPlace,
  setIsPlaceInfo,
  selectedCategory,
  setIsRegister,
  mapFocusPlace,
  setMapFocusPlace,
}: GoogleMapViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapListenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const markersRef = useRef<google.maps.Marker[]>([]);
  const myLocationMarkerRef = useRef<google.maps.Marker | null>(null);
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.Marker | null>(null);

  const filterPlacesByCategory = (category: Category) => {
    if (category === "All") {
      return places;
    }
    return places.filter((place) => place.category === category);
  };

  // 초기 마커 찍는 부분
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = new window.google.maps.Map(containerRef.current, {
      center: { lat: 37.570115, lng: 126.999706 },
      zoom: 20,
      disableDefaultUI: true,
    });
    infoWindowRef.current = new window.google.maps.InfoWindow();
    placesServiceRef.current = new window.google.maps.places.PlacesService(
      mapRef.current
    );
  }, [places, setIsPlaceInfo, setSelectedPlace]);

  // 카테고리 변경 시 새로 마커 찍기
  useEffect(() => {
    const map = mapRef.current;
    const service = placesServiceRef.current;

    if (!map) return;
    // 찍어 놓은 마커 삭제하고 필터된거로 적용
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
    const onMapClick = (e: google.maps.MapMouseEvent) => {
      if ((e as any).placeId) {
        (e as any).stop();

        const placeId = (e as any).placeId as string;

        // 주변 가게 정보 가져오는 부분.
        service?.getDetails(
          {
            placeId,
            fields: ["place_id", "name", "formatted_address", "geometry"],
          },
          (res, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              res
            ) {
              const selectedPlace: Place = {
                name: res.name ?? "",
                address: res.formatted_address ?? "",
                lat: res.geometry?.location?.lat() ?? 0,
                lng: res.geometry?.location?.lng() ?? 0,
                category: mapTypesToCategory(res.types),
              };

              setSelectedPlace(selectedPlace);
              setIsPlaceInfo(true);
              setIsRegister(false);
            } else {
              setIsPlaceInfo(false);
              setSelectedPlace(null);
              setIsRegister(false);
            }
          }
        );
      }
      setSelectedMarker(null);
      setIsPlaceInfo(false);
      setSelectedPlace(null);
    };

    const mapClickL = map.addListener("click", onMapClick);
    mapListenersRef.current.push(mapClickL);
    console.log("장소", places);
    const filteredPlaces = filterPlacesByCategory(selectedCategory);
    console.log(filteredPlaces);
    filteredPlaces.forEach((place: Place) => {
      const iconUrls = CATEGORY_ICONS[place.category];
      const isSelected =
        selectedMarker &&
        selectedMarker.getPosition()?.lat() === place.lat &&
        selectedMarker.getPosition()?.lng() === place.lng;
      const markerIcon = isSelected
        ? iconUrls?.selected
        : iconUrls?.unselected || testmark;

      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map,
        title: place.name,
        icon: markerIcon
          ? {
              url: markerIcon,
              scaledSize: new window.google.maps.Size(
                isSelected ? 42 : 28,
                isSelected ? 42 : 28
              ),
            }
          : undefined,
        label: {
          text: place.name, // 마커 이름 설정
          fontFamily: "pretendard",
          fontSize: "14px", // 글자 크기
          color: "#000", // 글자 색
          fontWeight: "600",
          className: "place-name-label",
        },
      });

      const style = document.createElement("style");
      style.innerHTML = `
  .place-name-label {
    transform: translateY(20px); 
    text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
  }
`;
      document.head.appendChild(style);

      marker.addListener("click", (e: google.maps.MapMouseEvent) => {
        e.domEvent?.stopPropagation?.(); // 전파 중단
        setSelectedPlace(place);
        setIsPlaceInfo(true);
        marker.setIcon({
          url: CATEGORY_ICONS[selectedCategory]?.selected || testmark,
          scaledSize: new window.google.maps.Size(42, 42), // 선택된 마커 크기
        });
        if (selectedMarker && selectedMarker !== marker) {
          selectedMarker.setIcon({
            url: CATEGORY_ICONS[selectedCategory]?.unselected || testmark,
            scaledSize: new window.google.maps.Size(28, 28), // 기본 마커 크기
          });
        }

        if (place.id) {
          setIsRegister(true);
        } else {
          setIsRegister(false);
        }
        setSelectedMarker(marker);
      });
      markersRef.current.push(marker);
    });
  }, [places, selectedCategory, selectedMarker, setIsRegister]);
  useEffect(() => {
    if (!mapRef.current || !mapFocusPlace) return;

    const moveMap = () => {
      const position = new window.google.maps.LatLng(
        mapFocusPlace.lat,
        mapFocusPlace.lng
      );
      mapRef.current!.panTo(position);
      const customZoom = (mapFocusPlace as any).zoom as number | undefined;
      const acc = (mapFocusPlace as any).accuracy as number | undefined;
      const accBasedZoom =
        acc != null
          ? acc > 150
            ? 16
            : acc > 80
            ? 17
            : acc > 30
            ? 18
            : 19
          : undefined;

      mapRef.current!.setZoom(customZoom ?? accBasedZoom ?? 20);
      if (mapFocusPlace.name === "내 위치") {
        if (!myLocationMarkerRef.current) {
          myLocationMarkerRef.current = new window.google.maps.Marker({
            map: mapRef.current,
            title: "내 위치",
            zIndex: 9999,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8, // 점 크기
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
            },
          });
        }
        myLocationMarkerRef.current.setPosition(position);
      }
    };

    // map이 아직 준비 안 된 경우 setTimeout으로 조금 기다림
    if (mapRef.current) {
      moveMap();
    } else {
      const timer = setTimeout(moveMap, 100);
      return () => clearTimeout(timer);
    }
    setMapFocusPlace(null);
  }, [mapFocusPlace]);
  return <S.MapContainer ref={containerRef} />;
};

export default GoogleMapView;
