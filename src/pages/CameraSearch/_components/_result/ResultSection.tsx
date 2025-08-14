import { useEffect, useRef, useState } from "react";
import * as S from "./SearchResult.styled";

export type SearchItem = {
    id: string;
    title: string;
    subtitle?: string;
    thumbnail?: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    captured?: string;     // 상단 미리보기 이미지 (선택)
    items: SearchItem[];
};

const ResultSection = ({ open, onClose, captured, items }: Props) => {
    const sheetRef = useRef<HTMLDivElement | null>(null);
    const [y, setY] = useState(0);
    const startY = useRef<number | null>(null);

    // 열릴 때 초기 위치(바닥) -> 살짝 위로
    useEffect(() => {
    if (open) {
        setY(0);
    }
    }, [open]);

    // 드래그(터치)로 닫기/열기
    const onTouchStart: React.TouchEventHandler = (e) => {
        startY.current = e.touches[0].clientY;
    };
    const onTouchMove: React.TouchEventHandler = (e) => {
        if (startY.current == null) return;
        const delta = e.touches[0].clientY - startY.current;
        if (delta > 0) setY(Math.min(delta, 400)); // 아래로만
        };
        const onTouchEnd: React.TouchEventHandler = () => {
        if (y > 160) onClose(); // 일정 이상 내리면 닫기
        setY(0);
        startY.current = null;
    };

    return (
        <S.SheetWrapper data-open={open}>
            <S.Sheet
                ref={sheetRef}
                style={{ transform: `translateY(${open ? y : 420}px)` }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
            <S.Grabber />
                {captured && (
                    <S.CapturedRow>
                    <S.CapturedImg src={captured} alt="captured" />
                    <S.CapturedMeta>
                        <div className="label">Captured</div>
                        <div className="hint">스와이프해서 전체 결과를 확인하세요</div>
                    </S.CapturedMeta>
                    </S.CapturedRow>
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
