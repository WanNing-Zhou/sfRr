// 修改密码
export type ResetPasswordData = {
	oldPassword: string;
	newPassword: string;
	id: string | undefined;
};
