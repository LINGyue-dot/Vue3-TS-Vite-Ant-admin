import { Ref, ref } from "vue";
import { getApi } from "../../utils/settings/env";



export function useMouse() {
  const x = ref(0)

  const y = ref(0)

  document.onmousemove = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  return {
    x,
    y
  }
}

/**
 * fetch 只是做演示可使用封装好的 axios 进行替换
 */
export function useFetchHook() {
  const baseApi = getApi()
  const data = ref<any>()
  fetch(`${baseApi}`).then(r => r.json()).then(res => data.value = res)
  return data
}







