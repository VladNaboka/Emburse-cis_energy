
(function(){
  function onReady(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  onReady(function(){
    // Sticky header
    var header = document.querySelector('.site-header');
    var lastY = 0;
    if (header) {
      var onScroll = function(){
        var y = window.scrollY || window.pageYOffset || 0;
        if (y > 4) header.classList.add('is-sticky'); else header.classList.remove('is-sticky');
        lastY = y;
      };
      onScroll();
      window.addEventListener('scroll', onScroll, {passive:true});
    }

    // Search capsule
    var search = document.querySelector('.search');
    var searchBtn = search ? search.querySelector('.search__btn') : null;
    if (search && searchBtn) {
      searchBtn.addEventListener('click', function(){
        search.classList.toggle('search--open');
        var input = search.querySelector('.search__input');
        if (input && search.classList.contains('search--open')) { setTimeout(function(){ input.focus(); }, 0); }
      });
      document.addEventListener('click', function(e){
        if (!search.contains(e.target)) search.classList.remove('search--open');
      });
    }

    // Desktop language menu
    var locales = ['ru','en'];
    function getCurrentLocale(){
      var parts = location.pathname.split('/');
      var seg = (parts[1] || '').toLowerCase();
      return locales.indexOf(seg) >= 0 ? seg : 'ru';
    }
    function switchLocale(to){
      if (!to) return;
      to = to.toLowerCase();
      if (locales.indexOf(to) < 0) return;
      var parts = location.pathname.split('/');
      if (locales.indexOf((parts[1]||'').toLowerCase()) >= 0) {
        parts[1] = to;
      } else {
        parts.splice(1, 0, to);
      }
      var newPath = parts.join('/') || '/' + to;
      window.location.assign(newPath + location.search + location.hash);
    }

    var lang = document.querySelector('.lang');
    var langBtn = lang ? lang.querySelector('.lang__btn') : null;
    var langMenu = lang ? lang.querySelector('.lang__menu') : null;
    var langLabel = lang ? lang.querySelector('[data-lang-label]') : null;
    var langItems = lang ? lang.querySelectorAll('.lang__item[data-lang]') : [];

    if (lang && langBtn && langMenu && langItems.length) {
      langBtn.addEventListener('click', function(){
        lang.classList.toggle('lang--open');
      });
      document.addEventListener('click', function(e){
        if (!lang.contains(e.target)) lang.classList.remove('lang--open');
      });
      Array.prototype.forEach.call(langItems, function(btn){
        btn.addEventListener('click', function(){
          var code = (btn.getAttribute('data-lang') || '').toLowerCase();
          if (langLabel) langLabel.textContent = code.toUpperCase();
          lang.classList.remove('lang--open');
          switchLocale(code);
        });
      });
      // sync initial label/flag
      var cur = getCurrentLocale();
      if (langLabel) langLabel.textContent = cur.toUpperCase();
      var flag = lang.querySelector('.lang__flag'); if (flag) flag.src = (cur === 'ru' ? '/images/icons/russian.svg' : '/images/icons/english.svg');
    }

    // Mobile drawer
    var burger = document.querySelector('.burger');
    var drawer = document.getElementById('mobileNav');
    var backdrop = drawer ? drawer.querySelector('.drawer__backdrop') : null;
    var closeBtns = drawer ? drawer.querySelectorAll('[data-close-drawer]') : [];

    function closeDrawer(){
      if (!drawer) return;
      drawer.classList.remove('drawer--open');
      setTimeout(function(){ drawer.hidden = true; }, 280);
    }
    function openDrawer(){
      if (!drawer) return;
      drawer.hidden = false;
      requestAnimationFrame(function(){ drawer.classList.add('drawer--open'); });
    }
    if (burger && drawer){
      burger.addEventListener('click', openDrawer);
    }
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    Array.prototype.forEach.call(closeBtns, function(btn){
      btn.addEventListener('click', closeDrawer);
    });

    // Mobile accordeon
    var accs = document.querySelectorAll('[data-acc]');
    Array.prototype.forEach.call(accs, function(btn){
      btn.addEventListener('click', function(){
        var panel = btn.nextElementSibling;
        if (!panel) return;
        var open = panel.style.display === 'block';
        panel.style.display = open ? 'none' : 'block';
      });
    });

    // Mobile language in drawer
    var mlang = document.querySelector('.mlang');
    var mbtn = mlang ? mlang.querySelector('[data-mlang]') : null;
    var mmenu = mlang ? mlang.querySelector('.mlang__menu') : null;
    var mitems = mlang ? mlang.querySelectorAll('.mlang__item[data-lang]') : [];

    if (mlang && mbtn && mmenu){
      mbtn.addEventListener('click', function(){
        mlang.classList.toggle('is-open');
      });
      document.addEventListener('click', function(e){
        if (!mlang.contains(e.target)) mlang.classList.remove('is-open');
      });
    }
    Array.prototype.forEach.call(mitems, function(btn){
      btn.addEventListener('click', function(){
        var code = (btn.getAttribute('data-lang') || '').toLowerCase();
        switchLocale(code);
      });
    });

    // Keep logo link in current locale
    var curLocale = getCurrentLocale();
    var logo = document.querySelector('.nav__logo');
    if (logo && logo.tagName === 'A') {
      var href = logo.getAttribute('href') || '/';
      // if it's root '/', rewrite to '/{locale}'
      if (href === '/' || href === '') logo.setAttribute('href', '/' + curLocale);
    }

    // Close lang on Escape & manage aria-expanded
    if (langBtn && lang) {
      langBtn.addEventListener('click', function(){
        lang.classList.toggle('lang--open');
        langBtn.setAttribute('aria-expanded', String(lang.classList.contains('lang--open')));
      });
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') {
          lang.classList.remove('lang--open');
          langBtn.setAttribute('aria-expanded','false');
        }
      });
    }

    // Close search on Escape & manage aria-expanded
    if (search && searchBtn) {
      searchBtn.setAttribute('aria-expanded','false');
      searchBtn.addEventListener('click', function(){
        var open = search.classList.toggle('search--open');
        searchBtn.setAttribute('aria-expanded', String(open));
        var input = search.querySelector('.search__input');
        if (input && open) setTimeout(()=>input.focus(),0);
      });
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') {
          search.classList.remove('search--open');
          searchBtn.setAttribute('aria-expanded','false');
        }
      });
    }

  });
})();
