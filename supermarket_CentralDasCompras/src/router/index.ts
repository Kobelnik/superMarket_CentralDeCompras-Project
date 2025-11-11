/******************************/
/* Arquivo de rotas do projeto*/
/******************************/

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CreateProduct from '../pages/CreateProduct.vue';
import ProductDetail from '../pages/ProductDetails.vue';
import Cart from '../pages/Cart.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/create-product', component: CreateProduct },
    { path: '/product/:id', component: ProductDetail, props: true },
    { path: '/cart', component: Cart }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});