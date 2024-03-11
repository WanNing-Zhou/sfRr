import { createApp } from 'vue';
import 'virtual:svg-icons-register';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';
// import { router } from '@/router';
import { appConfig } from '@/utils/appConfig';

const app = createApp(App);
// 使用vue-router
// app.use(router);
// 使用pinia
appConfig(app)
app.mount('#app');
