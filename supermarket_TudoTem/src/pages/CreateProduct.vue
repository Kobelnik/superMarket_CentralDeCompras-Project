<template>
    <div class="form-container">
        <section class="formulario">
            <span  class="titleForms">
                <h1>Crie aqui o seu anúncio!</h1>
            </span>
            <label for="name">
                <span class="decoTextForms"> Nome do Produto: </span>
            </label>
            <input type="text" id="name" v-model="newProduct.name" required />

            <label for="imageUrl">
                <span class="decoTextForms"> URL da Imagem: </span>
            </label>
            <input type="text" id="imageUrl" v-model="newProduct.imageUrl" required />

            <div class="input-group">
                <div class="input-item">
                    <label for="quantity">
                        <span class="decoTextForms"> Quantidade: </span>
                    </label>
                    <input type="number" id="quantity" v-model="newProduct.quantity" min="1" required />
                </div>
                <div class="input-item">
                    <label for="price"> 
                        <span class="decoTextForms"> Preço (R$): </span>
                    </label>
                    <input type="number" id="price" v-model="newProduct.price" min="0.01" step="0.01" required />
                </div>
            </div>

            <label for="category">
                <span class="decoTextForms"> Categoria: </span>
            </label>
            <input type="text" id="category" v-model="newProduct.category" required />

            <label for="description">
                <span class="decoTextForms"> Descrição: </span>
            </label>
            <textarea id="description" v-model="newProduct.description" required />

            <section id="finishProductArea">
                <button id="finishProduct">
                    <span id="textButtonFinishProduct">
                        Criar Produto
                    </span>
                </button>
            </section>
        </section>
    </div>
</template>

<script setup lang="ts">
// transforma um objeto TS em um objeto reativo (capacidade de se alterar dinamicamente na tela do usuário)
import {reactive} from 'vue'; 
import type { Product } from '../types/Product.ts';

const newProduct = reactive<Product>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    category: '',
    imageUrl: '',
});
</script>

<style scoped>
/* Contêiner para centralizar o formulário na tela */
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

titleForms {
    background-color: #333;
}

h1 {
    color: #1d1d1d;
    margin-bottom: 30px;
    font-size: 30px;
}

/* Edição do formulário de criar anuncio */
.formulario {
    flex-direction: column;
    display: flex;
    gap: 15px; /* Aumenta o espaçamento entre elementos */
    width: 600px; /* Largura fixa para desktop para um visual controlado */
    padding: 30px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Sombra suave para profundidade */
}

/* Agrupamento de campos lado a lado (Quantidade e Preço) */
.input-group {
    display: flex;
    gap: 20px;
    width: 100%;
}

.input-item {
    flex: 1; /* Faz com que ambos os itens ocupem o mesmo espaço */
    display: flex;
    flex-direction: column;
}

/* Estilo para todos os inputs (texto, número, etc.) e textarea */
.formulario textarea {
    height: auto;
    width: 100%; 
    padding: 12px 15px; /* Padding interno profissional */
    margin-top: 5px;
    margin-bottom: 15px; /* Espaço após o campo */
    border-radius: 8px;
    border: 1px solid #ddd; /* Borda mais suave */
    box-sizing: border-box; /* Garante que padding e border não aumentem a largura */
    font-size: 16px;
    transition: border-color 0.2s;
}

.decoTextForms {
    font-size: 16px;
    font-weight: 600; /* Levemente menos negrito */
    color: #333;
    margin-bottom: 5px;
    display: block; /* Garante que o label ocupe sua própria linha */
}

/* Edição do botão de criar produto */
#finishProductArea {
    width: 100%; /* Ocupa a largura total do formulário */
    display: flex;
    justify-content: center; /* Centraliza o botão dentro desta área */
    margin-top: 20px;
}

#finishProduct {
    width: 250px; /* Largura fixa para o botão centralizado */
    height: 50px;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: #ec5711;
    transition: all 0.3s ease-in-out; /* Transição mais longa para suavidade */
}

#finishProduct:hover {
    background-color: #c23c13;
    cursor: pointer;
    transform: scale(1.05); /* Escala sutilmente maior para destaque */
}

#finishProduct:active {
    background-color: #962408;
    transform: scale(1.02);
}

#textButtonFinishProduct {
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase; /* Deixa o texto do botão mais profissional */
}
</style>