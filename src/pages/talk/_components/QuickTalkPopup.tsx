// talk/_components/QuickTalkPopup.tsx
import { useEffect, useCallback, MouseEvent, useMemo } from "react";
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

    // 항상 한국어로만 읽어주기
    const handleSpeak = useCallback(() => {
        speak(ko); // ✅ ko-KR 고정
    }, [ko]);

    return ReactDOM.createPortal(
        <S.ModalOverlay onClick={handleOverlayClick}>
        <S.PopupWrapper onClick={stop} role="dialog" aria-modal="true" aria-label="Quick phrase">
            <S.Lines>
            {/* 화면에는 설정 언어로 표시 */}
            <div style={{ whiteSpace: "pre-line", fontSize: 16 }}>{displayText}</div>

            {/* 참조용 한국어 원문 + 음성 출력 안내 */}
            <div style={{ marginTop: 8, color: "#666", fontSize: 13 }}>
                🇰🇷 음성 출력(한국어): {ko}
            </div>
            </S.Lines>

            <S.Sound as="button" type="button" onClick={handleSpeak} aria-label="한국어로 듣기">
            <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성" />
            </S.Sound>
        </S.PopupWrapper>
        </S.ModalOverlay>,
        document.body
    );
};

export default QuickTalkPopup;
