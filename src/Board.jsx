import React, { useState, useEffect, useContext, useMemo } from 'react';
import {
	Container,
	BoardContainer,
	BoardBody,
	BoardRow,
	BoardData,
	ActionsRow,
	ActionButton,
	Information,
} from './Styles';
import Square from './Square';
import PaintContext from './context/PaintContext';

const defaultColor = '#EEEEEE';
const selectedColor = '#FF0075';
//? Variables de estado
const ScreenY = window.screen.height;
const ScreenX = window.screen.width;
let countY = (18 * ScreenY) / 768; //15
let countX = (22 * ScreenX) / 768; //17

//const countY = ScreenY / (ScreenY / countY); // 1080/ x = 25
//const countX = ScreenX / (ScreenX / countX); // 1920 / x = 50

const createMatriz = (countY, countX) => {
	let arr = [];
	for (let i = 0; i < countY; i++) {
		let subarr = [];
		for (let j = 0; j < countX; j++) {
			subarr.push('');
		}
		arr.push(subarr);
	}
	return arr;
};

const Board = () => {
	const { mouseOver, paint, handlePainting } = useContext(PaintContext);
	const [start, setStart] = useState(false);
	const [counter, setCounter] = useState(0);
	const [boardArray, setBoardArray] = useState(createMatriz(countY, countX));

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
		setBoardArray(createMatriz(countY, countX));
	};

	const step = () => {
		let aux = boardArray.map((row) => row.slice());
		for (let i = 0; i < countY; i++) {
			for (let j = 0; j < countX; j++) {
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
					if (
						element.x >= 0 &&
						element.x < countX &&
						element.y >= 0 &&
						element.y < countY
					) {
						//console.log(element);
						neighbours =
							boardArray[element.y][element.x] === '*'
								? neighbours + 1
								: neighbours;
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
						//console.log('cont');
						setCounter(counter + 1);
						step();
				  }, 500)
				: time;
		}
	}, [counter, start]);

	const countPainted = useMemo(() => {
		let painted = 0;
		boardArray.forEach((boardRow) => {
			boardRow.forEach((element) => (element === '*' ? painted++ : painted));
		});
		//setCountPainted(painted);
		return painted;
	}, [boardArray]);

	return (
		<Container>
			<ActionsRow>
				<ActionButton
					disabled={start}
					color={!start ? (!paint ? selectedColor : '') : defaultColor}
					onClick={!start ? handlePainting : null}>
					{paint ? 'Erase' : 'Paint'}
				</ActionButton>
				<ActionButton
					disabled={start}
					onClick={randomizeBoard}
					color={!start ? selectedColor : defaultColor}>
					Randomize
				</ActionButton>
				<ActionButton
					disabled={start}
					onClick={step}
					color={!start ? selectedColor : defaultColor}>
					Step
				</ActionButton>
				<ActionButton onClick={(e) => setStart(true)} color={selectedColor}>
					Start
				</ActionButton>
				<ActionButton onClick={(e) => setStart(false)} color={selectedColor}>
					Stop
				</ActionButton>
				<ActionButton
					disabled={start}
					onClick={clearBoard}
					color={!start ? selectedColor : defaultColor}>
					Clear
				</ActionButton>
			</ActionsRow>
			<ActionsRow>
				<Information color={mouseOver ? selectedColor : defaultColor}>
					{paint ? 'Painting...' : 'Erasing...'}
				</Information>
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
