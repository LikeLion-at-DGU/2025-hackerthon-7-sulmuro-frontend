// src/pages/article/_components/ArticleContent.tsx
import styled from "styled-components";

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
