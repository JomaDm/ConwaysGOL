import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
	width: 20px;
	height: 20px;
	border: 1px solid gray;
	background-color: ${(props) => props.backgroundColor};
	margin: 0.5px;
`;

Button.defaultProps = {
	backgroundColor: 'white',
};

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
