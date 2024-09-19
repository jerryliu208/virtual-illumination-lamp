<template>
  <div class="home">
    <h2>歡迎來到線上點光明燈平台</h2>
    <div class="lantern-animation">
      🏮🏮🏮
    </div>
    <p class="welcome-text">在這裡，您可以為自己和親愛的人點亮祈福的光明燈</p>
    <button @click="startPraying" class="start-praying-btn">開始祈福</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const router = useRouter();

    const startPraying = () => {
      if (store.getters.isLoggedIn) {
        router.push('/lanterns');
      } else {
        router.push('/login');
      }
    };

    return {
      startPraying
    };
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px 0;
}

h2 {
  font-size: 2em;
  margin-bottom: 30px;
  color: var(--primary-color);
}

.lantern-animation {
  font-size: 4em;
  margin: 30px 0;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.welcome-text {
  font-size: 1.2em;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.start-praying-btn {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-praying-btn:hover {
  background-color: #8B0000;
}
</style>