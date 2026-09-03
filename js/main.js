document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.menu-links a, .footer-nav a, .footer-links a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href.includes('#') && href.split('/').pop() === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
});