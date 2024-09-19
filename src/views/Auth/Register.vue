<template>
  <div class="register">
    <h2>註冊新帳號</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="電子郵件" required>
      <input v-model="password" type="password" placeholder="密碼" required>
      <input v-model="confirmPassword" type="password" placeholder="確認密碼" required>
      <button type="submit">註冊</button>
    </form>
    <router-link to="/login">已有帳號？登入</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter();
    const store = useStore();

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        alert('密碼不匹配');
        return;
      }
      try {
        await store.dispatch('register', { email: email.value, password: password.value });
        router.push('/login');
      } catch (error) {
        console.error('註冊失敗', error);
      }
    };

    return { email, password, confirmPassword, register };
  }
}
</script>