import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 100%;
    height: 100dvh;
    background: ${({ theme }) => theme.colors.WHITE};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
`;

const Container = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const Error = styled.div`
display: flex;
justify-content: center;
    color: ${({ theme }) => theme.colors.R40};
    ${({ theme }) => theme.fonts.ExtraBold24};
    font-size: 90px;
    font-weight: ExtraBold;
`;

const Allert = styled.div`
    color: ${({ theme }) => theme.colors.N30};
    ${({ theme }) => theme.fonts.SemiBold20};
`;

const BackToMain = styled.div`
    color: ${({ theme }) => theme.colors.N50};
    ${({ theme }) => theme.fonts.Bold20};
    background: ${({ theme }) => theme.colors.N00};
    border-radius: 8px;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
    margin-bottom: 8rem;

`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                <Error>404</Error>
                <Allert>this page does not exist</Allert>
            </Container>
            <BackToMain onClick={() => navigate("/")}>
                go back to servie
            </BackToMain>
        </Wrapper>
    );
}

export default NotFound;