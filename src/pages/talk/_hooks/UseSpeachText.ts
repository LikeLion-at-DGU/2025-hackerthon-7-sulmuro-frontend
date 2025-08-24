// talk/_hooks/UseSpeachText.ts
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSpeechRecognizer,
  speak,
  listVoices,
  STTOptions,
} from "../_apis/GetSpeachText";

export type UseSpeechTextReturn = {
  listening: boolean;
  supported: boolean;
  finalText: string;
  interimText: string;
  error: string | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
  reset: () => void;
  cancelSpeak: () => void;
  speak: (text: string, opts?: Parameters<typeof speak>[1]) => void;
  voices: SpeechSynthesisVoice[];
};

export const useSpeachText = (
  sttOptions: STTOptions = { lang: "ko-KR", continuous: true, interimResults: true }
): UseSpeechTextReturn => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [finalText, setFinalText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const recRef = useRef<ReturnType<typeof createSpeechRecognizer> | null>(null);

  const cancelSpeak = useCallback(() => {
    if ("speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }, []);

  // STT 초기화
  useEffect(() => {
    const controller = createSpeechRecognizer(sttOptions, {
      onStart: () => {
        setListening(true);
        setError(null);
      },
      onEnd: () => setListening(false),
      onError: (err) => {
        setError(err);
        setListening(false);
      },
      onResult: (finalBuf, interim) => {
        setFinalText(finalBuf);
        setInterimText(interim);
      },
    });

    recRef.current = controller;
    setSupported(controller.isSupported);

    return () => {
      try {
        controller.abort();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sttOptions.lang, sttOptions.continuous, sttOptions.interimResults, sttOptions.maxAlternatives]);

  // 보이스 목록 로딩
  useEffect(() => {
    const load = () => setVoices(listVoices());
    load();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = load;
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const start = useCallback(() => recRef.current?.start(), []);
  const stop = useCallback(() => recRef.current?.stop(), []);
  const abort = useCallback(() => recRef.current?.abort(), []);
  const reset = useCallback(() => {
    setFinalText("");
    setInterimText("");
    setError(null);
  }, []);

  return {
    listening,
    supported,
    finalText,
    interimText,
    error,
    start,
    stop,
    abort,
    reset,
    speak,        // 원하는 {lang}으로 사용 가능
    cancelSpeak,
    voices,
  };
};
