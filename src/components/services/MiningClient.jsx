'use client';
import { useT } from '../../lib/ruMessages';
import { useI18n } from '../../lib/i18nClient';

export default function MiningClient() {
  const t = useT('Mining');
  const { lang } = useI18n();
  return (
    <div className="svc-scope">
      <section className="hero">
        <img src="/images/services_2/main.png" alt={t('heroTitle')} className="hero__bg" />
        <div className="hero__overlay">
          <div className="hero__content container">
            <h1 className="hero__title_s">{t('heroTitle')}</h1>
            <p className="hero__subtitle">{t('heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="svc">
        {/* 1 */}
        <article className="svc-card_service svc-card_service--blue">
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s1.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s1.li1')}</li>
                <li>{t('s1.li2')}</li>
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/services_2/block2.png" alt={t('s1.imgAlt')} />
          </figure>
        </article>

        {/* 2 */}
        <article className="svc-card_service svc-card_service--amber svc-card_service--alt">
          <figure className="svc-card_service__media">
            <img src="/images/services_2/block3.png" alt={t('s2.imgAlt')} />
          </figure>
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s2.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s2.li1')}</li>
              </ul>
            </div>
          </div>
        </article>

        {/* 3 */}
        <article className="svc-card_service svc-card_service--green">
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s3.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s3.li1')}</li>
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src={lang === 'en' ? '/images/services_2/block4_en.png' : '/images/services_2/block4.png'} alt={t('s3.imgAlt')} />
          </figure>
        </article>

        {/* 4 */}
        <article className="svc-card_service svc-card_service--blue svc-card_service--alt">
          <figure className="svc-card_service__media">
            <img src="/images/services_2/block5.png" alt={t('s4.imgAlt')} />
          </figure>
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s4.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s4.li1')}</li>
              </ul>
            </div>
          </div>
        </article>

        {/* 5 */}
        <article className="svc-card_service svc-card_service--amber">
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s5.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s5.li1')}</li>
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/services_2/block6.png" alt={t('s5.imgAlt')} />
          </figure>
        </article>

        {/* 6 */}
        <article
          className="svc-card_service svc-card_service--green svc-card_service--alt"
          style={{ marginBottom: '100px' }}
        >
          <figure className="svc-card_service__media">
            <img src="/images/services_2/block7.png" alt={t('s6.imgAlt')} />
          </figure>
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s6.title')}</h2>
            <div className="svc-card_service__text">
              <p>{t('s6.p1')}</p>
              <ul className="svc-list">
                <li>{t('s6.li1')}</li>
                <li>{t('s6.li2')}</li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
