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

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg) text-sm overflow-clip'>
			<Header
				title="Home"
			/>
			<main className='flex flex-col px-[50px] md:px-[90px] xl:px-[170px]'>
				<div className="pb-[80px] md:pb-[180px] xl:pb-[280px]">
					<div className="relative left-0 w-screen -mx-[50px] md:-mx-[90px] xl:-mx-[170px]">
						<div className="absolute mx-auto w-fit text-center z-3 top-[40%] right-1 left-1">
							<h1 className="tracking-[3px] md:tracking-[4px] text-3xl md:text-5xl xl:text-6xl font-bold pb-[10px] md:pb-[20px] xl:pb-[80px] text-shadow-[0_2px_10px_var(--bg)]">Logo goes here</h1>
							<p className="tracking-[2px] md:tracking-[4px] xl:tracking-[6px] text-md xl:text-lg font-extrabold text-shadow-[0_1px_5px_var(--bg)]">Optimized to every vertex</p>
						</div>
						<div className="absolute bg-(--bg) opacity-50 w-full h-full z-2"></div>
						<img
							className="w-full z-1"
							src={images[0]}
						/>
					</div>
				</div>
				<div className="flex flex-col text-base">
					<InfoBlock
						title="What is Cterm3D?"
						paragraph=<div>
							<p>Cterm3D is a lightweight 3D modeling and rendering program, with an emphasis on performance and accessibility</p>
						</div>
						position="left"
						windowWidth={windowWidth}
						className="mb-[80px] xl:mb-[180px]"
					/>
					<InfoBlock
						title="Performance"
						paragraph=<ul className="list-disc">
							<li className="pb-1">Cterm is made in C, which allows for very precise optimizations</li>
							<li className="pb-1">lorem ipsum whtaefoewi</li>
							<li className="">lorem ipsum whtaefoewi</li>
						</ul>
						position="right"
						windowWidth={windowWidth}
						className="mb-[40px] xl:mb-[80px]"
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
						className="mb-[40px] xl:mb-[80px]"
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
						className="mb-[80px] xl:mb-[180px]"
					/>
					<InfoBlock
						title="Try it out!"
						paragraph=<a href="/cterm"><div>
							<p>Click to go over to the <span className="text-(--accent3)">Cterm</span> page</p>
						</div></a>
						position="left"
						windowWidth={windowWidth}
						className=""
					/>
				</div>
				<div className="h-[380px]">
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
	const padding = windowWidth < 768
		? 50 : windowWidth < 1280
		? 90 : 170

	const blockSize = windowWidth < 768
		? 300
		: 400

	const a = padding + blockSize/2;
	const b = padding + blockSize/4;

	const offset = windowWidth < 768
		? position == "left"
			? windowWidth/2 - (padding + blockSize/2)
			: windowWidth/2 - (padding + blockSize/2)
		: position == "left"
			? windowWidth/3 - (padding + blockSize/2)
			: windowWidth/3 * 2 - (padding + blockSize/2)

	const ref = useRef(null);
	const { scrollY } = useScroll();
	const { scrollYProgress } = useScroll({
		target: ref,
  		offset: ["start end", "end start"]
	});

	console.log(title, scrollYProgress.current);
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001
	})
	const o = useTransform(
		scaleX,
		[0, 0.25, 0.5],
		[0, 0.6, 1]
	);
	const x = useTransform(
		scaleX,
		[0, 0.125, 0.25, 0.375, 0.5],
		position == "left"
		? [-padding, 0.5 * offset - padding * 0.5, 0.75 * offset - padding * 0.25, 0.9 * offset - padding * 0.1, offset]
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
			style={{ opacity: o, translateX: x }}

			className={cn(
				"relative flex flex-col gap-3 w-[300px] xl:w-[400px] p-4 rounded-2xl shadow-[0_2px_5px_1px_var(--accent1)]",
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
