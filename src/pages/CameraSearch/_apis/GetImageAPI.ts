// _apis/GetImageAPI.ts
import axios, { AxiosRequestConfig } from "axios";

export type RecommendedStore = { name: string; notes?: string };
export type RecommendedQuestion = { question: string };
export type AnswerPayload = {
  itemName: string;
  description: string;
  isGwangjangItem: boolean;
  recommendedStores?: RecommendedStore[];
  recommendedquestion?: RecommendedQuestion[];
};
export type StartChatResponse = {
  roomId: number;
  answer: AnswerPayload;
};

// ✅ Vite 환경에서는 import.meta.env만 사용
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_BASE_URL || // ← 이 줄 추가
  "";

const client = axios.create({
  baseURL,
});

export async function startChatWithImage(
  imageFile: File,
  options?: {
    authToken?: string;
    signal?: AbortSignal;
    axiosConfig?: AxiosRequestConfig;
  }
): Promise<StartChatResponse> {
  if (!imageFile) {
    throw new Error("image 파일이 필요합니다.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const headers: Record<string, string> = {};
  if (options?.authToken) {
    headers["Authorization"] = options.authToken;
  }

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
