import tools from '@/views/HomePage/UtilsTools/toolsConfig';

const wqHas = {
	/**
	 * 用于判断 utilId是否存在
	 * @param utilId
	 */
	haseUtilId(utilId: string): boolean {
		const item = tools.find((item) => item.id === utilId);
		return !!item;
	},
};

export default wqHas;
