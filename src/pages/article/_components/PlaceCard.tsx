import styled from "styled-components";
import { IMAGE_CONSTANTS } from "@/constants/imageConstants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { addPlace, hasPlace, removePlace } from "@/utils/SavedBookMark";
import { useLanguage } from "@/components/contexts/LanguageContext";

interface PlaceCardProps {
    id: number;
    name: string;
    path: string;       // 클릭 시 이동할 경로
    thumbnailUrl: string;
    address: string;
}

const PlaceCard = ({ id, name, path, thumbnailUrl, address }: PlaceCardProps) => {
    const [isBookMark, setIsBookMark] = useState<boolean>(false);
    const navigate = useNavigate();
    const { language } = useLanguage();

    // ✅ 아이콘 대체 텍스트/aria-label 현지화
    const t = useMemo(() => {
        return {
        bookmark: language === "ko" ? "북마크" : language === "zh" ? "收藏" : "Bookmark",
        bookmarked: language === "ko" ? "북마크됨" : language === "zh" ? "已收藏" : "Bookmarked",
        unbookmarked: language === "ko" ? "북마크 해제됨" : language === "zh" ? "未收藏" : "Not bookmarked",
        imageAltSuffix: language === "ko" ? " 이미지" : language === "zh" ? " 图片" : " image",
        };
    }, [language]);

    useEffect(() => {
        if (id != null) {
        setIsBookMark(hasPlace(id));
        }
    }, [id]);

    const handleNavigate = useCallback(() => {
        if (path) navigate(path);
    }, [navigate, path]);

    const handleBookMarkExplicit = useCallback(
        (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (id == null) return;
        setIsBookMark((prev) => {
            if (prev) removePlace(id);
            else addPlace(id);
            return !prev;
        });
        },
        [id]
    );

    return (
        <Wrapper onClick={handleNavigate}>
        <Thumbnail>
            <BookmarkIcon
            src={isBookMark ? IMAGE_CONSTANTS.Bookmark : IMAGE_CONSTANTS.BookMarkUnselect}
            alt={t.bookmark}
            aria-label={isBookMark ? t.bookmarked : t.unbookmarked}
            onClick={handleBookMarkExplicit}
            />
            <StyledImage src={thumbnailUrl} alt={`${name}${t.imageAltSuffix}`} />
        </Thumbnail>
        <Name title={name}>{name}</Name>
        <Adress title={address}>{address}</Adress>
        </Wrapper>
    );
};

export default PlaceCard;



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    cursor: pointer;
`;

const Thumbnail = styled.div`
    display: flex;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    position: relative;
`;

const BookmarkIcon = styled.img`
    position: absolute;
    width: 28px;
    top: 10px;
    left: 10px;
    z-index: 1;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Name = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.SemiBold16};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Adress = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N40};
    ${({ theme }) => theme.fonts.Regular12};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;