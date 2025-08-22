import * as S from "./TalkPage.styled";
// import {ROUTE_PATHS} from "@/constants/routeConstants";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

// 컴포넌트
import QuickTalk from "./_components/QuickTalk";

const TalkPage = () => {

    return (
        <S.Wrapper>
            <S.Header>
                Quick Phrases
                <select>
                    <option value="전체">전체</option>
                    <option value="광장시장">서울 광장시장</option>
                </select>
            </S.Header>
            <S.TopComponentWrapper>
                {/* TalkLine text를 보내서 활용합니다. */}
                <QuickTalk />
            </S.TopComponentWrapper>
            <S.Header>
                Free Talk
            </S.Header>
            <S.BottomComponentWrapper>
                <S.TextTranslate>
                    Enter text to translate
                </S.TextTranslate>
                <S.VoiceTranslate>
                    <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
                    <p>Voice Translation</p>
                </S.VoiceTranslate>
            </S.BottomComponentWrapper>
        </S.Wrapper>
    );
}

export default TalkPage;