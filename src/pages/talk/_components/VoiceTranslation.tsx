// talk/_components/VoiceTranslation.tsx
import * as S from "./VoiceTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSpeachText } from "../_hooks/UseSpeachText";
import { useTranslate } from "../_hooks/UseTranslation"; // ✅ 기본 번역 훅 (mode: 'basic')

type KORENG = "kor" | "eng";
const toApiLang = (v: KORENG): "ko" | "en" => (v === "kor" ? "ko" : "en");

const VoiceTranslation = () => {
    const navigate = useNavigate();

    /** ==============================
     *  첫 번째 언어 박스 (입력 기본: 한국어)
     =============================== */
    const [firstLang, setFirstLang] = useState<"kor" | "eng">("kor");
    const firstLocale = useMemo(() => (firstLang === "kor" ? "ko-KR" : "en-US"), [firstLang]);

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
            resetAllForNewSession();
            firstStart(); // 첫 번째 STT만 시작
    };

    /** ==============================
     *  두 번째 언어 박스 (출력 기본: 영어)
     =============================== */
    const [secondLang, setSecondLang] = useState<"eng" | "kor">("eng");
    const secondLocale = useMemo(() => (secondLang === "kor" ? "ko-KR" : "en-US"), [secondLang]);

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
        resetAllForNewSession();
        secondStart(); // 두 번째 STT만 시작
    };

    /** ==============================
     *  번역 훅 (기본 번역)
     *  - first -> second
     *  - second -> first
     =============================== */
    const {
        translate: translateBasic,
        loading: translating,
        error: translateError,
        reset: resetTranslate,
    } = useTranslate({ mode: "basic" });

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
    // 1) 번역 결과 초기화
    setToSecondInterim("");
    setToSecondFinal("");
    setToFirstInterim("");
    setToFirstFinal("");

    // 2) 디바운스 타이머 정리
    if (firstDebounceRef.current) {
        window.clearTimeout(firstDebounceRef.current);
        firstDebounceRef.current = null;
    }
    if (secondDebounceRef.current) {
        window.clearTimeout(secondDebounceRef.current);
        secondDebounceRef.current = null;
    }

    // 3) 번역 훅 상태 초기화
    resetTranslate?.();

    // 4) 양쪽 STT 중지/리셋 (둘 다 깨끗하게)
    try {
        firstStop?.();
    } catch {}
    try {
        secondStop?.();
    } catch {}
    try {
        firstReset?.();
    } catch {}
    try {
        secondReset?.();
    } catch {}
    };
    
    /** ==============================
     *  first(입력) -> second(출력) 번역
     *  - interimText: 500ms 디바운스 번역 → toSecondInterim에 반영
     *  - finalText: 즉시 번역 → toSecondFinal에 반영하고 interim은 지움
     =============================== */
    useEffect(() => {
        const txt = (firstInterimText || "").trim();
        if (!txt) {
        setToSecondInterim("");
        return;
        }
        const source = toApiLang(firstLang);
        const target = toApiLang(secondLang as KORENG);

        debounce(async () => {
        try {
            const data = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
            setToSecondInterim(data.translatedText || "");
        } catch {
            // 훅이 에러 상태를 관리하므로 추가 처리 불필요
        }
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
        const target = toApiLang(secondLang as KORENG);

        (async () => {
        try {
            const data = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
            setToSecondFinal(data.translatedText || "");
            setToSecondInterim(""); // 최종이 오면 중간은 비움
        } catch {}
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstFinalText, firstLang, secondLang]);

    /** ==============================
     *  second(입력) -> first(출력) 번역
     =============================== */
    useEffect(() => {
        const txt = (secondInterimText || "").trim();
        if (!txt) {
        setToFirstInterim("");
        return;
        }
        const source = toApiLang(secondLang as KORENG);
        const target = toApiLang(firstLang);

        debounce(async () => {
        try {
            const data = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
            setToFirstInterim(data.translatedText || "");
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
        const source = toApiLang(secondLang as KORENG);
        const target = toApiLang(firstLang);

        (async () => {
        try {
            const data = await translateBasic({ sourceLanguageCode: source, targetLanguageCode: target, text: txt });
            setToFirstFinal(data.translatedText || "");
            setToFirstInterim("");
        } catch {}
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondFinalText, secondLang, firstLang]);

    // 언어가 바뀌면 기존 번역 상태 초기화(혼선 방지)
    useEffect(() => {
        setToSecondInterim("");
        setToSecondFinal("");
        setToFirstInterim("");
        setToFirstFinal("");
        resetTranslate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstLang, secondLang]);

    // 두 박스의 표시 로직:
    // - 상대 번역 결과가 있으면 그것을 우선 노출 (final > interim)
    // - 없으면 기존 STT 결과 노출
    const renderFirstBoxText = () => {
        if (toFirstFinal) return toFirstFinal;
        if (toFirstInterim) return <>{toFirstInterim}</>;
        // 번역 결과가 없을 때 STT 표시
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
        return firstListening ? "Listening..." : "마이크 버튼을 눌러서 말하세요";
    };

    const renderSecondBoxText = () => {
        if (toSecondFinal) return toSecondFinal;
        if (toSecondInterim) return <>{toSecondInterim}</>;
        // 번역 결과가 없을 때 STT 표시
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
        return secondListening ? "Listening..." : "Tap mic and start speaking";
    };

    return (
        <S.Wrapper>
        <S.Header>
            <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
            Voice Translation
        </S.Header>

        <S.TranslationWrapper>
            {/* ===== 첫 번째 언어 박스 ===== */}
            <S.FirstLanguageBox>
            <S.FirstLanguageSelect>
                <select
                value={firstLang}
                onChange={(e) => setFirstLang(e.target.value as "kor" | "eng")}
                aria-label="입력 언어 선택"
                >
                <option value="kor">kor</option>
                <option value="eng">eng</option>
                </select>
            </S.FirstLanguageSelect>

            <S.FristLanguageResult>{renderFirstBoxText()}</S.FristLanguageResult>

            <S.VoiceIcon
                as="button"
                type="button"
                onClick={handleFirstMicClick}
                aria-label="첫 번째 언어 음성 입력"
            >
                {/* ✅ 첫 번째 언어만 listening 상태일 때만 녹음 버튼 표시 */}
                {firstListening ? (
                    <img
                        src={IMAGE_CONSTANTS.RecordingButtonRed}
                        alt="음성 입력 중지"
                        style={{ opacity: firstSupported ? 1 : 0.4 }}
                    />
                ) : (
                    <img
                        src={IMAGE_CONSTANTS.VoiceButton}
                        alt="음성 입력 시작"
                        style={{ opacity: firstSupported ? 1 : 0.4 }}
                    />
                )}
            </S.VoiceIcon>
            </S.FirstLanguageBox>

            {/* ===== 두 번째 언어 박스 ===== */}
            <S.SecondLanguageBox>
            <S.SecondLanguageSelect>
                <select
                value={secondLang}
                onChange={(e) => setSecondLang(e.target.value as "eng" | "kor")}
                aria-label="출력 언어 선택"
                >
                <option value="eng">eng</option>
                <option value="kor">kor</option>
                </select>
            </S.SecondLanguageSelect>

            <S.SecondLanguageResult>{renderSecondBoxText()}</S.SecondLanguageResult>

            <S.VoiceIcon
                as="button"
                type="button"
                onClick={handleSecondMicClick}
                aria-label="두 번째 언어 음성 입력"
            >
                {/* ✅ 두 번째 언어만 listening 상태일 때만 검은색 버튼 표시 */}
                {secondListening ? (
                    <img
                        src={IMAGE_CONSTANTS.RecordingButtonBlack}
                        alt="음성 입력 중지"
                        style={{ opacity: secondSupported ? 1 : 0.4 }}
                    />
                ) : (
                    <img
                        src={IMAGE_CONSTANTS.VoiceButtonBlack}
                        alt="음성 입력 시작"
                        style={{ opacity: secondSupported ? 1 : 0.4 }}
                    />
                )}
            </S.VoiceIcon>

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
