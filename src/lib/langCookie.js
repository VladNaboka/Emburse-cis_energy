// всегда класть в корень сайта и надолго
export function setLangCookie(lang) {
  const safe = ['ru', 'kz', 'en'].includes((lang || '').toLowerCase()) ? lang.toLowerCase() : 'ru';
  // 365 дней
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `lang=${safe}; path=/; max-age=${maxAge}; samesite=lax`;
}
