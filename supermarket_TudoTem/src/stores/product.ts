import { defineStore } from 'pinia';
import type { Product } from '../types/Product.ts';

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [] as Product[],
    }),
    
    actions: {
        // Ação síncrona, salva apenas na memória.
        addProduct(productToAdd: Product) {
            this.products.push(productToAdd);
        },

        // Ação de busca síncrona (não faz nada, apenas retorna o array local)
        fetchProducts() {
            // Em projetos de memória, esta função apenas garante a existência.
            return this.products;
        },
    },
});