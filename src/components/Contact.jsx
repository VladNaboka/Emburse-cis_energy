'use client';
import { useState, useRef, useEffect } from 'react';
import { useT } from '../lib/ruMessages';
import '../app/styles/contact.css';

export default function Contact() {
  const t = useT('Contact');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    post: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    booking: '', // да/нет
    meetingDate: '', // дата встречи
    timeSlot: '', // время встречи
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Если меняется выбор бронирования, и это "нет" — чистим дату/время
    if (name === 'booking' && value !== 'yes') {
      setFormData((prev) => ({
        ...prev,
        booking: value,
        meetingDate: '',
        timeSlot: '',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Базовая валидация
    if (!formData.name || !formData.email || formData.post) {
      alert('Пожалуйста, заполните обязательные поля (Имя и Email, Должность)');
      return;
    }

    // Проверка полей бронирования, если выбрано "Да"
    if (formData.booking === 'yes' && (!formData.meetingDate || !formData.timeSlot)) {
      alert('Пожалуйста, выберите дату и время встречи');
      return;
    }

    // Отправка данных (замените на реальный запрос)
    console.log('Form data:', formData);
    console.log('Selected file:', selectedFile);

    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');

    // Сброс формы
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
    setSelectedFile(null);
  };

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
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Получение минимальной даты (завтрашний день)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__left">
          <h2 className="contact__title">{t('title')}</h2>
          <p className="contact__lead">{t('lead')}</p>

          <a className="contact__email" href="mailto:ceo@cisenergy.org">
            <svg
              className="contact__email-ic"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4H16C16.825 4 17.5 4.675 17.5 5.5V14.5C17.5 15.325 16.825 16 16 16H4C3.175 16 2.5 15.325 2.5 14.5V5.5C2.5 4.675 3.175 4 4 4Z"
                stroke="#022C22"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 5.5L10 10.75L2.5 5.5"
                stroke="#022C22"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>ceo@cisenergy.org</span>
          </a>
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
                  placeholder="CIS ENERGY"
                />
              </label>

              <label className="field">
                <span className="field__label">{t('form.post')}</span>
                <input
                  className="field__input"
                  type="text"
                  name="post"
                  value={formData.post}
                  onChange={handleInputChange}
                  placeholder="Директор"
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

              <label className="field">
                <span className="field__label">{t('form.phone')}</span>
                <input
                  className="field__input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (___) ___-__-__"
                />
              </label>

              {/* 1) Сначала — бронирование встречи */}
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
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1.40002 1.2002L5.00002 4.8002L8.60002 1.2002"
                    stroke="#646A69"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>

              {/* Поля появляются ТОЛЬКО если выбрано "Да" */}
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
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1.40002 1.2002L5.00002 4.8002L8.60002 1.2002"
                        stroke="#646A69"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                </>
              )}

              {/* 2) Затем — направление оптимизации */}
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
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1.40002 1.2002L5.00002 4.8002L8.60002 1.2002"
                    stroke="#646A69"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>

              <label className="field">
                <span className="field__label">{t('form.msg')}</span>
                <textarea
                  className="field__input field__textarea"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('form.msgPh')}
                ></textarea>
              </label>

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
                    fill="none"
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
                    <defs>
                      <clipPath id="clip0_557_1180">
                        <rect width="24" height="24" fill="white" transform="translate(36 8)" />
                      </clipPath>
                    </defs>
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
