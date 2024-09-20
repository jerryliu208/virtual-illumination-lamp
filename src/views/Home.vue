<template>
  <div class="home fade-in">
    <div class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="carousel-item">
          <img :src="image" alt="廣告圖片" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prevSlide">&lt;</button>
      <button class="carousel-control next" @click="nextSlide">&gt;</button>
    </div>

    <h1 class="main-title">歡迎來到線上點光明燈平台</h1>

    <div class="features">
      <div class="feature-card">
        <i class="fas fa-pray"></i>
        <h3>虔誠祈福</h3>
        <p>為您和摯愛點亮心中的光明</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-hand-holding-heart"></i>
        <h3>傳遞祝福</h3>
        <p>將美好願望傳遞給每一個人</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-peace"></i>
        <h3>心靈平靜</h3>
        <p>在這裡找到內心的寧靜與力量</p>
      </div>
    </div>

    <div class="cta-section">
      <p class="cta-text">準備好開始您的祈福之旅了嗎？</p>
      <button @click="startPraying" class="btn btn-primary cta-button">開始祈福</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const router = useRouter();

    const images = [
      'https://i.imgur.com/ujIuGaQ.png',
      'https://i.imgur.com/3esBRck.jpg'
    ];

    const currentIndex = ref(0);
    const timer = ref(null);

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
    };

    const startAutoSlide = () => {
      timer.value = setInterval(nextSlide, 5000);
    };

    onMounted(() => {
      startAutoSlide();
    });

    onUnmounted(() => {
      if (timer.value) {
        clearInterval(timer.value);
      }
    });

    const startPraying = () => {
      if (store.getters.isLoggedIn) {
        router.push('/lanterns');
      } else {
        store.commit('setShowLoginModal', true);
      }
    };

    return {
      images,
      currentIndex,
      nextSlide,
      prevSlide,
      startPraying
    };
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 0 0 50px 0;
}

.main-title {
  font-size: 2.5em;
  color: var(--primary-color);
  margin: 40px 0;
  font-weight: 600;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 50px 0;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  margin: 20px;
  width: 250px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: all var(--transition-speed);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.feature-card i {
  font-size: 3em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

.cta-section {
  background-color: var(--primary-color);
  color: white;
  padding: 50px 20px;
  border-radius: 8px;
  margin-top: 50px;
}

.cta-text {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.cta-button {
  font-size: 1.2em;
  padding: 15px 30px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.cta-button:hover {
  background-color: #FFE55C;
  transform: scale(1.05);
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 30px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.carousel-item {
  flex: 0 0 100%;
  height: 100%;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}

@media (max-width: 768px) {
  .carousel {
    aspect-ratio: 16 / 9;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--transition-speed) ease-in;
}
</style>