(() => {
  // EDIT GUIDE
  // For new visible copy, prefer:
  // <span data-bilingual data-en="English text" data-zh="中文文字">English text</span>
  // The English and Chinese versions live together in the HTML so they are easy to edit.
  // Use the same pattern on headings, labels, buttons, paragraphs and cards.
  const applyLanguage = (lang) => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    document.querySelectorAll('[data-bilingual-html]').forEach((el) => {
      const en = el.getAttribute('data-en-html') ?? '';
      const zh = el.getAttribute('data-zh-html') ?? en;
      el.innerHTML = lang === 'zh' ? zh : en;
    });

    document.querySelectorAll('[data-bilingual]').forEach((el) => {
      const en = el.getAttribute('data-en') ?? '';
      const zh = el.getAttribute('data-zh') ?? en;
      el.textContent = lang === 'zh' ? zh : en;
    });

    // Backward-compatible support for any older data-i18n content.
    document.querySelectorAll('[data-i18n]:not([data-bilingual])').forEach((el) => {
      const original = el.getAttribute('data-en') || el.textContent;
      const zh = el.getAttribute('data-zh') || original;
      el.setAttribute('data-en', original);
      el.setAttribute('data-zh', zh);
      el.textContent = lang === 'zh' ? zh : original;
    });

    const toggle = document.querySelector('[data-language-switch]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', lang === 'zh' ? 'true' : 'false');
      toggle.classList.toggle('is-cn', lang === 'zh');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('pcohsb-language') || 'en';
    applyLanguage(saved);

    const toggle = document.querySelector('[data-language-switch]');
    toggle?.addEventListener('click', () => {
      const current = localStorage.getItem('pcohsb-language') || 'en';
      const next = current === 'en' ? 'zh' : 'en';
      localStorage.setItem('pcohsb-language', next);
      applyLanguage(next);
    });
  });
})();
