/**
 * @FileNAme src\api\api.ts
 * @author 周万宁
 * @create 2023/7/20-0:28
 * @version
 * @description 用于设置请求的api地址
 */

export default {
	loginUrl: '',
	//免费七天天气接口,不传参数默认根据ip返回当前城市天气
	weatherSevenDay: 'https://www.yiketianqi.com/free/week?unescape=1&appid=65142175&appsecret=U70OoTHF',
	// 一言接口
	oneWord: 'https://v1.hitokoto.cn',
	// 文件上上传接口
	fileUploadUrl: 'http://127.0.0.1:8000/file',
};
