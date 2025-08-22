import * as S from "./TextTranslation.styled";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TextTranslation = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("How much is this pen?");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };


    return (
        <S.Wrapper>
            <S.Header>
                <img onClick={() => navigate("/talk")} src={IMAGE_CONSTANTS.BackIcon2} alt="뒤로가기" />
                Text Translation
            </S.Header>
            <S.LanguageSwitch>
                <S.LanguageSelect>
                    <select>
                        <option value="eng">eng</option>
                        <option value="kor">kor</option>
                    </select>
                </S.LanguageSelect>
                <img src={IMAGE_CONSTANTS.SwapIcon} alt="교환" />
                <S.LanguageSelect>
                    <select>
                        <option value="eng">eng</option>
                        <option value="kor">kor</option>
                    </select>
                </S.LanguageSelect>
            </S.LanguageSwitch>
            <S.TranslateInput
                type="text"
                placeholder="Enter text to translate"
                value={inputText}
                onChange={handleInputChange}
            />
            <S.TranslateResult>
                <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성 출력" />
                <p>이 펜은 얼마입니까?</p>
            </S.TranslateResult>
            <S.BottomContainer>
                <S.RecommendedLines>
                    <p>Try this</p>
                    <S.Line>
                        <S.TextContainer>
                            <S.KoreanLine>조금 깎아주실 수 있나요?</S.KoreanLine>
                            <S.EnglishLine>Can you give a discount?</S.EnglishLine>
                        </S.TextContainer>
                        <S.IconContainer>
                            <img src={IMAGE_CONSTANTS.SoundIcon} alt="음성 출력" />
                        </S.IconContainer>
                    </S.Line>
                </S.RecommendedLines>
                <S.VoiceTranslate onClick={() => navigate("/talk/voice")}>
                    <img src={IMAGE_CONSTANTS.MicIcon} alt="MIC" />
                    <p>Voice Translation</p>
                </S.VoiceTranslate>
            </S.BottomContainer>
        </S.Wrapper>
    );
}

export default TextTranslation;