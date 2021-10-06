import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Board from './Board';

const GlobalStyles = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
	body{
		overflow-x:hidden;
    overflow-y:hidden;
	}
	::-webkit-scrollbar {
		display: none;
	}
`;

const AppContainer = styled.div`
	width: 100%;
	padding: 10vh 10vw;
	box-sizing: border-box;
`;

function App(props) {
	return (
		<>
			<GlobalStyles></GlobalStyles>
			<AppContainer>
				<Board></Board>
			</AppContainer>
		</>
	);
}

export default App;
