import * as S from "./RecommendStore.styled";
import PlaceCard from "./PlaceCard";
import type { RecommendedPlace } from "../_apis/getRecommendPlace";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { useMemo } from "react";

type Props = {
    places: RecommendedPlace[];
    loading?: boolean;
    errorMsg?: string;
    /** 각 카드 클릭 시 이동할 경로 생성기 (미전달 시 기본값 사용) */
    buildPlacePath?: (id: number) => string;
};

const RecommedStore = ({ places, loading, errorMsg, buildPlacePath }: Props) => {
    const { language } = useLanguage();

    // ✅ 라벨 현지화
    const t = useMemo(() => {
        return {
        title: language === "ko" ? "관련 장소" : language === "zh" ? "相关地点" : "Related places",
        subtitle:
            language === "ko"
            ? "아티클과 관련하여 들려보면 좋을 장소들이에요"
            : language === "zh"
            ? "与文章相关，值得一去的地点"
            : "Places you might want to visit related to this article",
        loading: language === "ko" ? "불러오는 중..." : language === "zh" ? "加载中..." : "Loading...",
        };
    }, [language]);

    const getPath = (id: number) => (buildPlacePath ? buildPlacePath(id) : `/map?place=${id}`);

    return (
        <S.Wrapper>
        <S.Header>
            <p className="title">{t.title}</p>
            <p>{t.subtitle}</p>
        </S.Header>

        {loading && <div style={{ padding: "8px 0" }}>{t.loading}</div>}
        {errorMsg && !loading && <div role="alert" style={{ padding: "8px 0" }}>{errorMsg}</div>}

        <S.PlaceGrid>
            {places.slice(0, 4).map((p) => (
            <PlaceCard
                key={p.id}
                id={p.id}
                name={p.name}
                address={p.address}
                thumbnailUrl={p.image?.[0] ?? ""}
                path={getPath(p.id)}
            />
            ))}
        </S.PlaceGrid>
        </S.Wrapper>
    );
};

export default RecommedStore;
