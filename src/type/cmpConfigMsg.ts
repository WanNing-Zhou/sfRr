interface CompConfigMsg {
	type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'color';
	value: any;
	data: any;
}
