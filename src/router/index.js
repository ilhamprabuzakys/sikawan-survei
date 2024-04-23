import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from '@/layouts/DashboardLayout.vue';

const APP_NAME = 'Kelola Data Survei';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Data Survei",
            component: () => import("@/views/SurveiView.vue"),
            meta: { layout: DashboardLayout }
        },
        {
            path: "/admin",
            name: "Pengelolaan Data Survei",
            component: () => import("@/views/AdminView.vue"),
            meta: { layout: DashboardLayout }
        },
        {
            path: "/database",
            name: "Database Survei",
            component: () => import("@/views/DatabaseSurveiView.vue"),
            meta: { layout: DashboardLayout }
        },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
});

router.beforeEach((to, from, next) => {
    document.title = `${to.name} - ${APP_NAME}`;
    next();
});

export default router;
