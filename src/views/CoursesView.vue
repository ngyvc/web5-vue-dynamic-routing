<script setup>
import { onMounted, ref } from 'vue'
const url = ref(`https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/course?acf_format=standard`)

let wordpress = ref([])

let loaded = ref(false)

let fetchData = async () => {
    try {
        const response = await fetch(url.value)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        wordpress.value = data
        loaded.value = true
    } catch (error) {
        console.error(error)
    }
}
onMounted(() => {
    fetchData()
})
</script>

<template>
    <section class="courses">
        <h1>Courses</h1>
        <a href="https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/course?acf_format=standard" target="_blank"
            rel="noopener noreferrer">View API</a>
        <div class="courses-grid" v-if="loaded">
            <div v-for="course in wordpress" :key="course.id" class="course-card">
                <p>{{ course.name }} - id: {{ course.id }}</p>
            </div>
        </div>
    </section>
</template>