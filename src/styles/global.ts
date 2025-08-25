import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
// 폰트설정
/* [수정] Pretendard Variable 폰트 설정 */
@font-face {
  font-family: 'Pretendard'; // 사용할 폰트 패밀리 이름
  src: url('/fonts/PretendardVariable.woff2') format('woff2-variations');
  font-weight: 100 900; // 폰트가 지원하는 굵기 범위
  font-style: normal;
}

// 초기 html 설정
html {
	background-color: ${({ theme }) => theme.colors.N10};
	display: flex;
	justify-content: center;
	align-items: center;

	-webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgb(0 0 0 / 0%);
    scroll-behavior: smooth; 
}

body {
	width: 100%;
	max-width: 540px;

	min-height: calc(var(--vh, 1vh) * 100);

	overflow-x: hidden;

	background-color: ${({ theme }) => theme.colors.WHITE};
	color: ${({ theme }) => theme.colors.N70};
  font-family: 'Pretendard', sans-serif;
  line-height: 1.5;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

button, input, textarea {
  font-family: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: none;
}

`;

export default GlobalStyle;
