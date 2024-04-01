import { defineStore } from 'pinia';
import { confirmPassword, getUserInfo, login as userLogin, LoginData, logout as userLogout, setUserInfo } from '@/api/user';
import { clearToken, setToken } from '@/utils/auth';
import { UserState } from './types';
import { MessageError, MessageSuccess, MessageWarning } from '@/utils/message';
import { ResetPasswordData } from '@/type/form';

const useUserStore = defineStore('user', {
	state: (): UserState => ({
		alias: undefined,
		avatar: undefined,
		id: undefined,
		mail: undefined,
		name: undefined,
		introduction: undefined,
		mobile: undefined,
		email: undefined,
		// uid: undefined,
		// role: '',
	}),

	getters: {
		userInfo(state: UserState): UserState {
			return { ...state };
		},
	},

	actions: {
		// Set user's information
		setInfo(partial: Partial<UserState>) {
			this.$patch(partial);
		},

		// Reset user's information
		resetInfo() {
			this.$reset(); // 重置 pinia 状态
		},

		// Get user's information
		async info() {
			try {
				const res = await getUserInfo();
				this.setInfo(res.data);
			} catch (err) {
				MessageWarning('登陆过期，请重新登录');
			}
		},

		// Login
		async login(loginForm: LoginData) {
			try {
				const res = await userLogin(loginForm);
				setToken(res.data.access_token);
				await this.info();
			} catch (err) {
				clearToken();
				throw err;
			}
		},
		logoutCallBack() {
			this.resetInfo();
			clearToken();
		},
		async updateInfo() {
			const infoForm: any | UserState = {
				id: this.id,
				name: this.name,
				introduction: this.introduction,
				mobile: this.mobile,
				email: this.email,
				avatar: this.avatar,
			};
			const res = await setUserInfo(infoForm);
			this.$patch(res.data);
		},

		// Logout
		async logout() {
			try {
				await userLogout();
				this.resetInfo();
				setToken('');
			} finally {
				this.logoutCallBack();
			}
		},
		async resetPassword(resetPasswordForm: { oldPassword: string; newPassword: string }) {
			const form: ResetPasswordData = {
				newPassword: resetPasswordForm.newPassword,
				oldPassword: resetPasswordForm.oldPassword,
				id: this.id,
			};
			try {
				await confirmPassword(form);
				MessageSuccess({
					content: '修改成功',
				});
			} catch (err) {
				MessageError({ content: '修改失败' });
			}
		},
	},
});

export default useUserStore;
