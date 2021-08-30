<template>
  <h1>{{ x }}</h1>

  <h1>fetch Data :{{ res }}</h1>
</template>
<script lang="ts" setup>
import { computed } from '@vue/runtime-core';
import { useFetchHook, useMouse } from './useHookDemo';

const { x } = useMouse();

const data = useFetchHook();

const res = computed(() => data.value);
</script>
<style scoped></style>
