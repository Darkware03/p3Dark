import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/download',component: () => import('pages/download.vue') },
      { path: '/download/detalles/:id',component: () => import('pages/detalles.vue') },
      { path: '/top',component: () => import('pages/top.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
];

export default routes;
