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
        name: 'ProductsView',
        component: () =>
            import('../views/ProductsView.vue')
    },
    {
        path: '/products/:id',
        name: 'ProductView',
        component: () =>
            import('../views/ProductDetailView.vue'),
       
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
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () =>
            import('../views/SignUp.vue'),
        },{
        path: '/cart',
        name: 'Cart',
        component: () =>
            import('../views/Cart.vue'),
      },
      {

        path: '/edit/product',
        name: 'MyProducts',
        component: () =>
            import('../views/MyProducts.vue'),
      },
      ,{
        path: '/orders',
        name: 'Orders',
        component: () =>
            import('../views/Orders.vue'),

      },{
          path:'*',
          name:'NotFound',
          redirect:'/'
      }

];



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    
});

router.beforeEach((to,from, next)=>{
    window.scrollTo(0,0);
    next();
})

export default router;
