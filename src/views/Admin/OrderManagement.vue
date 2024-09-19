<template>
  <div class="order-management">
    <h3>訂單管理</h3>
    <table>
      <thead>
        <tr>
          <th>訂單ID</th>
          <th>用戶</th>
          <th>光明燈</th>
          <th>金額</th>
          <th>日期</th>
          <th>狀態</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.user }}</td>
          <td>{{ order.lantern }}</td>
          <td>${{ order.amount }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button @click="updateOrderStatus(order.id, 'completed')" class="action-button complete">完成</button>
            <button @click="updateOrderStatus(order.id, 'cancelled')" class="action-button cancel">取消</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { orderApi } from '@/services/api';

export default {
  name: 'OrderManagement',
  setup() {
    const orders = ref([]);

    onMounted(async () => {
      orders.value = await orderApi.getOrders();
    });

    const updateOrderStatus = async (orderId, status) => {
      await orderApi.updateOrderStatus(orderId, status);
      const updatedOrder = orders.value.find(order => order.id === orderId);
      if (updatedOrder) {
        updatedOrder.status = status;
      }
    };

    return { orders, updateOrderStatus };
  }
}
</script>

<style scoped>
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

.complete {
  background-color: #4CAF50;
  color: white;
}

.complete:hover {
  background-color: #45a049;
}

.cancel {
  background-color: #f44336;
  color: white;
}

.cancel:hover {
  background-color: #da190b;
}
</style>