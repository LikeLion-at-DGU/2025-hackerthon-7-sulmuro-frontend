import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import * as S from "./Footer.styled";
import { Link, matchPath, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routeConstants";
const Footer = () => {
  const location = useLocation();
  const isSaved = !!matchPath(
    { path: `${ROUTE_PATHS.SAVED}/*` },
    location.pathname
  );

  return (
    <S.FooterWrapper>
      <S.FooterContent
        as={Link}
        to={ROUTE_PATHS.MAP}
        $isSelected={location.pathname === ROUTE_PATHS.MAP}
      >
        <S.ImageContainer>
          <img
            src={
              location.pathname == ROUTE_PATHS.MAP
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
        to={ROUTE_PATHS.TALK}
        $isSelected={location.pathname === ROUTE_PATHS.TALK}
      >
        <S.ImageContainer>
          <img
            src={
              location.pathname == ROUTE_PATHS.TALK
                ? IMAGE_CONSTANTS.TalkSelected
                : IMAGE_CONSTANTS.TalkUnselected
            }
            alt="채팅"
          />
        </S.ImageContainer>
        <p>TALK</p>
      </S.FooterContent>
      <S.FooterContentSearch as={Link} to={ROUTE_PATHS.AI}>
        <img src={IMAGE_CONSTANTS.SearchAI} alt="AI 촬영 검색" />
      </S.FooterContentSearch>
      <S.FooterContent
        as={Link}
        to={ROUTE_PATHS.ARTICLE}
        $isSelected={location.pathname === ROUTE_PATHS.ARTICLE}
      >
        <S.ImageContainer>
          <img
            src={
              location.pathname == ROUTE_PATHS.ARTICLE
                ? IMAGE_CONSTANTS.ArticleSelected
                : IMAGE_CONSTANTS.ArticleUnselected
            }
            alt="아티클"
          />
        </S.ImageContainer>
        <p>ARTICLE</p>
      </S.FooterContent>
      <S.FooterContent as={Link} to={ROUTE_PATHS.SAVED} $isSelected={isSaved}>
        <S.ImageContainer>
          <img
            src={
              isSaved
                ? IMAGE_CONSTANTS.SavedSelected
                : IMAGE_CONSTANTS.SavedUnselected
            }
            alt="저장"
          />
        </S.ImageContainer>
        <p>MARKED</p>
      </S.FooterContent>
    </S.FooterWrapper>
  );
};

export default Footer;
