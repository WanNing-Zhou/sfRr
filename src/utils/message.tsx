import { ElMessage } from 'element-plus';

/**
 * @description 文件过大提醒
 * @param size 文件最大size
 */
export const fileOverSize = (size: number | string | null = null) => {
	if (size) {
		ElMessage.warning(`上传文件大小不能超过${size}`);
	} else {
		ElMessage.warning('文件大小上传限制');
	}
};

/**
 * 成功消息
 * @param str
 * @constructor
 */
export const MessageSuccess = (str: any) => {
	ElMessage.success(str);
};

/**
 * 警告消息
 * @param str
 * @constructor
 */
export const MessageWarning = (str: any) => {
	ElMessage.warning(str);
};

/**
 * 严重消息
 * @param str
 * @constructor
 */
export const MessageError = (str: any) => {
	ElMessage.warning(str);
};
