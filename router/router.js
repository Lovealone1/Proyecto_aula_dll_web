import Vue from 'vue';
import Router from 'vue-router';
import Login from './pages/login.vue';
import Register from './pages/register.vue';
import PanelProducto from '/components/panel_producto.vue';
import CrearProducto from '@/components/CrearProducto.vue'; // Asegúrate de tener la ruta correcta
import EditarProducto from '@/components/edit_producto.vue';
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
    },
    {
      path: '/panel-producto',
      name: 'panel-producto',
      component: PanelProducto,
    },
    {
      path: '/crear-producto', // Agregamos la ruta para crear un producto
      name: 'crear-producto',
      component: CrearProducto,
    },
    {
      path: '/editar-producto/', // Ruta para editar un producto, asumiendo que pasamos un parámetro 'id'
      name: 'editar-producto',
      component: EditarProducto,
    },
    {
      path: '/register/', // Ruta para editar un producto, asumiendo que pasamos un parámetro 'id'
      name: 'register',
      component: Register,
    }
  ],
});
