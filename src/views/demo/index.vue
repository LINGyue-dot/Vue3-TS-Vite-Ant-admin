<template>
  <web-socket />
  <i18-n />
  <test-vue />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import WebSocket from './WebSocket.vue';
import I18N from './I18N.vue';
import TestVue from './TestVue.vue';

export default defineComponent({
  components: { I18N, WebSocket ,TestVue},
});
</script>
<style scoped></style>
