// article/_components/ArticleGrid.tsx
import styled from "styled-components";
import { Article } from "../_apis/getArticle";
import ArticleCard from "./ArticleCard";

const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

type Props = {
  items: Article[];
  onItemClick?: (id: string) => void;
};

const ArticleGrid = ({ items, onItemClick }: Props) => {
  return (
    <Grid>
      {items.map((a) => (
        <ArticleCard key={a.id} article={a} onClick={onItemClick} />
      ))}
    </Grid>
  );
};

export default ArticleGrid;
