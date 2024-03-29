/*
import axios, { AxiosRequestConfig } from 'axios';

declare module 'axios' {
	interface AxiosResponse<T = any> {
		code: number;
		data: T;
		message: any;
	}
	export function create(config?: AxiosRequestConfig): AxiosInstance;
}

const request = (options: AxiosRequestConfig) => {
	// create an axios instance
	const service = axios.create({
		// withCredentials: true, // send cookies when cross-domain requests
		timeout: 5000, // request timeout
		withCredentials: true,
		baseURL: import.meta.env.VITE_BASE_URL,
		// baseURL??
	});

	// 请求拦截
	service.interceptors.request.use(
		(config) => {
			// do something before request is sent

			// 在请求前设置token
			/!*        if (getToken() && config.headers) {
          // let each request carry token
          // please modify it according to the actual situation
          config.headers.Authorization = `Bearer ${getToken()}`;
        }*!/
			return config;
		},
		(error) => {
			// do something with request error
			console.log(error); // for debug
			return Promise.reject(error);
		}
	);

	// 响应
	service.interceptors.response.use(
		(response) => {
			const res = response.data;

			// if the custom code is not 20000, it is judged as an error.
			/!*			if (res.code !== 0) {
				console.log('response', response);
				// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
				if (res.code === 401 || res.code === 50012 || res.code === 50014) {
					console.log('授权失败');
				}

				return Promise.reject(new Error(res.message || 'Error'));
			}*!/

			return res;
		},
		(error) => {
			console.log(`err: ${error}`); // for debug
			return Promise.reject(error);
		}
	);

	return service(options);
};

export default request;
*/
// api.js
import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.example.com', // 设置基本的 API URL
	timeout: 5000, // 设置请求超时时间
	headers: { 'Content-Type': 'application/json' } // 设置默认的请求头
});

// 自定义请求拦截器
instance.interceptors.request.use(
	config => {
		// 在请求发送之前可以进行一些处理，例如添加 token 等
		return config;
	},
	error => {
		// 处理请求错误
		return Promise.reject(error);
	}
);

// 自定义响应拦截器
instance.interceptors.response.use(
	response => {
		// 在接收到响应数据之前可以进行一些处理，例如处理错误状态码等
		return response;
	},
	error => {
		// 处理响应错误
		return Promise.reject(error);
	}
);

export default instance;
