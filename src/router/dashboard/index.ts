import type { RouteRecordRaw } from "vue-router";
import UserManagement from "../../components/dashboard/UserManagement.vue";
import Dashboard from "../../pages/Dashboard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { breadcrumb: "Dashboard" },
    redirect: "/dashboard/user-management",
    children: [
      {
        path: "user-management",
        name: "UserManagement",
        component: UserManagement,
        meta: { breadcrumb: "User Management" },
      },
    ],
  },
];

export default routes;
