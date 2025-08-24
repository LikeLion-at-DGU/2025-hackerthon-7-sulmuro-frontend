// talk/_hooks/useTranslate.ts
import { useCallback, useMemo, useRef, useState } from "react";
import {
    getTranslate,
    getTranslateWithRecommend,
    TranslateRequest,
    TranslateSuccess,
    TranslateError,
} from "../_apis/GetTranslation";

type Status = "idle" | "loading" | "success" | "error";
type Mode = "basic" | "recommend";

export interface UseTranslateOptions {
  mode?: Mode; // default: 'basic'
}

export function useTranslate(options?: UseTranslateOptions) {
    const mode: Mode = options?.mode ?? "basic";

    const [status, setStatus] = useState<Status>("idle");
    const [data, setData] = useState<TranslateSuccess["data"] | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [code, setCode] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);

    const translate = useCallback(
        async (req: TranslateRequest, opts?: { timeoutMs?: number }) => {
        // 진행 중인 요청 취소
        if (abortRef.current) {
            abortRef.current.abort();
        }
        const controller = new AbortController();
        abortRef.current = controller;

        setStatus("loading");
        setError(null);
        setMessage(null);
        setCode(null);

        try {
            const res =
            mode === "recommend"
                ? await getTranslateWithRecommend(req, {
                    signal: controller.signal,
                    timeoutMs: opts?.timeoutMs ?? 15000,
                })
                : await getTranslate(req, {
                    signal: controller.signal,
                    timeoutMs: opts?.timeoutMs ?? 15000,
                });

            // 공통 데이터(번역문 + 선택적 추천) 저장
            setData(res.data);
            setMessage(res.message ?? null);
            setCode(typeof res.code === "number" ? res.code : null);
            setStatus("success");
            return res.data; // { translatedText, recommendations? }
        } catch (e) {
            const err = e as TranslateError;
            setError(err.message);
            setStatus("error");
            throw err;
        } finally {
            if (abortRef.current === controller) {
            abortRef.current = null;
            }
        }
        },
        [mode]
    );

    const cancel = useCallback(() => {
        abortRef.current?.abort();
        abortRef.current = null;
        setStatus("idle");
    }, []);

    const reset = useCallback(() => {
        setStatus("idle");
        setData(null);
        setMessage(null);
        setCode(null);
        setError(null);
    }, []);

    const loading = status === "loading";
    const success = status === "success";
    const failure = status === "error";

    return useMemo(
        () => ({
        // state
        status,
        loading,
        success,
        failure,
        data,       // { translatedText, recommendations? }
        message,    // ex) "번역이 완료되었습니다."
        code,       // 200
        error,

        // actions
        translate,
        cancel,
        reset,
        }),
        [status, loading, success, failure, data, message, code, error, translate, cancel, reset]
    );
}
