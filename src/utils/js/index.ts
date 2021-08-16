/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 20:35:15
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 21:24:53
 * @Description: js 的辅助函数
 */

/**
 * 判断数据类型
 * @param {*} obj
 * @returns 字符
 * 例如 typeOf('asd') return "string"
 */
export function typeOf(obj) {
  return typeof obj !== 'object'
    ? typeof obj
    : Object.call(obj, '')
      .prototype.toString()
      .slice(8, -1)
      .toLowCase();
}

export function isFuntion(fn) {
  return typeOf(fn) === 'function';
}

/**
 * temp 深拷贝
 * !!!!! to do
 * @param target 
 * @returns 
 */
export function deepCopy<T = any>(target: T): T {
  return JSON.parse(JSON.stringify(target));
}
