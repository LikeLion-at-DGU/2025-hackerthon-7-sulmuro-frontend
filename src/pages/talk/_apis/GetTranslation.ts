// talk/_apis/getTranslate.ts
/**
 * 번역 API 호출 모듈
 * POST /api/v1/translate/recommend
 */

export type LanguageCode = "ko" | "en" | "zh" | string;

export interface TranslateRequest {
    sourceLanguageCode: LanguageCode;
    targetLanguageCode: LanguageCode;
    text: string;
}

export interface TranslateSuccess {
    message: string; // "번역이 완료되었습니다."
    code: number;    // 200
    data: {
        translatedText: string;
    };
}

export class TranslateError extends Error {
    status?: number;
    constructor(message: string, status?: number) {
        super(message);
        this.name = "TranslateError";
        this.status = status;
    }
}

const BASE_URL =
    (import.meta as any).env?.VITE_BASE_URL?.replace(/\/+$/, "") ?? "";

/**
 * 서버 스펙상 헤더 요구사항은 없지만,
 * JSON 전송을 위해 Content-Type은 명시합니다.
 */
export async function getTranslate(
    body: TranslateRequest,
    opts?: { signal?: AbortSignal; timeoutMs?: number }
): Promise<TranslateSuccess> {
    const controller = new AbortController();
    const timeout =
        typeof opts?.timeoutMs === "number" && opts.timeoutMs > 0
        ? opts.timeoutMs
        : 15000;

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(
            `${BASE_URL}/api/v1/translate/recommend`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                signal: opts?.signal ?? controller.signal,
                body: JSON.stringify(body),
        }
    );

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json() : null;

    if (!res.ok) {
      // 서버가 JSON 에러 메시지를 준 경우 최대한 살려서 throw
    const msg =
        payload?.message ||
        payload?.error ||
        `Translate API Error (status ${res.status})`;
        throw new TranslateError(msg, res.status);
    }

    // 성공 응답 스펙에 맞춰 검증
    if (
        !payload ||
        typeof payload?.data?.translatedText !== "string"
    ) {
        throw new TranslateError("Unexpected API response shape");
    }

    return payload as TranslateSuccess;
    } catch (err: any) {
        if (err?.name === "AbortError") {
        throw new TranslateError("Request aborted (timeout or manual cancel)");
        }
        if (err instanceof TranslateError) throw err;
        throw new TranslateError(err?.message ?? "Unknown translate error");
    } finally {
        clearTimeout(timeoutId);
    }
}
