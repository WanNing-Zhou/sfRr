export interface OptionMsg {
	type: 0 | 1; // 0表示由系统发起, 1.表示由组件发起
	option: OptionMsg;
	data: any;
}
