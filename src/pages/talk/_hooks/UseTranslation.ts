// talk/_hooks/useTranslate.ts
import { useCallback, useRef, useState } from "react";
import {
    postTranslate,
    type TranslatePayload,
    type TranslateResult,
} from "../_apis/GetTranslation";

type UseTranslateOptions = {
  /** 기본 대상 언어 (UI에서 바꿀 수 있음) */
  defaultTarget?: string; // e.g. "en"
  /** 기본 소스 언어 ('auto' 권장) */
  defaultSource?: string; // e.g. "auto"
};

export function useTranslate(options?: UseTranslateOptions) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<TranslateResult | null>(null);

    const abortRef = useRef<AbortController | null>(null);

    const translate = useCallback(
        async (input: Partial<TranslatePayload> & { text: string }) => {
        // 이전 요청 중단
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);

        const payload: TranslatePayload = {
            text: input.text,
            target: input.target ?? options?.defaultTarget ?? "en",
            source: input.source ?? options?.defaultSource ?? "auto",
        };

        try {
            const data = await postTranslate(payload, controller.signal);
            setResult(data);
            return data;
        } catch (e: any) {
            if (e?.name === "AbortError") return; // 사용자가 취소
            const message =
            typeof e?.message === "string" ? e.message : "번역 중 오류가 발생했습니다.";
            setError(message);
            throw e;
        } finally {
            setLoading(false);
        }
        },
        [options?.defaultSource, options?.defaultTarget]
    );

    const cancel = useCallback(() => {
        abortRef.current?.abort();
    }, []);

    return { loading, error, result, translate, cancel };
}
