import axios from 'axios';
import { MessageWarning } from '@/utils/message';
import { getToken, setToken } from '@/utils/auth';

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL, // 设置基本的 API URL
	timeout: 5000, // 设置请求超时时间
	headers: { 'Content-Type': 'application/json' }, // 设置默认的请求头
});

// 自定义请求拦截器
instance.interceptors.request.use(
	(config) => {
		// 在请求发送之前可以进行一些处理，例如添加 token 等
		const token = getToken();
		// console.log('token', token)
		if (token) {
			// if (!config.headers) {
			// 	config.headers = {};
			// }

			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		// 处理请求错误
		return Promise.reject(error);
	}
);

// 自定义响应拦截器
instance.interceptors.response.use(
	(response) => {
		const token = response.headers?.Authorization || response.headers?.['new-token']; // 当请求头中返回token的时候进行token更新
		// console.log(response.headers);
		if (token) {
			// Set the token using the setToken function
			setToken(token);
		}
		// 在接收到响应数据之前可以进行一些处理，例如处理错误状态码等
		const resData = response.data;
		if (resData.code === 20000) {
			// console.log('请求成功', resData);
			return resData;
		} else {
			throw new Error(resData.message);
			return;
		}
	},
	(error) => {
		// 处理响应错误
		MessageWarning('请求错误呦');
		return Promise.reject(error);
	}
);

export default instance;
