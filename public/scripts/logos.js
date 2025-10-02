(() => {
  function initLogos(section) {
    const viewport = section.querySelector('.logos__viewport');
    const track = section.querySelector('.logos__track');
    const prevBtn = section.querySelector('.logos__btn--prev');
    const nextBtn = section.querySelector('.logos__btn--next');
    if (!viewport || !track || !prevBtn || !nextBtn) return;

    const page = () => Math.max(200, Math.floor(viewport.clientWidth * 0.95));

    function updateButtons() {
      // учитываем padding 15px у viewport — clientWidth уже его учитывает, это ок
      const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const x = viewport.scrollLeft;
      prevBtn.disabled = x <= 0;
      nextBtn.disabled = x >= max - 1;
    }

    prevBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: -page(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: page(), behavior: 'smooth' });
    });

    // drag / swipe
    let startX = 0,
      startScroll = 0,
      dragging = false;
    const onDown = (e) => {
      dragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startScroll = viewport.scrollLeft;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      viewport.scrollLeft = startScroll - (x - startX);
    };
    const onUp = () => {
      dragging = false;
    };

    viewport.addEventListener('mousedown', onDown);
    viewport.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    viewport.addEventListener('touchstart', onDown, { passive: true });
    viewport.addEventListener('touchmove', onMove, { passive: true });
    viewport.addEventListener('touchend', onUp);

    // пересчёт при ресайзе/скролле
    viewport.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    // старт: когда картинки загрузятся — трек получает реальную ширину
    const imgs = Array.from(track.querySelectorAll('img'));
    let left = imgs.length;
    imgs.forEach((img) => {
      if (img.complete) {
        if (--left === 0) updateButtons();
      } else
        img.addEventListener(
          'load',
          () => {
            if (--left === 0) updateButtons();
          },
          { once: true }
        );
    });
    if (imgs.length === 0) updateButtons();

    // на всякий случай — если размеры поменялись (dpi/стили)
    new ResizeObserver(updateButtons).observe(track);
  }

  document.querySelectorAll('.logos').forEach(initLogos);
})();
