import { defineStore } from 'pinia';

const useDropStore = defineStore('dropStore', {
	state: () => ({
		moveItem: new Map<string, any>(),
	}),
	actions: {
		set(key: string, value: any) {
			this.moveItem.set(key, value);
		},
		get(key: string) {
			return this.moveItem.get(key);
		},
		remove(key: string) {
			this.moveItem.delete(key);
		},
	},
});

export default useDropStore;
