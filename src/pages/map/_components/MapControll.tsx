import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import React, { SetStateAction, useEffect, useRef } from "react";
import styled from "styled-components";
import { Place } from "../_types/Marker.type";

const kwangjang: Place = {
  id: 0,
  name: "광장시장",
  address: "광장시장",
  lat: 37.570115,
  lng: 126.999706,
  category: "All",
  zoom: 17,
};

interface MapControllProps {
  setMapFocusPlace: React.Dispatch<SetStateAction<Place | null>>;
  isFollowing: boolean;
  setIsFollowing: React.Dispatch<SetStateAction<boolean>>;
}

const MapControll = ({
  setMapFocusPlace,
  isFollowing,
  setIsFollowing,
}: MapControllProps) => {
  const watchIdRef = useRef<number | null>(null);
  const lastRef = useRef<{ lat: number; lng: number } | null>(null);

  const distM = (
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
  ) => {
    const R = 6371000;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const s1 = Math.sin(dLat / 2),
      s2 = Math.sin(dLng / 2);
    const c1 = Math.cos((a.lat * Math.PI) / 180),
      c2 = Math.cos((b.lat * Math.PI) / 180);
    return 2 * R * Math.asin(Math.sqrt(s1 * s1 + c1 * c2 * s2 * s2));
  };

  const startFollow = () => {
    if (!("geolocation" in navigator))
      return alert("이 브라우저는 위치를 지원하지 않습니다.");
    if (watchIdRef.current != null) return;

    // 처음에 이거로 포커스
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setMapFocusPlace({
          name: "내 위치",
          address: "",
          lat: latitude,
          lng: longitude,
          category: "All",
          accuracy,
          follow: true,
          zoom: accuracy > 80 ? 17 : 19,
        });
        lastRef.current = { lat: latitude, lng: longitude };
      },
      (err) => {
        if (err.code === 1) console.error("위치 권한 에러", err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );

    // 다음번 포커스시
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const cur = { lat: latitude, lng: longitude };
        const prev = lastRef.current;

        if (!prev || distM(prev, cur) > Math.max(10, (accuracy ?? 0) / 2)) {
          setMapFocusPlace({
            name: "내 위치",
            address: "",
            lat: latitude,
            lng: longitude,
            category: "All",
            accuracy,
            follow: true,
          });
          lastRef.current = cur;
        }
      },
      (err) => {
        if (err.code === 1) console.error(err);
        stopFollow();
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
    );

    setIsFollowing(true);
  };

  const stopFollow = () => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsFollowing(false);
  };

  useEffect(() => {
    if (!isFollowing && watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      // 여기서 setIsFollowing(false) 다시 호출할 필요 없음 (이미 false)
    }
  }, [isFollowing]);
  useEffect(() => {
    return () => stopFollow(); // 컴포넌트 unmount 시 정리
  }, []);

  const moveFocus = () => {
    setMapFocusPlace(kwangjang);
  };
  return (
    <ControllContainer>
      <Button onClick={moveFocus}>
        <img src={IMAGE_CONSTANTS.goMarket} alt="근처 시장으로 이동" />
      </Button>
      <Button onClick={isFollowing ? stopFollow : startFollow}>
        <img
          src={
            isFollowing
              ? IMAGE_CONSTANTS.myLocationSelect
              : IMAGE_CONSTANTS.myLocation
          }
          alt="내 위치로 이동"
        />
      </Button>
    </ControllContainer>
  );
};
export default MapControll;

const ControllContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  bottom: 50px;
  right: 20px;
  z-index: 30;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: 40px;
  height: 40px;
`;
