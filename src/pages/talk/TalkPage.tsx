import * as S from "./TalkPage.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import QuickTalk from "./_components/QuickTalk";
import { useNavigate } from "react-router-dom";

const TalkPage = () => {
    const navigate = useNavigate();

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

            <S.Header>Free Talk</S.Header>

            <S.BottomComponentWrapper>
                {/* 클릭하면 각 전용 페이지로 이동 */}
                <S.TextTranslate onClick={() => navigate("/talk/text")}>
                    Enter text to translate
                </S.TextTranslate>

                <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
                    <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
                    <p>Voice Translation</p>
                </S.VoiceTranslate>
            </S.BottomComponentWrapper>
        </S.Wrapper>
    );
};

export default TalkPage;
