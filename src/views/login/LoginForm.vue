<template>
  <div class="items-center m-auto w-70">
    <a-form :model="formData" :rules="formRules" @finish="login">
      <a-form-item label="账号">
        <a-input has-feedback v-model:value="formData.user_account" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          has-feedback
          v-model:value="formData.user_password"
          type="password"
        ></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">登入</a-button>
        <a-button style="margin-left: 10px" @click="register">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { UserStateType } from '../../store/modules/user';
export default defineComponent({
  name: 'LoginForm',

  setup () {
    const store = useStore<{ user: UserStateType }>();

    const router =useRouter()

    const formData = reactive({
      user_account: '',
      user_password: '',
    });

    const formRules = {
      user_account: [{ required: true, trigger: 'change' }],
      user_password: [{ required: true, trigger: 'change' }],
    };

    const register = () => {};

    const login = async () => {
      try {
        await store.dispatch('user/login', formData);
        router.replace('/dashboard/analysis')
      } catch (e) {
        console.log('--------')
      }
    };

    return {
      formData,
      formRules,
      register,
      login,
    };
  },
});
</script>
<style scoped></style>
