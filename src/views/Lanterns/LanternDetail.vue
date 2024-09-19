<template>
  <div v-if="lantern" class="lantern-detail">
    <h2>{{ lantern.name }} 詳細狀態</h2>
    <p>總數: {{ lantern.totalCount }}</p>
    <p>已點亮: {{ lantern.litCount }}</p>
    <p>剩餘: {{ lantern.totalCount - lantern.litCount }}</p>
    <h3>已點亮的燈</h3>
    <div v-if="lantern.litBy.length" class="lit-lanterns">
      <div v-for="(lit, index) in lantern.litBy" :key="index" class="lit-lantern">
        <p><strong>點燈者:</strong> {{ lit.name }}</p>
        <p><strong>祈福留言:</strong> {{ lit.message }}</p>
      </div>
    </div>
    <p v-else>目前還沒有人點亮這種燈。</p>
  </div>
  <p v-else>加載中...</p>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { lanternApi } from '@/services/api';

export default {
  setup() {
    const route = useRoute();
    const lantern = ref(null);

    onMounted(async () => {
      try {
        const id = parseInt(route.params.id);
        lantern.value = await lanternApi.getLanternDetailById(id);
      } catch (error) {
        console.error('獲取光明燈詳��失敗', error);
      }
    });

    return { lantern };
  }
}
</script>

<style scoped>
.lantern-detail {
  max-width: 800px;
  margin: 0 auto;
}

.lit-lanterns {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.lit-lantern {
  border: 1px solid var(--primary-color);
  padding: 10px;
  border-radius: 8px;
}
</style>