<template>
  <h1>WebSocket Test</h1>
  <a-input v-model:value="inputVal" />
  <a-button @click="connectWebsocket"> connect WebSocket</a-button>
  <a-button @click="sendMessage">send message</a-button>

  <a-list>
    <a-list-item v-for="msg in msgList" :key="msg">
      <a-alert message="info">{{ msg }}</a-alert>
    </a-list-item>
  </a-list>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { ref, unref } from 'vue';

let ws: null | WebSocket = null;

const msgList = ref<string[] | []>([]);

const inputVal = ref();

const connectWebsocket = () => {
  ws = new WebSocket('ws://localhost:7000');
  ws.onopen = () => {
    let tempList = msgList.value;
    ws?.send('front-end connect');
    message.info('connect success');
  };
};

const sendMessage = () => {
  if (!inputVal.value) {
    return;
  }
  message.info(inputVal.value);
  ws?.send(inputVal.value);
};
</script>
<style scoped></style>
