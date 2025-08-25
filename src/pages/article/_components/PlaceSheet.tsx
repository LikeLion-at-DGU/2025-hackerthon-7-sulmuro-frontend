// src/pages/article/_components/PlaceSheet.tsx
import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { Place } from "../_apis/getArticle";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { useMemo } from "react";

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    current: Place;
    onSelect: (p: Place) => void;
    options?: readonly Place[];
};

const DEFAULT_PLACES: readonly Place[] = ["전체", "서울광장시장"] as const;

const PlaceSheet = ({ setIsOpen, current, onSelect, options = DEFAULT_PLACES }: Props) => {
    const { language } = useLanguage();

    // ✅ UI 라벨 현지화 (값은 기존 Place 유지)
    const t = useMemo(() => {
        return {
        title: language === "ko" ? "시장 이동" : language === "zh" ? "切换市场" : "Change market",
        closeAlt: language === "ko" ? "닫기" : language === "zh" ? "关闭" : "Close",
        subtitle:
            language === "ko"
            ? "서울의 대표 전통시장"
            : language === "zh"
            ? "首尔代表性的传统市场"
            : "Seoul’s representative traditional market",
        note:
            language === "ko"
            ? "더 많은 시장들이 업데이트될 예정이에요."
            : language === "zh"
            ? "更多市场即将上线。"
            : "More markets will be added soon.",
        placeLabel: (p: Place) =>
            p === "전체"
            ? language === "ko"
                ? "전체"
                : language === "zh"
                ? "全部"
                : "All"
            : language === "ko"
            ? "서울광장시장"
            : language === "zh"
            ? "广藏市场"
            : "Gwangjang Market",
        };
    }, [language]);

    const close = () => setIsOpen(false);
    const handlePick = (p: Place) => {
        onSelect(p); // 값은 Place(한글) 유지
        close();
    };

    return (
        <ModalOverlay>
        <PlaceModalContainer role="dialog" aria-modal="true" aria-label={t.title}>
            <ModalHeader>
            <div />
            <p>{t.title}</p>
            <button onClick={close} aria-label={t.closeAlt}>
                <img src={IMAGE_CONSTANTS.CLoseIcon} alt="" />
            </button>
            </ModalHeader>

            <ModalBody>
            {/* 현재 선택이 서울광장시장일 때만 부제 노출 */}
            {current === "서울광장시장" && <Title>{t.subtitle}</Title>}

            <ButtonList>
                {options.map((p) => (
                <button
                    key={p}
                    data-selected={current === p}
                    onClick={() => handlePick(p)}
                    aria-pressed={current === p}
                >
                    {t.placeLabel(p)}
                </button>
                ))}
            </ButtonList>

            <span>{t.note}</span>
            </ModalBody>
        </PlaceModalContainer>
        </ModalOverlay>
    );
};

export default PlaceSheet;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.45);
    z-index: 20;
`;

const PlaceModalContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 540px;
    height: fit-content;
    max-height: 220px;
    min-height: 160px;
    box-sizing: border-box;
    padding: 24px 32px 12px;

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
        justify-content: flex-start;
        border: none;
        background: transparent;
        padding: 4px;
        cursor: pointer;
    }
`;

const ModalBody = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 20px;
    gap: 16px;
    margin-bottom: 1rem;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;

    button {
        width: 100%;
        padding: 12px 8px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.colors.N10};
        background: ${({ theme }) => theme.colors.WHITE};
        color: ${({ theme }) => theme.colors.N70};
        ${({ theme }) => theme.fonts.Bold16};
        cursor: pointer;

        &[data-selected="true"] {
        border-color: ${({ theme }) => theme.colors.R50};
        color: ${({ theme }) => theme.colors.R50};
        }
    }
`;
