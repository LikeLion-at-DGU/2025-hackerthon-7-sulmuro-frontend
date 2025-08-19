import { useState, useRef, useEffect } from "react";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Mapstyled";

interface PlaceInfoProps {
  name: string;
  address: string;
  type: boolean;
}

const PlaceInfo = ({ name, address, type }: PlaceInfoProps) => {
  const [height, setHeight] = useState(200);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialY = useRef(0);

  const onMouseDown = (e: MouseEvent) => {
    setDragging(true);
    initialY.current = e.clientY;
    e.preventDefault();
  };

  const onTouchStart = (e: TouchEvent) => {
    setDragging(true);
    initialY.current = e.touches[0].clientY;
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      const deltaY = initialY.current - e.clientY;
      const newHeight = Math.max(
        200,
        Math.min(height + deltaY, window.innerHeight * 0.9)
      );
      setHeight(newHeight);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (dragging) {
      const deltaY = initialY.current - e.touches[0].clientY;
      const newHeight = Math.max(
        200,
        Math.min(height + deltaY, window.innerHeight * 0.9)
      );
      setHeight(newHeight);
    }
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  const onTouchEnd = () => {
    setDragging(false);
  };

  useEffect(() => {
    // 마우스/터치 이벤트 리스너 등록
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", onMouseMove);
      containerRef.current.addEventListener("mouseup", onMouseUp);
      containerRef.current.addEventListener("touchmove", onTouchMove);
      containerRef.current.addEventListener("touchend", onTouchEnd);
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", onMouseMove);
        containerRef.current.removeEventListener("mouseup", onMouseUp);
        containerRef.current.removeEventListener("touchmove", onTouchMove);
        containerRef.current.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [dragging]);

  return (
    <S.PlaceInfoWrapper
      ref={containerRef}
      style={{ height: `${height}px` }}
      $expanded={!type}
      onMouseDown={(e) => onMouseDown(e.nativeEvent)}
      onTouchStart={(e) => onTouchStart(e.nativeEvent)}
    >
      <S.SwipeButton />
      <S.InfoContainer>
        <p className="title">{name}</p>
        <img src={IMAGE_CONSTANTS.BookMark} alt="저장하기" />
      </S.InfoContainer>
      <p className="address">{address}</p>
      {!type && (
        <S.ExtendsContaiener style={{ marginTop: "8px" }}>
          <p>현재 mark!t에서 제공하지 않는 장소에요.</p>
          <div>
            <img src={IMAGE_CONSTANTS.GoogleMapicon} alt="" />
            <button>구글맵에서 확인하기</button>
          </div>
        </S.ExtendsContaiener>
      )}
    </S.PlaceInfoWrapper>
  );
};

export default PlaceInfo;
