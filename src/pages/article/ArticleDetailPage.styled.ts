import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 80px;
    flex-grow: 1;
`;

export const Header = styled.div`
    width: 100%;
    height: 56px;
    position: sticky; /* position: fixed 대신 sticky를 사용 */
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background: ${({ theme }) => theme.colors.WHITE};
    box-sizing: border-box;
    z-index: 10; /* 다른 콘텐츠와 겹치지 않도록 z-index 추가 */
    img {
        width: 24px;
        height: 24px;
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