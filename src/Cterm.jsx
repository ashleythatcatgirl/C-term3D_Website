
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAssets } from "/hooks/useAssets.js";
import { useTypes } from "/hooks/useTypes.js";
import { toast } from "sonner";

const placeholderImg = "/ctermplaceholder.png"
const API_URL = "https://api.polyhaven.com";

export default function Cterm() {
	const { assets, isLoadingAssets, refetchAssets } = useAssets(true);

	const [favoriteAssets, setFavoriteAssets] = useState([]);
	const [downloadedAssets, setDownloadedAssets] = useState([]);
	const [types, setTypes] = useState([]);
	const [categories, setCategories] = useState([]);

	const [filterType, setFilterType] = useState();
	const [filterCategory, setFilterCategory] = useState();

    	const [search, setSearch] = useState('');

	const [selectedAsset, setSelectedAsset] = useState();

    	useEffect(() => {
		handleGetTypes();
	}, []);
    	useEffect(() => {
		handleGetLocalStorage();
	}, []);
    	useEffect(() => {
		handleGetSessionStorage();
	}, []);

	const handleGetTypes = async () => {
		const endpoint = `/types`;

		const response = await fetch(`${API_URL}${endpoint}`);
		const data = await response.json();

		setTypes(data);
	};

	const handleGetCategories = async (type) => {
		const endpoint = `/categories/${type}`;

		const response = await fetch(`${API_URL}${endpoint}`);
		const data = await response.json();

		const categories = Object.keys(data);

		setCategories(categories);
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
			console.log('hi');
			toast.info("Redownloading asset");
		} else {
			toast.info("Downloading new asset");
		}

		const newDownloads = [...downloadedAssets, assets[index]];

		setDownloadedAssets(newDownloads);
		sessionStorage.setItem('downloadedAssets', JSON.stringify(newDownloads));
	};

	const handleFilterType = (type) => {
		if (type == 'all') {
			setFilterType(null);
			setFilterCategory(null);
			setCategories([]);
			return;
		}

		setFilterType(type);
		setFilterCategory(null);
		console.log('hi');
		handleGetCategories(type);
	};

	const handleFilterCategory = (category) => {
		if (category == 'all') {
			setFilterCategory(null);
			return;
		}
			
		setFilterCategory(category);
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

	const normalizedSearch = search
       		.toUpperCase()
	        .normalize("NFD")
       		.replace(/[\u0300-\u036f]/g, "");

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--color4) bg-(--color0)'>
			<header className='flex h-20 justify-between items-center bg-(--color-1) border-b-2 border-(--color3)'>
				<div className='px-22 py-2 w-1/2'>
					<h1 className='font-bold text-3xl'>C-term3D</h1>
				</div>
				<div className='px-22 py-2'>
					<Link
						to='/info'
						className='font-bold'
					>
					Info
					</Link>

				</div>
			</header>
			<main className='flex flex-col mx-20 gap-2'>
				<div className='flex flex-col lg:flex-row px-10 py-5 my-5 bg-(--color-1) rounded-xl'>
					<div className="flex flex-col min-w-[50%]">
						{/* C-term thing */}
						<div className="px-2 py-4">
							<h1 className='font-bold text-xl'>Renderer</h1>
						</div>
						<div className='relative
								p-1
								sm:p-2
								md:p-3
								lg:p-4
								w-[90%] bg-black rounded-2xl'
						>
							<p className="absolute top-[40%] left-0 right-0 mx-auto w-fit text-[5vw] font-bold">
								PLACEHOLDER
							</p>
							<img
								className="mx-auto "
								src={placeholderImg}
							/>
						</div>
					</div>
					<div className="flex flex-col w-full">
						<div className="px-2 py-4">
							<h1 className='font-bold text-xl'>Downloaded assets</h1>
						</div>
						<AssetList
							assets={downloadedAssets}
							favoriteAssets={null}
							downloadedAssets={downloadedAssets}
							onClick={null}
							selectedAsset={null}
							filterType={null}
							filterCategory={null}
							types={null}
							normalizedSearch={null}
							theThingYknow={true}
						/>
					</div>
				</div>
				<div className='flex px-4 py-4 gap-5 bg-(--color-1) rounded-xl'>
					<div className='flex flex-col w-[50%] gap-4 p-4 border-r-2 border-(--color3)'>
						<div className="border-b border-(--color2)">
							<h2 className="font-bold text-xl">Search</h2>
						</div>
						<div>
							<input
                               					 value={search}
				                                onChange={(e) => setSearch(e.target.value)}
								className="w-full p-2 bg-(--color-1) border-1 border-(--color3) rounded-lg"
							/>
						</div>
					</div>
					<div className='flex flex-col w-[50%] gap-4 p-4'>
						<div className="border-b border-(--color2)">
							<h2 className="font-bold text-xl">Filter</h2>
						</div>
						<div className="flex gap-4 justify-around">
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-xl">Type</h2>
								<select
									className="w-full p-2 bg-(--color-1) border-1 border-(--color3) rounded-lg"
                                					onChange={(e) => handleFilterType(e.target.value)}
								>
									<option>all</option>
									{types.map((type, index) => 
										   <option key={index}>{type}</option>
									)}
								</select>
							</div>
							<div className="flex gap-5 items-center">
								<h2 className="font-bold text-xl">Category</h2>
								<select
									className="w-full p-2 bg-(--color-1) border-1 border-(--color3) rounded-lg"
                                					onChange={(e) => handleFilterCategory(e.target.value)}
									disabled={filterType ? false : true}
								>
									{!filterType && (
										<option>Select a type first</option>
									)}
									{categories && (
									categories.map((category, index) => 
										   <option key={index}>{category}</option>
									))}
								</select>
							</div>
						</div>
					</div>


				</div>
				<div className='flex flex-col px-5 my-5 bg-(--color-1) rounded-xl'>
					<div className='px-4 py-4'>
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
		onClick, onClose, onFavorite, onDownload,
		isLoading
	}) {

	return (
		<div className={`${theThingYknow
			? 'overflow-y max-h-[42vh] overflow-scroll grid-cols-[repeat(auto-fit,minmax(50px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'
			: 'grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'
			}
			grid
			gap-5`}
		>
			{isLoading && <div className="flex justify-center h-20">
					<h1 className="font-bold text-4xl">Loading...</h1>
				</div>}
			{assets.map((asset, index) => 
				(!normalizedSearch ||
                       			asset.name
                       	               		.toUpperCase()
                       		                .normalize("NFD")
                       	                	.replace(/[\u0300-\u036f]/g, "")
                       		                .includes(normalizedSearch)
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
				/>))}
		</div>
	);
}

function Asset({asset, isSelected, isFavorited, index, onClick, onClose, onFavorite, onDownload}) {

	return (
		(!isSelected
		? (
		<div
			className={`flex flex-col relative
			${isSelected
				? 'bg-(--color-2) border-4'
				: 'bg-(--color-1) border-2 hover:bg-(--color-2)'
			} border-(--color3) rounded-xl transition-all`}
                        onClick={(e) => {
				e.stopPropagation();
				onClick(index);
			}}
		>
			<h2 className="absolute top-1 left-0 right-0 mx-auto w-fit font-medium">
				{asset.name}
			</h2>
			<img
				className='m-auto py-10 px-4'
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
		<div className="col-start-1 col-end-5 bg-(--color-1) rounded-xl p-2 md:p-5 lg:p-10 border-3 border-(--color3)">
			<div className="flex justify-between pb-4">
				<div className="flex gap-2">
					<button
						className="hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 bg-(--color1) rounded-lg cursor-pointer"
                        			onClick={(e) => {
							e.stopPropagation();
							onFavorite(index);
						}}
					>
					<span className="text-blue-300">♥</span> Favorite
					</button>

					<button
						className="hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 bg-(--color1) rounded-lg cursor-pointer"
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
						className="hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-100 ease-in-out transition-all px-4 py-2 bg-(--color1) rounded-lg cursor-pointer"
						onClick={onClose}
					>
					<span className="text-red-400">X</span> Close
					</button>
				</div>
			</div>
			<div className="flex h-full">
				<div className="flex flex-col border-r pr-8 max-w-[50%]">
					<h1 className='font-bold text-3xl'>{asset.name}</h1>
					<div className="relative w-[50%] lg:w-full">
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
					<div>
						<h2 className="font-bold text-lg pb-2">Description</h2>
						<p>{asset.description}</p>
					</div>
				</div>
				<div className="pl-8">
					<div className="pb-2 border-b">
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
					<div className="pb-2 pt-5 border-b">
						<h2 className="font-bold text-lg pb-2">Date published</h2>
						<div className="flex">
							<p>{Date(asset.date_published * 1000).replace(/\(.*\)/g, "")}</p>
						</div>
					</div>
					<div className="pb-2 pt-5 border-b">
						<h2 className="font-bold text-lg pb-2">Categories</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{asset.categories.map((category, index) =>
							<p key={index}>{category},</p>)}
						</div>
					</div>
					<div className="pb-2 pt-5 border-b">
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

