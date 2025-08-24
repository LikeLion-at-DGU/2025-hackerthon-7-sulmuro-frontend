// talk/_apis/GetSpeachText.ts

/*************************
 * T T S
 *************************/
let voicesCache: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const ready = window.speechSynthesis?.getVoices?.() ?? [];
    if (ready.length) {
      voicesCache = ready;
      resolve(voicesCache);
      return;
    }
    const handler = () => {
      voicesCache = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener("voiceschanged", handler as any);
      resolve(voicesCache);
    };
    window.speechSynthesis.addEventListener("voiceschanged", handler as any);
  });
}

/** 현재 로드된 보이스 목록(없으면 브라우저 보이스를 즉시 시도) */
export function listVoices(): SpeechSynthesisVoice[] {
  try {
    const got = window.speechSynthesis?.getVoices?.() ?? [];
    if (got.length) voicesCache = got;
  } catch {}
  return voicesCache;
}

export interface SpeakOptions {
  /** ex) 'ko-KR', 'en-US', 'zh-CN' */
  lang?: string;
  /** 특정 보이스 지정 (name 또는 lang 코드/객체) */
  voice?: string | SpeechSynthesisVoice;
  rate?: number;   // 0.1 ~ 10 (기본 1)
  pitch?: number;  // 0 ~ 2 (기본 1)
  volume?: number; // 0 ~ 1 (기본 1)
  onend?: () => void;
  onerror?: (e: SpeechSynthesisErrorEvent) => void;
}

/** 텍스트를 음성으로 재생 */
export async function speak(text: string, opts: SpeakOptions = {}) {
  if (!("speechSynthesis" in window)) return;
  if (!text) return;

  const utter = new SpeechSynthesisUtterance(text);

  if (opts.lang) utter.lang = opts.lang;
  if (typeof opts.rate === "number") utter.rate = opts.rate;
  if (typeof opts.pitch === "number") utter.pitch = opts.pitch;
  if (typeof opts.volume === "number") utter.volume = opts.volume;

  if (opts.onend) utter.onend = opts.onend;
  if (opts.onerror) utter.onerror = opts.onerror;

  // 보이스 로딩/선택
  const voices = await loadVoices();
  if (opts.voice) {
    if (typeof opts.voice === "string") {
      const byName = voices.find((v) => v.name === opts.voice);
      const byLang = voices.find((v) => v.lang === opts.voice);
      utter.voice = byName || byLang || null;
    } else {
      utter.voice = opts.voice;
    }
  } else if (opts.lang) {
    const byLang = voices.find((v) => v.lang === opts.lang);
    if (byLang) utter.voice = byLang;
  }

  // 기존 재생 중인 음성 중단 후 재생
  try {
    window.speechSynthesis.cancel();
  } catch {}
  window.speechSynthesis.speak(utter);
}

export function stopSpeak() {
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

/*************************
 * S T T
 *************************/
// 최소한의 타입(브라우저별 webkitSpeechRecognition 대응)
type RecognitionLike = any; // TS DOM 라이브러리에 없을 수 있어 any로 처리

export interface STTOptions {
  lang: string;            // "ko-KR" | "en-US" ...
  continuous?: boolean;    // default true
  interimResults?: boolean;// default true
  maxAlternatives?: number;// default 1
}

interface STTHooks {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (message: string) => void;
  onResult?: (finalText: string, interimText: string) => void;
}

export function createSpeechRecognizer(options: STTOptions, hooks: STTHooks) {
  const isSupported =
    typeof window !== "undefined" &&
    (("SpeechRecognition" in window) || ("webkitSpeechRecognition" in window));

  if (!isSupported) {
    // 미지원 환경에서도 일관된 반환
    return {
      isSupported: false,
      start: () => {},
      stop: () => {},
      abort: () => {},
    };
  }

  const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition: RecognitionLike = new SR();

  recognition.lang = options.lang;
  recognition.continuous = options.continuous ?? true;
  recognition.interimResults = options.interimResults ?? true;
  recognition.maxAlternatives = options.maxAlternatives ?? 1;

  let finalBuffer = "";

  recognition.onstart = () => {
    finalBuffer = "";
    hooks.onStart?.();
  };

  recognition.onend = () => {
    hooks.onEnd?.();
  };

  recognition.onerror = (e: any) => {
    const msg =
      e?.error === "not-allowed"
        ? "Microphone permission denied"
        : e?.error || "Recognition error";
    hooks.onError?.(msg);
  };

  recognition.onresult = (event: any) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const res = event.results[i];
      const transcript = res[0]?.transcript ?? "";
      if (res.isFinal) {
        finalBuffer = (finalBuffer ? finalBuffer + " " : "") + transcript.trim();
      } else {
        interim += transcript;
      }
    }
    hooks.onResult?.(finalBuffer, interim.trim());
  };

  return {
    isSupported: true,
    start: () => {
      try {
        recognition.start();
      } catch {}
    },
    stop: () => {
      try {
        recognition.stop();
      } catch {}
    },
    abort: () => {
      try {
        recognition.abort();
      } catch {}
    },
  };
}
