<template>
    <div id="app-layout">
        <Header />
        
        <main class="main-content">
            <RouterView /> 
        </main>
        
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
* {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; 
    font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #f1f4f9 0%, #e5ecf6 100%);
}

#app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex-grow: 1; 
}
</style>