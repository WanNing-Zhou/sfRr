import { AnyObject } from '@/type/global';

export function getCurrentUrl() {
	return window.location.href;
}

export function addQueryToUrl(url: URL | string, queryParams: AnyObject | any) {
	const query: string[] = [];

	console.log(queryParams, 'queryParams');
	for (const key in queryParams) {
		query.push(`${key}=${queryParams[key]}`);
	}

	console.log('query', query);

	const reqQuery = query.join('&');
	return url + '?' + reqQuery;
}

/**
 * 解析url中的query参数
 * @param url
 */
export function parseQuery(url: string): AnyObject {
	if (!url) {
		return {};
	}
	const query = url.split('?')[1];
	if(!query){
		return {}
	}
	const params = query.split('&');
	console.log(params, 'params');
	const queryObject: AnyObject = {};

	params.forEach((param: string) => {
		const [key, value] = param.split('=');
		queryObject[decodeURIComponent(key)] = decodeURIComponent(value);
	});

	return queryObject;
}

//  判断是否是页面
export function isPage(): string {
	const url = getCurrentUrl();
	// console.log('url:', url);
	const query = parseQuery(url);
	// console.log(query);
	if (query['page']) {
		return query['page'];
	}
	return '';
}
