'use client';

import { useState, useRef, useEffect } from 'react';
import { useT } from '../lib/ruMessages';
import '../app/styles/contact.css';

const COUNTRIES = [
  { name: 'Kazakhstan', iso2: 'kz', dialCode: '+7' },
  { name: 'Russia', iso2: 'ru', dialCode: '+7' },
  { name: 'Uzbekistan', iso2: 'uz', dialCode: '+998' },
  { name: 'Kyrgyzstan', iso2: 'kg', dialCode: '+996' },
  { name: 'Tajikistan', iso2: 'tj', dialCode: '+992' },
  { name: 'Belarus', iso2: 'by', dialCode: '+375' },
  { name: 'Ukraine', iso2: 'ua', dialCode: '+380' },
  { name: 'Armenia', iso2: 'am', dialCode: '+374' },
  { name: 'Azerbaijan', iso2: 'az', dialCode: '+994' },
  { name: 'Georgia', iso2: 'ge', dialCode: '+995' },
  { name: 'Turkey', iso2: 'tr', dialCode: '+90' },
  { name: 'United States', iso2: 'us', dialCode: '+1' },
  { name: 'United Kingdom', iso2: 'gb', dialCode: '+44' },
  { name: 'Germany', iso2: 'de', dialCode: '+49' },
  { name: 'France', iso2: 'fr', dialCode: '+33' },
  { name: 'Spain', iso2: 'es', dialCode: '+34' },
  { name: 'Italy', iso2: 'it', dialCode: '+39' },
  { name: 'Poland', iso2: 'pl', dialCode: '+48' },
  { name: 'Czechia', iso2: 'cz', dialCode: '+420' },
  { name: 'Lithuania', iso2: 'lt', dialCode: '+370' },
  { name: 'Latvia', iso2: 'lv', dialCode: '+371' },
  { name: 'Estonia', iso2: 'ee', dialCode: '+372' },
  { name: 'China', iso2: 'cn', dialCode: '+86' },
  { name: 'India', iso2: 'in', dialCode: '+91' },
];

function flagUrl(iso2) {
  return `https://flagcdn.com/w20/${iso2}.png`;
}

/** Маски локальной части номера (без кода страны).
 * Символ '_' — место для цифры.
 * Если страны нет в списке — берём дефолт.
 */
const PHONE_MASKS = {
  kz: '(___) ___-__-__', // 10 цифр
  ru: '(___) ___-__-__', // 10 цифр
  us: '(___) ___-____', // 10 цифр
  ua: '(___) ___-__-__',
  by: '(__) ___-__-__',
  uz: '(__) ___-__-__',
  kg: '(___) __-__-__',
  tj: '(___) __-__-__',
};
const DEFAULT_MASK = '(___) ___-__-__';

function getMask(iso2) {
  return PHONE_MASKS[iso2] || DEFAULT_MASK;
}

function digitsOnly(s) {
  return (s || '').replace(/\D/g, '');
}

function digitsCapFromMask(mask) {
  const m = mask.match(/_/g);
  return m ? m.length : 10;
}

/** Применяет маску к строке цифр */
function applyMask(digits, mask) {
  if (!digits) return '';
  let res = '';
  let di = 0;
  for (let i = 0; i < mask.length; i++) {
    const ch = mask[i];
    if (ch === '_') {
      if (di < digits.length) {
        res += digits[di++];
      } else {
        break; // дальше маску не показываем
      }
    } else {
      // показываем разделители только когда уже есть цифры
      if (di > 0 || digits.length > 0) res += ch;
    }
  }
  return res;
}

export default function Contact() {
  const t = useT('Contact');

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find((c) => c.iso2 === 'kz'));

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    post: '',
    email: '',
    phone: '', // локальная часть (с форматированием: (___) ___-__-__)
    topic: '',
    message: '',
    booking: '',
    meetingDate: '',
    timeSlot: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState('');
  const countryBtnRef = useRef(null);
  const countryPopupRef = useRef(null);
  const fileInputRef = useRef(null);

  // закрыть список стран по клику вне
  useEffect(() => {
    function onDocClick(e) {
      if (
        isCountriesOpen &&
        countryPopupRef.current &&
        !countryPopupRef.current.contains(e.target) &&
        countryBtnRef.current &&
        !countryBtnRef.current.contains(e.target)
      ) {
        setIsCountriesOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [isCountriesOpen]);

  // при смене страны — переформатировать существующие цифры по новой маске
  useEffect(() => {
    const mask = getMask(selectedCountry.iso2);
    const cap = digitsCapFromMask(mask);
    const digits = digitsOnly(formData.phone).slice(0, cap);
    const masked = applyMask(digits, mask);
    setFormData((p) => ({ ...p, phone: masked }));
  }, [selectedCountry]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // телефон форматируем отдельно
    if (name === 'phone') {
      const mask = getMask(selectedCountry.iso2);
      const cap = digitsCapFromMask(mask);
      const digits = digitsOnly(value).slice(0, cap);
      const masked = applyMask(digits, mask);
      setFormData((prev) => ({ ...prev, phone: masked }));
      return;
    }

    if (name === 'booking') {
      if (value !== 'yes') {
        setFormData((prev) => ({
          ...prev,
          booking: value,
          meetingDate: '',
          timeSlot: '',
        }));
      } else {
        setFormData((prev) => ({ ...prev, booking: value }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.post) {
      alert('Пожалуйста, заполните обязательные поля: Имя, Email и Должность.');
      return;
    }
    if (formData.booking === 'yes' && (!formData.meetingDate || !formData.timeSlot)) {
      alert('Пожалуйста, выберите дату и время встречи.');
      return;
    }

    const phoneFull = `${selectedCountry.dialCode} ${formData.phone}`.trim();

    console.log('Form data:', { ...formData, phoneFull, country: selectedCountry });
    console.log('Selected file:', selectedFile);
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');

    setFormData({
      name: '',
      company: '',
      post: '',
      email: '',
      phone: '',
      topic: '',
      message: '',
      booking: '',
      meetingDate: '',
      timeSlot: '',
    });
    setSelectedCountry(COUNTRIES.find((c) => c.iso2 === 'kz'));
    setSelectedFile(null);
    setCountryQuery('');
    setIsCountriesOpen(false);
  };

  // drag & drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) setSelectedFile(files[0]);
  };

  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const filteredCountries = COUNTRIES.filter((c) => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) || c.dialCode.replace('+', '').startsWith(q.replace('+', ''))
    );
  });

  // для placeholder: покажем код страны + маску
  const mask = getMask(selectedCountry.iso2);
  const inputPlaceholder = `${selectedCountry.dialCode} ${mask}`;

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__left">
          <h2 className="contact__title">{t('title')}</h2>
          <p className="contact__lead">{t('lead')}</p>
        </div>

        <div className="contact__right">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__topline" aria-hidden="true"></div>
            <h3 className="contact-form__title">{t('form.title')}</h3>

            <div className="contact-form__fields">
              <label className="field">
                <span className="field__label">{t('form.name')} *</span>
                <input
                  className="field__input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('form.namePh')}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">{t('form.company')}</span>
                <input
                  className="field__input"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Товарищество с ограниченной ответственностью"
                />
              </label>

              <label className="field">
                <span className="field__label">{t('form.post')} *</span>
                <input
                  className="field__input"
                  type="text"
                  name="post"
                  value={formData.post}
                  onChange={handleInputChange}
                  placeholder="Директор"
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">{t('form.email')} *</span>
                <input
                  className="field__input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="mail@example.com"
                  required
                />
              </label>

              {/* Телефон с маской */}
              <div className="field">
                <span className="field__label">{t('form.phone')}</span>

                <div className="phone" role="group" aria-label="Телефон">
                  <button
                    type="button"
                    className="phone__country"
                    aria-haspopup="listbox"
                    aria-expanded={isCountriesOpen ? 'true' : 'false'}
                    onClick={() => setIsCountriesOpen((v) => !v)}
                    ref={countryBtnRef}
                  >
                    <img
                      className="phone__flag"
                      src={flagUrl(selectedCountry.iso2)}
                      alt={selectedCountry.name}
                      width={20}
                      height={14}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="phone__code">{selectedCountry.dialCode}</span>
                    <svg
                      className="phone__chev"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.4 1.2L5 4.8L8.6 1.2"
                        stroke="#646A69"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <input
                    className="field__input phone__input"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={inputPlaceholder}
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={mask.length} /* ограничим длину по маске */
                  />

                  {isCountriesOpen && (
                    <div className="country-popover" role="dialog" ref={countryPopupRef}>
                      <input
                        className="country-popover__search"
                        type="text"
                        placeholder="Поиск страны или кода…"
                        value={countryQuery}
                        onChange={(e) => setCountryQuery(e.target.value)}
                        autoFocus
                      />
                      <div className="country-popover__list" role="listbox" aria-label="Коды стран">
                        {filteredCountries.map((c) => (
                          <button
                            key={c.iso2}
                            type="button"
                            role="option"
                            aria-selected={c.iso2 === selectedCountry.iso2}
                            className={`country-item ${
                              c.iso2 === selectedCountry.iso2 ? 'is-active' : ''
                            }`}
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountriesOpen(false);
                            }}
                          >
                            <img
                              className="country-item__flag"
                              src={flagUrl(c.iso2)}
                              alt={c.name}
                              width={20}
                              height={14}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <span className="country-item__name">{c.name}</span>
                            <span className="country-item__dial">{c.dialCode}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <small className="phone__example">
                  Например: {selectedCountry.dialCode} {mask.replace(/_/g, '•')}
                </small>
              </div>

              {/* Бронирование встречи */}
              <label className="field field--select">
                <span className="field__label">Забронировать встречу?</span>
                <select
                  className="field__input"
                  name="booking"
                  value={formData.booking}
                  onChange={handleInputChange}
                >
                  <option value="">Выберите</option>
                  <option value="yes">Да</option>
                  <option value="no">Нет</option>
                </select>
                <svg
                  className="field__chev"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                >
                  <path
                    d="M1.4 1.2L5 4.8L8.6 1.2"
                    stroke="#646A69"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>

              {formData.booking === 'yes' && (
                <>
                  <label className="field booking-field">
                    <span className="field__label">День встречи</span>
                    <input
                      className="field__input"
                      type="date"
                      name="meetingDate"
                      value={formData.meetingDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      required
                    />
                  </label>

                  <label className="field field--select booking-field">
                    <span className="field__label">Удобное время</span>
                    <select
                      className="field__input"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Выберите время</option>
                      <option value="9:00-12:00">9:00-12:00</option>
                      <option value="12:00-15:00">12:00-15:00</option>
                      <option value="15:00-18:00">15:00-18:00</option>
                    </select>
                    <svg
                      className="field__chev"
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.4 1.2L5 4.8L8.6 1.2"
                        stroke="#646A69"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                </>
              )}

              {/* Направление */}
              <label className="field field--select">
                <span className="field__label">Какое направление вы бы хотели оптимизировать?</span>
                <select
                  className="field__input"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Выберите направление</option>
                  <option value="oil_gas">Нефтегазовое</option>
                  <option value="mining">Горнорудное</option>
                  <option value="it">IT</option>
                  <option value="nuclear">Атомное</option>
                </select>
                <svg
                  className="field__chev"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                >
                  <path
                    d="M1.4 1.2L5 4.8L8.6 1.2"
                    stroke="#646A69"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>

              {/* Сообщение */}
              <label className="field">
                <span className="field__label">{t('form.msg')}</span>
                <textarea
                  className="field__input field__textarea"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('form.msgPh')}
                />
              </label>

              {/* Upload */}
              <div className={`upload ${isDragOver ? 'is-dragover' : ''}`} data-upload>
                <input
                  className="upload__input"
                  type="file"
                  name="file"
                  id="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                />
                <label
                  className="upload__box"
                  htmlFor="file"
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleFileSelect}
                >
                  <svg
                    className="upload__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="96"
                    height="40"
                    viewBox="0 0 96 40"
                    aria-hidden="true"
                  >
                    <rect width="96" height="40" rx="8" fill="#F2F4F7" />
                    <g clipPath="url(#clip0_557_1180)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M41.83 13.106C41.996 12.774 42.251 12.495 42.567 12.299C42.882 12.104 43.246 12.0004 43.617 12H52.381C52.753 12 53.117 12.1035 53.433 12.299C53.749 12.494 54.004 12.774 54.17 13.106L57.682 20.131C57.89 20.547 57.999 21.006 58 21.471V27C58 27.53 57.789 28.039 57.414 28.414C57.039 28.789 56.53 29 56 29H40C39.47 29 38.961 28.789 38.586 28.414C38.211 28.039 38 27.53 38 27V21.472C38 21.007 38.109 20.547 38.317 20.131L41.83 13.106Z"
                        fill="#98A0B4"
                      />
                    </g>
                  </svg>

                  <p className="upload__title">{t('form.attach')}</p>
                  <p className="upload__hint" data-upload-hint>
                    {selectedFile ? selectedFile.name : t('form.drag')}
                  </p>
                  <p className="upload__file" data-upload-file hidden></p>
                </label>
              </div>
            </div>

            <button className="contact-form__btn" type="submit">
              {t('form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
