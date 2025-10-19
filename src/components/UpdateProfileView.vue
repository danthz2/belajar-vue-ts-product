<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useAuthStore } from '../store/auth';
import customApi from '../utils/api';
import ProfileForm from './ProfileForm.vue';
import Loading from './Loading.vue';
import ErrorComponent from './ErrorComponent.vue';

const authStore = useAuthStore()

Loading

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
    queryKey: ['profileForm'],
    queryFn: fetchDataProfile,
})

</script>

<template>
    <h1 class="text-info text-3xl font-bold">Update Profile</h1>
    <div v-if="isLoading">
        <Loading /> Loading...
    </div>
    <div v-else-if="error">
        <ErrorComponent />
    </div>
    <div v-else>
        <ProfileForm :isUpdate="true" :data />
    </div>
</template>