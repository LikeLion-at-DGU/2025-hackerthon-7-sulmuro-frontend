// pages/CameraSearch/_components/_result/ResultSection.tsx
import { useEffect, useRef, useState, useMemo } from "react";
import * as S from "./SearchResult.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import { AnswerPayload } from "../../_apis/GetImageAPI";
import { useLanguage } from "@/components/contexts/LanguageContext";

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

  // 드래그 상태/포인터 캡처 관리
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const prevUserSelectRef = useRef<string>("");

  const MAX_DOWN = 900;
  const THRESHOLD_DOWN = 160; // 아래로 이만큼 끌면 닫힘
  const THRESHOLD_UP = 80;    // 위로 이만큼 끌면 Chat 전환

  useEffect(() => {
    if (open) setY(0);
  }, [open]);

  // 현재 앱 언어
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

  // 라벨 현지화
  const t = useMemo(() => {
    return {
      analyzing:
        language === "ko" ? "이미지 분석 중..." : language === "zh" ? "正在分析图片..." : "Analyzing image...",
      analyzeFailPrefix:
        language === "ko" ? "분석 실패: " : language === "zh" ? "分析失败：" : "Analyze failed: ",
      pullUpToAskAI:
        language === "ko" ? "스크롤을 올려 AI에게 질문하기" : language === "zh" ? "上滑向 AI 提问" : "Pull up to ask AI",
      marketPrice:
        language === "ko" ? "시세" : language === "zh" ? "市场价" : "Market price",
      sellingSpot:
        language === "ko" ? "판매 장소" : language === "zh" ? "售卖点" : "Selling spot",
    };
  }, [language]);

  // 공통 로직: 드래그 시작/이동/종료
  const startDrag = (clientY: number) => {
    draggingRef.current = true;
    startY.current = clientY;

    // 드래그 중 텍스트 선택 방지
    prevUserSelectRef.current = document.body.style.userSelect;
    document.body.style.userSelect = "none";
  };

  const moveDrag = (clientY: number) => {
    if (!draggingRef.current || startY.current == null) return;
    const diff = clientY - startY.current; // + 아래 / - 위
    const next = Math.min(Math.max(diff, -200), MAX_DOWN); // 위는 -200까지만
    setY(next);
  };

  const endDrag = () => {
    if (!draggingRef.current) return;

    if (y > THRESHOLD_DOWN) {
      onClose(); // 아래로 충분히 → 닫기
    } else if (y < -THRESHOLD_UP) {
      onSwitchToChat(); // 위로 충분히 → Chat 전환
    } else {
      setY(0); // 원위치
    }

    draggingRef.current = false;
    startY.current = null;

    // user-select 복원
    document.body.style.userSelect = prevUserSelectRef.current || "";
  };

  // ===== Pointer Events (마우스/터치/펜 통합) =====
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    // 주 포인터만 처리 + 마우스는 왼쪽 버튼만
    if (!e.isPrimary) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    pointerIdRef.current = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 일부 브라우저/플랫폼에서 실패할 수 있음 → 무시
    }
    startDrag(e.clientY);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    // 다른 포인터(멀티터치 등) 무시
    if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
    moveDrag(e.clientY);
  };

  const onPointerUpOrCancel: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // 이미 해제되었을 수 있음
    }
    pointerIdRef.current = null;
    endDrag();
  };

  // ===== Touch Fallback (매우 구형 환경용) =====
  const supportsPointer = typeof window !== "undefined" && "PointerEvent" in window;

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    startDrag(e.touches[0].clientY);
  };
  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    moveDrag(e.touches[0].clientY);
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    endDrag();
  };

  // 이벤트 핸들러를 조건부로 바인딩 (중복 방지)
  const sheetEventHandlers: React.HTMLAttributes<HTMLDivElement> = supportsPointer
    ? {
        onPointerDown,
        onPointerMove,
        onPointerUp: onPointerUpOrCancel,
        onPointerCancel: onPointerUpOrCancel,
      }
    : {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
      };

  return (
    <S.SheetWrapper data-open={open}>
      <S.Backfill style={{ height: y < 0 ? Math.abs(y) : 0 }} />
      <S.Sheet
        ref={sheetRef}
        style={{ transform: `translateY(${open ? y : MAX_DOWN}px)` }}
        {...sheetEventHandlers}
      >
        <S.Grabber />

        {captured && (
          <S.Result>
            <S.CapturedImg src={captured} alt="captured" />

            {/* 로딩/에러/성공 상태 출력 - 현지화 적용 */}
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
                          <p className="Tag">{t.marketPrice}</p>
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
                          <p className="Tag">{t.sellingSpot}</p>
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
