import { defineStore } from 'pinia';
import type { Product } from '../types/Product.ts';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
    }),
    
    actions: {
        addProduct(product: Product) {
            this.products.push(product);
        },
    },
});