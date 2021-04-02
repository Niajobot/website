import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SuggestionPage from "@/views/SuggestionPage.vue";
import HomePage from "@/views/Home.vue";
import Streamer from "@/views/Streamer.vue";
import HistoriquePage from "@/views/HistoriquePage.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/:streamer',
        name: 'Streamer',
        component: Streamer,
        children: [{
            path: 'suggestions',
            name: 'Suggestions',
            component: SuggestionPage
        },
            {
                path: 'historique',
                name: 'Historique',
                component: HistoriquePage
            },
            {
                path: '',
                redirect: {name: 'Suggestions'}
            }]
    },
    {
        path: '/',
        name: 'Home',
        component: HomePage
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

export default new VueRouter({
    routes,
    mode: 'history'
})

// export default router
