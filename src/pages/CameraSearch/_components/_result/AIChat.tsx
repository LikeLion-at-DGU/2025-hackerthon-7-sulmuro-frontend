// pages/CameraSearch/_components/_result/AIChat.tsx
import * as S from "./AIChat.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import Chatting from "../_AIChat/Chatting";

type Props = {
    /** ResultSection에서 넘겨받은 캡쳐 이미지 (미리보기) */
    captured?: string;

    /** 서버에서 생성된 채팅방 ID */
    roomId?: number;

    /** 상단 카드에 표시할 제목(예: answer.itemName) */
    title?: string;

    /** 상단 카드에 표시할 설명(예: answer.description) */
    description?: string;

    /** 서버에서 추천한 질문 목록(예: answer.recommendedquestion[].question) */
    recommendedQuestions?: string[];

    /** 채팅 영역 첫 메시지(예: "분석 결과: ...") */
    introMessage?: string;
};

const AIChat = ({
    captured,
    roomId,
    title,
    description,
    recommendedQuestions = [],
    introMessage,
    }: Props) => {
    return (
        <S.Wrapper>
        {/* 상단 결과 카드: 캡쳐 이미지가 있을 때만 표시 */}
        {captured && (
            <S.Result>
            <S.CapturedImg src={captured} alt="captured" />

            {(title || description) && (
                <>
                <S.CapturedResult>
                    <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                    <div className="label">{title ?? "분석 결과"}</div>
                </S.CapturedResult>

                {description && (
                    <S.CapturedDescription>
                    <div className="hint">{description}</div>
                    </S.CapturedDescription>
                )}
                </>
            )}
            </S.Result>
        )}

        {/* 채팅 본문: roomId/추천 질문/인트로 전달 */}
        <Chatting
            roomId={roomId}
            recommendedQuestions={recommendedQuestions}
            introMessage={introMessage}
            capturedPreview={captured}
        />
        </S.Wrapper>
    );
};

export default AIChat;
