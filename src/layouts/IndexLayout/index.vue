<template>
  <a-layout class="app-layout">
    <a-layout-sider>
      <Sider :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Header :toogleCollapsed="toogleCollapsed" />
      </a-layout-header>
      <a-layout-content>
        <Content />
      </a-layout-content>
      <a-layout-footer>
        <Footer />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Sider from './sider/index.vue';
import Header from './header/index.vue';
import Content from './content/index.vue';
import Footer from './footer/index.vue';

export default defineComponent({
  components: { Sider, Header, Content, Footer },

  setup() {
    const collapsed = ref(false);

    const toogleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };

    return {
      collapsed,
      toogleCollapsed,
    };
  },
});
</script>
<style>
.app-layout {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
