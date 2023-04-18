import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import HomePage from '@/views/HomePage.vue'
import ProjectManager from '@/views/projects/ProjectManager.vue'
import ProjectDetail from '@/views/projects/ProjectDetail.vue'
import TeamManager from '@/views/teams/TeamManager.vue'
import TeamDetail from '@/views/teams/TeamDetail.vue'
import TaskDetail from '@/views/tasks/TaskDetail.vue'
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
    {path: '/api/v1/projects', component: ProjectManager, name: "addProject",
      children: [
        { path: ':id', component: ProjectDetail, name: "addProject" }
      ]
    },
    { path: '/api/v1/browse/projects/:id/', component: ProjectDetail, name: "browse",
    children: [
      { path: 'tasks/:task_id', component: TaskDetail }
    ]
    },
    { path: '/:notFound(.*)', component: NotFound},
    { path: '/api/v1/browse/projects/:project_id/project_tasks/:task_id', component: TaskDetail},
  ]
});

export default router
