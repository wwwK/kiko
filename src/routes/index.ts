import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TemplateDetail from '../views/TemplateDetail.vue'
import Editor from '../views/Editor.vue'
import Index from '../views/Index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      component: Index,
      children: [
        { path: '', name: 'home', component: Home, meta: { title: "欢迎来到ki叩" } },
        { path: 'template/:id', name: 'template', component: TemplateDetail, meta: { title: "模板详情" } }
      ]
    },
    { 
      path: '/editor/:id', 
      name: 'editor',
      component: ()=> import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
      meta: { title: "编辑我的设计" }
    },
  ]
})
export default router;
