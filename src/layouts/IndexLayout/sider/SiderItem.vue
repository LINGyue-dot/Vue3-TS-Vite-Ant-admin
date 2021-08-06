<template>
  <template v-if="renderChildren(item)">
    <a-sub-menu
      :title="item.meta.title"
      :key="getPath"
    >
      <sider-item
        v-for="it in item.children"
        :key="it.path"
        :item="it"
        :now-path="getPath"
      />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="getItemKey">
      <router-link :to="getPath">{{ item.meta.title }}</router-link>
    </a-menu-item>
  </template>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
// import { AppRouterRecordRaw } from 'router/types.ts';
import { renderChildren } from 'utils/router.ts';

export default defineComponent({
  name: 'SiderItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    nowPath: {
      type: String,
      required: false,
      default: () => '',
    },
  },

  setup(props) {
    /**
     * 获取现在的完整路径作为 key
     */
    const getPath = computed(() =>
      props.nowPath ? props.nowPath + '/' + props.item.path : props.item.path
    );

    /**
     * 获取 a-menu-item 的 key
     * 如果路径格式为 party/index 即菜单单页面，没有 a-sub-menu 的时候则需要加上 '/index' 作为 key 方便在 ./index  中 selectedKeys 进行高亮控制
     */
    const getItemKey = computed(() => {
      if (!props.item.children) {
        return getPath.value;
      } else {
        console.log(getPath.value + '/index')
        return getPath.value + '/index';
      }
    });

    return {
      renderChildren,
      getPath,
      getItemKey
    };
  },
});
</script>
<style scoped></style>
