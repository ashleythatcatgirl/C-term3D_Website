
const placeholderImg = "/ctermplaceholder.png"

export function Renderer({
	imgRef,
	isOpen,
	onClick,
}) {

	return (
		<div className="">
			{isOpen
				?
				<div className="flex justify-center absolute left-0 right-0 top-0 bottom-0 h-screen mx-auto my-auto bg-black">
					<div className="absolute right-[20px] md:right-[40px] xl:right-[80px] flex gap-10 justify-end text-xl w-min py-2 px-[20px]">
						<button
							className="bg-(--bg-alt) px-[20px] py-2 active:scale-110 hover:scale-105 duration-100 ease-in-out transition-all rounded-md cursor-pointer shadow-[0_1px_4px_0px_var(--accent1)]"
							onClick={(e) => {
								e.stopPropagation();
								onClick(!isOpen);
							}}
						>
							Close
						</button>
					</div>
					<img
						ref={imgRef}
						className="my-auto w-screen 2xl:h-screen xl:w-auto xl:mx-auto"
						src={placeholderImg}
					/>
				</div>
				:
				<div className="p-1 sm:p-2 md:p-3 lg:p-4 w-full lg:w-[100%] bg-black rounded-2xl cursor-pointer hover:scale-105 transition-transform">
					<img
						ref={imgRef}
						src={placeholderImg}
						onClick={(e) => {
							e.stopPropagation();
							onClick(!isOpen);
						}}
					/>
				</div>
			}
		</div>
	);
}
