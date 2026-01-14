'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/hero.css';

export default function Hero() {
  const t = useT('Hero');
  return (
    <section className="hero">
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 420px)" srcSet="/images/hero/main390.png" />
          <source media="(max-width: 800px)" srcSet="/images/hero/main768.png" />
          <source media="(max-width: 1060px)" srcSet="/images/hero/main1024.png" />
          <source media="(max-width: 1480px)" srcSet="/images/hero/main1920.png" />
          <img src="/images/hero/main1920.png" alt="" loading="eager" decoding="async" />
        </picture>
      </div>
      <div className="hero__content container">
        <h1 className="hero__title" style={{ color: '#0c2340' }}>
          {t('title')}
        </h1>
        <h1 className="hero__title title_blue" style={{ color: '##0097DC' }}>
          {t('title_blue')}
        </h1>
        <div className="hero__ctas">
          <a className="btn-cta hero__btn" href="/pso">
            {t('cta')}
          </a>
          <a className="btn_demo" href="/#contact">
            {t('demo')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M0.110596 8.39014C0.110596 10.5119 0.953451 12.5467 2.45374 14.047C3.95403 15.5473 5.98886 16.3901 8.1106 16.3901C10.2323 16.3901 12.2672 15.5473 13.7675 14.047C15.2677 12.5467 16.1106 10.5119 16.1106 8.39014C16.1106 6.2684 15.2677 4.23357 13.7675 2.73328C12.2672 1.23299 10.2323 0.390137 8.1106 0.390137C5.98886 0.390137 3.95403 1.23299 2.45374 2.73328C0.953451 4.23357 0.110596 6.2684 0.110596 8.39014ZM7.64185 12.1714C7.3481 12.4651 6.8731 12.4651 6.58247 12.1714C6.29185 11.8776 6.28872 11.4026 6.58247 11.112L9.30122 8.39326L6.58247 5.67451C6.28872 5.38076 6.28872 4.90576 6.58247 4.61514C6.87622 4.32451 7.35122 4.32139 7.64185 4.61514L10.8918 7.85889C11.1856 8.15264 11.1856 8.62764 10.8918 8.91826L7.64185 12.1714Z"
                fill="#0097DC"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
