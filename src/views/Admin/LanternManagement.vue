<template>
  <div class="lantern-management">
    <h3>光明燈管理</h3>
    <button @click="showAddForm = true" class="add-button">新增光明燈</button>
    <div v-if="showAddForm" class="add-form">
      <h4>新增光明燈</h4>
      <form @submit.prevent="addLantern">
        <input v-model="newLantern.name" placeholder="名稱" required>
        <input v-model="newLantern.description" placeholder="描述" required>
        <input v-model.number="newLantern.price" type="number" placeholder="價格" required>
        <input v-model.number="newLantern.totalCount" type="number" placeholder="總數量" required>
        <button type="submit">新增</button>
        <button type="button" @click="showAddForm = false">取消</button>
      </form>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名稱</th>
          <th>描述</th>
          <th>價格</th>
          <th>總數量</th>
          <th>已點亮</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lantern in lanterns" :key="lantern.id">
          <td>{{ lantern.id }}</td>
          <td>{{ lantern.name }}</td>
          <td>{{ lantern.description }}</td>
          <td>${{ lantern.price }}</td>
          <td>{{ lantern.totalCount }}</td>
          <td>{{ lantern.litCount }}</td>
          <td>
            <button @click="editLantern(lantern)" class="action-button edit">編輯</button>
            <button @click="deleteLantern(lantern.id)" class="action-button delete">刪除</button>
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
    const newLantern = ref({ name: '', description: '', price: 0, totalCount: 0 });

    onMounted(async () => {
      lanterns.value = await lanternApi.getLanterns();
    });

    const addLantern = async () => {
      const addedLantern = await lanternApi.createLantern(newLantern.value);
      lanterns.value.push(addedLantern);
      newLantern.value = { name: '', description: '', price: 0, totalCount: 0 };
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

<style scoped>
.add-form {
  margin-bottom: 20px;
}

.add-form input {
  margin-right: 10px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: var(--primary-color);
  color: white;
}

button {
  margin-right: 5px;
}

.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.action-button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-right: 5px;
}

.action-button:hover {
  transform: translateY(-2px);
}

.edit {
  background-color: #2196F3;
  color: white;
}

.edit:hover {
  background-color: #0b7dda;
}

.delete {
  background-color: #f44336;
  color: white;
}

.delete:hover {
  background-color: #da190b;
}
</style>