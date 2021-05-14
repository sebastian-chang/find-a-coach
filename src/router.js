import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index'

import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegister from './pages/coaches/CoachRegister.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestReceived from './pages/requests/RequestReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id', component: CoachDetail, props: true, children: [
        { path: 'contact', component: ContactCoach }, // address example /coaches/c1/contact
      ]
    },
    { path: '/register', component: CoachRegister, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ]
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuth) {
    next('/auth')
  }
  else if (to.meta.requiresUnAuth && store.getters.isAuth) {
    next('/coaches')
  }
  else {
    next()
  }
})

export default router
