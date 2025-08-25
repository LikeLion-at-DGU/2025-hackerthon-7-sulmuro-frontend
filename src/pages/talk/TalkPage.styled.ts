import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90dvh;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;
export const SelectButton = styled.button`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: ${({ theme }) => theme.colors.N50};
    background: transparent;
    ${({ theme }) => theme.fonts.Regular12};
    cursor: pointer;
`;
export const MarketTrigger = styled.button`
    padding: 6px 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.WHITE};
    ${({ theme }) => theme.fonts.Regular12};
    color: ${({ theme }) => theme.colors.N50};
    cursor: pointer;
`;
export const Header = styled.div`
    display : flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};
    padding:  1rem;
    box-sizing: border-box;
    select{
        width: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        color: ${({ theme }) => theme.colors.N50};
        ${({ theme }) => theme.fonts.Regular12};
    }
`;

export const TopComponentWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid ${({theme}) => theme.colors.N30};
    padding : 1rem 0;
    box-sizing:border-box;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export const BottomComponentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1; // 이 속성을 추가하여 남은 공간을 모두 차지하도록 합니다.
`;

export const TextTranslate = styled.div`
    width: 90%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.N30};
    ${({ theme }) => theme.fonts.SemiBold16};
    box-sizing: border-box;
    flex: 1; // 이 속성을 추가하여 남은 높이를 모두 채우도록 합니다.
`;

export const VoiceTranslate = styled.div`
    width: 90%;
    margin: 0.8rem 0.6rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.R10};
    color: ${({ theme }) => theme.colors.R60};
    ${({ theme }) => theme.fonts.SemiBold16};
    box-sizing: border-box;
`;
