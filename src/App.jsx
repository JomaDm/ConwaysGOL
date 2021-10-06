import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Board from './Board';

const AppContainer = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
	width: 100%;
	padding: 10vh 10vw;
	box-sizing: border-box;
`;

function App(props) {
	return (
		<AppContainer>
			<Board></Board>
		</AppContainer>
	);
}

export default App;
