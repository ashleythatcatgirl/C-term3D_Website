
import { api } from "/lib/api";
import { useCallback, useEffect, useState } from "react";

export function useCategories(fetchOnMount = true) {
	const [categories, setCategories] = useState([]);
	const [isLoadingCategories, setIsLoadingCategories] = useState(false);

	const fetchCategories = useCallback(async () => {
		setIsLoadingCategories(true);
		try {
			const data = await api('/categories');
			setCategories(Object.keys(data));
		} catch {
			// Error handling is managed by the api wrapper
		} finally {
			setIsLoadingCategories(false);
		}
	}, []);

	useEffect(() => {
		if (fetchOnMount) {
			fetchCategories();
		}
	}, [fetchOnMount, fetchCategories]);

	return {
       		categories,
	        isLoadingCategories,
        	refetchCategories: fetchCategories,
    	};
}

