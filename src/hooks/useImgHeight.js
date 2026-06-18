import { useState, useEffect, useRef } from 'react';

function GetImgHeight(imgRef) {
	return (imgRef.current.offsetHeight + 100);
}

export function useImgHeight() {
	const imgRef = useRef(null);
	const [imgHeight, setImgHeight] = useState(0);

	useEffect(() => {
		function updateHeight(imgRef) {
			if (!imgRef.current) return;
			setImgHeight(GetImgHeight(imgRef));
		};

		setTimeout(() => {
	
			updateHeight(imgRef);
		}, 0.5);

		window.addEventListener("resize", updateHeight(imgRef));
		return () => window.removeEventListener('resize', updateHeight(imgRef));
	}, []);

	return {imgRef, imgHeight};
}


