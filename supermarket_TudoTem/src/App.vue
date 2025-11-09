<script setup lang="ts">
import ProductCard from './components/ProductCard.vue';
import ProductList from './components/ProductList.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div id="app">
    <Header />
    <RouterView />
    <ProductList />
    <ProductCard />
    <Footer />
  </div>
</template>

<style scoped>
  * {
    margin-top: -8px;
    padding: 0;
    box-sizing: border-box;
  }
</style>
