import request from '@/api/request';

export interface CreatePageForm {
	title: string;
	info: string;
	data?: any;
}
export function createPage(form: any) {
	return request({
		url: 'api/page/create',
		method: 'post',
		data: form,
	});
}

export function getPageList(param?: any) {
	return request({
		url: 'api/page/list',
		method: 'get',
	});
}

export function getPageInfo(id: string) {
	return request({
		url: 'api/page/info',
		method: 'get',
		params: {
			id,
		},
	});
}
