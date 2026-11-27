<script setup>

import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const url = ref(`https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/project?slug=${route.params.slug}&acf_format=standard`)

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

    // If the data is empty, redirect to the 404 page
    if (wordpress.value.length === 0) {
      router.push({ override: true, path: '/404' })
      return
    }
    loaded.value = true
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchData()
})

watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      loaded.value = false
      url.value = `https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/project?slug=${newSlug}&acf_format=standard`
      fetchData()
    }
  }
)

</script>

<template>
  <section class="single-project" v-if="loaded">
    <h1>{{ wordpress[0]?.title?.rendered }}</h1>
    <p>{{ wordpress[0]?.content?.rendered }}</p>
    <img
      :src="wordpress[0]?.acf.preview_image?.url ? wordpress[0]?.acf.preview_image?.url : 'https://placehold.co/600x400?text=404'"
      alt="Project Image" />
  </section>
</template>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
