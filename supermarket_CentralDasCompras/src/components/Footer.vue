/***********************************************************/
/* Este componente representa o rodapé fixo da aplicação.  */
/* Ele garante que uma informação de copyright ou contato  */
/* esteja visível na parte inferior de todas as páginas,   */
/* mantendo a consistência do layout.                      */
/***********************************************************/

<template>
    <footer class="app-footer-wrapper">
        <div class="app-footer">
            <p>© 2025 Central de Compras Marketplace. Todos os direitos reservados.</p>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-footer-wrapper {
    width: 100%;
}

.app-footer {
    padding: 25px 0; 
    text-align: center;
    background-color: #dddcdcf5; 
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
