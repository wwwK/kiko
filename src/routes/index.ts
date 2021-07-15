import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TemplateDetail from '../views/TemplateDetail.vue'
import Index from '../views/Index.vue'
import Works from '../views/Works.vue'
import axios from 'axios'
import store from '../store'
import { message } from 'ant-design-vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      component: Index,
      children: [
        { path: '', name: 'home', component: Home, meta: { title: "欢迎来到K叩" } },
        { path: 'template/:id', name: 'template', component: TemplateDetail, meta: { title: "模板详情", requiredLogin: true } },
        { path: 'works', name: 'works', component: Works, meta: { title: '我的作品', requiredLogin: true, } }
      ]
    },
    { 
      path: '/editor/:id', 
      name: 'editor',
      component: ()=> import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
      meta: { title: "编辑我的设计", requiredLogin: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: { redirectAlreadyLogin: true, title: '登录到K叩', disableLoading: true }
    }
  ]
})

router.beforeEach(async (to, from) => {
  const { user } = store.state
  const { token, isLogin } = user
  const { redirectAlreadyLogin, requiredLogin, title } = to.meta
  if (title) {
    document.title = title as string
  }
  if (!isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      try {
        await store.dispatch('fetchCurrentUser')
        if (redirectAlreadyLogin) {
          return '/'
        }
      } catch {
        message.error('登陆状态已过期 请重新登陆', 2)
        store.commit('logout')
        return '/login'
      }
    } else {
      if (requiredLogin) {
        return '/login'
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      return '/'
    }
  }
})

export default router;
