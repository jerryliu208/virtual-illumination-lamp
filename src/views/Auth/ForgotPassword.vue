<template>
  <div class="forgot-password">
    <h2>忘記密碼</h2>
    <form @submit.prevent="resetPassword">
      <input v-model="email" type="email" placeholder="電子郵件" required>
      <button type="submit">重設密碼</button>
    </form>
    <router-link to="/login">返回登入</router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const router = useRouter();

    const resetPassword = async () => {
      // 這裡應該是實際的重設密碼邏輯
      alert(`密碼重設連結已發送到 ${email.value}`);
      router.push('/login');
    };

    return { email, resetPassword };
  }
}
</script>