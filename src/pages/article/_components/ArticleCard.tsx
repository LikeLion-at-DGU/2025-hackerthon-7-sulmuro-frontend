// article/_components/ArticleCard.tsx
import * as S from "./ArticleCard.styled";
import { useState, useEffect, useRef } from "react";
import { Article } from "../_apis/getArticle";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

type Props = {
    article: Article;
    onClick?: (id: string) => void;
};

const ArticleCard = ({ article, onClick }: Props) => {
    const { id, title, images = [], subtitle, place } = article;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const storageKey = id ? `bookmark:article:${id}` : "";
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    const saved = localStorage.getItem(storageKey);
    setIsBookmarked(saved === "1");
    }, [storageKey]);

    // 상태 변경 시 로컬스토리지에 반영
    useEffect(() => {
        if (!storageKey || typeof window === "undefined") return;
        localStorage.setItem(storageKey, isBookmarked ? "1" : "0");
    }, [storageKey, isBookmarked]);

    const toggleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 클릭과 분리
        setIsBookmarked((prev) => !prev);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: "smooth",
        });
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    return (
        <S.Wrapper
            onClick={() => onClick?.(id)}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : -1}
            aria-label={title}
        >
            <S.Header>
                <S.Name title={title}>{title}</S.Name>
                <img src={IMAGE_CONSTANTS.RightBtn} alt="오른쪽 화실표" />
            </S.Header>
            <S.SubTitle title={subtitle}>{subtitle}</S.SubTitle>
            <S.ImageScrollContainer ref={containerRef}>
                <S.BookmarkIcon
                    src={
                        isBookmarked
                        ? IMAGE_CONSTANTS.Bookmark
                        : IMAGE_CONSTANTS.FalseBookmark
                    }
                    alt={isBookmarked ? "북마크 설정됨" : "북마크 해제됨"}
                    onClick={toggleBookmark}
                />
                {images.map((src, idx) => (
                <S.ArticleImage key={idx} src={src} alt={`${title} 이미지 ${idx + 1}`} />
                ))}
            </S.ImageScrollContainer>
            <S.LocationWrapper>
                <img src={IMAGE_CONSTANTS.PlaceIcon} alt="위치" />
                <S.Address title={place}>{place}</S.Address>
            </S.LocationWrapper>
        </S.Wrapper>
    );
};

export default ArticleCard;


