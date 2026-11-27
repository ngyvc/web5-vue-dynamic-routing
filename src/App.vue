<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref([])

onMounted(() => {
  fetch('https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/project/?acf_format=standard')
    .then(response => response.json())
    .then(data => {
      projects.value = data
    })
})

const courses = ref([])
onMounted(() => {
  fetch('https://ngy.582helvetica.com/wp-portfolio/wp-json/wp/v2/course?acf_format=standard')
    .then(response => response.json())
    .then(data => {
      courses.value = data
    })
})
</script>

<template>
  <h1>Dynamic Routing Example</h1>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <!-- <li>
        <router-link to="/long-page">Long Page</router-link>
      </li>
      <li>
        <router-link to="/another-long-page">Another Long Page</router-link>
      </li>
      <li>
        <router-link to="/projects">Projects</router-link>
      </li>
      <li>
        <router-link to="/project/bruce">Project: Bruce</router-link>
      </li>
      <li v-for="project in projects" :key="project.id">
        <router-link :class="{ active: router.currentRoute.value.path === `/project/${project.slug}` }"
          :to="`/project/${project.slug}`">{{ project.title.rendered }}</router-link>
      </li> -->
      <li>
        <router-link to="/courses">Courses</router-link>
      </li>
      <li v-for="course in courses" :key="course.id">
        <router-link :class="{ active: router.currentRoute.value.path === `/course/${course.slug}` }"
          :to="`/course/${course.slug}`">{{ course.name }}</router-link>
      </li>
    </ul>
  </nav>
  <transition name="fade" mode="out-in">
    <router-view :key="router.currentRoute.value.fullPath" />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f8f8;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0.9;

  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 1rem;

      :hover,
      .active {
        color: blue;
      }
    }
  }
}
</style>
