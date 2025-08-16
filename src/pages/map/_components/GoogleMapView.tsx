import * as S from "./Mapstyled";
import { useEffect, useRef } from "react";

import { places, Category, Place } from "../dummyData/dummyData";

import testmarker from "@/assets/icons/test_marker.svg";

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

const GoogleMapView = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

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
    if (!map) {
      console.log("실행 ㅌ");
      return;
    }

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
        if (!infoWindowRef.current) return;
        infoWindowRef.current.setContent(`
          <div style="line-height:1.4">
            <b>${place.name}</b><br/>
            <div>${place.address}</div>
            <div>카테고리: ${place.category}</div>
            <div style="font-size:12px;color:#666">
              ${place.lat.toFixed(6)}, ${place.lng.toFixed(6)}
            </div>
          </div>
        `);
        infoWindowRef.current.open({ map, anchor: marker });
      });

      markersRef.current.push(marker);
      // bounds.extend(marker.getPosition()!);
    });
  }, []);
  return <S.MapContainer ref={containerRef} />;
};

export default GoogleMapView;
