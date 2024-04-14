import { ref } from 'vue';

// 是否为页面
const isPage = ref(false);
// 页面id
const pageID = ref('');
// pageData
const pageData = ref({
	comp: {},
	config: {} as any,
});

export default function usePage() {
	return {
		setIsPage(value: boolean) {
			isPage.value = value;
		},
		setPageID(value: string) {
			pageID.value = value;
		},
		setPageData(value: any) {
			pageData.value = value;
		},
		isPage, // ref对象
		pageID, // ref对象
		pageData,
	};
}
