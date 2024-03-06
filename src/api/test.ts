import request from '@/api/request';

export function testCors() {
	return request({
		url: 'http://127.0.0.1:8000',
	});
}