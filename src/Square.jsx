import React, { useState, useEffect } from 'react';
import { Button } from './Styles';

const Square = ({ defaultColor, boardArray, setBoardArray, indexY, indexX, setMouseOver, mouseOver }) => {
	const updateArray = () => {
		let aux = [...boardArray];
		aux[indexY][indexX] = aux[indexY][indexX] === '' ? '*' : '';
		setBoardArray(aux);
	};

	const HandleMouseOver = () => {
		updateArray();
	};

	const HandleOnClick = (e) => {
		setMouseOver(!mouseOver);
		if (!mouseOver) {
			updateArray();
		}
	};

	return (
		<Button
			backgroundColor={defaultColor}
			onMouseOver={mouseOver ? HandleMouseOver : null}
			onClick={(e) => HandleOnClick(e)}></Button>
	);
};

export default Square;
