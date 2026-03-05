import { useEffect } from "react";
import i18n from "@/i18n";

const SUPPORTED_LANGUAGES = ["en", "pt", "fr", "es"];

export default function LanguageBootstrap() {
  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
      // Saved preference exists — apply it if not already active
      if (saved !== i18n.language) {
        i18n.changeLanguage(saved);
      }
      return;
    }

    // No saved preference — detect from browser locale
    const browserLang = navigator.language?.split("-")[0];
    if (browserLang && SUPPORTED_LANGUAGES.includes(browserLang)) {
      i18n.changeLanguage(browserLang);
      // changeLanguage triggers the languageChanged listener which saves to localStorage
    }
  }, []);

  return null;
}
