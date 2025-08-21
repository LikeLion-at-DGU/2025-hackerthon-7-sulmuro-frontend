import * as S from "./TalkPage.styled";
// import {ROUTE_PATHS} from "@/constants/routeConstants";

// 컴포넌트


const TalkPage = () => {

    return (
        <S.Wrapper>
            <S.Header>
                Quick Phrases
                <select>
                    <option value="전체">서울 광장시장</option>
                    <option value="광장시장">광장시장</option>
                </select>
            </S.Header>
            <S.TopComponentWrapper>

            </S.TopComponentWrapper>
            <S.Header>
                Free Talk
            </S.Header>
            <S.BottomComponentWrapper>

            </S.BottomComponentWrapper>
        </S.Wrapper>
    );
}

export default TalkPage;