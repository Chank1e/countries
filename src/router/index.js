import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/views/Home'
import Country from '@/components/views/Country'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/country/:id',
      name: 'Country',
      component: Country
    },
  ]
})
