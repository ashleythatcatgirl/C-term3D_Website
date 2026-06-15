import { Link } from "react-router-dom";
import { cn } from "../lib/utils.js";

import { Title } from "./Title.jsx";

export function Header({
	title,
}) {

	return(
		<header className='flex h-15 sm:h-18 md:h-20 rounded-b-sm justify-between items-center bg-(--bg-dark) border-b-2 border-(--color1)'>
			<Title
				title={title}
				classNameDiv="pl-5 sm:px-10 md:px-16 lg:px-30 py-2"
				classNameTitle="text-3xl"
			/>
			<div className='flex flex-row gap-3 pr-5 sm:px-10 md:px-16 lg:px-30 py-2'>
				<PageLink
					page={title}
					title="Home"
					link="/"
					className="bg-(--bg-darker) active:bg-(--bg-lighter)"
				/>
				<PageLink
					page={title}
					title="Info"
					link="/info"
					className="bg-(--bg-darker) active:bg-(--bg-lighter)"
				/>
				<PageLink
					page={title}
					title="Cterm3D"
					link="/cterm3D"
					className="bg-(--color2) active:bg-(--color1) active:opacity-80"
				/>
			</div>
		</header>
	);
}

function PageLink({
	page,
	title,
	link,
	className
}) {

	const upperTitle = title.toUpperCase();
	const upperPage = page.toUpperCase();

	return (
		<Link
			to={link}
			className='font-bold'
		>
			<button
				className={cn(
					className,
					(upperTitle == upperPage
						? "border-(--color1)"
						: ""
					),
					(upperTitle == upperPage && upperPage == "CTERM3D"
						? "bg-(--color1) text-(--bg-dark)"
						: ""
					),
					`active:scale-110 hover:scale-105 duration-100 ease-in-out transition-all px-4 py-2 rounded-md cursor-pointer border`
				)}
			>
				{title}
			</button>
		</Link>
	);
}
