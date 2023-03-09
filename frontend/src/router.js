import SessionManager from '@/store/modules/sessionManager'
import { createRouter, createWebHistory } from 'vue-router'
import TestingTesting from '@/pages/TestingTesting.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/'},
    { path: '/users/sign_in', component: SessionManager},
    { path: '/users/sign_up', component: TestingTesting},
    { path: '/testing', component: TestingTesting},
  ]
});

export default router
