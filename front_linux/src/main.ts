import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js';
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入
import CryptoJS from 'crypto-js';
import './style.css'
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
app.use(ElementPlus,{
    locale: zhCn,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if(localStorage.getItem('name')){
            next();
        }else {
            if(to.path === '/login'){
                next();
            }else {
                alert('尚未登录，您只有普通用户权限！')
                next(
                    localStorage.setItem('name','visitor')
                )
                console.log("访问人员为：",localStorage.getItem('name'))
            }
        }
    }
    else {
        next();
    }
})


