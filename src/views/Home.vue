<template>
  <div class="home">
    <!-- 輪播組件 -->
    <div class="carousel">
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(image, index) in images" :key="index" class="carousel-item">
          <img :src="image" alt="廣告圖片" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prevSlide">&lt;</button>
      <button class="carousel-control next" @click="nextSlide">&gt;</button>
    </div>

    <h2>歡迎來到線上點光明燈平台</h2>

    <div class="lantern-animation">
      🏮🏮🏮
    </div>
    <p class="welcome-text">在這裡，您可以為自己和親愛的人點亮祈福的光明燈</p>
    <button @click="startPraying" class="start-praying-btn">開始祈福</button>
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

    // 修改輪播圖片數組
    const images = [
      'https://i.imgur.com/ujIuGaQ.png',  // 添加 .png 擴展名
      'https://i.imgur.com/3esBRck.jpg'   // 添加 .jpg 擴展名
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
      timer.value = setInterval(nextSlide, 5000); // 每5秒切換一次
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
  padding: 0 0 50px 0; /* 移除頂部 padding */
}

h2 {
  font-size: 2em;
  margin: 30px 0;
  color: var(--primary-color);
}

.carousel {
  position: relative;
  width: 100%;
  max-width: 1200px; /* 調整最大寬度 */
  margin: 0 auto 30px;
  overflow: hidden;
  aspect-ratio: 16 / 9; /* 設置 16:9 的比例 */
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
  object-fit: cover; /* 確保圖片填滿容器並保持比例 */
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

@media (max-width: 768px) {
  .carousel {
    aspect-ratio: 16 / 9; /* 保持移動設備上的比例 */
  }
}
</style>