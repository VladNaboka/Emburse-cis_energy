import { useT } from '../../../lib/ruMessages';
import './page.css';

export const metadata = { title: 'IT | CIS ENERGY' };

export default function ITPage() {
  const t = useT('Atomic');

  return (
    <div className="svc-scope">
      {/* HERO */}
      <section className="hero">
        <img src="/images/services_4/main.png" alt={t('heroTitle')} className="hero__bg" />
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
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/services_4/1block.png" alt={t('s1.imgAlt')} />
          </figure>
        </article>

        {/* 2 */}
        <article className="svc-card_service svc-card_service--amber svc-card_service--alt">
          <figure className="svc-card_service__media">
            <img
              style={{ boxShadow: 'none' }}
              src="/images/services_4/2block.png"
              alt={t('s2.imgAlt')}
            />
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
        <article
          className="svc-card_service svc-card_service--green"
          style={{ marginBottom: '100px' }}
        >
          <div className="svc-card_service__body_service">
            <h2 className="svc-card_service__title">{t('s3.title')}</h2>
            <div className="svc-card_service__text">
              <ul className="svc-list">
                <li>{t('s3.li1')}</li>
                <li>{t('s3.li2')}</li>
                <li>{t('s3.li3')}</li>
                <li>{t('s3.li4')}</li>
              </ul>
            </div>
          </div>
          <figure className="svc-card_service__media">
            <img src="/images/services_4/3block.png" alt={t('s3.imgAlt')} />
          </figure>
        </article>
      </section>
    </div>
  );
}
