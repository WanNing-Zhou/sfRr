import useUserStore from './modules/user';
import usePageVisibleStore from './modules/pageVisible/index';
import useCompStore from './modules/comp';

const useStore = () => ({
	user: useUserStore(),
	pageVisible: usePageVisibleStore(),
	compData: useCompStore(),
});

export default useStore;
