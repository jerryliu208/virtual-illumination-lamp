<template>
  <div id="app" class="torii-gate">
    <header @click="goToHome" style="cursor: pointer;">
      <div class="logo">⛩️</div>
      <h1>線上點光明燈平台</h1>
    </header>
    <nav class="shrine-menu">
      <router-link to="/" class="shrine-menu-item">首頁</router-link>
      <router-link to="/login" class="shrine-menu-item" v-if="!isLoggedIn">登入</router-link>
      <router-link to="/profile" class="shrine-menu-item" v-if="isLoggedIn">會員資料</router-link>
      <router-link to="/lanterns" class="shrine-menu-item">光明燈</router-link>
      <router-link to="/lantern-status" class="shrine-menu-item">光明燈狀態</router-link>
      <router-link to="/admin" v-if="isAdmin" class="shrine-menu-item">管理後台</router-link>
      <a @click="logout" class="shrine-menu-item" v-if="isLoggedIn" style="cursor: pointer;">登出</a>
    </nav>
    <main class="shrine-content">
      <router-view></router-view>
    </main>
    <footer class="shrine-footer">
      <p>© 2023 線上點光明燈平台</p>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const isAdmin = computed(() => store.state.user && store.state.user.isAdmin)
    const isLoggedIn = computed(() => !!store.state.user)

    const goToHome = () => {
      router.push('/')
    }

    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }

    return {
      isAdmin,
      isLoggedIn,
      goToHome,
      logout
    }
  }
}
</script>

<style>
:root {
  --primary-color: #B22222; /* 深紅色 */
  --secondary-color: #FFD700; /* 金色 */
  --background-color: #F5E6D3; /* 淺米色 */
  --text-color: #333;
  --font-family: 'Noto Serif JP', serif;
  --content-padding: 20px; /* 新增：統一的內容間距 */
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--content-padding) 0;
}

.logo {
  font-size: 3em;
  margin-bottom: 10px;
}

header h1 {
  text-align: center;
  color: var(--primary-color);
  font-size: 2.5em;
  margin: 0;
}

.shrine-menu {
  display: flex;
  justify-content: center;
  background-color: var(--primary-color);
  padding: 10px;
  margin-bottom: var(--content-padding);
}

.shrine-menu-item {
  color: var(--secondary-color);
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
  transition: color 0.3s;
}

.shrine-menu-item:hover {
  color: white;
}

.shrine-content {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  padding: var(--content-padding);
  margin: 0 auto var(--content-padding); /* 新增下邊距 */
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
}

.shrine-footer {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  text-align: center;
  padding: var(--content-padding) 0;
  width: 100%;
}

button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #8B0000;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: var(--font-family);
}

@media (max-width: 768px) {
  .shrine-menu {
    flex-direction: column;
  }
  
  .shrine-menu-item {
    margin: 5px 0;
  }
}
</style>