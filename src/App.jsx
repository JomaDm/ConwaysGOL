import React from 'react';
import { useState } from 'react';
import Board from './Board';
import { PaintProvider } from './context/PaintContext';
import { AppContainer, GlobalStyles } from './Styles';

function App(props) {
	return (
		<>
			<GlobalStyles></GlobalStyles>
			<AppContainer>
				<PaintProvider>
					<Board></Board>
				</PaintProvider>
			</AppContainer>
		</>
	);
}

export default App;
