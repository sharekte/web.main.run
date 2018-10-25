import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Main from "@/components/layouts/Main.vue";

export default new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: "/",
            component: Main,
            children: [
                {
                    path: "",
                    name: "home",
                    component: () => import("@/views/Home")
                }, {
                    path: "/p/:id([a-z0-9]{24})",
                    name: "post",
                    component: () => import("@/views/Post")
                }, {
                    path: "/about",
                    name: "about",
                    component: () => import("@/views/About")
                }, {
                    path: "/demo",
                    component: () => import("@/components/Demo")
                }, {
                    path: "/design",
                    component: () => import("@/views/Design")
                }
            ]
        }, {
            path: "*",
            name: "page404",
            component: () => import("@/views/404")
        }
    ]
});
