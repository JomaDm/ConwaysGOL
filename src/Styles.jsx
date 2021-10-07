import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body{
  overflow-x:hidden;
  overflow-y:hidden;
}
::-webkit-scrollbar {
  display: none;
}
`;

export const AppContainer = styled.div`
	width: 100%;
	padding: 5vh 15vw;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Button = styled.button`
	width: 30px;
	height: 30px;
	border: 1px solid gray;
	background-color: ${(props) => props.backgroundColor};
	margin: 0.5px;
	box-shadow: 0;
	transition: 0.4s ease-in-out;
	@media only screen and (max-width: 768px) {
	}
`;
Button.defaultProps = {
	backgroundColor: 'white',
};

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	font-family: 'Open Sans', sans-serif;
	width: 100%;
	justify-content: center;
`;

export const BoardContainer = styled.table`
	margin: 0;
	gap: 0;
	padding: 0;
	border-spacing: 0;
	border: none;
`;

export const BoardBody = styled.tbody`
	padding: 0;
	margin: 0;
`;

export const BoardRow = styled.tr`
	padding: 0;
	margin: 0;
`;

export const BoardData = styled.td`
	padding: 0;
	margin: 0;
`;

export const ActionsRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	width: 100%;
`;

export const ActionButton = styled.button`
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
	border-radius: 10px;
	text-align: center;
	font-weight: bold;
	padding: 5px;
	margin: 10px;
	width: fit-content;
	border: 3px solid ${(props) => props.color};
	background-color: white;
	color: ${(props) => props.color};
	&:hover {
		background-color: ${(props) => props.color + '50'};
	}
	@media only screen and (max-width: 768px) {
		maring: 5px;
		font-size: 10px;
	}
`;

export const Information = styled.div`
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
	border-radius: 10px;
	text-align: center;
	font-weight: bold;
	padding: 5px;
	margin: 10px;
	width: 100px;
	border: 3px solid ${(props) => props.color};
	color: ${(props) => props.color};
	@media only screen and (max-width: 768px) {
		maring: 5px;
		width: 50px;
		font-size: 10px;
		padding: 2.5px;
	}
`;
