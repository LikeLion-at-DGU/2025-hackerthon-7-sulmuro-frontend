// src/pages/talk/_components/MarketSheet.tsx

import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
// ✅ 변경: Place 타입을 별도의 타입 파일에서 가져옵니다.
import { Place, PLACE_OPTIONS } from "@/pages/talk/_apis/_types";

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    current: Place;
    onSelect: (p: Place) => void;
    options?: readonly Place[];
};

// ✅ DEFAULT_PLACES를 참조하지 않고, PLACE_OPTIONS를 직접 사용합니다.
const MarketSheet = ({ setIsOpen, current, onSelect, options = PLACE_OPTIONS }: Props) => {
    const close = () => setIsOpen(false);
    const handlePick = (p: Place) => {
        onSelect(p);
        close();
    };

    return (
        <ModalOverlay onClick={(e) => e.stopPropagation()}>
            <PlaceModalContainer>
                <ModalHeader>
                    <div />
                    <p>시장 이동</p>
                    <button onClick={close} aria-label="닫기">
                        <img src={IMAGE_CONSTANTS.CLoseIcon} alt="" />
                    </button>
                </ModalHeader>
                <ModalBody>
                    <Title>서울의 대표 전통시장</Title>
                    <ButtonList>
                        {options.map((p) => (
                            <button
                                key={p}
                                data-selected={current === p}
                                onClick={() => handlePick(p)}
                                aria-pressed={current === p}
                            >
                                {p}
                            </button>
                        ))}
                    </ButtonList>
                    <span>더 많은 시장들이 업데이트될 예정이에요.</span>
                </ModalBody>
            </PlaceModalContainer>
        </ModalOverlay>
    );
};

export default MarketSheet;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
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
    background: rgba(0,0,0,0.45);
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
    grid-template-columns: 1fr; /* 옵션이 하나일 때는 1fr로 변경 */
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