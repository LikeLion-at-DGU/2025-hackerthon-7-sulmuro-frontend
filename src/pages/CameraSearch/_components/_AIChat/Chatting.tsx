// pages/CameraSearch/_components/_AIChat/Chatting.tsx
import { useEffect, useRef, useState } from "react";
import * as S from "./Chatting.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; text: string };

type Props = {
    roomId?: number;
    recommendedQuestions?: string[];
    introMessage?: string;
    capturedPreview?: string; // 상단에 미리보기(선택)
};

const Chatting = ({ roomId, recommendedQuestions = [], introMessage, capturedPreview }: Props) => {
    const [messages, setMessages] = useState<Message[]>(
        introMessage
        ? [{ id: crypto.randomUUID(), role: "assistant", text: introMessage }]
        : []
    );
    const [text, setText] = useState("");
    const endRef = useRef<HTMLDivElement | null>(null);

    // 스크롤 맨 아래로
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages.length]);

    const send = (content: string) => {
        const value = content.trim();
        if (!value) return;

        const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        text: value,
        };
        setMessages((prev) => [...prev, userMsg]);
        setText("");

        // TODO: roomId를 이용해 후속 /api/v1/chat/message 같은 엔드포인트가 있다면 여기서 호출
        // 데모용 고정 응답
        setTimeout(() => {
        const botMsg: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            text: `(${roomId ?? "no-room"}) 받아올 답변 예시입니다.`,
        };
        setMessages((prev) => [...prev, botMsg]);
        }, 250);
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        send(text);
    };

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send(text);
        }
    };

    const useRecommended = (q: string) => setText(q);

    return (
        <S.ChattingWrapper>
        <S.ASK>궁금한 것들을 더 물어보세요!</S.ASK>

        {/* 상단 프리뷰 (선택) */}
        {capturedPreview && (
            <div style={{ marginBottom: 12 }}>
            <img
                src={capturedPreview}
                alt="preview"
                style={{ width: "100%", borderRadius: 8, opacity: 0.85 }}
            />
            </div>
        )}

        {/* 채팅 로그 */}
        <S.ChatLog>
            {messages.map((m) => (
            <S.MsgRow key={m.id} $role={m.role}>
                <S.Bubble $role={m.role}>{m.text}</S.Bubble>
            </S.MsgRow>
            ))}
            <div ref={endRef} />
        </S.ChatLog>

        {/* 채팅 보내기 */}
        <S.ChatField>
            <S.QuickQuestions>
            {/* ✅ 서버 추천 질문 반영 */}
            {recommendedQuestions?.length > 0 ? (
                recommendedQuestions.map((q, idx) => (
                <S.RecommendedQuestions key={idx} onClick={() => useRecommended(q)}>
                    {q}
                </S.RecommendedQuestions>
                ))
            ) : (
                <S.RecommendedQuestions onClick={() => useRecommended("어떤 음식이랑 잘 어울릴까?")}>
                어떤 음식이랑 잘 어울릴까?
                </S.RecommendedQuestions>
            )}
            </S.QuickQuestions>

            <S.InputRow onSubmit={onSubmit}>
            <S.AiChatField
                placeholder="Type your comment here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <S.SendButton type="submit" aria-label="send">
                <img src={IMAGE_CONSTANTS.SendButton} alt="send" />
            </S.SendButton>
            </S.InputRow>
        </S.ChatField>
        </S.ChattingWrapper>
    );
};

export default Chatting;
