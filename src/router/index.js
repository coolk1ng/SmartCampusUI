import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "@/views/HomePage";
import StudentManage from "@/components/StudentManage";
import Login from "@/views/Login";
import Unapproved from "@/components/Unapproved";
import UserManage from "@/components/UserManage";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/homePage',
        name: 'HomePage',
        component: HomePage,
        children:[
            {
                path: '/userManage',
                name: 'UserManage',
                component: UserManage
            },
            {
                path: '/studentManage',
                name: 'StudentManage',
                component: StudentManage
            },
            {
                path: '/unapproved',
                name: 'Unapproved',
                component: Unapproved
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
