import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useRef, useEffect } from "react";
interface SavePlaceCardProps {
  title: string;

  images: string[];
  location: string;
}

const SavedArticleCard = ({
  title,

  images,
  location,
}: SavePlaceCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <Wrapper>
      <ImageScrollContainer ref={containerRef}>
        <BookmarkIcon src={IMAGE_CONSTANTS.Bookmark} alt="북마크" />
        {images.map((imageUrl, index) => (
          <ArticleImage
            key={index}
            src={imageUrl}
            alt={`${title} 이미지 ${index + 1}`}
          />
        ))}
      </ImageScrollContainer>
      <Name>{title}</Name>
      <LocationWrapprer>
        <img src={IMAGE_CONSTANTS.PlaceIcon} alt="위치핑 아이콘" />
        <Adress>{location}</Adress>
      </LocationWrapprer>
    </Wrapper>
  );
};

export default SavedArticleCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; // 북마크 아이콘의 기준점
  gap: 4px;

  flex: 1;
  min-width: 0;
`;
const ImageScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 4px;

  /* 스크롤바 숨기기  */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArticleImage = styled.img`
  width: 208px;
  height: 140px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0; // 이미지가 부모 너비에 맞춰 줄어들지 않도록 방지
`;
const BookmarkIcon = styled.img`
  position: absolute;
  width: 28px;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const Name = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.SemiBold16};

  //이름 길어질때 말줄임 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LocationWrapprer = styled.div`
  display: flex;
  gap: 4px;
`;
const Adress = styled.div`
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.colors.N40};
  ${({ theme }) => theme.fonts.Regular12};

  //이름 길어질때 말줄임 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
