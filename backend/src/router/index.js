import {createRouter, createWebHistory} from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import RequestPassword from "../views/RequestPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store";

const routes = [
  {
    path: '/app',
    name: 'app',
    component: AppLayout,
    meta:{
      requiresAuth:true
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component:Dashboard
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta:{
          requireGuest:true
        }
      },
      {
        path: '/request-password',
        name: 'requestPassword',
        component: RequestPassword,
        meta:{
          requireGuest:true
        }
      },
      {
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword,
        meta:{
          requireGuest:true
        }
      },
      {
        path: '/:pathMatch(.*)',
        name: 'notfound',
        component: NotFound,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes

})

  
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'login'})
  } else if (to.meta.requiresGuest && store.state.user.token) {
    next({name: 'app.dashboard'})
  } else {
    next();
  }

})

export default router;