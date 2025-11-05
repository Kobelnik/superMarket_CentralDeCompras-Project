<template>
    <div>
        <button @click="goToCreateProduct"> Criar Anúncio</button>
    </div>
</template>


<script setup lang=""ts>
    import {useRouter} from 'vue-router';
    const router = useRouter();

    function goToCreateProduct() {
        router.push('/create-product');
    }

</script>


<style scoped>

</style>