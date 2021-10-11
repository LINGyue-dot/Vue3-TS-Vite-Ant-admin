/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-09-22 22:21:59
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-11 10:44:04
 * @Description: 
 */
import { createI18n } from 'vue-i18n';

import enLocale from './en.json';
import zhLocale from './zh-cn.json';

// type MessageSchema = typeof enLocale;

const locale =
  window.localStorage.getItem('language') ||
  window.navigator.language.toLocaleLowerCase();

const i18n = createI18n({
  locale,
  legacy: false,
  messages: {
    'zh-cn': zhLocale,
    en: enLocale,
  },
});

i18n.global.locale.value = locale;
window.localStorage.setItem('language', locale);

export { locale };

export default i18n;
