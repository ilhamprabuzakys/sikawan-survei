import { createRouter, createWebHistory } from "vue-router";

import AppGuestLayout from '@/layouts/AppGuestLayout.vue';

const APP_NAME = 'Kelola Data Survei';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Data Survei",
            component: () => import("@/views/SurveiView.vue"),
            meta: { layout: AppGuestLayout }
        },
        {
            path: "/admin",
            name: "Pengelolaan Data Survei",
            component: () => import("@/views/AdminView.vue"),
            meta: { layout: AppGuestLayout }
        },
    ],
    linkActiveClass: 'text-secondary',
    linkExactActiveClass: 'exact-active',
});

router.beforeEach((to, from, next) => {
    document.title = `${to.name} - ${APP_NAME}`;
    next();
});

export default router;
