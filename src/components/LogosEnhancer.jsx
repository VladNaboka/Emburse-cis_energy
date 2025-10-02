'use client';
import { useEffect } from 'react';

export default function LogosEnhancer() {
  useEffect(() => {
    const cleanups = [];

    document.querySelectorAll('.logos').forEach((section) => {
      const viewport = section.querySelector('.logos__viewport');
      const track = section.querySelector('.logos__track');
      const prevBtn = section.querySelector('.logos__btn--prev');
      const nextBtn = section.querySelector('.logos__btn--next');
      if (!viewport || !track || !prevBtn || !nextBtn) return;

      let index = 0;

      const isScrollable = () => track.scrollWidth > viewport.clientWidth + 1;

      const apply = () => {
        // если всё влезает — центрируем, кнопки вырубаем
        if (!isScrollable()) {
          viewport.scrollLeft = 0;
          track.style.transform = 'none';
          prevBtn.disabled = true;
          nextBtn.disabled = true;
          return;
        }

        const step = viewport.clientWidth; // пересчитываем на каждом вызове
        const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);

        // приводим индекс к допустимому диапазону
        const maxIndex = Math.ceil(maxScroll / step);
        index = Math.max(0, Math.min(index, maxIndex));

        const x = Math.min(maxScroll, Math.max(0, Math.round(index * step)));
        // скроллим сам viewport, а не двигаем трек — не ломает центрирование
        viewport.scrollTo({ left: x, behavior: 'smooth' });

        prevBtn.disabled = x <= 0;
        nextBtn.disabled = x >= maxScroll - 1;
      };

      const onPrev = () => {
        index -= 1;
        apply();
      };
      const onNext = () => {
        index += 1;
        apply();
      };

      prevBtn.addEventListener('click', onPrev);
      nextBtn.addEventListener('click', onNext);

      // стабильная реакция на любые изменения размеров
      const ro = new ResizeObserver(apply);
      ro.observe(viewport);
      ro.observe(track);

      cleanups.push(() => {
        prevBtn.removeEventListener('click', onPrev);
        nextBtn.removeEventListener('click', onNext);
        ro.disconnect();
      });

      apply();
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
