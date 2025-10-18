import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailPostView from "../views/DetailProductView.vue";
import PostView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../components/RegisterView.vue";
import PublicLayout from "../components/layouts/PublicLayout.vue";
import DashboardLayout from "../components/layouts/DashboardLayout.vue";
import DashboardView from "../components/DashboardView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:'/',
            component:PublicLayout,
            children: [
                {
                    path:'',
                    name:'home',
                    component:HomeView
                },
                {
                    path:'products',
                    name:'products',
                    component:PostView
                },
                {
                    path:'products/:id',
                    name:'detail-product',
                    component:DetailPostView
                },
                {
                    path:'login',
                    name:'login',
                    component:LoginView
                
                },
                {
                    path:'register',
                    name:'register',
                    component:RegisterView
                }
            ]
        },
        {
            path:'/dashboard',
            component:DashboardLayout,
            children: [
                {
                    path:'',
                    name:'dashboard',
                    component:DashboardView
                }
            ]
        }
        
    ]
})


export default router