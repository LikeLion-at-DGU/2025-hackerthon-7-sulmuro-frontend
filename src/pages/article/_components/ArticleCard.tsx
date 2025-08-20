// article/_components/ArticleCard.tsx
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Article } from "../_apis/getArticle";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";

type Props = {
    article: Article;
    onClick?: (id: string) => void;
};

const ArticleCard = ({ article, onClick }: Props) => {
    const { id, title, images = [], place } = article;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation(); // 카드 클릭 이벤트와 분리
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
        <Wrapper
        onClick={() => onClick?.(id)}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : -1}
        aria-label={title}
        >
        <ImageScrollContainer ref={containerRef}>
            <BookmarkIcon
                src={
                    isBookmarked
                    ? IMAGE_CONSTANTS.Bookmark
                    : IMAGE_CONSTANTS.FalseBookmark
                }
                alt={isBookmarked ? "북마크 설정됨" : "북마크 해제됨"}
                onClick={toggleBookmark}
            />
            {images.map((src, idx) => (
            <ArticleImage key={idx} src={src} alt={`${title} 이미지 ${idx + 1}`} />
            ))}
        </ImageScrollContainer>

        <Name title={title}>{title}</Name>

        <LocationWrapper>
            <img src={IMAGE_CONSTANTS.PlaceIcon} alt="위치" />
            <Address title={place}>{place}</Address>
        </LocationWrapper>
        </Wrapper>
    );
};

export default ArticleCard;

/* ================= styled ================= */

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative; /* 북마크 아이콘 기준 */
    gap: 4px;

    flex: 1;
    min-width: 0;
    cursor: pointer;
    outline: none;

    &:focus-visible {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.N30};
        border-radius: 8px;
    }
`;

const ImageScrollContainer = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 4px;

    /* 스크롤바 숨김 */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ArticleImage = styled.img`
    width: 208px;
    height: 140px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0; /* 부모 너비에 맞춰 줄어들지 않도록 */
`;

const BookmarkIcon = styled.img`
    position: absolute;
    width: 28px;
    top: 10px;
    left: 10px;
    z-index: 1;
    `;

    const Name = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold16};

    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LocationWrapper = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;

    img {
        width: 16px;
        height: 16px;
    }
`;

const Address = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N40};
    ${({ theme }) => theme.fonts.Regular12};

    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
