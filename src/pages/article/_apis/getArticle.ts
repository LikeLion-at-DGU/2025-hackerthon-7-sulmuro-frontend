// src/pages/article/_apis/getArticle.ts
import axios from "axios";

const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string | undefined)?.replace(/\/+$/, "") ?? "";

/** ===== API 원본 타입 ===== */
interface ApiArticle {
  id: number;
  title: string;
  subTitle: string;
  theme: "FOOD" | "SHOP" | "HISTORY" | string;
  createdAt: string;
  location: "GWANGJANG_MARKET" | "YANGJAE_MARKET" | string;
  imageUrls?: string[];
}
interface ApiArticleDetail extends ApiArticle {}

type BlockType = "IMAGE" | "TEXT";
interface ApiBlock {
  id: number;
  type: BlockType;
  data: string;
  position: number;
  createdAt: string;
}

interface ApiSuccess<T> { message: string; code: number; data: T; }
interface ApiPage<T> { content: T[]; }

/** ===== UI 타입 ===== */
export type Place = "전체" | "광장시장" | "양재시장";
export type Category = "음식" | "쇼핑" | "역사";

export type ContentBlock =
  | { type: "IMAGE"; data: string; position: number }
  | { type: "TEXT"; data: string; position: number };

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  place: Place | "기타";
  category: Category | "기타";
  createdAt: string;
  images: string[];
  content: string[];
  /** ✅ 상세 헤더 썸네일 */
  heroImage?: string;
  /** ✅ 본문 렌더용 블록( position ≥ 1 ) */
  blocks?: ContentBlock[];
}

type Lang = "ko" | "en" | "zh";

/** ===== 유틸 ===== */
const mapLocationToPlace = (loc: ApiArticle["location"]): Article["place"] => {
  switch (loc) {
    case "GWANGJANG_MARKET": return "광장시장";
    case "YANGJAE_MARKET":   return "양재시장";
    default:                 return "기타";
  }
};
const mapThemeToCategory = (t: ApiArticle["theme"]): Article["category"] => {
  switch (t) {
    case "FOOD":    return "음식";
    case "SHOP":return "쇼핑";
    case "HISTORY": return "역사";
    default:        return "기타";
  }
};
const toAbs = (p: string) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  const sep = p.startsWith("/") ? "" : "/";
  return `${BASE_URL}${sep}${p}`;
};
/** position asc, 같은 position에선 IMAGE → TEXT, 그 뒤 createdAt asc */
const sortBlocks = (blocks: ApiBlock[]) =>
  [...blocks].sort((a, b) => {
    if (a.position !== b.position) return a.position - b.position;
    const weight = (t: BlockType) => (t === "IMAGE" ? 0 : 1);
    if (weight(a.type) !== weight(b.type)) return weight(a.type) - weight(b.type);
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

/** ===== 목록 조회(변경 없음) ===== */
export const getArticles = async (language?: Lang): Promise<Article[]> => {
  const res = await axios.get<ApiSuccess<ApiPage<ApiArticle>>>(`${BASE_URL}/api/v1/articles`, {
    headers: { "Content-Type": "application/json", "Accept-Language": language ?? "" },
    timeout: 15000,
  });
  if (res.data.code !== 200) throw new Error(res.data.message || "목록 조회 실패");

  return (res.data.data?.content ?? []).map<Article>((a) => ({
    id: a.id,
    title: a.title,
    subtitle: a.subTitle,
    place: mapLocationToPlace(a.location),
    category: mapThemeToCategory(a.theme),
    createdAt: a.createdAt,
    images: (a.imageUrls ?? []).filter(Boolean).map(toAbs),
    content: [],
  }));
};

/** ===== 블록 조회 ===== */
export const getArticleBlocks = async (articleId: number, language?: Lang): Promise<ApiBlock[]> => {
  const res = await axios.get<ApiSuccess<ApiBlock[]>>(
    `${BASE_URL}/api/v1/articles/${articleId}/blocks`,
    { headers: { "Content-Type": "application/json", "Accept-Language": language ?? "" }, timeout: 15000 }
  );
  if (res.data.code !== 200 || !Array.isArray(res.data.data)) {
    throw new Error(res.data.message || "블록 조회 실패");
  }
  return sortBlocks(res.data.data);
};

/** ===== 상세 조회(썸네일 분리 + 본문 블록 position≥1만 제공) ===== */
export const getArticleDetail = async (articleId: number, language?: Lang): Promise<Article> => {
  const [detailRes, blocksRaw] = await Promise.all([
    axios.get<ApiSuccess<ApiArticleDetail>>(`${BASE_URL}/api/v1/articles/${articleId}`, {
      headers: { "Content-Type": "application/json", "Accept-Language": language ?? "" },
      timeout: 15000,
    }),
    getArticleBlocks(articleId, language).catch(() => []),
  ]);

  if (detailRes.data.code !== 200 || !detailRes.data.data) {
    throw new Error(detailRes.data.message || "상세 조회 실패");
  }
  const d = detailRes.data.data;

  // 정렬 + 매핑
  const ordered = (blocksRaw as ApiBlock[]).map<ContentBlock>((b) =>
    b.type === "IMAGE"
      ? { type: "IMAGE", data: toAbs(b.data), position: b.position }
      : { type: "TEXT", data: b.data ?? "", position: b.position }
  );

  // ✅ hero: position === 0 인 IMAGE 중 첫 번째
  const heroImage = ordered.find((b) => b.type === "IMAGE" && b.position === 0)?.data
    ?? (d.imageUrls?.[0] ? toAbs(d.imageUrls[0]) : undefined);

  // ✅ 본문 블록: position ≥ 1 (또는 pos=0이지만 IMAGE 아닌 경우는 거의 없겠지만 배제)
  const blocks = ordered.filter((b) => b.position >= 1);

  // 파생 필드(옵션): TEXT만 배열로
  const content = blocks.filter((b) => b.type === "TEXT").map((b) => b.data);

  // 참고용 이미지 목록(사용 안 할 수도 있음): blocks의 IMAGE + 상세 imageUrls
  const images =
    (d.imageUrls && d.imageUrls.length > 0
      ? d.imageUrls.map(toAbs)
      : ordered.filter((b) => b.type === "IMAGE").map((b) => b.data)) ?? [];

  return {
    id: d.id,
    title: d.title,
    subtitle: d.subTitle,
    place: mapLocationToPlace(d.location),
    category: mapThemeToCategory(d.theme),
    createdAt: d.createdAt,
    heroImage,
    blocks,
    content,
    images,
  };
};
