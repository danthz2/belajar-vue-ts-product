<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import customApi from '../utils/api';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';



const authStore = useAuthStore();

const router = useRouter()

const username = ref('')
const password = ref('')

const AuthMutation = useMutation({
    mutationFn: async () => {
        const { data } = await customApi.post('/auth/login', {
            username: username.value,
            password: password.value,
        })

        const user = await customApi.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${data.accessToken}`
            }
        })

        authStore.setAuth(data.accessToken, user.data)
    },
    onSuccess: () => {
        router.replace({ name: 'home' })
    },
    onError: (err) => {
        console.log(err)
    }
})

const AuthSubmitHandle = () => {
    AuthMutation.mutate();
}

</script>

<template>
    <div class="flex justify-center">
        <form @submit.prevent="AuthSubmitHandle">
            <fieldset class="fieldset bg-base-300 border-info rounded-box w-lg border p-4">
                <legend class="fieldset-legend">Login</legend>

                <label class="label">Username</label>
                <input type="text" v-model="username" class="input w-full" placeholder="username" />

                <label class="label">Password</label>
                <input type="password" v-model="password" class="input w-full" placeholder="Password" />

                <button class="btn btn-neutral mt-4" type="submit">Login</button>
            </fieldset>
        </form>
    </div>
</template>