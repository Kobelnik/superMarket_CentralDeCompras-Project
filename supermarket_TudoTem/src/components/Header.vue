<template>
    <header class="app-header">
        <div class="logo-area">
            <img src="/LogoMarketplace.svg" alt="Logo do Marketplace" class="header-logo"> 
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

.app-header {
    background-color: #29abe2; 
    padding: 10px 40px;
    display: flex;
    justify-content: space-between; /* Espaça o logo da navegação */
    align-items: center;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil para profundidade */
}

/* Área do Logo */
.header-logo {
    height: 110px; 
    cursor: pointer;
}

/* Links de Navegação */
.nav-links {
    display: flex;
    gap: 25px;
    align-items: center;
}

.nav-item {
    color: #333;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
    display: flex;
    align-items: center;
}

.nav-item:hover {
    color: #000;
}

/* Estilo para os placeholders de ícones */
.icon-placeholder {
    margin-right: 5px;
    font-style: normal;
    font-size: 18px;
}
</style>