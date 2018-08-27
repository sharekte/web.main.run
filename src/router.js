import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Main from "@/components/layouts/Main";

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
                    path: "/view/:id([a-z0-9]{24})",
                    name: "view",
                    component: () => import("@/views/View")
                }, {
                    path: "/demo",
                    component: () => import("@/components/Demo")
                }, {
                    path: "/design",
                    component: () => import("@/views/Design")
                }
            ]
        }, {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login")
        }, {
            path: "*",
            name: "404",
            component: () => import("@/views/404")
        }
    ]
});
