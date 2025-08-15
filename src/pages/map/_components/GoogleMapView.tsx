import * as S from "./Mapstyled";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleMapView = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    new window.google.maps.Map(ref.current, {
      center: { lat: 37.570115, lng: 126.999706 },
      zoom: 20,
      disableDefaultUI: true,
    });
  }, []);
  return <S.MapContainer ref={ref} />;
};

export default GoogleMapView;
