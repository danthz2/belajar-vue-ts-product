<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import customApi from '../utils/api';
import ErrorComponent from './ErrorComponent.vue';
import Loading from './Loading.vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();

const fetchDataProfile = async () => {
    const { data } = await customApi.get('/user/me', {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })

    console.log("data " + data);

    return data;
}

const { data, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchDataProfile,
})


</script>

<template>
    <h1 class="text-info text-2xl font-bold">Halaman Profile</h1>
    <div v-if="isLoading">
        <Loading /> Loading...
    </div>
    <div v-else-if="error">
        <ErrorComponent />
    </div>
    <div v-else class="my-3">
        <div v-if="data" class="card bg-base-200">
            <div class="card card-border bg-base-200 w-full">
                <div class="card-body">
                    <h2 class="card-title">{{ data.firstName }} {{ data.lastName }}, {{ data.age }} Tahun</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions">
                        <button class="btn btn-info my-2">Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="text-lg font-bold">
                Belum ada profile
            </h2>
            <button class="btn btn-info my-2">Buat profile</button>
        </div>
    </div>
</template>