import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Mapstyled";

const PlaceInfo = () => {
  return (
    <>
      <S.FindButton>
        <p>보도 길찾기</p>
        <img src={IMAGE_CONSTANTS.FootPrint} alt="길찾기 버튼" />
      </S.FindButton>
      <S.PlaceInfoWrapper>
        <S.SwipeButton />

        <S.InfoContainer>
          <p className="title">Jeolla-do Sasimi Bar</p>
          <img src={IMAGE_CONSTANTS.BookMark} alt="저장하기" />
        </S.InfoContainer>
        <p className="address">East A 23</p>
      </S.PlaceInfoWrapper>
      ;
    </>
  );
};

export default PlaceInfo;
