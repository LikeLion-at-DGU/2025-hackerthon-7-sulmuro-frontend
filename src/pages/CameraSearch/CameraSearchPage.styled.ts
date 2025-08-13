// import styled, { css } from "styled-components";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({theme}) => theme.colors.Bg}; 
`;