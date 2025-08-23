import * as S from "./VoiceTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSpeachText } from "../_hooks/UseSpeachText";

const VoiceTranslation = () => {
    const navigate = useNavigate();

    /** ==============================
     *  첫 번째 언어 박스 상태 (기본: 한국어)
     =============================== */
    const [firstLang, setFirstLang] = useState<"kor" | "eng">("kor");
    const firstLocale = useMemo(
        () => (firstLang === "kor" ? "ko-KR" : "en-US"),
        [firstLang]
    );

    const {
        listening: firstListening,
        supported: firstSupported,
        finalText: firstFinalText,
        interimText: firstInterimText,
        error: firstError,
        start: firstStart,
        stop: firstStop,
        reset: firstReset,
    } = useSpeachText({ lang: firstLocale, continuous: true, interimResults: true });

    const handleFirstMicClick = () => {
        if (!firstSupported) return;
        if (firstListening) firstStop();
        else {
        firstReset();
        firstStart();
        }
    };

    /** ==============================
     *  두 번째 언어 박스 상태 (기본: 영어)
     =============================== */
    const [secondLang, setSecondLang] = useState<"eng" | "kor">("eng");
    const secondLocale = useMemo(
        () => (secondLang === "kor" ? "ko-KR" : "en-US"),
        [secondLang]
    );

    const {
        listening: secondListening,
        supported: secondSupported,
        finalText: secondFinalText,
        interimText: secondInterimText,
        error: secondError,
        start: secondStart,
        stop: secondStop,
        reset: secondReset,
    } = useSpeachText({ lang: secondLocale, continuous: true, interimResults: true });

    const handleSecondMicClick = () => {
        if (!secondSupported) return;
        if (secondListening) secondStop();
        else {
        secondReset();
        secondStart();
        }
    };

    return (
        <S.Wrapper>
        <S.Header>
            <img
            onClick={() => navigate("/talk")}
            src={IMAGE_CONSTANTS.BackIcon2}
            alt="뒤로가기"
            />
            Voice Translation
        </S.Header>

        <S.TranslationWrapper>
            {/* ===== 첫 번째 언어 박스 ===== */}
            <S.FirstLanguageBox>
            <S.FirstLanguageSelect>
                <select
                value={firstLang}
                onChange={(e) =>
                    setFirstLang(e.target.value as "kor" | "eng")
                }
                aria-label="입력 언어 선택"
                >
                <option value="kor">kor</option>
                <option value="eng">eng</option>
                </select>
            </S.FirstLanguageSelect>

            <S.FristLanguageResult>
                {firstSupported ? (
                firstFinalText || firstInterimText ? (
                    <>
                    {firstFinalText}
                    {firstInterimText && (
                        <>
                        {firstFinalText && " "}
                        <span style={{ opacity: 0.5 }}>
                            {firstInterimText}
                        </span>
                        </>
                    )}
                    </>
                ) : firstListening ? (
                    "Listening..."
                ) : (
                    "마이크 버튼을 눌러서 말하세요"
                )
                ) : (
                "이 브라우저는 음성 인식을 지원하지 않아요."
                )}
            </S.FristLanguageResult>

            <S.VoiceIcon
                as="button"
                type="button"
                onClick={handleFirstMicClick}
                aria-label="첫 번째 언어 음성 입력"
            >
                <img
                src={IMAGE_CONSTANTS.VoiceButton}
                alt={firstListening ? "음성 입력 중지" : "음성 입력 시작"}
                style={{ opacity: firstSupported ? 1 : 0.4 }}
                />
            </S.VoiceIcon>

            {firstError && (
                <div style={{ color: "#d9534f", marginTop: 6, fontSize: 12 }}>
                STT Error: {firstError}
                </div>
            )}
            </S.FirstLanguageBox>

            {/* ===== 두 번째 언어 박스 ===== */}
            <S.SecondLanguageBox>
            <S.SecondLanguageSelect>
                <select
                value={secondLang}
                onChange={(e) =>
                    setSecondLang(e.target.value as "eng" | "kor")
                }
                aria-label="출력 언어 선택"
                >
                <option value="eng">eng</option>
                <option value="kor">kor</option>
                </select>
            </S.SecondLanguageSelect>

            <S.SecondLanguageResult>
                {secondSupported ? (
                secondFinalText || secondInterimText ? (
                    <>
                    {secondFinalText}
                    {secondInterimText && (
                        <>
                        {secondFinalText && " "}
                        <span style={{ opacity: 0.5 }}>
                            {secondInterimText}
                        </span>
                        </>
                    )}
                    </>
                ) : secondListening ? (
                    "Listening..."
                ) : (
                    "Tap mic and start speaking"
                )
                ) : (
                "이 브라우저는 음성 인식을 지원하지 않아요."
                )}
            </S.SecondLanguageResult>

            <S.VoiceIcon
                as="button"
                type="button"
                onClick={handleSecondMicClick}
                aria-label="두 번째 언어 음성 입력"
            >
                <img
                src={IMAGE_CONSTANTS.VoiceButton}
                alt={secondListening ? "음성 입력 중지" : "음성 입력 시작"}
                style={{ opacity: secondSupported ? 1 : 0.4 }}
                />
            </S.VoiceIcon>

            {secondError && (
                <div style={{ color: "#d9534f", marginTop: 6, fontSize: 12 }}>
                STT Error: {secondError}
                </div>
            )}
            </S.SecondLanguageBox>
        </S.TranslationWrapper>

        <S.BottomContainer>
            <S.TextTranslate onClick={() => navigate("/talk/text")}>
            <img src={IMAGE_CONSTANTS.ChatIcon} alt="CHAT" />
            <p>Text Translation</p>
            </S.TextTranslate>
        </S.BottomContainer>
        </S.Wrapper>
    );
};

export default VoiceTranslation;
