// src/pages/talk/TalkPage.tsx
import * as S from "./TalkPage.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import QuickTalk from "./_components/QuickTalk";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";
import MarketSheet from "./_components/MarketSheet";
import { useLanguage } from "@/components/contexts/LanguageContext";

const MARKET_OPTIONS = ["서울광장시장"] as const;
type MarketOption = (typeof MARKET_OPTIONS)[number];

const TalkPage = () => {
  const navigate = useNavigate();

  const [market, setMarket] = useState<MarketOption>("서울광장시장");
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const openMarketSheet = useCallback(() => setIsMarketOpen(true), []);
  const closeMarketSheet = useCallback(() => setIsMarketOpen(false), []);

  // ✅ 언어별 라벨
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'
  const t = useMemo(() => {
    const marketLabel = (m: MarketOption) => {
      switch (m) {
        case "서울광장시장":
          return language === "ko" ? "서울광장시장" : language === "zh" ? "广藏市场" : "Gwangjang Market";
        default:
          return m; // 확장 시 기본값
      }
    };
    return {
      quickPhrases: language === "ko" ? "빠른 문장" : language === "zh" ? "快速短句" : "Quick Phrases",
      freeTalk: language === "ko" ? "자유 대화" : language === "zh" ? "自由对话" : "Free Talk",
      textCta:
        language === "ko"
          ? "번역할 텍스트를 입력하세요"
          : language === "zh"
          ? "输入要翻译的文本"
          : "Enter text to translate",
      voiceCta: language === "ko" ? "음성 번역" : language === "zh" ? "语音翻译" : "Voice Translation",
      selectAlt: language === "ko" ? "선택" : language === "zh" ? "选择" : "Select",
      marketLabel,
    };
  }, [language]);

  return (
    <S.Wrapper>
      <S.Header>
        {t.quickPhrases}

        <S.MarketTrigger
          type="button"
          onClick={openMarketSheet}
          aria-haspopup="dialog"
          aria-expanded={isMarketOpen}
        >
          {/* ✅ 설정 언어에 맞는 시장 이름 표시 */}
          {t.marketLabel(market)}
          <img src={IMAGE_CONSTANTS.DropDown} alt={t.selectAlt} />
        </S.MarketTrigger>
      </S.Header>
      
      <S.TopComponentWrapper>
        
        <S.TextTranslate onClick={() => navigate("/talk/text")}>
          {t.textCta}
        </S.TextTranslate>

        <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
          <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
          <p>{t.voiceCta}</p>
        </S.VoiceTranslate>
      </S.TopComponentWrapper>

      <S.Header>{t.freeTalk}</S.Header>

      <S.BottomComponentWrapper>
        {/* QuickTalk 내부도 LanguageContext로 라벨/표시가 이미 현지화됨 */}
        <QuickTalk /* market={market} */ />
      </S.BottomComponentWrapper>

      {isMarketOpen && (
        <MarketSheet
          setIsOpen={setIsMarketOpen}
          current={market}
          onSelect={(p) => {
            setMarket(p);
            closeMarketSheet();
          }}
          options={MARKET_OPTIONS}
        />
      )}
    </S.Wrapper>
  );
};

export default TalkPage;
