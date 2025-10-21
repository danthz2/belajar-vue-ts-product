<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import customApi from '../utils/api';
import Loading from './Loading.vue';
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';

// state
const showForm = ref<Boolean>(false)
const name = ref<string>('')
const isUpdate = ref<Boolean>(false)
const id = ref<null | string>(null)

const authStore = useAuthStore()
const queryClient = useQueryClient()

//event
const showCreateFrom = () => {
    showForm.value = true
    name.value = ''
    isUpdate.value = false
    id.value = null
}

const createCategoryMutation = useMutation({
    mutationFn: async () => {
        await customApi.post('/category',
            {
                name: name.value
            },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }
        )
    },
    onSuccess: () => {
        closeFormCategory()
        alert('berhasil membuat kategori')
        queryClient.invalidateQueries({ queryKey: ['category'] })

    },
    onError: (err) => {
        console.log(err)
    }
})
const updateCategoryMutation = useMutation({
    mutationFn: async () => {
        await customApi.put(`/category/${id.value}`,
            {
                name: name.value
            },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }
        )
    },
    onSuccess: () => {
        closeFormCategory()
        alert('berhasil perbarui kategori')
        queryClient.invalidateQueries({ queryKey: ['category'] })

    },
    onError: (err) => {
        console.log(err)
    }
})

const showUpdateFrom = (item: { name: string, id: string }) => {
    showForm.value = true
    name.value = item.name
    isUpdate.value = true
    id.value = item.id
}

const handleSubmit = () => {
    if (isUpdate.value === true) {
        updateCategoryMutation.mutate()
    } else {
        createCategoryMutation.mutate()
    }
}

const handleDelete = async (id: string) => {
    if (confirm("yakin ingin hapus? ")) {
        await customApi.delete(`/category/${id}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
    }
    alert('Berhasil hapus kategori')
    refetch()
}

const closeFormCategory = () => {
    showForm.value = false
}

const fetchCategory = async () => {
    const { data } = await customApi.get('/products/categories')
    return data;

}

const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['category'],
    queryFn: fetchCategory
})

</script>


<template>
    <h1 class="font-bold text-2xl mb-3">Category</h1>
    <button class="btn btn-primary my-3" @click="showCreateFrom">Tambah</button>
    <!-- Form -->
    <div class="my-5" v-if="showForm">
        <fieldset class="fieldset bg-base-300 border-info rounded-box border p-4">
            <h1 class="text-info text-xl">{{ isUpdate ? 'Update Category' : "Create Category" }}</h1>
            <form @submit.prevent="handleSubmit">
                <input type="text" class="input w-full" placeholder="Masukan nama kategori " v-model="name" />

                <div class="flex gap-x-3">
                    <button class="btn btn-neutral mt-4" type="submit">{{ isUpdate ? 'Update' : "Create" }}</button>
                    <button class="btn btn-error mt-4" type="button" @click="closeFormCategory">Batal</button>
                </div>
            </form>
        </fieldset>
    </div>
    <!-- /Form -->
    <div class="overflow-x-auto">
        <table class="table table-zebra">
            <!-- head -->
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Action</th>

                </tr>
            </thead>
            <tbody>
                <tr v-if="isLoading">
                    <td colspan="3" class="text-center">
                        <Loading /> Loading ...
                    </td>
                </tr>
                <tr v-else-if="error">
                    <td colspan="3" class="text-center">Something wrong, please contact admin</td>
                </tr>
                <tr v-else-if="data.length === 0">
                    <td colspan="3" class="text-center">Data not found</td>
                </tr>
                <tr v-for="(item, index) in data" :key="item.slug">
                    <th>{{ index + 1 }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.slug }}</td>
                    <td>
                        <div class="flex gap-x-3">
                            <button class="btn btn-secondary btn-sm" type="button"
                                @click="showUpdateFrom({ name: item.name, id: item.slug })">Update</button>
                            <button class="btn btn-error btn-sm" type="button"
                                @click="handleDelete(item.slug)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>