// src/pages/article/_components/ArticleContent.tsx
import styled from "styled-components";
import type { ContentBlock } from "../_apis/getArticle";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { useMemo } from "react";

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
        height: 250px;
  object-fit: cover;
  margin: 8px 0;
`;

type Props = {
  /** position 정렬된 블록 배열 */
  blocks?: ContentBlock[];
  /** Fallback 용 */
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
  const { language } = useLanguage();

  const t = useMemo(() => {
    return {
      heroAlt: language === "ko" ? "대표 이미지" : language === "zh" ? "主图" : "Hero image",
      imageAlt: (i: number) =>
        language === "ko" ? `이미지 ${i}` : language === "zh" ? `图片 ${i}` : `Image ${i}`,
    };
  }, [language]);

  // ✅ blocks가 오면 blocks 기준 렌더
  if (blocks && blocks.length > 0) {
    return (
      <Section>
        {blocks.map((b, i) =>
          b.type === "IMAGE" ? (
            <Img key={`img-${i}`} src={b.data} alt={t.imageAlt(i + 1)} />
          ) : (
            <Paragraph key={`txt-${i}`}>{b.data}</Paragraph>
          )
        )}
      </Section>
    );
  }

  // ⛳️ Fallback: 기존 방식
  const hero = showHero ? images?.[heroIndex] : undefined;
  return (
    <Section>
      {hero && <Img src={hero} alt={t.heroAlt} />}
      {content.map((para, i) => (
        <div key={i}>
          <Paragraph>{para}</Paragraph>
          {images?.[i + 1] && <Img src={images[i + 1]} alt={t.imageAlt(i + 1)} />}
        </div>
      ))}
    </Section>
  );
};

export default ArticleContent;
