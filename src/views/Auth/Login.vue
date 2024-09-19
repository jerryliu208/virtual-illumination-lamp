<template>
  <div class="login">
    <h2>登入</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="email">用戶名：</label>
        <input id="email" v-model="email" type="text" required>
      </div>
      <div class="form-group">
        <label for="password">密碼：</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">登入</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
    <div class="links">
      <router-link to="/register">註冊新帳號</router-link>
      <router-link to="/forgot-password">忘記密碼</router-link>
    </div>
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
    const error = ref('');
    const router = useRouter();
    const store = useStore();

    const login = async () => {
      try {
        const user = await store.dispatch('login', { email: email.value, password: password.value });
        if (user.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } catch (err) {
        error.value = '登入失敗，請檢查您的用戶名和密碼';
        console.error('登入失敗', err);
      }
    };

    return { email, password, error, login };
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--primary-color);
}

.login h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--primary-color);
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box; /* 確保padding不會增加元素的總寬度 */
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #8B0000;
}

.error-message {
  color: var(--primary-color);
  margin-top: 10px;
  text-align: center;
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.links a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
}

.links a:hover {
  text-decoration: underline;
}
</style>