import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'
import HomePage from '@/pages/HomePage.vue'
import ProjectManager from '@/pages/projects/ProjectManager.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage},
    { path: '/users/sign_in', component: SignIn},
    { path: '/users/sign_up', component: SignUp},
    { path: '/api/v1/projects', component: ProjectManager},
    { path: '/:notFound(.*)', component: HomePage},
    
  ]
});

export default router
