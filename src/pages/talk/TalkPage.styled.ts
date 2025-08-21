import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

`;

export const Header = styled.div`
    display : flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.N70};
    padding: 0 1rem;
    box-sizing: border-box;
`;

export const TopComponentWrapper = styled.div`
    width: 100%;

`;

export const BottomComponentWrapper = styled.div`
    width: 100%;
`;