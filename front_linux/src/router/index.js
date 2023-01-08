import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        meta: {title: '登录'},
        component: () => import('../views/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {title: '注册',requireAuth:true},
        component: () => import('../views/register.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta: {title: '首页',requireAuth:true},
        redirect: localStorage.getItem('name')=='visitor'?'/dataAnalysis/dataSharing':"/deepModel",
        component: () => import('../views/home.vue'),
        children: [
            {
                path: '/dataAnalysis',
                name: 'dataAnalysis',
                meta: {title: '多源时空数据'},
                component: () => import('../components/stData/stData.vue'),
                children: [
                    {
                        path: '/dataAnalysis/view',
                        name: 'view',
                        meta: {title: '数据查看'},
                        component: () => import('../components/stData/dataView.vue')
                    },
                    {
                        path: '/dataAnalysis/analysis',
                        name: 'analysis',
                        meta: {title: '数据分析'},
                        component: () => import('../components/stData/dataAnalysis.vue')
                    },
                    {
                        path: '/dataAnalysis/pretreatment',
                        name: 'pretreatment',
                        meta: {title: '数据预处理'},
                        component: () => import('../components/stData/dataPretreatment.vue')
                    },
                    {
                        path: '/dataAnalysis/dataSharing',
                        name: 'dataSharing',
                        meta: {title: '数据共享'},
                        component: () => import('../components/stData/dataSharing.vue')
                    },
                ]
            },

            {
                path: '/deepModel',
                name: 'deepModel',
                meta: {title: '时空过程模型'},
                component: () => import('../components/deepModel/deepModel.vue')
            },
            {
                path: '/distributedComputing',
                name: 'distributedComputing',
                meta: {title: '分布式计算'},
                component: () => import('../components/stData/stData.vue'),
                children: [
                    {
                        path: '/distributedComputing/computing',
                        name: 'distributedComputing',
                        meta: {title: '分布式计算'},
                        component: () => import('../components/distributedComputing/computing.vue'),
                    },
                    {
                        path: '/distributedComputing/incremental',
                        name: 'incrementalLearning',
                        meta: {title: '增量学习'},
                        component: () => import('../components/distributedComputing/incremental.vue'),
                    },
                    {
                        path: '/distributedComputing/onlineFileEdit',
                        name: 'onlineFileEdit',
                        meta: {title: '代码在线编辑'},
                        component: () => import('../components/distributedComputing/onlineFileEdit.vue'),
                    },
                ]
            },

            {
                path: '/application',
                name: 'application',
                meta: {title: '产品示范'},
                component: () => import('../components/pilotApplication/application.vue'),
                children: [
                    {
                        path: '/application/productApplication',
                        name: 'productApplication',
                        meta: {title: '示范应用'},
                        component: () => import('../components/pilotApplication/productApplication.vue'),
                    },
                    {
                        path: '/application/applicationShow',
                        name: 'applicationShow',
                        meta: {title: '示范应用'},
                        component: () => import('../components/pilotApplication/applicationShow.vue'),
                    },
                    {
                        path: '/application/applicationDownload',
                        name: 'applicationDownload',
                        meta: {title: '示范应用'},
                        component: () => import('../components/pilotApplication/applicationDownload.vue'),
                    },
                ]
            },

            {
                path: '/setting',
                name: 'setting',
                meta: {title: '设置'},
                component: () => import('../components/setting/setting.vue'),
                children: [
                    {
                        path: '/setting/modelSetting',
                        name: 'modelSetting',
                        meta: {title: '模型设置'},
                        component: () => import('../components/setting/modelSetting.vue'),
                    },
                    {
                        path: '/setting/userSetting',
                        name: 'userSetting',
                        meta: {title: '用户设置'},
                        component: () => import('../components/setting/userSetting.vue'),
                    },
                    {
                        path: '/setting/databaseSetting',
                        name: 'databaseSetting',
                        meta: {title: '数据库适配'},
                        component: () => import('../components/setting/databaseSetting.vue'),
                    },
                ]
            },
        ]
    },
    {
        path: '/test',
        name: 'test',
        meta: {title: '测试'},
        component: () => import('../components/distributedComputing/onlineFileEdit.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
