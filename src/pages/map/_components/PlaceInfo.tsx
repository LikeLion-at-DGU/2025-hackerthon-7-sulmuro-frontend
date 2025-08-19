import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Mapstyled";

interface PlaceInfoProps {
  name: string;
  address: string;
  type: boolean;
}

const PlaceInfo = ({ name, address, type }: PlaceInfoProps) => {
  console.log(type);
  return (
    <>
      <S.PlaceInfoWrapper $expanded={!type}>
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
    </>
  );
};

export default PlaceInfo;
