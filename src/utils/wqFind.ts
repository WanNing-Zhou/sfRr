import tools from '@/views/HomePage/UtilsTools/toolsConfig';

const wqFind = {
	tools: {
		findToolById(utilId: string) {
			return tools.find((item) => item.id === utilId);
		},
	},
};

export default wqFind;
