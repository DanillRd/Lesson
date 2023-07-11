import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginForm.vue';
import MoviePage from './components/MoviePage.vue';

const routes = [
    { path: '/', component: LoginPage },
    { path: '/MoviePage', component: MoviePage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;






