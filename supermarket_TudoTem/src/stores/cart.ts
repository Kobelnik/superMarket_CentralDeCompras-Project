import { defineStore } from 'pinia';
import type { Product } from '../types/Product';

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    isSelected: boolean;
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
    }),
    
    getters: {
        cartTotal(state): number {
            return state.items.reduce((total, item) => {
                if (item.isSelected) {
                    return total + (item.product.price * item.quantity);
                }
                return total;
            }, 0);
        },
        
        itemCount(state): number {
            return state.items.reduce((count, item) => count + item.quantity, 0);
        }
    },
    
    actions: {
        addToCart(productToAdd: Product) {
            const existingItem = this.items.find(item => item.id === productToAdd.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: productToAdd.id,
                    product: productToAdd,
                    quantity: 1,
                    isSelected: true,
                });
            }
        },

        incrementQuantity(itemId: number) {
            const item = this.items.find(i => i.id === itemId);
            if (item) {
                item.quantity += 1;
            }
        },

        decrementQuantity(itemId: number) {
            const itemIndex = this.items.findIndex(i => i.id === itemId);
            if (itemIndex !== -1) {
                if (this.items[itemIndex].quantity > 1) {
                    this.items[itemIndex].quantity -= 1;
                } else {
                    this.items.splice(itemIndex, 1);
                }
            }
        },

        toggleItemSelected(itemId: number) {
            const item = this.items.find(i => i.id === itemId);
            if (item) {
                item.isSelected = !item.isSelected;
            }
        },

        removeItem(itemId: number) {
            this.items = this.items.filter(item => item.id !== itemId);
        },
    },
});