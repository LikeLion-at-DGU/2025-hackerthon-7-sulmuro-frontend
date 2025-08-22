import * as S from "./QuickTalk.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";


const QuickTalkPopup = () => {

    return (
        <S.PopupWrapper>
            <S.Lines>
                <S.KoreanLine>
                이거 얼마에요?
                </S.KoreanLine>
                <S.EnglishLine>
                    How much is this?
                </S.EnglishLine>
            </S.Lines>
            <S.Sound>
                <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성" />
            </S.Sound>
        </S.PopupWrapper>
    );
}

export default QuickTalkPopup;