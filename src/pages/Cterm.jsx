import { useEffect, useState, useRef } from "react";
import { normalize, setLocalStorage, setSessionStorage, checkAsset } from "../lib/utils.js";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"

import { toast } from "sonner";
import { Header } from "../components/Header.jsx";
import { Title } from "../components/Title.jsx";
import { Renderer } from "../components/Renderer.jsx";
import { AssetList, Asset } from "../components/Assets.jsx";

import { useWindowDimensions } from "../hooks/useWindowDimensions.js";
import { useImgHeight } from "../hooks/useImgHeight.js";
import { useAssets } from "../hooks/useAssets.js";

export default function Cterm() {
	const { width: windowWidth, height: windowHeight} = useWindowDimensions();
	const { imgRef, imgHeight } = useImgHeight();

	const initFavorites = JSON.parse(localStorage.getItem('favoriteAssets'));
	const initDownloads = JSON.parse(sessionStorage.getItem('downloadedAssets'));
	const [favoriteAssets, setFavoriteAssets] = useState(initFavorites ? initFavorites : []);
	const [downloadedAssets, setDownloadedAssets] = useState(initDownloads ? initDownloads : []);

	const [isRendererOpen, setIsRendererOpen] = useState();

	const handleDeleteAsset = (asset) => {
		//TODO: Fix clicking on model, deleting all models with the same name
		// probably gonna use an index tbh
		const newDownloads = downloadedAssets.filter((dAsset) => dAsset.name != asset.name);

		toast.info("Deleted asset");

		setDownloadedAssets(newDownloads);
		setSessionStorage("downloadedAssets", newDownloads);
	}

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-sm text-(--fg) bg-(--bg)'>
			<Header
				title="Cterm3D"
			/>
			<main className='flex flex-col px-[20px] md:px-[90px] xl:px-[170px]'>
				<div className='flex flex-col xl:flex-row px-[20px] md:px-[60px] xl:px-[100px] py-[20px] gap-[20px] rounded-xl'>
					<div className="flex flex-col min-w-[61%]">
						{/* C-term thing */}
						<Title
							title="Renderer"
							classNameDiv="border-b-2 mb-[20px] pl-[20px] md:pl-[60px] xl:pl-[100px]"
						/>
						<Renderer
							imgRef={imgRef}
							isOpen={isRendererOpen}
							onClick={setIsRendererOpen}
						/>
					</div>
					<div
						className={`flex flex-col w-full`}
						style={{ maxHeight: windowWidth >= 1024 ? imgHeight : undefined}}
					>
						<Title
							title="Downloaded Assets"
							classNameTitle="text-right"
							classNameDiv="border-b-2 mb-[20px] pr-[20px] md:pr-[60px] xl:pr-[100px]"
						/>
						{downloadedAssets.length
							? <AssetList
								assets={downloadedAssets}
								theThingYknow={true}
								onClick={handleDeleteAsset}
								isLoading={false}
								limit={1000}
							/>
							: <div className="flex flex-col gap-1 items-center py-2 md:py-4">
								<h1 className="text-(--fg)/75 text-md">no downloaded assets..</h1>
								<h1 className="text-(--fg)/75 text-md">get some in the <a href="/library" className="text-(--accent3)">library</a></h1>
							</div>
						}
					</div>
				</div>
			</main>
		</div>
	);
}
			
