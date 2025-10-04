<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const props = defineProps<{
    total: number,
    skip: number,
    limit: number,
    title: string,
    category: string,
    sortBy: string,
    order: string
}>()



const goToPage = (newSkip: number) => {

    router.push({
        query: {
            ...route.query,
            q: props.title,
            category: props.category,
            sortBy: props.sortBy,
            order: props.order,
            skip: newSkip,
        }
    })
}


</script>
<template>
    <div class="join">
        <button class="join-item btn" :disabled="skip <= 1" @click=" goToPage(skip - limit)">«</button>
        <button class="join-item btn">Page {{ (skip / limit) + 1 }}</button>
        <button class="join-item btn" :disabled="skip + limit >= total" @click=" goToPage(skip + limit)">»</button>
    </div>
</template>


<style scoped></style>