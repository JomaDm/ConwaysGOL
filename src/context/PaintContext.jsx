import { createContext, useState } from 'react';

const PaintContext = createContext();

const PaintProvider = ({ children }) => {
	const [mouseOver, setMouseOver] = useState(false);
	const [paint, setPaint] = useState(true);

	const handleMouseOver = () => setMouseOver(!mouseOver);
	const handlePainting = () => setPaint(!paint);

	const data = { paint, handlePainting, mouseOver, handleMouseOver };

	return <PaintContext.Provider value={data}>{children}</PaintContext.Provider>;
};

export { PaintProvider };
export default PaintContext;
