'use client';
import Image from 'next/image';
import { useT } from '../../lib/ruMessages';

const imgStyle = { width: '100%', height: 'auto' };

export default function AtomicClient() {
  const t = useT('Atomic');
  return (
    <div className="svc-scope">
      {/* HERO */}
      <section className="hero">
        <Image src="/images/services_4/main.png" alt={t('heroTitle')} className="hero__bg" width={1920} height={698} sizes="100vw" priority />
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
            <Image src="/images/services_4/1block.png" alt={t('s1.imgAlt')} width={1200} height={800} style={imgStyle} sizes="(max-width: 768px) 100vw, 50vw" />
          </figure>
        </article>

        {/* 2 */}
        <article className="svc-card_service svc-card_service--amber svc-card_service--alt">
          <figure className="svc-card_service__media">
            <Image
              style={{ ...imgStyle, boxShadow: 'none' }}
              src="/images/services_4/2block.png"
              alt={t('s2.imgAlt')}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
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
            <Image src="/images/services_4/3block.png" alt={t('s3.imgAlt')} width={1200} height={800} style={imgStyle} sizes="(max-width: 768px) 100vw, 50vw" />
          </figure>
        </article>
      </section>
    </div>
  );
}
