export const navigateTo = (path) => {
  const currentPath = `${window.location.pathname}${window.location.hash}`;

  if (currentPath === path) {
    return;
  }

  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('codex:navigate'));
};
