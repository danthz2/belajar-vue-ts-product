<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import customApi from '../utils/api';
import { useQuery } from '@tanstack/vue-query';

const fetchDataCategory = async () => {
    const { data } = await customApi.get('/products/categories')
    return data
}

const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchDataCategory
})

const postData = reactive({
    title: '',
    category: '',
    content: '',
    image: null as (File | null),
    tags: [] as string[]
})

// Event
const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        postData.image = target.files[0]
        console.log(postData.image)
    }
}

const tagInput = ref('')

const tags = computed(() => {
    return tagInput.value
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
})

const submit = () => {
    postData.tags = tags.value
    console.log(postData)
}

</script>

<template>
    <form class="my-3" @submit.prevent="submit">
        <fieldset class="fieldset bg-base-200 border-info rounded-box border p-4">
            <label class="label">Title</label>
            <input type="text" v-model="postData.title" class="input w-full" placeholder="Title" />
            <label class="label">Category</label>
            <select v-model="postData.category" class="select w-full">
                <option disabled value="" hidden>Choose Category</option>
                <option v-if="isLoading">Loading...</option>
                <option v-else-if="error">Category error</option>
                <option v-else v-for="category in data" :value="category.slug" :key="category.slug">
                    {{ category.name }}
                </option>
            </select>


            <label class="label">Image</label>
            <input type="file" @change="handleImageChange" class="file-input w-full">
            <label class="label">Body</label>
            <textarea v-model="postData.content" class="textarea w-full h-[40vh]"></textarea>
            <label class="label">Tag (separated with comma)</label>
            <input type="text" v-model="tagInput" class="input w-full" placeholder="ex: vue,reactjs,typescript">
            {{ tags }}
            <button class="btn btn-primary mt-10">Create</button>
        </fieldset>
    </form>
</template>