import * as S from "./Mapstyled";
import { useEffect, useRef } from "react";

import testmarker from "@/assets/icons/test_marker.svg";
import { Category, Place } from "../_types/Marker.type";

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

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    mapRef.current = new window.google.maps.Map(containerRef.current, {
      center: { lat: 37.570115, lng: 126.999706 },
      zoom: 20,
      disableDefaultUI: true,
    });
    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const onMapClick = () => {
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
