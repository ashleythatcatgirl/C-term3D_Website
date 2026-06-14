
import { api } from "../lib/api.js";
import { useCallback, useEffect, useState } from "react";

const types = [
	"models", "hdris", "textures"
];

export function useCategories(fetchOnMount = true) {
	const [categories, setCategories] = useState({});
	const [isLoadingCategories, setIsLoadingCategories] = useState(false);

	const fetchCategories = useCallback(async () => {
		setIsLoadingCategories(true);
		try {
			const newCategories = {};

			for (let t = 0; t < 3; t++) {
				const data = await api(`/categories/${types[t]}`);
				const category = Object.keys(data);

				newCategories[types[t]] = category;
			}

			setCategories(newCategories);
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
    	};
}

