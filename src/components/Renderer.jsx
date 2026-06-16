
const placeholderImg = "/ctermplaceholder.png"

export function Renderer({
	imgRef,
}) {

	return (
		<div className='relative p-1 sm:p-2 md:p-3 lg:p-4 w-full lg:w-[100%] bg-black rounded-2xl'>
			<img
				ref={imgRef}
				className="mx-auto"
				src={placeholderImg}
			/>
		</div>
	);
}
