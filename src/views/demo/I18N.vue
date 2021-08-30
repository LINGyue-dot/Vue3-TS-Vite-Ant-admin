<template>
  <h1>vue-i18n</h1>
  <h1>{{ t('profile.name') }}</h1>
  <a-button @click="changeLanguage">改变语言</a-button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t, locale } = useI18n();

    const changeLanguage = () => {
      if (locale.value === 'en') {
        locale.value = 'zh-cn';
      } else {
        locale.value = 'en';
      }
    };

    return {
      t,
      changeLanguage,
    };
  },
});
</script>

<style scoped></style>
