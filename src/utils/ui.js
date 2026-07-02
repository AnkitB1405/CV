// Glue between the home project cards and the app-level preview modal. A DOM
// CustomEvent avoids prop-drilling or a context provider for a single singleton.
export const OPEN_PROJECT = 'ui:open-project';

export const openProject = (slug) => window.dispatchEvent(new CustomEvent(OPEN_PROJECT, { detail: slug }));
