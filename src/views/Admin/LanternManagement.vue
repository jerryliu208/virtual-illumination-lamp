<template>
  <div class="lantern-management">
    <h3>光明燈管理</h3>
    <button @click="showAddForm = true">新增光明燈</button>
    <div v-if="showAddForm">
      <h4>新增光明燈</h4>
      <form @submit.prevent="addLantern">
        <input v-model="newLantern.name" placeholder="名稱" required>
        <input v-model="newLantern.description" placeholder="描述" required>
        <input v-model.number="newLantern.price" type="number" placeholder="價格" required>
        <button type="submit">新增</button>
      </form>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名稱</th>
          <th>描述</th>
          <th>價格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lantern in lanterns" :key="lantern.id">
          <td>{{ lantern.id }}</td>
          <td>{{ lantern.name }}</td>
          <td>{{ lantern.description }}</td>
          <td>${{ lantern.price }}</td>
          <td>
            <button @click="editLantern(lantern)">編輯</button>
            <button @click="deleteLantern(lantern.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { lanternApi } from '@/services/api';

export default {
  name: 'LanternManagement',
  setup() {
    const lanterns = ref([]);
    const showAddForm = ref(false);
    const newLantern = ref({ name: '', description: '', price: 0 });

    onMounted(async () => {
      lanterns.value = await lanternApi.getLanterns();
    });

    const addLantern = async () => {
      const addedLantern = await lanternApi.createLantern(newLantern.value);
      lanterns.value.push(addedLantern);
      newLantern.value = { name: '', description: '', price: 0 };
      showAddForm.value = false;
    };

    const editLantern = (lantern) => {
      // 實現編輯光明燈的邏輯
      console.log('編輯光明燈', lantern);
    };

    const deleteLantern = async (lanternId) => {
      if (confirm('確定要刪除此光明燈嗎？')) {
        await lanternApi.deleteLantern(lanternId);
        lanterns.value = lanterns.value.filter(lantern => lantern.id !== lanternId);
      }
    };

    return { lanterns, showAddForm, newLantern, addLantern, editLantern, deleteLantern };
  }
}
</script>