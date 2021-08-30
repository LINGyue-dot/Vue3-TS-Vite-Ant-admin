import { createI18n } from 'vue-i18n';

import enLocale from './en.json';
import zhLocale from './zh-cn.json';

// type MessageSchema = typeof enLocale;

console.log(zhLocale.profile.name);

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
