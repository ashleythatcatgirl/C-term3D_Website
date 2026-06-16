import { Link } from "react-router-dom";
import { cn } from "../lib/utils.js";

import { Title } from "./Title.jsx";

export function Header({
	title,
}) {

	return(
		<header className='flex px-[170px] h-15 sm:h-18 md:h-20 rounded-b-sm justify-between items-center bg-(--bg) border-b-2 border-(--accent1)'>
			<Title
				title={title}
				classNameDiv="py-2 w-[280px]"
				classNameTitle="text-3xl tracking-[2px]"
			/>
			<div className='flex flex-row gap-[20px] py-2'>
				<PageLink
					page={title}
					title="Home"
					link="/"
					className="w-[80px] bg-(--bg) active:bg-(--bg)"
				/>
				<PageLink
					page={title}
					title="Info"
					link="/info"
					className="w-[80px] bg-(--bg) active:bg-(--bg)"
				/>
				<PageLink
					page={title}
					title="Cterm"
					link="/cterm"
					className="w-[80px] bg-(--accent2) active:bg-(--accent1) active:opacity-80"
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
						? "border border-(--accent1)"
						: "border border-(--accent2)"
					),
					(upperTitle == upperPage && upperPage == "CTERM3D"
						? "bg-(--accent1) text-(--bg)"
						: ""
					),
					`active:scale-110 hover:scale-105 duration-100 ease-in-out transition-all px-1 py-2 rounded-md cursor-pointer`
				)}
			>
				{title}
			</button>
		</Link>
	);
}
