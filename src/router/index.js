import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      label: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/long-page",
      name: "LongPage",
      label: "Long Page",
      component: () => import("../views/LongPageView.vue"),
    },
    {
      path: "/another-long-page",
      name: "AnotherLongPage",
      label: "Another Long Page",
      component: () => import("../views/AnotherLongPageView.vue"),
    },
  ],
});

export default router;
