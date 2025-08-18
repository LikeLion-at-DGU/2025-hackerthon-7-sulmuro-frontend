import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Footer.styled";
import { Link, useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();

  console.log(location);

  return (
    <S.FooterWrapper>
      <S.FooterContent as={Link} to="/" $isSelected={location.pathname === "/"}>
        <S.ImageContainer>
          <img
            src={
              location.pathname == "/"
                ? IMAGE_CONSTANTS.MapSelected
                : IMAGE_CONSTANTS.MapUnselected
            }
            alt="지도"
          />
        </S.ImageContainer>
        <p>MAP</p>
      </S.FooterContent>
      <S.FooterContent
        as={Link}
        to="/talk"
        $isSelected={location.pathname === "/talk"}
      >
        <S.ImageContainer>
          <img
            src={
              location.pathname == "/talk"
                ? IMAGE_CONSTANTS.TalkSelected
                : IMAGE_CONSTANTS.TalkUnselected
            }
            alt="채팅"
          />
        </S.ImageContainer>
        <p>TALK</p>
      </S.FooterContent>
      <S.FooterContentSearch as={Link} to="/AI">
        <img src={IMAGE_CONSTANTS.SearchAI} alt="AI 촬영 검색" />
      </S.FooterContentSearch>
      <S.FooterContent
        as={Link}
        to="/article"
        $isSelected={location.pathname === "/article"}
      >
        <S.ImageContainer>
          <img
            src={
              location.pathname == "/article"
                ? IMAGE_CONSTANTS.ArticleSelected
                : IMAGE_CONSTANTS.ArticleUnselected
            }
            alt="아티클"
          />
        </S.ImageContainer>
        <p>ARTICLE</p>
      </S.FooterContent>
      <S.FooterContent
        as={Link}
        to="/saved"
        $isSelected={location.pathname === "/saved"}
      >
        <S.ImageContainer>
          <img
            src={
              location.pathname == "/saved"
                ? IMAGE_CONSTANTS.SavedSelected
                : IMAGE_CONSTANTS.SavedUnselected
            }
            alt="저장"
          />
        </S.ImageContainer>
        <p>SAVED</p>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;
