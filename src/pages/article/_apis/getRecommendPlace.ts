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

/** .env의 VITE_BASE_URL 사용 */
const BASE_URL = (import.meta as any).env?.VITE_BASE_URL ?? "";

/** 슬래시 중복 방지 */
const joinUrl = (base: string, path: string) =>
    `${String(base).replace(/\/+$/g, "")}/${String(path).replace(/^\/+/g, "")}`;

/** 간단 캐시 (articleId 단위) */
const cache = new Map<number, RecommendedPlace[]>();

/** 응답 정규화: data가 배열이 아니면 빈 배열로 */
function normalize(resp: unknown): RecommendedPlace[] {
    const r = resp as RecommendPlaceApiResponse | undefined;
    const raw = Array.isArray(r?.data) ? r!.data! : [];
    // image를 항상 string[]로 보장
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
     * @param articleId 글 ID (정수)
     * @param token     "Bearer ..." 토큰의 값(앞의 "Bearer "는 자동으로 붙습니다)
     * @param opts      fetch 옵션 (force: 캐시 무시, signal: AbortSignal)
     */
    export async function getRecommendPlace(
    articleId: number,
    token?: string,
    opts?: { signal?: AbortSignal; force?: boolean }
    ): Promise<RecommendedPlace[]> {
    if (!Number.isFinite(articleId)) {
        throw new Error("articleId가 올바르지 않습니다.");
    }

    if (!opts?.force && cache.has(articleId)) {
        return cache.get(articleId)!;
    }

    const url = joinUrl(BASE_URL, `/api/v1/articles/${articleId}/recommend`);

    const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, {
        method: "GET",
        headers,
        signal: opts?.signal,
    });

    // HTTP 에러 처리
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
        `추천 장소 요청 실패 (${res.status})${text ? `: ${text}` : ""}`
        );
    }

    // JSON 파싱 및 정규화
    let json: unknown;
    try {
        json = await res.json();
    } catch {
        json = { data: [] };
    }

    const list = normalize(json);
    cache.set(articleId, list);
    return list;
}

/** 캐시 비우기 (특정 글 또는 전체) */
export function clearRecommendPlaceCache(articleId?: number) {
    if (typeof articleId === "number") cache.delete(articleId);
    else cache.clear();
}
