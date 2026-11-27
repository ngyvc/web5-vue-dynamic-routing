<script setup>

import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const url = ref(`https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/course/?slug=${route.params.slug}&acf_format=standard`)

let category = ref([])

let loaded = ref(false)

let fetchCategory = async () => {
    try {
        const response = await fetch(url.value)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        category.value = data

        // If the data is empty, redirect to the 404 page
        if (category.value.length === 0) {
            router.push({ override: true, path: '/404' })
            return
        }
        loaded.value = true
    } catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    fetchCategory()
})

watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            loaded.value = false
            url.value = `https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/course/?slug=${newSlug}&acf_format=standard`
            fetchCategory()
        }
    }
)

</script>

<template>
    <section class="single-project" v-if="loaded">
        <h1>{{ category[0]?.slug }} - {{ category[0]?.id }}</h1>
    </section>
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>
