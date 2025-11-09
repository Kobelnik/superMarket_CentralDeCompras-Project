<template>
    <header class="app-header">
        <div class="logo-area">
            <RouterLink to="/">
                <img src="/LogoMarketplace.svg" alt="Logo do Marketplace" class="header-logo"> 
            </RouterLink>
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

.app-header {
    background-color: #29abe2; 
    display: flex;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Área do Logo */
.header-logo {
    height: 110px; 
    cursor: pointer;
}

</style>