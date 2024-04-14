type Option = {
	value: string | number | object | boolean;
	label: string;
	disabled?: boolean; // 是否禁用
};

export interface CompConfigMsg {
	type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'color' | 'switch'; // 类型
	value: any; // 值
	label: string; // 显示
	options?: Option[]; // 下拉选项
	placeholder?: string; // 输入框提示
}
