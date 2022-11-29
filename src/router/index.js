import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthorizeView from "@/views/AuthorizeView";
import WarrantyAllView from "@/views/WarrantyAllView";
// import HelloWorld from "@/components/HelloWorld";

import store from "../store";
import ProfileView from "@/views/ProfileView";
import WarrantyOneView from "@/views/WarrantyOneView";
import WarrantyClaimView from "@/views/WarrantyClaimView";
import RegisterView from "@/views/RegisterView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: AuthorizeView
    },
    {
        path: '/register',
        name: "register",
        component: RegisterView
    },
    {
        path: '/',
        name: 'warrantyAll',
        component: WarrantyAllView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/warranty/:id',
        component: WarrantyOneView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/warranty/claim/:id/:mId',
        component: WarrantyClaimView,
        meta: {
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


export default router



router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {

        // if (window.$cookies.get('token') === null) {
        if (localStorage.getItem("token") === null) {
            next('/auth')
        } else {
            next()
        }
    } else {
        if ((to.path === '/auth' || to.path === '/register') && store.getters.getLoggedIn === true) {
            next('/')
        } else {
            next()
        }
    }
})


