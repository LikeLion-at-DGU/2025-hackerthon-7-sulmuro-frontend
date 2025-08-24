// _apis/GetChatAPI.ts
import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";

/** ───────── Types ───────── */
export type ChatMessageRequest = { message: string };
export type ChatMessageResponse = { answer: string };
export type ErrorPayload = { message?: string; code?: number; data?: unknown };

/** ───────── Helpers ───────── */
function normalizeBaseURL(raw?: string) {
    if (!raw) return "";
    return raw.trim().replace(/\/+$/, "");
}

// ── Lang helpers ──
type Lang = "ko" | "en" | "zh";
const LANG_HEADER_NAME = "Accept-Language" as const;

const readLang = (): Lang => {
    try {
        const v = localStorage.getItem("lang");
        return v === "ko" || v === "en" || v === "zh" ? v : "en";
    } catch {
        return "en";
    }
};

/** ───────── Axios Client ───────── */
const rawBase =
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_BASE_URL ||
    "";

const client = axios.create({
    baseURL: normalizeBaseURL(rawBase),
});

// ✅ 인터셉터: Accept-Language = ko|en|zh 자동 주입
client.interceptors.request.use((config) => {
    // ✅ headers를 AxiosHeaders 인스턴스로 보정
    const headers =
        config.headers instanceof AxiosHeaders
        ? config.headers
        : new AxiosHeaders(config.headers);

    // 사용자가 이미 넣지 않았다면만 주입
    if (!headers.has(LANG_HEADER_NAME)) {
        headers.set(LANG_HEADER_NAME, readLang()); // 'ko' | 'en' | 'zh'
    }

    // FormData인 경우 Content-Type은 자동 설정되도록 냅둠
    config.headers = headers;
    return config;
});

// 선택 헬퍼
export function setChatApiLanguage(lang: Lang) {
    client.defaults.headers.common[LANG_HEADER_NAME] = lang;
}

/** ───────── API ───────── */
export async function postChatMessage(
    roomId: number,
    message: string,
    options?: {
        authToken?: string;    // "Bearer xxx"
        signal?: AbortSignal;  // AbortController.signal
        axiosConfig?: AxiosRequestConfig;
    }
    ): Promise<ChatMessageResponse> {
    const trimmed = (message ?? "").trim();
    if (!trimmed) throw new Error("message는 비어있을 수 없습니다.");
    if (roomId == null || Number.isNaN(Number(roomId))) {
        throw new Error("유효한 roomId가 필요합니다.");
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (options?.authToken) headers["Authorization"] = options.authToken;

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
