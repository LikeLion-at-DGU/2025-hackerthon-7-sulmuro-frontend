// src/pages/talk/_components/LanguageSheet.tsx
import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

export type LangCode = "ko" | "en" | "zh";

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    current: LangCode;
    onSelect: (c: LangCode) => void;
    title?: string;
    subtitle?: string;
    exclude?: LangCode[]; // ✅ 추가: 이 언어들은 목록에서 제외
};

const LANG_OPTIONS = [
    { label: "English", short: "En", code: "en" as const },
    { label: "Korean",  short: "KO", code: "ko" as const },
];

export default function LanguageSheet({
    setIsOpen,
    current,
    onSelect,
    title = "언어 선택",
    subtitle = "언어를 선택하세요",
    exclude = [], // ✅ 기본은 제외 없음
    }: Props) {
    const close = () => setIsOpen(false);
    const handlePick = (c: LangCode) => {
        onSelect(c);
        close();
    };

    // ✅ 제외 언어 필터링
    const visibleOptions = LANG_OPTIONS.filter(o => !exclude.includes(o.code));

    return (
        <SheetContainer>
        <ModalHeader>
            <div />
            <p>{title}</p>
            <button onClick={close} aria-label="닫기">
            <img src={IMAGE_CONSTANTS.CLoseIcon} alt="" />
            </button>
        </ModalHeader>

        <ModalBody>
            <Title>{subtitle}</Title>

            <ButtonList>
            {visibleOptions.map(({ label, short, code }) => (
                <button
                key={code}
                data-selected={current === code}
                aria-pressed={current === code}
                onClick={() => handlePick(code)}
                >
                {label} <Small>({short})</Small>
                </button>
            ))}
            </ButtonList>

            <span>선택한 언어는 번역에 바로 반영됩니다.</span>
        </ModalBody>
        </SheetContainer>
    );
}

/* 스타일은 이전과 동일 */
const SheetContainer = styled.div`
    position: fixed; bottom: 0; width: 100%; max-width: 540px; height: 240px;
    box-sizing: border-box; padding: 24px 32px; z-index: 15;
    background-color: ${({ theme }) => theme.colors.WHITE};
    border-radius: 50px 50px 0 0;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold16};
`;
const ModalHeader = styled.header`
    display:flex; 
    justify-content:space-between; 
    align-items:center; width:100%;
    p { 
        ${({ theme }) => theme.fonts.Bold16}; 
        color: ${({ theme }) => theme.colors.N70}; 
    }
    button { 
        display:inline-flex; 
        align-items:center; 
        justify-content:center; 
        border:none; 
        background:transparent;
        padding:4px; 
        cursor:pointer; 
    }
`;
const ModalBody = styled.div`
    display:flex; flex-direction:column; margin-top:20px; gap:16px;
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
    display:flex; 
    flex-direction:column;
    gap:8px; 
    width:100%;
    button {
        width:100%; padding:12px 10px; border-radius:8px;
        border:1px solid ${({ theme }) => theme.colors.N10};
        background:${({ theme }) => theme.colors.WHITE};
        color:${({ theme }) => theme.colors.N70}; text-align:left;
        ${({ theme }) => theme.fonts.Bold16}; cursor:pointer;
        &[data-selected="true"] { border-color:${({ theme }) => theme.colors.R50}; color:${({ theme }) => theme.colors.R50}; }
    }
`;
const Small = styled.span`
    ${({ theme }) => theme.fonts.SemiBold14}; margin-left:6px; color:${({ theme }) => theme.colors.N50};
`;
