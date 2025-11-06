'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import RU from '../messages/ru.json';
import EN from '../messages/en.json';
import KZ from '../messages/kz.json';

export const SUPPORTED_LANGS = ['ru', 'en', 'kk'];

const DICTS = { ru: RU, en: EN, kk: KZ };

const I18nContext = createContext({
  lang: 'ru',
  setLang: () => {},
  t: () => '',
});

export function I18nProvider({ children, initialLang = 'ru' }) {
  const startLang = SUPPORTED_LANGS.includes(initialLang) ? initialLang : 'ru';
  const [lang, _setLang] = useState(startLang);

  const setLang = useCallback((next) => {
    const val = SUPPORTED_LANGS.includes(next) ? next : 'ru';
    _setLang(val);
    try {
      // html lang
      if (typeof document !== 'undefined') {
        document.documentElement.lang = val;
        // cookie на год
        document.cookie = `lang=${val}; path=/; max-age=31536000; samesite=lax`;
      }
      // дублируем в localStorage (по желанию)
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem('lang', val);
      }
    } catch {}
  }, []);

  // При первом рендере тоже выставим <html lang=...> (SSR уже отдаст правильный язык из initialLang)
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {}
  }, [lang]);

  const t = useCallback(
    (ns, key) => {
      if (!ns || !key) return '';
      const dict = DICTS[lang]?.[ns] || DICTS.ru?.[ns] || {};
      // поддержка вложенных ключей через точки: "section.title"
      const val = key
        .split('.')
        .reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), dict);
      return val != null ? val : key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

// Back-compat: тот же API, что был — useT('Namespace') -> (key) => string
export function useT(ns) {
  const { t } = useI18n();
  return useCallback((key) => t(ns, key), [t, ns]);
}
