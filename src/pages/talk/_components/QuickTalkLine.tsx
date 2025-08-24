// src/pages/talk/_components/QuickTalkLine.tsx
import * as S from "./QuickTalk.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useCallback, useMemo, useState } from "react";
import { speak } from "../_apis/GetSpeachText";
import { useLanguage } from "@/components/contexts/LanguageContext";

type Props = {
  ko: string;
  en: string;
  zh?: string;
  onOpenPopup: (payload: { ko: string; en: string; zh?: string }) => void;
};

const normalizeBreaks = (s: string) => s.replace(/<br\s*\/?>/gi, "\n");

const QuickTalkLine = ({ ko, en, zh, onOpenPopup }: Props) => {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false); // ✅ 상태 추가

  const displayText = useMemo(() => {
    const map: Record<string, string | undefined> = { ko, en, zh };
    return normalizeBreaks(map[language] ?? en ?? ko);
  }, [language, ko, en, zh]);

  const handleSpeak = useCallback(() => {
    setIsSpeaking(true); // ✅ 클릭 시 상태를 true로 설정
    speak(ko);
    
    // ✅ 1초 후에 상태를 false로 되돌림
    setTimeout(() => {
      setIsSpeaking(false);
    }, 1000); 
  }, [ko]);

  const handleOpenPopup = useCallback(() => {
    onOpenPopup({ ko, en, zh });
  }, [onOpenPopup, ko, en, zh]);

  return (
    <S.LineWrapper>
      <span style={{ whiteSpace: "pre-line" }}>{displayText}</span>
      <S.IconWrapper>
        <img
          src={IMAGE_CONSTANTS.SwitchIcon}
          alt="자세히 보기"
          role="button"
          tabIndex={0}
          onClick={handleOpenPopup}
          onKeyDown={(e) => e.key === "Enter" && handleOpenPopup()}
          title="자세히 보기 (팝업 열기)"
        />
        <img
          // ✅ 상태에 따라 이미지 소스를 변경
          src={isSpeaking ? IMAGE_CONSTANTS.SoundIconActive : IMAGE_CONSTANTS.SoundIcon}
          alt="음성으로 듣기 (한국어)"
          role="button"
          tabIndex={0}
          onClick={handleSpeak}
          onKeyDown={(e) => e.key === "Enter" && handleSpeak()}
          title="음성으로 듣기 (한국어)"
          style={{ marginLeft: 8 }}
        />
        {/* ✅ 불필요한 이미지 제거: 이제 위 img 태그에서 상태를 관리합니다. */}
      </S.IconWrapper>
    </S.LineWrapper>
  );
};

export default QuickTalkLine;