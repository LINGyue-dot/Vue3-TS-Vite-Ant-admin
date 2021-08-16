<template>
  <div class="w-screen h-screen flex">
    <login-form />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from './LoginForm.vue'
export default defineComponent({
  components: { LoginForm },

})
</script>
<style scoped></style>
