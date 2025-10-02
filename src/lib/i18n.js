// import ru from "@/i18n/dictionaries/ru.json";
// import kk from "@/i18n/dictionaries/kk.json";
// import en from "@/i18n/dictionaries/en.json";

export const locales = ['ru', 'kk', 'en'];
export const defaultLocale = 'ru';

export function getDictionary(locale) {
  switch (locale) {
    case 'kk':
      return kk;
    case 'en':
      return en;
    default:
      return ru;
  }
}
