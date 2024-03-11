import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
// import { router } from '@/router';
import store from '@/store';
import { appConfig } from '@/utils/appConfig';
import 'virtual:svg-icons-register';

const app = createApp(App);
// 使用vue-router
// app.use(router);
// 使用pinia
app.use(store);
appConfig(app)
app.mount('#app');
