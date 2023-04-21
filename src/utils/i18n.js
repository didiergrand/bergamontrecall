
import i18n from "../data/i18n.json";

export function getTranslation(key, defaultValue = '') {  
      // get url
      const url = window.location.href;
      // get lang from url
      const urlLang = url.split("/")[4];
      let lang = "en";
      // set lang
      if(urlLang === "de" || urlLang === "fr" || urlLang === "it" || urlLang === "en" || urlLang === "es" || urlLang === "cs") {
        lang = urlLang;
      }

      let keys = key.split('.');
      let obj = i18n;
      for (let i = 0; i < keys.length; i++) {
        if (obj.hasOwnProperty(keys[i])) {
          obj = obj[keys[i]];
        } else {
          return defaultValue;
        }
      }
      if (obj.hasOwnProperty(lang)) {
        return obj[lang];
      } else {
        return defaultValue;
      }
  };