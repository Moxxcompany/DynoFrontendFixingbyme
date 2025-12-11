import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    resources: {
      pt: {
        common: require("./public/locales/pt/common.json"),
        auth: require("./public/locales/pt/auth.json"),
        dashboardLayout: require("./public/locales/pt/dashboardLayout.json"),
      },
      en: {
        common: require("./public/locales/en/common.json"),
        auth: require("./public/locales/en/auth.json"),
        dashboardLayout: require("./public/locales/en/dashboardLayout.json"),
      },
      fr: {
        common: require("./public/locales/fr/common.json"),
        auth: require("./public/locales/fr/auth.json"),
        
      },
      es: {
        common: require("./public/locales/es/common.json"),
        auth: require("./public/locales/es/auth.json"),
      },
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
