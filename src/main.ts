import { createApp } from 'vue'
import App from './App.vue'
import Antd from './AntdConfig'
import router from './routes/index'
import store from './store/index'
import 'ant-design-vue/dist/antd.less'
import axios, { AxiosResponse, AxiosError } from 'axios'
let baseBackendURL = ''
let baseH5URL = ''
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_STAGINE) {
  // use test backend api when
  // in development env
  // in staging env
  baseBackendURL = 'http://kiko.yanwenyao.com:8081'
  baseH5URL = 'kiko.yanwenyao.com:8082'
} else {
  baseBackendURL = 'https://api.kiko.yanwenyao.com'
  baseH5URL = 'https://h5.kiko.yanwenyao.com'
}
export { baseBackendURL, baseH5URL }
axios.defaults.baseURL = `${baseBackendURL}/api/`
axios.interceptors.request.use(config => {
  const newConfig: any = config
  store.commit('setError', { status: false, message: ''})
  store.commit('startLoading', { opName: newConfig.opName })
  return config
})
axios.interceptors.response.use((resp: AxiosResponse<any>) => {
  const { config, data } = resp
  const newConfig: any = config
  store.commit('finishLoading', { opName: newConfig.opName })
  const { errno, message } = data
  if (errno && errno !== 0) {
    store.commit('setError', { status: true, message })
    return Promise.reject(data)
  }
  return resp
}, (e: AxiosError) => {
  const newConfig: any = e.config 
  store.commit('setError', { status: true, message: '服务器错误' })
  store.commit('finishLoading', { opName: newConfig.opName })
  return Promise.reject(e)
})

createApp(App)
.use(Antd)
.use(store)
.use(router)
.mount('#app')
