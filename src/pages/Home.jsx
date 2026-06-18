import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from "motion/react"
import { cn } from "../lib/utils.js";

import { Header } from "../components/Header.jsx";

import { useWindowDimensions } from "../hooks/useWindowDimensions.js";

const images = [
	"/scene1.png",
	"/scene2.png",
]

export default function Home() {
	const { width: windowWidth, height: windowHeight} = useWindowDimensions();
	const [isMenuOpen, setIsMenuOpen] = useState();

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg) text-sm overflow-clip'>
			<Header
				title="Home"
				windowWidth={windowWidth}
				isMenuOpen={isMenuOpen}
				onOpen={setIsMenuOpen}
			/>
			<main className='flex flex-col'>
				{/*
				<div className="flex justify-center absolute left-0 right-0 top-0 bottom-0 h-screen mx-auto my-auto bg-black">
					<div className="absolute right-[20px] md:right-[40px] xl:right-[80px] flex gap-10 justify-end text-xl w-min py-2 px-[20px]">
						<button
							className="bg-(--bg-alt) px-[20px] py-2 active:scale-110 hover:scale-105 duration-100 ease-in-out transition-all rounded-md cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								onClick(!isOpen);
							}}
						>
							Close
						</button>
					</div>
					<img
						className="my-auto w-screen 2xl:h-screen xl:w-auto xl:mx-auto"
						src={images[1]}
					/>
				</div>
				*/}
				<div className="flex justify-center relative left-0 w-screen pb-[80px] md:pb-[180px] xl:pb-[280px]">
					<div className="absolute px-[15%] md:px-[20%] xl:px-[30%] w-full text-center z-3 top-[5%] md:top-[10%] xl:top-[15%] right-0 left-0">
						<img src="/logodark.svg" className="w-full"/>
						<p className="tracking-[2px] md:tracking-[4px] xl:tracking-[6px] text-md xl:text-lg font-extrabold text-shadow-[0_1px_5px_var(--bg)]">Optimized to every vertex</p>
					</div>
					<div className="absolute bg-(--bg) opacity-50 w-full h-full z-2"></div>
					<img
						className="z-1"
						src={images[0]}
					/>
				</div>
				<div className="relative flex flex-col text-base">
					<div className="relative my-20 bg-(--bg-alt)">
						<InfoBlock
							title="What is Cterm3D?"
							paragraph=<div>
								<p>Cterm3D is a lightweight 3D modeling and rendering program, with an emphasis on performance and accessibility</p>
								</div>
							position="left"
							windowWidth={windowWidth}
							className="absolute top-[20%] z-10"
						/>
						<InfoBlock
							title="Why"
							paragraph=<ul className="list-disc">
								<li className="pb-1">Cterm is made in C, which allows for very precise optimizations</li>
								<li className="pb-1">lorem ipsum whtaefoewi</li>
								<li className="">lorem ipsum whtaefoewi</li>
							</ul>
							position="right"
							windowWidth={windowWidth}
							className="absolute top-[50%] z-10"
						/>
						<img
							src="/scene3.png"
							className="clip-r blur-[1px] w-full"
						/>
				
					</div>
					<div className="relative my-20 bg-(--bg-alt) max-h-[1000px] overflow-hidden">
						<InfoBlock
							title="Performance"
							paragraph=<ul className="list-disc">
								<li className="pb-1">Cterm is made in C, which allows for very precise optimizations</li>
								<li className="pb-1">lorem ipsum whtaefoewi</li>
								<li className="">lorem ipsum whtaefoewi</li>
							</ul>
							position="right"
							windowWidth={windowWidth}
							className="absolute top-[10%] z-10"
						/>
						<InfoBlock
							title="Acessibility"
							paragraph=<ul className="list-disc">
								<li className="pb-1"></li>
								<li className="pb-1">lorem ipsum whtaefoewi</li>
								<li className="">lorem ipsum whtaefoewi</li>
							</ul>
							position="left"
							windowWidth={windowWidth}
							className="absolute top-[40%] z-10"
						/>
						<InfoBlock
							title="soomething super cool"
							paragraph=<ul className="list-disc">
								<li className="pb-1">Cterm is made in C, which allows for very precise optimizations</li>
								<li className="pb-1">lorem ipsum whtaefoewi</li>
								<li className="">lorem ipsum whtaefoewi</li>
							</ul>
							position="right"
							windowWidth={windowWidth}
							className="absolute top-[70%] z-10"
						/>
						<img
							src="/scene2.png"
							className="clip-c blur-[1px] w-[90%] md:w-[70%] xl:w-[50%] mx-auto"	
						/>
					</div>
					<div className="relative my-20 bg-(--bg-alt)">
						<a href="/cterm"><InfoBlock
							title="Try it out!"
							paragraph=<div>
								<p>Click to go over to the <span className="text-(--accent3)">Cterm</span> page</p>
							</div>
							position="left"
							windowWidth={windowWidth}
							className="absolute z-10 top-[25%]"
						/></a>
						<a href="/info"><InfoBlock
							title="Or read the documentation"
							paragraph=<div>
								<p>Click to go over to the <span className="text-(--accent3)">Info</span> page</p>
							</div>
							position="right"
							windowWidth={windowWidth}
							className="absolute z-10 top-[50%]"
						/></a>
						<img
							src="/scene4.png"
							className="clip-l blur-[1px] w-full"	
						/>
					</div>
				</div>
				<div className="h-[480px]">
				</div>
			</main>
		</div>
	);
}

function InfoBlock({
	title,
	paragraph,
	windowWidth,
	position,
	className,
}) {
	const blockSize = windowWidth < 768
		? 300
		: 400

	const a = blockSize/2;
	const b = blockSize/4;

	const offset = windowWidth < 768
		? position == "left"
			? windowWidth/2 - (blockSize/2)
			: windowWidth/2 - (blockSize/2)
		: position == "left"
			? windowWidth/3 - (blockSize/2)
			: windowWidth/3 * 2 - (blockSize/2)

	const ref = useRef(null);
	const { scrollY } = useScroll();
	const { scrollYProgress } = useScroll({
		target: ref,
  		offset: ["start end", "end start"]
	});

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	})
	const o = useTransform(
		scaleX,
		[0, 0.125, 0.25],
		[0, 0.6, 1]
	);
	const x = useTransform(
		scaleX,
		[0, 0.0675, 0.125, 0.1725, 0.25],
		position == "left"
		? [0.0, 0.5 * offset, 0.75 * offset, 0.9 * offset, offset]
		: [offset + a, offset + 0.5 * b, offset + 0.25 * b, offset + 0.1 * b, offset]
	);
	const [scrollDirection, setScrollDirection] = useState("down");

	useMotionValueEvent(scrollY, "change", (current) => {
		const diff = current - scrollY.getPrevious()
		setScrollDirection(diff > 0 ? "down" : "up")
	})

	return (
		<motion.div
			whileHover={{ boxShadow: "0 2px 5px 1px var(--accent2)", translateY: "-10px"}}
			ref={ref}
			style={{ opacity: o, left: x }}

			className={cn(
				"relative flex flex-col gap-3 w-[300px] xl:w-[400px] p-4 rounded-2xl shadow-[0_2px_5px_1px_var(--accent1)] bg-(--bg)/50 backdrop-blur-lg",
				className,
			)}
		>
			<div className="font-bold text-lg">
				<h1>{title}</h1>
			</div>
			<div className="pl-5">
				{paragraph}
			</div>
		</motion.div>
	);
}
