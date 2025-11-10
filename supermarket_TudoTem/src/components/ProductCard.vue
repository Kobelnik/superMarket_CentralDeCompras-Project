<template>
    <div class="product-card">
        <div class="card-image">
            <img :src="product.imageUrl || 'placeholder.jpg'" :alt="product.name" />
        </div>
        
        <div class="card-details">
            <h3 class="product-name">{{ product.name }}</h3>

            <p class="product-description">{{ product.description.substring(0, 50) + '...' }}</p>

            <span class="product-price">{{ formatCurrency(product.price) }}</span>

            <button class="buy-button">Ir para o anúncio</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product.ts';

defineProps<{
    product: Product;
}>();

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
};
</script>

<style scoped>
.product-card { 
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
}

.product-description { 
    font-size: 0.9em; 
    color: #777; 
    margin-bottom: 10px; 
    flex-grow: 1; 
}

.product-price { 
    font-size: 1.3em; 
    font-weight: 700; 
    color: #333; 
    margin-bottom: 15px; 
}

.buy-button { 
    background-color: #007bff; 
    color: white; 
    border: none; 
    padding: 8px 10px; 
    border-radius: 4px; 
    cursor: pointer; 
    font-weight: 500; 
    transition: background-color 0.2s; 
    text-align: center; 
}

.buy-button:hover { 
    background-color: #0056b3; 
}
</style>