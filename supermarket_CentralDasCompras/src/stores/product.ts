import { defineStore } from 'pinia';
import type { Product } from '../types/Product.ts';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
    }),
    
    actions: {
        addProduct(productToAdd: Product) {
            this.products.push(productToAdd);
        },

        fetchProducts() {
            return this.products;
        },
    },
});