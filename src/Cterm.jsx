
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://api.polyhaven.com";

export default function Cterm() {
	const [models, setModels] = useState([]);
	const [favoriteModels, setFavoriteModels] = useState([]);
	const [downloadedModels, setDownloadedModels] = useState([]);

	const [types, setTypes] = useState([]);
	const [categories, setCategories] = useState([]);

	const [filterType, setFilterType] = useState();
	const [filterCategory, setFilterCategory] = useState();

    	const [search, setSearch] = useState('');

	const [selectedModel, setSelectedModel] = useState();

    	useEffect(() => {
		handleGetModels();
	}, []);
    	useEffect(() => {
		handleGetTypes();
	}, []);
    	useEffect(() => {
		handleGetLocalStorage();
	}, []);
    	useEffect(() => {
		handleGetSessionStorage();
	}, []);

	const handleGetModels = async () => {
		const endpoint = '/assets';

		const response = await fetch(`${API_URL}${endpoint}`);
		const data = await response.json();

		const models = Object.values(data);

		setModels(models);
	};

	const handleGetTypes = async () => {
		const endpoint = '/types';

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

	const handleModelSelect = (index) => {
		if (index == selectedModel) {
			setSelectedModel(null);
			return;
		}
		setSelectedModel(index);
	};

	const handleCloseMenu = () => {
		setSelectedModel(null);
	};

	const handleFavoriteModel = (index) => {
		let newFavorites = [];
		//TODO: FIX
		if (favoriteModels.find((fModel) => fModel == index)) {
			newFavorites = favoriteModels.filter((fModel) => fModel != index);
		} else {
			newFavorites = [...favoriteModels, index];
		}

		setFavoriteModels(newFavorites);
		localStorage.setItem('favoriteModels', newFavorites);
	};

	const handleDownloadModel = (index) => {
		if (downloadedModels.find((dModel) => dModel == index)) {
			alert('Redownloading model');
		}

		const newDownloads = [...downloadedModels, models[index]];

		setDownloadedModels(newDownloads);
		sessionStorage.setItem('downloadedModels', JSON.stringify(newDownloads));
	};

	const handleFilterType = (type) => {
		if (type == 'all') {
			setFilterType(null);
			setFilterCategory(null);
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

	const handleGetLocalStorage = () => {
		const savedFavorites = localStorage.getItem('favoriteModels');
		if (!favoriteModels) return;

		const temp = savedFavorites.split(',');
		const temp2 = temp.map((t) => t = parseInt(t));

		setFavoriteModels(temp2);
	};
	const handleGetSessionStorage = () => {
		const savedDownloads = sessionStorage.getItem('downloadedModels');
		if (!savedDownloads) return;

		setDownloadedModels(JSON.parse(savedDownloads));
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
								src="../src/assets/ctermplaceholder.png"
							/>
						</div>
					</div>
					<div className="flex flex-col w-full">
						<div className="px-2 py-4">
							<h1 className='font-bold text-xl'>Downloaded models</h1>
						</div>
						<ModelList
							models={downloadedModels}
							favoriteModels={null}
							downloadedModels={downloadedModels}
							onClick={null}
							selectedModel={null}
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
								>
									<option>all</option>
									{!categories} && 
									{categories.map((category, index) => 
										   <option key={index}>{category}</option>
									)}
								</select>
							</div>
						</div>
					</div>


				</div>
				<div className='flex flex-col px-5 my-5 bg-(--color-1) rounded-xl'>
					<div className='px-4 py-4'>
						<h2 className="font-bold text-xl">Models</h2>
					</div>
					{selectedModel != null &&
					(<ModelDetails
						models={models}
						index={selectedModel}
						onClose={handleCloseMenu}
						onFavorite={handleFavoriteModel}
						onDownload={handleDownloadModel}
					/>)}
					<ModelList
						models={models}
						favoriteModels={favoriteModels}
						onClick={handleModelSelect}
						selectedModel={selectedModel}
						filterType={filterType}
						filterCategory={filterCategory}
						types={types}
						normalizedSearch={normalizedSearch}
						theThingYknow={false}
					/>

				</div>
			</main>
		</div>
	);
}

function ModelList({models, favoriteModels, onClick, selectedModel, types, filterType, filterCategory, normalizedSearch, theThingYknow}) {

	return (
		<div className={`${theThingYknow
			? 'overflow-y max-h-[42vh] overflow-scroll grid-cols-[repeat(auto-fit,minmax(50px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]'
			: 'grid-cols-[repeat(auto-fit,minmax(100px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'
			}
			grid
			gap-5`}
		>
			{models.map((model, index) => 
				(!normalizedSearch ||
                                	model.name
                                       		.toUpperCase()
                                        	.normalize("NFD")
                                       		.replace(/[\u0300-\u036f]/g, "")
                                        	.includes(normalizedSearch)
				) && (!filterType ||
					filterType == types[model.type]
				) && (!filterCategory ||
					model.categories.find((category) => category == filterCategory)
				) && (<Model
					key={index}
					model={model}
					onClick={onClick}
					isSelected={index == selectedModel ? true : false}
					isFavorited={favoriteModels != null
						? favoriteModels.find((fModel) => fModel == index) ? true : false
						: false
					}
					index={index}
				/>)
			)}
		</div>
	);
}

function Model({model, onClick, isSelected, isFavorited, index}) {

	return (
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
				{model.name}
			</h2>
			<img
				className='m-auto py-10 px-4'
				src={model.thumbnail_url}
				alt="loading.."
			/>
			<div className="absolute top-1 left-1">
				{isFavorited
					? <p className="font-bold text-xl">♥️</p>
					: null
				}
			</div>
		</div>
	);
}

function ModelDetails({models, index, onClose, onFavorite, onDownload}) {

	const model = models[index];

	return (
		<div className="sticky top-2 md:top-5 lg:top-10 z-10 bg-(--color-1) rounded-xl p-2 md:p-5 lg:p-10 border-1 border-(--color3)">
			<div className="flex justify-between pb-4">
				<div className="flex gap-2">
					<button
						className="hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-300 ease-in-out transition-all px-4 py-2 bg-(--color1) rounded-lg cursor-pointer"
                        			onClick={(e) => {
							e.stopPropagation();
							onFavorite(index);
						}}
					>
					<span className="text-blue-300">♥</span> Favorite
					</button>

					<button
						className="hover:bg-(--color2) active:bg-(--color3) active:scale-110 duration-300 ease-in-out transition-all px-4 py-2 bg-(--color1) rounded-lg cursor-pointer"
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
					<h1 className='font-bold text-3xl'>{model.name}</h1>
					<div className="w-[50%] lg:w-full">
						<img
							src={model.thumbnail_url}
							className="py-10 max-w-full h-auto mx-auto"
						/>
					</div>
					<div>
						<h2 className="font-bold text-lg pb-2">Description</h2>
						<p>{model.description}</p>
					</div>
				</div>
				<div className="pl-8">
					<div className="pb-2 border-b">
						<h2 className="font-bold text-lg pb-2">Authors</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							<div className="flex flex-col">
								{Object.keys(model.authors).map((author, index) => 
								<p key={index}>{author}: </p>)}
							</div>
							<div className="flex flex-col">
								{Object.values(model.authors).map((work, index) => 
								<p key={index}>{work}</p>)}
							</div>
						</div>

					</div>
					<div className="pb-2 pt-5 border-b">
						<h2 className="font-bold text-lg pb-2">Date published</h2>
						<div className="flex">
							<p>{Date(model.date_published * 1000)}</p>
						</div>
					</div>
					<div className="pb-2 pt-5 border-b">
						<h2 className="font-bold text-lg pb-2">Categories</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{model.categories.map((category, index) =>
							<p key={index}>{category},</p>)}
						</div>
					</div>
					<div className="pb-2 pt-5 border-b">
						<h2 className="font-bold text-lg pb-2">Tags</h2>
						<div className="flex flex-wrap gap-x-2 gap-y-1">
							{model.tags.map((tag, index)=>
							<p key={index}>{tag},</p>)}
						</div>
					</div>

				</div>
			</div>

		</div>
	);
}
