<template>
  <div class="user-profile">
    <h2>會員資料</h2>
    <div v-if="user">
      <p><strong>電子郵件：</strong> {{ user.email }}</p>
      <h3>我的光明燈</h3>
      <div v-if="userLanterns.length" class="user-lanterns">
        <div v-for="lantern in userLanterns" :key="lantern.id" class="lantern-item">
          <h4>{{ lantern.name }}</h4>
          <p>點燈日期：{{ lantern.date }}</p>
          <p>祈福留言：{{ lantern.message }}</p>
        </div>
      </div>
      <p v-else>您還沒有點亮任何光明燈。</p>
    </div>
    <p v-else>載入中...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { userApi } from '@/services/api';

export default {
  name: 'UserProfile',
  setup() {
    const store = useStore();
    const user = ref(null);
    const userLanterns = ref([]);

    onMounted(async () => {
      user.value = store.state.user;
      if (user.value) {
        userLanterns.value = await userApi.getUserLanterns(user.value.id);
      }
    });

    return { user, userLanterns };
  }
}
</script>

<style scoped>
.user-lanterns {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.lantern-item {
  border: 1px solid var(--primary-color);
  padding: 15px;
  border-radius: 8px;
}
</style>