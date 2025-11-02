<script setup lang="ts">
import { useRoute } from 'vue-router';
import customApi from '../utils/api';
import { useQuery } from '@tanstack/vue-query';
import Loading from '../components/Loading.vue';
import ErrorComponent from '../components/ErrorComponent.vue';
import CommentForm from '../components/CommentForm.vue';


const route = useRoute()

const fetchData = async () => {
    const { data } = await customApi.get(`/products/${route.params.id}`)
    console.log("detail ", data)
    return data
}

const { data, isLoading, error } = useQuery({
    queryKey: ["productDataDetail"],
    queryFn: fetchData,
})



</script>

<template>
    <article>
        <div v-if="isLoading">
            <Loading /> Loading...
        </div>
        <div v-else-if="error">
            <ErrorComponent />
        </div>
        <div v-else>
            <section>
                <h1 class="text-info text-4xl font-bold">{{ data.title }}</h1>
                <span class="badge badge-success  ">{{ data.category }}</span>
                <section class="my-3 border-b border-info py-5">
                    <span class="font-bold">by: </span> {{ data.brand }},
                    <span v-if="data.meta?.createdAt">
                        {{ new Date(data.meta.createdAt).toDateString() }}
                    </span>
                </section>
                <section class="my-3 border-b border-info py-5 mb-5">
                    <img :src="data.thumbnail" :alt="data.title" class="object-cover mx-auto">
                </section>
                <section class="my-3 border-b border-info py-5 mb-5">
                    <p>{{ data.description }}</p>
                </section>

                <!-- TAG -->
                <div class="badge badge-success mr-3" v-for="(tag, index) in data.tags" :key="index">
                    {{ tag }}
                </div>
            </section>
            <CommentForm :productId="route.params.id" :isUpdate="false" />
            <section class="mt-5">
                <h1 class="text-2xl font-bold text-info my-2">Reviews</h1>
                <div class="card card-border bg-base-100 mt-10" v-for="(item, index) in data.reviews" :key="index"
                    v-if="data.reviews && data.reviews.length">
                    <div class="card-body">
                        <div class="flex items-center justify-between gap-2">
                            <h2 class="card-title">{{ item.reviewerName }}</h2>
                            <div>
                                <span v-for="_i in item.rating">
                                    ⭐
                                </span>
                            </div>
                        </div>
                        <p>{{ item.comment }}</p>
                        <span class="border-b text-gray-200"></span>
                        <small class="text-xs">
                            {{ new Date(item.date ?? "").toDateString() }}
                        </small>
                    </div>
                </div>
                <div v-else>
                    <h1 class="text-xl font-bold ">
                        Review not found
                    </h1>
                </div>
            </section>
        </div>

    </article>

</template>


<style scoped></style>