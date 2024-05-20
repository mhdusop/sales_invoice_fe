import { createRouter, createWebHistory } from 'vue-router';

//define a routes
const routes = [
   {
      path: '/',
      name: 'home',
      component: () => import('../views/invoice/index.vue')
   },
   {
      path: '/invoice',
      name: 'invoice.index',
      component: () => import('../views/invoice/index.vue')
   },
   {
      path: '/invoice/create',
      name: 'invoice.create',
      component: () => import('../views/invoice/create.vue')
   },
   {
      path: '/invoice/edit/:id',
      name: 'invoice.edit',
      component: () => import('../views/invoice/edit.vue')
   },
   {
      path: '/invoice/detail/:id',
      name: 'invoice.detail',
      component: () => import('../views/invoice/detail.vue')
   },
   {
      path: '/:catchAll(.*)',
      name: 'pages.not-found',
      component: () => import('../pages/notFoundPage.vue')
   }
]

// create router
const router = createRouter({
   history: createWebHistory(),
   routes
})

export default router