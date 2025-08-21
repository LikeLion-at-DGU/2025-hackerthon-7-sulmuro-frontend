import * as S from "./QuickTalk.styled";
import QuickTalkLine from "./QuickTalkLine";


const QuickTalk = () => {

    return (
        <S.Wrapper>
            <S.LineContainer>
                <S.ContainerHeader>
                    Price
                </S.ContainerHeader>
                <QuickTalkLine />
            </S.LineContainer>
            <S.LineContainer>
                <S.ContainerHeader>
                    Payment
                </S.ContainerHeader>
                <QuickTalkLine />
            </S.LineContainer>
            <S.LineContainer>
                <S.ContainerHeader>
                    Etc.
                </S.ContainerHeader>
                <QuickTalkLine />
            </S.LineContainer>
        </S.Wrapper>
    );
}

export default QuickTalk;