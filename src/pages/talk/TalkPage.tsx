// src/pages/talk/TalkPage.tsx
import * as S from "./TalkPage.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import QuickTalk from "./_components/QuickTalk";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import MarketSheet from "./_components/MarketSheet"; // ✅ 추가
// (선택) 타입을 쓰고 싶다면: import type { Place } from "@/pages/article/_apis/getArticle";

const MARKET_OPTIONS = ["서울광장시장", "전체"] as const; // ✅ 라벨 통일

const TalkPage = () => {
  const navigate = useNavigate();

  // ✅ 선택 상태 & 시트 오픈 상태
  const [market, setMarket] = useState<(typeof MARKET_OPTIONS)[number]>("전체");
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const openMarketSheet = useCallback(() => setIsMarketOpen(true), []);
  const closeMarketSheet = useCallback(() => setIsMarketOpen(false), []);

  return (
    <S.Wrapper>
      <S.Header>
        Quick Phrases

        {/* ▼ 기존 <select> 제거 → 트리거 버튼 */}
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
        {/* 필요하면 QuickTalk에 market 넘겨서 필터링에 활용 */}
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

      {/* ✅ 바텀시트 연결 */}
      {isMarketOpen && (
        <MarketSheet
          setIsOpen={setIsMarketOpen}
          current={market}
          onSelect={(p) => {
            setMarket(p);
            closeMarketSheet();
          }}
          options={MARKET_OPTIONS} // “전체 / 서울 광장시장”
        />
      )}
    </S.Wrapper>
  );
};

export default TalkPage;
