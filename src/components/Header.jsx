import { Link } from "react-router-dom";

export function Header({title}) {

	return(
		<header className='flex h-15 sm:h-18 md:h-20 justify-between items-center bg-(--bg-dark) border-b-2 border-(--color1)'>
			<div className='pl-5 sm:px-10 md:px-16 lg:px-30 py-2 w-1/2'>
				<h1 className='font-bold text-3xl'>{title}</h1>
			</div>
			<div className='flex flex-row gap-3 pr-5 sm:px-10 md:px-16 lg:px-30 py-2'>
				<Link
					to='/'
					className='font-bold'
				>
					<button
						className="bg-(--bg-darker) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
					>
						Home
					</button>
				</Link>	
				<Link
					to='/info'
					className='font-bold'
				>
					<button
						className="bg-(--bg-darker) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
					>
						Info
					</button>
				</Link>
				<Link
					to='/cterm'
					className='font-bold'
				>
					<button
						className="bg-(--color1) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
					>
						Cterm
					</button>
				</Link>
			</div>
		</header>
	);
}
