import { defineStore } from "pinia";


interface User {
    id:         number;
    firstName:  string;
    lastName:   string;
    maidenName: string;
    age:        number;
    gender:     string;
    email:      string;
    phone:      string;
    username:   string;
    password:   string;
    birthDate:  string;
    image:      string;
    bloodGroup: string;
    height:     number;
    weight:     number;
    eyeColor:   string;
    role:       string;
}


export const useAuthStore = defineStore('auth' , {
    state: () => ({
        token: null as string | null,
        user: null as User | null,
    }),
    actions: {
        setAuth(token:string , user:User){
            this.token = token
            this.user = user
        },
        removeAuth() {
            this.token = null,
            this.user = null
        }
    },
    persist: true
})