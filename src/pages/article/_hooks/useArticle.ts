// src/pages/article/_hooks/useArticle.ts
import { useCallback, useEffect, useState } from "react";
import {
  getArticles,
  getArticleDetail,
  type Article,
  type Place,
  type Category,
} from "../_apis/getArticle";

type Lang = "ko" | "en" | "zh";
interface UseArticleOptions {
  language?: Lang;
}

export const useArticle = (opts: UseArticleOptions = {}) => {
  const { language = "ko" } = opts;

  const [place, setPlace] = useState<Place>("전체");
  const [category, setCategory] = useState<Category>("음식");

  const [all, setAll] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await getArticles(language);
      setAll(data);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    setArticles(
      all.filter((a) => {
        const okPlace = place === "전체" ? true : a.place === place;
        const okCat = a.category === category;
        return okPlace && okCat;
      })
    );
  }, [all, place, category]);

  /** 상세를 블록 포함으로 불러오는 헬퍼 (상세 페이지에서 사용 가능) */
  const loadDetail = useCallback(
    async (id: number): Promise<Article> => {
      return await getArticleDetail(id, language);
    },
    [language]
  );

  return {
    place,
    category,
    selectPlace: (p: Place) => setPlace(p),
    selectCategory: (c: Category) => setCategory(c),
    articles,
    loading,
    errorMsg,
    refetch: fetchArticles,
    loadDetail, // 필요 시 사용
  };
};
