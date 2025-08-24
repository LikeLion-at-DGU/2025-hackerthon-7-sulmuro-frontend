import { useCallback, useEffect, useRef, useState } from "react";
import {
  createSpeechRecognizer,
  speak,         // ✅ 항상 한국어로만 말하도록 강제됨
  cancelSpeak,
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
  speak: (text: string, opts?: Parameters<typeof speak>[1]) => void; // 한국어 고정
  cancelSpeak: () => void;
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

  // 브라우저에 따라 Voice 목록은 비동기로 로드됨
  useEffect(() => {
    const loadVoices = () => setVoices(listVoices());
    loadVoices();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
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
    speak,         // ✅ 외부에서 어떤 옵션을 주더라도 ko-KR로만 재생
    cancelSpeak,
    voices,
  };
};
