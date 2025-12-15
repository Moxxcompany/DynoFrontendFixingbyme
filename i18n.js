import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const isServer = typeof window === "undefined";

// Always start with ENGLISH for SSR + hydration
const DEFAULT_LANGUAGE = "en";

i18n.use(initReactI18next).init({
  lng: DEFAULT_LANGUAGE, // 🔑 critical
  fallbackLng: DEFAULT_LANGUAGE,
  debug: false,

  resources: {
    en: {
      common: require("./langs/locales/en/common.json"),
      auth: require("./langs/locales/en/auth.json"),
      dashboardLayout: require("./langs/locales/en/dashboardLayout.json"),
    },
    pt: {
      common: require("./langs/locales/pt/common.json"),
      auth: require("./langs/locales/pt/auth.json"),
      dashboardLayout: require("./langs/locales/pt/dashboardLayout.json"),
    },
    fr: {
      common: require("./langs/locales/fr/common.json"),
      auth: require("./langs/locales/fr/auth.json"),
    },
    es: {
      common: require("./langs/locales/es/common.json"),
      auth: require("./langs/locales/es/auth.json"),
    },
  },

  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false, // safer for Next.js pages router
  },
});

// Optional logs (safe)
if (!isServer) {
  i18n.on("languageChanged", (lng) => {
    console.log("[i18n] language changed →", lng);
  });
}

export default i18n;
