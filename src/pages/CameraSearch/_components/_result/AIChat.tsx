// pages/CameraSearch/_components/_result/AIChat.tsx
import * as S from "./AIChat.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import Chatting from "../_AIChat/Chatting";
import type { RecommendedStore } from "../../_apis/GetImageAPI"; // 타입 재사용
import { useNavigate } from "react-router-dom";

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

    // const handleReload = () => {
    //     window.location.reload(); // 페이지 새로고침
    // };
    const navigate = useNavigate();

    return (
        <S.Wrapper>
            <S.ChatHeader>
                <img onClick={() => navigate("/")} src={IMAGE_CONSTANTS.BackIcon2} alt="BACK" />
            </S.ChatHeader>
            {captured && (
                <S.Result>
                    <S.CapturedImg src={captured} alt="captured" />

                    {(title || description || recommendedStores.length > 0) && (
                        <>
                        <S.CapturedResult>
                            <img src={IMAGE_CONSTANTS.ResultIcon} alt="🔎" />
                            <div className="label">
                            {title}
                            </div>
                        </S.CapturedResult>

                        {(description || recommendedStores.length > 0) && (
                            <S.CapturedDescription>
                            <div className="hint">
                                {description}
                                {typeof averagePrice === "string" && averagePrice.trim() !== "NULL" && (
                                    <>
                                        <S.AveragePrice>
                                            <p className="Tag">평균 가격</p>
                                            <div className="Price">{averagePrice}</div>
                                        </S.AveragePrice>
                                    </>
                                )}
                                {recommendedStores.length > 0 && (
                                <>
                                    <br />
                                    <S.RecommendStrores>
                                        <p className="Tag">추천 가게</p>
                                        <div className="Price">
                                            <S.RecommendedStoreList>
                                                {recommendedStores.map((s, idx) => (
                                                    <S.RecommendedStoreItem key={idx}>
                                                        {s.name}
                                                        {s.notes ? ` — ${s.notes}` : ""}
                                                    </S.RecommendedStoreItem>
                                                ))}
                                            </S.RecommendedStoreList>
                                        </div>
                                    </S.RecommendStrores>
                                    
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
