/***********************************************************/
/* Esee componente representa o cartão de exibição de um   */
/* cada card de cada anuncio criado pelo usuario           */
/* É o principal ponto de interação para navegação (clique */
/* no card) e para a ação de adição ao carrinho (botão +). */
/***********************************************************/

<template>
    <RouterLink :to="`/product/${product.id}`" class="product-card-link">
        <div class="product-card">
            <div class="card-header">
                <h3 class="product-name">{{ product.name }}</h3>
            </div>

            <button @click.prevent.stop="handleAddToCart" class="add-to-cart-button">
                <span class="icon">+</span>
            </button>
            
            <div class="card-image">
                <img :src="product.imageUrl || 'placeholder.jpg'" :alt="product.name" />
            </div>
            
            <div class="card-details">
                <span class="product-category">{{ product.category }}</span>
                <span class="product-price">{{ formatCurrency(product.price) }}</span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product.ts';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

/***********************************************************/
/* Inicializa o Store do Carrinho.                         */
/***********************************************************/
const cartStore = useCartStore();

const props = defineProps<{
    product: Product;
}>();

/*************************************************************/
/* Formata o valor numérico para o padrão de moeda BRL (R$). */
/*************************************************************/
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
};

const handleAddToCart = () => {
    cartStore.addToCart(props.product);
}
</script>

<style scoped>
.product-card-link { 
    text-decoration: none; 
    color: inherit; 
    display: block; 
    height: 100%; 
}

.product-card { 
    position: relative;
    background-color: #fff; 
    border-radius: 18px; 
    border: 1px solid rgba(31, 111, 181, 0.08);
    box-shadow: 0 15px 30px rgba(27, 61, 104, 0.08); 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    transition: transform 0.25s ease, box-shadow 0.25s ease; 
    height: 100%; 
}

.product-card:hover { 
    transform: translateY(-10px); 
    box-shadow: 0 25px 45px rgba(27, 61, 104, 0.18); 
    cursor: pointer;
}

.card-header {
    padding: 20px 22px 0;
    display: flex;
    align-items: center;
    min-height: 72px;
}

.product-name { 
    font-size: 1.2em; 
    font-weight: 700; 
    margin: 0; 
    color: #142239; 
    line-height: 1.3;
}

.add-to-cart-button {
    position: absolute;
    top: 18px;
    right: 10px;
    background-color: #ec5711; 
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    z-index: 10;
    transition: background-color 0.2s;
}

.add-to-cart-button:hover {
    background-color: #d64a0e;
}

.icon { 
    line-height: 1; 
}

.card-image { 
    width: 100%; 
    height: 190px; 
    overflow: hidden; 
    background: linear-gradient(135deg, rgba(31,111,181,0.08), rgba(236,87,17,0.06)); 
}

.card-image img { 
    width: 100%; 
    height: 100%; 
    object-fit: contain; 
}

.card-details { 
    padding: 16px 22px 24px; 
    display: flex; 
    flex-direction: column; 
    flex-grow: 1; 
    gap: 12px;
}

.product-category {
    display: inline-flex;
    align-self: flex-start;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(31, 111, 181, 0.1);
    color: #1f6fb5;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.product-price { 
    font-size: 1.35em; 
    font-weight: 700; 
    color: #ec5711; 
    margin-bottom: 0; 
}
</style>