(() => {

// EDIT GUIDE: For any new visible copy that needs both languages, use:
// <span data-bilingual data-en="English text" data-zh="中文文字">English text</span>
// language.js will switch it automatically and localStorage keeps the choice across pages.
  if (!window.gsap) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  // Reading progress
  const progress = document.querySelector('[data-scroll-progress]');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${value}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (reduceMotion) {
    document.querySelectorAll('.reveal-card, .reveal-up, .hero-selector').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Intro load sequence — keeps the first frame calm, then introduces the brand.
  const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  introTl
    .from('.hero-background img', { scale: 1.09, duration: 1.8, ease: 'power3.out' }, 0)
    .from('.site-header .brand, .site-header .menu-toggle', { y: -12, opacity: 0, duration: .7, stagger: .06 }, .15)
    .from('.hero-eyebrow', { y: 24, opacity: 0, duration: .75 }, .35)
    .from('.hero-title', { y: 50, opacity: 0, duration: .95 }, .42)
.from('[data-language-switch]', { y: -10, opacity: 0, duration: .6 }, .26);

const hero = document.querySelector('.hero');
const selector = document.querySelector('[data-band-selector]');

if (hero && selector) {const selectorTl = gsap.timeline({scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true
    }
  });

  selectorTl.set(selector, {opacity: 0,y: 28}, 0)

    .to(selector, {opacity: 1,y: 0,ease: 'power2.out'}, 0.32)

    .to(selector, {opacity: 1,y: 0,ease: 'none'}, 1);
}

  // Soft reveal system for content sections.
  gsap.utils.toArray('.reveal-card, .reveal-up').forEach((el, index) => {
    gsap.fromTo(el,
      { y: 46, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: .8,
        delay: index * .02,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 84%', once: true }
      }
    );
  });

  gsap.utils.toArray('.gallery-tile, .band-gallery-tile, .journey-step, .timeline-item, .activity, .sound-feature').forEach((el, index) => {
    gsap.fromTo(el,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: .75,
        delay: (index % 4) * .04,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  // Subtle image drift inside large media blocks.
  gsap.utils.toArray('.band-card-media img').forEach(img => {
    gsap.to(img, {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  });

  ScrollTrigger.refresh();
})();
