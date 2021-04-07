import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/Home.vue'),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('@/views/Register.vue'),
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login.vue'),
    meta: { guest: true },
  },
  {
    path: "/posts",
    component: {
      render (c) { return c('router-view') }
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/Posts.vue'),
        name: 'Posts'
      },
      {
        path: ':id',
        component: () => import('@/views/Post.vue'),
        name: 'PostDetail'
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      if (store.getters.hasLastRoute) {
        // navigate to last route remembered
        let lastRoute = store.getters.StateLastRoute;
        store.dispatch('ResetLastRoute');
        next(lastRoute);
      } else {
        next();
      }
      return;
    }
    store.dispatch('RegisterLastRoute', to);
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/posts");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
