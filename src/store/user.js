import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const login = async (email, password) => {
    // 實現登入邏輯，調用API
  };

  const logout = async () => {
    // 實現登出邏輯
  };

  return { user, login, logout };
});