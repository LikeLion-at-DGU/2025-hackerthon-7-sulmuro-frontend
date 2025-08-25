// src/pages/article/_hooks/useArticle.ts
import { useCallback, useEffect, useState } from "react";
import {
  getArticles,
  getArticleDetail,
  type Article,
  type Place,
  type Category,
} from "../_apis/getArticle";
import { useLanguage } from "@/components/contexts/LanguageContext";

type Lang = "ko" | "en" | "zh";

interface UseArticleOptions {
  /** 전달 시 컨텍스트 언어보다 우선합니다(선택). */
  language?: Lang;
}

export const useArticle = (opts: UseArticleOptions = {}) => {
  const { language: ctxLang } = useLanguage(); // 'ko' | 'en' | 'zh'
  const lang: Lang = opts.language ?? ctxLang;

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
      const data = await getArticles(lang);
      const reversedData = data.reverse();
      setAll(reversedData);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [lang]);

  // 언어가 바뀌면 재요청
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // 필터링
  useEffect(() => {
    setArticles(
      all.filter((a) => {
        const okPlace = place === "전체" ? true : a.place === place;
        const okCat = a.category === category;
        return okPlace && okCat;
      })
    );
  }, [all, place, category]);

  /** 상세(블록 포함) 로드 */
  const loadDetail = useCallback(
    async (id: number): Promise<Article> => {
      return await getArticleDetail(id, lang); // ✅ Accept-Language 적용
    },
    [lang]
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
    loadDetail,
  };
};
