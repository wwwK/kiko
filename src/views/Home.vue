<template>
  <div class="content-container">
    <a-row :gutter="16">
      <template-list :list="testData"></template-list>
    </a-row>
    <a-row type="flex" justify="center">
      <!-- <a-button type="primary" size="large" @click="loadMorePage" v-if="!isLastPage" :loading="isLoading">加载更多</a-button> -->
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TemplateList from '../components/TemplateList.vue'
export default defineComponent({
  name: 'Home',
  components: {
    TemplateList
  },
  setup() {
    const store = useStore()
    const testData = computed(() => store.state.templates.data)
    onMounted(() => {
      store.dispatch('fetchTemplates', { searchParams : { pageIndex: 0, pageSize: 4 }})
    })
    return {
      testData,
    }
  }
})
</script>

<style>
</style>
