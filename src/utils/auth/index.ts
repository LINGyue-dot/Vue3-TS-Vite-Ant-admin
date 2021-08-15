/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 15:53:42
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 16:01:13
 * @Description: 权限认证工具函数
 */

export const TOKEN_NAME = 'X-Token'


export function getToken() {
  return localStorage.getItem(TOKEN_NAME)
}

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_NAME, token)
  } catch (e) {
  }
}

export function removeToken(){
  try{
    localStorage.removeItem(TOKEN_NAME)
  }catch(e){
    
  }
}