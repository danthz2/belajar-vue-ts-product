<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import customApi from '../utils/api';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Loading from './Loading.vue';



const authStore = useAuthStore();
const router = useRouter()

const props = defineProps({
    isRegister: {
        type: Boolean,
        default: false,
    }
})


const username = ref('')
const email = ref('')
const password = ref('')

const AuthMutation = useMutation({
    mutationFn: async () => {
        // Case Jika mau langsung login ketika regist berhasil
        if (props.isRegister) {
            await customApi.post('/auth/register', {
                email: email.value,
                username: username.value,
                password: password.value,
            })
        }
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
                <h1 class="text-3xl font-bold text-info text-center">{{ props.isRegister ? "Register" : "Login" }}</h1>

                <label class="label">Username</label>
                <input type="text" v-model="username" class="input w-full" placeholder="username" />

                <div v-if="props.isRegister">
                    <label class="label">Email</label>
                    <input type="text" v-model="email" class="input w-full" placeholder="email" />
                </div>

                <label class="label">Password</label>
                <input type="password" v-model="password" class="input w-full" placeholder="Password" />

                <button class="btn btn-neutral mt-4" type="submit">
                    <span v-if="AuthMutation.status.value === 'pending'">
                        <Loading /> Loading ...
                    </span>
                    <span v-else>{{ props.isRegister ? "Register" : "Login"
                    }}</span>
                </button>
                <p v-if="props.isRegister" class="text-center">
                    Sudah punya akun silakan
                    <RouterLink :to="{ name: 'login' }">
                        Login disini
                    </RouterLink>
                </p>
                <p v-else class="text-center">
                    Belum punya akun silakan
                    <RouterLink :to="{ name: 'register' }">
                        daftar disini
                    </RouterLink>
                </p>
            </fieldset>
        </form>
    </div>
</template>