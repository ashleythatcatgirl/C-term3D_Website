import { useEffect, useState } from "react";
import { Header } from "../components/Header.jsx";

export default function Home() {

	return (
		<div className='flex flex-col min-h-dvh min-w-dvw text-(--fg-normal) bg-(--bg-normal)'>
			<Header
				title="Home"
			/>
		</div>
	);
}

