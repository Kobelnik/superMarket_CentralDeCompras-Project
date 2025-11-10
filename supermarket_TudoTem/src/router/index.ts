import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import CreateProduct from '../pages/CreateProduct.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/create-product', component: CreateProduct }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

