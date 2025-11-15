/***********************************************************/
/* FUNÇÃO DA PÁGINA */
/***********************************************************/
/* Este componente representa o cabeçalho de navegação.    */
/* Ele é responsável por: 1) Exibir o logo para navegação  */
/* para a Home. 2) Fornecer o campo de pesquisa (Busca).   */
/* 3) Gerenciar botões de ação (Criar Anúncio/Carrinho)    */
/* com lógica condicional baseada na rota atual.           */
/***********************************************************/
<template>
    <header class="app-header">
        <div class="logo-area">
            <RouterLink to="/">
                <img src="/LogoMarketplace.svg" alt="Logo do Marketplace" class="header-logo"> 
            </RouterLink>
        </div>

        <div v-if="!isCreateProductPage" class="search-area">
            <input
                v-model="filterStore.searchText"
                type="text"
                class="search-input"
                placeholder="Pesquisar anúncios pelo título..."
            />
        </div>

        <nav class="nav-actions">
            <div class="action-group" :class="{ single: isCreateProductPage }">
                <button 
                    v-if="!isCreateProductPage" 
                    @click="goToCreateProduct" 
                    class="action-button create-button"
                >
                    Criar Anúncio
                </button>
                
                <button 
                    class="action-button cart-button"
                    @click="goToCart"
                >
                    <span class="cart-icon">🛒</span>
                    <span class="cart-label">Carrinho</span>
                    <span v-if="cartStore.itemCount > 0" class="cart-count">{{ cartStore.itemCount }}</span>
                </button>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart'; 
import { useFilterStore } from '../stores/filters'; 

/***********************************************************/
/* VARIÁVEIS DE INICIALIZAÇÃO */
/***********************************************************/
const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const filterStore = useFilterStore(); 

const isCreateProductPage = computed(() => route.path === '/create-product');

function goToCreateProduct() {
    router.push('/create-product');
}

function goToCart() {
    router.push('/cart');
}
</script>

<style scoped>
.app-header { 
    background-color: #1f6fb5; 
    padding: 10px 40px; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    gap: 24px;
}

.logo-area { 
    display: flex; 
    align-items: center; 
}

.header-logo { 
    height: 70px; 
    display: block; 
}

.search-area {
    flex: 1;
    display: flex;
    justify-content: center;
}

.search-input {
    width: 100%;
    max-width: 600px;
    padding: 10px 16px;
    border-radius: 16px;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.92);
    font-size: 15px;
    color: #1d3f55;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.nav-actions {
    display: flex;
    align-items: center;
}

.action-group {
    display: inline-flex;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
}

.action-group.single .action-button {
    border-radius: 10px;
}

.action-button {
    background: linear-gradient(135deg, #ec5711 0%, #fca311 100%);
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
}

.action-button + .action-button {
    border-left: 1px solid rgba(255, 255, 255, 0.35);
}

.action-button:hover {
    filter: brightness(0.95);
}

/* --- (Contador) --- */
.cart-button {
    padding-right: 28px;
}

.cart-icon {
    font-size: 18px;
    color: #fff;
}

.cart-label {
    font-size: 15px;
    font-weight: 600;
}

.cart-count {
    position: absolute;
    top: 6px;
    right: 10px;
    background: #fff;
    color: #c23c13;
    font-size: 12px;
    font-weight: 700;
    border-radius: 999px;
    padding: 2px 6px;
    line-height: 1;
}
</style>
