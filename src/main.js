import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from "@/utils/request";


Vue.config.productionTip = false
Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
  if (window.sessionStorage.getItem('tokenStr')) {
    //判断用户信息是否存在
    if (!window.sessionStorage.getItem('user')){
      return postRequest('/getUserInfo').then(resp=>{
        if (resp){
          //存入用户信息
          window.sessionStorage.setItem('user',JSON.stringify(resp));
          next();
        }
      })
    }
    next();
  } else {
    if (to.path==='/'){
      next();
    }
  }
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
