import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Auth/Register.vue';
import ForgotPassword from '../views/Auth/ForgotPassword.vue';
import LanternList from '../views/Lanterns/LanternList.vue';
import LanternStatus from '../views/Lanterns/LanternStatus.vue';
import Checkout from '../views/Payment/Checkout.vue';
import AdminDashboard from '../views/Admin/Dashboard.vue';
import UserManagement from '../views/Admin/UserManagement.vue';
import LanternManagement from '../views/Admin/LanternManagement.vue';
import PrayerManagement from '../views/Admin/PrayerManagement.vue';
import SystemSettings from '../views/Admin/SystemSettings.vue';
import LanternDetail from '../views/Lanterns/LanternDetail.vue';
import UserProfile from '../views/User/UserProfile.vue';
import OrderManagement from '../views/Admin/OrderManagement.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  // 移除登入路由
  { path: '/register', name: 'Register', component: Register },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/lanterns', name: 'LanternList', component: LanternList },
  { path: '/lantern-status', name: 'LanternStatus', component: LanternStatus },
  { path: '/lantern-detail/:id', name: 'LanternDetail', component: LanternDetail },
  { path: '/checkout', name: 'Checkout', component: Checkout },
  { 
    path: '/admin', 
    name: 'AdminDashboard', 
    component: AdminDashboard, 
    meta: { requiresAdmin: true },
    children: [
      { path: 'users', name: 'UserManagement', component: UserManagement },
      { path: 'lanterns', name: 'LanternManagement', component: LanternManagement },
      { path: 'prayers', name: 'PrayerManagement', component: PrayerManagement },
      { path: 'orders', name: 'OrderManagement', component: OrderManagement },
      { path: 'settings', name: 'SystemSettings', component: SystemSettings },
    ]
  },
  { 
    path: '/profile', 
    name: 'UserProfile', 
    component: UserProfile,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 添加導航守衛
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;