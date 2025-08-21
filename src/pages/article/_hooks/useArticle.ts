// article/_hooks/useArticle.ts
import { useEffect, useMemo, useState } from "react";
import { Article, Category, getArticles, Place } from "../_apis/getArticle";

export function useArticle() {
    const [place, setPlace] = useState<Place>("전체");
    const [category, setCategory] = useState<Category>("음식");
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedArticle = useMemo(
        () => (selectedId ? articles.find((a) => a.id === selectedId) ?? null : null),
        [selectedId, articles]
    );

    const fetchArticles = async () => {
        try {
        setLoading(true);
        setErrorMsg(null);
        const res = await getArticles({ place, category });
        setArticles(res.data);
        } catch (err) {
        setErrorMsg("아티클을 불러오지 못했어요.");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [place, category]);

    const actions = useMemo(
        () => ({
        selectPlace: (p: Place) => setPlace(p),
        selectCategory: (c: Category) => setCategory(c),
        refetch: fetchArticles,
        openDetail: (id: string) => setSelectedId(id),
        closeDetail: () => setSelectedId(null),
        }),
        []
    );

    return {
        place,
        category,
        articles,
        loading,
        errorMsg,
        selectedArticle,
        ...actions,
    };
}
