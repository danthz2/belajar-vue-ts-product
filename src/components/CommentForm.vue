<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import customApi from '../utils/api';
import { useAuthStore } from '../store/auth';
import { ref } from 'vue';

const authStore = useAuthStore()
const queryClient = useQueryClient()
const content = ref('')

interface ProductProps {
    productId: string | string[],
    isUpdate: boolean,
    content?: string
}

const props = defineProps<ProductProps>()

const createOrUpdateMutation = useMutation({
    mutationFn: async () => {
        await customApi.post(`/comments/add`, {
            body: content.value,
            postId: props.productId,
            userId: authStore.user?.id
        }, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['productDataDetail'] })
        content.value = ''
        alert('add comment successfully')
    },
    onError: (err) => {
        console.log(err)
    }
})

const handleSubmit = () => {
    createOrUpdateMutation.mutate()
}
</script>
<template>
    <fieldset class="fieldset bg-base-300 my-3 border-info rounded-box w- border p-4">

        <form @submit.prevent="handleSubmit">
            <textarea v-model="content" class="textarea w-full h-32" placeholder="Fill your comment"></textarea>

            <div class="flex justify-end">
                <button type="submit" class="btn btn-primary my-4">Submit</button>
            </div>
        </form>
    </fieldset>
</template>