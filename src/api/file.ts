// 文件上传
import request from '@/api/request';
import api from './api';

export function fileUpload(formData: any) {
	return request({
		url: api.fileUploadUrl,
		method: 'POST',
		transformRequest: [
			function (data) {
				// 去除post请求默认的Content-Type
				// delete headers.post['Content-Type']
				return data;
			},
		],
		data: formData,
	});
}
