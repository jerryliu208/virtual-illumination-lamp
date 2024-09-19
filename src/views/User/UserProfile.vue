<template>
  <div class="user-profile">
    <h2>會員資料</h2>
    <div v-if="user">
      <div class="profile-section">
        <h3>個人資料</h3>
        <div v-if="!isEditing">
          <p><strong>用戶名：</strong> {{ user.email }}</p>
          <p><strong>姓名：</strong> {{ user.name }}</p>
          <p><strong>電話：</strong> {{ user.phone }}</p>
          <button @click="startEditing">編輯資料</button>
        </div>
        <form v-else @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="name">姓名：</label>
            <input id="name" v-model="editedUser.name" required>
          </div>
          <div class="form-group">
            <label for="phone">電話：</label>
            <input id="phone" v-model="editedUser.phone" required>
          </div>
          <button type="submit">保存</button>
          <button @click="cancelEditing">取消</button>
        </form>
      </div>

      <div class="profile-section">
        <h3>更改密碼</h3>
        <form @submit.prevent="changePassword">
          <div class="form-group">
            <label for="currentPassword">當前密碼：</label>
            <input id="currentPassword" v-model="passwordForm.currentPassword" type="password" required>
          </div>
          <div class="form-group">
            <label for="newPassword">新密碼：</label>
            <input id="newPassword" v-model="passwordForm.newPassword" type="password" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">確認新密碼：</label>
            <input id="confirmPassword" v-model="passwordForm.confirmPassword" type="password" required>
          </div>
          <button type="submit">更改密碼</button>
        </form>
      </div>

      <div class="profile-section">
        <h3>訂單歷史</h3>
        <div v-if="orders.length">
          <div v-for="order in orders" :key="order.id" class="order-item">
            <p><strong>訂單編號：</strong> {{ order.id }}</p>
            <p><strong>日期：</strong> {{ order.date }}</p>
            <p><strong>光明燈：</strong> {{ order.lanternName }}</p>
            <p><strong>金額：</strong> ${{ order.amount }}</p>
          </div>
        </div>
        <p v-else>您還沒有任何訂單。</p>
      </div>
    </div>
    <p v-else>載入中...</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { userApi } from '@/services/api';

export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const editedUser = ref({});
    const isEditing = ref(false);
    const orders = ref([]);
    const passwordForm = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    onMounted(async () => {
      if (user.value) {
        editedUser.value = { ...user.value };
        try {
          orders.value = await userApi.getUserOrders(user.value.id);
        } catch (error) {
          console.error('獲取訂單歷史失敗', error);
        }
      }
    });

    const startEditing = () => {
      isEditing.value = true;
    };

    const cancelEditing = () => {
      isEditing.value = false;
      editedUser.value = { ...user.value };
    };

    const updateProfile = async () => {
      try {
        const updatedUser = await userApi.updateProfile(editedUser.value);
        store.commit('setUser', updatedUser);
        isEditing.value = false;
      } catch (error) {
        console.error('更新資料失敗', error);
      }
    };

    const changePassword = async () => {
      if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        alert('新密碼和確認密碼不匹配');
        return;
      }
      try {
        await userApi.changePassword(passwordForm.value);
        alert('密碼已成功更改');
        passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
      } catch (error) {
        console.error('更改密碼失敗', error);
        alert('更改密碼失敗，請檢查當前密碼是否正確');
      }
    };

    return {
      user,
      editedUser,
      isEditing,
      orders,
      passwordForm,
      startEditing,
      cancelEditing,
      updateProfile,
      changePassword
    };
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #8B0000;
}

.order-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>