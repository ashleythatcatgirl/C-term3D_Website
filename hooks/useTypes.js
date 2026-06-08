
import { api } from "/lib/api";
import { useCallback, useEffect, useState } from "react";

export function useTypes(fetchOnMount = true) {
	const [types, setTypes] = useState([]);
	const [isLoadingTypes, setIsLoadingTypes] = useState(false);

	const fetchTypes = useCallback(async () => {
		setIsLoadingTypes(true);
		try {
			const data = await api('/types');
			setTypes(Object.values(data));
		} catch {
			// Error handling is managed by the api wrapper
		} finally {
			setIsLoadingTypes(false);
		}
	});

	useEffect(() => {
		if (fetchOnMount) {
			fetchTypes();
		}
	}, [fetchOnMount, fetchTypes]);

	return {
       		types,
	        isLoadingTypes,
        	refetchTypes: fetchTypes,
    	};

}

