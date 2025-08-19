import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Mapstyled";

interface PlaceInfoProps {
  name: string;
  address: string;
}

const PlaceInfo = ({ name, address }: PlaceInfoProps) => {
  return (
    <>
      <S.PlaceInfoWrapper>
        <S.SwipeButton />
        <S.InfoContainer>
          <p className="title">{name}</p>
          <img src={IMAGE_CONSTANTS.BookMark} alt="저장하기" />
        </S.InfoContainer>
        <p className="address">{address}</p>
      </S.PlaceInfoWrapper>
      ;
    </>
  );
};

export default PlaceInfo;
