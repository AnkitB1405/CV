// Shared handle to the Lenis instance so nav (index rail, hero button) can drive
// momentum-smooth scrolling. Falls back to native scrollIntoView when Lenis isn't
// running (reduced-motion or before mount).
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const smoothScrollTo = (target) => {
  const el = typeof target === 'string' ? document.querySelector(target) : target;

  if (!el) {
    return;
  }

  if (lenis) {
    lenis.scrollTo(el, { offset: -90, duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
