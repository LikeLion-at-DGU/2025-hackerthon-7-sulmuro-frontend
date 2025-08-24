import * as S from "./TextTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslate } from "../_hooks/UseTranslation";

const TextTranslation = () => {
    const navigate = useNavigate();
    
    // 번역기능용
    const [inputText, setInputText] = useState("");
    const [sourceLanguageCode, setSourceLanguageCode] = useState<"en" | "ko">("en");
    const [targetLanguageCode, setTargetLanguageCode] = useState<"en" | "ko">("ko");

    const { translate, loading, error, data, reset } = useTranslate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleSwap = () => {
        setSourceLanguageCode((prev) => (prev === "en" ? "ko" : "en"));
        setTargetLanguageCode((prev) => (prev === "en" ? "ko" : "en"));
        reset(); // 결과 영역 초기화
    };
 // ✅ 엔터 입력 시 번역 실행도 지원
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        await runTranslate();
        }
    };

    // ✅ 번역 실행 함수
    const runTranslate = async () => {
        const text = inputText.trim();
        if (!text) return;
        try {
        await translate({ sourceLanguageCode, targetLanguageCode, text });
        } catch {
        // 훅에서 error 상태로 처리됨
        }
    };

    useEffect(() => {
        const id = setTimeout(() => {
        if (inputText.trim()) runTranslate();
        }, 400);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText, sourceLanguageCode, targetLanguageCode]);
    return (
        <S.Wrapper>
            <S.TopContainer>
                <S.Header>
                    <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
                    Text Translation
                </S.Header>
                <S.LanguageSwitch>
                    <S.LanguageSelect>
                    <select
                        value={sourceLanguageCode}
                        onChange={(e) => setSourceLanguageCode(e.target.value as "en" | "ko")}
                    >
                        {/* 표시는 eng/kor, 값은 API 스펙에 맞춰 en/ko */}
                        <option value="en">eng</option>
                        <option value="ko">kor</option>
                    </select>
                    </S.LanguageSelect>

                    <img
                    src={IMAGE_CONSTANTS.SwapIcon}
                    alt="교환"
                    onClick={handleSwap}
                    style={{ cursor: "pointer" }}
                    />

                    <S.LanguageSelect>
                    <select
                        value={targetLanguageCode}
                        onChange={(e) => setTargetLanguageCode(e.target.value as "en" | "ko")}
                    >
                        <option value="en">eng</option>
                        <option value="ko">kor</option>
                    </select>
                    </S.LanguageSelect>
                </S.LanguageSwitch>
                {/* ✅ 입력창: 입력 + 엔터 번역 */}
                <S.TranslateInput
                    type="text"
                    placeholder="Enter text to translate"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                {/* ✅ 결과 박스: 로딩/에러/성공 케이스별 표시 */}
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
                <S.Line onClick={() => setInputText("Can you give a discount?")} style={{ cursor: "pointer" }}>
                    <S.TextContainer>
                    <S.KoreanLine>조금 깎아주실 수 있나요?</S.KoreanLine>
                    <S.EnglishLine>Can you give a discount?</S.EnglishLine>
                    </S.TextContainer>
                    <S.IconContainer>
                    <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성 출력" />
                    </S.IconContainer>
                </S.Line>
                </S.RecommendedLines>

                <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
                <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
                <p>Voice Translation</p>
                </S.VoiceTranslate>
            </S.BottomContainer>
        </S.Wrapper>
    );
}

export default TextTranslation;