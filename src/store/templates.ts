import { Module } from 'vuex'
import { actionWrapper, GlobalDataProps } from './index'

export interface TemplateProps {
  id: number;
  title: string;
  coverImg: string;
  author: string;
  copiedCount: number; 
}
export interface TemplatesProps {
  data: TemplateProps[];
  totalTemplates: number;
}

const templates: Module<TemplatesProps, GlobalDataProps>  = {
  state: {
    data: [],
    totalTemplates: 0
  },
  mutations: {
    fetchTemplates(state, rawData) {
      const { count, list } = rawData.data
      state.data = [ ...state.data, ...list ]
      state.totalTemplates = count
    },
  },
  actions: {
    fetchTemplates: actionWrapper('/templates', 'fetchTemplates'),
  },
  getters: {
    getTemplateById: (state, getters, rootState) => (id: number) => {
      return state.data.find((t) => t.id === id)
    }
  }
}

export default templates