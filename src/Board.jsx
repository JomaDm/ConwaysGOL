import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from './Square';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const BoardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const ActiveSquares = styled.div`
	border-radius: 10px;
	text-align: center;
	font-weight: bold;
	margin: 10px;
	width: 50px;
	border: 3px solid ${(props) => props.color};
	color: ${(props) => props.color};
`;

const defaultColor = '#EEEEEE';
const selectedColor = '#FF0075';
const Ysize = 10;
const Xsize = 50;

const createMatriz = (Ysize, Xsize) => {
	let arr = [];
	for (let i = 0; i < Ysize; i++) {
		let subarr = [];
		for (let j = 0; j < Xsize; j++) {
			subarr.push('');
		}
		arr.push(subarr);
	}
	return arr;
};

const Board = () => {
	const [boardArray, setBoardArray] = useState(createMatriz(Ysize, Xsize));
	const [mouseOver, setMouseOver] = useState(false);
	const [countPainted, setCountPainted] = useState(0);

	useEffect(() => {
		if (boardArray) {
			let painted = 0;
			boardArray.forEach((boardRow) => {
				boardRow.forEach((element) => (element === '*' ? painted++ : painted));
			});
			setCountPainted(painted);
		}
	}, [boardArray]);

	return (
		<Container>
			<ActiveSquares color={selectedColor}>{countPainted}</ActiveSquares>
			<BoardContainer>
				{boardArray.map((elementRow, i) =>
					elementRow.map((element, j) => (
						<Square
							key={`${i}${j}`}
							setBoardArray={setBoardArray}
							indexY={i}
							indexX={j}
							mouseOver={mouseOver}
							setMouseOver={setMouseOver}
							boardArray={boardArray}
							defaultColor={element === '' ? defaultColor : selectedColor}
						/>
					)),
				)}
			</BoardContainer>
		</Container>
	);
};

export default Board;
