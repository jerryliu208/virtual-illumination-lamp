// 我們將 api 變量和 axios 導入註釋掉，因為目前我們沒有使用它們
// const api = axios.create({
//   baseURL: 'http://your-api-url.com/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// 模擬數據
const mockLanterns = [
  { id: 1, name: '平安燈', description: '祈求平安順遂', price: 100 },
  { id: 2, name: '智慧燈', description: '增長智慧才能', price: 150 },
  { id: 3, name: '健康燈', description: '祈求身體健康', price: 120 },
  { id: 4, name: '財富燈', description: '祈求財運亨通', price: 200 },
  { id: 5, name: '姻緣燈', description: '祈求良緣到來', price: 180 },
  { id: 6, name: '事業燈', description: '祈求事業有成', price: 160 },
  { id: 7, name: '學業燈', description: '祈求學業進步', price: 130 },
  { id: 8, name: '家庭燈', description: '祈求家庭和睦', price: 140 },
  { id: 9, name: '長壽燈', description: '祈求長壽安康', price: 170 },
  { id: 10, name: '功德燈', description: '祈求功德圓滿', price: 190 },
  { id: 11, name: '消災燈', description: '祈求消災解厄', price: 110 },
  { id: 12, name: '添福燈', description: '祈求福運綿長', price: 130 },
  { id: 13, name: '光明燈', description: '祈求前途光明', price: 150 },
  { id: 14, name: '安神燈', description: '祈求心神安寧', price: 140 },
  { id: 15, name: '祈願燈', description: '實現心中願望', price: 160 }
];

// 修改模擬光明燈狀態數據
const mockLanternStatus = [
  {
    id: 1,
    name: '平安燈',
    totalCount: 100,
    litCount: 3,
    litBy: [
      { name: '張三', message: '祈求全家平安' },
      { name: '李四', message: '願世界和平' },
      { name: '王五', message: '保佑身體健康' }
    ]
  },
  {
    id: 2,
    name: '智慧燈',
    totalCount: 50,
    litCount: 2,
    litBy: [
      { name: '趙六', message: '祈求學業進步' },
      { name: '錢七', message: '願工作順利' }
    ]
  },
  // ... 添加更多燈種 ...
];

// 模擬用戶數據
const mockUsers = [
  { id: 1, email: 'admin', isAdmin: true },
  { id: 2, email: 'user@example.com', isAdmin: false },
  // 添加更多模擬用戶...
];

// 添加模擬用戶光明燈數據
const mockUserLanterns = [
  { id: 1, name: '平安燈', date: '2023-05-01', message: '祈求全家平安' },
  { id: 2, name: '智慧燈', date: '2023-06-15', message: '祈求學業進步' },
  // 可以根據需要添加更多模擬數據
];

// 模擬API調用
export const lanternApi = {
  getLanterns: () => Promise.resolve(mockLanterns),
  createLantern: (data) => Promise.resolve({ ...data, id: Date.now() }),
  getLanternStatus: () => Promise.resolve(mockLanternStatus),
  deleteLantern: (lanternId) => Promise.resolve({ success: true, deletedLanternId: lanternId }),
  getLanternDetailById: (id) => Promise.resolve(mockLanternStatus.find(lantern => lantern.id === id)),
};

export const userApi = {
  login: (credentials) => {
    // 模擬管理員登錄
    if (credentials.email === 'admin' && credentials.password === 'admin') {
      return Promise.resolve({ user: { id: 1, email: 'admin', isAdmin: true } });
    }
    // 模擬普通用戶登錄
    if (credentials.email === 'user' && credentials.password === 'user') {
      return Promise.resolve({ user: { id: 2, email: 'user@example.com', isAdmin: false } });
    }
    // 如果都不匹配，返回錯誤
    return Promise.reject(new Error('Invalid credentials'));
  },
  register: (userData) => Promise.resolve({ user: { id: 3, ...userData, isAdmin: false } }),
  getUsers: () => Promise.resolve(mockUsers),
  deleteUser: (userId) => Promise.resolve({ success: true, deletedUserId: userId }),
  getUserLanterns: () => Promise.resolve(mockUserLanterns), // 修改這行，移除 userId 參數
  updateProfile: (userData) => {
    // 模擬更新個人資料
    return Promise.resolve({ ...userData, id: 1 });
  },
  changePassword: (passwordData) => {
    // 模擬更改密碼
    console.log('Changing password:', passwordData);  // 添加這行來使用 passwordData
    return Promise.resolve({ success: true });
  },
  getUserOrders: (userId) => {
    // 模擬獲取用戶訂單
    console.log('Fetching orders for user:', userId);  // 添加這行來使用 userId
    return Promise.resolve([
      { id: 1, date: '2023-05-01', lanternName: '平安燈', amount: 100 },
      { id: 2, date: '2023-06-15', lanternName: '智慧燈', amount: 150 },
    ]);
  },
};

export const paymentApi = {
  processPayment: (paymentData) => Promise.resolve({ success: true, orderId: Date.now(), data: paymentData }),
};

// 模擬祈福留言數據
const mockPrayers = [
  { id: 1, user: '張三', lantern: '平安燈', message: '祈求全家平安', status: 'pending' },
  { id: 2, user: '李四', lantern: '智慧燈', message: '祈求學業進步', status: 'approved' },
  // 添加更多模擬數據...
];

// 模擬系統設置數據
let mockSettings = {
  siteName: '線上點光明燈台',
  maxLanterns: 1000,
  prayerApprovalRequired: true
};

export const prayerApi = {
  getPrayers: () => Promise.resolve(mockPrayers),
  updatePrayerStatus: (id, status) => Promise.resolve({ success: true, id, status }),
};

export const settingsApi = {
  getSettings: () => Promise.resolve(mockSettings),
  updateSettings: (newSettings) => {
    mockSettings = { ...mockSettings, ...newSettings };
    return Promise.resolve({ success: true });
  },
};

// 模擬訂單數據
const mockOrders = [
  { id: 1, user: '張三', lantern: '平安燈', amount: 100, date: '2023-05-01', status: 'completed' },
  { id: 2, user: '李四', lantern: '智慧燈', amount: 150, date: '2023-06-15', status: 'pending' },
  // 添加更多模擬訂單...
];

export const orderApi = {
  getOrders: () => Promise.resolve(mockOrders),
  updateOrderStatus: (orderId, status) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
    }
    return Promise.resolve({ success: true });
  },
};

// 如果將來需要使用真實的 API 調用，可以取消註釋以下代碼
// export const realApi = {
//   get: (url) => api.get(url),
//   post: (url, data) => api.post(url, data),
//   // 添加其他需要的方法
// };