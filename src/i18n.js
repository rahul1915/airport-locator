import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEng from "../src/locales/en/translation.json";
import translationDutch from "../src/locales/nl/translation.json";
i18n
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: window.localStorage.getItem('i18nextLng'),
    fallbackLng: "en-US", // use if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      "en-US": {
        translations: translationEng
      },
      "nl": {
        translations: translationDutch
      }
    },
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations"
  });

export default i18n;
