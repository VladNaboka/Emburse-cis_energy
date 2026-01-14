'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/about.css';

export default function About() {
  const t = useT('About');
  return (
    <section className="about" id="about">
      <div className="about__inner container">
        <div className="about__col about__col--text">
          <p className="about__eyebrow">{t('eyebrow')}</p>
          <h2 className="about__title">{t('title')}</h2>
          <div className="about__copy">
            <p>{t('copy')}</p>
          </div>
          <a href="/#contact" className="btn-cta about__btn">
            {t('cta')}
          </a>
        </div>

        <div className="about__col about__col--media">
          <img
            className="about__img"
            src="/images/block2.png"
            alt=""
            width="592"
            height="473"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
