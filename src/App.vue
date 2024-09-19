<template>
  <div id="app" class="torii-gate">
    <header class="top-bar">
      <div class="header-content">
        <div class="logo-title" @click="goToHome">
          <span class="logo">⛩️</span>
          <h1>線上點光明燈平台</h1>
        </div>
        <nav class="desktop-menu">
          <router-link to="/" class="shrine-menu-item">首頁</router-link>
          <a @click="openLoginModal" class="shrine-menu-item" v-if="!isLoggedIn">登入</a>
          <router-link to="/profile" class="shrine-menu-item" v-if="isLoggedIn">會員資料</router-link>
          <router-link to="/lanterns" class="shrine-menu-item">光明燈</router-link>
          <router-link to="/lantern-status" class="shrine-menu-item">光明燈狀態</router-link>
          <router-link to="/admin" v-if="isAdmin" class="shrine-menu-item">管理後台</router-link>
          <a @click="logout" class="shrine-menu-item" v-if="isLoggedIn">登出</a>
        </nav>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
      </div>
    </header>
    <nav :class="['mobile-menu', { 'active': isMenuActive }]">
      <router-link to="/" class="shrine-menu-item" @click="closeMenu">首頁</router-link>
      <a @click="openLoginModalAndCloseMenu" class="shrine-menu-item" v-if="!isLoggedIn">登入</a>
      <router-link to="/profile" class="shrine-menu-item" v-if="isLoggedIn" @click="closeMenu">會員資料</router-link>
      <router-link to="/lanterns" class="shrine-menu-item" @click="closeMenu">光明燈</router-link>
      <router-link to="/lantern-status" class="shrine-menu-item" @click="closeMenu">光明燈狀態</router-link>
      <router-link to="/admin" v-if="isAdmin" class="shrine-menu-item" @click="closeMenu">管理後台</router-link>
      <a @click="logoutAndCloseMenu" class="shrine-menu-item" v-if="isLoggedIn">登出</a>
    </nav>
    <main class="shrine-content">
      <router-view></router-view>
    </main>
    <footer class="shrine-footer">
      <p>© 2024 線上點光明燈平台</p>
    </footer>
    <LoginModal v-if="showLoginModal" @close="closeLoginModal" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import LoginModal from '@/components/LoginModal.vue'

export default {
  components: {
    LoginModal
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const showLoginModal = computed(() => store.state.showLoginModal)
    const isAdmin = computed(() => store.state.user && store.state.user.isAdmin)
    const isLoggedIn = computed(() => !!store.state.user)
    const isMenuActive = ref(false)

    const goToHome = () => {
      router.push('/')
      closeMenu()
    }

    const logout = () => {
      store.dispatch('logout')
      router.push('/')
    }

    const openLoginModal = () => {
      store.commit('setShowLoginModal', true)
    }

    const closeLoginModal = () => {
      store.commit('setShowLoginModal', false)
    }

    const toggleMenu = () => {
      isMenuActive.value = !isMenuActive.value
    }

    const closeMenu = () => {
      isMenuActive.value = false
    }

    const openLoginModalAndCloseMenu = () => {
      openLoginModal()
      closeMenu()
    }

    const logoutAndCloseMenu = () => {
      logout()
      closeMenu()
    }

    return {
      isAdmin,
      isLoggedIn,
      goToHome,
      logout,
      showLoginModal,
      openLoginModal,
      closeLoginModal,
      isMenuActive,
      toggleMenu,
      closeMenu,
      openLoginModalAndCloseMenu,
      logoutAndCloseMenu
    }
  }
}
</script>

<style>
.top-bar {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 50px; /* 確保頂部欄有固定高度 */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.logo-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: auto;
  padding-left: 0;
}

.logo {
  font-size: 1.5em;
  margin-right: 10px;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: var(--secondary-color);
  cursor: pointer;
}

.desktop-menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  padding-right: 0;
}

.shrine-menu-item {
  color: var(--secondary-color);
  text-decoration: none;
  margin-left: 15px;
  font-size: 0.9em;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 70px; /* 確保與頂部欄高度一致 */
  left: 0;
  right: 0;
  background-color: var(--primary-color);
  padding: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 999;
}

.mobile-menu.active {
  display: block;
}

.mobile-menu .shrine-menu-item {
  display: block;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: var(--secondary-color);
  text-decoration: none;
}

.mobile-menu .shrine-menu-item:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .shrine-content {
    padding-top: 50px; /* 保持與頂部欄高度一致 */
    padding-left: 0; /* 確保在移動設備上也沒有左側內邊距 */
    padding-right: 0; /* 確保在移動設備上也沒有右側內邊距 */
    margin-top: 0; /* 移除頂部 margin */
  }
}

.shrine-footer {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  text-align: center;
  padding: 5px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>