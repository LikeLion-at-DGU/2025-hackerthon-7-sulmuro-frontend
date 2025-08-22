// talk/_apis/getTranslate.ts
export type TranslatePayload = {
  text: string;
  target: string;     // 예: 'ko', 'en', 'ja'
  source?: string;    // 예: 'auto' | 'en' | 'ko' ...
};

export type TranslateResult = {
  translatedText: string;
  detectedLanguage?: string;
  confidence?: number; // 0 ~ 1
};

const API_BASE = import.meta.env.VITE_BASE_URL as string;

/**
 * Google Translation v3를 호출하는 백엔드 엔드포인트:
 * POST {BASE}/api/translate
 */
export async function postTranslate(
    payload: TranslatePayload,
    signal?: AbortSignal
    ): Promise<TranslateResult> {
    if (!API_BASE) {
        throw new Error("환경변수 VITE_BASE_URL이 설정되어 있지 않습니다.");
    }

    const res = await fetch(`${API_BASE}/api/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
        signal,
    });

    // 2xx 외 에러 처리
    if (!res.ok) {
        const text = await safeReadText(res);
        throw new Error(
        `Translate API 실패 (${res.status})${
            text ? `: ${text}` : ""
        }`.trim()
        );
    }

    return (await res.json()) as TranslateResult;
    }

    async function safeReadText(res: Response) {
    try {
        return await res.text();
    } catch {
        return "";
    }
}
