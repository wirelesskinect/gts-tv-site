// Header menu: "Help" dropdown on desktop, hamburger panel on mobile.
(function () {
  var header = document.querySelector('header.wrap');
  if (!header) return;
  var toggle = header.querySelector('.nav-toggle');
  var more = header.querySelector('.nav-more');
  var moreBtn = more && more.querySelector('button');
  var root = document.documentElement;

  var st = document.createElement('style'); st.textContent = '.nav-signup{display:none}select option{background:#111;color:#fff}html[data-theme="light"] select option{background:#fff;color:#111}@media(max-width:760px){.signup-link{display:none!important}.nav-signup{display:block}}'; document.head.appendChild(st);
  // "Create account" button (not on pages for signed-in members)
  var nav = header.querySelector('nav');
  if (nav && !header.querySelector('a[href="/signup"]') && !/dashboard|payment|admin/.test(location.pathname)) {
    var lg = header.querySelector('a.login');
    if (lg) { var s1 = document.createElement('a'); s1.href = '/signup'; s1.className = 'login signup-link'; s1.innerHTML = 'Create account <span>\u2197</span>'; lg.parentNode.insertBefore(s1, lg); }
    var s2 = document.createElement('a'); s2.href = '/signup'; s2.className = 'nav-signup'; s2.textContent = 'Create account'; nav.insertBefore(s2, nav.firstChild);
  }

  function setMenu(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  function setMore(open) {
    if (!more) return;
    more.classList.toggle('open', open);
    moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (toggle) toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    setMenu(!root.classList.contains('nav-open'));
  });
  if (moreBtn) moreBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setMore(!more.classList.contains('open'));
  });

  // Close after choosing a link, clicking outside, or pressing Escape
  header.querySelectorAll('nav a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); setMore(false); });
  });
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) { setMenu(false); setMore(false); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); setMore(false); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 950) setMenu(false);
  });
})();
