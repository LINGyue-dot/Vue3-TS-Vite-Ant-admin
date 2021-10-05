<template>
  <h1>analysis</h1>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import { GlobalStateType } from '../../../store/modules/global';
import { http } from '../../../utils/http/axios';
import { getApi } from '../../../utils/settings/env';

export default defineComponent({
  name:'Analysis',
  setup() {
    const store = useStore<{ global: GlobalStateType }>();

    onMounted(() => {
      console.log(store.state)
      console.log(getApi())
      http.get({ url: '/users' }).then(res => console.log(res)).catch(e => console.log(e))
      // console.log(store.state.global.collapsed);
    });
  },
});
</script>
<style scoped></style>
