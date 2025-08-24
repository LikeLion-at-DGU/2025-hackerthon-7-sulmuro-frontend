import { useState, useRef, useEffect, SetStateAction } from "react";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import testimage from "@/assets/images/testImage.png";
import * as S from "./Mapstyled";
import { Place } from "../_types/Marker.type";
import { Api } from "@/api/Api";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { PlaceModalInfo, PlaceModalWithGoogle } from "../languages/Translate";
import { addPlace, hasPlace, removePlace } from "@/utils/SavedBookMark";

const DEFAULT_HOLD = 50;
const DEFAULT_HEIGHT = 230;

interface PlaceInfoProps {
  place: Place;
  type: boolean;
  setMapFocusPlace: React.Dispatch<SetStateAction<Place | null>>;
}

const PlaceInfo = ({ place, type, setMapFocusPlace }: PlaceInfoProps) => {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isBookMark, setIsBookMark] = useState(false);
  const [placeData, setPlaceData] = useState<string>(
    "현재 장소에 대한 정보가 없습니다."
  );
  const [placeImg, setPlaceImg] = useState<Array<{ url: string }> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialY = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const { language } = useLanguage();

  const fetchData = async () => {
    try {
      const response = await Api.get(`/api/v1/places/${place.id}/images`);
      const response2 = await Api.get(`/api/v1/places/${place.id}`);
      setPlaceData(response2.data.data.content);
      setPlaceImg(response.data.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    if (place?.id != null) {
      setIsBookMark(hasPlace(place.id));
    }
  }, [place]);
  useEffect(() => {
    console.log("imgs updated:", placeImg);
  }, [placeImg]);

  const onMouseDown = (e: MouseEvent) => {
    if (!type) return;
    setDragging(true);
    setAnimate(false);
    initialY.current = e.clientY;
    e.preventDefault();
  };

  const onTouchStart = (e: TouchEvent) => {
    if (!type) return;
    setDragging(true);
    setAnimate(false);
    initialY.current = e.touches[0].clientY;
    e.preventDefault();
  };

  const handleMove = (currentY: number) => {
    if (!type || !dragging) return;

    const deltaY = initialY.current - currentY;

    if (deltaY > 0) {
      if (deltaY <= DEFAULT_HOLD) {
        setHeight(DEFAULT_HEIGHT + deltaY);
      } else {
        setAnimate(true);
        setHeight(window.innerHeight);
      }
    } else {
      const downDelta = -deltaY;
      if (downDelta <= DEFAULT_HOLD) {
        setHeight(DEFAULT_HEIGHT - downDelta + (height - DEFAULT_HEIGHT));
      } else {
        setAnimate(true);
        setHeight(DEFAULT_HEIGHT);
      }
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    handleMove(e.clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  const endDrag = () => {
    setDragging(false);
  };

  const handleDragBack = () => {
    setHeight(230);
  };

  const findPlace = () => {
    setMapFocusPlace(place);
    setAnimate(true);
    setHeight(230);
  };
  const handleBookMarkExplicit = () => {
    if (place?.id == null) return;
    setIsBookMark((prev) => {
      if (prev) removePlace(place.id!);
      else addPlace(place.id!);
      return !prev;
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const current = containerRef.current;

    current.addEventListener("mousemove", onMouseMove);
    current.addEventListener("mouseup", endDrag);
    current.addEventListener("touchmove", onTouchMove);
    current.addEventListener("touchend", endDrag);

    return () => {
      current.removeEventListener("mousemove", onMouseMove);
      current.removeEventListener("mouseup", endDrag);
      current.removeEventListener("touchmove", onTouchMove);
      current.removeEventListener("touchend", endDrag);
    };
  }, [dragging]);

  const onCarouselPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsCarouselDragging(true);
    carouselRef.current.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    scrollStartLeft.current = carouselRef.current.scrollLeft;

    e.stopPropagation();
    (e.nativeEvent as PointerEvent).stopPropagation?.();
    e.preventDefault();
  };

  const onCarouselPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCarouselDragging || !carouselRef.current) return;
    const dx = e.clientX - dragStartX.current;
    carouselRef.current.scrollLeft = scrollStartLeft.current - dx;

    e.stopPropagation();
    (e.nativeEvent as PointerEvent).stopPropagation?.();
  };

  const onCarouselPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsCarouselDragging(false);
    try {
      carouselRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
    e.stopPropagation();
    (e.nativeEvent as PointerEvent).stopPropagation?.();
  };

  return (
    <S.PlaceInfoWrapper
      ref={containerRef}
      style={{
        height: `${height}px`,
        borderRadius: height >= window.innerHeight ? "0" : "50px 50px 0 0",
      }}
      $expanded={!type}
      animate={animate}
    >
      <S.SwipeButton
        style={{
          display: height == window.innerHeight ? "none" : "flex",
        }}
      />
      <S.Header
        style={{
          display: "flex",
          opacity: height >= window.innerHeight ? "1" : "0",
        }}
        onMouseDown={(e) => onMouseDown(e.nativeEvent)}
        onTouchStart={(e) => onTouchStart(e.nativeEvent)}
      >
        <button onClick={handleDragBack}>
          <img src={IMAGE_CONSTANTS.BackIcon2} alt="돌아가기" />
        </button>
      </S.Header>

      <S.InfoContainer
        onMouseDown={(e) => onMouseDown(e.nativeEvent)}
        onTouchStart={(e) => onTouchStart(e.nativeEvent)}
      >
        <p className="title">{place.name}</p>
        <img
          src={
            isBookMark
              ? IMAGE_CONSTANTS.BookMarkSelect
              : IMAGE_CONSTANTS.BookMark
          }
          alt="저장하기"
          onClick={handleBookMarkExplicit}
        />
      </S.InfoContainer>
      <p className="address">{place.address}</p>
      {!type && (
        <S.ExtendsContaiener style={{ marginTop: "8px" }}>
          <p>{PlaceModalInfo[language]}</p>
          <div>
            <img src={IMAGE_CONSTANTS.GoogleMapicon} alt="" />
            <button
              onClick={() => {
                const query = encodeURIComponent(
                  `${place.name} ${place.address}`
                );
                const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
                window.open(url, "_blank");
              }}
            >
              {PlaceModalWithGoogle[language]}
            </button>
          </div>
        </S.ExtendsContaiener>
      )}
      {type && (
        <S.AdditionalInfo>
          <S.AnotherContainer>
            <S.ImageCarousel
              ref={carouselRef}
              $dragging={isCarouselDragging}
              onPointerDown={onCarouselPointerDown}
              onPointerMove={onCarouselPointerMove}
              onPointerUp={onCarouselPointerUp}
              onPointerLeave={onCarouselPointerUp}
            >
              {(placeImg && placeImg.length > 0
                ? placeImg
                : [{ url: testimage }]
              ).map((src, idx) => (
                <S.ImageSlide key={idx}>
                  <img src={src.url} alt={`${place.name} 이미지 ${idx + 1}`} />
                </S.ImageSlide>
              ))}
            </S.ImageCarousel>
            <p>{placeData}</p>
          </S.AnotherContainer>
          <S.FindForMapButton onClick={findPlace}>
            <p>지도에서 찾기</p>
            <img src={IMAGE_CONSTANTS.SendArrow} alt="지도로 이동" />
          </S.FindForMapButton>
        </S.AdditionalInfo>
      )}
    </S.PlaceInfoWrapper>
  );
};

export default PlaceInfo;
