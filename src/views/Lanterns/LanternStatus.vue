<template>
  <div class="lantern-status">
    <h2>光明燈狀態概覽</h2>
    <div v-if="lanterns.length" class="lantern-list">
      <div v-for="lantern in lanterns" :key="lantern.id" class="lantern-item">
        <h3>{{ lantern.name }}</h3>
        <p>已點亮: {{ lantern.litCount }} / {{ lantern.totalCount }}</p>
        <router-link :to="`/lantern-detail/${lantern.id}`">查看詳情</router-link>
      </div>
    </div>
    <p v-else>目前沒有光明燈資訊。</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { lanternApi } from '@/services/api';

export default {
  setup() {
    const lanterns = ref([]);

    onMounted(async () => {
      try {
        lanterns.value = await lanternApi.getLanternStatus();
      } catch (error) {
        console.error('獲取光明燈狀態失敗', error);
      }
    });

    return { lanterns };
  }
}
</script>

<style scoped>
.lantern-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.lantern-item {
  border: 1px solid var(--primary-color);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}
</style>