import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 80px;
    flex-grow: 1;
    padding-top: 60px;
`;

export const Header = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    img {
        width: 26px;
        height: 26px;
    }
`;

export const Thumbnail = styled.div`
    width: 100%;
    margin-bottom: 12px;

    & > img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        display: block;
    }
`;

export const Contents = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;
    padding: 0 16px; /* 🟢 수정: Contents에 패딩을 추가하여 썸네일과 분리 */
    
`;

export const TextWrapper = styled.div`
    width: 100%;
    /* padding: 0 16px; */
    box-sizing: border-box;
`;
export const ContentWrapper = styled.div`
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
`;
export const Name = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};
    padding: 10px 0 8px;

    display: -webkit-box;
    -webkit-line-clamp: 2; /* 2줄까지만 표시 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SubTitle = styled.div`
    width: 100%;
    padding: 0 0 10px;
    color: ${({ theme }) => theme.colors.N40};
    ${({ theme }) => theme.fonts.Regular14};

    display: -webkit-box;
    -webkit-line-clamp: 2; /* 2줄까지만 표시 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const LocationWrapper = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    margin-bottom: 10px;
    img {
        width: 16px;
        height: 16px;
    }
`;

export const Address = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Regular12};

    display: -webkit-box;
    -webkit-line-clamp: 2; /* 2줄까지만 표시 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;