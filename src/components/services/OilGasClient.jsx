'use client';
import { useT } from '../../lib/ruMessages';
import { useI18n } from '../../lib/i18nClient';

export default function OilGasClient() {
  const t = useT('OilGas');
  const { lang } = useI18n();
  return (
    <div className="svc-scope">
      <section className="hero">
        <img src="/images/services_1/main.png" alt={t('heroTitle')} className="hero__bg" />
        <div className="hero__overlay">
          <div className="hero__content container">
            <h1 className="hero__title_s">{t('heroTitle')}</h1>
            <p className="hero__subtitle">{t('heroSubtitle')}</p>
          </div>
        </div>
      </section>

      <section className="svc">
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
            <img src="/images/services_1/block2.png" alt="PSO" />
          </figure>
        </article>

        <article className="svc-card_service svc-card_service--amber svc-card_service--alt">
          <figure className="svc-card_service__media">
            <img src="/images/services_1/block3.png" alt="Conceptual design" />
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

        {/* 3 — текст слева, картинка справа */}
        <article className="svc-card_service svc-card_service--green">
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s3.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s3.li1')}</li>
                <li>{t('s3.li2')}</li>
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src={lang === 'en' ? '/images/services_1/block4_en.png' : '/images/services_1/block4.png'} alt={t('s3.title')} />
          </figure>
        </article>

        {/* 4 — текст справа, картинка слева */}
        <article className="svc-card_service svc-card_service--blue svc-card_service--alt short">
          <figure className="svc-card_service__media">
            <img src="/images/services_1/block5.png" alt="SCADA" />
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

        {/* 5 — текст слева, картинка справа */}
        <article
          className="svc-card_service svc-card_service--amber tall"
          style={{ marginBottom: '100px' }}
        >
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s5.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s5.li1')}</li>
                <li>{t('s5.li2')}</li>
                <li>{t('s5.li3')}</li>
                <li>{t('s5.li4')}</li>
                <li>{t('s5.li5')}</li>
                <li>{t('s5.li6')}</li>
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/services_1/block6.png" alt="R&D" />
          </figure>
        </article>
      </section>
    </div>
  );
}
