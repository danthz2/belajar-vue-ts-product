<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useMutation, useQuery } from '@tanstack/vue-query';
import customApi from '../utils/api';


const authStore = useAuthStore()
const router = useRouter()


const fetchDataCategory = async () => {
    const { data } = await customApi.get('/products/categories')

    return data;
}

const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchDataCategory
});

const LogoutMutation = useMutation({
    mutationFn: async () => {
        authStore.removeAuth()
    },
    onSuccess: () => {
        router.replace({ name: 'login' })
    },
    onError: (err) => {
        console.log(err)
    }
})

const handleLogout = async () => {
    LogoutMutation.mutate();
}


</script>
<template>
    <header>
        <div class="navbar bg-base-100 shadow-sm fixed z-10 top-0 right-0 left-0">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <RouterLink :to="{ name: 'products' }">Product</RouterLink>
                        </li>
                        <li>
                            <a>Category</a>
                            <ul class="p-2">
                                <li v-if="isLoading">Loading...</li>
                                <li v-else-if="error">Error</li>
                                <li v-else v-for="category in data" :key="category.slug">
                                    <RouterLink :to="{}">{{ category.name }}</RouterLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">🛒- Mall</RouterLink>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink :to="{ name: 'products' }">Product</RouterLink>
                    </li>
                    <li>
                        <details>
                            <summary>Category</summary>
                            <ul class="p-2 max-h-[30vh] overflow-y-scroll">
                                <li v-if="isLoading">Loading...</li>
                                <li v-else-if="error">Error</li>
                                <li v-else v-for="category in data" :key="category.slug">
                                    <RouterLink :to="{}">{{ category.name }}</RouterLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div class="navbar-end">
                <div v-if="authStore.token">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-info rounded-field">
                            {{ authStore.user?.firstName }}</div>
                        <ul tabindex="0"
                            class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                            <li>
                                <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
                            </li>
                            <li>
                                <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
                            </li>
                            <li><span class="text-error" @click="handleLogout">Logout</span></li>
                        </ul>
                    </div>
                </div>
                <div v-else>
                    <RouterLink :to="{ name: 'login' }" class="btn btn-primary">Login</RouterLink>
                </div>
            </div>
        </div>
    </header>
</template>


<style scoped></style>