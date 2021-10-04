import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Board from './Board';

const AppContainer = styled.div`
	width: 100%;
	padding: 25vh 25vw;
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
