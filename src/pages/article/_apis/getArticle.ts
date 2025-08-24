// src/pages/article/_apis/getArticle.ts
import axios from "axios";

const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.replace(/\/+$/, "") ?? "";

/** ===== API 원본 타입 ===== */
interface ApiArticle {
  id: number;
  title: string;
  subTitle: string;
  theme: "FOOD" | "SHOPPING" | "HISTORY" | string;
  createdAt: string;
  location: "GWANGJANG_MARKET" | "YANGJAE_MARKET" | string;
  imageUrls?: string[];
}
interface ApiArticleDetail extends ApiArticle {}

type BlockType = "IMAGE" | "TEXT";
interface ApiBlock {
  id: number;
  type: BlockType;
  data: string;      // TEXT: 본문 문자열, IMAGE: 이미지 경로/URL
  position: number;  // 정렬용
  createdAt: string; // 동순위 정렬 보조
}

interface ApiSuccess<T> {
  message: string;
  code: number;
  data: T;
}
interface ApiPage<T> {
  content: T[];
}

/** ===== UI에서 쓰는 타입 ===== */
export type Place = "전체" | "광장시장" | "양재시장";
export type Category = "음식" | "쇼핑" | "역사";

export interface Article {
  id: number;
  title: string;
  subtitle: string;            // API subTitle → UI subtitle
  place: Place | "기타";       // API location → 한글 장소
  category: Category | "기타"; // API theme → 한글 카테고리
  createdAt: string;
  images: string[];            // imageUrls 또는 IMAGE 블록
  content: string[];           // TEXT 블록
}

type Lang = "ko" | "en" | "zh";

/** ===== 매핑 유틸 ===== */
const mapLocationToPlace = (loc: ApiArticle["location"]): Article["place"] => {
  switch (loc) {
    case "GWANGJANG_MARKET":
      return "광장시장";
    case "YANGJAE_MARKET":
      return "양재시장";
    default:
      return "기타";
  }
};
const mapThemeToCategory = (t: ApiArticle["theme"]): Article["category"] => {
  switch (t) {
    case "FOOD":
      return "음식";
    case "SHOPPING":
      return "쇼핑";
    case "HISTORY":
      return "역사";
    default:
      return "기타";
  }
};
const toAbs = (p: string) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  const sep = p.startsWith("/") ? "" : "/";
  return `${BASE_URL}${sep}${p}`;
};
const sortBlocks = (blocks: ApiBlock[]) =>
  [...blocks].sort((a, b) => {
    if (a.position !== b.position) return a.position - b.position;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

/** ===== 목록 조회 ===== */
export const getArticles = async (language?: Lang): Promise<Article[]> => {
  try {
    const res = await axios.get<ApiSuccess<ApiPage<ApiArticle>>>(
      `${BASE_URL}/api/v1/articles`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language ?? "",
        },
        timeout: 15000,
      }
    );

    if (res.data.code !== 200) {
      throw new Error(res.data.message || "목록 조회 실패");
    }

    return (res.data.data?.content ?? []).map<Article>((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subTitle,
      place: mapLocationToPlace(a.location),
      category: mapThemeToCategory(a.theme),
      createdAt: a.createdAt,
      images: (a.imageUrls ?? []).filter(Boolean).map(toAbs), // 목록에서도 이미지 매핑
      content: [], // 본문은 상세/블록에서 채움
    }));
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ?? err?.message ?? "아티클을 불러오지 못했습니다.";
    throw new Error(msg);
  }
};

/** ===== 블록 조회 ===== */
export const getArticleBlocks = async (
  articleId: number,
  language?: Lang
): Promise<ApiBlock[]> => {
  const res = await axios.get<ApiSuccess<ApiBlock[]>>(
    `${BASE_URL}/api/v1/articles/${articleId}/blocks`,
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language ?? "",
      },
      timeout: 15000,
    }
  );
  if (res.data.code !== 200 || !Array.isArray(res.data.data)) {
    throw new Error(res.data.message || "블록 조회 실패");
  }
  return sortBlocks(res.data.data);
};

/** ===== 상세 조회(블록까지 합쳐 Article 완성) ===== */
export const getArticleDetail = async (
  articleId: number,
  language?: Lang
): Promise<Article> => {
  try {
    // 상세 + 블록 병렬 호출
    const [detailRes, blocks] = await Promise.all([
      axios.get<ApiSuccess<ApiArticleDetail>>(
        `${BASE_URL}/api/v1/articles/${articleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language ?? "",
          },
          timeout: 15000,
        }
      ),
      getArticleBlocks(articleId, language).catch(() => []), // 블록 실패 시 디그레이드
    ]);

    if (detailRes.data.code !== 200 || !detailRes.data.data) {
      throw new Error(detailRes.data.message || "상세 조회 실패");
    }

    const d = detailRes.data.data as ApiArticleDetail;

    // 블록 분리·매핑
    const textBlocks = (blocks as ApiBlock[]).filter((b) => b.type === "TEXT");
    const imageBlocks = (blocks as ApiBlock[])
      .filter((b) => b.type === "IMAGE")
      .map((b) => ({ ...b, data: toAbs(b.data) }));

    // 최종 이미지: 상세 imageUrls(있으면 우선) → 없으면 IMAGE 블록
    const images =
      (d.imageUrls && d.imageUrls.length > 0
        ? d.imageUrls.map(toAbs)
        : imageBlocks.map((b) => b.data)) ?? [];

    // 최종 본문 텍스트: TEXT 블록 순서대로
    const content = textBlocks.map((b) => b.data ?? "").filter(Boolean);

    return {
      id: d.id,
      title: d.title,
      subtitle: d.subTitle,
      place: mapLocationToPlace(d.location),
      category: mapThemeToCategory(d.theme),
      createdAt: d.createdAt,
      images,
      content,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ?? err?.message ?? "아티클 상세를 불러오지 못했습니다.";
    throw new Error(msg);
  }
};
