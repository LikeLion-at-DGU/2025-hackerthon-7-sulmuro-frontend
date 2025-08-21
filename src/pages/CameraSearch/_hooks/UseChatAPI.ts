// _hooks/UseChatAPI.ts
import { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";
import { postChatMessage, ChatMessageResponse, ErrorPayload } from "../_apis/GetChatAPI";

/** AxiosError → 사용자 친화적 메시지 */
function toUserMessage(err: unknown): string {
    if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const data = err.response?.data as ErrorPayload | undefined;

        // 서버에서 표준 에러 형태를 내려주는 경우 우선 사용
        if (data?.message) return data.message;

        if (status === 400) return "요청이 올바르지 않습니다. (roomId 또는 message를 확인하세요)";
        if (status === 401 || status === 403) return "인증이 필요합니다. 다시 로그인해 주세요.";
        if (status === 404) return "대상 리소스를 찾을 수 없습니다. (경로/roomId 확인)";
        if (status && status >= 500) return "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";

        return err.message || "요청 중 오류가 발생했습니다.";
    }
    if (err instanceof Error) return err.message;
    return "알 수 없는 오류가 발생했습니다.";
}

type UseChatAPIParams = {
  authToken?: string; // "Bearer xxx"
};

export function UseChatAPI(params?: UseChatAPIParams) {
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const reset = useCallback(() => {
        setAnswer(null);
        setError(null);
        setLoading(false);
    }, []);

    const cancel = useCallback(() => {
        abortRef.current?.abort();
    }, []);

    /**
     * 채팅 메시지 전송
     * @returns 서버 응답 answer 문자열
     */
    const send = useCallback(
        async (roomId: number, message: string): Promise<string> => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res: ChatMessageResponse = await postChatMessage(roomId, message, {
            authToken: params?.authToken,
            signal: controller.signal,
            });
            setAnswer(res.answer);
            return res.answer;
        } catch (err) {
            const msg = toUserMessage(err);
            const e = new Error(msg);
            setError(e);
            throw e;
        } finally {
            setLoading(false);
            abortRef.current = null;
        }
        },
        [params?.authToken]
    );

    return useMemo(
        () => ({
        answer,     // 직전 응답 문자열
        loading,    // 전송 중 여부
        error,      // Error | null
        send,       // send(roomId, message) -> Promise<string>
        reset,      // 상태 초기화
        cancel,     // 요청 취소
        }),
        [answer, loading, error, send, reset, cancel]
    );
}
