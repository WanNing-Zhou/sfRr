import useUserStore from './modules/user';
import usePageVisibleStore from './modules/pageVisible/index';
import useCompStore from './modules/comp/index';
import useConfigStore from '@/store/modules/appCofig';

const useStore = () => ({
	user: useUserStore(),
	pageVisible: usePageVisibleStore(),
	compData: useCompStore(),
	appConfig: useConfigStore(),
});

export default useStore;
