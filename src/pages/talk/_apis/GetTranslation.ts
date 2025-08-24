// talk/_apis/getTranslate.ts
/**
 * 번역 API 호출 모듈
 * - POST /api/v1/translate              (기본 번역)
 * - POST /api/v1/translate/recommend    (번역 + 추천문장)
 */

export type LanguageCode = "ko" | "en" | "zh" | string;

export interface TranslateRequest {
  sourceLanguageCode: LanguageCode;
  targetLanguageCode: LanguageCode;
  text: string;
}

export interface Recommendation {
  source: string;
  target: string;
}

/** 공통 성공 페이로드 형태 (recommend일 땐 recommendations 포함) */
export interface TranslateSuccess {
  message: string; // "번역이 완료되었습니다." | "번역 및 추천 표현 조회가 완료되었습니다."
  code: number;    // 200
  data: {
    translatedText: string;
    recommendations?: Recommendation[];
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

/** 내부 공통 fetcher */
async function postJSON<T>(
  url: string,
  body: unknown,
  opts?: { signal?: AbortSignal; timeoutMs?: number }
): Promise<T> {
  const controller = new AbortController();
  const timeout =
    typeof opts?.timeoutMs === "number" && opts.timeoutMs > 0
      ? opts.timeoutMs
      : 15000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // 명세상 헤더 없음이지만 JSON 전송 위해 명시
      signal: opts?.signal ?? controller.signal,
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json() : null;

    if (!res.ok) {
      const msg =
        payload?.message ||
        payload?.error ||
        `Translate API Error (status ${res.status})`;
      throw new TranslateError(msg, res.status);
    }

    return payload as T;
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

/**
 * 1) 기본 번역: POST /api/v1/translate
 */
export async function getTranslate(
  body: TranslateRequest,
  opts?: { signal?: AbortSignal; timeoutMs?: number }
): Promise<TranslateSuccess> {
  const payload = await postJSON<TranslateSuccess>(
    `${BASE_URL}/api/v1/translate`,
    body,
    opts
  );

  // 응답 형태 검증
  if (
    !payload ||
    typeof payload?.data?.translatedText !== "string"
  ) {
    throw new TranslateError("Unexpected API response shape (/translate)");
  }

  // recommendations가 오더라도 무시하지 않고 그대로 보존
  return payload;
}

/**
 * 2) 추천문장 제공 + 번역: POST /api/v1/translate/recommend
 */
export async function getTranslateWithRecommend(
  body: TranslateRequest,
  opts?: { signal?: AbortSignal; timeoutMs?: number }
): Promise<TranslateSuccess> {
  const payload = await postJSON<TranslateSuccess>(
    `${BASE_URL}/api/v1/translate/recommend`,
    body,
    opts
  );

  if (
    !payload ||
    typeof payload?.data?.translatedText !== "string"
  ) {
    throw new TranslateError(
      "Unexpected API response shape (/translate/recommend)"
    );
  }

  // payload.data.recommendations 는 선택 필드
  return payload;
}
