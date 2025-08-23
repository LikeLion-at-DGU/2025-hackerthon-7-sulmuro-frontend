// STT + TTS 유틸 (브라우저 내장 API)
// - STT: window.SpeechRecognition | webkitSpeechRecognition
// - TTS: window.speechSynthesis

export type STTOptions = {
    lang?: string;          // 예: "ko-KR", "en-US"
    continuous?: boolean;   // 연속 인식
    interimResults?: boolean; // 중간 결과 제공
    maxAlternatives?: number;
};

export type STTEvents = {
    onResult?: (finalText: string, interimText: string) => void;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: string) => void;
};

export type STTController = {
    start: () => void;
    stop: () => void;
    abort: () => void;
    isSupported: boolean;
};

interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

export const createSpeechRecognizer = (
    options: STTOptions = {},
    events: STTEvents = {}
    ): STTController => {
    const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const isSupported = !!SpeechRecognition;
    if (!isSupported) {
        return {
        start: () => {},
        stop: () => {},
        abort: () => {},
        isSupported: false,
        };
    }

    const rec = new SpeechRecognition();
    rec.lang = options.lang ?? "ko-KR";
    rec.continuous = options.continuous ?? true;
    rec.interimResults = options.interimResults ?? true;
    (rec as any).maxAlternatives = options.maxAlternatives ?? 1;

    let finalBuffer = "";

    rec.onstart = () => events.onStart?.();
    rec.onend = () => events.onEnd?.();
    rec.onerror = (e: any) => events.onError?.(e?.error ?? "unknown_error");
    rec.onresult = (e: SpeechRecognitionEvent) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
            const transcript = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
            finalBuffer += transcript;
            } else {
            interim += transcript;
            }
        }
        events.onResult?.(finalBuffer, interim);
    };

  return {
    start: () => {
      try {
        finalBuffer = "";
        rec.start();
      } catch {
        // start()가 이미 호출된 경우 등
      }
    },
    stop: () => rec.stop(),
    abort: () => rec.abort(),
    isSupported,
  };
};

// ---------- TTS ----------
export type SpeakOptions = {
  lang?: string;    // "ko-KR"
  rate?: number;    // 0.1 ~ 10 (기본 1)
  pitch?: number;   // 0 ~ 2 (기본 1)
  volume?: number;  // 0 ~ 1 (기본 1)
  voiceName?: string; // 특정 보이스 이름 선택
};

export const speak = (text: string, opts: SpeakOptions = {}) => {
  if (!("speechSynthesis" in window)) return;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = opts.lang ?? "ko-KR";
  if (opts.rate) utter.rate = opts.rate;
  if (opts.pitch) utter.pitch = opts.pitch;
  if (opts.volume !== undefined) utter.volume = opts.volume;

  const voices = window.speechSynthesis.getVoices();
  if (opts.voiceName) {
    const v = voices.find((vv) => vv.name === opts.voiceName);
    if (v) utter.voice = v;
  }
  window.speechSynthesis.cancel(); // 큐 비우고
  window.speechSynthesis.speak(utter);
};

export const cancelSpeak = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

export const listVoices = (): SpeechSynthesisVoice[] => {
  if (!("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices();
};
