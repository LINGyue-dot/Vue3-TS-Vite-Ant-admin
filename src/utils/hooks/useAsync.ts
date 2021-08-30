import { onMounted, Ref, ref } from "vue";


/**
 * 异步请求封装状态等 hook
 * 入参：异步的函数
 * return 
 */
export function useAsync<T>({ asyncFn, data }: {
  asyncFn: () => Promise<T>,
  data: Ref<T>
}) {

  enum RequestState {
    Idle, // 初始化 
    Success, // 成功
    Fail, // 失败
    Loading // 正在加载
  }

  // 当前状态
  const state = ref<RequestState>(RequestState.Idle)

  const idle = ref<boolean>(false)

  const success = ref<boolean>(false)

  const fail = ref<boolean>(false)

  const loading = ref<boolean>(false)


  onMounted(async () => {
    idle.value = true
    try {
      const res = await asyncFn()
      success.value = true
      data.value = res
    } catch (e) {
      fail.value = true
      data.value = e
    }
  })


  return {
    state,
    idle,
    success,
    fail,
    loading
  }





}