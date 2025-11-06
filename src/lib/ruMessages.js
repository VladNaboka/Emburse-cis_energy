// Делегируем на новый языкозависимый хук (ru/en/kk)
import { useT as useTFromI18n } from './i18nClient';
export const useT = useTFromI18n;
