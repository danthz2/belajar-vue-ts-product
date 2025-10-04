import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailPostView from "../views/DetailProductView.vue";
import PostView from "../views/ProductView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            name:'home',
            component:HomeView
        },
        {
            path:'/products',
            name:'products',
            component:PostView
        },
        {
            path:'/products/:id',
            name:'detail-product',
            component:DetailPostView
        }
    ]
})


export default router