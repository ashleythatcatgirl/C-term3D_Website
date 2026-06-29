import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function normalize(str) {
	const normalized = (
		str
		.toUpperCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
	);

	return normalized;
};

export function setLocalStorage(name, data) {
	localStorage.setItem(name, JSON.stringify(data));
};

export function setSessionStorage(name, data) {
	sessionStorage.setItem(name, JSON.stringify(data));
};

export function checkAsset(
	asset, index, types, filterType, filterCategory, normalizedSearch, limit
) {

	return (
		(!normalizedSearch || normalize(asset.name).includes(normalizedSearch))
		&& (!filterType || filterType == types[asset.type])
		&& (!filterCategory || asset.categories.find((category) => category == filterCategory))
		&& (index < limit)
	);
}
