import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import dashboardRoutes from "./dashboard";

export const routes: RouteRecordRaw[] = [
  { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
  ...dashboardRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
