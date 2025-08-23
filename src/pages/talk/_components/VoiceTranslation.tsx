// talk/_components/VoiceTranslation.tsx
import * as S from "./VoiceTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useSpeachText } from "../_hooks/UseSpeachText";

const VoiceTranslation = () => {
    const navigate = useNavigate();

    // 첫 번째(입력) 언어 선택: kor / eng → ko-KR / en-US 로 매핑
    const [firstLang, setFirstLang] = useState<"kor" | "eng">("kor");
    const sttLocale = useMemo(() => (firstLang === "kor" ? "ko-KR" : "en-US"), [firstLang]);

    // STT 훅: 표시 언어에 맞춰 인식 언어 적용
    const {
        listening,
        supported,
        finalText,
        interimText,
        error: sttError,
        start,
        stop,
        reset,
    } = useSpeachText({ lang: sttLocale, continuous: true, interimResults: true });

    // 클릭 시 녹음 시작/종료 토글
    const handleMicClick = () => {
        if (!supported) return;
        if (listening) stop();
        else {
        // 이전 결과 지우고 다시 시작
        reset();
        start();
        }
    };

    return (
        <S.Wrapper>
        <S.Header>
            <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
            Text Translation
        </S.Header>

        <S.TranslationWrapper>
            {/* ===== 첫 번째 언어 박스 (음성 입력 → 텍스트 표시) ===== */}
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

            <S.FristLanguageResult>
                {/* 인식 중간결과 + 최종결과 표현 */}
                {supported ? (
                (interimText || finalText) ? (
                    <>
                    {finalText}
                    {interimText && (
                        <>
                        {finalText && " "}
                        <span style={{ opacity: 0.5 }}>{interimText}</span>
                        </>
                    )}
                    </>
                ) : listening ? (
                    "Listening..."
                ) : (
                    "Tap the mic and start speaking"
                )
                ) : (
                "이 브라우저는 음성 인식을 지원하지 않습니다."
                )}
            </S.FristLanguageResult>

            <S.VoiceIcon as="button" type="button" onClick={handleMicClick} aria-label="음성 입력">
                <img
                src={IMAGE_CONSTANTS.VoiceButton}
                alt={listening ? "음성 입력 중지" : "음성 입력 시작"}
                style={{ opacity: supported ? 1 : 0.4 }}
                />
            </S.VoiceIcon>

            {/* 에러 메시지(권한 거부/네트워크 등) */}
            {sttError && (
                <div style={{ color: "#d9534f", marginTop: 8, fontSize: 12 }}>
                STT Error: {sttError}
                </div>
            )}
            </S.FirstLanguageBox>

            {/* ===== 두 번째 언어 박스 (지금은 UI만 유지) ===== */}
            <S.SecondLanguageBox>
            <S.SecondLanguageSelect>
                <select aria-label="출력 언어 선택">
                <option value="eng">eng</option>
                <option value="kor">kor</option>
                </select>
            </S.SecondLanguageSelect>
            <S.SecondLanguageResult>
                Listening...
            </S.SecondLanguageResult>
            <S.VoiceIcon>
                <img src={IMAGE_CONSTANTS.VoiceButton} alt="음성 입력" />
            </S.VoiceIcon>
            </S.SecondLanguageBox>
        </S.TranslationWrapper>

        <S.BottomContainer>
            <S.TextTranslate onClick={() => navigate("/talk/text")}>
            <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
            <p>Text Translation</p>
            </S.TextTranslate>
        </S.BottomContainer>
        </S.Wrapper>
    );
};

export default VoiceTranslation;
