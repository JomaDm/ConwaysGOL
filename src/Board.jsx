import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from './Square';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	font-family: 'Open Sans', sans-serif;
	width: 100%;
`;

const BoardContainer = styled.table`
	margin: 0;
	gap: 0;
	padding: 0;
	border-spacing: 0;
`;
const BoardBody = styled.tbody`
	padding: 0;
	margin: 0;
`;
const BoardRow = styled.tr`
	padding: 0;
	margin: 0;
`;
const BoardData = styled.td`
	padding: 0;
	margin: 0;
`;

const ActionsRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const ActionButton = styled.button`
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
`;

const Information = styled.div`
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
`;

const defaultColor = '#EEEEEE';
const selectedColor = '#FF0075';
//? Variables de estado
const ScreenY = window.screen.height;
const ScreenX = window.screen.width;
const countY = 23;
const countX = 50;
const Ysize = ScreenY / (ScreenY / countY); // 1080/ x = 25
const Xsize = ScreenX / (ScreenX / countX); // 1920 / x = 50

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
	const [start, setStart] = useState(false);
	const [counter, setCounter] = useState(0);

	const randomizeBoard = () => {
		clearBoard();
		let aux = [...boardArray];
		let min = (countX * countY) / 100;
		let max = (countX * countY) / 2;
		let count = Math.random() * (max - min) + min;

		for (let i = 0; i < count; i++) {
			let randomX = parseInt(Math.random() * countX);
			let randomY = parseInt(Math.random() * countY);
			aux[randomY][randomX] = aux[randomY][randomX] === '' ? '*' : '';
		}
		setBoardArray(aux);
	};

	const clearBoard = () => {
		setBoardArray(createMatriz(Ysize, Xsize));
	};

	const step = () => {
		let aux = boardArray.map((row) => row.slice());
		for (let i = 0; i < Ysize; i++) {
			for (let j = 0; j < Xsize; j++) {
				let coords = [
					{ y: i - 1, x: j - 1 }, // topLeft
					{ y: i - 1, x: j }, //topCenter
					{ y: i - 1, x: j + 1 }, //topRight
					{ y: i, x: j - 1 }, //midLeft
					{ y: i, x: j + 1 }, //midRight
					{ y: i + 1, x: j - 1 }, //buttomLeft
					{ y: i + 1, x: j }, //buttomCenter
					{ y: i + 1, x: j + 1 }, //buttomRight
				];

				let neighbours = 0;
				coords.forEach((element) => {
					if (element.x >= 0 && element.x < Xsize && element.y >= 0 && element.y < Ysize) {
						//console.log(element);
						neighbours = boardArray[element.y][element.x] === '*' ? neighbours + 1 : neighbours;
					}
				});
				if (neighbours === 0 || neighbours === 1 || neighbours > 3) {
					//console.log(i, j);
					aux[i][j] = '';
				}
				if (neighbours === 3) {
					// console.log(i, j);
					aux[i][j] = '*';
				}
				// if (neighbours >= 1) console.log(`(${i},${j}) = ${neighbours}`);
			}
		}
		setBoardArray(aux);
	};

	let time;

	useEffect(() => {
		if (!start) {
			clearInterval(time);
		} else {
			time = !time
				? setTimeout(() => {
						console.log('cont');
						setCounter(counter + 1);
						step();
				  }, 500)
				: time;
		}
	}, [counter, start]);

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
			<ActionsRow>
				<ActionButton disabled={start} onClick={randomizeBoard} color={!start ? selectedColor : defaultColor}>
					Randomize
				</ActionButton>
				<ActionButton disabled={start} onClick={step} color={!start ? selectedColor : defaultColor}>
					Step
				</ActionButton>
				<ActionButton onClick={(e) => setStart(true)} color={selectedColor}>
					Start
				</ActionButton>
				<ActionButton onClick={(e) => setStart(false)} color={selectedColor}>
					Stop
				</ActionButton>
				<ActionButton disabled={start} onClick={clearBoard} color={!start ? selectedColor : defaultColor}>
					Clear
				</ActionButton>
			</ActionsRow>
			<ActionsRow>
				<Information color={mouseOver ? selectedColor : defaultColor}>{mouseOver ? 'Active' : 'Deactive'}</Information>
				<Information color={selectedColor}>{countPainted}</Information>
				<Information color={selectedColor}>Vel: 500ms</Information>
			</ActionsRow>
			<BoardContainer>
				<BoardBody>
					{boardArray.map((elementRow, i) => (
						<BoardRow key={`R${i}`}>
							{elementRow.map((element, j) => (
								<BoardData key={`${i}${j}`}>
									<Square
										setBoardArray={setBoardArray}
										indexY={i}
										indexX={j}
										mouseOver={mouseOver}
										setMouseOver={setMouseOver}
										boardArray={boardArray}
										defaultColor={element === '' ? defaultColor : selectedColor}
									/>
								</BoardData>
							))}
						</BoardRow>
					))}
				</BoardBody>
			</BoardContainer>
		</Container>
	);
};

export default Board;
