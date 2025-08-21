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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    box-sizing: border-box;
    img{
        width: 26px;
        height: 26px;
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
    padding: 0 16px;
    box-sizing: border-box;
`;

export const Name = styled.div`
    width: 100%;
    color: ${({ theme }) => theme.colors.N70};
    ${({ theme }) => theme.fonts.Bold20};
    padding: 10px 0 8px;
    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

    /* 말줄임 처리 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;