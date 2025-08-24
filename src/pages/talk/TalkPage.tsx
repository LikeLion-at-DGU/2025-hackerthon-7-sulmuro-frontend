// src/pages/talk/TalkPage.tsx
import * as S from "./TalkPage.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import QuickTalk from "./_components/QuickTalk";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import MarketSheet from "./_components/MarketSheet"; 

const MARKET_OPTIONS = ["서울광장시장"] as const;

const TalkPage = () => {
  const navigate = useNavigate();

  const [market, setMarket] = useState<(typeof MARKET_OPTIONS)[number]>("서울광장시장");
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const openMarketSheet = useCallback(() => setIsMarketOpen(true), []);
  const closeMarketSheet = useCallback(() => setIsMarketOpen(false), []);

  return (
    <S.Wrapper>
      <S.Header>
        Quick Phrases

        <S.MarketTrigger
          type="button"
          onClick={openMarketSheet}
          aria-haspopup="dialog"
          aria-expanded={isMarketOpen}
        >
          {market} 
          <img src={IMAGE_CONSTANTS.DropDown} alt="선택" />
        </S.MarketTrigger>
      </S.Header>

      <S.TopComponentWrapper>
        <QuickTalk /* market={market} */ />
      </S.TopComponentWrapper>

      <S.Header>Free Talk</S.Header>

      <S.BottomComponentWrapper>
        <S.TextTranslate onClick={() => navigate("/talk/text")}>
          Enter text to translate
        </S.TextTranslate>

        <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
          <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
          <p>Voice Translation</p>
        </S.VoiceTranslate>
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