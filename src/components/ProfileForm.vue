<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { useAuthStore } from '../store/auth';
import customApi from '../utils/api';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()

const router = useRouter()

const props = defineProps({
    isUpdate: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: null
    }
})

onMounted(() => {
    if (props.data && props.isUpdate) {
        age.value = props.data.age
        university.value = props.data.university
    }
})

const profileMutation = useMutation({
    mutationFn: async () => {
        console.log("Mutation Jalan")
        const id = authStore.user?.id;
        await customApi.put(`/users/${id}`, {
            age: age.value,
            university: university.value
        }, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
    },
    onSuccess: () => {
        router.replace({
            name: 'profile'
        })
    },
    onError: (err) => {
        console.log(err)
    }

})



const age = ref(0)
const university = ref("")

const handleSubmit = async () => {

    profileMutation.mutate()
}


</script>

<template>
    <form @submit.prevent="handleSubmit">
        <label class="label my-2">
            Age
        </label>
        <input type="number" v-model="age" class="input w-full" placeholder="Masukan umur anda">
        <label class="label my-2">
            University
        </label>
        <textarea v-model="university" class="textarea w-full" placeholder="Masukkan universitydata anda"></textarea>
        <button type="submit" class="btn btn-info mt-4 text-white">
            {{ props.isUpdate ? 'Update Profile' : 'Buat Profile' }}
        </button>
    </form>
</template>