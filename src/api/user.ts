import request from './request';
import { UserState } from '@/store/modules/user/types';
import { ResetPasswordData } from '@/type/form';

export interface LoginData {
	email: string;
	password: string;
}

export function login(data: LoginData) {
	return request({
		url: 'api/auth/login',
		method: 'post',
		data,
	});
}

export function logout() {
	return request({
		url: 'api/auth/logout',
		method: 'post',
	});
}

export function register(form: { name: string; password: string; email: string; auth?: number }) {
	form.auth = 2;
	return request({
		url: 'api/auth/register',
		method: 'post',
		data: form,
	});
}

export function getUserInfo() {
	return request({
		url: 'api/auth/info',
		method: 'get',
	});
}

// 设置用户细心
export function setUserInfo(form: UserState) {
	return request.post<UserState>('/api/auth/info', form);
}

export function confirmPassword(from: ResetPasswordData) {
	return request.post<UserState>('/api/auth/password', from);
}
