<template>
    <div class="home-layout">
        <div class="header-actions">
        </div>

        <div class="page-container">
            <div v-if="products.length > 0" class="product-grid">
                <ProductCard 
                    v-for="product in products" 
                    :key="product.id" 
                    :product="product" 
                />
            </div>

            <div v-else class="empty-state">
                <p>Nenhum produto encontrado. Crie um novo anúncio! </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useProductStore } from '../stores/product';
    import ProductCard from '../components/ProductCard.vue';

    const productStore = useProductStore();
    const { products } = storeToRefs(productStore); 

    onMounted(() => {
        // Chamada de carregamento (síncrona/simulada)
        productStore.fetchProducts();
    });
</script>

<style scoped>
.home-layout {
    min-height: 80vh; 
    display: flex;
    flex-direction: column;
}

.header-actions { 
    display: flex; 
    justify-content: center; 
    padding: 20px 0; 
}

.page-container { 
    padding: 20px; 
    max-width: 1200px; 
    margin: 0 auto; 
    flex-grow: 1;
}

.product-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    gap: 30px; 
    max-width: 1200px; 
    margin: 0 auto; 
}

.empty-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    text-align: center;
    padding: 50px;
    color: #666;
}

.create-button { 
    background-color: #ec5711; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; 
    transition: background-color 0.2s; 
}

.create-button:hover { 
    background-color: #c23c13; 
}
</style>