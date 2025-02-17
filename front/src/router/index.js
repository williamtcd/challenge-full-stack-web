import { createWebHistory, createRouter } from 'vue-router'

import Login from '@/pages/login.vue'
import Err404 from '@/pages/404.vue'
import Students from '@/pages/students.vue'
import EditStudent from '@/pages/editStudent.vue'
import Home from '@/pages/home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/alunos',
      name: 'students',
      component: Students
    },
    {
      path: '/aluno/:id?',
      name: 'editStudent',
      component: EditStudent
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: Err404
    }
  ]
})
router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('token')
  if ((to.name !== 'login') && !hasToken) next({ name: 'login' })
  else next()
})

export default router
