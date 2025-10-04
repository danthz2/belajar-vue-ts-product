<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import customApi from '../utils/api';
import Loading from '../components/Loading.vue';
import ErrorComponent from '../components/ErrorComponent.vue';
import CardItem from '../components/CardItem.vue';




const fetchData = async () => {
    const { data } = await customApi.get('/products', {
        params: {
            limit: 5
        }
    })
    console.log(data)

    return data
}

const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData
})





</script>

<template>
    <main>
        <div v-if="isLoading">
            <Loading /> Loading...
        </div>
        <div v-else-if="error">
            <ErrorComponent />
        </div>
        <section v-else>
            <h1 class="text-primary font-bold text-3xl underline">List of New Product</h1>
            <CardItem :item="item" v-for="item in data.products" :key="item.id" />
            <RouterLink :to="{ name: 'products' }" class="btn btn-block btn-primary mt-10">See more...</RouterLink>
        </section>
    </main>

</template>


<style scoped></style>