import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform, useSpring } from "motion/react"

import { Header } from "../components/Header.jsx";

import { useWindowDimensions } from "../hooks/useWindowDimensions.js";

const images = [
	"/scene1.png",
	"/scene2.png",
]

export default function Home() {
	const { width: windowWidth, height: windowHeight} = useWindowDimensions();

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg) overflow-clip'>
			<Header
				title="Home"
			/>
			<main className='flex flex-col px-[170px]'>
				<div className="pb-60">
					<div>
					</div>
					<div className="relative left-0 w-screen -mx-[170px]">
						<div className="absolute mx-auto w-fit text-center z-3 top-[40%] right-1 left-1">
							<h1 className="tracking-[4px] text-6xl font-bold pb-10 text-shadow-[0_2px_10px_var(--bg)]">Logo goes here</h1>
							<p className="tracking-[6px] text-lg font-extrabold text-shadow-[0_1px_5px_var(--bg)]">Other text goes here maybe</p>
						</div>
						<div className="absolute bg-(--bg) opacity-50 w-full h-full z-2"></div>
						<img
							className="w-full z-1"
							src={images[0]}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-40">
					<InfoBlock
						title="What is Cterm?"
						paragraph=<div>
							<p>Cterm is a lightweight 3D modeling and rendering program, with</p>
							<p>Cterm is a lightweight 3D modeling and rendering program, with</p>
						</div>
						position="left"
						windowWidth={windowWidth}
					/>
					<InfoBlock
						title=""
						paragraph=<div>
							<p>Cterm is a lightweight 3D modeling and rendering program, with</p>
							<p>Cterm is a lightweight 3D modeling and rendering program, with</p>
						</div>
						position="right"
						windowWidth={windowWidth}
					/>
					<InfoBlock
						title="Performance"
						paragraph=<ul>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
						</ul>
						offset={windowWidth/3 - 370}
						position="left"
						windowWidth={windowWidth}
					/>
					<InfoBlock
						title="Acessibility"
						paragraph=<ul>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
						</ul>
						position="right"
						windowWidth={windowWidth}
					/>
					<InfoBlock
						title=""
						paragraph=<ul>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
							<li>Cterm is a lightweight 3D modeling and rendering program, with</li>
						</ul>
						position="left"
						windowWidth={windowWidth}
					/>
				</div>
				<div className="h-100">
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
}) {

	const offset = position == "left"
		? windowWidth/3 - 370
		: windowWidth/3 * 2 - 370

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
		? [0.0, 0.5 * offset, 0.75 * offset, 0.9 * offset, offset]
		: [offset + 200, offset + 100, offset + 50, offset + 20, offset]
	);
	const [scrollDirection, setScrollDirection] = useState("down");

	useMotionValueEvent(scrollY, "change", (current) => {
		const diff = current - scrollY.getPrevious()
		setScrollDirection(diff > 0 ? "down" : "up")
	})

	return (
		<motion.div
			whileHover={{ border: 1, borderColor: "var(--accent1)" }}
			ref={ref}
			style={{ opacity: o, translateX: x }}

			className="relative flex flex-col gap-3 border border-(--accent2) w-[400px] p-4 rounded-lg"
		>
			<div>
				<h1>{title}</h1>
			</div>
			<div>
				{paragraph}
			</div>
		</motion.div>
	);
}
