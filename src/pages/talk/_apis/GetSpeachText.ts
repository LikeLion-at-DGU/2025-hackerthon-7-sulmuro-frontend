// STT + TTS 유틸 (브라우저 내장 API)
// - STT: window.SpeechRecognition | webkitSpeechRecognition
// - TTS: window.speechSynthesis
// ⚠️ TTS는 항상 한국어(ko-KR)로만 재생되도록 강제

export type STTOptions = {
  lang?: string;           // 예: "ko-KR", "en-US"
  continuous?: boolean;    // 연속 인식
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

// ---------- STT ----------
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
        // 이미 start()된 경우 등
      }
    },
    stop: () => rec.stop(),
    abort: () => rec.abort(),
    isSupported,
  };
};

// ---------- TTS (항상 한국어) ----------

export type SpeakOptions = {
  // lang는 무시됨(항상 ko-KR)
  rate?: number;     // 0.1 ~ 10 (기본 1)
  pitch?: number;    // 0 ~ 2 (기본 1)
  volume?: number;   // 0 ~ 1 (기본 1)
  voiceName?: string; // 특정 보이스 이름 (ko-KR인 경우만 적용)
};

const pickKoreanVoice = (voices: SpeechSynthesisVoice[], preferredName?: string) => {
  // 선호 이름이 ko 보이스일 경우 우선
  if (preferredName) {
    const exact = voices.find(v => v.name === preferredName && v.lang?.toLowerCase().startsWith("ko"));
    if (exact) return exact;
  }
  // ko-KR 우선, 없으면 ko-*
  const koKR = voices.find(v => v.lang?.toLowerCase() === "ko-kr");
  if (koKR) return koKR;
  return voices.find(v => v.lang?.toLowerCase().startsWith("ko"));
};

/**
 * 항상 한국어(ko-KR)로만 말하는 TTS
 * opts.lang을 전달해도 무시하고, ko 보이스를 우선적으로 선택함.
 */
export const speak = (text: string, opts: SpeakOptions = {}) => {
  if (!("speechSynthesis" in window)) return;

  const ss = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);

  // ✅ 한국어 고정
  utter.lang = "ko-KR";
  if (opts.rate) utter.rate = opts.rate;
  if (opts.pitch) utter.pitch = opts.pitch;
  if (opts.volume !== undefined) utter.volume = opts.volume;

  const attemptSpeak = () => {
    const voices = ss.getVoices();
    const voice = pickKoreanVoice(voices, opts.voiceName);
    if (voice) utter.voice = voice;
    ss.cancel(); // 큐 비우기
    ss.speak(utter);
  };

  // 일부 브라우저는 첫 호출 시 voice 목록이 비어 있음
  if (ss.getVoices().length === 0) {
    const handler = () => {
      attemptSpeak();
      ss.onvoiceschanged = null;
    };
    ss.onvoiceschanged = handler;
    // 혹시라도 이벤트가 안 오더라도 기본 보이스로 재생 시도
    setTimeout(() => {
      if (ss.onvoiceschanged) return; // 이미 처리됨
      attemptSpeak();
    }, 250);
  } else {
    attemptSpeak();
  }
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
