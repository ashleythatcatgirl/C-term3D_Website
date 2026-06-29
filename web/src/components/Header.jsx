import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from "motion/react"
import { Link } from "react-router-dom";
import { cn } from "../lib/utils.js";

import { Title } from "./Title.jsx";

export function Header({
	title,
	windowWidth,
	isMenuOpen,
	onOpen,
}) {

	return(
		<header className='flex px-[20px] md:px-[90px] xl:px-[170px] py-[10px] rounded-b-sm justify-between items-center bg-(--bg-alt) border-b border-(--accent2)'>
			<Title
				title={title}
				classNameDiv="py-2"
				classNameTitle="text-3xl tracking-[2px]"
			/>
			{windowWidth < 768
				?
				<div className="">
					<button
						className={`active:scale-110 hover:scale-105 duration-100 ease-in-out transition-all px-1 py-2 rounded-md font-bold
							${isMenuOpen
								? "shadow-[0_1px_4px_0px_var(--accent2)]"
								: "shadow-[0_1px_4px_0px_var(--accent1)]"}
						`}
						onClick={(e) => {
							e.stopPropagation();
							onOpen(!isMenuOpen);
						}}
					>
						Open menu
					</button>
				</div>
				: null
			}
			<AnimatePresence>
			{isMenuOpen || windowWidth > 768
				?
			<motion.div
				initial={{ opacity: 0, translateY: -200 }}
				animate={{ opacity: 1, translateY: 0 }}
				exit={{ opacity: 0, translateY: -200 }}
				transition={{ ease: "easeInOut", duration: 0.2 }}
				className='absolute md:static px-[10px] py-[10px] rounded-md right-[10px] top-[70px] flex flex-col bg-(--bg-alt)/50 w-min md:flex-row gap-[20px] py-2 justify-end z-10'
			>
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
			</motion.div>
				: null
			}
			</AnimatePresence>
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
						? "shadow-[0_2px_4px_0px_var(--accent2)]"
						: "shadow-[0_1px_4px_0px_var(--accent1)]"
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
