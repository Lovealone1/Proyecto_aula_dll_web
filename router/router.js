import Vue from 'vue';
import Router from 'vue-router';
import index from './pages/index.vue'
import Login from './pages/login.vue'

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/',
        redirect: '/index', // Redirige la página de inicio al login
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      }
    ],
  });