import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
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
		    box-sizing: border-box;
	}
article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
			display: block;
	}
html {
	font-size:18px;
	  height: 100%;
	  font-family: 'Space Grotesk', sans-serif;
}
body {
	  line-height: 1;
	  height: 100%;
	  background-color: #f8f8f8;
}
#root {
		height: 100%;
}
h1 {
	  font-size: 1.5rem;
	  font-weight: 600;
}
h2 {
	  font-size: 1rem;
	  margin-bottom: 20px;
	  font-weight: 700;
	  color: #000;
}
p {
		word-wrap: break-word;
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
label {
	  display: block;
	  margin-bottom: 5px;
}
strong {
	  font-weight: 600;
}
`;

export default GlobalStyles;
