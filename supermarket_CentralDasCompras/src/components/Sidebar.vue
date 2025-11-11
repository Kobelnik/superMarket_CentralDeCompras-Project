<template>
	<aside class="sidebar">
		<div class="sidebar-header">
			<h2 class="sidebar-logo">Central das Compras</h2>
		</div>

		<div class="sidebar-content">
			<div class="sidebar-section">
				<h3 class="sidebar-title">Categorias</h3>
				<ul class="sidebar-list">
					<li
						v-for="category in categories"
						:key="category"
						:class="['sidebar-chip', { active: isSelected(category) }]"
						@click="toggleCategory(category)"
					>
						{{ category }}
					</li>
				</ul>

				<div class="add-category" v-if="isAdding">
					<input
						type="text"
						v-model="newCategory"
						placeholder="Nova categoria..."
						@keyup.enter="addCategoryFromSidebar"
					/>
					<button @click="addCategoryFromSidebar">Adicionar</button>
				</div>
				<button
					v-else
					class="add-category-trigger"
					@click="isAdding = true"
				>
					+ Adicionar categoria
				</button>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useCategoriesStore } from '../stores/categories';

const emit = defineEmits<{
	(e: 'update:categories', value: string[]): void
}>();

const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.allCategories);
const selectedCategories = ref<string[]>([]);
const isAdding = ref(false);
const newCategory = ref('');

function emitSelection() {
	emit('update:categories', [...selectedCategories.value]);
}

onMounted(() => {
	selectedCategories.value = [...categories.value];
	emitSelection();
});

watch(
	() => categories.value,
	(newCategories, oldCategories = []) => {
		const currentSet = new Set(selectedCategories.value);
		const preservedSelection = newCategories.filter(cat => currentSet.has(cat));
		const addedCategories = newCategories.filter(cat => !oldCategories.includes(cat));
		const nextSelection = [...preservedSelection, ...addedCategories.filter(cat => !preservedSelection.includes(cat))];
		if (nextSelection.length !== selectedCategories.value.length ||
			nextSelection.some((cat, idx) => cat !== selectedCategories.value[idx])) {
			selectedCategories.value = nextSelection;
			emitSelection();
		}
	},
	{ immediate: false }
);

function isSelected(category: string): boolean {
	return selectedCategories.value.includes(category);
}

function toggleCategory(category: string) {
	if (isSelected(category)) {
		selectedCategories.value = selectedCategories.value.filter(c => c !== category);
	} else {
		selectedCategories.value = [...selectedCategories.value, category];
	}
	emitSelection();
}

function addCategoryFromSidebar() {
	const value = newCategory.value.trim();
	if (!value) return;
	categoriesStore.addCategory(value);
	newCategory.value = '';
	isAdding.value = false;
	// watch on categories will emit updated selection including the new category
}
</script>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #1f6fb5;
	color: #ffffff;
	padding: 24px 20px;
}

.sidebar-header {
	padding-bottom: 24px;
	margin-bottom: 24px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.sidebar-logo {
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0.5px;
}

.sidebar-content {
	display: flex;
	flex-direction: column;
	gap: 24px;
	overflow-y: auto;
}

.sidebar-section {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.sidebar-title {
	font-size: 14px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.85);
	text-transform: uppercase;
	letter-spacing: 2px;
}

.sidebar-list {
	list-style: none;
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
	padding: 0;
	margin: 0;
}

.sidebar-chip {
	padding: 10px 14px;
	border-radius: 8px;
	font-size: 14px;
	color: rgba(255, 255, 255, 0.9);
	background: rgba(255, 255, 255, 0.12);
	cursor: pointer;
	user-select: none;
	transition: background 0.2s ease, transform 0.2s ease;
}

.sidebar-chip:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: translateX(4px);
}

.sidebar-chip.active {
	background: linear-gradient(135deg, #ec5711 0%, #fca311 100%);
	color: #0f1117;
	font-weight: 600;
}

.add-category {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.add-category input {
	padding: 10px 12px;
	border-radius: 8px;
	border: none;
	outline: none;
	background: rgba(255, 255, 255, 0.15);
	color: #fff;
}

.add-category button {
	background: linear-gradient(135deg, #ec5711 0%, #fca311 100%);
	color: #fff;
	border: none;
	border-radius: 8px;
	padding: 10px 12px;
	font-weight: 600;
	cursor: pointer;
}

.add-category-trigger {
	background: transparent;
	color: #fff;
	border: 1px dashed rgba(255, 255, 255, 0.7);
	border-radius: 8px;
	padding: 10px 12px;
	font-weight: 600;
	cursor: pointer;
}
</style>


