import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addPlace, hasPlace, removePlace } from "@/utils/SavedBookMark";
interface SavePlaceCardProps {
  id: number;
  name: string;
  path: string;
  thumbnailUrl: string;
  address: string;
}

const SavePlaceCard = ({
  id,
  name,
  path,
  thumbnailUrl,
  address,
}: SavePlaceCardProps) => {
  const [isBookMark, setIsBookMark] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(path);
  };
  useEffect(() => {
    if (id != null) {
      setIsBookMark(hasPlace(id));
    }
  }, []);
  const handleBookMarkExplicit = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (id == null) return;
    setIsBookMark((prev) => {
      if (prev) removePlace(id!);
      else addPlace(id!);
      return !prev;
    });
  };
  return (
    <Wrapper onClick={handleNavigate}>
      <Thumbnail>
        <BookmarkIcon
          src={
            isBookMark
              ? IMAGE_CONSTANTS.Bookmark
              : IMAGE_CONSTANTS.BookMarkUnselect
          }
          alt="북마크"
          onClick={handleBookMarkExplicit}
        />
        <StyledImage src={thumbnailUrl} alt={`${name} 이미지`} />
      </Thumbnail>
      <Name>{name}</Name>
      <Adress>{address}</Adress>
    </Wrapper>
  );
};

export default SavePlaceCard;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  min-width: 0;
`;

const Thumbnail = styled.div`
  display: flex;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;
const BookmarkIcon = styled.img`
  position: absolute;
  width: 28px;
  top: 10px;
  left: 10px;
  z-index: 1;
`;
// 컨테이너를 채울 이미지
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 비율을 유지하며 컨테이너를 꽉 채우도록 설정 */
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
const Adress = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.N40};
  ${({ theme }) => theme.fonts.Regular12};

  //이름 길어질때 말줄임 처리
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
