// src/pages/article/_apis/getRecommendPlace.ts
export interface RecommendedPlace {
    id: number;
    name: string;
    category: string;
    content: string;
    lat: number;
    lng: number;
    address: string;
    location: string; // e.g. "GWANGJANG_MARKET"
    image: string[];  // 항상 배열로 보장
}

export interface RecommendPlaceApiResponse {
    message?: string;
    code?: number;
    data?: RecommendedPlace[];
}

/** 언어 코드 (헤더 Accept-Language 에 사용) */
export type LangCode = "ko" | "en" | "zh";

/** .env의 VITE_BASE_URL 사용 */
const BASE_URL = (import.meta as any).env?.VITE_BASE_URL ?? "";

/** 슬래시 중복 방지 */
const joinUrl = (base: string, path: string) =>
    `${String(base).replace(/\/+$/g, "")}/${String(path).replace(/^\/+/g, "")}`;

/** 언어별 응답이 다르므로 (articleId + lang) 단위로 캐시 */
const cache = new Map<string, RecommendedPlace[]>();
const makeCacheKey = (articleId: number, lang?: LangCode) =>
    `${articleId}|${lang ?? "default"}`;

function normalize(resp: unknown): RecommendedPlace[] {
    const r = resp as RecommendPlaceApiResponse | undefined;
    const raw = Array.isArray(r?.data) ? r!.data! : [];
    return raw.map((p, i) => ({
        ...p,
        id: typeof p.id === "number" ? p.id : i + 1,
        image: Array.isArray(p.image)
        ? p.image.filter((u) => typeof u === "string")
        : typeof (p as any).image === "string"
        ? [(p as any).image]
        : [],
    }));
}

/**
 * GET /api/v1/articles/{articleId}/recommend
 * @param articleId 글 ID
 * @param token     액세스 토큰 값 (앞에 "Bearer " 자동 부착)
 * @param opts      { signal, force, lang } - lang 지정 시 Accept-Language 헤더로 보냄
 */
export async function getRecommendPlace(
    articleId: number,
    token?: string,
    opts?: { signal?: AbortSignal; force?: boolean; lang?: LangCode }
    ): Promise<RecommendedPlace[]> {
    if (!Number.isFinite(articleId)) {
        throw new Error("articleId가 올바르지 않습니다.");
    }

    const cacheKey = makeCacheKey(articleId, opts?.lang);
    if (!opts?.force && cache.has(cacheKey)) {
        return cache.get(cacheKey)!;
    }

    const url = joinUrl(BASE_URL, `/api/v1/articles/${articleId}/recommend`);

    const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;
    if (opts?.lang) headers["Accept-Language"] = opts.lang; // ✅ 언어 헤더

    const res = await fetch(url, {
        method: "GET",
        headers,
        signal: opts?.signal,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
        `추천 장소 요청 실패 (${res.status})${text ? `: ${text}` : ""}`
        );
    }

    let json: unknown;
    try {
        json = await res.json();
    } catch {
        json = { data: [] };
    }

    const list = normalize(json);
    cache.set(cacheKey, list);
    return list;
    }

    /** 캐시 비우기 (articleId 주면 해당 글의 모든 언어 캐시 제거) */
    export function clearRecommendPlaceCache(articleId?: number) {
    if (typeof articleId === "number") {
        const prefix = `${articleId}|`;
        for (const key of Array.from(cache.keys())) {
        if (key.startsWith(prefix)) cache.delete(key);
        }
    } else {
        cache.clear();
    }
}
