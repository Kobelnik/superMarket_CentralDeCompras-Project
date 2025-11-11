<template>
    <header class="app-header">
        <div class="logo-area">
            <RouterLink to="/">
                <img src="/LogoMarketplace.svg" alt="Logo do Marketplace" class="header-logo"> 
            </RouterLink>
        </div>

        <nav class="nav-actions">
            <button @click="goToCreateProduct" class="create-button" v-if="route.path !== '/create-product'">
                Criar Anúncio
            </button>
            
            <RouterLink to="/cart" class="cart-link">
                <span class="cart-icon">🛒</span>
                <span v-if="cartStore.itemCount > 0" class="cart-count">{{ cartStore.itemCount }}</span>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart'; 

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

function goToCreateProduct() {
    router.push('/create-product');
}
</script>

<style scoped>
.app-header { 
    background-color: #29abe2; 
    padding: 10px 40px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.logo-area { 
    display: flex; 
    align-items: center; 
}

.header-logo { 
    height: 60px; 
    display: block; 
}

.nav-actions { 
    display: flex; 
    align-items: center; 
    gap: 20px; 
}

.create-button { 
    background-color: #ec5711; 
    color: white; 
    border: none; 
    padding: 8px 15px; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; 
    transition: background-color 0.2s; 
}

.create-button:hover { 
    background-color: #c23c13; 
}

.cart-link {
    position: relative;
    padding: 0 5px; 
    font-size: 1.5em; 
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
}

.cart-count {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: #ec5711;
    color: white;
    font-size: 0.5em;
    font-weight: bold;
    border-radius: 50%;
    padding: 4px 6px;
    line-height: 1;
}
</style>