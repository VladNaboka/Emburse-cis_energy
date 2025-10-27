// src/components/Why.jsx
'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/why.css';

export default function Why() {
  const t = useT('Why');
  return (
    <section className="why">
      <div className="why__inner container">
        <header className="why__head">
          <h2 className="why__title">{t('title')}</h2>
        </header>

        <div className="why__grid">
          {/* Card 1 */}
          <article className="why-card why-card--v1">
            <div className="why-card__q" aria-hidden="true">
              “
            </div>
            <div className="why-card__content">
              <p className="why-card__text why-card__text--bold">{t('cards.0.text')}</p>
            </div>
            <div className="why-card__person">
              <div className="why-card__name">{t('cards.0.name')}</div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="why-card why-card--v2">
            <div className="why-card__q" aria-hidden="true">
              “
            </div>
            <div className="why-card__content">
              <p className="why-card__text why-card__text--bold">{t('cards.1.text')}</p>
            </div>
            <div className="why-card__person">
              <div className="why-card__name" style={{ alignSelf: 'end' }}>
                {t('cards.1.name')}
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="why-card why-card--v3">
            <div className="why-card__q" aria-hidden="true">
              “
            </div>
            <div className="why-card__content">
              <p className="why-card__text why-card__text--bold">{t('cards.2.text')}</p>
            </div>
            <div className="why-card__person">
              <div className="why-card__name">{t('cards.2.name')}</div>
              {/* <div className="why-card__role">{t('cards.2.role')}</div> */}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
