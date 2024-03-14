export function deepClone<T>(param: T): T {
	return structuredClone(param);
}

export function deepCloneByJson<T>(param: T): T {
	return JSON.parse(JSON.stringify(param));
}
