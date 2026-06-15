

export function Renderer({
	imgRef,
	image
}) {

	return (
		<div className='relative p-1 sm:p-2 md:p-3 lg:p-4 w-full lg:w-[90%] bg-black rounded-2xl'>
			<img
				ref={imgRef}
				className="mx-auto"
				src={image}
			/>
		</div>
	);
}
