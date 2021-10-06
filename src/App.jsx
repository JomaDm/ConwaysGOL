import React from 'react';
import { useState } from 'react';
import Board from './Board';
import { AppContainer, GlobalStyles } from './Styles';

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
