import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'
import HomePage from '@/pages/HomePage.vue'
import ProjectManager from '@/pages/projects/ProjectManager.vue'
import ProjectDetail from '@/pages/projects/ProjectDetail.vue'
import TeamManager from '@/pages/teams/TeamManager.vue'
import TeamDetail from '@/pages/teams/TeamDetail.vue'
import NotFound from '@/components/layouts/NotFound.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage},
    { path: '/users/sign_in', component: SignIn},
    { path: '/users/sign_up', component: SignUp},
    { path: '/api/v1/teams', component: TeamManager},
    {
      path: '/api/v1/teams/:team_id',
      component: TeamDetail,
     
    },
    {path: '/api/v1/projects', component: ProjectManager,
      children: [
        { path: ':id', component: ProjectDetail },
      ]
    },
    { path: '/api/v1/browse/projects/:id/', component: ProjectDetail},
    { path: '/:notFound(.*)', component: NotFound},

  ]
});

export default router
