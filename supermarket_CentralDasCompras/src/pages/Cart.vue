<template>
    <div class="cart-page-container">
        <h1>Seu Carrinho de Compras</h1>
        
        <div v-if="cartStore.itemCount === 0" class="empty-cart">
            <p>Seu carrinho está vazio. Adicione alguns produtos para começar a somar!</p>
            <button @click="router.push('/')" class="continue-shopping">Continuar Comprando</button>
        </div>
        
        <div v-else>
            <div class="cart-category-nav">
                <button
                    v-for="category in categories"
                    :key="category"
                    :class="['category-pill', { active: isCategoryActive(category) }]"
                    @click="toggleCategoryFilter(category)"
                >
                    {{ category }}
                </button>
            </div>

            <div class="cart-content-wrapper">
            <div class="cart-list-section">
                <div
                    v-for="item in cartStore.items"
                    :key="item.id"
                    :class="['cart-item', { 'inactive-category': !isCategoryActive(item.product.category) }]"
                >
                    
                    <div class="item-details">
                        <img :src="item.product.imageUrl || 'placeholder.jpg'" :alt="item.product.name" class="item-image">
                        <div class="item-info">
                            <h3 class="item-name">{{ item.product.name }}</h3>
                            
                            <div class="quantity-control">
                                <button @click="cartStore.decrementQuantity(item.id)" class="qty-btn minus-btn">-</button>
                                <span class="item-quantity">{{ item.quantity }}</span>
                                <button @click="cartStore.incrementQuantity(item.id)" class="qty-btn plus-btn">+</button>
                                
                                <button @click="cartStore.removeItem(item.id)" class="remove-button">Remover</button>
                            </div>
                        </div>
                    </div>

                    <div class="item-actions">
                        <p class="item-subtotal">{{ formatCurrency(item.product.price * item.quantity) }}</p>
                        
                        <label class="checkbox-container">
                            <input 
                                type="checkbox" 
                                :checked="item.isSelected" 
                                @change="cartStore.toggleItemSelected(item.id)"
                            >
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="cart-summary-section">
                <h2>Resumo da Compra</h2>
                <div class="summary-line">
                    <span>Itens Selecionados ({{ selectedItemsCount }})</span>
                    <span>{{ formatCurrency(filteredCartTotal) }}</span>
                </div>
                
                <p class="total-label">Total a Pagar:</p>
                <p class="final-total">{{ formatCurrency(filteredCartTotal) }}</p>
                
                <button class="checkout-button">Finalizar Compra</button>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useCategoriesStore } from '../stores/categories';

const router = useRouter();
const cartStore = useCartStore();
const categoriesStore = useCategoriesStore();

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
};

const categories = computed(() => categoriesStore.allCategories);
const activeCategories = ref<string[]>([]);

function emitCategorySync(newSelection: string[]) {
    activeCategories.value = [...newSelection];
}

onMounted(() => {
    emitCategorySync(categories.value);
});

watch(
    () => categories.value,
    (newCategories, oldCategories = []) => {
        const currentSet = new Set(activeCategories.value);
        const preservedSelection = newCategories.filter(cat => currentSet.has(cat));
        const addedCategories = newCategories.filter(cat => !oldCategories.includes(cat));
        const nextSelection = [...preservedSelection, ...addedCategories.filter(cat => !preservedSelection.includes(cat))];
        emitCategorySync(nextSelection);
    },
    { immediate: false }
);

function isCategoryActive(category: string) {
    return activeCategories.value.includes(category);
}

function toggleCategoryFilter(category: string) {
    if (isCategoryActive(category)) {
        activeCategories.value = activeCategories.value.filter(cat => cat !== category);
    } else {
        activeCategories.value = [...activeCategories.value, category];
    }
}

const filteredCartTotal = computed(() => {
    return cartStore.items.reduce((total, item) => {
        if (item.isSelected && isCategoryActive(item.product.category)) {
            return total + item.product.price * item.quantity;
        }
        return total;
    }, 0);
});

const selectedItemsCount = computed(() => {
    return cartStore.items.filter(item => item.isSelected && isCategoryActive(item.product.category)).length;
});
</script>

<style scoped>
.cart-page-container { 
    max-width: 1200px; 
    margin: 40px auto; 
    padding: 20px; 
}

h1 { 
    font-size: 2em; 
    margin-bottom: 30px; 
    text-align: center; 
}

.cart-content-wrapper { 
    display: flex; 
    gap: 40px; 
    align-items: flex-start; 
    margin-top: 20px;
}

/* --- LADO ESQUERDO: LISTA --- */
.cart-list-section { 
    flex: 2; 
    background-color: #fff; 
    padding: 20px; 
    border-radius: 8px; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); 
}

.cart-item { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    border-bottom: 1px solid #eee; 
    padding: 15px 0; 
}

.cart-item:last-child { 
    border-bottom: none; 
}

.item-details { 
    display: flex; 
    align-items: center; 
    gap: 15px; 
}

.item-image { 
    width: 80px; 
    height: 80px; 
    object-fit: contain; 
    border-radius: 4px; 
}

.item-info { 
    display: flex; 
    flex-direction: column; 
}

.item-name { 
    font-size: 1.1em; 
    margin: 0 0 5px; 
    color: #333; 
}

.item-price { 
    color: #555; 
    font-size: 0.9em; 
    margin-bottom: 5px; 
}

.remove-button { 
    background: none; 
    border: none; 
    color: #ec5711; 
    font-size: 0.9em; 
    cursor: pointer; 
    padding: 0; 
    text-align: left; 
    margin-left: 20px;
}

.remove-button:hover { 
    text-decoration: underline; 
}

/* CONTROLE DE QUANTIDADE */
.quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 5px;
}

.qty-btn {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.2s;
}

.qty-btn:hover {
    background-color: #e0e0e0;
}

.item-quantity {
    display: inline-block;
    width: 20px;
    text-align: center;
    font-weight: 600;
}
/* FIM CONTROLE DE QUANTIDADE */

.item-actions { 
    display: flex; 
    align-items: center; 
    gap: 20px; 
}

.item-subtotal { 
    font-weight: bold; 
    color: #333; 
    width: 100px; 
    text-align: right; 
}

/* Estilo Checkbox */
.checkbox-container { 
    display: block; 
    position: relative; 
    padding-left: 30px; 
    cursor: pointer; 
    font-size: 22px; 
    user-select: none; 
}

.checkbox-container input { 
    position: absolute; 
    opacity: 0; 
    cursor: pointer; 
    height: 0; 
    width: 0; 
}

.checkmark { 
    position: absolute; 
    top: 0; 
    left: 0; 
    height: 20px; 
    width: 20px; 
    background-color: #eee; 
    border-radius: 4px; 
}

.checkbox-container input:checked ~ .checkmark { 
    background-color: #ec5711; 
}

.checkmark:after { 
    content: ""; 
    position: absolute; 
    display: none; 
}

.checkbox-container input:checked ~ .checkmark:after { 
    left: 7px; 
    top: 3px; 
    width: 5px; 
    height: 10px; 
    border: solid white; 
    border-width: 0 3px 3px 0; 
    transform: rotate(45deg); 
}

/* --- LADO DIREITO: RESUMO --- */
.cart-summary-section { 
    flex: 1; 
    background-color: #fff; 
    padding: 25px; 
    border-radius: 8px; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); 
    border: 1px solid #eee; 
    position: sticky; 
    top: 20px; 
}

.summary-line { 
    display: flex; 
    justify-content: space-between; 
    margin-bottom: 15px; 
    padding-bottom: 15px; 
    border-bottom: 1px solid #eee; 
    font-size: 1em; 
    color: #555; 
}

.total-label { 
    font-size: 1.1em; 
    font-weight: 600; 
    margin: 15px 0 5px; 
}

.final-total { 
    font-size: 2em; 
    font-weight: bold; 
    color: #ec5711; 
    margin-top: 0; 
}

.checkout-button { 
    width: 100%; 
    background-color: #00a650; 
    color: white; 
    border: none; 
    padding: 15px; 
    border-radius: 6px; 
    font-size: 1.1em; 
    font-weight: bold; 
    cursor: pointer; 
    transition: background-color 0.2s; 
    margin-top: 20px; 
}

.checkout-button:hover { 
    background-color: #008f45; 
}

.cart-category-nav {
    width: 100%;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    background: #fff;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-pill {
    padding: 10px 16px;
    border-radius: 999px;
    border: 1px solid rgba(236, 87, 17, 0.4);
    background: #fff;
    color: #ec5711;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.category-pill.active {
    background: linear-gradient(135deg, #ec5711 0%, #fca311 100%);
    color: #fff;
    border-color: transparent;
}

.category-pill:not(.active):hover {
    background: rgba(236, 87, 17, 0.1);
}

.cart-item.inactive-category {
    opacity: 0.4;
}

.empty-cart { 
    text-align: center; 
    padding: 50px; 
    background-color: #fff; 
    border-radius: 8px; 
    margin-top: 20px; 
}

.continue-shopping { 
    background-color: #3483fa; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    border-radius: 6px; 
    cursor: pointer; 
    margin-top: 15px; 
    transition: background-color 0.2s; 
}

.continue-shopping:hover { 
    background-color: #296fce; 
}
</style>