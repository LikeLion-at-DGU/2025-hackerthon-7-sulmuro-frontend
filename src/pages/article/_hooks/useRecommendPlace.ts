// src/pages/article/_hooks/useRecommendPlace.ts
import { useCallback, useEffect, useRef, useState } from "react";
import {
    getRecommendPlace,
    clearRecommendPlaceCache,
    type RecommendedPlace,
} from "../_apis/getRecommendPlace";

export type UseRecommendPlaceOptions = {
    immediate?: boolean;
    skip?: boolean;
    force?: boolean;
    token?: string;
};

export function useRecommendPlace(
    articleId: number | string | undefined,
    options: UseRecommendPlaceOptions = {}
    ) {
    const { immediate = true, skip = false, force = false, token } = options;

    const [places, setPlaces] = useState<RecommendedPlace[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(null);

    const fetchSeq = useRef(0);

    const doFetch = useCallback(
        async (signal?: AbortSignal, forceFetch?: boolean) => {
        const idNum =
            typeof articleId === "string" ? Number(articleId) : articleId;

        if (skip || idNum == null || !Number.isFinite(idNum)) return;

        const seq = ++fetchSeq.current;

        setLoading(true);
        setErrorMsg(null);

        try {
            const data = await getRecommendPlace(idNum as number, token, {
            signal,
            force: forceFetch ?? force,
            });

            if (seq === fetchSeq.current) {
            setPlaces(data);
            setLastFetchedAt(Date.now());
            }
        } catch (err: any) {
            if (err?.name === "AbortError") return;
            if (seq === fetchSeq.current) {
            setErrorMsg(
                err?.message ?? "추천 장소를 불러오는 중 오류가 발생했습니다."
            );
            }
        } finally {
            if (seq === fetchSeq.current) setLoading(false);
        }
        },
        [articleId, skip, force, token]
    );

    useEffect(() => {
        if (!immediate) return;
        const controller = new AbortController();
        void doFetch(controller.signal, force);
        return () => controller.abort();
    }, [doFetch, immediate, force]);

    const refetch = useCallback(() => {
        const controller = new AbortController();
        void doFetch(controller.signal, true);
    }, [doFetch]);

    const clearCache = useCallback(() => {
        const idNum =
        typeof articleId === "string" ? Number(articleId) : (articleId as number);
        if (Number.isFinite(idNum)) clearRecommendPlaceCache(idNum as number);
    }, [articleId]);

    return {
        places,
        loading,
        errorMsg,
        lastFetchedAt,
        refetch,
        clearCache,
        hasData: places.length > 0,
    };
}

export default useRecommendPlace;
