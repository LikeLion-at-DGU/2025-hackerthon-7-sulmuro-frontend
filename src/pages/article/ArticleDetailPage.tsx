// src/pages/article/ArticleDetailPage.tsx
import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./ArticleDetailPage.styled";
import { Article, getArticleDetail } from "./_apis/getArticle";
import ArticleContent from "./_components/ArticleContent";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useLanguage } from "@/components/contexts/LanguageContext";
import Loading from "@/components/loading/Loading"; // ✅ 추가

enum Status {
  LOADING = "LOADING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ✅ 라벨/alt 현지화
  const t = useMemo(() => {
    const placeLabel = (p?: string) => {
      if (p === "서울광장시장")
        return language === "ko" ? "서울광장시장" : language === "zh" ? "广藏市场" : "Gwangjang Market";
      if (p === "전체")
        return language === "ko" ? "전체" : language === "zh" ? "全部" : "All";
      return language === "ko" ? "기타" : language === "zh" ? "其他" : "Others";
    };
    return {
      backAlt: language === "ko" ? "뒤로가기" : language === "zh" ? "返回" : "Go back",
      bookmarkedAlt: language === "ko" ? "북마크됨" : language === "zh" ? "已收藏" : "Bookmarked",
      unbookmarkedAlt: language === "ko" ? "북마크 해제됨" : language === "zh" ? "未收藏" : "Not bookmarked",
      locationAlt: language === "ko" ? "위치" : language === "zh" ? "位置" : "Location",
      heroAlt: language === "ko" ? "대표 이미지" : language === "zh" ? "主图" : "Hero image",
      notFound: language === "ko" ? "아티클을 찾을 수 없습니다." : language === "zh" ? "未找到文章。" : "Article not found.",
      loadFail: language === "ko" ? "아티클을 불러오지 못했어요." : language === "zh" ? "无法加载文章。" : "Failed to load the article.",
      loading: language === "ko" ? "불러오는 중..." : language === "zh" ? "加载中..." : "Loading...",
      placeLabel,
    };
  }, [language]);

  // ✅ 북마크 상태 (id별 보관)
  const storageKey = useMemo(() => (id ? `bookmark:article:${id}` : ""), [id]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    setIsBookmarked(saved === "1");
  }, [storageKey]);

  // ✅ 상세 조회
  useEffect(() => {
    const run = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await getArticleDetail(Number(id), language);
        setArticle(data);
      } catch {
        setErrorMsg(t.loadFail);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, language, t.loadFail]);

  const status: Status = useMemo(() => {
    if (loading) return Status.LOADING;
    if (errorMsg) return Status.FAILURE;
    return Status.SUCCESS;
  }, [loading, errorMsg]);

  const handleBack = () => navigate(-1);
  const toggleBookmark = () => {
    setIsBookmarked((prev) => {
      const next = !prev;
      if (storageKey) {
        localStorage.setItem(storageKey, next ? "1" : "0");
      }
      return next;
    });
  };

  // ✅ 상태별 렌더
  const render = useCallback(
    (s: Status) => {
      switch (s) {
        case Status.LOADING:
          return (
            <div
              aria-busy="true"
              aria-live="polite"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "540px",
                height: "90vh",
                zIndex: 20,
                margin: "0 auto",
              }}
            >
              <Loading />
              <span
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                }}
              >
                {t.loading}
              </span>
            </div>
          );

        case Status.FAILURE:
          return (
            <div role="alert" style={{ padding: "1rem", textAlign: "center" }}>
              {errorMsg || t.loadFail}
            </div>
          );

        case Status.SUCCESS:
          if (!article) {
            return <div style={{ padding: "1rem", textAlign: "center" }}>{t.notFound}</div>;
          }
          return (
            <article>
              <S.TextWrapper>
                {/* 썸네일 필요 시 */}
                {/* {article.heroImage && (
                  <S.Thumbnail>
                    <img src={article.heroImage} alt={t.heroAlt} />
                  </S.Thumbnail>
                )} */}
                <S.ContentWrapper>
                  <S.Name title={article.title}>{article.title}</S.Name>
                  <S.SubTitle title={article.subtitle}>{article.subtitle}</S.SubTitle>
                  <S.LocationWrapper>
                    <img src={IMAGE_CONSTANTS.PlaceIcon} alt={t.locationAlt} />
                    <S.Address title={t.placeLabel(article.place)}>{t.placeLabel(article.place)}</S.Address>
                  </S.LocationWrapper>
                </S.ContentWrapper>
              </S.TextWrapper>

              <ArticleContent blocks={article.blocks} />
            </article>
          );
      }
    },
    [article, errorMsg, t.loading, t.loadFail, t.notFound, t.heroAlt, t.placeLabel]
  );

  return (
    <S.Wrapper>
      <S.Header>
        <img
          src={IMAGE_CONSTANTS.BackIcon2}
          alt={t.backAlt}
          role="button"
          tabIndex={0}
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
        <img
          src={isBookmarked ? IMAGE_CONSTANTS.TrueBookmarkPlain : IMAGE_CONSTANTS.FalseBookmarkPlain}
          alt={isBookmarked ? t.bookmarkedAlt : t.unbookmarkedAlt}
          role="button"
          tabIndex={0}
          onClick={toggleBookmark}
          style={{ cursor: "pointer" }}
        />
      </S.Header>

      <S.Contents>{render(status)}</S.Contents>
    </S.Wrapper>
  );
};

export default ArticleDetailPage;
