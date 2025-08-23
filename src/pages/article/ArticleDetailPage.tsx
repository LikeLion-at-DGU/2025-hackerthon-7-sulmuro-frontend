// src/pages/article/ArticleDetailPage.tsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./ArticleDetailPage.styled";
import { Article, getArticleDetail } from "./_apis/getArticle";
import ArticleContent from "./_components/ArticleContent"; // ✅ 본문 인터리브 렌더러 (아래 제공)
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ✅ 북마크 상태 (id별 보관)
  const storageKey = useMemo(() => (id ? `bookmark:article:${id}` : ""), [id]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  // 로컬스토리지에서 초기값 복원
  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    setIsBookmarked(saved === "1");
  }, [storageKey]);
  
  useEffect(() => {
  const run = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await getArticleDetail(Number(id), "ko");
      setArticle(data);
    } catch (e) {
      setErrorMsg("아티클을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  };
  run();
}, [id]);

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
  return (
    <S.Wrapper>
      <S.Header>
        <img
          src={IMAGE_CONSTANTS.BackIcon2}
          alt="뒤로가기"
          role="button"
          tabIndex={0}
          onClick={handleBack}
          style={{ cursor: "pointer" }}
        />
        <img
          src={
            isBookmarked
              ? IMAGE_CONSTANTS.TrueBookmarkPlain
              : IMAGE_CONSTANTS.FalseBookmarkPlain
          }
          alt={isBookmarked ? "북마크됨" : "북마크 해제됨"}
          role="button"
          tabIndex={0}
          onClick={toggleBookmark}
          style={{ cursor: "pointer" }}
        />
      </S.Header>

      <S.Contents>
        {loading && <div>불러오는 중...</div>}
        {!loading && errorMsg && <div>{errorMsg}</div>}
        {!loading && !errorMsg && article && (
          <article>
            <S.TextWrapper>
                <S.Name title={article.title}>{article.title}</S.Name>
                <S.SubTitle title={article.subtitle}>{article.subtitle}</S.SubTitle>
                <S.LocationWrapper>
                  <img src={IMAGE_CONSTANTS.PlaceIcon} alt="위치" />
                  <S.Address title={article.place}>{article.place}</S.Address>
                </S.LocationWrapper>
            </S.TextWrapper>
            <ArticleContent images={article.images} content={article.content} />
          </article>
        )}

        {!loading && !errorMsg && !article && <div>아티클을 찾을 수 없습니다.</div>}
      </S.Contents>
    </S.Wrapper>
  );
};

export default ArticleDetailPage;
