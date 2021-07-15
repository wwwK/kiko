<template>
  <div class="homepage-container">
    <a-layout :style="{background: '#fff'}">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">kiko</router-link>
        </div>
        <div class="page-title">
          <user-profile :user="user"></user-profile>
        </div>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="footer">
      © kiko版权所有 | 湘ICP备19009711号
    </a-layout-footer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  import UserProfile from '../components/UserProfile.vue'
  export default defineComponent({
    components: {
      UserProfile
    },
    name: 'Index',
    setup() {
      const store = useStore();
      const user = computed(() => store.state.user)
      return {
        user
      }
    }
  })
</script>

<style scoped lang="less">
.homepage-container {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-title {
    color: #fff;
  }
  .footer {
    text-align: center;
  }
  .home-layout {
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>
