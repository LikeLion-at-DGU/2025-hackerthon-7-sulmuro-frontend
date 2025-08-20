// article/_components/ArticleDetail.tsx
import styled from "styled-components";
import { Article } from "../_apis/getArticle";
import ArticleContent from "./ArticleContent";

const Wrap = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #444;
`;

const Meta = styled.div`
  font-size: 0.85rem;
  color: #666;
`;

type Props = {
  article: Article;
};

const ArticleDetail = ({ article }: Props) => {
  return (
    <Wrap>
      <Title>{article.title}</Title>
      <Subtitle>{article.subtitle}</Subtitle>
      <Meta>
        {article.place} · {article.category}
      </Meta>
      <ArticleContent images={article.images} content={article.content} />
    </Wrap>
  );
};

export default ArticleDetail;
