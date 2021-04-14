import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:type',
    name: 'Type',
    component: () => import(/* webpackChunkName: "about" */ '../views/Type.vue')
  },
  {
    path: '/film/:name',
    name: 'Film',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Film.vue')
  },
  {
    path: '/search/:query',
    name: 'SearchPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchPage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
