/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-16 17:23:35
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-04 16:21:47
 * @Description: api 业务耦合文件
 */

import { http } from "../utils/http/axios";

export async function getCurrent() {
  return await http.get({
    url: '/users/info',
  }, { withToken: false })
}

export async function login(formData) {
  return await http.post({
    url: '/users/login',
    data: formData
  }, {
    showErrorMessage: true
  })
}


