<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { ProductProps } from '../types';

defineProps<{
    item: ProductProps
}>()



</script>
<template>
    <div class="card card-side bg-base-100 shadow-sm mt-10">
        <figure>
            <img :src=item.thumbnail :alt=item.title class="h-48 w-96 object-cover" />
        </figure>

        <div class="card-body ">
            <h2 class="card-title">{{ item.title }}</h2>
            <div class="badge badge-success capitalize">{{ item.category }}</div>
            <p>{{ item.description }}</p>
            <div class="card-actions justify-between">
                <div>
                    <p>by:
                        <span class="font-bold">
                            {{ item.brand }}
                        </span>
                    </p>
                    <span class="text-secondary">
                        created at: {{ new Date(item.meta.createdAt).toDateString() }}
                    </span>
                </div>
                <RouterLink :to="{ name: 'detail-product', params: { id: item.id } }" class="btn btn-primary">Detail
                </RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped></style>