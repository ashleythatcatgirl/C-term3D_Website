import { useState } from "react";
import { normalize, setLocalStorage, setSessionStorage } from "../lib/utils.js";

import { toast } from "sonner";
import { Header } from "../components/Header.jsx";
import { Title } from "../components/Title.jsx";
import { AssetList } from "../components/Assets.jsx";

import { useWindowDimensions } from "../hooks/useWindowDimensions.js";
import { useAssets } from "../hooks/useAssets.js";
import { useTypes } from "../hooks/useTypes.js";
import { useCategories } from "../hooks/useCategories";

const initLoadedAssets = 50;

export default function Cterm() {
	const { width: windowWidth, height: windowHeight} = useWindowDimensions();
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

	const [isMenuOpen, setIsMenuOpen] = useState();

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


	const normalizedSearch = normalize(search);

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg) bg-(--bg) text-sm'>
			<Header
				title="Library"
				windowWidth={windowWidth}
				isMenuOpen={isMenuOpen}
				onOpen={setIsMenuOpen}
			/>
			<main className='flex flex-col px-[20px] md:px-[90px] xl:px-[170px]'>
				<div className='flex flex-col px-[40px] md:px-[120px] xl:px-[200px] lg:flex-row py-[20px] rounded-xl'>
					<div className='flex flex-col w-full md:min-w-[61.8%] pr-2'>
						<div className="border-b border-(--accent1) px-[20px] md:px-[60px] xl:px-[100px] mb-[20px]">
							<h2 className="font-bold text-xl">Filter</h2>
						</div>
						<div className="flex flex-col gap-5 md:gap-3 sm:flex-row justify-between px-[20px]">
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-base lg:text-md">Type</h2>
								<select
									className="w-full p-2 text-(--fg)/75 border border-(--fg)/10 hover:bg-(--bg-alt) focus:border-(--accent2) rounded-lg"
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
								<h2 className="font-bold text-base lg:text-md">Category</h2>
								<select
									className="w-full p-2 text-(--fg)/75 border border-(--fg)/10 hover:bg-(--bg-alt) focus:border-(--accent2) rounded-lg disabled:cursor-default"
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
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-base lg:text-md">Tags</h2>
								<select
									className="w-full p-2 text-(--fg)/75 border border-(--fg)/10 hover:bg-(--bg-alt) focus:border-(--accent2) rounded-lg disabled:cursor-default"
									disabled={true}
								>
									<option value='all'>all</option>
								</select>
							</div>
						</div>
					</div>
					<div className='flex flex-col w-full pl-2'>
						<Title
							title="Search"
							classNameDiv="border-b border-(--accent1) px-[100px] mb-[20px]"
						/>
						<div className="px-[20px]">
							<input
                               					value={search}
				                                onChange={(e) => setSearch(e.target.value)}
								className="outline-0 hover:bg-(--bg-alt) border border-(--fg)/10 focus:border-(--accent2) w-full p-2 rounded-lg"
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col px-[20px] md:px-[60px] xl:px-[100px] rounded-xl'>
					<div className='pt-[20px] px-[20px] md:px-[60px] xl:px-[100px] border-b border-(--accent2) mb-[20px]'>
						<h2 className="font-bold text-xl tracking-wide">Asset library</h2>
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
					<div className="flex justify-center w-full">
						{!isLoadingAssets &&
						<button
							className="text-xl font-bold hover:border rounded-xl px-[80px] py-[20px] mt-[20px]"
							onClick={(e) => {
								e.stopPropagation();
								setLoadedAssets(loadedAssets + initLoadedAssets)
							}}
						>
							Load more
						</button>}
					</div>
					<div className="h-[100px]"></div>
				</div>
			</main>
		</div>
	);
}

