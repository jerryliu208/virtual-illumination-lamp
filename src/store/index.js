import { createStore } from 'vuex'
import { userApi } from '@/services/api'

export default createStore({
  state: {
    user: null,
    showLoginModal: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
        if (user.isAdmin) {
          localStorage.setItem('isAdmin', 'true')
        } else {
          localStorage.removeItem('isAdmin')
        }
      } else {
        localStorage.removeItem('user')
        localStorage.removeItem('isAdmin')
      }
    },
    setShowLoginModal(state, show) {
      state.showLoginModal = show;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await userApi.login(credentials);
        commit('setUser', response.user);
        return response.user;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register({ commit }, userData) {
      const response = await userApi.register(userData);
      commit('setUser', response.user);
      return response.user;
    },
    logout({ commit }) {
      commit('setUser', null);
    },
    checkAuth({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        commit('setUser', user)
      }
    }
  },
  getters: {
    isAdmin: state => state.user && state.user.isAdmin,
    isLoggedIn: state => !!state.user
  }
})