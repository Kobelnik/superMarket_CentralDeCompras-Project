<template>
    <div v-if="product" class="product-detail-page">
        <button @click="router.push('/')" class="back-button">← Voltar</button>
        
        <div class="content-wrapper">
            
            <div class="image-section">
                <img :src="product.imageUrl || 'placeholder.jpg'" :alt="product.name" class="main-image">
                
                <div class="description-box">
                    <p class="product-description">{{ product.description }}</p>
                </div>
            </div>

            <div class="purchase-section">
                
                <h2 class="product-name-purchase">{{ product.name }}</h2>

                <div class="details-section">
                    <p><strong>Categoria:</strong> {{ product.category }}</p>
                    <p><strong>Quantidade em Estoque:</strong> {{ product.quantity }} un.</p>
                </div>
                <hr class="detail-separator">

                <p class="current-price">{{ formatCurrency(product.price) }}</p>
                
                <div class="action-buttons">
                    <button class="buy-button">Comprar agora</button>
                    <button @click="handleAddToCart" class="cart-button">Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="loading-state">
        <p>Carregando ou produto não encontrado...</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart'; // 🔑 NOVO: Importa o Store do Carrinho
import type { Product } from '../types/Product.ts';

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore(); // 🔑 NOVO: Inicializa o Store do Carrinho

const product = ref<Product | null>(null);

onMounted(() => {
    const productId = route.params.id as string;
    const idAsNumber = parseInt(productId);

    const foundProduct = productStore.products.find(p => p.id === idAsNumber);

    if (foundProduct) {
        product.value = foundProduct;
    }
});

// 🔑 NOVA FUNÇÃO: Adiciona o produto ao carrinho e atualiza o indicador
const handleAddToCart = () => {
    if (product.value) {
        cartStore.addToCart(product.value);
        
        // 🗑️ REMOVIDO: O alert que você não queria mais.
        // alert(`"${product.value.name}" adicionado ao carrinho! Quantidade atual: ${cartStore.itemCount}`);
    }
}
const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
};
</script>

<style scoped>
.product-detail-page {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.back-button {
    background-color: transparent;
    border: 1px solid #ec5711;
    width: 120px;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.2s;
}

.back-button:hover {
    background-color: #eeeded;
}

.back-button:active {
    background-color: #e0e0e0;
}

.content-wrapper {
    display: flex;
    gap: 40px; 
}

/* --- Coluna Esquerda: Imagem e Descrição --- */
.image-section {
    flex: 2; 
}

.main-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 6px;
    margin-bottom: 20px;
}

.description-box {
    background-color: #f5f5f5;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 20px;
    margin-top: 30px;
    max-height: 300px; 
    overflow-y: auto; 
    overflow-x: hidden;
}

.product-description {
    font-size: 1em;
    color: #555;
    line-height: 1.6;
    margin: 0; 
    word-wrap: break-word; 
    overflow-wrap: break-word; 
}

/* --- Coluna Direita: Compra e Preço --- */
.purchase-section {
    flex: 1; 
    padding: 20px;
    border-left: 1px solid #eee;
}

.product-name-purchase {
    font-size: 2em;
    font-weight: 700;
    color: #1d1d1d;
    margin-top: 0;
    margin-bottom: 20px;
}

.detail-separator {
    border: none;
    height: 1px;
    background-color: #eee;
    margin: 20px 0;
}

.details-section p {
    margin: 5px 0;
    font-size: 0.95em;
    color: #666;
}

.current-price {
    font-size: 2.5em;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
}

.action-buttons button {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s, opacity 0.2s;
}

.buy-button {
    background-color: #ec5711; 
    color: white;
    border: none;
    height: 50px;
}

.cart-button {
    margin-top: 5px;
    height: 50px;
    background-color: white;
    color: #ec5711;
    border: 1px solid #ec5711;
}

.buy-button:hover {
    background-color: #d64a0e;
}

.buy-button:active {
    background-color: #b83a08;
}

.cart-button:hover {
    background-color: #fff2f2;
}

.cart-button:active {
    background-color: #e2dede;
}
</style>