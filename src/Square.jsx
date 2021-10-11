import React, { useState, useEffect, memo, useContext } from 'react';
import PaintContext from './context/PaintContext';
import { Button } from './Styles';

const Square = ({
	defaultColor,
	boardArray,
	setBoardArray,
	indexY,
	indexX,
}) => {
	const { mouseOver, paint, handleMouseOver } = useContext(PaintContext);

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

	const handlePaintingGlobal = () => {
		if (paint) {
			paintArray();
		} else {
			eraseArray();
		}
	};

	const handleOnClick = (e) => {
		handleMouseOver();
		//handlePainting();
		handlePaintingGlobal();
		if (mouseOver) {
			handlePaintingGlobal();
		}
	};

	return (
		<Button
			backgroundColor={defaultColor}
			onMouseOver={mouseOver ? handlePaintingGlobal : null}
			// onDoubleClick={eraseOver ? handleErase : null}
			onClick={handleOnClick}></Button>
	);
};

export default memo(Square);
