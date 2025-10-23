import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailProductView from "../views/DetailProductView.vue";
import ProductView from "../views/ProductView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../components/RegisterView.vue";
import PublicLayout from "../components/layouts/PublicLayout.vue";
import DashboardLayout from "../components/layouts/DashboardLayout.vue";
import DashboardView from "../components/DashboardView.vue";
import ProfileView from "../components/ProfileView.vue";
import CreateProfile from "../components/CreateProfile.vue";
import UpdateProfileView from "../components/UpdateProfileView.vue";
import { useAuthStore } from "../store/auth";
import CategoryDashboardView from "../components/CategoryDashboardView.vue";
import PostDashboardView from "../components/PostDashboardView.vue";


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
                    component:ProductView
                },
                {
                    path:'products/:id',
                    name:'detail-product',
                    component:DetailProductView
                },
                {
                    path:'login',
                    name:'login',
                    component:LoginView,
                    meta: {
                        isPublic: true
                    }
                
                },
                {
                    path:'register',
                    name:'register',
                    component:RegisterView,
                    meta: {
                        isPublic: true
                    }
                }
            ]
        },
        {
            path:'/dashboard',
            meta:{
                isAuth: true,
            },
            component:DashboardLayout,
            children: [
                {
                    path:'',
                    name:'dashboard',
                    component:DashboardView
                },
                {
                    path:'profile',
                    name:'profile',
                    component:ProfileView
                },
                {
                    path:'profile/create',
                    name:'create-profile',
                    component:CreateProfile
                },
                {
                    path:'profile/update',
                    name:'update-profile',
                    component:UpdateProfileView
                },
                {
                    path:'category',
                    name:'category-dashboard',
                    component:CategoryDashboardView,
                    meta: {
                        isAdmin: true
                    }
                },
                {
                    path:'post',
                    name:'post-dashboard',
                    component:PostDashboardView,
                    meta: {
                        isAdmin: true
                    }
                }
            ]
        }
        
    ]
})

router.beforeEach(async(to, _) => {
    const authStore = useAuthStore()

    if(to.meta.isAuth && !authStore.token) {
        alert('Anda harus login untuk mengakses halaman ini')
        return {
            path: '/login'
        }
    }

    if(to.meta.isPublic && authStore.token) {
        alert('Anda sudah login, jadi tidak perlu login lagi')
        return {
            path: '/dashboard'
        }
    }
    
    if(to.meta.isAdmin && authStore.user?.role !== 'admin') {
        alert('halaman ini hanya bisa diakses oleh admin')
        return {
            path: '/dashboard'
        }
    }

    
})


export default router