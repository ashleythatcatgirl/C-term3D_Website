
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "/hooks/useWindowDimensions.js";
import { useAssets } from "/hooks/useAssets.js";
import { useTypes } from "/hooks/useTypes.js";
import { toast } from "sonner";

const placeholderImg = "/ctermplaceholder.png"
const API_URL = "https://api.polyhaven.com";

export default function Cterm() {
	const { windowWidth, windowHeight } = useWindowDimensions();

	const { assets, isLoadingAssets, refetchAssets } = useAssets(true);
	const { types, isLoadingTypes, refetchTypes } = useTypes(true);

	const [favoriteAssets, setFavoriteAssets] = useState([]);
	const [downloadedAssets, setDownloadedAssets] = useState([]);
	const [categories, setCategories] = useState([]);

	const [filterType, setFilterType] = useState();
	const [filterCategory, setFilterCategory] = useState();

    	const [search, setSearch] = useState('');

	const [selectedAsset, setSelectedAsset] = useState();

	const imgRef = useRef(null);
	const [imgHeight, setImgHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
        		setImgHeight((imgRef.current?.offsetHeight ?? 0) + 90);
		};
		
		updateHeight();
		window.addEventListener("resize", updateHeight);
	}, []);

    	useEffect(() => {
		handleGetLocalStorage();
	}, []);
    	useEffect(() => {
		handleGetSessionStorage();
	}, []);

	const handleGetCategories = async (type) => {
		const endpoint = `/categories/${type}`;

		const response = await fetch(`${API_URL}${endpoint}`);
		const data = await response.json();

		const categories = Object.keys(data);

		setCategories(categories);
	};

	const handleGetLocalStorage = () => {
		const savedFavorites = localStorage.getItem('favoriteAssets');
		if (!savedFavorites) return;

		const temp = savedFavorites.split(',');
		const temp2 = temp.map((t) => t = parseInt(t));

		setFavoriteAssets(temp2);
	};
	const handleGetSessionStorage = () => {
		const savedDownloads = sessionStorage.getItem('downloadedAssets');
		if (!savedDownloads) return;

		setDownloadedAssets(JSON.parse(savedDownloads));
	};

	const handleAssetSelect = (index) => {
		if (index == selectedAsset) {
			setSelectedAsset(null);
			return;
		}
		setSelectedAsset(index);
	};

	const handleCloseMenu = () => {
		setSelectedAsset(null);
	};

	const handleFavoriteAsset = (index) => {
		let newFavorites = [];
		if (favoriteAssets.find((fAsset) => fAsset === index) != null) {
			newFavorites = favoriteAssets.filter((fAsset) => fAsset != index);
			toast.info("Removed from favorites");
		} else {
			newFavorites = [...favoriteAssets, index];
			toast.info("Added to favorites");
		}

		setFavoriteAssets(newFavorites);
		localStorage.setItem('favoriteAssets', newFavorites);
	};

	const handleDownloadAsset = (index) => {
		if (downloadedAssets.find((dAsset) => dAsset == assets[index]) != null) {
			toast.info("Redownloading asset");
		} else {
			toast.info("Downloading new asset");
		}

		const newDownloads = [...downloadedAssets, assets[index]];

		setDownloadedAssets(newDownloads);
		sessionStorage.setItem('downloadedAssets', JSON.stringify(newDownloads));
	};

	const handleFilterType = (type) => {
		setFilterCategory(null);

		if (type == 'all') {
			setFilterType(null);
			setCategories([]);
			return;
		}

		setFilterType(type);
		handleGetCategories(type);
	};

	const handleFilterCategory = (category) => {
		if (category == 'all') {
			setFilterCategory(null);
			return;
		}
			
		setFilterCategory(category);
	};

	const handleDeleteAsset = (asset) => {
		const newDownloads = downloadedAssets.filter((a) => a != asset);

		toast.info("Deleted asset");
		setDownloadedAssets(newDownloads);
		sessionStorage.setItem('downloadedAssets', JSON.stringify(newDownloads));
	}

	function normalize(str) {
		const normalized = (
			str
			.toUpperCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
		);

		return normalized;
	};
	const normalizedSearch = normalize(search);
		
	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg-normal) bg-(--bg-normal)'>
			<header className='flex h-15 sm:h-18 md:h-20 justify-between items-center bg-(--bg-dark) border-b-2 border-(--color1)'>
				<div className='pl-5 sm:px-10 md:px-16 lg:px-22 py-2 w-1/2'>
					<h1 className='font-bold text-3xl'>C-term3D</h1>
				</div>
				<div className='pr-5 sm:px-10 md:px-16 lg:px-22 py-2'>
					<Link
						to='/info'
						className='font-bold'
					>
						<button
							className="bg-(--bg-darker) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
						>
							Info
						</button>
					</Link>

				</div>
			</header>
			<main className='flex flex-col mx-2 sm:mx-5 md:mx-10 lg:mx-20 gap-2'>
				<div className='flex flex-col lg:flex-row px-5 md:px-10 py-2 sm:py-4 md:py-5 my-5 bg-(--bg-dark) rounded-xl'>
					<div className="flex flex-col min-w-[50%] ">
						{/* C-term thing */}
						<div className="px-2 py-2 md:py-4">
							<h1 className='font-bold text-xl'>Renderer</h1>
						</div>
						<div className='relative
								p-1 sm:p-2 md:p-3 lg:p-4
							w-full lg:w-[90%] bg-black rounded-2xl'
						>
							<p className="absolute top-[40%] left-0 right-0 mx-auto w-fit text-[5vw] font-bold">
								PLACEHOLDER
							</p>
							<img
								ref={imgRef}
								className="mx-auto"
								src={placeholderImg}
							/>
						</div>
					</div>
					<div
						className={`flex flex-col w-full`}
						style={{ maxHeight: windowWidth >= 1024 ? undefined : imgHeight}}
					>
						<div className="px-2 py-2 md:py-4">
							<h1 className='font-bold text-xl'>Downloaded assets</h1>
						</div>
						{downloadedAssets.length
							? <AssetList
								assets={downloadedAssets}
								favoriteAssets={null}
								selectedAsset={null}
								filterType={null}
								filterCategory={null}
								types={null}
								normalizedSearch={null}
								theThingYknow={true}
								onClick={handleDeleteAsset}
								onClose={null}
								onFavorite={null}
								onDownload={null}
								isLoading={false}
							/>
							: <div className="flex justify-center px-4 py-2 md:py-4">
								<h1 className="text-(--fg-dark) text-md">no downloaded assets..</h1>
							</div>
						}
					</div>
				</div>
				<div className='flex flex-col md:flex-row px-2 md:px-4 py-2 md:py-4 gap-2 sm:gap-4 md:gap-5 bg-(--bg-dark) rounded-xl'>
					<div className='flex flex-col w-full md:w-[50%] gap-2 md:gap-4 p-2 md:p-4 md:border-r-2 md:border-(--color1)'>
						<div className="border-b border-(--color2)">
							<h2 className="font-bold text-xl">Search</h2>
						</div>
						<div>
							<input
                               					 value={search}
				                                onChange={(e) => setSearch(e.target.value)}
								className="outline-0 focus:border-(--color1) focus:border-2 w-full p-2 bg-(--bg-normal) border-1 border-(--color2) rounded-lg text-(--fg-dark) "
							/>
						</div>
					</div>
					<div className='flex flex-col w-full md:w-[50%] gap-2 md:gap-4 p-2 md:p-4'>
						<div className="border-b border-(--color2)">
							<h2 className="font-bold text-xl">Filter</h2>
						</div>
						<div className="flex flex-col sm:flex-row gap-4 justify-around">
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-md lg:text-lg">Type</h2>
								<select
									className="w-full p-2 bg-(--bg-normal) text-(--fg-dark) border-1 border-(--color2) focus:border-(--color1) focus:border-2 rounded-lg cursor-pointer"
									value={filterType ? filterType : 'all'}
                                					onChange={(e) => handleFilterType(e.target.value)}
								>
									<option value='all'>all</option>
									{types.map((type, index) => 
										   <option key={index} value={type}>{type}</option>
									)}
								</select>
							</div>
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-md lg:text-lg">Category</h2>
								<select
									className="w-full p-2 bg-(--bg-normal) text-(--fg-dark) border-1 border-(--color2) focus:border-(--color1) focus:border-2 rounded-lg cursor-pointer disabled:cursor-default"
									value={filterCategory ? filterCategory : 'all'}
                                					onChange={(e) => handleFilterCategory(e.target.value)}
									disabled={filterType ? false : true}
								>
									{!filterType && (
										<option value='all'>Select a type first</option>
									)}
									{categories && (
									categories.map((category, index) => 
										   <option key={index} value={category}>{category}</option>
									))}
								</select>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col px-5 my-5 bg-(--bg-dark) rounded-xl'>
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
						onClick={handleAssetSelect}
						onClose={handleCloseMenu}
						onFavorite={handleFavoriteAsset}
						onDownload={handleDownloadAsset}
						normalize={normalize}
						isLoading={isLoadingAssets}
					/>
				</div>
			</main>
		</div>
	);
}

function AssetList(
	{
		assets, favoriteAssets, selectedAsset,
		types,
		filterType, filterCategory,
		normalizedSearch, theThingYknow,
		onClick, onClose, onFavorite, onDownload, normalize,
		isLoading
	}) {

	return (
		<div className={`${theThingYknow
			? 'overflow-x-scroll flex lg:overflow-y-scroll lg:grid lg:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'
			: 'grid grid-cols-[repeat(auto-fit,minmax(150px,auto))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(300px,auto))]'
		} gap-2 sm:gap-4 md:gap-5`}
		>
			{isLoading
				? <div className="flex justify-center h-20">
					<h1 className="text-(--fg-dark) font-bold text-xl">Loading...</h1>
				</div>
				:	assets.map((asset, index) => 
				(!normalizedSearch ||
                       			normalize(asset.name).includes(normalizedSearch)
				) && (!filterType ||
					filterType == types[asset.type]
				) && (!filterCategory ||
					asset.categories.find((category) => category == filterCategory)
				) && (<Asset
					key={index}
					asset={asset}
					isSelected={index == selectedAsset ? true : false}
					isFavorited={favoriteAssets != null
						? favoriteAssets.find((fAsset) => fAsset == index) != null ? true : false
						: false
					}
					index={index}
					onClick={onClick}
					onClose={onClose}
					onFavorite={onFavorite}
					onDownload={onDownload}
					theThingYknow={theThingYknow}
				/>))
			}
		</div>
	);
}

function Asset(
	{
		asset,
		isSelected, isFavorited,
		index,
		onClick, onClose, onFavorite, onDownload,
		theThingYknow
	}) {

	return (
		(!isSelected
		? (
		<div
			className={`flex flex-col relative
			${isSelected
				? 'bg-(--bg-dark) border-2 md:border-4'
				: 'bg-(--bg-dark) border-1 md:border-2 hover:bg-(--bg-darker) hover:border-(--color1)'
			}
			${theThingYknow
				? 'text-xs'
				: 'text-sm lg:text-base'
			} border-(--color2) rounded-xl transition-all min-w-20 lg:min-w-0`}
                        onClick={theThingYknow
				? (e) => {
					e.stopPropagation();
					onClick(asset);}
				: (e) => {
					e.stopPropagation();
					onClick(index);
				}
			}
		>
			<h2 className="text-center absolute top-2 md:top-4 left-1 right-1 mx-auto w-fit font-medium">
				{asset.name}
			</h2>
			<img
				className='m-auto pt-15 pb-5 px-4'
				src={asset.thumbnail_url}
				alt="loading.."
			/>
			<div className="absolute top-1 left-1">
				{isFavorited
					? <p className="font-bold text-xl">♥️</p>
					: null
				}
			</div>
		</div>
		) : (
		<div className="overflow-y-scroll max-h-[500px] col-span-full bg-(--color-1) rounded-xl p-2 md:p-5 lg:p-10 border-1 md:border-3 border-(--color3)">
			<div className="flex justify-between pb-4">
				<div className="flex flex-col sm:flex-row gap-1 md:gap-2">
					<button
						className="bg-(--bg-darker) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
                        			onClick={(e) => {
							e.stopPropagation();
							onFavorite(index);
						}}
					>
					<span className="text-blue-300">♥</span> Favorite
					</button>

					<button
						className="bg-(--bg-darker) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
                        			onClick={(e) => {
							e.stopPropagation();
							onDownload(index);
						}}
					>
					<span className="text-green-300">↓</span> Download
					</button>

				</div>
				<div>
					<button
						className="bg-(--bg-darker) hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 rounded-lg cursor-pointer border-1 border-(--bg-light)"
						onClick={onClose}
					>
					<span className="text-red-400">X</span> Close
					</button>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="flex flex-col md:border-r border-(--color1) px-2 md:px-0 md:pr-8 w-full md:max-w-[50%]">
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
					<div className="pb-2 border-b md:pb-0 md:border-0 border-(--color2)">
						<h2 className="font-bold text-lg pb-2">Description</h2>
						<p className="text-justify">{asset.description}</p>
					</div>
				</div>
				<div className="pl-2 md:pl-8">
					<div className="pb-2 pt-5 md:pt-0 border-b border-(--color2)">
						<h2 className="font-bold text-lg pb-2">Authors</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							<div className="flex flex-col">
								{Object.keys(asset.authors).map((author, index) => 
								<p key={index}>{author}: </p>)}
							</div>
							<div className="flex flex-col">
								{Object.values(asset.authors).map((work, index) => 
								<p key={index}>{work}</p>)}
							</div>
						</div>

					</div>
					<div className="pb-2 pt-5 border-b border-(--color2)">
						<h2 className="font-bold text-lg pb-2">Date published</h2>
						<div className="flex">
							<p>{Date(asset.date_published * 1000).replace(/\(.*\)/g, "")}</p>
						</div>
					</div>
					<div className="pb-2 pt-5 border-b border-(--color2)">
						<h2 className="font-bold text-lg pb-2">Categories</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{asset.categories.map((category, index) =>
							<p key={index}>{category},</p>)}
						</div>
					</div>
					<div className="pb-2 pt-5">
						<h2 className="font-bold text-lg pb-2">Tags</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{asset.tags.map((tag, index)=>
							<p key={index}>{tag},</p>)}
						</div>
					</div>
				</div>
			</div>
		</div>
		))
	);
}

