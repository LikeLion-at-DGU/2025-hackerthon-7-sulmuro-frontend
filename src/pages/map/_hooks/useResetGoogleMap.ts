import { useEffect, useRef, useState } from "react";

export const useResetGoogleMaps = (scriptId: string) => {
  const prevIdRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

    const prevId = prevIdRef.current;
    // 언어/지역이 바뀌어 scriptId가 바뀐 경우에만 정리
    if (prevId && prevId !== scriptId) {
      // 1) 이전 로더 스크립트 제거
      document.getElementById(prevId)?.remove();
      // 2) 기본 id로 붙었을 수도 있으니 이것도 제거
      document.getElementById("__googleMapsScriptId")?.remove();
      // 3) 혹시 남아 있는 maps api 스크립트 전부 제거
      document
        .querySelectorAll('script[src*="maps.googleapis.com/maps/api/js"]')
        .forEach((s) => s.remove());
      // 4) 전역 객체 초기화
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete window.google;
    }

    prevIdRef.current = scriptId;
    // 다음 틱에 Wrapper 렌더 시작
    const t = setTimeout(() => setReady(true), 0);
    return () => clearTimeout(t);
  }, [scriptId]);

  return ready; // true일 때만 Wrapper를 렌더하세요.
};
