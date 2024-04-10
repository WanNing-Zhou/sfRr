export enum MsgOption {
	F_GET_CONFIG = 'fGetConfig',
	F_SET_CONFIG = 'fSetConfig',
	F_EDIT_CONFIG = 'fEditConfig',


	// 获取当前组件唯一标识
	FETCH_NAME = 'FetchName',
	POST_NAME = 'PostName',

	// 获取编辑设置
	FETCH_EDIT_CONFIG = 'FetchEditConfig', // 请求编辑设置
	POST_EDIT_CONFIG = 'PostEditConfig', // 发送编辑设置

	FETCH_EDIT_DEF_CONFIG = 'FetchEditDefConfig', // 获取默认编辑设置
	POST_EDIT_DEF_CONFIG = 'PostEditDefConfig', // 发送默认编辑设置

	CONFIRM_EDIT_CONFIG = 'ConfirmEditConfig', // 提交编辑设置
	SAVE_CONFIG = 'SaveEditConfig', // 保存设置


	// 获取配置
	FETCH_CONFIG = 'FetchConfig',
	POST_CONFIG = 'PostConfig',


	// ... other message types
}
