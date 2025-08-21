// _hooks/UseImageAPI.ts
import { useCallback, useMemo, useRef, useState } from "react";
import {
    startChatWithImage,
    StartChatResponse,
    } from "../_apis/GetImageAPI";

/** dataURL → File 변환 유틸 */
async function dataUrlToFile(
    dataUrl: string,
    filename = "capture.png"
): Promise<File> {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const ext = blob.type.split("/")[1] || "png";
    return new File([blob], filename.endsWith(ext) ? filename : `${filename}.${ext}`, {
        type: blob.type || "image/png",
    });
}

type UseImageAPIParams = {
    /** 필요 시 Authorization 토큰 (예: 'Bearer xxx') */
    authToken?: string;
};

type StartArgs =
    | { file: File; filename?: string }
    | { dataUrl: string; filename?: string };

export function UseImageAPI(params?: UseImageAPIParams) {
    const [data, setData] = useState<StartChatResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const abortRef = useRef<AbortController | null>(null);

const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
}, []);

const cancel = useCallback(() => {
    abortRef.current?.abort();
}, []);

/**
 * 이미지 업로드 + 분석 시작
 * - CameraCapture에서 넘어오는 File 또는 dataUrl을 그대로 지원
 */
const start = useCallback(
        async (args: StartArgs) => {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            let file: File;
            if ("file" in args && args.file) {
            file = args.file;
            } else if ("dataUrl" in args && args.dataUrl) {
            file = await dataUrlToFile(args.dataUrl, args.filename ?? "capture");
            } else {
            throw new Error("file 또는 dataUrl이 필요합니다.");
            }

            const res = await startChatWithImage(file, {
            authToken: params?.authToken,
            signal: controller.signal,
            });

            setData(res);
            return res;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
            abortRef.current = null;
        }
        },
        [params?.authToken]
    );

    return useMemo(
        () => ({
        data, // { roomId, answer }
        loading,
        error,
        start, // start({ file }) 또는 start({ dataUrl })
        reset,
        cancel,
        }),
        [data, loading, error, start, reset, cancel]
    );
}
