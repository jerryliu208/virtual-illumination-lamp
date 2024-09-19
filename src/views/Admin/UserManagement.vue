<template>
  <div class="user-management">
    <h3>使用者管理</h3>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>電子郵件</th>
          <th>角色</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? '管理員' : '一般用戶' }}</td>
          <td>
            <button @click="editUser(user)">編輯</button>
            <button @click="deleteUser(user.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { userApi } from '@/services/api';

export default {
  name: 'UserManagement',
  setup() {
    const users = ref([]);

    onMounted(async () => {
      users.value = await userApi.getUsers();
    });

    const editUser = (user) => {
      // 實現編輯用戶的邏輯
      console.log('編輯用戶', user);
    };

    const deleteUser = async (userId) => {
      if (confirm('確定要刪除此用戶嗎？')) {
        await userApi.deleteUser(userId);
        users.value = users.value.filter(user => user.id !== userId);
      }
    };

    return { users, editUser, deleteUser };
  }
}
</script>