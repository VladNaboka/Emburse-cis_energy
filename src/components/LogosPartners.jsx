// src/components/LogosPartners.jsx
'use client';
import { useT } from '../lib/ruMessages';
import '../app/styles/logos.css';

export default function LogosPartners() {
  const t = useT('LogosPartners');
  return (
    <section className="logos logos--partners" id="partners">
      <h2 className="logos__title">{t('title')}</h2>
      <div className="logos__viewport">
        <div className="logos__track">
          <img className="p-1" src="/images/partners_1.png" alt="Partner 1" />
          <img className="p-2" src="/images/partners_2.png" alt="Partner 2" />
          <img className="p-3" src="/images/partners_3.png" alt="Partner 3" />
          <img className="p-4" src="/images/partners_4.png" alt="Partner 4" />
        </div>
      </div>
      <div className="logos__controls">
        <button className="logos__btn logos__btn--prev" aria-label={t('prev')} disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="55"
            viewBox="0 0 52 55"
            fill="none"
          >
            <path
              d="M52 27.6899C52 20.5291 49.2607 13.6615 44.3848 8.59806C39.5088 3.53458 32.8956 0.689941 26 0.689941C19.1044 0.689941 12.4912 3.53458 7.61522 8.59806C2.73928 13.6615 0 20.5291 0 27.6899C0 34.8508 2.73928 41.7183 7.61522 46.7818C12.4912 51.8453 19.1044 54.6899 26 54.6899C32.8956 54.6899 39.5088 51.8453 44.3848 46.7818C49.2607 41.7183 52 34.8508 52 27.6899ZM27.5234 14.9282C28.4781 13.9368 30.0219 13.9368 30.9664 14.9282C31.9109 15.9196 31.9211 17.5228 30.9664 18.5036L22.1305 27.6794L30.9664 36.8552C31.9211 37.8466 31.9211 39.4497 30.9664 40.4306C30.0117 41.4114 28.468 41.422 27.5234 40.4306L16.9609 29.4829C16.0062 28.4915 16.0062 26.8884 16.9609 25.9075L27.5234 14.9282Z"
              fill="#0097DC"
            />
          </svg>
        </button>
        <button className="logos__btn logos__btn--next" aria-label={t('next')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="55"
            viewBox="0 0 52 55"
            fill="none"
          >
            <path
              d="M0 27.6899C0 34.8508 2.73928 41.7183 7.61522 46.7818C12.4912 51.8453 19.1044 54.6899 26 54.6899C32.8956 54.6899 39.5088 51.8453 44.3848 46.7818C49.2607 41.7183 52 34.8508 52 27.6899C52 20.5291 49.2607 13.6615 44.3848 8.59806C39.5088 3.53458 32.8956 0.689941 26 0.689941C19.1044 0.689941 12.4912 3.53458 7.61522 8.59806C2.73928 13.6615 0 20.5291 0 27.6899ZM24.4766 40.4517C23.5219 41.4431 21.9781 41.4431 21.0336 40.4517C20.0891 39.4603 20.0789 37.8571 21.0336 36.8763L29.8695 27.7005L21.0336 18.5247C20.0789 17.5333 20.0789 15.9302 21.0336 14.9493C21.9883 13.9685 23.532 13.9579 24.4766 14.9493L35.0391 25.897C35.9938 26.8884 35.9938 28.4915 35.0391 29.4724L24.4766 40.4517Z"
              fill="#0097DC"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
