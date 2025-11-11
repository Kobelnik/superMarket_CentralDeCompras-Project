<template>
	<div class="home-layout">
		<div class="header-actions"></div>

		<div class="page-container">
			<button
				class="sidebar-toggle"
				:type="'button'"
				:aria-expanded="isSidebarOpen"
				:aria-label="isSidebarOpen ? 'Fechar barra lateral' : 'Abrir barra lateral'"
				@click="toggleSidebar"
				:style="{ left: sidebarOffset + 'px' }"
			>
				<span class="toggle-icon" :class="{ 'is-active': isSidebarOpen }"></span>
			</button>

			<div class="sidebar-container" :class="{ open: isSidebarOpen }">
				<Sidebar
					@update:categories="value => selectedCategories = value"
				/>
			</div>

			<div class="content-area">
				<section class="product-panel">
					<header class="panel-header">
						<div class="panel-heading">
							<h1>Ofertas em destaque</h1>
							<p>Explore os melhores produtos do marketplace Central das Compras.</p>
						</div>
					</header>

					<div v-if="filteredProducts.length > 0" class="product-grid">
						<ProductCard 
							v-for="product in filteredProducts" 
							:key="product.id" 
							:product="product" 
						/>
					</div>

					<div v-else class="empty-state">
						<p>Nenhum produto encontrado. Crie um novo anúncio! </p>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useProductStore } from '../stores/product';
	import { useFilterStore } from '../stores/filters';
	import ProductCard from '../components/ProductCard.vue';
	import Sidebar from '../components/Sidebar.vue';

	const productStore = useProductStore();
	const filterStore = useFilterStore();
	const { products } = storeToRefs(productStore); 
	const { searchText } = storeToRefs(filterStore);

	const selectedCategories = ref<string[]>([]);
	const isSidebarOpen = ref(true);
	const SIDEBAR_WIDTH = 280;

	const sidebarOffset = computed(() => (isSidebarOpen.value ? SIDEBAR_WIDTH + 16 : 16));

	const filteredProducts = computed(() => {
		const categories = selectedCategories.value;
		const searchTerm = searchText.value.trim().toLowerCase();

		return products.value.filter(p => {
			const matchesText =
				searchTerm.length === 0 ||
				p.name.toLowerCase().includes(searchTerm);

			const matchesCategory =
				categories.length === 0 || categories.includes(p.category);

			return matchesText && matchesCategory;
		});
	});

	function toggleSidebar() {
		isSidebarOpen.value = !isSidebarOpen.value;
	}

	onMounted(() => {
		// Chamada de carregamento (síncrona/simulada)
		productStore.fetchProducts();
	});
</script>

<style scoped>
.home-layout {
    min-height: 80vh; 
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #f6f8fc 0%, #e8ecf4 100%);
}

.header-actions { 
    display: flex; 
    justify-content: center; 
    padding: 20px 0; 
}

.page-container { 
    padding: 40px 60px 60px;
    width: 100%;
    margin: 0;
    flex-grow: 1;
    position: relative;
}

.sidebar-container {
	position: fixed;
	top: 90px;
	left: 0;
	width: 280px;
	height: calc(100vh - 90px);
	background: #1f6fb5;
	transform: translateX(-100%);
	transition: transform 0.3s ease;
	z-index: 90;
}

.sidebar-container.open {
	transform: translateX(0);
}

.content-area {
	width: 100%;
	max-width: 1240px;
	margin: 0 auto;
	padding-left: 24px;
}

.product-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); 
    gap: 32px; 
}

.empty-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    text-align: center;
    padding: 50px;
    color: #666;
}

.create-button { 
    background-color: #ec5711; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; 
    transition: background-color 0.2s; 
}

.create-button:hover { 
    background-color: #c23c13; 
}

.product-panel {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 24px;
	padding: 32px 36px;
	box-shadow: 0 20px 45px rgba(31, 67, 114, 0.12);
	border: 1px solid rgba(31, 111, 181, 0.08);
	backdrop-filter: blur(6px);
	display: flex;
	flex-direction: column;
	gap: 32px;
}

.panel-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}

.panel-heading h1 {
	font-size: 28px;
	font-weight: 700;
	color: #1a2d4a;
	margin-bottom: 6px;
}

.panel-heading p {
	font-size: 16px;
	color: #5b6b80;
	margin: 0;
}

.sidebar-toggle {
	position: fixed;
	top: 96px;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	border: none;
	background: linear-gradient(135deg, #ec5711 0%, #fca311 100%);
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	z-index: 100;
}

.sidebar-toggle:hover {
	transform: scale(1.05);
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.toggle-icon {
	display: block;
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-left: 14px solid #f1f5f9;
	transition: transform 0.3s ease;
	transform-origin: center;
}

.toggle-icon.is-active {
	transform: rotate(90deg);
}
</style>