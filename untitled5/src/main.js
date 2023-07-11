import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируйте объект router из файла router.js

const app = createApp(App);
app.use(router);
app.mount('#app');





