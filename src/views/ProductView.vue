<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import customApi from '../utils/api';
import Loading from '../components/Loading.vue';
import ErrorComponent from '../components/ErrorComponent.vue';
import CardItem from '../components/CardItem.vue';
import Pagination from '../components/Pagination.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Filter from '../components/Filter.vue';


const route = useRoute();

const skip = computed(() => parseInt(route.query.skip as string) || 0)
const limit = computed(() => parseInt(route.query.limit as string) || 6)
const total = computed(() => data.value?.total || 0)
const title = computed(() => route.query.q as string || "")
const category = computed(() => route.query.category as string || "")
const sortBy = computed(() => route.query.sortBy as string || "")
const order = computed(() => route.query.order as string || "")

const fetchData = async () => {
    const { data } = await customApi.get('/products/search', {
        params: {
            skip: skip.value,
            limit: limit.value,
            q: title.value,
            category: category.value,
            sortBy: sortBy.value,
            order: order.value,

        }
    })

    const products = data;
    return products;
}


const { data, isLoading, error } = useQuery({
    queryKey: ['products', skip, limit, title, category, sortBy, order],
    queryFn: fetchData
})


</script>
<template>
    <!-- Filter -->
    <Filter />
    <!-- Products -->
    <div v-if="isLoading">
        <Loading /> Loading...
    </div>
    <div v-else-if="error">
        <ErrorComponent />
    </div>
    <section v-else>
        <h1 class="text-info text-4xl font-bold ">List Product </h1>
        <div v-if="data.products.length" class="grid md:grid-cols-2  sm:grid-cols-1 gap-5">
            <CardItem :item="item" v-for="item in data.products" :key="item.id" />
        </div>
        <h1 v-else class="text-center">Data not found</h1>
    </section>
    <div class="flex justify-center">
        <Pagination class="my-3" :limit="limit" :skip="skip" :total="total" :title="title" :category="category"
            :sortBy="sortBy" :order="order" />
    </div>
</template>


<style scoped></style>