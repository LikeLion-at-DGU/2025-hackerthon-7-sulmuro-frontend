import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Footer.styled";
const Footer = () => {
  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <img src={IMAGE_CONSTANTS.MapUnselected} alt="지도" />
        <p>Map</p>
      </S.FooterContent>
      <S.FooterContent>
        <img src={IMAGE_CONSTANTS.TalkUnselected} alt="채팅" />
        <p>TALK</p>
      </S.FooterContent>
      <S.FooterContentSearch>
        <img src={IMAGE_CONSTANTS.SearchAI} alt="AI 촬영 검색" />
      </S.FooterContentSearch>
      <S.FooterContent>
        <img src={IMAGE_CONSTANTS.ArticleUnselected} alt="아티클" />
        <p>Article</p>
      </S.FooterContent>
      <S.FooterContent>
        <img src={IMAGE_CONSTANTS.SavedUnselected} alt="저장" />
        <p>SAVED</p>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;
