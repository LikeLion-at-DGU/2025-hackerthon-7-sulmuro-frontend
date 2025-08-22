import * as S from "./QuickTalk.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";


const QuickTalkLine = () => {
    // line string을 받아와서 활용합니다
    return (
        <S.LineWrapper>
            How much is this?
            <S.IconWrapper>
                <img src={IMAGE_CONSTANTS.SwitchIcon} alt="번역" />
                <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성" />
            </S.IconWrapper>
        </S.LineWrapper>
    );
}

export default QuickTalkLine;