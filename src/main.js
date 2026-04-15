// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { createApp } from 'vue';
import App from './App.vue';
import _ from './libraries/lodash.custom.min';

const app = createApp(App);
app.config.productionTip = false;
app.mount('#app');
