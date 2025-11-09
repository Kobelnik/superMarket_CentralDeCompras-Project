<template>
    <div class="form-container">
        <section class="formulario">
            <div class="titleForms">
                <h1>Crie aqui o seu anúncio!</h1>
            </div>

            <div class="form-body">
                <label for="name">
                    <span class="decoTextForms">Nome do Produto:</span>
                </label>
                <input type="text" id="name" v-model="newProduct.name" required />
                <hr class="form-separator">

                <label for="imageUrl">
                    <span class="decoTextForms">Upload da Imagem:</span>
                </label>
                <input type="file" id="imageUrl" @change="handleFileUpload" accept="image/*" required />
                <hr class="form-separator">

                <div class="input-group">
                    <div class="input-item">
                        <label for="quantity">
                            <span class="decoTextForms">Quantidade:</span>
                        </label>
                        <input type="number" id="quantity" v-model="newProduct.quantity" min="1" required />
                    </div>
                    <div class="input-item">
                        <label for="price">
                            <span class="decoTextForms">Preço (R$):</span>
                        </label>
                        <input type="text" id="price" :value="displayPrice" @input="handlePriceInput" min="0.01" required />
                    </div>
                </div>
                <hr class="form-separator">

                <label for="category">
                    <span class="decoTextForms">Categoria:</span>
                </label>
                <div class="category-group">
                    <select id="category" v-model="newProduct.category" required>
                        <option value="" disabled>Selecione uma categoria</option>
                        <option v-for="category in availableCategories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>

                    <button class="add-category-btn" @click.prevent="isAddingCategory = !isAddingCategory">
                        ✏️
                    </button>
                </div>
                <hr class="form-separator">

                <div v-if="isAddingCategory" class="add-category-area">
                    <input type="text" v-model="newCategoryInput" placeholder="Nova categoria..." />
                    <button @click.prevent="addNewCategory" class="confirm-category-btn">Adicionar</button>
                </div>

                <label for="description">
                    <span class="decoTextForms">Descrição:</span>
                </label>
                <textarea id="description" v-model="newProduct.description" required />
                <hr class="form-separator">

                <section id="finishProductArea">
                    <button id="finishProduct" @click.prevent="createProduct">
                        <span id="textButtonFinishProduct">
                            Criar Produto
                        </span>
                    </button>
                </section>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import type { Product } from '../types/Product.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const newProduct = reactive<Product>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    quantity: 0,
    category: '',
    imageUrl: '',
});

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(value);
}

const displayPrice = ref(formatCurrency(newProduct.price));

const handlePriceInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    value = value.replace(/\D/g, '');

    if(value) {
        const numValue = parseInt(value, 10) / 100;
        newProduct.price = numValue;
        displayPrice.value = formatCurrency(numValue);
    } else {
        newProduct.price = 0;
        displayPrice.value = '';
    }
};

const availableCategories = ref(['Eletrônicos', 'Moda', 'Casa e Decoração', 'Esportes']);
const newCategoryInput = ref('');
const isAddingCategory = ref(false);

function addNewCategory() {
    if (newCategoryInput.value && !availableCategories.value.includes(newCategoryInput.value)) {
        availableCategories.value.push(newCategoryInput.value);
        newProduct.category = newCategoryInput.value;
        newCategoryInput.value = '';
        isAddingCategory.value = false;
    }
}

function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            newProduct.imageUrl = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
}

function createProduct() {
    console.log('Novo Produto Criado:', newProduct);
    
    // Adicione a lógica de armazenamento global aqui (Em passos futuros)
    alert('Produto criado com sucesso! (Verifique o console)');

    // Redireciona para a home
    router.push('/');
}
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    background-color: #f8f8f8;
    min-height: 100vh;
}

.titleForms {
    background-color: #f0f0f0;
    padding: 17px 30px;
    width: 100%;
    box-sizing: border-box;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    margin-bottom: 0;
}

h1 {
    margin: 0;
    font-size: 24px;
    color: #333;
}

.formulario {
    flex-direction: column;
    display: flex;
    padding: 0;
    gap: 0;
    width: 600px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.form-body {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 20px 30px 30px 30px;
}

.input-group {
    display: flex;
    gap: 20px;
    width: 100%;
}

.input-item {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.decoTextForms {
    font-size: 16px;
    font-weight: 600;
    margin-top: 0;
    margin-left: 10px;
    color: #333;
    margin-bottom: 3px;
    display: block;
}

.form-separator {
    /* 1. Zera estilos padrão para controle total */
    border: none;
    height: 1px; /* Altura da linha */
    
    /* 2. Define a borda inferior fina e discreta */
    border-bottom: 1px solid #e0e0e0; 
    
    /* 3. Garante que ela ocupe a largura total */
    width: 100%; 
    
    /* 4. Adiciona um respiro maior para separar os campos */
    margin-top: 5px; 
    margin-bottom: 20px; 
}

.formulario input:not([type='file']),
.formulario select {
    height: 44px;
    font-size: 16px;
    padding: 0 15px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    width: 100%;
    transition: border-color 0.2s;
}

.formulario input[type='file'] {
    width: 100%;
    padding: 10px 0;
    border: none;
}

.category-group {
    display: flex;
    gap: 10px;
}

.category-group select {
    flex-grow: 1;
}

.add-category-btn {
    width: 44px;
    height: 44px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: background-color 0.2s;
}

.add-category-btn:hover {
    background-color: #f0f0f0;
}

.add-category-area {
    display: flex;
    gap: 10px;
    margin-top: -10px;
    padding: 10px 0;
    border-top: 1px solid #eee;
}

.add-category-area input {
    flex-grow: 1;
    height: 40px;
}

.confirm-category-btn {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.confirm-category-btn:hover {
    background-color: #4cae4c;
}

.formulario textarea {
    padding: 12px 15px;
    width: 100%;
    height: 120px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 16px;
    resize: vertical;
}

.formulario input:focus,
.formulario select:focus,
.formulario textarea:focus {
    border-color: #ec5711;
    outline: none;
    box-shadow: 0 0 0 3px rgba(236, 87, 17, 0.15);
}

#finishProductArea {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0;
}

#finishProduct {
    width: 250px;
    height: 50px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff931e;
    transition: all 0.3s ease-in-out;
}

#finishProduct:hover {
    background-color: #d65215;
    cursor: pointer;
    transform: scale(1.05);
}

#finishProduct:active {
    background-color: #962408;
    transform: scale(1.02);
}

#textButtonFinishProduct {
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
}
</style>