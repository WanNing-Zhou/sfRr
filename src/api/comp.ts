import request from '@/api/request';

type GetCompListType = {
	page: number;
	pageSize: number;
	name: string;
};

export function getCompList(formData: GetCompListType) {
	return request({
		url: 'api/csm/comp/list',
		method: 'get',
		params: formData,
	});
}
