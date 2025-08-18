// pages/CameraSearch/_components/_result/ResultSection.tsx
import { useEffect, useRef, useState } from "react";
import * as S from "./SearchResult.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import { AnswerPayload } from "../../_apis/GetImageAPI"; // ✅ 타입 재사용

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
    // ✅ 추가: API 데이터
    loading?: boolean;
    errorMsg?: string;
    answer?: AnswerPayload;
};

const ResultSection = ({
    open,
    onClose,
    captured,
    items,
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
    const THRESHOLD_UP = 120; // 위로 이만큼 끌면 Chat 전환

    useEffect(() => {
      if (open) {
        setY(0);
        // requestAnimationFrame(() => setY(0)); // 스타일 트랜지션이 있다면 더 안정적
      }
    }, [open]);


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

                {/* ✅ 로딩/에러/성공 상태 출력 */}
                {loading && (
                <S.CapturedResult>
                    <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                    <div className="label">이미지 분석 중...</div>
                </S.CapturedResult>
                )}

                {!loading && errorMsg && (
                <S.CapturedResult>
                    <img src={IMAGE_CONSTANTS.ResultIcon} alt="⚠️" />
                    <div className="label">분석 실패: {errorMsg}</div>
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
                          <br />
                          {Array.isArray(answer.recommendedStores) &&
                          answer.recommendedStores.length > 0 && (
                              <>
                              <br />
                              <strong>추천 가게</strong>
                              <ul style={{ marginTop: 6 }}>
                                  {answer.recommendedStores.map((s, idx) => (
                                  <li key={idx}>
                                      {s.name}
                                      {s.notes ? ` — ${s.notes}` : ""}
                                  </li>
                                  ))}
                              </ul>
                              </>
                          )}
                      </div>
                    </S.CapturedDescription>
                </>
                )}

                <S.ToAIChat>
                <div className="scrollToAI">스크롤을 올려 AI에게 질문하기</div>
                </S.ToAIChat>
            </S.Result>
            )}

            {/* 추가 리스트(선택 사항) */}
            {/* <S.List>
            {items.map((it) => (
                <S.Item key={it.id}>
                <S.Thumb src={it.thumbnail} alt={it.title} />
                <div className="body">
                    <div className="title">{it.title}</div>
                    {it.subtitle && <div className="sub">{it.subtitle}</div>}
                </div>
                </S.Item>
            ))}
            </S.List> */}
        </S.Sheet>
        </S.SheetWrapper>
    );
};

export default ResultSection;
