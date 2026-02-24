'use client';
import { useT } from '../../lib/ruMessages';

export default function PSOClient() {
  const t = useT('PSO');
  return (
    <div className="svc-scope">
      {/* HERO */}
      <section className="hero">
        <img src="/images/pso/main.png" alt={t('heroTitle') || 'PSO'} className="hero__bg" />
        <div className="hero__overlay">
          <div className="hero__content container">
            <h1 className="hero__title_s">{t('heroTitle')}</h1>
            <p className="hero__subtitle">{t('heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* ABOUT (2 columns) */}
      <section className="about">
        <div className="about__inner container">
          <div className="about__col about__col--text">
            <h2 className="about__title">{t('about.title')}</h2>
            <div className="about__copy">
              <p>{t('about.p1')}</p>
              <p>
                <b>{t('about.quote')}</b>
              </p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
              <p>{t('about.p4')}</p>
            </div>
          </div>
          <div className="about__col about__col--media">
            <img className="about_pso__img img-service" src="/images/pso/block1.png" alt="" />
          </div>
        </div>
      </section>

      {/* WHY CIS (checklist) */}
      <section className="why-cis" id="why-cis">
        <div className="why-cis__inner container">
          <header className="why-cis__left">
            <h2 className="why-cis__title">{t('why.title')}</h2>
            <p className="why-cis__lead">{t('why.lead')}</p>
          </header>

          <div className="why-cis__right" aria-label={t('why.ariaList')}>
            <ul className="why-cis__list">
              <li className="why-cis__item">
                <span className="why-cis__check" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M12.375 1.34131L4.64062 9.07568L1.125 5.56006"
                      stroke="#0097DC"
                      strokeWidth="1.40625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="why-cis__text">{t('why.li1')}</span>
              </li>
              <li className="why-cis__item">
                <span className="why-cis__check" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M12.375 1.34131L4.64062 9.07568L1.125 5.56006"
                      stroke="#0097DC"
                      strokeWidth="1.40625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="why-cis__text">{t('why.li2')}</span>
              </li>
              <li className="why-cis__item">
                <span className="why-cis__check" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M12.375 1.34131L4.64062 9.07568L1.125 5.56006"
                      stroke="#0097DC"
                      strokeWidth="1.40625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="why-cis__text">{t('why.li3')}</span>
              </li>
              <li className="why-cis__item">
                <span className="why-cis__check" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M12.375 1.34131L4.64062 9.07568L1.125 5.56006"
                      stroke="#0097DC"
                      strokeWidth="1.40625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="why-cis__text">{t('why.li4')}</span>
              </li>
              <li className="why-cis__item">
                <span className="why-cis__check" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M12.375 1.34131L4.64062 9.07568L1.125 5.56006"
                      stroke="#0097DC"
                      strokeWidth="1.40625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="why-cis__text">{t('why.li5')}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="container metrics">
        <div className="metrics__row">
          <div className="metric">
            <b>{t('metrics.m1n')}</b>
            <span>{t('metrics.m1t')}</span>
          </div>
          <div className="metric">
            <b>{t('metrics.m2n')}</b>
            <span>{t('metrics.m2t')}</span>
          </div>
          <div className="metric">
            <b>{t('metrics.m3n')}</b>
            <span>{t('metrics.m3t')}</span>
          </div>
          <div className="metric">
            <b>{t('metrics.m4n')}</b>
            <span>{t('metrics.m4t')}</span>
          </div>
        </div>
      </section>

      <main className="container svc">
        <h2 className="about__title" style={{ marginBottom: '-30px' }}>
          {t('cycle.title')}
        </h2>

        {/* 1 - изображение справа */}
        <article className="svc-card_service svc-card_service--blue">
          <div className="svc-card_service__body">
            <h2 className="svc-card_service__title">{t('s1.title')}</h2>
            <div className="svc-card_service__text">
              <p className="fira">
                <b>{t('s1.b1')}</b>
              </p>
              <p className="fira">
                <b>{t('s1.b2')}</b>
              </p>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/pso/block4.png" alt={t('s1.imgAlt')} />
          </figure>
        </article>

        {/* 2 - изображение слева */}
        <article className="svc-card_service svc-card_service--amber svc-card_service--alt">
          <figure className="svc-card_service__media">
            <img src="/images/pso/block5.png" alt={t('s2.imgAlt')} />
          </figure>
          <div className="svc-card_service__body">
            <h2 className="svc-card_service__title">{t('s2.title')}</h2>
            <div className="svc-card_service__text">
              <p className="fira">
                <b>{t('s2.b1')}</b>
              </p>
              <p className="fira">
                <b>{t('s2.b2')}</b>
              </p>
            </div>
          </div>
        </article>

        {/* 3 - изображение справа */}
        <article className="svc-card_service svc-card_service--green">
          <div className="svc-card_service__body">
            <h2 className="svc-card_service__title">{t('s3.title')}</h2>
            <div className="svc-card_service__text">
              <p className="fira">
                <b>{t('s3.b1')}</b>
              </p>
              <p className="fira">
                <b>{t('s3.b2')}</b>
              </p>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/pso/block6.png" alt={t('s3.imgAlt')} />
          </figure>
        </article>

        {/* 4 - изображение слева */}
        <article
          className="svc-card_service svc-card_service--blue svc-card_service--alt"
          style={{ marginBottom: '100px' }}
        >
          <figure className="svc-card_service__media">
            <img src="/images/pso/block7.png" alt={t('s4.imgAlt')} />
          </figure>
          <div className="svc-card_service__body">
            <h2 className="svc-card_service__title">{t('s4.title')}</h2>
            <div className="svc-card_service__text">
              <p className="fira">
                <b>{t('s4.b1')}</b>
              </p>
              <p className="fira">
                <b>{t('s4.b2')}</b>
              </p>
            </div>
          </div>
        </article>
      </main>

      {/* Авторское право (responsive picture) */}
      <section className="b7" id="block7" style={{ marginBottom: '100px' }}>
        <div className="b7__inner">
          <h2 className="b7__title">{t('copyright.title')}</h2>

          <picture>
            <source media="(max-width: 420px)" srcSet="/images/block7_768.png" />
            <source media="(max-width: 800px)" srcSet="/images/block7_1024.png" />
            <source media="(max-width: 1060px)" srcSet="/images/block7_1024.png" />
            <img className="b7__img" src="/images/block7_1920.png" alt="" loading="lazy" />
          </picture>
        </div>
      </section>
    </div>
  );
}
