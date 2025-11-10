<template>
    <div class="home-layout">
        <div class="page-container">
            <div v-if="products.length > 0" class="product-grid">
                <ProductCard 
                    v-for="product in products" 
                    :key="product.id" 
                    :product="product" 
                />
            </div>

            <div v-else class="empty-state">
                <p>Nenhum produto foi criado até o momento. </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '../stores/product';
    import ProductCard from '../components/ProductCard.vue';
    
    const productStore = useProductStore();
    const { products } = storeToRefs(productStore);
</script>

<style scoped>
.page-container {
    padding: 20px;
    max-width: 1200px; /* Garante que o conteúdo tenha largura máxima */
    margin: 0 auto; /* Centraliza o conteúdo (grade de produtos) */
}

.header-actions {
    /* MANTÉM a largura máxima e centralização do .page-container */
    max-width: 1200px; 
    margin: 0 auto;
    
    /* Reposiciona o botão */
    display: flex;
    justify-content: flex-end; /* Empurra o botão para a direita */
    padding: 20px 0;
    
    /* Adiciona padding lateral para alinhar o botão às bordas da grade */
    padding-right: 20px; 
    padding-left: 20px;
}

.product-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    gap: 30px; 
    max-width: 1200px; 
    margin: 0 auto; 
}

.empty-state { 
    text-align: center; 
    padding: 50px; 
    color: #666; 
}
</style>