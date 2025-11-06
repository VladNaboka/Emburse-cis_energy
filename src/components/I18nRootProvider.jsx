'use client';
import { I18nProvider } from '../lib/i18nClient';

export default function I18nRootProvider({ children, initialLang = 'ru' }) {
  return <I18nProvider initialLang={initialLang}>{children}</I18nProvider>;
}
