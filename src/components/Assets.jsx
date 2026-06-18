import { useEffect, useState, useRef } from "react";
import { normalize, setLocalStorage, setSessionStorage, checkAsset } from "../lib/utils.js";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"

import { Title } from "../components/Title.jsx";

export function AssetList(
	{
		assets,
		favoriteAssets,
		selectedAsset,
		types,
		filterType,
		filterCategory,
		normalizedSearch,
		theThingYknow,
		onClick,
		onClose,
		onFavorite,
		onDownload,
		isLoading,
		limit,
	}) {

	let index = 0;

	return (
		<div className={`${theThingYknow
			? 'py-3 gap-[2px] overflow-x-scroll flex lg:overflow-y-scroll lg:grid lg:grid-cols-[repeat(auto-fit,minmax(50px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'
			: 'grid px-[20px] md:px-[60px] xl:px-[100px] gap-[20px] grid-cols-[repeat(auto-fit,minmax(100px,auto))] md:grid-cols-[repeat(auto-fit,minmax(180px,auto))] xl:grid-cols-[repeat(auto-fit,minmax(260px,auto))] justify-center'
			}`}
		>
			{isLoading
				? <Title
					title="Loading..."
					classNameTitle="text-(--fg)"
					classNameDiv="flex justify-center pb-10 animate-pulse"
				/>
				: assets.map((asset) => 
					(checkAsset(asset, index, types, filterType, filterCategory, normalizedSearch, limit)
					) && (
					index += 1
					) && (
					<Asset
						key={index}
						asset={asset}
						isSelected={asset.name == selectedAsset}
						isFavorited={favoriteAssets != null
							? favoriteAssets.find((fAsset) => fAsset == asset.name) != null
							: false
						}
						onClick={onClick}
						onClose={onClose}
						onFavorite={onFavorite}
						onDownload={onDownload}
						theThingYknow={theThingYknow}
					/>)
				)
			}
		</div>
	);
}

export function Asset(
	{
		asset,
		isSelected,
		isFavorited,
		onClick,
		onClose,
		onFavorite,
		onDownload,
		theThingYknow
	}) {

	const { scrollY } = useScroll()
	const [scrollDirection, setScrollDirection] = useState("down")

	useMotionValueEvent(scrollY, "change", (current) => {
		const diff = current - scrollY.getPrevious()
		setScrollDirection(diff > 0 ? "down" : "up")
	})

	return (
		<AnimatePresence>
		{!isSelected
		? (
		<motion.div
			initial={{ opacity: 0.1, translateY: 0 }}
			whileInView={{ opacity: 1.0, translateY: scrollDirection == "down" ? -10 : 10 }}
			whileHover={{ background: "var(--bg)", boxShadow: "0 0 2px 2px var(--accent1) inset" }}
			transition={{
				opacity: { duration: theThingYknow ? 0.2 : 0.5 },
				translateY: { duration: theThingYknow ? 0.2 : 0.5 },
				boxShadow: { duration: 0.3, ease: "easeOut" },
				background: {duration: 0.3, ease: "easeOut"} }}
			className={`flex flex-col relative bg-(--bg) rounded-xl min-w-0 text-sm`}
                        onClick={theThingYknow
				? (e) => {
					e.stopPropagation();
					onClick(asset);}
				: (e) => {
					e.stopPropagation();
					onClick(asset.name);
				}
			}
		>
			<h2 className="text-center absolute top-2 md:top-4 left-1 right-1 mx-auto w-fit font-medium">
				{theThingYknow ? "" : asset.name}
			</h2>
			<img
				className={`m-auto pt-5 pb-5 px-4
				${theThingYknow
					? ""
					: "pt-15" }`}
				src={asset.thumbnail_url}
				alt="loading.."
			/>
			<div className="absolute top-1 left-1">
				{isFavorited
					? <p className="font-bold text-xl">♥️</p>
					: null
				}
			</div>
		</motion.div>
		) : (
		<motion.div
			className="overflow-y-scroll max-h-[500px] col-span-full rounded-xl p-2 md:p-5 lg:p-10 border md:border-2 border-(--accent1)"
			transition={{
				duration: 0.3, ease: "easeInOut",
				opacity: { duration: 0.5 },
				translateY: { duration: 0.5 },
			}}
			whileInView={{ opacity: 1.0, translateY: scrollDirection == "down" ? -10 : 10 }}
			onLostPointerCaptureCaptu
			initial={{ opacity: 0, scale: 0, translateY: 0 }}
                        animate={{ opacity: 1.0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
			key="box"
		>
			<div className="flex justify-between pb-4">
				<div className="flex flex-col sm:flex-row gap-1 md:gap-2">
					<button
						className="hover:bg-(--accent2) active:bg-(--accent3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg border-1 border-(--accent2)"
                        			onClick={(e) => {
							e.stopPropagation();
							onFavorite(asset.name);
						}}
					>
						<span className="text-blue-300">♥</span> Favorite
					</button>

					<button
						className="hover:bg-(--accent2) active:bg-(--accent3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg border-1 border-(--accent2)"
                        			onClick={(e) => {
							e.stopPropagation();
							onDownload(asset);
						}}
					>
						<span className="text-green-300">↓</span> Download
					</button>

				</div>
				<div>
					<button
						className="hover:bg-(--accent2) active:bg-(--accent3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg border-1 border-(--accent2)"
						onClick={(e) => {
							e.stopPropagation();
							onClose(null);
						}}
					>
						<span className="text-red-400">X</span> Close
					</button>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-col md:border-r border-(--accent2) px-2 md:px-0 md:pr-8 w-full md:max-w-[50%]">
					<h1 className='font-bold text-2xl md:text-3xl'>{asset.name}</h1>
					<div className="relative w-full md:w-[50%] lg:w-full">
						<img
							src={asset.thumbnail_url}
							className="py-10 max-w-full h-auto mx-auto"
						/>
						<div className="absolute top-1 left-1">
							{isFavorited
								? <p className="font-bold text-xl">♥️</p>
								: null
							}
						</div>
					</div>
					<div className="pb-2 border-b md:pb-0 md:border-0 border-(--accent2)">
						<h2 className="font-bold text-lg pb-2">Description</h2>
						<p className="text-justify">{asset.description}</p>
					</div>
				</div>
				<div className="pl-2 md:pl-8">
					<div className="pb-2 pt-5 md:pt-0 border-b border-(--accent2)">
						<h2 className="font-bold text-lg pb-2">Authors</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							<div className="flex flex-col">
								{Object.keys(asset.authors).map((author) => 
								<p key={author}>{author}: </p>)}
							</div>
							<div className="flex flex-col">
								{Object.values(asset.authors).map((work) => 
								<p key={work}>{work}</p>)}
							</div>
						</div>

					</div>
					<div className="pb-2 pt-5 border-b border-(--accent2)">
						<h2 className="font-bold text-lg pb-2">Date published</h2>
						<div className="flex">
							<p>{Date(asset.date_published * 1000).replace(/\(.*\)/g, "")}</p>
						</div>
					</div>
					<div className="pb-2 pt-5 border-b border-(--accent2)">
						<h2 className="font-bold text-lg pb-2">Categories</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{asset.categories.map((category) =>
							<p key={category}>{category},</p>)}
						</div>
					</div>
					<div className="pb-2 pt-5">
						<h2 className="font-bold text-lg pb-2">Tags</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{asset.tags.map((tag)=>
							<p key={tag}>{tag},</p>)}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
		)}
		</AnimatePresence>
	);
}

