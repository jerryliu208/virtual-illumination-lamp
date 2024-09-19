<template>
  <div class="prayer-management">
    <h3>祈福留言管理</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>用戶</th>
          <th>光明燈</th>
          <th>留言</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prayer in prayers" :key="prayer.id">
          <td>{{ prayer.id }}</td>
          <td>{{ prayer.user }}</td>
          <td>{{ prayer.lantern }}</td>
          <td>{{ prayer.message }}</td>
          <td>{{ prayer.status }}</td>
          <td>
            <button @click="approvePrayer(prayer.id)">批准</button>
            <button @click="rejectPrayer(prayer.id)">拒絕</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { prayerApi } from '@/services/api';

export default {
  name: 'PrayerManagement',
  setup() {
    const prayers = ref([]);

    onMounted(async () => {
      prayers.value = await prayerApi.getPrayers();
    });

    const approvePrayer = async (id) => {
      await prayerApi.updatePrayerStatus(id, 'approved');
      prayers.value = prayers.value.map(p => 
        p.id === id ? { ...p, status: 'approved' } : p
      );
    };

    const rejectPrayer = async (id) => {
      await prayerApi.updatePrayerStatus(id, 'rejected');
      prayers.value = prayers.value.map(p => 
        p.id === id ? { ...p, status: 'rejected' } : p
      );
    };

    return { prayers, approvePrayer, rejectPrayer };
  }
}
</script>