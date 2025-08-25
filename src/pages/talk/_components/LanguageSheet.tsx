// src/pages/talk/_components/LanguageSheet.tsx
import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { useEffect } from "react";

export type LangCode = "ko" | "en" | "zh";

// ✅ 옵션 타입 추가
type Option = { code: LangCode; label: string; short?: string };

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  current: LangCode;
  onSelect: (c: LangCode) => void;
  title?: string;
  subtitle?: string;
  exclude?: LangCode[];               // 숨길 코드들
  options?: ReadonlyArray<Option>;    // ✅ 커스텀 옵션 주입 (선택)
};

export default function LanguageSheet({
  setIsOpen,
  current,
  onSelect,
  title,
  subtitle,
  exclude = [],
  options, // ✅ 받기
}: Props) {
  const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

  const labels = {
    ko: {
      title: "언어 선택",
      subtitle: "언어를 선택하세요",
      options: {
        en: { label: "영어", short: "EN" },
        ko: { label: "한국어", short: "KR" },
        zh: { label: "중국어", short: "ZH" },
      },
      closeAlt: "닫기",
      note: "선택한 언어는 번역에 바로 반영됩니다.",
    },
    en: {
      title: "Choose language",
      subtitle: "Please select a language",
      options: {
        en: { label: "English", short: "EN" },
        ko: { label: "Korean", short: "KR" },
        zh: { label: "Chinese", short: "ZH" },
      },
      closeAlt: "Close",
      note: "Your choice is applied to translation immediately.",
    },
    zh: {
      title: "选择语言",
      subtitle: "请选择一种语言",
      options: {
        en: { label: "英语", short: "EN" },
        ko: { label: "韩语", short: "KO" },
        zh: { label: "中文", short: "ZH" },
      },
      closeAlt: "关闭",
      note: "所选语言会立即应用到翻译。",
    },
  } as const;

  const t = labels[language];

  const close = () => setIsOpen(false);
  const handlePick = (c: LangCode) => {
    onSelect(c);
    close();
  };

  // ESC로 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ 기본 옵션(현지화 라벨) + exclude + 커스텀 options 우선 적용
  const defaultOptions: ReadonlyArray<Option> = [
    { code: "ko", label: t.options.ko.label, short: t.options.ko.short },
    { code: "en", label: t.options.en.label, short: t.options.en.short },
    { code: "zh", label: t.options.zh.label, short: t.options.zh.short },
  ];
  const visibleOptions = (options ?? defaultOptions).filter(
    (o) => !exclude.includes(o.code)
  );

  const ariaTitle = title ?? t.title;
  const ariaSubtitle = subtitle ?? t.subtitle;

  return (
    <ModalOverlay onClick={close} role="presentation">
      <SheetContainer
        role="dialog"
        aria-modal="true"
        aria-label={ariaTitle}
        onClick={(e) => e.stopPropagation()} // 시트 내부 클릭은 닫히지 않게
      >
        <ModalHeader>
          <div />
          <p>{ariaTitle}</p>
          <button onClick={close} aria-label={t.closeAlt}>
            <img src={IMAGE_CONSTANTS.CLoseIcon} alt="" />
          </button>
        </ModalHeader>

        <ModalBody>
          <Title>{ariaSubtitle}</Title>

          <ButtonList>
            {visibleOptions.map(({ label, short, code }) => (
              <button
                key={code}
                data-selected={current === code}
                aria-pressed={current === code}
                onClick={() => handlePick(code)}
              >
                {label} {short && <Small>({short})</Small>}
              </button>
            ))}
          </ButtonList>

          <span>{t.note}</span>
        </ModalBody>
      </SheetContainer>
    </ModalOverlay>
  );
}

/* ===== Styles ===== */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9998;
`;

const SheetContainer = styled.div`
  position: fixed;
  left: 50%; 
  bottom: env(safe-area-inset-bottom);
  transform: translateX(-50%); 
  width: 100%;
  max-width: 540px;
  box-sizing: border-box;
  padding: 24px 32px 16px;
  z-index: 9999;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 50px 50px 0 0;
  color: ${({ theme }) => theme.colors.N70};
  ${({ theme }) => theme.fonts.Bold16};
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  p {
    ${({ theme }) => theme.fonts.Bold16};
    color: ${({ theme }) => theme.colors.N70};
  }
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 4px;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 16px;
  span {
    ${({ theme }) => theme.fonts.Regular14};
    color: ${({ theme }) => theme.colors.N40};
  }
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.SemiBold14};
  color: ${({ theme }) => theme.colors.N70};
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  button {
    width: 100%;
    padding: 12px 10px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.N10};
    background: ${({ theme }) => theme.colors.WHITE};
    color: ${({ theme }) => theme.colors.N70};
    text-align: left;
    ${({ theme }) => theme.fonts.Bold16};
    cursor: pointer;
    &[data-selected="true"] {
      border-color: ${({ theme }) => theme.colors.R50};
      color: ${({ theme }) => theme.colors.R50};
    }
  }
`;

const Small = styled.span`
  ${({ theme }) => theme.fonts.SemiBold14};
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.N50};
`;
