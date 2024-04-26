import { createRouter, createWebHistory } from "vue-router";

import MainLayout from '@/layouts/MainLayout.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';

const APP_NAME = 'Kelola Data Survei';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Data Survei",
            component: () => import("@/views/SurveiView.vue"),
            meta: { layout: MainLayout }
        },
        {
            path: "/admin",
            name: "Pengelolaan Data Survei",
            component: () => import("@/views/AdminView.vue"),
            meta: { layout: MainLayout }
        },
        {
            path: "/database",
            name: "Database Survei",
            component: () => import("@/views/DatabaseSurveiView.vue"),
            meta: { layout: MainLayout }
        },
        {
            path: "/pengisian/:id",
            name: "Pengisian Survei",
            component: () => import("@/views/PengisianSurveiView.vue"),
            meta: { layout: GuestLayout }
        },
        {
            path: "/hasil/survei/:id",
            name: "Hasil Pengisian Survei",
            component: () => import("@/views/HasilPengisianSurveiView.vue"),
            meta: { layout: GuestLayout }
        },
        {
            path: "/hasil/responden/:id",
            name: "Hasil Pengisian Survei Responden",
            component: () => import("@/views/HasilPengisianSurveiRespondenView.vue"),
            meta: { layout: GuestLayout }
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
