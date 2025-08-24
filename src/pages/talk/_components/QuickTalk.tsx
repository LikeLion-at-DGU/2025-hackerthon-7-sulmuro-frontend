// talk/_components/QuickTalk.tsx
import * as S from "./QuickTalk.styled";
import { useCallback, useState, useMemo } from "react";
import QuickTalkLine from "./QuickTalkLine";
import QuickTalkPopup from "./QuickTalkPopup";
import { useLanguage } from "@/components/contexts/LanguageContext";

// ✅ 문구 데이터: ko / en / zh 모두 포함
const pricePhrases = [
  { ko: "이거 얼마에요?", en: "How much is this?", zh: "这个多少钱？" },
  { ko: "조금 깎아주실 수 있나요?", en: "Can you give me a discount?", zh: "可以便宜一点吗？" },
];

const paymentPhrases = [
  { ko: "카드 결제 돼요?", en: "Can I pay with credit card?", zh: "可以刷卡吗？" },
  { ko: "거스름돈 주세요.", en: "Please give me change.", zh: "请找零。" },
  { ko: "포장해 가겠습니다.", en: "Take out, please.", zh: "我要打包带走。" },
  { ko: "가지고 가겠습니다.", en: "To go, please.", zh: "我带走。" },
];

const etcPhrases = [
  {
    ko: "한국 전화번호가 없는데, 어떻게 줄을 서야 할까요?",
    en: "I don’t have a Korean phone number.\nHow can I line up?",
    zh: "我没有韩国电话号码，应该怎么排队？",
  },
  { ko: "얼마나 기다려야 할까요?", en: "How long does it take?", zh: "需要等多久？" },
];

// ✅ 섹션/타이틀 다국어 라벨
const labels = {
  ko: { quick: "빠른 문장", price: "가격", payment: "결제", etc: "기타" },
  en: { quick: "Quick Phrases", price: "Price", payment: "Payment", etc: "Etc." },
  zh: { quick: "快速短句", price: "价格", payment: "付款", etc: "其他" },
} as const;

const QuickTalk = () => {
  const { language } = useLanguage();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupPhrase, setPopupPhrase] = useState<{ ko: string; en: string; zh?: string } | null>(null);

  const t = useMemo(() => labels[language], [language]);

  const openPopup = useCallback((payload: { ko: string; en: string; zh?: string }) => {
    setPopupPhrase(payload);
    setPopupOpen(true);
  }, []);

  const closePopup = useCallback(() => {
    setPopupOpen(false);
    setPopupPhrase(null);
  }, []);

  return (
    <S.Wrapper>
      <S.LineContainer>
        <S.ContainerHeader>{t.price}</S.ContainerHeader>
        {pricePhrases.map((p, i) => (
          <QuickTalkLine key={`price-${i}`} ko={p.ko} en={p.en} zh={p.zh} onOpenPopup={openPopup} />
        ))}
      </S.LineContainer>

      <S.LineContainer>
        <S.ContainerHeader>{t.payment}</S.ContainerHeader>
        {paymentPhrases.map((p, i) => (
          <QuickTalkLine key={`pay-${i}`} ko={p.ko} en={p.en} zh={p.zh} onOpenPopup={openPopup} />
        ))}
      </S.LineContainer>

      <S.LineContainer>
        <S.ContainerHeader>{t.etc}</S.ContainerHeader>
        {etcPhrases.map((p, i) => (
          <QuickTalkLine key={`etc-${i}`} ko={p.ko} en={p.en} zh={p.zh} onOpenPopup={openPopup} />
        ))}
      </S.LineContainer>

      {popupOpen && popupPhrase && (
        <QuickTalkPopup
          open={popupOpen}
          onClose={closePopup}
          ko={popupPhrase.ko}
          en={popupPhrase.en}
          zh={popupPhrase.zh}
        />
      )}
    </S.Wrapper>
  );
};

export default QuickTalk;
