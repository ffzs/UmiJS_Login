import { defineConfig } from 'umi';

export default defineConfig({
  // hash: true,
  antd: {},
  dva: {
    immer: true,
    hmr: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/Login/index'},
    {
      path: '/',
      component: '@/layouts/index',
      wrappers: ['@/wrappers/auth'],
      routes: [
        { path: '/user', component: '@/pages/index' },
      ],
    },
  ],
});

