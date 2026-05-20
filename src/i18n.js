import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import common_es from './locales/es/common.json';
import common_en from './locales/en/common.json';
import common_fr from './locales/fr/common.json';
import common_de from './locales/de/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { common: common_es },
      en: { common: common_en },
      fr: { common: common_fr },
      de: { common: common_de },
    },
    fallbackLng: 'es',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
