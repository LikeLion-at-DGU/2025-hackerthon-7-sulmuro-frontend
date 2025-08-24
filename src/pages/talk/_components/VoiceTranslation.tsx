import * as S from "./VoiceTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSpeachText } from "../_hooks/UseSpeachText";
import { useTranslate } from "../_hooks/UseTranslation";
import { useLanguage } from "@/components/contexts/LanguageContext";
import LanguageSheet from "./LanguageSheet"; // ✅ 제네릭 시트 재사용

// ✅ ko/en/zh 확장
type UIChoice = "ko" | "en" | "zh"; // 드롭다운 value
type ApiCode = "ko" | "en" | "zh"; // 번역 API 코드

const toApiLang = (v: UIChoice): ApiCode => (v === "ko" ? "ko" : v === "en" ? "en" : "zh");
const toLocale = (v: UIChoice) => (v === "ko" ? "ko-KR" : v === "en" ? "en-US" : "zh-CN");

// 컨텍스트 언어를 "출력 박스(second)"에 반영
const secondFromCtx = (ctx: "ko" | "en" | "zh"): UIChoice =>
  ctx === "ko" ? "ko" : ctx === "en" ? "en" : "zh";

// second(출력)가 정해졌을 때 추천 입력(first)
const defaultFirstForSecond = (second: UIChoice): UIChoice => {
  // 한국 현장 가정: second가 ko이 아니면 first는 ko, second가 ko이면 first는 en
  return second === "ko" ? "en" : "ko";
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
    ko: "한국어",
    en: "영어",
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
    ko: "Korean", // 'koean' -> 'Korean'
    en: "English", // 'enlish' -> 'English'
    zh: "Chinese", // 'zhnese' -> 'Chinese'
  },
  zh: {
    header: "语音翻译",
    chooseInput: "选择输入语言",
    chooseOutput: "选择输出语言",
    listening: "正在聆听…",
    tapMic: "点击麦克风并开始说话",
    back: "返回",
    textTranslation: "文本翻译",
    ko: "韩语",
    en: "英语",
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

  //language sheet open
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [firstExclude, setFirstExclude] = useState<UIChoice[]>([]);
  const [secondExclude, setSecondExclude] = useState<UIChoice[]>([]);
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
        setToSecondInterim(resp?.translatedText ?? "");
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
        if (!resp) return; // 요청이 취소된 경우
        setToSecondFinal(resp.translatedText ?? "");
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
        setToFirstInterim(resp?.translatedText ?? "");
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
        if (!resp) return; // 요청이 취소된 경우
        setToFirstFinal(resp.translatedText ?? "");
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
    // 🟢 첫 번째 박스의 언어에 맞는 텍스트 객체 가져오기
    const firstLabels = labels[firstLang];
    
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
    // 🟢 첫 번째 박스의 언어에 맞는 텍스트 사용
    return firstListening ? firstLabels.listening : firstLabels.tapMic;
  };

  const renderSecondBoxText = () => {
    // 🟢 두 번째 박스의 언어에 맞는 텍스트 객체 가져오기
    const secondLabels = labels[secondLang];
    
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
    // 🟢 두 번째 박스의 언어에 맞는 텍스트 사용
    return secondListening ? secondLabels.listening : secondLabels.tapMic;
  };

  const VOICE_OPTIONS = useMemo(
    () =>
      [
        { code: "ko", label: labels.ko.ko, short: "KR" },
        { code: "en", label: labels.en.en, short: "EN" },
        { code: "zh", label: labels.zh.zh, short: "ZH" },
      ] as const,
    []
  );

  return (
    <S.Wrapper>
        <S.Header>
            <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt={t.back} />
            {t.header}
        </S.Header>

        <S.TranslationWrapper>
          <S.FirstLanguageBox>
            <S.FirstLanguageSelect>
              <S.LanguageTrigger
                type="button"
                boxType="first"
                onClick={() => {
                  setFirstExclude([]); // 직접 열 때 제한 없음
                  setIsFirstOpen(true);
                }}
                aria-haspopup="dialog"
                aria-expanded={isFirstOpen}
              >
                {firstLang.toUpperCase()}
                <img src={IMAGE_CONSTANTS.DropDownRed} alt="▽" />
              </S.LanguageTrigger>
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
              <S.LanguageTrigger
                type="button"
                boxType="second"
                onClick={() => {
                  setSecondExclude([]);
                  setIsSecondOpen(true);
                }}
                aria-haspopup="dialog"
                aria-expanded={isSecondOpen}
              >
                {secondLang.toUpperCase()}
                <img src={IMAGE_CONSTANTS.DropDown} alt="▽" />
              </S.LanguageTrigger>
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

      {/* 첫 번째 시트 */}
      {isFirstOpen && (
        <LanguageSheet
          setIsOpen={setIsFirstOpen}
          current={firstLang}
          exclude={firstExclude}
          options={VOICE_OPTIONS}
          onSelect={(c) => {
            setFirstLang(c);
            if (c === secondLang) {
              setSecondExclude([c]);
              setTimeout(() => setIsSecondOpen(true), 0);
            }
          }}
          title={t.chooseInput}
          subtitle=""
        />
      )}

      {/* 두 번째 시트 */}
      {isSecondOpen && (
        <LanguageSheet
          setIsOpen={setIsSecondOpen}
          current={secondLang}
          exclude={secondExclude}
          options={VOICE_OPTIONS}
          onSelect={(c) => {
            setSecondLang(c);
            if (c === firstLang) {
              setFirstExclude([c]);
              setTimeout(() => setIsFirstOpen(true), 0);
            }
          }}
          title={t.chooseOutput}
          subtitle=""
        />
      )}
    </S.Wrapper>
  );
};

export default VoiceTranslation;