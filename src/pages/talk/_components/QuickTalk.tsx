// talk/_components/QuickTalk.tsx
import * as S from "./QuickTalk.styled";
import { useCallback, useState } from "react";
import QuickTalkLine from "./QuickTalkLine";
import QuickTalkPopup from "./QuickTalkPopup"; // 🔸 팝업 컴포넌트 사용

const pricePhrases = [
    { ko: "이거 얼마에요?", en: "How much is this?" },
    { ko: "조금 깎아주실 수 있나요?", en: "Can you give me a discount?" },
];

const paymentPhrases = [
    { ko: "카드 결제 돼요?", en: "Do you take card?" },
    { ko: "현금으로 계산할게요.", en: "I'll pay in cash." },
];

const etcPhrases = [
    { ko: "영수증 주세요.", en: "Please give me a receipt." },
    { ko: "비닐봉투 필요해요.", en: "I need a plastic bag." },
];

const QuickTalk = () => {
    // 🔸 전체 문장에 적용되는 "전역 표시 언어"
    const [currentLang, setCurrentLang] = useState<"ko" | "en">("ko");

    // 🔸 팝업 상태
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupPhrase, setPopupPhrase] = useState<{ ko: string; en: string } | null>(null);

    const toggleLangAll = useCallback(() => {
        setCurrentLang((prev) => (prev === "ko" ? "en" : "ko"));
    }, []);

    const openPopup = useCallback((payload: { ko: string; en: string }) => {
        setPopupPhrase(payload);
        setPopupOpen(true);
    }, []);

    const closePopup = useCallback(() => {
        setPopupOpen(false);
        setPopupPhrase(null);
    }, []);

    return (
        <S.Wrapper>
        {/* 🔸 전역 언어 토글 버튼 (원하는 위치/스타일로 배치) */}
        <S.ContainerHeader style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Quick Phrases</span>
            <button type="button" onClick={toggleLangAll} aria-label="표시 언어 전환 (전체)">
                {currentLang === "ko" ? "KR → EN" : "EN → KR"}
            </button>
        </S.ContainerHeader>

        <S.LineContainer>
            <S.ContainerHeader>Price</S.ContainerHeader>
            {pricePhrases.map((p, i) => (
            <QuickTalkLine
                key={`price-${i}`}
                ko={p.ko}
                en={p.en}
                currentLang={currentLang}         // 🔸 전역 언어 전달
                onOpenPopup={openPopup}           // 🔸 팝업 오픈
            />
            ))}
        </S.LineContainer>

        <S.LineContainer>
            <S.ContainerHeader>Payment</S.ContainerHeader>
            {paymentPhrases.map((p, i) => (
            <QuickTalkLine
                key={`pay-${i}`}
                ko={p.ko}
                en={p.en}
                currentLang={currentLang}
                onOpenPopup={openPopup}
            />
            ))}
        </S.LineContainer>

        <S.LineContainer>
            <S.ContainerHeader>Etc.</S.ContainerHeader>
            {etcPhrases.map((p, i) => (
            <QuickTalkLine
                key={`etc-${i}`}
                ko={p.ko}
                en={p.en}
                currentLang={currentLang}
                onOpenPopup={openPopup}
            />
            ))}
        </S.LineContainer>

        {/* 🔸 팝업 */}
        {popupOpen && popupPhrase && (
            <QuickTalkPopup
            open={popupOpen}
            onClose={closePopup}
            ko={popupPhrase.ko}
            en={popupPhrase.en}
            currentLang={currentLang} // 팝업에서도 동일한 표시 언어 사용
            />
        )}
        </S.Wrapper>
    );
};

export default QuickTalk;
