<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import customApi from '../utils/api';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()

const titleInput = ref(route.query.title as string || "")
const categoryInput = ref(route.query.slug as string || "")
const sortInput = ref(route.query.sortBy as string || "")
const sortOrderInput = ref(route.query.order as string || "")


const fetchDataCategory = async () => {
    const { data } = await customApi.get('/products/categories')

    return data;
}

const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchDataCategory
});

const handleFilter = () => {
    console.log("jalan");

    router.push({
        query: {
            ...route.query,
            q: titleInput.value,
            category: categoryInput.value,
            sortBy: sortInput.value,
            order: sortOrderInput.value,
            skip: "0",
            limit: "6"
        }
    })
}

</script>
<template>
    <fieldset class="fieldset bg-base-200 border-base-300  rounded-box border p-4 mb-10">
        <form @submit.prevent="handleFilter">
            <legend class="fieldset-legend pb-5">Filter Product</legend>
            <div class="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
                <input v-model="titleInput" type="text" class="input w-full" placeholder="Search by title" />
                <select v-model="categoryInput" class="select w-full">
                    <option disabled value="" hidden>Choose Category</option>
                    <option v-if="isLoading">Loading...</option>
                    <option v-else-if="error">Category error</option>
                    <option v-else v-for="category in data" :value="category.slug" :key="category.slug">
                        {{ category.name }}
                    </option>
                </select>
                <select v-model="sortInput" class="select w-full">
                    <option disabled value="" hidden>Sort by</option>
                    <option value="title">Title</option>
                    <option value="category">Category</option>
                    <option value="price">Price</option>
                </select>
                <select v-model="sortOrderInput" class="select w-full">
                    <option disabled value="" hidden>Order by</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <button class="btn btn-primary btn-block mt-4" type="submit">Search</button>
            <RouterLink :to="{ name: 'products' }" class="btn btn-error text-white btn-block mt-4">Reset</RouterLink>
        </form>
    </fieldset>

</template>


<style scoped></style>