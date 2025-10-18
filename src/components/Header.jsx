'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import '../app/styles/header.css';

export default function Header() {
  // search
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // language (UI only, no switching)
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const LangLabel = 'RU';
  const flagSrc = '/images/icons/russian.svg'; // фиксированный флаг

  // drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // services dropdown/mega menu
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  // sticky header
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  // Sticky header
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 2);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside/ESC close
  useEffect(() => {
    const onDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesOpen(false);
      if (drawerRef.current && drawerOpen) {
        const backdrop = e.target.closest?.('.drawer__backdrop');
        if (backdrop) setDrawerOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setLangOpen(false);
        setSearchOpen(false);
        setServicesOpen(false);
        setDrawerOpen(false);
        setMobileLangOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [drawerOpen]);

  // Body scroll lock for drawer
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <header className={`site-header${isSticky ? ' is-sticky' : ''}`} role="banner" ref={headerRef}>
      {/* Верхняя плашка */}
      <div className="topbar">
        <div className="topbar__inner">
          <span className="topbar__text">
            <strong>Complete Intergrated Solutions Energy</strong>
          </span>
        </div>
      </div>

      {/* Навигация */}
      <div className="navwrap" id="mainNav">
        <div className="nav container" role="navigation" aria-label="Основная навигация">
          {/* Лого */}
          <Link className="nav__logo nav__logo--text" href="/">
            <span className="nav__logo-mark" aria-hidden="true"></span>
            <span className="nav__logo-word">CIS ENERGY</span>
          </Link>

          {/* Меню (desktop) */}
          <ul className="nav__menu">
            <li className="nav__item nav__item--has-drop">
              <Link className="nav__link" href="/#about">
                <span className="hover-underline">О компании</span>
              </Link>
            </li>

            <li
              className={`nav__item nav__item--has-drop${servicesOpen ? ' nav__item--open' : ''}`}
              ref={servicesRef}
            >
              <button
                className="nav__link"
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={(e) => {
                  e.stopPropagation();
                  setServicesOpen(!servicesOpen);
                }}
              >
                <span className="hover-underline">Услуги</span>
                <svg
                  className="icon icon--chev"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* МЕГА-МЕНЮ */}
              <div className="mega" role="menu" aria-label="Услуги">
                <div className="mega__bg"></div>
                <div className="mega__panel">
                  <ul className="mega__list">
                    <li>
                      <Link
                        className="mega__link"
                        href="/services/oil-gas"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="mega__icon" aria-hidden="true">
                          {/*                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M3 18h18M6 18V9l10 3v6M6 10l5-3 2 3"
                              stroke="#0C67C2"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg> */}
                          <svg
                            width="43"
                            height="38"
                            viewBox="0 0 43 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M39.4391 4.54962C38.588 1.38048 35.3108 -0.497258 32.1231 0.348836L30.9734 0.653133C29.6969 0.994539 28.9429 2.30079 29.2863 3.56251L31.1153 10.3461L23.0304 12.4317L22.5601 11.0883C22.2241 10.1383 21.3208 9.50001 20.3056 9.50001C19.2903 9.50001 18.387 10.1383 18.051 11.0883L17.0358 13.9828L7.16667 16.5211V13.6563C7.16667 12.6692 6.36788 11.875 5.375 11.875C4.38212 11.875 3.58333 12.6692 3.58333 13.6563V33.25H2.38889C1.06753 33.25 0 34.3113 0 35.625C0 36.9387 1.06753 38 2.38889 38H40.6111C41.9325 38 43 36.9387 43 35.625C43 34.3113 41.9325 33.25 40.6111 33.25H30.3613L25.3819 19.1113L20.7385 20.3063L22.7915 26.125H17.8196L19.783 20.5586L14.2139 21.991L10.2498 33.25H7.16667V21.4344L32.3545 14.9402L34.2358 21.9168C34.5792 23.1859 35.8856 23.9356 37.1622 23.5942L38.3193 23.2899C41.5069 22.4438 43.3957 19.1856 42.5446 16.0164L39.4391 4.54962ZM15.3113 33.25L16.1474 30.875H24.4637L25.2998 33.25H15.3113Z"
                              fill="#005EB8"
                            />
                          </svg>
                        </span>
                        <span className="mega__label">Нефтегазовое направление</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="mega__link"
                        href="/services/mining"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="mega__icon" aria-hidden="true">
                          <svg
                            width="33"
                            height="32"
                            viewBox="0 0 33 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.27033 31.6249C2.47364 31.6249 1.79221 31.3412 1.22604 30.7739C0.659875 30.2065 0.376194 29.5263 0.375 28.7331V15.0054C0.375 14.4177 0.529083 13.879 0.83725 13.3893C1.14542 12.8996 1.57362 12.5401 2.12187 12.3107L7.30696 10.1339C7.78951 9.94035 8.24818 9.97618 8.68296 10.2414C9.11654 10.5077 9.33333 10.9061 9.33333 11.4364V12.7801L16.3101 9.97618C16.7926 9.78269 17.2435 9.83106 17.6628 10.1213C18.082 10.4128 18.2917 10.8129 18.2917 11.3217V13.7082H32.625V28.7314C32.625 29.5269 32.3413 30.2077 31.774 30.7739C31.2066 31.34 30.5258 31.6237 29.7315 31.6249H3.27033ZM15.1222 25.4221H17.8778V19.911H15.1222V25.4221ZM7.95554 25.4221H10.7111V19.911H7.95554V25.4221ZM22.2889 25.4221H25.0445V19.911H22.2889V25.4221ZM32.4046 12.1226H27.2536L28.7245 1.6306C28.7604 1.36782 28.8774 1.15581 29.0757 0.994561C29.274 0.833311 29.5015 0.752686 29.7583 0.752686H30.2654C30.484 0.752686 30.6727 0.826741 30.8315 0.974852C30.9916 1.12177 31.0866 1.30631 31.1164 1.52848L32.4046 12.1226Z"
                              fill="#005EB8"
                            />
                          </svg>
                        </span>
                        <span className="mega__label">Горнорудное направление</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="mega__link"
                        href="/services/it"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="mega__icon" aria-hidden="true">
                          <svg
                            width="38"
                            height="38"
                            viewBox="0 0 38 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M36.8917 32.7591L33.5508 21.9449C33.4475 21.6094 33.2625 21.3047 33.0125 21.0583C33.6733 20.3046 34.0389 19.3372 34.0417 18.3349V4.62325C34.0375 3.50333 33.5908 2.43047 32.7988 1.63857C32.0069 0.846658 30.9341 0.399923 29.8142 0.395752H8.16999C7.05154 0.399941 5.98032 0.847186 5.19093 1.63954C4.40154 2.4319 3.95832 3.50479 3.95833 4.62325V18.3349C3.96234 19.3342 4.32151 20.2994 4.97166 21.0583C4.72737 21.3092 4.54329 21.6124 4.43333 21.9449L1.15583 32.6324C0.894135 33.1561 0.770596 33.738 0.796937 34.3228C0.823278 34.9077 0.998623 35.4761 1.30634 35.9742C1.61405 36.4722 2.04392 36.8834 2.55516 37.1686C3.0664 37.4539 3.64206 37.6038 4.2275 37.6041H33.7725C34.3528 37.6104 34.9251 37.4682 35.435 37.1911C35.9449 36.914 36.3754 36.5111 36.6858 36.0208C36.9966 35.5402 37.1788 34.9879 37.2148 34.4168C37.2508 33.8457 37.1396 33.2749 36.8917 32.7591ZM24.5417 33.4874C24.4705 33.5896 24.3758 33.6731 24.2656 33.731C24.1554 33.7889 24.0328 33.8194 23.9083 33.8199H14.0917C13.965 33.8193 13.8402 33.7889 13.7274 33.7311C13.6146 33.6734 13.517 33.5899 13.4425 33.4874C13.3712 33.3848 13.3241 33.2674 13.3049 33.1439C13.2857 33.0205 13.2949 32.8943 13.3317 32.7749L14.25 29.9249C14.3008 29.7634 14.402 29.6225 14.5388 29.5227C14.6756 29.423 14.8407 29.3697 15.01 29.3707H22.9267C23.0932 29.3731 23.2548 29.4279 23.3884 29.5274C23.522 29.6269 23.6209 29.766 23.6708 29.9249L24.6208 32.7749C24.6659 32.8913 24.6823 33.0168 24.6685 33.1409C24.6547 33.2649 24.6112 33.3838 24.5417 33.4874ZM7.125 4.62325C7.12496 4.34462 7.23455 4.07717 7.43009 3.87867C7.62562 3.68018 7.8914 3.56658 8.16999 3.56242H29.8142C29.9535 3.56242 30.0914 3.58986 30.2201 3.64317C30.3488 3.69648 30.4658 3.77462 30.5643 3.87313C30.6628 3.97164 30.7409 4.08858 30.7942 4.21729C30.8476 4.34599 30.875 4.48394 30.875 4.62325V18.3349C30.875 18.4742 30.8476 18.6122 30.7942 18.7409C30.7409 18.8696 30.6628 18.9865 30.5643 19.085C30.4658 19.1835 30.3488 19.2617 30.2201 19.315C30.0914 19.3683 29.9535 19.3958 29.8142 19.3958H8.16999C7.8914 19.3916 7.62562 19.278 7.43009 19.0795C7.23455 18.881 7.12496 18.6135 7.125 18.3349V4.62325Z"
                              fill="#005EB8"
                            />
                          </svg>
                        </span>
                        <span className="mega__label">IT-направление</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="mega__link"
                        href="/services/atomic"
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className="mega__icon" aria-hidden="true">
                          <svg
                            width="29"
                            height="36"
                            viewBox="0 0 29 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 0L0.35818 1.53306C1.65478 3.95875 5.46584 3.07288 7.37519 1.41171C6.32604 4.26164 2.49754 5.06699 0.252863 3.36768C0.193934 4.18742 0.327824 4.75468 0.573934 5.1153C0.924914 5.62964 1.58761 5.92793 2.80205 5.94678L3.72793 5.9611L3.42215 6.83525C3.0253 7.96991 3.0564 8.57011 3.28039 8.94885C3.42698 9.19652 3.72823 9.43372 4.22134 9.65727C7.20441 9.04348 10.4239 8.98433 13.252 8.98047C15.346 8.98047 17.4387 9.05476 19.1732 9.20557C20.9076 9.35639 22.2491 9.65727 22.2491 9.65727C22.2491 9.65727 23.3463 9.66474 23.9396 9.35156C24.5196 9.0454 25.1271 8.16406 25.1271 8.16406C25.1271 8.16406 25.8748 8.06478 25.9405 7.23665C23.4463 7.55067 21.4314 7.04187 20.811 4.14942C22.7521 5.78906 23.9396 5.78906 25.1271 5.78906C26.3146 5.78906 26.3081 4.9454 26.3146 4.60156C26.3211 4.25772 26.3146 3.41406 26.3146 3.41406C26.3146 3.41406 25.6135 3.71426 25.1271 3.41406C24.903 3.27573 24.6144 2.7364 24.5419 2.22337C24.5093 1.99277 24.5419 1.62702 24.5419 1.62702C24.5419 1.62702 25.7978 2.74333 26.3146 2.22656C27.5021 1.03906 26.3146 2.22656 28.6896 0H0ZM20.0869 2.22337C19.5122 3.7928 18.3858 5.54318 16.5679 6.05959C14.6212 8.63899 9.68592 8.92822 7.67207 4.77523C9.18932 6.56717 12.2485 7.36977 14.4503 6.08653C12.4313 5.49211 10.8836 2.60753 10.9816 2.55854C10.9816 2.7127 14.0793 4.7638 15.2787 4.75943C17.2075 4.76158 18.4892 3.705 20.0869 2.22337ZM13.252 10.3164C10.2276 10.4559 7.47583 10.2595 4.57098 10.9719C6.65282 18.1166 4.44578 27.0653 2.18151 33.9642C3.01625 34.3483 4.4552 34.7211 6.18264 34.9636C8.2558 35.2545 10.7547 35.4023 13.252 35.4023C15.7492 35.4023 18.2482 35.2545 20.3213 34.9636C22.0488 34.7211 23.4877 34.3483 24.3225 33.9642C22.0582 27.0653 19.8511 18.1166 21.933 10.9719C21.312 10.8164 20.2748 10.6424 19.0574 10.5366C17.3778 10.3906 15.3142 10.3164 13.252 10.3164ZM16.7325 16.3437C18.9063 17.6148 20.0879 19.9307 20.0325 22.2854L15.4865 21.8401C15.4546 21.2531 15.1432 20.6916 14.608 20.3676L16.7325 16.3437ZM9.83339 16.4268L11.8959 20.3244C11.5981 20.4847 11.351 20.725 11.1822 21.0181C11.0373 21.2689 10.9544 21.5507 10.9404 21.8401L6.68147 22.2854C6.6503 21.0943 6.91645 19.8771 7.55577 18.7696C8.12896 17.7772 8.92198 16.9893 9.83339 16.4268ZM13.2397 21.1837C13.5005 21.1862 13.6495 21.2414 13.8157 21.3373C13.9531 21.4159 14.0736 21.521 14.1701 21.6464C14.2667 21.7718 14.3375 21.9151 14.3784 22.068C14.4194 22.2209 14.4296 22.3804 14.4086 22.5373C14.3876 22.6942 14.3358 22.8454 14.2561 22.9821C14.1776 23.1195 14.0726 23.2399 13.9473 23.3365C13.822 23.433 13.6788 23.5038 13.526 23.5448C13.3732 23.5857 13.2138 23.596 13.057 23.575C12.9002 23.554 12.7491 23.5022 12.6124 23.4225C12.475 23.344 12.3545 23.2389 12.2579 23.1136C12.1612 22.9882 12.0903 22.8449 12.0493 22.692C12.0083 22.5391 11.9979 22.3796 12.0188 22.2227C12.0397 22.0658 12.0914 21.9145 12.1711 21.7777C12.38 21.4158 12.7829 21.2004 13.1206 21.1858C13.1603 21.184 13.2 21.1833 13.2397 21.1837ZM14.1658 24.3901L16.5012 27.9955C15.4786 28.5419 14.3299 28.8341 13.1673 28.8038C12.1009 28.7762 11.0386 28.4938 10.048 27.9293L12.336 24.4321C12.926 24.7549 13.6233 24.718 14.1658 24.3901Z"
                              fill="#005EB8"
                            />
                          </svg>
                        </span>
                        <span className="mega__label">Атомное направление</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="nav__item">
              <Link className="nav__link" href="/pso">
                <span className="hover-underline">PSO</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" href="#contact">
                <span className="hover-underline">Cвязаться с нами</span>
              </Link>
            </li>
          </ul>

          {/* Правая зона */}
          <div className="nav__right">
            {/* Поиск */}
            <form
              className={`search${searchOpen ? ' search--open' : ''}`}
              role="search"
              aria-label="Поиск по сайту"
              ref={searchRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <button
                className="search__btn"
                type="button"
                aria-expanded={searchOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchOpen(!searchOpen);
                }}
              >
                <img src="/images/icons/search.svg" alt="" width="18" height="18" />
              </button>

              <input className="search__input" type="search" placeholder="Поиск..." />

              <button className="search__submit" type="submit" aria-label="Найти">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 12h16M14 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Язык — ТОЛЬКО UI, без смены */}
            <div className={`lang${langOpen ? ' lang--open' : ''}`} ref={langRef}>
              <button
                className="lang__btn"
                type="button"
                aria-haspopup="true"
                aria-expanded={langOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen(!langOpen);
                }}
              >
                <img className="lang__flag" src={flagSrc} alt="" width="18" height="18" />
                <span className="lang__label" data-lang-label>
                  {LangLabel}
                </span>
                <svg
                  className="icon icon--chev"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="lang__menu" role="menu" onClick={(e) => e.stopPropagation()}>
                <button
                  className="lang__item"
                  role="menuitem"
                  onClick={() => setLangOpen(false)} // просто закрываем
                >
                  <img
                    src="/images/icons/english.svg"
                    width="16"
                    height="16"
                    style={{ marginRight: 8, verticalAlign: 'middle' }}
                    alt=""
                  />{' '}
                  English
                </button>
                <button
                  className="lang__item"
                  role="menuitem"
                  onClick={() => setLangOpen(false)} // просто закрываем
                >
                  <img
                    src="/images/icons/russian.svg"
                    width="16"
                    height="16"
                    style={{ marginRight: 8, verticalAlign: 'middle' }}
                    alt=""
                  />{' '}
                  Русский
                </button>
              </div>
            </div>

            {/* <Link className="nav__login" href="/">
              Войти
            </Link> */}

            <Link className="btn-cta" href="/#contact">
              Связаться с нами
            </Link>

            {/* Burger (моб) */}
            <button
              className="burger"
              aria-label="Открыть меню"
              aria-expanded={drawerOpen}
              aria-controls="mobileNav"
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true">
                <path
                  d="M1 2h20M1 9h20M1 16h20"
                  stroke="#0C2340"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Off-canvas мобильное меню */}
      <div
        className={`drawer${drawerOpen ? ' drawer--open' : ''}`}
        id="mobileNav"
        hidden={!drawerOpen}
        ref={drawerRef}
      >
        <div
          className="drawer__backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        ></div>

        <aside
          className="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
        >
          <div className="drawer__head">
            <Link
              className="nav__logo nav__logo--text"
              href="/"
              onClick={() => setDrawerOpen(false)}
            >
              <span className="nav__logo-mark" aria-hidden="true"></span>
              <span className="nav__logo-word">CIS ENERGY</span>
            </Link>

            <button
              className="drawer__close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Закрыть меню"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="mnav">
            <Link className="mnav__link" href="/#about" onClick={() => setDrawerOpen(false)}>
              О компании
            </Link>

            {/* Mobile Services Menu */}
            <button
              className="mnav__toggle"
              onClick={(e) => {
                const panel = e.currentTarget.nextElementSibling;
                const isOpen = e.currentTarget.classList.toggle('is-open');
                panel.style.display = isOpen ? 'block' : 'none';
              }}
            >
              Услуги
              <svg className="icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="mnav__panel">
              <div className="mmega">
                <Link
                  className="mmega__item"
                  href="/services/oil-gas"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="mmega__icon">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 43 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid meet"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M39.4391 4.54962C38.588 1.38048 35.3108 -0.497258 32.1231 0.348836L30.9734 0.653133C29.6969 0.994539 28.9429 2.30079 29.2863 3.56251L31.1153 10.3461L23.0304 12.4317L22.5601 11.0883C22.2241 10.1383 21.3208 9.50001 20.3056 9.50001C19.2903 9.50001 18.387 10.1383 18.051 11.0883L17.0358 13.9828L7.16667 16.5211V13.6563C7.16667 12.6692 6.36788 11.875 5.375 11.875C4.38212 11.875 3.58333 12.6692 3.58333 13.6563V33.25H2.38889C1.06753 33.25 0 34.3113 0 35.625C0 36.9387 1.06753 38 2.38889 38H40.6111C41.9325 38 43 36.9387 43 35.625C43 34.3113 41.9325 33.25 40.6111 33.25H30.3613L25.3819 19.1113L20.7385 20.3063L22.7915 26.125H17.8196L19.783 20.5586L14.2139 21.991L10.2498 33.25H7.16667V21.4344L32.3545 14.9402L34.2358 21.9168C34.5792 23.1859 35.8856 23.9356 37.1622 23.5942L38.3193 23.2899C41.5069 22.4438 43.3957 19.1856 42.5446 16.0164L39.4391 4.54962ZM15.3113 33.25L16.1474 30.875H24.4637L25.2998 33.25H15.3113Z"
                        fill="#005EB8"
                      />
                    </svg>
                  </span>
                  <span>Нефтегазовое направление</span>
                </Link>

                <Link
                  className="mmega__item"
                  href="/services/mining"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="mmega__icon">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.27033 31.6249C2.47364 31.6249 1.79221 31.3412 1.22604 30.7739C0.659875 30.2065 0.376194 29.5263 0.375 28.7331V15.0054C0.375 14.4177 0.529083 13.879 0.83725 13.3893C1.14542 12.8996 1.57362 12.5401 2.12187 12.3107L7.30696 10.1339C7.78951 9.94035 8.24818 9.97618 8.68296 10.2414C9.11654 10.5077 9.33333 10.9061 9.33333 11.4364V12.7801L16.3101 9.97618C16.7926 9.78269 17.2435 9.83106 17.6628 10.1213C18.082 10.4128 18.2917 10.8129 18.2917 11.3217V13.7082H32.625V28.7314C32.625 29.5269 32.3413 30.2077 31.774 30.7739C31.2066 31.34 30.5258 31.6237 29.7315 31.6249H3.27033ZM15.1222 25.4221H17.8778V19.911H15.1222V25.4221ZM7.95554 25.4221H10.7111V19.911H7.95554V25.4221ZM22.2889 25.4221H25.0445V19.911H22.2889V25.4221ZM32.4046 12.1226H27.2536L28.7245 1.6306C28.7604 1.36782 28.8774 1.15581 29.0757 0.994561C29.274 0.833311 29.5015 0.752686 29.7583 0.752686H30.2654C30.484 0.752686 30.6727 0.826741 30.8315 0.974852C30.9916 1.12177 31.0866 1.30631 31.1164 1.52848L32.4046 12.1226Z"
                        fill="#005EB8"
                      />
                    </svg>
                  </span>
                  <span>Горнорудное направление</span>
                </Link>

                <Link
                  className="mmega__item"
                  href="/services/it"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="mmega__icon">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36.8917 32.7591L33.5508 21.9449C33.4475 21.6094 33.2625 21.3047 33.0125 21.0583C33.6733 20.3046 34.0389 19.3372 34.0417 18.3349V4.62325C34.0375 3.50333 33.5908 2.43047 32.7988 1.63857C32.0069 0.846658 30.9341 0.399923 29.8142 0.395752H8.16999C7.05154 0.399941 5.98032 0.847186 5.19093 1.63954C4.40154 2.4319 3.95832 3.50479 3.95833 4.62325V18.3349C3.96234 19.3342 4.32151 20.2994 4.97166 21.0583C4.72737 21.3092 4.54329 21.6124 4.43333 21.9449L1.15583 32.6324C0.894135 33.1561 0.770596 33.738 0.796937 34.3228C0.823278 34.9077 0.998623 35.4761 1.30634 35.9742C1.61405 36.4722 2.04392 36.8834 2.55516 37.1686C3.0664 37.4539 3.64206 37.6038 4.2275 37.6041H33.7725C34.3528 37.6104 34.9251 37.4682 35.435 37.1911C35.9449 36.914 36.3754 36.5111 36.6858 36.0208C36.9966 35.5402 37.1788 34.9879 37.2148 34.4168C37.2508 33.8457 37.1396 33.2749 36.8917 32.7591ZM24.5417 33.4874C24.4705 33.5896 24.3758 33.6731 24.2656 33.731C24.1554 33.7889 24.0328 33.8194 23.9083 33.8199H14.0917C13.965 33.8193 13.8402 33.7889 13.7274 33.7311C13.6146 33.6734 13.517 33.5899 13.4425 33.4874C13.3712 33.3848 13.3241 33.2674 13.3049 33.1439C13.2857 33.0205 13.2949 32.8943 13.3317 32.7749L14.25 29.9249C14.3008 29.7634 14.402 29.6225 14.5388 29.5227C14.6756 29.423 14.8407 29.3697 15.01 29.3707H22.9267C23.0932 29.3731 23.2548 29.4279 23.3884 29.5274C23.522 29.6269 23.6209 29.766 23.6708 29.9249L24.6208 32.7749C24.6659 32.8913 24.6823 33.0168 24.6685 33.1409C24.6547 33.2649 24.6112 33.3838 24.5417 33.4874ZM7.125 4.62325C7.12496 4.34462 7.23455 4.07717 7.43009 3.87867C7.62562 3.68018 7.8914 3.56658 8.16999 3.56242H29.8142C29.9535 3.56242 30.0914 3.58986 30.2201 3.64317C30.3488 3.69648 30.4658 3.77462 30.5643 3.87313C30.6628 3.97164 30.7409 4.08858 30.7942 4.21729C30.8476 4.34599 30.875 4.48394 30.875 4.62325V18.3349C30.875 18.4742 30.8476 18.6122 30.7942 18.7409C30.7409 18.8696 30.6628 18.9865 30.5643 19.085C30.4658 19.1835 30.3488 19.2617 30.2201 19.315C30.0914 19.3683 29.9535 19.3958 29.8142 19.3958H8.16999C7.8914 19.3916 7.62562 19.278 7.43009 19.0795C7.23455 18.881 7.12496 18.6135 7.125 18.3349V4.62325Z"
                        fill="#005EB8"
                      />
                    </svg>
                  </span>
                  <span>IT-направление</span>
                </Link>

                <Link
                  className="mmega__item"
                  href="/services/atomic"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="mmega__icon">
                    <svg
                      width="23"
                      height="33"
                      viewBox="0 0 29 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0L0.35818 1.53306C1.65478 3.95875 5.46584 3.07288 7.37519 1.41171C6.32604 4.26164 2.49754 5.06699 0.252863 3.36768C0.193934 4.18742 0.327824 4.75468 0.573934 5.1153C0.924914 5.62964 1.58761 5.92793 2.80205 5.94678L3.72793 5.9611L3.42215 6.83525C3.0253 7.96991 3.0564 8.57011 3.28039 8.94885C3.42698 9.19652 3.72823 9.43372 4.22134 9.65727C7.20441 9.04348 10.4239 8.98433 13.252 8.98047C15.346 8.98047 17.4387 9.05476 19.1732 9.20557C20.9076 9.35639 22.2491 9.65727 22.2491 9.65727C22.2491 9.65727 23.3463 9.66474 23.9396 9.35156C24.5196 9.0454 25.1271 8.16406 25.1271 8.16406C25.1271 8.16406 25.8748 8.06478 25.9405 7.23665C23.4463 7.55067 21.4314 7.04187 20.811 4.14942C22.7521 5.78906 23.9396 5.78906 25.1271 5.78906C26.3146 5.78906 26.3081 4.9454 26.3146 4.60156C26.3211 4.25772 26.3146 3.41406 26.3146 3.41406C26.3146 3.41406 25.6135 3.71426 25.1271 3.41406C24.903 3.27573 24.6144 2.7364 24.5419 2.22337C24.5093 1.99277 24.5419 1.62702 24.5419 1.62702C24.5419 1.62702 25.7978 2.74333 26.3146 2.22656C27.5021 1.03906 26.3146 2.22656 28.6896 0H0ZM20.0869 2.22337C19.5122 3.7928 18.3858 5.54318 16.5679 6.05959C14.6212 8.63899 9.68592 8.92822 7.67207 4.77523C9.18932 6.56717 12.2485 7.36977 14.4503 6.08653C12.4313 5.49211 10.8836 2.60753 10.9816 2.55854C10.9816 2.7127 14.0793 4.7638 15.2787 4.75943C17.2075 4.76158 18.4892 3.705 20.0869 2.22337ZM13.252 10.3164C10.2276 10.4559 7.47583 10.2595 4.57098 10.9719C6.65282 18.1166 4.44578 27.0653 2.18151 33.9642C3.01625 34.3483 4.4552 34.7211 6.18264 34.9636C8.2558 35.2545 10.7547 35.4023 13.252 35.4023C15.7492 35.4023 18.2482 35.2545 20.3213 34.9636C22.0488 34.7211 23.4877 34.3483 24.3225 33.9642C22.0582 27.0653 19.8511 18.1166 21.933 10.9719C21.312 10.8164 20.2748 10.6424 19.0574 10.5366C17.3778 10.3906 15.3142 10.3164 13.252 10.3164ZM16.7325 16.3437C18.9063 17.6148 20.0879 19.9307 20.0325 22.2854L15.4865 21.8401C15.4546 21.2531 15.1432 20.6916 14.608 20.3676L16.7325 16.3437ZM9.83339 16.4268L11.8959 20.3244C11.5981 20.4847 11.351 20.725 11.1822 21.0181C11.0373 21.2689 10.9544 21.5507 10.9404 21.8401L6.68147 22.2854C6.6503 21.0943 6.91645 19.8771 7.55577 18.7696C8.12896 17.7772 8.92198 16.9893 9.83339 16.4268ZM13.2397 21.1837C13.5005 21.1862 13.6495 21.2414 13.8157 21.3373C13.9531 21.4159 14.0736 21.521 14.1701 21.6464C14.2667 21.7718 14.3375 21.9151 14.3784 22.068C14.4194 22.2209 14.4296 22.3804 14.4086 22.5373C14.3876 22.6942 14.3358 22.8454 14.2561 22.9821C14.1776 23.1195 14.0726 23.2399 13.9473 23.3365C13.822 23.433 13.6788 23.5038 13.526 23.5448C13.3732 23.5857 13.2138 23.596 13.057 23.575C12.9002 23.554 12.7491 23.5022 12.6124 23.4225C12.475 23.344 12.3545 23.2389 12.2579 23.1136C12.1612 22.9882 12.0903 22.8449 12.0493 22.692C12.0083 22.5391 11.9979 22.3796 12.0188 22.2227C12.0397 22.0658 12.0914 21.9145 12.1711 21.7777C12.38 21.4158 12.7829 21.2004 13.1206 21.1858C13.1603 21.184 13.2 21.1833 13.2397 21.1837ZM14.1658 24.3901L16.5012 27.9955C15.4786 28.5419 14.3299 28.8341 13.1673 28.8038C12.1009 28.7762 11.0386 28.4938 10.048 27.9293L12.336 24.4321C12.926 24.7549 13.6233 24.718 14.1658 24.3901Z"
                        fill="#005EB8"
                      />
                    </svg>
                  </span>
                  <span>Атомное направление</span>
                </Link>
              </div>
            </div>

            <Link className="mnav__link" href="/pso" onClick={() => setDrawerOpen(false)}>
              PSO
            </Link>
          </nav>

          <div className="drawer__controls">
            {/* Мобильная капсула языка — только UI */}
            <div className={`mlang mlang--capsule${mobileLangOpen ? ' is-open' : ''}`}>
              <button
                className="mlang__btn"
                type="button"
                aria-expanded={mobileLangOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileLangOpen(!mobileLangOpen);
                }}
              >
                <img className="mlang__flag" src={flagSrc} alt="" width="18" height="18" />
                <span data-lang-label>{LangLabel}</span>
                <svg
                  className="icon icon--chev"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="mlang__menu">
                <button className="mlang__item" onClick={() => setMobileLangOpen(false)}>
                  <img
                    src="/images/icons/english.svg"
                    width="16"
                    height="16"
                    style={{ marginRight: 8 }}
                    alt=""
                  />{' '}
                  English
                </button>
                <button className="mlang__item" onClick={() => setMobileLangOpen(false)}>
                  <img
                    src="/images/icons/russian.svg"
                    width="16"
                    height="16"
                    style={{ marginRight: 8 }}
                    alt=""
                  />{' '}
                  Русский
                </button>
              </div>
            </div>

            {/* <Link className="drawer__login" href="/" onClick={() => setDrawerOpen(false)}>
              Войти
            </Link> */}
            <Link
              className="btn-cta btn-cta--full"
              href="/#contact"
              onClick={() => setDrawerOpen(false)}
            >
              Связаться с нами
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
