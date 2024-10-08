import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global.css'  // 添加這行

const app = createApp(App)

app.use(store)
app.use(router)

// 在掛載應用之前檢查認證狀態
store.dispatch('checkAuth').then(() => {
  app.mount('#app')
})