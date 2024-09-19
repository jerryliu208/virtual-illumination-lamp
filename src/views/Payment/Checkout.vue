<template>
  <div class="checkout">
    <h2>結帳</h2>
    <div v-if="selectedLantern">
      <h3>{{ selectedLantern.name }}</h3>
      <p>價格: ${{ selectedLantern.price }}</p>
    </div>
    <form @submit.prevent="processPayment">
      <textarea v-model="prayerMessage" placeholder="祈福留言"></textarea>
      <button type="submit">確認付款</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { paymentApi } from '@/services/api';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const prayerMessage = ref('');

    const selectedLantern = computed(() => store.state.selectedLantern);

    const processPayment = async () => {
      try {
        await paymentApi.processPayment({
          lanternId: selectedLantern.value.id,
          amount: selectedLantern.value.price,
          prayerMessage: prayerMessage.value
        });
        router.push('/payment-success');
      } catch (error) {
        console.error('支付失敗', error);
      }
    };

    return { selectedLantern, prayerMessage, processPayment };
  }
}
</script>