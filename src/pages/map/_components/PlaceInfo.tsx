import { useState, useRef, useEffect } from "react";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import testimage from "@/assets/images/testImage.png";
import * as S from "./Mapstyled";

const DEFAULT_HOLD = 50;
const DEFAULT_HEIGHT = 230;

interface PlaceInfoProps {
  name: string;
  address: string;
  type: boolean;
  id?: number;
}

const PlaceInfo = ({ name, address, type, id }: PlaceInfoProps) => {
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialY = useRef(0);

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

    // 위로 드래그
    if (deltaY > 0) {
      if (deltaY <= DEFAULT_HOLD) {
        setHeight(DEFAULT_HEIGHT + deltaY);
      } else {
        setAnimate(true);
        setHeight(window.innerHeight);
      }
    }
    // 아래로 드래그
    else {
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

  return (
    <S.PlaceInfoWrapper
      ref={containerRef}
      style={{
        height: `${height}px`,
        borderRadius: height >= window.innerHeight ? "0" : "50px 50px 0 0",
      }}
      $expanded={!type}
      animate={animate}
      onMouseDown={(e) => onMouseDown(e.nativeEvent)}
      onTouchStart={(e) => onTouchStart(e.nativeEvent)}
    >
      <S.Header
        style={{
          display: height >= window.innerHeight ? "flex " : "none",
        }}
      >
        <button>
          <img src={IMAGE_CONSTANTS.ATMPinSelect} alt="돌아가기" />
        </button>
      </S.Header>
      <S.SwipeButton
        style={{
          display: height == window.innerHeight ? "none" : "flex",
        }}
      />
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
      {type && (
        <S.AdditionalInfo>
          <img src={testimage} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum
            similique quasi quam aperiam. Eum non quia magni. Debitis, eius iure
            perferendis libero distinctio animi earum aut. Eum cupiditate
            perferendis ipsa.변경벼녀겨여여
          </p>
        </S.AdditionalInfo>
      )}
    </S.PlaceInfoWrapper>
  );
};

export default PlaceInfo;
