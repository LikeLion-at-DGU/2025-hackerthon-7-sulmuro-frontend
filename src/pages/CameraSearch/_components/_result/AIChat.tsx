// pages/CameraSearch/_components/_result/AIChat.tsx
import * as S from "./AIChat.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import Chatting from "../_AIChat/Chatting";

type Props = {
    captured?: string;
};

const AIChat = ({ captured }: Props) => {
    return (
        <S.Wrapper>
        {captured && (
            <S.Result>
            <S.CapturedImg src={captured} alt="captured" />
            <S.CapturedResult>
                <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                <div className="label">야생의 강근우</div>
            </S.CapturedResult>
            <S.CapturedDescription>
                <div className="hint">
                매우 난폭하다!
                <br />
                매우 잔인하다!
                <br />
                매우 잔혹하다!
                </div>
            </S.CapturedDescription>
                <S.ToAIChat>
                    <div className="scrollToAI">FUCKCKCKCK게 질문하기</div>
                </S.ToAIChat>
            </S.Result>
        )}
            <Chatting />
        </S.Wrapper>
    );
};

export default AIChat;
