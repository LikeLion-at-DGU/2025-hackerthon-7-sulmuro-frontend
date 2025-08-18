import { useEffect, useRef, useState } from "react";
import * as S from "./Chatting.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; text: string };

const Chatting = () => {
    const [messages, setMessages] = useState<Message[]>([]);
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

        // 데모용 고정 응답
        setTimeout(() => {
        const botMsg: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            text: "받아올 답변입니당~!~!",
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
                <S.RecommendedQuestions onClick={() => useRecommended("어떤 음식이랑 잘 어울릴까?")}>
                    어떤 음식이랑 잘 어울릴까?
                </S.RecommendedQuestions>
                {/* 추천 질문 받아와서 보내기 */}
                </S.QuickQuestions>

                <S.InputRow onSubmit={onSubmit}>
                <S.AiChatField
                    placeholder="Type your comment here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <S.SendButton type="submit" aria-label="send" >
                    <img src={IMAGE_CONSTANTS.SendButton} alt="send" />
                </S.SendButton>
                </S.InputRow>
            </S.ChatField>
        </S.ChattingWrapper>
    );
};

export default Chatting;
