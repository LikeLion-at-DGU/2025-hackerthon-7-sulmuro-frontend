// pages/CameraSearch/_components/_AIChat/Chatting.tsx
import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import * as S from "./Chatting.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import { UseChatAPI } from "../../_hooks/UseChatAPI"; // 서버 전송 훅
import { useLanguage } from "@/components/contexts/LanguageContext";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; text: string };

type Props = {
    roomId?: number;
    recommendedQuestions?: string[];
    introMessage?: string;
    capturedPreview?: string;
};

type AssistantBubbleProps = { text: string };
function AssistantBubble({ text }: AssistantBubbleProps) {
    return (
        <S.MsgRow $role="assistant">
        <S.BubbleBox>
            <S.Avatar src={IMAGE_CONSTANTS.GwanjangE} alt="광장이" />
            <S.Bubble $role="assistant">{text}</S.Bubble>
        </S.BubbleBox>
        </S.MsgRow>
    );
}

const Chatting = ({ roomId, recommendedQuestions = [], introMessage, capturedPreview }: Props) => {
    const { language } = useLanguage(); // 'ko' | 'en' | 'zh'

    // ✅ UI 텍스트 현지화
    const t = useMemo(() => {
        return {
        askHeader:
            language === "ko"
            ? "궁금한 것들을 더 물어보세요!"
            : language === "zh"
            ? "还有什么想了解的？"
            : "Ask me more about it!",
        placeholderReady:
            language === "ko"
            ? "여기에 입력하세요..."
            : language === "zh"
            ? "在此输入消息…"
            : "Type your comment here...",
        placeholderWaiting:
            language === "ko"
            ? "분석 준비 중입니다..."
            : language === "zh"
            ? "正在准备分析..."
            : "Preparing analysis...",
        defaultRecoQ:
            language === "ko"
            ? "어떤 음식이랑 잘 어울릴까?"
            : language === "zh"
            ? "适合搭配什么食物？"
            : "What food pairs well with it?",
        roomNotReady:
            language === "ko"
            ? "아직 대화방이 준비되지 않았어요. 잠시 후 다시 시도해 주세요."
            : language === "zh"
            ? "对话尚未准备就绪，请稍后再试。"
            : "The chat room is not ready yet. Please try again in a moment.",
        sendErrorPrefix:
            language === "ko" ? "메시지 전송 중 문제가 발생했습니다." : language === "zh" ? "发送消息时出现问题。" : "Problem sending the message.",
        };
    }, [language]);

    const [messages, setMessages] = useState<Message[]>(
        introMessage ? [{ id: crypto.randomUUID(), role: "assistant", text: introMessage }] : []
    );
    const [text, setText] = useState("");

    const { send: sendChat, loading: sending, error: chatErr } = UseChatAPI({});
    const listRef = useRef<HTMLDivElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);
    const wrapperEndRef = useRef<HTMLDivElement | null>(null);

    const [pinned, setPinned] = useState(true);

    const isNearBottom = () => {
        const el = listRef.current;
        if (!el) return true;
        const delta = el.scrollHeight - (el.scrollTop + el.clientHeight);
        return delta < 10;
        // ↑ 여유값은 필요 시 조정
    };

    const scrollToBottom = (smooth = true) => {
        if (endRef.current) {
        endRef.current.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "end" });
        } else if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    const onScroll = () => setPinned(isNearBottom());

    useLayoutEffect(() => {
        wrapperEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }, []);

    useEffect(() => {
        if (pinned) endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages.length, pinned]);

    useEffect(() => {
        const handle = () => wrapperEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);

    useEffect(() => {
        if (!capturedPreview) return;
        const img = document.querySelector<HTMLImageElement>('img[alt="preview"]');
        if (!img) return;
        const onLoad = () => pinned && scrollToBottom(false);
        img.addEventListener("load", onLoad);
        return () => img.removeEventListener("load", onLoad);
    }, [capturedPreview, pinned]);

    const send = async (content: string) => {
        const value = content.trim();
        if (!value) return;

        if (!roomId) {
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), role: "assistant", text: t.roomNotReady },
        ]);
        return;
        }

        const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: value };
        setMessages((prev) => [...prev, userMsg]);
        setText("");

        try {
        const ans = await sendChat(roomId, value);
        const botMsg: Message = { id: crypto.randomUUID(), role: "assistant", text: ans };
        setMessages((prev) => [...prev, botMsg]);
        } catch (e) {
        const errText = (e as Error)?.message || chatErr?.message || t.sendErrorPrefix;
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), role: "assistant", text: `⚠️ ${errText}` },
        ]);
        }
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
        <S.ASK>{t.askHeader}</S.ASK>

        <S.ChatLog ref={listRef} onScroll={onScroll}>
            {messages.map((m) =>
            m.role === "assistant" ? (
                <AssistantBubble key={m.id} text={m.text} />
            ) : (
                <S.MsgRow key={m.id} $role={m.role}>
                <S.Bubble $role={m.role}>{m.text}</S.Bubble>
                </S.MsgRow>
            )
            )}
            <div ref={endRef} />
        </S.ChatLog>

        {/* 채팅 보내기 */}
        <S.ChatField>
            <S.QuickQuestions>
            {recommendedQuestions?.length > 0 ? (
                recommendedQuestions.map((q, idx) => (
                <S.RecommendedQuestions key={idx} onClick={() => useRecommended(q)}>
                    {q}
                </S.RecommendedQuestions>
                ))
            ) : (
                <S.RecommendedQuestions onClick={() => useRecommended(t.defaultRecoQ)}>
                {t.defaultRecoQ}
                </S.RecommendedQuestions>
            )}
            </S.QuickQuestions>

            <S.InputRow onSubmit={onSubmit}>
            <S.AiChatField
                placeholder={roomId ? t.placeholderReady : t.placeholderWaiting}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={!roomId || sending}
            />
            <S.SendButton type="submit" aria-label="send" disabled={!roomId || sending}>
                <img src={IMAGE_CONSTANTS.SendButton} alt="send" />
            </S.SendButton>
            </S.InputRow>
        </S.ChatField>

        <div ref={endRef} />
        </S.ChattingWrapper>
    );
};

export default Chatting;
