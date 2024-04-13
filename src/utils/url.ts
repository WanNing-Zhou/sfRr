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


// 将地址格式化为 http://xxx.com

export function isCompUrl(url: string){
	if (!url.match(/^https?:\/\//) && !url.match(/http?:\/\//)) {
		// 如果不包含，则添加 'http://'
		// url = 'http://' + url;
		return false
	}
	return true

	return url.match(/^https?:\/\//) || url.match(/http?:\/\//)
}

export function formatURL(url: string) {
	// 判断网址是否包含 'http://' 或 'https://'
	if (!url.match(/^https?:\/\//) && !url.match(/http?:\/\//)) {
		// 如果不包含，则添加 'http://'
		url = 'http://' + url;
	}
	return url;
}