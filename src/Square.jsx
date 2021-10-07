import React, { useState, useEffect, memo } from 'react';
import { Button } from './Styles';

const Square = ({
	defaultColor,
	setEraseOver,
	eraseOver,
	boardArray,
	setBoardArray,
	indexY,
	indexX,
	setMouseOver,
	mouseOver,
}) => {
	const paintArray = () => {
		let aux = [...boardArray];
		//aux[indexY][indexX] = aux[indexY][indexX] === '' ? '*' : '';
		aux[indexY][indexX] = '*';
		setBoardArray(aux);
	};

	const eraseArray = () => {
		let aux = [...boardArray];
		//aux[indexY][indexX] = aux[indexY][indexX] === '' ? '*' : '';
		aux[indexY][indexX] = '';
		setBoardArray(aux);
	};

	const HandleMouseOver = () => {
		paintArray();
	};

	const HandleOnClick = (e) => {
		setMouseOver(!mouseOver);
		if (!mouseOver) {
			paintArray();
		}
	};
	const HandleErase = (e) => {
		setEraseOver(!eraseOver);
		if (!eraseOver) {
			eraseArray();
		}
	};

	return (
		<Button
			backgroundColor={defaultColor}
			onMouseOver={mouseOver ? HandleMouseOver : null}
			// onDoubleClick={eraseOver ? HandleErase : null}
			onClick={(e) => HandleOnClick(e)}></Button>
	);
};

export default memo(Square);
