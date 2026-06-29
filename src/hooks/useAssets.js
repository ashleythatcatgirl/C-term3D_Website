
import { api } from "../lib/api.js";
import { useCallback, useEffect, useState } from "react";

export function useAssets(fetchOnMount = true) {
	const [assets, setAssets] = useState([]);
	const [isLoadingAssets, setIsLoadingAssets] = useState(false);

	const fetchAssets = useCallback(async () => {
		setIsLoadingAssets(true);
		try {
			const data = await api('/assets');
			setAssets(Object.values(data));
		} catch {
			// Error handling is managed by the api wrapper
		} finally {
			setIsLoadingAssets(false);
		}
	}, []);

	useEffect(() => {
		if (fetchOnMount) {
			fetchAssets();
		}
	}, [fetchOnMount, fetchAssets]);

	return {
       		assets,
	        isLoadingAssets,
    	};
}

