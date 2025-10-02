// Simple RU-only messages helper to replace i18n usage
import messages from '../messages/ru.json';

export function useT(ns) {
  const dict = (messages && messages[ns]) || {};
  return function t(key) {
    if (!key) return '';
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      return dict[key];
    }
    // fallback for nested keys like 's1.title' inside a namespace file
    const nested = key.split('.').reduce((acc, k) => (acc && acc[k] ? acc[k] : undefined), dict);
    return nested ?? key;
  };
}
