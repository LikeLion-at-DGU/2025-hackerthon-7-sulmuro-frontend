import * as S from "./Mapstyled";
import { useEffect, useRef } from "react";

import testmarker from "@/assets/icons/test_marker.svg";
import { Category, Place } from "../_types/Marker.type";
import { mapTypesToCategory } from "../_hooks/useMaphooks";

const CATEGORY_ICONS: Partial<Record<Category, string>> = {
  Food: testmarker,
  Foods: testmarker,
  Clothes: testmarker,
  ATM: testmarker,
};

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapViewProps {
  places: Place[];
  setSelectedPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  setIsPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoogleMapView = ({
  places,
  setSelectedPlace,
  setIsPlaceInfo,
}: GoogleMapViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapListenersRef = useRef<google.maps.MapsEventListener[]>([]);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );

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

  useEffect(() => {
    const map = mapRef.current;
    const service = placesServiceRef.current;

    if (!map) return;

    const onMapClick = (e: google.maps.MapMouseEvent) => {
      if ((e as any).placeId) {
        (e as any).stop();

        const placeId = (e as any).placeId as string;

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
                // 네 Place 타입에 맞춰 매핑 (필요 시 타입 확장)
                name: res.name ?? "",
                address: res.formatted_address ?? "",
                lat: res.geometry?.location?.lat() ?? 0,
                lng: res.geometry?.location?.lng() ?? 0,
                category: mapTypesToCategory(res.types), // 아래 헬퍼 참고
                // placeId 같은 확장 필드 쓰고 싶으면 Place 타입에 optional로 추가
                // placeId: res.place_id,
              };

              setSelectedPlace(selectedPlace);
              setIsPlaceInfo(true);
            } else {
              // 실패하면 닫거나, 기존 로직으로 대체
              setIsPlaceInfo(false);
              setSelectedPlace(null);
            }
          }
        );
      }
      setIsPlaceInfo(false);
      setSelectedPlace(null);
    };

    const mapClickL = map.addListener("click", onMapClick);

    mapListenersRef.current.push(mapClickL);

    places.forEach((place: Place) => {
      const iconUrl = CATEGORY_ICONS[place.category];
      console.log("ddd");
      const marker = new window.google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map,
        title: place.name,
        icon: iconUrl
          ? {
              url: iconUrl,
              scaledSize: new window.google.maps.Size(28, 28),
            }
          : undefined,
      });

      marker.addListener("click", () => {
        setSelectedPlace(place);
        setIsPlaceInfo(true);
      });
    });
  }, []);
  return <S.MapContainer ref={containerRef} />;
};

export default GoogleMapView;
