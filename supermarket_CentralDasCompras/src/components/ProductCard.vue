<template>
    <RouterLink :to="`/product/${product.id}`" class="product-card-link">
        <div class="product-card">
            
            <button @click.prevent.stop="handleAddToCart" class="add-to-cart-button">
                <span class="icon">+</span>
            </button>
            
            <div class="card-image">
                <img :src="product.imageUrl || 'placeholder.jpg'" :alt="product.name" />
            </div>
            
            <div class="card-details">
                <h3 class="product-name">{{ product.name }}</h3>

                <span class="product-price">{{ formatCurrency(product.price) }}</span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product.ts';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();

const props = defineProps<{
    product: Product;
}>();

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
    border-radius: 8px; 
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    transition: transform 0.2s; 
    height: 100%; 
}

.product-card:hover { 
    transform: translateY(-5px); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); 
    cursor: pointer;
}

.add-to-cart-button {
    position: absolute;
    top: 10px;
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
    height: 180px; 
    overflow: hidden; 
    background-color: #f0f0f0; 
}

.card-image img { 
    width: 100%; 
    height: 100%; 
    object-fit: contain; 
}

.card-details { 
    padding: 15px; 
    display: flex; 
    flex-direction: column; 
    flex-grow: 1; 
}

.product-name { 
    font-size: 1.1em; 
    font-weight: 600; 
    margin: 0 0 5px 0; 
    color: #333; 
    flex-grow: 1; 
}

.product-price { 
    font-size: 1.3em; 
    font-weight: 700; 
    color: #333; 
    margin-bottom: 5px; 
}
</style>