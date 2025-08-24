// talk/_components/QuickTalkLine.tsx
import * as S from "./QuickTalk.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useCallback, useMemo } from "react";
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

  // 화면 표시 텍스트 = 설정 언어 (zh가 없으면 en → ko 순으로 폴백)
  const displayText = useMemo(() => {
    const map: Record<string, string | undefined> = { ko, en, zh };
    return normalizeBreaks(map[language] ?? en ?? ko);
  }, [language, ko, en, zh]);

  // 사운드는 항상 한국어 발화
  const handleSpeak = useCallback(() => {
    speak(ko); // ✅ lang 옵션 전달 안 함: 유틸에서 ko-KR로 고정
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
          src={IMAGE_CONSTANTS.SoundIcon}
          alt="음성으로 듣기 (한국어)"
          role="button"
          tabIndex={0}
          onClick={handleSpeak}
          onKeyDown={(e) => e.key === "Enter" && handleSpeak()}
          title="음성으로 듣기 (한국어)"
          style={{ marginLeft: 8 }}
        />
      </S.IconWrapper>
    </S.LineWrapper>
  );
};

export default QuickTalkLine;
