// src/components/WhyCIS.jsx
'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/why-cis.css';

export default function WhyCIS() {
  const t = useT('WhyCIS');
  return (
    <section className="why-cis" id="why-cis">
      <div className="why-cis__inner">
        <header className="why-cis__left">
          <p className="why-cis__eyebrow">{t('eyebrow')}</p>
          <h2 className="why-cis__title">{t('title')}</h2>
          <p className="why-cis__lead">{t('lead')}</p>
        </header>

        <div className="why-cis__right" aria-label={t('ariaList')}>
          <ul className="why-cis__list">
            {Array.from({ length: 7 }).map((_, i) => (
              <li className="why-cis__item" key={i}>
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
                <span className="why-cis__text">{t(`items.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
