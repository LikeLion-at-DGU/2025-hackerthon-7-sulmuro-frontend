import axios, { AxiosRequestConfig } from "axios";

/** ───────── Types ───────── */
export type ChatMessageRequest = {
    message: string;
};

export type ChatMessageResponse = {
    answer: string;
};

export type ErrorPayload = {
    message?: string;
    code?: number;
    data?: unknown;
};

/** ───────── Helpers ───────── */
function normalizeBaseURL(raw?: string) {
    if (!raw) return "";
    const trimmed = raw.trim().replace(/\/+$/, "");
    return trimmed;
}

/** ───────── Axios Client ───────── */
const rawBase =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BASE_URL ||
"";

const client = axios.create({
    baseURL: normalizeBaseURL(rawBase),
    // withCredentials: true, // 필요 시 활성화
});

export async function postChatMessage(
    roomId: number,
    message: string,
    options?: {
        authToken?: string;            // "Bearer xxx"
        signal?: AbortSignal;          // AbortController.signal
        axiosConfig?: AxiosRequestConfig;
    }
    ): Promise<ChatMessageResponse> {
    const trimmed = (message ?? "").trim();
    if (!trimmed) {
        throw new Error("message는 비어있을 수 없습니다.");
    }
    if (roomId == null || Number.isNaN(Number(roomId))) {
        throw new Error("유효한 roomId가 필요합니다.");
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (options?.authToken) {
        headers["Authorization"] = options.authToken;
    }

    const res = await client.post<ChatMessageResponse>(
        `/api/v1/chat/${roomId}/message`,
        { message: trimmed } as ChatMessageRequest,
        {
        headers,
        signal: options?.signal,
        ...(options?.axiosConfig ?? {}),
        }
    );

    return res.data;
}
