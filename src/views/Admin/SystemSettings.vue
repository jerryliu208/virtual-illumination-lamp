<template>
  <div class="system-settings">
    <h3>系統設置</h3>
    <form @submit.prevent="saveSettings">
      <div>
        <label for="siteName">網站名稱：</label>
        <input id="siteName" v-model="settings.siteName" type="text">
      </div>
      <div>
        <label for="maxLanterns">最大光明燈數量：</label>
        <input id="maxLanterns" v-model.number="settings.maxLanterns" type="number">
      </div>
      <div>
        <label for="prayerApprovalRequired">祈福留言需要審核：</label>
        <input id="prayerApprovalRequired" v-model="settings.prayerApprovalRequired" type="checkbox">
      </div>
      <button type="submit">保存設置</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { settingsApi } from '@/services/api';

export default {
  name: 'SystemSettings',
  setup() {
    const settings = ref({
      siteName: '',
      maxLanterns: 0,
      prayerApprovalRequired: false
    });

    onMounted(async () => {
      settings.value = await settingsApi.getSettings();
    });

    const saveSettings = async () => {
      await settingsApi.updateSettings(settings.value);
      alert('設置已保存');
    };

    return { settings, saveSettings };
  }
}
</script>