<template>
  <h1>analysis</h1>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { GlobalStateType } from '../../../store/modules/global';

export default defineComponent({
  setup() {
    const store = useStore<{ global: GlobalStateType }>();

    onMounted(() => {
      console.log(store.state.global.collapsed);
    });
  },
});
</script>
<style scoped></style>
