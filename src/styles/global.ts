import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
// 폰트설정
/* SUIT 폰트 설정 */
@font-face {
  font-family: 'Pretendard-ExtraBold';
  src: url('/fonts/Pretendard-ExtraBold.otf') format('opentype'),
      url('/fonts/Pretendard-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-Bold';
  src: url('/fonts/Pretendard-Bold.otf') format('opentype'),
        url('/fonts/Pretendard-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('/fonts/Pretendard-Regular.otf') format('opentype'),
      url('/fonts/Pretendard-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Pretendard-SemiBold';
  src: url('/fonts/Pretendard-SemiBold.otf') format('opentype'),
  url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
}

// 초기 html 설정
html {
	background-color: ${({ theme }) => theme.colors.Bg};
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
  font-family: 'Pretendard-Regular', sans-serif;
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
	font: inherit;
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
