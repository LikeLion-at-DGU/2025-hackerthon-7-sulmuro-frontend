import { useEffect, useRef, useState } from "react";
import * as S from "./SearchResult.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import Chatting from "../_AIChat/Chatting"; 

export type SearchItem = {
    id: string;
    title: string;
    subtitle?: string;
    thumbnail?: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    captured?: string;     
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
                    <S.Result>
                        <S.CapturedImg src={captured} alt="captured" />
                        <S.CapturedResult>
                            <img src={IMAGE_CONSTANTS.ResultIcon} alt ="🔎" />
                            <div className="label">야생의 강근우</div>
                        </S.CapturedResult>
                        <S.CapturedDescription>
                            <div className="hint">
                                매우 난폭하다!<br />
                                매우 잔인하다!<br />
                                매우 잔혹하다!
                            </div>
                        </S.CapturedDescription>
                        <S.ToAIChat>
                            <div className="scrollToAI">스크롤을 올려 AI에게 질문하기</div>
                        </S.ToAIChat>
                        
                    </S.Result>
                )}

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
