// pages/CameraSearch/_components/_result/ResultSection.tsx
import { useEffect, useRef, useState } from "react";
import * as S from "./SearchResult.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
// import AIChat from "./AIChat"; // ✅ 내용 전용 컴포넌트

export type SearchItem = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnail?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSwitchToChat: () => void; // ✅ 추가
  captured?: string;
  items: SearchItem[];
};

const ResultSection = ({
  open,
  onClose,
  captured,
  items,
  onSwitchToChat,
}: Props) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);
  const startY = useRef<number | null>(null);

  const MAX_DOWN = 500;
  const THRESHOLD_DOWN = 160; // 아래로 이만큼 끌면 닫힘
  const THRESHOLD_UP = 120; // 위로 이만큼 끌면 Chat 전환

  useEffect(() => {
    if (open) setY(0);
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
      onSwitchToChat(); // 위로 충분히 → 부모에서 ResultSection 언마운트 & AIChat 표시
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
            <S.CapturedResult>
              <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
              <div className="label">야생의 강근우</div>
            </S.CapturedResult>
            <S.CapturedDescription>
              <div className="hint">
                매우 난폭하다!
                <br />
                매우 잔인하다!
                <br />
                매우 잔혹하다!
              </div>
            </S.CapturedDescription>
            <S.ToAIChat>
              <div className="scrollToAI">FUCKCKCKCK게 질문하기</div>
            </S.ToAIChat>
          </S.Result>
        )}

        <S.List>
          {items.map((it) => (
            <S.Item key={it.id}>
              <S.Thumb src={it.thumbnail} alt={it.title} />
              <div className="body">
                <div className="title">{it.title}</div>
                {it.subtitle && <div className="sub">{it.subtitle}</div>}
              </div>
            </S.Item>
          ))}
        </S.List>
      </S.Sheet>
    </S.SheetWrapper>
  );
};

export default ResultSection;
