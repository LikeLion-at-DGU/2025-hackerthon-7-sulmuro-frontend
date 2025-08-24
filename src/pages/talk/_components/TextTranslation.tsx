import * as S from "./TextTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useTranslate } from "../_hooks/UseTranslation";
import LanguageSheet from "./LanguageSheet"; // ⛳ 타입을 내부에서 정의
import { speak } from "../_apis/GetSpeachText";
import { useLanguage } from "@/components/contexts/LanguageContext";

// ✅ ko/en/zh 3개 언어 코드 통일
type LangCode = "ko" | "en" | "zh";

// 로캘 매핑 (TTS/STT용)
const toLocale = (c: LangCode) =>
  c === "ko" ? "ko-KR" : c === "en" ? "en-US" : "zh-CN";

// 🔧 기본 방향: (컨텍스트 language) -> ko
const DEFAULT_TARGET: LangCode = "ko";
const pickDefaultSource = (ctx: LangCode): LangCode => (ctx === "ko" ? "en" : ctx);

const TextTranslation = () => {
  const navigate = useNavigate();
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

  // 🔧 초기값: source = 컨텍스트 언어(단, ko면 en), target = ko
  const [sourceLanguageCode, setSourceLanguageCode] =
    useState<LangCode>(pickDefaultSource(language));
  const [targetLanguageCode, setTargetLanguageCode] =
    useState<LangCode>(DEFAULT_TARGET);

  // 컨텍스트 language 변경 시 기본 규칙 재적용
  useEffect(() => {
    setTargetLanguageCode(DEFAULT_TARGET); // 항상 ko
    setSourceLanguageCode(pickDefaultSource(language)); // ko면 en, 아니면 그대로
    // 필요 시 번역 결과 초기화가 필요하면 주석 해제
    // reset();
  }, [language]);

  // 입력 텍스트
  const [inputText, setInputText] = useState("");

  // 바텀시트 상태 & 제외 목록
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isTargetOpen, setIsTargetOpen] = useState(false);
  const [sourceExclude, setSourceExclude] = useState<LangCode[]>([]);
  const [targetExclude, setTargetExclude] = useState<LangCode[]>([]);

  const { translate, loading, error, data, reset } = useTranslate({ mode: "recommend" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value);

  // 언어 스왑(그냥 서로 바꿈)
  const handleSwap = () => {
    setSourceLanguageCode(targetLanguageCode);
    setTargetLanguageCode(sourceLanguageCode);
    reset();
  };

  const runTranslate = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;
    try {
      await translate({ sourceLanguageCode, targetLanguageCode, text });
    } catch {}
  }, [inputText, sourceLanguageCode, targetLanguageCode, translate]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") await runTranslate();
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (inputText.trim()) runTranslate();
    }, 400);
    return () => clearTimeout(id);
  }, [inputText, sourceLanguageCode, targetLanguageCode, runTranslate]);

  /** ✅ 번역 결과를 목표 언어 음성으로 재생 */
  const handleSpeak = () => {
    const translated = data?.translatedText?.trim();
    if (!translated) return;
    speak(translated, { lang: toLocale(targetLanguageCode) });
  };

  // 간단한 라벨(필요하면 다국어화 가능)
  const headerTitle = useMemo(
    () => (language === "ko" ? "텍스트 번역" : language === "zh" ? "文本翻译" : "Text Translation"),
    [language]
  );

  // 🔧 placeholder 텍스트를 입력 언어(sourceLanguageCode)에 맞게 동적으로 변경
  const placeholder = useMemo(() => {
    switch (sourceLanguageCode) {
      case "ko":
        return "번역할 문장을 입력하세요";
      case "en":
        return "Enter text to translate";
      case "zh":
        return "输入要翻译的句子";
      default:
        return "Enter text to translate";
    }
  }, [sourceLanguageCode]);

  // 🔧 결과 텍스트(로딩, 에러, 기본 문구)를 목표 언어(targetLanguageCode)에 맞게 동적으로 변경
  const resultText = useMemo(() => {
    if (loading) {
      switch (targetLanguageCode) {
        case "ko":
          return "번역 중...";
        case "en":
          return "Translating...";
        case "zh":
          return "翻译中...";
        default:
          return "Translating...";
      }
    }
    if (error) {
      switch (targetLanguageCode) {
        case "ko":
          return `에러: ${error}`;
        case "en":
          return `Error: ${error}`;
        case "zh":
          return `错误: ${error}`;
        default:
          return `Error: ${error}`;
      }
    }
    if (data?.translatedText) {
      return data.translatedText;
    }
    switch (targetLanguageCode) {
      case "ko":
        return "번역 결과가 여기에 표시됩니다.";
      case "en":
        return "Translation will appear here.";
      case "zh":
        return "翻译结果显示在此处。";
      default:
        return "Translation will appear here.";
    }
  }, [loading, error, data, targetLanguageCode]);

  return (
    <S.Wrapper>
      <S.TopContainer>
        <S.Header>
          <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
          {headerTitle}
        </S.Header>

        <S.LanguageSwitch>
          {/* 입력 언어 선택 */}
          <S.LanguageSelect>
            <S.LanguageTrigger
              type="button"
              onClick={() => {
                setSourceExclude([]);
                setIsSourceOpen(true);
              }}
              aria-haspopup="dialog"
              aria-expanded={isSourceOpen}
            >
              {sourceLanguageCode.toUpperCase()}
              <img src={IMAGE_CONSTANTS.DropDown} alt="▽" />
            </S.LanguageTrigger>
          </S.LanguageSelect>

          <img
            src={IMAGE_CONSTANTS.SwapIcon}
            alt="교환"
            onClick={handleSwap}
            style={{ cursor: "pointer" }}
          />

          {/* 번역(목표) 언어 선택 */}
          <S.LanguageSelect>
            <S.LanguageTrigger
              type="button"
              onClick={() => {
                setTargetExclude([]);
                setIsTargetOpen(true);
              }}
              aria-haspopup="dialog"
              aria-expanded={isTargetOpen}
            >
              {targetLanguageCode.toUpperCase()}
              <img src={IMAGE_CONSTANTS.DropDown} alt="▽" />
            </S.LanguageTrigger>
          </S.LanguageSelect>
        </S.LanguageSwitch>

        <S.TranslateInput
          type="text"
          placeholder={placeholder}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <S.TranslateResult>
          {/* ✅ 클릭 시 목표 언어로 TTS */}
          <img
            src={IMAGE_CONSTANTS.SoundIcon}
            alt="음성 출력"
            onClick={handleSpeak}
            style={{
              cursor: data?.translatedText ? "pointer" : "not-allowed",
              opacity: data?.translatedText ? 1 : 0.5,
            }}
          />
          <p>{resultText}</p>
        </S.TranslateResult>
      </S.TopContainer>

      {/* 바텀시트들 */}
      {isSourceOpen && (
        <LanguageSheet
          setIsOpen={setIsSourceOpen}
          current={sourceLanguageCode}
          exclude={sourceExclude}
          onSelect={(c: LangCode) => {
            setSourceLanguageCode(c);
            if (c === targetLanguageCode) {
              setTargetExclude([c]);
              setTimeout(() => setIsTargetOpen(true), 0);
            }
            reset();
          }}
          title={language === "ko" ? "입력 언어 선택" : language === "zh" ? "选择输入语言" : "Choose input language"}
          subtitle={
            language === "ko" ? "어떤 언어로 입력할까요?" : language === "zh" ? "请选择输入语言" : "Which language will you type?"
          }
        />
      )}
      <S.BottomContainer>
        <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
          <img src={IMAGE_CONSTANTS.ChatIcon} alt="CHAT" />
          <p>Text Translation</p>
        </S.VoiceTranslate>
      </S.BottomContainer>
      {isTargetOpen && (
        <LanguageSheet
          setIsOpen={setIsTargetOpen}
          current={targetLanguageCode}
          exclude={targetExclude}
          onSelect={(c: LangCode) => {
            setTargetLanguageCode(c);
            if (c === sourceLanguageCode) {
              setSourceExclude([c]);
              setTimeout(() => setIsSourceOpen(true), 0);
            }
            reset();
          }}
          title={language === "ko" ? "번역 언어 선택" : language === "zh" ? "选择目标语言" : "Choose target language"}
          subtitle={
            language === "ko" ? "어떤 언어로 번역할까요?" : language === "zh" ? "请选择目标语言" : "Which language to translate to?"
          }
        />
      )}
    </S.Wrapper>
  );
};

export default TextTranslation;