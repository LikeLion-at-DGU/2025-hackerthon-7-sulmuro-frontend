// src/pages/article/_components/ArticleContent.tsx
import styled from "styled-components";
import type { ContentBlock } from "../_apis/getArticle";

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Paragraph = styled.p`
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 1rem;
  margin: 0;
  padding: 16px;
  color: #000;
  ${({ theme }) => theme.fonts.Regular14};
`;

const Img = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  margin: 8px 0;
`;

type Props = {
  /** ✅ position 정렬된 블록 배열을 우선 사용 */
  blocks?: ContentBlock[];
  /** 과거 방식과의 호환(없으면 무시) */
  images?: string[];
  content?: string[];
  heroIndex?: number;
  showHero?: boolean;
};

const ArticleContent = ({
  blocks,
  images = [],
  content = [],
  heroIndex = 0,
  showHero = true,
}: Props) => {
  // ✅ blocks가 오면 blocks 기준으로 그대로 렌더 (position asc, IMAGE → TEXT 순)
  if (blocks && blocks.length > 0) {
    return (
      <Section>
        {blocks.map((b, i) =>
          b.type === "IMAGE" ? (
            <Img key={`img-${i}`} src={b.data} alt={`image-${i}`} />
          ) : (
            <Paragraph key={`txt-${i}`}>{b.data}</Paragraph>
          )
        )}
      </Section>
    );
  }

  // ⛳️ Fallback: 기존 방식(히어로 → 문단 → 이미지[+1] …)
  const hero = showHero ? images?.[heroIndex] : undefined;
  return (
    <Section>
      {hero && <Img src={hero} alt="hero" />}
      {content.map((para, i) => (
        <div key={i}>
          <Paragraph>{para}</Paragraph>
          {images?.[i + 1] && <Img src={images[i + 1]} alt={`image-${i + 1}`} />}
        </div>
      ))}
    </Section>
  );
};

export default ArticleContent;
