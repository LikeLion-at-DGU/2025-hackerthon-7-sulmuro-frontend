// pages/CameraSearch/_components/_result/ResultSection.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import * as S from "./SearchResult.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import { AnswerPayload } from "../../_apis/GetImageAPI";
import { useLanguage } from "@/components/contexts/LanguageContext"; // ⬅ 추가

export type SearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSwitchToChat: () => void;
  captured?: string;
  items: SearchItem[];
  loading?: boolean;
  errorMsg?: string;
  answer?: AnswerPayload;
};

const ResultSection = ({
  open,
  onClose,
  captured,
  // items,
  onSwitchToChat,
  loading,
  errorMsg,
  answer,
}: Props) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);
  const startY = useRef<number | null>(null);

  const MAX_DOWN = 500;
  const THRESHOLD_DOWN = 160; // 아래로 이만큼 끌면 닫힘
  const THRESHOLD_UP = 80; // 위로 이만큼 끌면 Chat 전환

  useEffect(() => {
    if (open) setY(0);
  }, [open]);

  // ⬇ 현재 앱 언어
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

  // ⬇ 라벨 현지화
  const t = useMemo(() => {
    return {
      analyzing:
        language === "ko" ? "이미지 분석 중..." : language === "zh" ? "正在分析图片..." : "Analyzing image...",
      analyzeFailPrefix:
        language === "ko" ? "분석 실패: " : language === "zh" ? "分析失败：" : "Analyze failed: ",
      pullUpToAskAI:
        language === "ko" ? "스크롤을 올려 AI에게 질문하기" : language === "zh" ? "上滑向 AI 提问" : "Pull up to ask AI",
    };
  }, [language]);

  const onTouchStart: React.TouchEventHandler = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const onTouchMove: React.TouchEventHandler = (e) => {
    if (startY.current == null) return;
    const diff = e.touches[0].clientY - startY.current; // + 아래 / - 위
    const next = Math.min(Math.max(diff, -200), MAX_DOWN); // 위는 -200까지만
    setY(next);
  };

  const onTouchEnd: React.TouchEventHandler = () => {
    if (y > THRESHOLD_DOWN) {
      onClose(); // 아래로 충분히 → 닫기
    } else if (y < -THRESHOLD_UP) {
      onSwitchToChat(); // 위로 충분히 → Chat 전환
    } else {
      setY(0); // 원위치
    }
    startY.current = null;
  };

  return (
    <S.SheetWrapper data-open={open}>
      <S.Backfill style={{ height: y < 0 ? Math.abs(y) : 0 }} />
      <S.Sheet
        ref={sheetRef}
        style={{ transform: `translateY(${open ? y : MAX_DOWN}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <S.Grabber />

        {captured && (
          <S.Result>
            <S.CapturedImg src={captured} alt="captured" />

            {/* ✅ 로딩/에러/성공 상태 출력 - 현지화 적용 */}
            {loading && (
              <S.CapturedResult>
                <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                <div className="label">{t.analyzing}</div>
              </S.CapturedResult>
            )}

            {!loading && errorMsg && (
              <S.CapturedResult>
                <img src={IMAGE_CONSTANTS.ResultIcon} alt="⚠️" />
                <div className="label">
                  {t.analyzeFailPrefix}
                  {errorMsg}
                </div>
              </S.CapturedResult>
            )}

            {!loading && !errorMsg && answer && (
              <>
                <S.CapturedResult>
                  <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                  <div className="label">{answer.itemName}</div>
                </S.CapturedResult>

                <S.CapturedDescription>
                  <div className="hint">
                    {answer.description}
                    {typeof answer.averagePrice === "string" && answer.averagePrice.trim() !== "NULL" && (
                      <>
                        <br />
                        <br />
                        <S.AveragePrice>
                          <p className="Tag">Market price</p>
                          <S.PriceWrapper>
                            <div className="Price">{answer.averagePrice}</div>
                          </S.PriceWrapper>
                        </S.AveragePrice>
                      </>
                    )}
                    <br />
                    {Array.isArray(answer.recommendedStores) && answer.recommendedStores.length > 0 && (
                      <>
                        <S.RecommendStrores>
                          <p className="Tag">Selling spot</p>
                          <div className="Price">
                            <S.RecommendedStoreList>
                              {answer.recommendedStores.map((s, idx) => (
                                <S.RecommendedStoreItem key={idx}>
                                  {s.name}
                                  {s.notes ? ` — ${s.notes}` : ""}
                                </S.RecommendedStoreItem>
                              ))}
                            </S.RecommendedStoreList>
                          </div>
                        </S.RecommendStrores>
                      </>
                    )}
                  </div>
                </S.CapturedDescription>
              </>
            )}

            <S.ToAIChat>
              <div className="scrollToAI">{t.pullUpToAskAI}</div>
            </S.ToAIChat>
          </S.Result>
        )}
      </S.Sheet>
    </S.SheetWrapper>
  );
};

export default ResultSection;
