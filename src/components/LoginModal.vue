<template>
  <div class="modal-backdrop" @click="closeModal">
    <div class="modal" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
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
        <router-link to="/register" @click="closeModal">註冊新帳號</router-link>
        <router-link to="/forgot-password" @click="closeModal">忘記密碼</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  emits: ['close'],
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      try {
        const user = await store.dispatch('login', { email: email.value, password: password.value });
        if (user.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
        closeModal();
      } catch (err) {
        error.value = '登入失敗，請檢查您的用戶名和密碼';
        console.error('登入失敗', err);
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return { email, password, error, login, closeModal };
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
  width: 90%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--primary-color);
  transition: opacity 0.3s;
}

.close-button:hover {
  opacity: 0.7;
}

h2 {
  color: var(--primary-color);
  text-align: center;
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
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #8B0000;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.links a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9em;
}

.links a:hover {
  text-decoration: underline;
}
</style>