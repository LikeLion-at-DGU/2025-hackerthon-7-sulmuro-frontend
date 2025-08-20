// src/pages/article/ArticleDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "./ArticlePage.styled";
import { Article, getArticles } from "./_apis/getArticle";
import ArticleContent from "./_components/ArticleContent"; // ✅ 본문 인터리브 렌더러 (아래 제공)

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        const res = await getArticles({ id }); // 더미 API: id로 필터
        setArticle(res.data[0] ?? null);
      } catch (e) {
        setErrorMsg("아티클을 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  return (
    <S.Wrapper>
      <S.Header>Article</S.Header>

      <S.Contents>
        {loading && <div>불러오는 중...</div>}
        {!loading && errorMsg && <div>{errorMsg}</div>}
        {!loading && !errorMsg && article && (
          <article>
            <h1 style={{ margin: "0 0 8px" }}>{article.title}</h1>
            <h2 style={{ margin: "0 0 8px", fontWeight: 500, color: "#555", fontSize: "1rem" }}>
              {article.subtitle}
            </h2>
            <div style={{ marginBottom: 12, color: "#777", fontSize: ".9rem" }}>
              {article.place} · {article.category}
            </div>

            <ArticleContent images={article.images} content={article.content} />
          </article>
        )}

        {!loading && !errorMsg && !article && <div>아티클을 찾을 수 없습니다.</div>}
      </S.Contents>
    </S.Wrapper>
  );
};

export default ArticleDetailPage;
