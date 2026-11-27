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
    {
      path: "/projects",
      name: "Projects",
      label: "Projects",
      component: () => import("../views/ProjectsView.vue"),
    },
    {
      path: "/project/:slug",
      name: "Project",
      label: "Project",
      component: () => import("../views/ProjectView.vue"),
    },
    {
      path: "/404",
      name: "NotFound",
      label: "Not Found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Preserve scroll position when using browser back/forward buttons
    if (savedPosition) {
      return savedPosition;
    }
    // Always scroll to top for new routes
    return { top: 0 };
  },
});

export default router;
