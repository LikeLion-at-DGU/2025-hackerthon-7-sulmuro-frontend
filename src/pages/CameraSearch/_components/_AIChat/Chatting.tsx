// pages/CameraSearch/_components/_AIChat/Chatting.tsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as S from "./Chatting.styled";
import { IMAGE_CONSTANTS } from "../../../../constants/imageConstants";
import { UseChatAPI } from "../../_hooks/UseChatAPI"; // ✅ 서버 전송 훅 연결

type Role = "user" | "assistant";
type Message = { id: string; role: Role; text: string };

type Props = {
    roomId?: number;
    recommendedQuestions?: string[];
    introMessage?: string;
    capturedPreview?: string;
};;

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
const Chatting = ({
    roomId,
    recommendedQuestions = [],
    introMessage,
    capturedPreview,
    }: Props) => {
    const [messages, setMessages] = useState<Message[]>(
    introMessage
        ? [{ id: crypto.randomUUID(), role: "assistant", text: introMessage }]
        : []
    );
    const [text, setText] = useState("");

    // ✅ 서버 전송 훅
    const { send: sendChat, loading: sending, error: chatErr } = UseChatAPI({
        // authToken: `Bearer ${localStorage.getItem("token") ?? ""}`,
    });
    // ✅ 스크롤 영역 & 바닥 앵커
    const listRef = useRef<HTMLDivElement | null>(null);
    const endRef = useRef<HTMLDivElement | null>(null);
    const wrapperEndRef = useRef<HTMLDivElement | null>(null);

    // ✅ 사용자가 현재 "바닥에 붙어있는지" 상태
    const [pinned, setPinned] = useState(true);

    // ✅ 바닥 근접(여유 60px) 판단
    const isNearBottom = () => {
        const el = listRef.current;
        if (!el) return true;
        const delta = el.scrollHeight - (el.scrollTop + el.clientHeight);
        return delta < 10;
    };

    // ✅ 바닥으로 스크롤 유틸
    const scrollToBottom = (smooth = true) => {
        // endRef가 더 안정적입니다.
        if (endRef.current) {
        endRef.current.scrollIntoView({
            behavior: smooth ? "smooth" : "auto",
            block: "end",
        });
        } else if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    };

    // ✅ 스크롤 이벤트로 pinned 상태 갱신
    const onScroll = () => {
        setPinned(isNearBottom());
    };

     // ✅ 초기 렌더: 페이지(랩퍼) 최하단으로 이동 → ChatField가 보이도록
    useLayoutEffect(() => {
        wrapperEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    }, []);

    // ✅ 메시지가 변경될 때: 바닥에 붙어있을 때만 따라감
    useEffect(() => {
    if (pinned) {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages.length, pinned]);

    // ✅ 윈도우 리사이즈 시에도 바닥 유지(모바일 키보드/회전 등)
    // ✅ 윈도우 리사이즈 시에도 랩퍼 최하단 유지 (모바일 키보드/회전 등)
    useEffect(() => {
        const handle = () => {
        wrapperEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
        };
        window.addEventListener("resize", handle);
        return () => window.removeEventListener("resize", handle);
    }, []);

    // 이미지가 늦게 로딩되며 높이가 변하는 경우(선택)
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

        // roomId가 없으면 안내
        if (!roomId) {
        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), role: "assistant", text: "아직 대화방이 준비되지 않았어요. 잠시 후 다시 시도해 주세요." },
        ]);
        return;
        }

        // 사용자 메시지 먼저 추가
        const userMsg: Message = { id: crypto.randomUUID(), role: "user", text: value };
        setMessages((prev) => [...prev, userMsg]);
        setText("");

        try {
        const ans = await sendChat(roomId, value);
        const botMsg: Message = { id: crypto.randomUUID(), role: "assistant", text: ans };
        setMessages((prev) => [...prev, botMsg]);
        } catch (e) {
        const errText =
            (e as Error)?.message || chatErr?.message || "메시지 전송 중 문제가 발생했습니다.";
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
            <S.ASK>궁금한 것들을 더 물어보세요!</S.ASK>

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
                        <S.RecommendedQuestions onClick={() => useRecommended("어떤 음식이랑 잘 어울릴까?")}>
                            어떤 음식이랑 잘 어울릴까?
                        </S.RecommendedQuestions>
                    )}
                </S.QuickQuestions>

                <S.InputRow onSubmit={onSubmit}>
                    <S.AiChatField
                        placeholder={roomId ? "Type your comment here..." : "분석 준비 중입니다..."}
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
