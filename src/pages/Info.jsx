import { useEffect, useState } from "react";
import { Header } from "../components/Header.jsx";

export default function Info() {

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg) text-sm'>
			<Header
				title="Info"
			/>
			<main className='flex flex-col px-[20px] md:px-[90px] xl:px-[170px] gap-[100px] py-[20px]'>
				<div className='flex flex-col lg:flex-row w-full gap-[20px] px-[20px] md:px-[60px] xl:px-[100px] bg-(--bg) rounded-xl'>
					<div className="flex flex-col rounded-xl min-w-[50%] gap-[20px]">
						<div className="px-[20px] md:px-[60px] xl:px-[100px] border-b-2 border-(--accent2)">
							<h1 className='font-bold text-2xl'>About this webpage</h1>
						</div>
						<div className="flex flex-col gap-[20px]">
							<div className="">
								<div className="">
									<h2 className="font-bold text-xl">What is this website?</h2>
								</div>
								<div className="flex flex-col px-[20px]">
									<p className="">
										<span className="text-lg font-bold">T</span>his website is meant to be a "demo" version for my program C-term3D, basically a preview for the actual program that you can download on my github page.
									</p>
									<p className="">
										<span className="text-lg font-bold">I</span>t can be used to view models in a 3D scene with the program UI and controls, it's also connected to the free api from Poly Haven for downloading, favoriting, and sorting through assets, to import into the scene all at once.
									</p>
								</div>
							</div>
							<div>
								<div className="">
									<h2 className="font-bold text-xl">What is C-term3D?</h2>
								</div>
								<div className="flex flex-col px-[20px]">
									<p className="">
										<span className="text-xl font-bold">C</span><span className="text-lg">-</span>term3D is a passion project i've been working on for some time now (about since 2026), it's my attempt at making a simpler program of Blender, mostly for viewing and rendering models than actually editing them, though i do plan to add some simple vertex editing.
									</p>
									<p className="">
										<span className="text-xl font-bold">I</span>t's made purely in C, so yes, the UI and controls and everything is just C and C libraries. The main library is OpenGL, an amazing free library for rendering things to the screen :D
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col rounded-xl min-w-[50%] gap-[20px]">
						<div className="flex px-[20px] md:px-[60px] xl:px-[100px] border-b-2 border-(--accent2)">
							<h1 className='font-bold text-2xl '>Links</h1>
						</div>
						<div className="flex flex-col gap-[20px]">
							<div className="flex flex-col justify-between">
								<div className="">
									<h2 className="font-bold text-xl">Github</h2>
								</div>
								<div className="px-[20px] pt-[20px]">
									<p className="italic text-(--fg) hover:tracking-[2px] transition-all text-(--accent1) hover:text-(--accent3)">
									<a href="https://github.com/ashleythatcatgirl/C-term3D_Website">
										{'Website -->'}
									</a>
									</p>
								</div>
								<div className="px-[20px] pt-[20px]">
									<p className="italic text-(--fg) hover:tracking-[2px] transition-all text-(--accent1) hover:text-(--accent3)">
									<a href="https://github.com/ashleythatcatgirl/C-term3D">
										{'C-term3D -->'}
									</a>
									</p>
								</div>

							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="px-[20px] md:px-[60px] xl:px-[100px] border-b-2 border-(--accent2)">
						<h1 className='font-bold text-2xl'>Documentation</h1>
					</div>
					<div className='flex flex-col lg:flex-row w-full gap-[20px] px-[20px] md:px-[60px] xl:px-[100px] py-[20px] bg-(--bg) rounded-xl'>
						<div className="flex flex-col rounded-xl min-w-[50%] gap-[20px]">
							<div className="px-[20px] md:px-[60px] xl:px-[100px] border-b-2 border-(--accent2)">
								<h1 className='font-bold text-2xl'>Code</h1>
							</div>
							<div className="flex flex-col gap-[20px]">
								<div className="">
									<div className="">
										<h2 className="font-bold text-xl">Libraries</h2>
									</div>
									<div className="flex flex-col px-[20px]">
										<p className="">
											<span className="text-xl font-bold">A</span> fugit est expedita dolore. Ut libero eos quo deleniti autem non minus. Quis est velit distinctio voluptatem. Qui sint id et.
										</p>
										<p className="">
											<span className="text-xl font-bold">E</span>t nobis perferendis dolor. In qui quo error voluptatem rerum quisquam reprehenderit rerum. Facilis maiores quos veniam necessitatibus facere. Quaerat autem rerum ut nobis ad.
										</p>
										<p className="">
											<span className="text-xl font-bold">A</span>ut earum placeat tempore sed qui dolorem quasi. Minus ea eum neque. Blanditiis quo excepturi voluptatum libero non minima. Velit exercitationem illo qui corrupti veniam.
										</p>
										<p className="">
											<span className="text-xl font-bold">M</span>olestiae beatae et repudiandae accusantium nesciunt vitae. Quo error eaque iste veniam cupiditate. Veritatis voluptatem quibusdam ut magnam ipsam reiciendis. Odit accusantium et odit et ut. Quod consequatur magni quas quidem ut rerum.
										</p>
										<p className="">
											<span className="text-xl font-bold">I</span>n recusandae maiores at voluptas eaque. Sit quia aut deserunt. Cumque sit quia sunt libero magnam quia. Non ratione laborum minus consectetur quo ut omnis. Accusantium saepe nihil ut est. Laboriosam vitae ipsam nulla similique sed.his website is meant to be a "demo" version for my program C-term3D, basically a preview for the actual program that you can download on my github page.
										</p>
									</div>
								</div>
								<div>
									<div className="">
										<h2 className="font-bold text-xl">...</h2>
									</div>
									<div className="flex flex-col px-[20px]">
										<p className="">
											<span className="text-xl font-bold">M</span>olestiae beatae et repudiandae accusantium nesciunt vitae. Quo error eaque iste veniam cupiditate. Veritatis voluptatem quibusdam ut magnam ipsam reiciendis. Odit accusantium et odit et ut. Quod consequatur magni quas quidem ut rerum.
										</p>
										<p className="">
											<span className="text-xl font-bold">I</span>n recusandae maiores at voluptas eaque. Sit quia aut deserunt. Cumque sit quia sunt libero magnam quia. Non ratione laborum minus consectetur quo ut omnis. Accusantium saepe nihil ut est. Laboriosam vitae ipsam nulla similique sed.his website is meant to be a "demo" version for my program C-term3D, basically a preview for the actual program that you can download on my github page.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col rounded-xl min-w-[50%] gap-[20px]">
							<div className="px-[20px] md:px-[60px] xl:px-[100px] border-b-2 border-(--accent2) right-0">
								<h1 className='font-bold text-2xl '>Other</h1>
							</div>
							<div className="flex flex-col gap-[20px]">
								<div className="">
									<div className="">
										<h2 className="font-bold text-xl">Libraries</h2>
									</div>
									<div className="flex flex-col px-[20px]">
										<p className="">
											<span className="text-xl font-bold">M</span>olestiae beatae et repudiandae accusantium nesciunt vitae. Quo error eaque iste veniam cupiditate. Veritatis voluptatem quibusdam ut magnam ipsam reiciendis. Odit accusantium et odit et ut. Quod consequatur magni quas quidem ut rerum.
										</p>
										<p className="">
											<span className="text-xl font-bold">I</span>n recusandae maiores at voluptas eaque. Sit quia aut deserunt. Cumque sit quia sunt libero magnam quia. Non ratione laborum minus consectetur quo ut omnis. Accusantium saepe nihil ut est. Laboriosam vitae ipsam nulla similique sed.his website is meant to be a "demo" version for my program C-term3D, basically a preview for the actual program that you can download on my github page.
										</p>
									</div>
								</div>
								<div>
									<div className="">
										<h2 className="font-bold text-xl">...</h2>
									</div>
									<div className="flex flex-col px-[20px]">
										<p className="">
											<span className="text-xl font-bold">A</span> fugit est expedita dolore. Ut libero eos quo deleniti autem non minus. Quis est velit distinctio voluptatem. Qui sint id et.
										</p>
										<p className="">
											<span className="text-xl font-bold">E</span>t nobis perferendis dolor. In qui quo error voluptatem rerum quisquam reprehenderit rerum. Facilis maiores quos veniam necessitatibus facere. Quaerat autem rerum ut nobis ad.
										</p>
										<p className="">
											<span className="text-xl font-bold">A</span>ut earum placeat tempore sed qui dolorem quasi. Minus ea eum neque. Blanditiis quo excepturi voluptatum libero non minima. Velit exercitationem illo qui corrupti veniam.
										</p>
										<p className="">
											<span className="text-xl font-bold">M</span>olestiae beatae et repudiandae accusantium nesciunt vitae. Quo error eaque iste veniam cupiditate. Veritatis voluptatem quibusdam ut magnam ipsam reiciendis. Odit accusantium et odit et ut. Quod consequatur magni quas quidem ut rerum.
										</p>
										<p className="">
											<span className="text-xl font-bold">I</span>n recusandae maiores at voluptas eaque. Sit quia aut deserunt. Cumque sit quia sunt libero magnam quia. Non ratione laborum minus consectetur quo ut omnis. Accusantium saepe nihil ut est. Laboriosam vitae ipsam nulla similique sed.his website is meant to be a "demo" version for my program C-term3D, basically a preview for the actual program that you can download on my github page.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
