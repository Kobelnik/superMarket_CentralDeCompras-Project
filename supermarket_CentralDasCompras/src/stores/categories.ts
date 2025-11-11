import { defineStore } from 'pinia';
import { defaultCategories } from '../constants/categories';

export const useCategoriesStore = defineStore('categories', {
	state: () => ({
		categories: [...defaultCategories] as string[],
	}),
	getters: {
		allCategories(state): string[] {
			return state.categories;
		},
	},
	actions: {
		addCategory(newCategory: string) {
			const normalized = newCategory.trim();
			if (!normalized) return;
			if (!this.categories.includes(normalized)) {
				this.categories.push(normalized);
			}
		},
		removeCategory(categoryToRemove: string) {
			this.categories = this.categories.filter(c => c !== categoryToRemove);
		},
		resetToDefaults() {
			this.categories = [...defaultCategories];
		}
	}
});




