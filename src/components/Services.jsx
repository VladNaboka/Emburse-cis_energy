'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/services.css';

export default function Services() {
  const t = useT('Services');

  const locale = typeof window !== 'undefined' ? location.pathname.split('/')[1] || 'ru' : 'ru';
  return (
    <section className="services" id="services">
      <div className="services__inner container">
        <header className="services__head">
          <p className="services__eyebrow">{t('eyebrow')}</p>
          <h2 className="services__title">{t('title')}</h2>
          <p className="services__lead">{t('lead')}</p>
        </header>

        <div className="services__grid">
          {/* 1 */}
          <article className="svc-card">
            <div className="svc-card__body">
              <h3 className="svc-card__title">{t('oilgas.title')}</h3>
              <p className="svc-card__text">{t('oilgas.text')}</p>
              <a className="svc-card__link" href={`/services/oil-gas`}>
                <span>{t('more')}</span>
                <svg
                  className="svc-card__arrow"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  aria-hidden="true"
                >
                  <path
                    d="M0.83 8.56c0 2.12.84 4.15 2.34 5.65A7.99 7.99 0 1 0 0.83 8.56Zm7.53 3.78a.9.9 0 0 1-1.06 0 .9.9 0 0 1 0-1.06l2.72-2.72-2.72-2.72a.9.9 0 1 1 1.27-1.27l3.25 3.24a.9.9 0 0 1 0 1.27l-3.25 3.26Z"
                    fill="#0097DC"
                  />
                </svg>
              </a>
            </div>
            <img
              className="svc-card__img"
              src="/images/block3_1.png"
              alt=""
              width="178"
              height="118"
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* 2 */}
          <article className="svc-card">
            <div className="svc-card__body">
              <h3 className="svc-card__title">{t('mining.title')}</h3>
              <p className="svc-card__text">{t('mining.text')}</p>
              <a className="svc-card__link" href={`/services/mining`}>
                <span>{t('more')}</span>
                <svg
                  className="svc-card__arrow"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  aria-hidden="true"
                >
                  <path
                    d="M0.83 8.56c0 2.12.84 4.15 2.34 5.65A7.99 7.99 0 1 0 0.83 8.56Zm7.53 3.78a.9.9 0 0 1-1.06 0 .9.9 0 0 1 0-1.06l2.72-2.72-2.72-2.72a.9.9 0 1 1 1.27-1.27l3.25 3.24a.9.9 0 0 1 0 1.27l-3.25 3.26Z"
                    fill="#0097DC"
                  />
                </svg>
              </a>
            </div>
            <img
              className="svc-card__img"
              src="/images/block3_2.png"
              alt=""
              width="178"
              height="118"
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* 3 */}
          <article className="svc-card">
            <div className="svc-card__body">
              <h3 className="svc-card__title">{t('it.title')}</h3>
              <p className="svc-card__text">{t('it.text')}</p>
              <a className="svc-card__link" href={`/services/it`}>
                <span>{t('more')}</span>
                <svg
                  className="svc-card__arrow"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  aria-hidden="true"
                >
                  <path
                    d="M0.83 8.56c0 2.12.84 4.15 2.34 5.65A7.99 7.99 0 1 0 0.83 8.56Zm7.53 3.78a.9.9 0 0 1-1.06 0 .9.9 0 0 1 0-1.06l2.72-2.72-2.72-2.72a.9.9 0 1 1 1.27-1.27l3.25 3.24a.9.9 0 0 1 0 1.27l-3.25 3.26Z"
                    fill="#0097DC"
                  />
                </svg>
              </a>
            </div>
            <img
              className="svc-card__img"
              src="/images/block3_3.png"
              alt=""
              width="178"
              height="118"
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* 4 */}
          <article className="svc-card">
            <div className="svc-card__body">
              <h3 className="svc-card__title">{t('atomic.title')}</h3>
              <p className="svc-card__text">{t('atomic.text')}</p>
              <a className="svc-card__link" href={`/services/atomic`}>
                <span>{t('more')}</span>
                <svg
                  className="svc-card__arrow"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  aria-hidden="true"
                >
                  <path
                    d="M0.83 8.56c0 2.12.84 4.15 2.34 5.65A7.99 7.99 0 1 0 0.83 8.56Zm7.53 3.78a.9.9 0 0 1-1.06 0 .9.9 0 0 1 0-1.06l2.72-2.72-2.72-2.72a.9.9 0 1 1 1.27-1.27l3.25 3.24a.9.9 0 0 1 0 1.27l-3.25 3.26Z"
                    fill="#0097DC"
                  />
                </svg>
              </a>
            </div>
            <img
              className="svc-card__img"
              src="/images/block3_4.png"
              alt=""
              width="178"
              height="118"
              loading="lazy"
              decoding="async"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
