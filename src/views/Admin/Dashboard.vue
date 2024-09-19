<template>
  <div class="admin-dashboard">
    <h2>管理員儀表板</h2>
    <nav>
      <router-link to="/admin/users">使用者管理</router-link> |
      <router-link to="/admin/lanterns">光明燈管理</router-link> |
      <router-link to="/admin/prayers">祈福留言管理</router-link> |
      <router-link to="/admin/settings">系統設置</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
}
</script>