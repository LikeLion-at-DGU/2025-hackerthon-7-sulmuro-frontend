import * as S from "./ArticlePage.styled";

const ArticlePage = () => {

    return (
        <S.Wrapper>
            <S.Header>
                Article
                <S.PlaceDropdown>
                    {/* 큰 필터링 : 전체, 광장시장, 양재시장 중 하나 선택해서 해당 값을 바탕으로 아티클 필터링*/}
                </S.PlaceDropdown>
            </S.Header>
            <S.MainContents>
                {/* 작은 필터링 : 음식, 쇼핑, 역시 중 하나의 주제로 카테고리를 필터링해서 아티클 리스트를 보여줍니다. */}
                <S.ArticleCategory>
                    <S.CategoryButton selected={true}>음식</S.CategoryButton>
                    <S.CategoryButton selected={false}>쇼핑</S.CategoryButton>
                    <S.CategoryButton selected={false}>역사</S.CategoryButton>
                </S.ArticleCategory>
                {articleContent.map(article) => (
                    <ArticleCard>
                )}
            </S.MainContents>

        </S.Wrapper>
    );
}