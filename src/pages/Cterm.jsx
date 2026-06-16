import { useEffect, useState, useRef } from "react";
import { normalize, setLocalStorage, setSessionStorage, checkAsset } from "../lib/utils.js";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"

import { toast } from "sonner";
import { Header } from "../components/Header.jsx";
import { Title } from "../components/Title.jsx";
import { Renderer } from "../components/Renderer.jsx";

import { useWindowDimensions } from "../hooks/useWindowDimensions.js";
import { useImgHeight } from "../hooks/useImgHeight.js";
import { useAssets } from "../hooks/useAssets.js";
import { useTypes } from "../hooks/useTypes.js";
import { useCategories } from "../hooks/useCategories";

const initLoadedAssets = 50;

export default function Cterm() {
	const { width: windowWidth, height: windowHeight} = useWindowDimensions();
	const { imgRef, imgHeight } = useImgHeight();

	const { assets, isLoadingAssets } = useAssets();
	const { types, isLoadingTypes } = useTypes();
	const { categories, isLoadingCategories } = useCategories();

	const initFavorites = JSON.parse(localStorage.getItem('favoriteAssets'));
	const initDownloads = JSON.parse(sessionStorage.getItem('downloadedAssets'));
	const [favoriteAssets, setFavoriteAssets] = useState(initFavorites ? initFavorites : []);
	const [downloadedAssets, setDownloadedAssets] = useState(initDownloads ? initDownloads : []);

	const [filterType, setFilterType] = useState();
	const [filterCategory, setFilterCategory] = useState();

    	const [search, setSearch] = useState('');

	const [selectedAsset, setSelectedAsset] = useState();
	const [loadedAssets, setLoadedAssets] = useState(initLoadedAssets);

	const handleFavoriteAsset = (assetName) => {
		let newFavorites = [];
		if (favoriteAssets.find((fAsset) => fAsset === assetName) != null) {
			newFavorites = favoriteAssets.filter((fAsset) => fAsset != assetName);
			toast.info("Removed from favorites");
		} else {
			newFavorites = [...favoriteAssets, assetName];
			toast.info("Added to favorites");
		}

		setFavoriteAssets(newFavorites);
		setLocalStorage("favoriteAssets", newFavorites);
	};

	const handleDownloadAsset = (asset) => {
		const newDownloads = [...downloadedAssets, asset];

		console.log(newDownloads);

		toast.info("Downloading asset");

		setDownloadedAssets(newDownloads);
		setSessionStorage("downloadedAssets", newDownloads);
	};

	const handleFilterType = (type) => {
		setLoadedAssets(initLoadedAssets);
		setFilterCategory(null);

		if (type == 'all') {
			setFilterType(null);
			return;
		}

		setFilterType(type);
	};

	const handleFilterCategory = (category) => {
		setLoadedAssets(initLoadedAssets);
		if (category == 'all') {
			setFilterCategory(null);
			return;
		}
			
		setFilterCategory(category);
	};

	const handleDeleteAsset = (asset) => {
		//TODO: Fix clicking on model, deleting all models with the same name
		// probably gonna use an index tbh
		const newDownloads = downloadedAssets.filter((dAsset) => dAsset.name != asset.name);

		toast.info("Deleted asset");

		setDownloadedAssets(newDownloads);
		setSessionStorage("downloadedAssets", newDownloads);
	}

	const normalizedSearch = normalize(search);

	console.log(imgHeight);
	
	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg)'>
			<Header
				title="Cterm3D"
			/>
			<main className='flex flex-col px-[170px]'>
				<div className='flex flex-col px-[100px] lg:flex-row py-2 sm:py-4 md:py-5 gap-5 rounded-xl'>
					<div className="flex flex-col min-w-[61%]">
						{/* C-term thing */}
						<Title
							title="Renderer"
							classNameDiv="py-2 md:py-4"
						/>
						<Renderer
							imgRef={imgRef}
						/>
					</div>
					<div
						className={`flex flex-col w-full`}
						style={{ maxHeight: windowWidth >= 1024 ? imgHeight : undefined}}
					>
						<Title
							title="Downloaded Assets"
							classNameTitle="text-right"
							classNameDiv="py-2 md:py-4"
						/>
						{downloadedAssets.length
							? <AssetList
								assets={downloadedAssets}
								theThingYknow={true}
								onClick={handleDeleteAsset}
								isLoading={false}
								limit={assets.length}
							/>
							: <div className="flex justify-center py-2 md:py-4">
								<h1 className="text-(--fg)/75 text-md">no downloaded assets..</h1>
							</div>
						}
					</div>
				</div>
				<div className='flex flex-col md:flex-row py-2 md:py-4 gap-2 sm:gap-4 md:gap-5 rounded-xl'>
					<div className='flex flex-col w-full md:w-[50%] gap-2 md:gap-4 pr-5 md:border-r-2 md:border-(--accent2)'>
						<Title
							title="Search"
							classNameDiv="border-b border-(--accent2)"
						/>
						<div>
							<input
                               					 value={search}
				                                onChange={(e) => setSearch(e.target.value)}
								className="outline-0 focus:border-(--accent1) focus:border-2 w-full p-2 border-1 border-(--accent2) rounded-lg text-(--fg) "
							/>
						</div>
					</div>
					<div className='flex flex-col w-full md:w-[50%] gap-2 md:gap-4'>
						<div className="border-b border-(--accent2)">
							<h2 className="font-bold text-xl">Filter</h2>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-around">
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-md lg:text-lg">Type</h2>
								<select
									className="w-full p-2 text-(--fg)/75 border-1 border-(--accent2) focus:border-(--accent1) focus:border-2 rounded-lg"
									value={filterType ? filterType : 'all'}
                                					onChange={(e) => handleFilterType(e.target.value)}
								>
									{!isLoadingTypes
									&& <option value='all'>all</option>
									}
									{isLoadingTypes
										? <option value="all">Loading...</option>
										: types.map((type) => 
											<option key={type} value={type}>{type}</option>
										)
									}
								</select>
							</div>
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-md lg:text-lg">Category</h2>
								<select
									className="w-full p-2 text-(--fg)/75 border-1 border-(--accent2) focus:border-(--accent1) focus:border-2 rounded-lg disabled:cursor-default"
									value={filterCategory ? filterCategory : 'all'}
                                					onChange={(e) => handleFilterCategory(e.target.value)}
									disabled={filterType ? false : true}
								>
									{!filterType && (
										<option value='all'>Select a type first</option>
									)}
									{filterType && (
									categories[filterType].map((category) => 
										   <option key={category} value={category}>{category}</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col px-[100px] rounded-xl'>
					<div className='px-2 py-2 md:py-4'>
						<h2 className="font-bold text-xl">Assets</h2>
					</div>
					<AssetList
						assets={assets}
						favoriteAssets={favoriteAssets}
						selectedAsset={selectedAsset}
						filterType={filterType}
						filterCategory={filterCategory}
						types={types}
						normalizedSearch={normalizedSearch}
						theThingYknow={false}
						onClick={setSelectedAsset}
						onClose={setSelectedAsset}
						onFavorite={handleFavoriteAsset}
						onDownload={handleDownloadAsset}
						isLoading={isLoadingAssets}
						limit={loadedAssets}
					/>
					<div className="flex justify-center w-full pt-5">
						<button
							className="text-xl font-bold border rounded-md px-20 py-5"
							onClick={(e) => {
								e.stopPropagation();
								setLoadedAssets(loadedAssets + initLoadedAssets)
							}}
						>
							Load more
						</button>
					</div>
				</div>
			</main>
		</div>
	);
}

function AssetList(
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
			? 'overflow-x-scroll flex lg:overflow-y-scroll lg:grid lg:grid-cols-[repeat(auto-fit,minmax(50px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'
			: 'grid grid-cols-[repeat(auto-fit,minmax(150px,auto))] md:grid-cols-[repeat(auto-fit,minmax(200px,auto))] xl:grid-cols-[repeat(auto-fit,minmax(300px,auto))]'
			} "gap-2 sm:gap-4 md:gap-5"`}
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

function Asset(
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
			className={`flex flex-col relative bg-(--bg) rounded-xl min-w-0
			${theThingYknow
				? 'text-xs'
				: 'text-sm lg:text-base'
			}`}
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
				{asset.name}
			</h2>
			<img
				className='m-auto pt-5 sm:pt-10 md:pt-15 pb-5 px-4'
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

