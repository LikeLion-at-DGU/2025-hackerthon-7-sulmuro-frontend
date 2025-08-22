import * as S from "./TextTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";


const TextTranslation = () => {

    return (
        <S.Wrapper>
            <S.Header>
                <img src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
                Text Translation
            </S.Header>
            <S.LanguageSwitch>
                <S.LanguageSelect>
                    <option value="eng">eng</option>
                    <option value="kor">kor</option>
                </S.LanguageSelect>
                <img src={IMAGE_CONSTANTS.SwapIcon} alt="교환" />
            </S.LanguageSwitch>
        </S.Wrapper>
    );
}