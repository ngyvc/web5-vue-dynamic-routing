<script setup></script>

<template>
  <h1>Dynamic Routing Example</h1>
  <nav>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/long-page">Long Page</router-link>
      </li>
      <li>
        <router-link to="/another-long-page">Another Long Page</router-link>
      </li>
      <li>
        <router-link to="/projects">Projects</router-link>
      </li>
    </ul>
  </nav>
  <router-view />
</template>

<style scoped>
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
