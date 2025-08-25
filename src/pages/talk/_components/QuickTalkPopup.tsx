// src/pages/talk/_components/QuickTalkPopup.tsx
import { useEffect, useCallback, MouseEvent, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import * as S from "./QuickTalk.styled";
import { speak } from "../_apis/GetSpeachText";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useLanguage } from "@/components/contexts/LanguageContext";

type Props = {
    open: boolean;
    onClose: () => void;
    ko: string;
    en: string;
    zh?: string;
};

const normalizeBreaks = (s: string) => s.replace(/<br\s*\/?>/gi, "\n");

const QuickTalkPopup = ({ open, onClose, ko, en, zh }: Props) => {
    const { language } = useLanguage();
    const [isSpeaking, setIsSpeaking] = useState(false); // ✅ 상태 추가
    if (!open) return null;

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const handleOverlayClick = useCallback(() => onClose(), [onClose]);
    const stop = useCallback((e: MouseEvent) => e.stopPropagation(), []);

    // 표시 텍스트 = 설정 언어 (폴백 en → ko)
    const displayText = useMemo(() => {
        const map: Record<string, string | undefined> = { ko, en, zh };
        return normalizeBreaks(map[language] ?? en ?? ko);
    }, [language, ko, en, zh]);

    // 한국어로 읽어주기
    const handleSpeak = useCallback(() => {
        setIsSpeaking(true); // ✅ 클릭 시 상태를 true로 설정
        speak(ko);
        
        // ✅ 1초 후에 상태를 false로 되돌림
        setTimeout(() => {
            setIsSpeaking(false);
        }, 1000);
    }, [ko]);

    return ReactDOM.createPortal(
        <S.ModalOverlay onClick={handleOverlayClick}>
            <S.PopupWrapper onClick={stop} role="dialog" aria-modal="true" aria-label="Quick phrase">
                <S.Lines>
                    <S.KoreanLine>{ko}</S.KoreanLine>
                    <S.EnglishLine $isZh={language === "zh"}>{displayText}</S.EnglishLine>
                </S.Lines>
                <S.Sound as="button" type="button" onClick={handleSpeak} aria-label="한국어로 듣기">
                    <img
                        // ✅ 상태에 따라 이미지 소스를 변경
                        src={isSpeaking ? IMAGE_CONSTANTS.SoundIconActive : IMAGE_CONSTANTS.SoundIcon}
                        alt="음성"
                    />
                </S.Sound>
            </S.PopupWrapper>
        </S.ModalOverlay>,
        document.body
    );
};

export default QuickTalkPopup;