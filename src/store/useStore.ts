import useUserStore from './modules/user';
import usePageVisibleStore from './modules/pageVisible/index';

const useStore = () => ({
	user: useUserStore(),
	pageVisible: usePageVisibleStore(),
});

export default useStore;
