(() => {
  const toggle=document.querySelector('[data-menu-toggle]');
  const closeBtn=document.querySelector('[data-menu-toggle-close]');
  const menu=document.querySelector('[data-menu]');
  if(!toggle||!menu) return;
  const links=[...menu.querySelectorAll('[data-menu-link]')];
  let isOpen=false,lastFocused=null;
  const focusable=()=>[...menu.querySelectorAll('a[href],button:not([disabled])')];
  const current=location.pathname.split('/').pop()||'index.html';
  links.forEach(a=>{ const target=(a.getAttribute('href')||'').split('#')[0]||'index.html'; if(target===current&&!a.getAttribute('href').startsWith('#')) a.classList.add('current'); });
  function openMenu(){
    isOpen=true; lastFocused=document.activeElement; toggle.setAttribute('aria-expanded','true'); menu.setAttribute('aria-hidden','false');
    document.body.classList.add('menu-open'); menu.style.visibility='visible'; menu.style.pointerEvents='auto';
    if(window.gsap){
      gsap.killTweensOf(menu.querySelectorAll('.menu-shell,.menu-head,.menu-primary,.menu-featured'));
      gsap.set(menu,{opacity:1,y:0});
      gsap.fromTo(menu.querySelector('.menu-shell'),{y:22},{y:0,duration:.52,ease:'power3.out'});
      gsap.fromTo(menu.querySelector('.menu-head'),{y:10,opacity:0},{y:0,opacity:1,duration:.38,ease:'power3.out'});
      gsap.fromTo(menu.querySelectorAll('.menu-main-link'),{y:18,opacity:0},{y:0,opacity:1,duration:.5,stagger:.045,delay:.04,ease:'power3.out'});
      gsap.fromTo(menu.querySelectorAll('.menu-band-card'),{x:18,opacity:0},{x:0,opacity:1,duration:.56,stagger:.07,delay:.1,ease:'power3.out'});
    }
    requestAnimationFrame(()=>focusable()[0]?.focus());
  }
  function closeMenu(){
    isOpen=false; toggle.setAttribute('aria-expanded','false'); menu.setAttribute('aria-hidden','true'); document.body.classList.remove('menu-open');
    if(window.gsap){
      gsap.to(menu.querySelector('.menu-shell'),{y:-10,duration:.24,ease:'power2.in',onComplete:()=>{ if(!isOpen){menu.style.visibility='hidden';menu.style.pointerEvents='none';}}});
    }else{menu.style.visibility='hidden';menu.style.pointerEvents='none';}
    lastFocused?.focus?.();
  }
  toggle.addEventListener('click',()=>isOpen?closeMenu():openMenu()); closeBtn?.addEventListener('click',closeMenu); links.forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{ if(!isOpen)return; if(e.key==='Escape'){e.preventDefault();closeMenu();return;} if(e.key!=='Tab')return; const f=focusable(); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();} else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();} });
})();
