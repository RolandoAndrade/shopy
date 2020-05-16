import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: () =>
        import('../views/Home.vue')
    },
    {
        path: '/products',
        name: 'Products',
        component: () =>
            import('../views/Products.vue')
    },
    {
        path: '/products/:id',
        name: 'ProductView',
        component: () =>
            import('../views/ProductView.vue'),
       
      },{
        path: '/add/product',
        name: 'AddProduct',
        component: () =>
            import('../views/AddProduct.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () =>
            import('../views/Login.vue'),
      }

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
