<template>
    <header class="app-header">
        <!-- ÁREA DO LOGO (EXTREMA ESQUERDA) -->
        <div class="logo-area">
            <RouterLink to="/">
                <!-- Caminho da imagem mantido -->
                <img src="/LogoMarketplace.svg" alt="Logo do Marketplace" class="header-logo"> 
            </RouterLink>
        </div>

        <!-- ÁREA DE NAVEGAÇÃO E BOTÃO (EXTREMA DIREITA) -->
        <nav class="nav-actions">
            <button @click="goToCreateProduct" class="create-button">
                Criar Anúncio
            </button>
            
            <!-- Outros links que você queira adicionar aqui -->
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function goToCreateProduct() {
    router.push('/create-product');
}
</script>
<style scoped>
/* A CHAVE: O justify-content: space-between separa o .logo-area e o .nav-actions */
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
    /* Garante que a área do logo fique na esquerda */
    display: flex;
    align-items: center;
}

.header-logo {
    /* Se for SVG/imagem, esta linha ajusta o tamanho */
    height: 70px; 
    display: block;
}

.nav-actions {
    /* Este contêiner contém o botão e está na extrema direita */
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Estilo do Botão Criar Anúncio */
.create-button {
    background-color: #ec5711;
    color: white;
    border: none;
    padding: 16px 40px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
}

.create-button:hover {
    background-color: #c23c13;
}
</style>