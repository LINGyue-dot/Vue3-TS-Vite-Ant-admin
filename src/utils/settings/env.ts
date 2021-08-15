/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 23:20:44
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 23:28:26
 * @Description: 获取 env 中数据
 */

export function getApi() {
  return import.meta.env.VITE_API_URL as unknown as string | undefined
}
