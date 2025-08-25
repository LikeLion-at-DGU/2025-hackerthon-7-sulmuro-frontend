import styled from "styled-components";

export const Wrapper = styled.div`
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

export const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 8px 0;
    box-sizing: border-box;
`;

export const SubTitle = styled.div`
    width: 100%;
    padding: 0 0 10px;
    color: ${({ theme }) => theme.colors.N40};
    ${({ theme }) => theme.fonts.Regular14  };

    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const ImageScrollContainer = styled.div`
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

export const ArticleImage = styled.img`
    width: 208px;
    height: 140px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0; /* 부모 너비에 맞춰 줄어들지 않도록 */
`;

export const BookmarkIcon = styled.img`
    position: absolute;
    width: 28px;
    top: 90px;
    left: 8px;
    z-index: 1;
`;



export const Name = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};

    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const LocationWrapper = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;

    img {
        width: 16px;
        height: 16px;
    }
`;

export const Address = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N40};
    ${({ theme }) => theme.fonts.Regular12};

    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
