import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Home from "@/views/Home";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
            {
              path: '/firstPicture',
              name: 'FirstPicture',
              meta: {title: '首图'},
              component: () => import('../components/FirstPicture')
            },
            {
                path: '/personal',
                name: 'PersonalInfo',
                meta: {title: '个人信息'},
                component: () => import('../components/user/PersonalInfo')
            },
            {
                path: '/apply',
                name: 'ApplyInfo',
                meta: {title: '我要申请'},
                component: () => import('../components/user/ApplyInfo')
            },
            {
                path: '/applyRecord',
                name: 'ApplyRecord',
                meta: {title: '申请记录'},
                component: () => import('../components/user/ApplyRecord')
            },
            {
                path: '/approvalRecord',
                name: 'ApprovalRecord',
                meta: {title: '审批记录'},
                component: () => import('../components/manage/ApprovalRecord')
            },
            {
                path: '/pending',
                name: 'Pending',
                meta: {title: '待审批'},
                component: () => import('../components/manage/Pending')
            },
            {
                path: '/riskArea',
                name: 'RiskArea',
                meta: {title: '风险地区'},
                component: () => import('../components/RiskArea')
            },
            {
                path: '/student',
                name: 'StudentManage',
                meta: {title: '学生管理'},
                component: () => import('../components/manage/StudentManage')
            },
            {
                path: '/health',
                name: 'HealthSituation',
                meta: {title: '健康状况'},
                component: () => import('../components/user/HealthSituation')
            },
            {
                path: '/healthManage',
                name: 'HealthManage',
                meta: {title: '健康管理'},
                component: () => import('../components/manage/HealthManage')
            },
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
