// talk/_components/VoiceTranslation.tsx
import * as S from "./VoiceTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSpeachText } from "../_hooks/UseSpeachText";
import { useTranslate } from "../_hooks/UseTranslation";
import { useLanguage } from "@/components/contexts/LanguageContext";

// ✅ ko/en/zh 확장
type UIChoice = "kor" | "eng" | "chi";            // 드롭다운 value
type ApiCode = "ko" | "en" | "zh";                // 번역 API 코드

const toApiLang = (v: UIChoice): ApiCode => (v === "kor" ? "ko" : v === "eng" ? "en" : "zh");
const toLocale = (v: UIChoice) => (v === "kor" ? "ko-KR" : v === "eng" ? "en-US" : "zh-CN");

// 컨텍스트 언어를 "출력 박스(second)"에 반영
const secondFromCtx = (ctx: "ko" | "en" | "zh"): UIChoice =>
  ctx === "ko" ? "kor" : ctx === "en" ? "eng" : "chi";

// second(출력)가 정해졌을 때 추천 입력(first)
const defaultFirstForSecond = (second: UIChoice): UIChoice => {
  // 한국 현장 가정: second가 kor이 아니면 first는 kor, second가 kor이면 first는 eng
  return second === "kor" ? "eng" : "kor";
};

// ✅ UI 라벨 다국어
const labels = {
  ko: {
    header: "음성 번역",
    chooseInput: "입력 언어 선택",
    chooseOutput: "출력 언어 선택",
    listening: "듣는 중...",
    tapMic: "마이크 버튼을 눌러서 말하세요",
    back: "뒤로가기",
    textTranslation: "텍스트 번역",
    kor: "한국어",
    eng: "영어",
    zh: "중국어",
  },
  en: {
    header: "Voice Translation",
    chooseInput: "Choose input language",
    chooseOutput: "Choose output language",
    listening: "Listening...",
    tapMic: "Tap mic and start speaking",
    back: "Back",
    textTranslation: "Text Translation",
    kor: "Korean",
    eng: "English",
    zh: "Chinese",
  },
  zh: {
    header: "语音翻译",
    chooseInput: "选择输入语言",
    chooseOutput: "选择输出语言",
    listening: "正在聆听…",
    tapMic: "点击麦克风并开始说话",
    back: "返回",
    textTranslation: "文本翻译",
    kor: "韩语",
    eng: "英语",
    zh: "中文",
  },
} as const;

const VoiceTranslation = () => {
  const navigate = useNavigate();
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'
  const t = labels[language];

  // ✅ 컨텍스트 반영: secondLang = language, firstLang = 추천값
  const [secondLang, setSecondLang] = useState<UIChoice>(secondFromCtx(language));
  const [firstLang, setFirstLang] = useState<UIChoice>(defaultFirstForSecond(secondFromCtx(language)));

  // 컨텍스트 변경 시 박스 언어 재설정(혼선 방지)
  useEffect(() => {
    const nextSecond = secondFromCtx(language);
    setSecondLang(nextSecond);
    setFirstLang((prev) => (prev === nextSecond ? defaultFirstForSecond(nextSecond) : prev));
  }, [language]);

  const firstLocale = useMemo(() => toLocale(firstLang), [firstLang]);
  const secondLocale = useMemo(() => toLocale(secondLang), [secondLang]);

  // ===== 첫 번째(입력) STT =====
  const {
    listening: firstListening,
    supported: firstSupported,
    finalText: firstFinalText,
    interimText: firstInterimText,
    start: firstStart,
    stop: firstStop,
    reset: firstReset,
  } = useSpeachText({ lang: firstLocale, continuous: true, interimResults: true });

  const handleFirstMicClick = () => {
    if (!firstSupported) return;
    resetAllForNewSession();
    firstStart();
  };

  // ===== 두 번째(입력) STT =====
  const {
    listening: secondListening,
    supported: secondSupported,
    finalText: secondFinalText,
    interimText: secondInterimText,
    start: secondStart,
    stop: secondStop,
    reset: secondReset,
  } = useSpeachText({ lang: secondLocale, continuous: true, interimResults: true });

  const handleSecondMicClick = () => {
    if (!secondSupported) return;
    resetAllForNewSession();
    secondStart();
  };

  // 번역 훅
  const { translate: translateBasic, reset: resetTranslate } = useTranslate({ mode: "basic" });

  // 상대 박스에 표시할 번역 결과 상태
  const [toSecondInterim, setToSecondInterim] = useState<string>("");
  const [toSecondFinal, setToSecondFinal] = useState<string>("");
  const [toFirstInterim, setToFirstInterim] = useState<string>("");
  const [toFirstFinal, setToFirstFinal] = useState<string>("");

  // 디바운스 타이머
  const firstDebounceRef = useRef<number | null>(null);
  const secondDebounceRef = useRef<number | null>(null);

  // 유틸: 디바운스 실행
  const debounce = (fn: () => void, delay: number, ref: React.MutableRefObject<number | null>) => {
    if (ref.current) window.clearTimeout(ref.current);
    ref.current = window.setTimeout(() => {
      ref.current = null;
      fn();
    }, delay);
  };

  const resetAllForNewSession = () => {
    setToSecondInterim("");
    setToSecondFinal("");
    setToFirstInterim("");
    setToFirstFinal("");

    if (firstDebounceRef.current) {
      window.clearTimeout(firstDebounceRef.current);
      firstDebounceRef.current = null;
    }
    if (secondDebounceRef.current) {
      window.clearTimeout(secondDebounceRef.current);
      secondDebounceRef.current = null;
    }

    resetTranslate?.();

    try { firstStop?.(); } catch {}
    try { secondStop?.(); } catch {}
    try { firstReset?.(); } catch {}
    try { secondReset?.(); } catch {}
  };

  // ===== first(입력) -> second(출력) =====
  useEffect(() => {
    const txt = (firstInterimText || "").trim();
    if (!txt) {
      setToSecondInterim("");
      return;
    }
    const source = toApiLang(firstLang);
    const target = toApiLang(secondLang);

    debounce(async () => {
      try {
        const resp = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
        setToSecondInterim(resp.translatedText || "");
      } catch {}
    }, 500, firstDebounceRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInterimText, firstLang, secondLang]);

  useEffect(() => {
    const txt = (firstFinalText || "").trim();
    if (!txt) return;
    if (firstDebounceRef.current) {
      window.clearTimeout(firstDebounceRef.current);
      firstDebounceRef.current = null;
    }
    const source = toApiLang(firstLang);
    const target = toApiLang(secondLang);

    (async () => {
      try {
        const resp = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
        setToSecondFinal(resp.translatedText || "");
        setToSecondInterim("");
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstFinalText, firstLang, secondLang]);

  // ===== second(입력) -> first(출력) =====
  useEffect(() => {
    const txt = (secondInterimText || "").trim();
    if (!txt) {
      setToFirstInterim("");
      return;
    }
    const source = toApiLang(secondLang);
    const target = toApiLang(firstLang);

    debounce(async () => {
      try {
        const resp = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
        setToFirstInterim(resp.translatedText || "");
      } catch {}
    }, 500, secondDebounceRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondInterimText, secondLang, firstLang]);

  useEffect(() => {
    const txt = (secondFinalText || "").trim();
    if (!txt) return;
    if (secondDebounceRef.current) {
      window.clearTimeout(secondDebounceRef.current);
      secondDebounceRef.current = null;
    }
    const source = toApiLang(secondLang);
    const target = toApiLang(firstLang);

    (async () => {
      try {
        const resp = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
        setToFirstFinal(resp.translatedText || "");
        setToFirstInterim("");
      } catch {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondFinalText, secondLang, firstLang]);

  // 언어 바뀌면 번역 상태 초기화
  useEffect(() => {
    setToSecondInterim("");
    setToSecondFinal("");
    setToFirstInterim("");
    setToFirstFinal("");
    resetTranslate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLang, secondLang]);

  // 박스 문구 현지화
  const renderFirstBoxText = () => {
    if (toFirstFinal) return toFirstFinal;
    if (toFirstInterim) return <>{toFirstInterim}</>;
    if (firstFinalText || firstInterimText) {
      return (
        <>
          {firstFinalText}
          {firstInterimText && (
            <>
              {firstFinalText && " "}
              <span style={{ opacity: 0.5 }}>{firstInterimText}</span>
            </>
          )}
        </>
      );
    }
    return firstListening ? t.listening : t.tapMic;
  };

  const renderSecondBoxText = () => {
    if (toSecondFinal) return toSecondFinal;
    if (toSecondInterim) return <>{toSecondInterim}</>;
    if (secondFinalText || secondInterimText) {
      return (
        <>
          {secondFinalText}
          {secondInterimText && (
            <>
              {secondFinalText && " "}
              <span style={{ opacity: 0.5 }}>{secondInterimText}</span>
            </>
          )}
        </>
      );
    }
    return secondListening ? t.listening : t.tapMic;
  };

  return (
    <S.Wrapper>
      <S.Header>
        <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt={t.back} />
        {t.header}
      </S.Header>

      <S.TranslationWrapper>
        {/* ===== 첫 번째 언어 박스 ===== */}
        <S.FirstLanguageBox>
          <S.FirstLanguageSelect>
            <select
              value={firstLang}
              onChange={(e) => setFirstLang(e.target.value as UIChoice)}
              aria-label={t.chooseInput}
            >
              <option value="kor">{t.kor}</option>
              <option value="eng">{t.eng}</option>
              <option value="chi">{t.zh}</option>
            </select>
          </S.FirstLanguageSelect>

          <S.FristLanguageResult>{renderFirstBoxText()}</S.FristLanguageResult>

          <S.VoiceIcon as="button" type="button" onClick={handleFirstMicClick} aria-label={t.chooseInput}>
            {firstListening ? (
              <img src={IMAGE_CONSTANTS.RecordingButtonRed} alt={t.listening} style={{ opacity: firstSupported ? 1 : 0.4 }} />
            ) : (
              <img src={IMAGE_CONSTANTS.VoiceButton} alt={t.chooseInput} style={{ opacity: firstSupported ? 1 : 0.4 }} />
            )}
          </S.VoiceIcon>
        </S.FirstLanguageBox>

        {/* ===== 두 번째 언어 박스 ===== */}
        <S.SecondLanguageBox>
          <S.SecondLanguageSelect>
            <select
              value={secondLang}
              onChange={(e) => setSecondLang(e.target.value as UIChoice)}
              aria-label={t.chooseOutput}
            >
              <option value="eng">{t.eng}</option>
              <option value="kor">{t.kor}</option>
              <option value="chi">{t.zh}</option>
            </select>
          </S.SecondLanguageSelect>

          <S.SecondLanguageResult>{renderSecondBoxText()}</S.SecondLanguageResult>

          <S.VoiceIcon as="button" type="button" onClick={handleSecondMicClick} aria-label={t.chooseOutput}>
            {secondListening ? (
              <img
                src={IMAGE_CONSTANTS.RecordingButtonBlack}
                alt={t.listening}
                style={{ opacity: secondSupported ? 1 : 0.4 }}
              />
            ) : (
              <img
                src={IMAGE_CONSTANTS.VoiceButtonBlack}
                alt={t.chooseOutput}
                style={{ opacity: secondSupported ? 1 : 0.4 }}
              />
            )}
          </S.VoiceIcon>
        </S.SecondLanguageBox>
      </S.TranslationWrapper>

      <S.BottomContainer>
        <S.TextTranslate onClick={() => navigate("/talk/text")}>
          <img src={IMAGE_CONSTANTS.ChatIcon} alt="CHAT" />
          <p>{t.textTranslation}</p>
        </S.TextTranslate>
      </S.BottomContainer>
    </S.Wrapper>
  );
};

export default VoiceTranslation;
