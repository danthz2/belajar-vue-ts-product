<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';



</script>

<template>
    <Header />
    <main class="mx-auto max-w-6xl px-8 py-20 my-15 min-h-[80vh]">
        <RouterView />
    </main>
    <Footer />
</template>

<style scoped></style>