import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mint from 'mint-ui';
import 'mint-ui/lib/style.min.css';
import '@/assets/font/iconfont.css';
import axios from 'axios';

Vue.prototype.$ajax = axios;

Vue.use(mint);

Vue.filter('changeSize',(data,size=400)=>{
  if(data){
    return data.replace('{size}',size);
  }else{
    return data;
  }
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
