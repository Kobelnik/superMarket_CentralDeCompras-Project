<script setup lang="ts">
import ProductCard from './components/ProductCard.vue';
import ProductList from './components/ProductList.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div id="app">
    <Header />
    <RouterView />
    <ProductList />
    <ProductCard />
  </div>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
