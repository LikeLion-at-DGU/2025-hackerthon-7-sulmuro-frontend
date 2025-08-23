// pages/CameraSearch/_components/_result/AIChat.tsx
import * as S from "./AIChat.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import Chatting from "../_AIChat/Chatting";
import type { RecommendedStore } from "../../_apis/GetImageAPI"; // 타입 재사용

type Props = {
    captured?: string;
    roomId?: number;
    title?: string;
    description?: string;
    recommendedStores?: RecommendedStore[];
    recommendedQuestions?: string[];
    averagePrice?: string;
    introMessage?: string;
};

const AIChat = ({
        captured,
        roomId,
        title,
        description,
        recommendedStores = [],
        recommendedQuestions = [],
        introMessage,
        averagePrice,
    }: Props) => {

    const handleReload = () => {
        window.location.reload(); // 페이지 새로고침
    };

    return (
        <S.Wrapper>
            <S.ChatHeader>
                <img onClick={handleReload} src={IMAGE_CONSTANTS.BackIcon2} alt="BACK" />
            </S.ChatHeader>
            {captured && (
                <S.Result>
                    <S.CapturedImg src={captured} alt="captured" />

                    {(title || description || recommendedStores.length > 0) && (
                        <>
                        <S.CapturedResult>
                            <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                            <div className="label">
                            {title ? `분석 결과 : ${title}` : "분석 결과"}
                            </div>
                        </S.CapturedResult>

                        {(description || recommendedStores.length > 0) && (
                            <S.CapturedDescription>
                            <div className="hint">
                                {description}
                                {typeof averagePrice === "string" && averagePrice.trim() !== "" && (
                                    <>
                                    <br />
                                    <strong>평균 가격</strong>
                                    <div>
                                        {averagePrice}
                                    </div>
                                    </>
                                )}
                                {recommendedStores.length > 0 && (
                                <>
                                    <br />
                                    <strong>추천 가게</strong>
                                    <ul style={{ marginTop: 6 }}>
                                    {recommendedStores.map((s, idx) => (
                                        <li key={idx}>
                                        {s.name}
                                        {s.notes ? ` — ${s.notes}` : ""}
                                        </li>
                                    ))}
                                    </ul>
                                </>
                                )}
                            </div>
                            </S.CapturedDescription>
                        )}
                        </>
                    )}
                </S.Result>
            )}
            <S.ChattingWrapper>
                <Chatting
                    roomId={roomId}
                    recommendedQuestions={recommendedQuestions}
                    introMessage={introMessage}
                    capturedPreview={captured}
                />  
            </S.ChattingWrapper>
        
        </S.Wrapper>
    );
};

export default AIChat;
