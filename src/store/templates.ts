import { Module } from 'vuex'
import { actionWrapper } from './index'

const templates = {
  state: {
    data: [],
  },
  mutations: {
    fetchTemplates(state: any, rawData: any) {
      const { count, list } = rawData.data
      state.data = [ ...state.data, ...list ]
      state.totalTemplates = count
    },
  },
  actions: {
    fetchTemplates: actionWrapper('/templates', 'fetchTemplates'),
  },
  getters: {
    getTemplateById: (state: any, getters: any, rootState: any) => (id: number) => {
      return state.data.find((t: any) => t.id === id)
    }
  }
}

export default templates