'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/b7.css';

export default function Block7() {
  const t = useT('Block7');
  return (
    <section className="b7" id="block7">
      <div className="b7__inner">
        <h2 className="b7__title">{t('title')}</h2>

        <picture>
          {/* источники под разные ширины экрана (опционально) */}
          <source media="(max-width: 420px)" srcSet="/images/block7_768.png" />
          <source media="(max-width: 800px)" srcSet="/images/block7_1024.png" />
          <source media="(max-width: 1060px)" srcSet="/images/block7_1024.png" />
          <img
            className="b7__img"
            src="/images/block7_1920.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}
