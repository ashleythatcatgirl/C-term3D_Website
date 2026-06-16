import { useEffect, useState } from "react";
import { Header } from "../components/Header.jsx";

export default function Info() {

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg)'>
			<Header
				title="Info"
			/>
			<main className='flex px-[170px]'>
				<div className='flex flex-col lg:flex-row w-full gap-5 py-2 sm:py-4 md:py-5 bg-(--bg) rounded-xl'>
					<div className="flex flex-col px-[100px] py-4 md:w-[60%] rounded-xl">
						<div className="border-b-2 border-(--accent2)">
							<h1 className='font-bold text-2xl'>About this webpage</h1>
						</div>
						<div className="flex flex-col gap-4 px-2 sm:px-4 md:px-8 py-4">
							<div className="pb-4">
								<div className="pb-2">
									<h2 className="font-bold text-xl">What is this website?</h2>
								</div>
								<div className="flex flex-col gap-2 px-4">
									<p className="text-justify">
										<span className="text-xl">T</span>his website is meant to be a "demo" version for my program C-term3D, basically a preview for the actual program that you can download on my github page.
									</p>
									<p className="text-justify">
										<span className="text-xl">I</span>t can be used to view models in a 3D scene with the program UI and controls, it's also connected to the free api from Poly Haven for downloading, favoriting, and sorting through assets, to import into the scene all at once.
									</p>
								</div>
							</div>
							<div>
								<div className="pb-2">
									<h2 className="font-bold text-xl">What is C-term3D?</h2>
								</div>
								<div className="flex flex-col gap-2 px-4">
									<p className="text-justify">
										<span className="text-xl">C</span><span className="text-lg">-</span>term3D is a passion project i've been working on for some time now (about since 2026), it's my attempt at making a simpler program of Blender, mostly for viewing and rendering models than actually editing them, though i do plan to add some simple vertex editing.
									</p>
									<p className="text-justify">
										<span className="text-xl">I</span>t's made purely in C, so yes, the UI and controls and everything is just C and C libraries. The main library is OpenGL, an amazing free library for rendering things to the screen :D
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col px-4 py-4 md:w-[50%] rounded-xl">
						<div className="border-b-2 border-(--accent2)">
							<h1 className='font-bold text-2xl px-2'>Links</h1>
						</div>
						<div className="px-2 sm:px-4 md:px-8 py-4">
							<div className="flex flex-col gap-1 justify-between">
								<div className="pb-2">
									<h2 className="font-bold text-xl">Github</h2>
								</div>
								<div className="px-4">
									<p className="italic text-(--fg) hover:text-lg transition-all hover:text-(--accent1)">
									<a href="https://github.com/ashleythatcatgirl/C-term3D_Website">
										{'Website -->'}
									</a>
									</p>
								</div>
								<div className="px-4">
									<p className="italic text-(--fg) hover:text-lg transition-all hover:text-(--accent1)">
									<a href="https://github.com/ashleythatcatgirl/C-term3D">
										{'C-term3D -->'}
									</a>
									</p>
								</div>

							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
