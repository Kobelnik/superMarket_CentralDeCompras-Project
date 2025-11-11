import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filters', {
	state: () => ({
		searchText: '',
	}),
	actions: {
		setSearchText(value: string) {
			this.searchText = value;
		},
		reset() {
			this.searchText = '';
		}
	},
});




