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

        console.log(`Fetching projects for course ID: ${category.value[0]?.id}`)

        fetchProjectsByCategoryId(category.value[0]?.id)
    } catch (error) {
        console.error(error)
    }
}


let projects = ref([])

let projectsLoaded = ref(false)

let fetchProjectsByCategoryId = async (id) => {
    try {
        const response = await fetch(`https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/project?course=${id}&acf_format=standard`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        projects.value = data
        projectsLoaded.value = true
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
        <div class="projects-grid" v-if="projectsLoaded">
            <div v-for="project in projects" :key="project.id" class="project-card">
                <h2>{{ project.title.rendered }}</h2>
                <p>{{ project.acf.description ? project.acf.description : 'No description available' }}</p>
                <img :src="project.acf.preview_image?.url ? project.acf.preview_image?.url : 'https://placehold.co/600x400?text=404'"
                    alt="Project Image" />
            </div>
        </div>
    </section>
</template>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>
