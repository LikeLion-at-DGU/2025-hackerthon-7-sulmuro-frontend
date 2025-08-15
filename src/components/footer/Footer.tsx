import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Footer.styled";
const Footer = () => {
  return (
    <S.FooterWrapper>
      <S.FooterContent>
        <S.ImageContainer>
          <img src={IMAGE_CONSTANTS.MapUnselected} alt="지도" />
        </S.ImageContainer>
        <p>MAP</p>
      </S.FooterContent>
      <S.FooterContent>
        <S.ImageContainer>
          <img src={IMAGE_CONSTANTS.TalkUnselected} alt="채팅" />
        </S.ImageContainer>
        <p>TALK</p>
      </S.FooterContent>
      <S.FooterContentSearch>
        <img src={IMAGE_CONSTANTS.SearchAI} alt="AI 촬영 검색" />
      </S.FooterContentSearch>
      <S.FooterContent>
        <S.ImageContainer>
          <img src={IMAGE_CONSTANTS.ArticleUnselected} alt="아티클" />
        </S.ImageContainer>
        <p>ARTICLE</p>
      </S.FooterContent>
      <S.FooterContent>
        <S.ImageContainer>
          <img src={IMAGE_CONSTANTS.SavedUnselected} alt="저장" />
        </S.ImageContainer>
        <p>SAVED</p>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;
