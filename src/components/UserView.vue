<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useAuthStore } from '../store/auth';
import customApi from '../utils/api';
import Loading from './Loading.vue';
import ErrorComponent from './ErrorComponent.vue';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pagination from './Pagination.vue';

const authStore = useAuthStore()
const route = useRoute()
const queryClient = useQueryClient()

const skip = computed(() => parseInt(route.query.skip as string) || 0)
const limit = computed(() => parseInt(route.query.limit as string) || 15)
const total = computed(() => data.value?.total || 0)

const fetchDataUser = async () => {
    const { data } = await customApi.get('/users', {
        params: {
            skip: skip.value,
            limit: limit.value
        },
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
    return data
}

const { data, isLoading, error } = useQuery({
    queryKey: ['users', skip, limit],
    queryFn: fetchDataUser
})

const showForm = ref(false)
const role = ref<null | string>('')
const name = ref<null | string>('')
const isUpdate = ref(false)
const id = ref<null | string>(null)


const updateRoleMutation = useMutation({
    mutationFn: async () => {
        await customApi.put(`/users/${authStore.user?.id}`, {
            role: role.value
        }, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
    },
    onSuccess: () => {
        showForm.value = false
        alert('berhasil mengupdate role')
        queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (err) => {
        console.log(err)
    }
})

const showEditForm = (item: { id: string, firstName: string, lastName: string, role: string }) => {
    showForm.value = true
    role.value = item.role
    name.value = item.firstName + ' ' + item.lastName
    id.value = item.id
    isUpdate.value = true
}

const handleUpdate = () => {
    updateRoleMutation.mutate()
}

</script>

<template>
    <h1 class="text-2xl font-bold text-info">
        User
    </h1>
    <div v-if="showForm">
        <fieldset class="fieldset bg-base-300 border-info rounded-box border p-4">
            <form @submit.prevent="handleUpdate">
                <h1 class="text-xl font-bold"> Update Role Name : {{ name }}</h1>
                <label class="label">Email</label>
                <select v-model="role" class="select w-full">
                    <option value="user" :selected="role === 'user'">User</option>
                    <option value="admin" :selected="role === 'admin'">Admin</option>
                    <option value="moderator" :selected="role === 'moderator'">Moderator</option>
                </select>
                <button type="submit" class="btn btn-sm btn-primary mt-4">Update</button>
            </form>
        </fieldset>
    </div>
    <div v-if="isLoading">
        <Loading />
    </div>
    <div v-else-if="error">
        <ErrorComponent />
    </div>
    <div v-else>
        <div class="overflow-x-auto">
            <div v-if="data.users.length">
                <table class="table table-zebra">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="(item, index) in data.users" :key="item.id">
                            <th>{{ skip + index + 1 }}</th>
                            <td>{{ item.firstName }} {{ item.lastName }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.age }}</td>
                            <td>
                                <span class="badge" :class="{
                                    'badge-primary': item.role === 'admin',
                                    'badge-secondary': item.role === 'moderator',
                                    'badge-accent': item.role === 'user',
                                }
                                    ">
                                    {{ item.role }}</span>
                            </td>
                            <td><button class="btn btn-primary btn-sm" @click="showEditForm(item)">Update</button></td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex justify-center">
                    <Pagination class="my-3" :limit="limit" :skip="skip" :total="total" />
                </div>
            </div>
            <div v-else>
                Dara not found
            </div>
        </div>
    </div>
</template>