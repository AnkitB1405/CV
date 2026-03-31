export const scrollToHashTarget = (hash, options = {}) => {
  const targetId = hash.replace(/^#/, '');

  if (!targetId) {
    return false;
  }

  const target = document.getElementById(targetId);

  if (!target) {
    return false;
  }

  const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
  const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 20;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: options.behavior ?? 'smooth'
  });

  return true;
};

export const navigateTo = (path) => {
  const currentPath = `${window.location.pathname}${window.location.hash}`;

  if (currentPath === path) {
    const hash = path.includes('#') ? `#${path.split('#')[1]}` : '';

    if (hash) {
      scrollToHashTarget(hash);
    }

    return;
  }

  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('codex:navigate'));
};
