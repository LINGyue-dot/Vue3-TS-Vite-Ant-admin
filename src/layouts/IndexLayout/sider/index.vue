<template>
  <a-menu
    theme="dark"
    mode="inline"
    :inline-collapsed="$props.collapsed"
    :selectedKeys="selectedKeys"
    :openKeys="openKeys"
    :openChange="openChange"
  >
    <sider-item
      v-for="item in menuData"
      :key="item.path"
      :item="item"
    />
  </a-menu>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { AppRouterRecordRaw } from '../../../router/types';
import SiderItem from './SiderItem.vue';
import { getPermissionRoutes } from '../../../utils/router';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'sider',
  components: { SiderItem },
  props:{
    collapsed:{
      type:Boolean,
      required:false,
      default:false
    }
  },

  setup() {
    const selectedKeys = ref<string[]>([]);
    const openKeys = ref<string[]>([]);

    const route = useRoute();

    const menuData = computed<AppRouterRecordRaw[]>(() =>
      getPermissionRoutes()
    );

    watch(
      () => route.path,
      () => {
        selectedKeys.value = [route.path];
      }
    );


    // TO DO 
    // now cannot work
    const openChange = item => {
    };

    onMounted(() => {
      selectedKeys.value = [route.path];
    });

    return {
      menuData,
      selectedKeys,
      openKeys,
      openChange,
    };
  },
});
</script>
<style scoped></style>
