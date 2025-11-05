<script setup lang="ts">
import ProductCard from './components/ProductCard.vue';
import ProductList from './components/ProductList.vue';
</script>

<template>
  <div id="app">
    <RouterView />
    <ProductList />
    <ProductCard />
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
