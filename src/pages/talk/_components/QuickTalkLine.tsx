// talk/_components/QuickTalkLine.tsx
import * as S from "./QuickTalk.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useCallback, useMemo } from "react";
import { speak } from "../_apis/GetSpeachText";

type Props = {
    ko: string;
    en: string;
    currentLang: "ko" | "en";                   // 🔸 전역 언어 상태를 부모로부터 받음
    onOpenPopup: (payload: { ko: string; en: string }) => void; // 🔸 팝업 열기
    ttsKoLang?: string;
    ttsEnLang?: string;
};

const QuickTalkLine = ({
    ko,
    en,
    currentLang,
    onOpenPopup,
    ttsKoLang = "ko-KR",
    ttsEnLang = "en-US",
    }: Props) => {
    const displayText = useMemo(() => (currentLang === "ko" ? ko : en), [currentLang, ko, en]);

    const handleSpeak = useCallback(() => {
        if (currentLang === "ko") speak(ko, { lang: ttsKoLang });
        else speak(en, { lang: ttsEnLang });
    }, [currentLang, ko, en, ttsKoLang, ttsEnLang]);

    const handleOpenPopup = useCallback(() => {
        onOpenPopup({ ko, en });
    }, [onOpenPopup, ko, en]);

    return (
        <S.LineWrapper>
        {displayText}
        <S.IconWrapper>
            {/* 🔄 기존 '언어 교환' 아이콘 자리에 '팝업 열기' 배치 */}
            <img
                src={IMAGE_CONSTANTS.SwitchIcon}      // 필요시 Popup 전용 아이콘으로 교체 가능
                alt="자세히 보기"
                role="button"
                tabIndex={0}
                onClick={handleOpenPopup}
                onKeyDown={(e) => e.key === "Enter" && handleOpenPopup()}
                title="자세히 보기 (팝업 열기)"
            />
            {/* 🔊 현재 표시 언어에 맞춰 하나의 스피커만 표시 */}
            <img
            src={IMAGE_CONSTANTS.SoundIcon}
            alt="음성으로 듣기"
            role="button"
            tabIndex={0}
            onClick={handleSpeak}
            onKeyDown={(e) => e.key === "Enter" && handleSpeak()}
            title="음성으로 듣기"
            style={{ marginLeft: 8 }}
            />
        </S.IconWrapper>
        </S.LineWrapper>
    );
};

export default QuickTalkLine;
