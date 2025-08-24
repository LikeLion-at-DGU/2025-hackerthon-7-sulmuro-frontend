// talk/_components/TextTranslation.tsx
import * as S from "./TextTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
// import { useEffect, useMemo, useState } from "react";
import { useEffect, useState } from "react";

import { useTranslate } from "../_hooks/UseTranslation";
// import { speak } from "../_apis/GetSpeachText";

const TextTranslation = () => {
    const navigate = useNavigate();

    // 번역기능용
    const [inputText, setInputText] = useState("");
    const [sourceLanguageCode, setSourceLanguageCode] = useState<"en" | "ko">("en");
    const [targetLanguageCode, setTargetLanguageCode] = useState<"en" | "ko">("ko");

    // ✅ 추천문장 포함 모드
    const { translate, loading, error, data, reset } = useTranslate({ mode: "recommend" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleSwap = () => {
        setSourceLanguageCode((prev) => (prev === "en" ? "ko" : "en"));
        setTargetLanguageCode((prev) => (prev === "en" ? "ko" : "en"));
        reset();
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") await runTranslate();
    };

    const runTranslate = async () => {
        const text = inputText.trim();
        if (!text) return;
        try {
        await translate({ sourceLanguageCode, targetLanguageCode, text });
        } catch {}
    };

    useEffect(() => {
        const id = setTimeout(() => {
        if (inputText.trim()) runTranslate();
        }, 400);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText, sourceLanguageCode, targetLanguageCode]);

    // (선택) 추천문장 TTS 언어코드
    // const targetLocale = useMemo(() => (targetLanguageCode === "ko" ? "ko-KR" : "en-US"), [targetLanguageCode]);

    return (
        <S.Wrapper>
        <S.TopContainer>
            <S.Header>
            <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
            Text Translation
            </S.Header>

            <S.LanguageSwitch>
            <S.LanguageSelect>
                <select value={sourceLanguageCode} onChange={(e) => setSourceLanguageCode(e.target.value as "en" | "ko")}>
                <option value="en">eng</option>
                <option value="ko">kor</option>
                </select>
            </S.LanguageSelect>

            <img src={IMAGE_CONSTANTS.SwapIcon} alt="교환" onClick={handleSwap} style={{ cursor: "pointer" }} />

            <S.LanguageSelect>
                <select value={targetLanguageCode} onChange={(e) => setTargetLanguageCode(e.target.value as "en" | "ko")}>
                <option value="en">eng</option>
                <option value="ko">kor</option>
                </select>
            </S.LanguageSelect>
            </S.LanguageSwitch>

            <S.TranslateInput
            type="text"
            placeholder="Enter text to translate"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            />

            <S.TranslateResult>
            <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성 출력" />
            <p>
                {loading && "Translating..."}
                {error && `에러: ${error}`}
                {!loading && !error && (data?.translatedText || "번역 결과가 여기에 표시됩니다.")}
            </p>
            </S.TranslateResult>
        </S.TopContainer>

        <S.BottomContainer>
            <S.RecommendedLines>
            <p>Try this</p>

            {/* ✅ 추천문장 렌더링: API의 recommendations 사용 */}
            {data?.recommendations?.length
                ? data.recommendations.map((rec, idx) => (
                    <S.Line
                    key={idx}
                    // 클릭 시 추천문장의 "target(번역문)"을 입력창에 세팅 → 즉시 상단 번역 결과도 반영됨
                    //   onClick={() => setInputText(rec.target)}
                    style={{ cursor: "pointer" }}
                    >
                    <S.TextContainer>
                        {/* source는 원문(= sourceLanguageCode), target은 번역문(= targetLanguageCode) */}
                        <S.KoreanLine>
                        {sourceLanguageCode === "ko" ? rec.source : rec.target /* UI 언어와 맞춰 교체해도 됨 */}
                        </S.KoreanLine>
                        <S.EnglishLine>
                        {targetLanguageCode === "en" ? rec.target : rec.source /* 반대 언어로 배치 */}
                        </S.EnglishLine>
                    </S.TextContainer>

                    <S.IconContainer
                        onClick={(e) => {
                        e.stopPropagation();
                        // (선택) 추천문장 음성 출력: target(번역 결과)을 재생
                        // speak?.(rec.target, { lang: targetLocale });
                        }}
                        role="button"
                        aria-label="추천문장 음성 출력"
                        title="추천문장 음성 출력"
                    >
                        <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성 출력" />
                    </S.IconContainer>
                    </S.Line>
                ))
                : // 추천문장이 아직 없으면 기본 예시 한 줄
                (
                    <S.Line onClick={() => setInputText("Can you give a discount?")} style={{ cursor: "pointer" }}>
                    <S.TextContainer>
                        <S.KoreanLine>조금 깎아주실 수 있나요?</S.KoreanLine>
                        <S.EnglishLine>Can you give a discount?</S.EnglishLine>
                    </S.TextContainer>
                    <S.IconContainer>
                        <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성 출력" />
                    </S.IconContainer>
                    </S.Line>
                )}
            </S.RecommendedLines>

            <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
            <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
            <p>Voice Translation</p>
            </S.VoiceTranslate>
        </S.BottomContainer>
        </S.Wrapper>
    );
};

export default TextTranslation;
