// pages/CameraSearch/_components/_result/AIChat.tsx
import * as S from "./AIChat.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import Chatting from "../_AIChat/Chatting";
import type { RecommendedStore } from "../../_apis/GetImageAPI";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useLanguage } from "@/components/contexts/LanguageContext";

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
    const navigate = useNavigate();
    const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

    // ✅ 라벨 현지화
    const t = useMemo(() => {
        return {
        averagePrice:
            language === "ko" ? "평균 가격" : language === "zh" ? "平均价格" : "Average price",
        recommendedStores:
            language === "ko" ? "추천 가게" : language === "zh" ? "推荐商家" : "Recommended stores",
        };
    }, [language]);

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
                    <div className="label">{title}</div>
                </S.CapturedResult>

                {(description || recommendedStores.length > 0) && (
                    <S.CapturedDescription>
                    <div className="hint">
                        {description}
                        {typeof averagePrice === "string" && averagePrice.trim() !== "NULL" && (
                        <>
                            <S.AveragePrice>
                            <p className="Tag">{t.averagePrice}</p>
                            <S.PriceWrapper>
                                <div className="Price">{averagePrice}</div>
                            </S.PriceWrapper>
                            </S.AveragePrice>
                        </>
                        )}
                        {recommendedStores.length > 0 && (
                        <>
                            <br />
                            <S.RecommendStrores>
                            <p className="Tag">{t.recommendedStores}</p>
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
