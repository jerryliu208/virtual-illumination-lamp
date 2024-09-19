<template>
  <div class="lantern-list">
    <h2>光明燈類型</h2>
    <div class="lantern-grid">
      <div v-for="lantern in lanterns" :key="lantern.id" class="lantern-item">
        <div class="lantern-icon">🏮</div>
        <h3>{{ lantern.name }}</h3>
        <p>{{ lantern.description }}</p>
        <p class="price">價格: ${{ lantern.price }}</p>
        <button @click="selectLantern(lantern)">選擇</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { lanternApi } from '@/services/api';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const lanterns = ref([]);

    onMounted(async () => {
      lanterns.value = await lanternApi.getLanterns();
    });

    const selectLantern = (lantern) => {
      store.commit('setSelectedLantern', lantern);
      router.push('/checkout');
    };

    return { lanterns, selectLantern };
  }
}
</script>

<style scoped>
.lantern-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.lantern-item {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  text-align: center;
  border: 2px solid var(--primary-color);
}

.lantern-item:hover {
  transform: translateY(-5px);
}

.lantern-icon {
  font-size: 3em;
  margin-bottom: 10px;
}

.price {
  font-weight: bold;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .lantern-grid {
    grid-template-columns: 1fr;
  }
}
</style>