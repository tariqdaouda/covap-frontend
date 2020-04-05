import Vue from 'vue'
import VueRouter from "vue-router";
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import routes from "./routes";
import App from "./App";

Vue.config.productionTip = false;

Vue.use(VueRouter);
UIkit.use(Icons);

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');