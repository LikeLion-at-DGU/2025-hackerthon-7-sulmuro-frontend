// article/_apis/getArticle.ts
export type Place = "전체" | "광장시장" | "양재시장";
export type Category = "음식" | "쇼핑" | "역사";

export type Article = {
    id: string;
    title: string;
    subtitle: string;
    images: string[];      // 문단 사이사이에 쓸 이미지들 (0번은 히어로로도 사용)
    content: string[];     // 문단 배열
    place: Exclude<Place, "전체">;
    category: Category;
};

export type GetArticlesParams = {
  place?: Place;       // "전체"면 place 필터 미적용
  category?: Category; // 선택 시 카테고리 필터
  id?: string;         // 선택 시 단건 조회 흉내
};

// 더미 데이터
import { dummyArticles } from "../_mocks/dummyData";

export async function getArticles(params: GetArticlesParams = {}) {
    const { place = "전체", category, id } = params;

    let data = dummyArticles;

    if (id) {
        const found = data.find((a) => a.id === id);
        return Promise.resolve({ data: found ? [found] : [], total: found ? 1 : 0 });
    }

    if (place !== "전체") {
        data = data.filter((a) => a.place === place);
    }
    if (category) {
        data = data.filter((a) => a.category === category);
    }

    return Promise.resolve({ data, total: data.length });
}
