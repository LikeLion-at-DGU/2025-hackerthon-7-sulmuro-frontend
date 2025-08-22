// talk/_components/QuickTalkPopup.tsx
import { useEffect, useCallback, MouseEvent } from "react";
import ReactDOM from "react-dom";
import * as S from "./QuickTalk.styled";
import { speak } from "../_apis/GetSpeachText";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

type Props = {
    open: boolean;
    onClose: () => void;
    ko: string;
    en: string;
    currentLang: "ko" | "en";
    ttsKoLang?: string;
    ttsEnLang?: string;
};

const QuickTalkPopup = ({
    open,
    onClose,
    ko,
    en,
    currentLang,
    ttsKoLang = "ko-KR",
    ttsEnLang = "en-US",
    }: Props) => {
    if (!open) return null;

    // 바디 스크롤 잠금
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = prev;
        };
    }, []);

    // ESC 닫기
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    // 오버레이 클릭 시 닫기
    const handleOverlayClick = useCallback(() => {
        onClose();
    }, [onClose]);

    // 내부 클릭은 닫힘 방지
    const stop = useCallback((e: MouseEvent) => {
        e.stopPropagation();
    }, []);

    const handleSpeak = useCallback(() => {
        if (currentLang === "ko") speak(ko, { lang: ttsKoLang });
        else speak(en, { lang: ttsEnLang });
    }, [currentLang, ko, en, ttsKoLang, ttsEnLang]);

    // 포털 렌더
    return ReactDOM.createPortal(
        <S.ModalOverlay onClick={handleOverlayClick}>
            <S.PopupWrapper onClick={stop} role="dialog" aria-modal="true" aria-label="Quick phrase">
                <S.Lines>
                    <S.KoreanLine>{ko}</S.KoreanLine>
                    <S.EnglishLine>{en}</S.EnglishLine>
                </S.Lines>
                <S.Sound as="button" type="button" onClick={handleSpeak} aria-label="현재 언어로 듣기">
                <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성" />
                </S.Sound>
            </S.PopupWrapper>
        </S.ModalOverlay>,
        document.body
    );
};

export default QuickTalkPopup;
