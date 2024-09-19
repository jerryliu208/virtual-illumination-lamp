<template>
  <div class="admin-dashboard">
    <h2>管理員儀表板</h2>
    <nav class="admin-nav">
      <router-link to="/admin/users" class="admin-nav-button">使用者管理</router-link>
      <router-link to="/admin/lanterns" class="admin-nav-button">光明燈管理</router-link>
      <router-link to="/admin/prayers" class="admin-nav-button">祈福留言管理</router-link>
      <router-link to="/admin/orders" class="admin-nav-button">訂單管理</router-link>
      <router-link to="/admin/settings" class="admin-nav-button">系統設置</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.admin-nav {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.admin-nav-button {
  color: white;
  background-color: var(--primary-color);
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  margin: 5px;
}

.admin-nav-button:hover, .admin-nav-button.router-link-active {
  background-color: #8B0000;
  transform: translateY(-2px);
}
</style>