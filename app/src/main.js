import Vue from 'vue';
import App from './app.vue';
import Element from 'element-ui';

Vue.use(Element);
new Vue({
  render: (h) => h(App),
}).$mount('#app');
