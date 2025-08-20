// src/pages/article/_components/ArticleContent.tsx
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Paragraph = styled.p`
  white-space: pre-wrap;
  line-height: 1.7;
  font-size: 1rem;
  color: #222;
  margin: 0;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

type Props = {
  images: string[];   // [0]은 히어로
  content: string[];  // 문단들
  heroIndex?: number; // 기본 0
  showHero?: boolean; // 기본 true
};

const ArticleContent = ({ images, content, heroIndex = 0, showHero = true }: Props) => {
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
