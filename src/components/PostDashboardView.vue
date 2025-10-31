<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useAuthStore } from '../store/auth';
import customApi from '../utils/api';
import Loading from './Loading.vue';
import ErrorComponent from './ErrorComponent.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from './Pagination.vue';



const authStore = useAuthStore()

const route = useRoute();


const skip = computed(() => parseInt(route.query.skip as string) || 0)
const limit = computed(() => parseInt(route.query.limit as string) || 6)
const total = computed(() => data.value?.total || 0)

const fetchDataPost = async () => {
    const { data } = await customApi.get(`/posts/user/${authStore.user?.id}`, {
        params: {
            skip: skip.value,
            limit: limit.value
        },
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
    return data;
}

const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['post', skip, limit],
    queryFn: fetchDataPost
})

const handleDelete = async (id: number) => {
    if (confirm("Are you sure to delet this post ?")) {
        await customApi.delete(`/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        refetch()
    }

    alert('Delete successfully')
}

</script>
<template>
    <h1 class="text-info text-2xl font-bold mb-3">Halaman Post</h1>
    <div class="flex justify-end">
        <RouterLink :to="{ name: 'post-create' }" class="btn btn-primary my-3 ">Tambah</RouterLink>
    </div>
    <div v-if="isLoading">
        <Loading /> Loading...
    </div>
    <div v-else-if="error">
        <ErrorComponent />
    </div>
    <div v-else>
        <div class="overflow-x-auto">
            <div v-if="data.posts.length">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th width="10%">Reaction</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="item in data.posts" :key="item.id">
                            <td>
                                <div class="flex items-center gap-3">
                                    <div class="avatar">
                                        <div class="mask mask-squircle h-12 w-12">
                                            <img :src="`https://i.pravatar.cc/${item.id}`"
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">{{ item.title }}</div>
                                        <div class="flex items-center gap-3">
                                            <div>{{ item.reactions.likes }} likes</div>
                                            <div>{{ item.reactions.dislikes }} dislikes</div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {{ item.body }}
                            </td>
                            <td>
                                {{ item.views }} Views

                            </td>
                            <th>
                                <button class="btn btn-error btn-xs" @click="handleDelete(item.id)">Delete</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                Data not found
            </div>
            <div class="flex justify-center">
                <Pagination class="my-3" :limit="limit" :skip="skip" :total="total" />
            </div>
        </div>
    </div>
</template>