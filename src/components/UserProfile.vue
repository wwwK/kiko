<template>
  <router-link to="/login" v-if="!user.isLogin">
    <a-button
      type="primary"
      class="user-profile-component"
    >
      登录
    </a-button>
  </router-link>
  <div v-else>
    <a-dropdown-button  class="user-profile-component">
      <router-link to="/setting">{{user.data.nickName}}</router-link>
      <template v-slot:overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="createDesign">创建作品</a-menu-item>
          <a-menu-item key="1"><router-link to="/works" >我的作品</router-link></a-menu-item>
          <a-menu-item key="2" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserProps } from '../store/user'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name:'UserProfile',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      require: true
    }
  },
  setup() {
    const store = useStore<UserProps>();
    const router = useRouter();
    const route = useRoute();
    const logout = ()=> {
      store.commit('logout')
      if(route.path !== '/') {
        message.success('退出登录成功，2秒后跳转到首页', 2)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        message.success('退出登录成功', 2)
      }
    }
    const createDesign =()=> {
      return ''
    }
    return {
      logout,
      createDesign
    }
  }
})
</script>

<style>

</style>