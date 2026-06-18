import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from "motion/react"
import { Link } from "react-router-dom";
import { cn } from "../lib/utils.js";

import { Title } from "./Title.jsx";

export function Header({
	title,
}) {

	return(
		<header className='flex px-[20px] md:px-[90px] xl:px-[170px] py-[10px] rounded-b-sm justify-between items-center bg-(--bg-alt) border-b border-(--accent1)'>
			<Title
				title={title}
				classNameDiv="py-2 w-[280px]"
				classNameTitle="text-3xl tracking-[2px]"
			/>
			<div className='flex flex-wrap flex-row gap-[20px] py-2 justify-end'>
				<PageLink
					page={title}
					title="Home"
					link="/"
					className="w-[80px] bg-(--bg)"
				/>
				<PageLink
					page={title}
					title="Info"
					link="/info"
					className="w-[80px] bg-(--bg)"
				/>
				<PageLink
					page={title}
					title="Library"
					link="/library"
					className="w-[80px] bg-(--bg)"
				/>
				<PageLink
					page={title}
					title="Cterm3D"
					link="/cterm"
					className="w-[80px] bg-(--accent1) text-(--bg) active:opacity-80"
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
						? "shadow-[0_2px_4px_0px_var(--accent1)]"
						: "shadow-[0_1px_4px_0px_var(--accent2)]"
					),
					(upperTitle == upperPage && upperPage == "CTERM3D"
						? "bg-(--accent2)"
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
