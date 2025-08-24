// _apis/GetImageAPI.ts
import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";

export type RecommendedStore = { name: string; notes?: string };
export type RecommendedQuestion = { question: string };
export type AnswerPayload = {
  itemName: string;
  description: string;
  isGwangjangItem: boolean;
  averagePrice?: string;
  recommendedStores?: RecommendedStore[];
  recommendedquestion?: RecommendedQuestion[];
};
export type StartChatResponse = {
  roomId: number;
  answer: AnswerPayload;
};

// ── Lang helpers ──
type Lang = "ko" | "en" | "zh";
const LANG_HEADER_NAME = "Accept-Language" as const;

const readLang = (): Lang => {
  try {
    const v = localStorage.getItem("lang");
    return v === "ko" || v === "en" || v === "zh" ? v : "en";
  } catch {
    return "en";
  }
};

// ✅ Vite base URL
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BASE_URL ||
  "";

const client = axios.create({ baseURL });

// ✅ 요청 인터셉터: Accept-Language = ko|en|zh 자동 주입
client.interceptors.request.use((config) => {
  // ✅ headers를 AxiosHeaders 인스턴스로 보정
  const headers =
    config.headers instanceof AxiosHeaders
      ? config.headers
      : new AxiosHeaders(config.headers);

  // 사용자가 이미 넣지 않았다면만 주입
  if (!headers.has(LANG_HEADER_NAME)) {
    headers.set(LANG_HEADER_NAME, readLang()); // 'ko' | 'en' | 'zh'
  }

  // FormData인 경우 Content-Type은 자동 설정되도록 냅둠
  config.headers = headers;
  return config;
});

// 선택: 수동 세팅 헬퍼
export function setImageApiLanguage(lang: Lang) {
  client.defaults.headers.common[LANG_HEADER_NAME] = lang;
}

export async function startChatWithImage(
  imageFile: File,
  options?: {
    authToken?: string;
    signal?: AbortSignal;
    axiosConfig?: AxiosRequestConfig;
  }
): Promise<StartChatResponse> {
  if (!imageFile) throw new Error("image 파일이 필요합니다.");

  const formData = new FormData();
  formData.append("image", imageFile);

  const headers: Record<string, string> = {};
  if (options?.authToken) headers["Authorization"] = options.authToken;
  // ❌ Content-Type 미설정: 브라우저/axios가 자동으로 multipart/form-data; boundary=... 부여

  const res = await client.post<StartChatResponse>(
    "/api/v1/chat/start",
    formData,
    {
      headers,
      signal: options?.signal,
      ...(options?.axiosConfig ?? {}),
    }
  );
  return res.data;
}
