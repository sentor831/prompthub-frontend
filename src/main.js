/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router';
import NowUiKit from './plugins/now-ui-kit';
import cookie from './utils/cookie';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.prototype.cookie = cookie;

Vue.config.productionTip = false;

Vue.use(NowUiKit);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


// /* eslint-disable no-new */
// let startApp = function(){
//   axios.get('../static/config.json').then((res)=>{
//       Vue.prototype.BASE_URL = res.data.BASE_URL;
//       new Vue({
//         router,
//         render: h => h(App)
//       }).$mount('#app');
//   });
// }
// startApp();
