import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import HomePage from '@/views/HomePage.vue'
import ProjectManager from '@/views/projects/ProjectManager.vue'
import ProjectDetail from '@/views/projects/ProjectDetail.vue'
import TeamManager from '@/views/teams/TeamManager.vue'
import TeamDetail from '@/views/teams/TeamDetail.vue'
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
    { path: '/api/v1/browse/projects/:id/', component: ProjectDetail, name: "browse"},
    { path: '/:notFound(.*)', component: NotFound},

  ]
});

export default router
