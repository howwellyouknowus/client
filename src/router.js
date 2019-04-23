import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about/:id',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/games/:id',
      name: 'game',
      component: () => import('./views/Game.vue'),
    },
    {
      path: '/rooms',
      name: 'listRoom',
      component: () => import(/* webpackChunkName: "about" */ './views/Rooms.vue'),
    },
    {
      path: '/rooms/:id',
      name: 'room',
      component: () => import(/* webpackChunkName: "about" */ './views/Room.vue'),
    },
  ],
});
