import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaGithub, FaXmark } from 'react-icons/fa6';
import { projects } from '../data/siteData';
import { navigateTo } from '../utils/navigation';
import { pauseLenis, resumeLenis } from '../utils/smoothScroll';
import { OPEN_PROJECT } from '../utils/ui';

const findProject = (slug) => projects.find((project) => project.slug === slug) ?? null;

// Preview window for the home highlights — opens the full breakdown in place instead
// of routing to /projects. Native <dialog> gives focus trap + Esc for free.
const ProjectModal = () => {
  const dialogRef = useRef(null);
  const [project, setProject] = useState(null);

  const open = (slug) => {
    const match = findProject(slug);
    if (!match) return;
    setProject(match);
    document.documentElement.classList.add('scroll-locked');
    pauseLenis();
    window.history.replaceState(null, '', `${window.location.pathname}#${slug}`);
    // showModal after the element renders with content
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const handleClose = () => {
    document.documentElement.classList.remove('scroll-locked');
    resumeLenis();
    setProject(null);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const viewAll = () => {
    dialogRef.current?.close();
    navigateTo('/projects');
  };

  useEffect(() => {
    const onOpen = (event) => open(event.detail);
    window.addEventListener(OPEN_PROJECT, onOpen);

    // Deep link: open the modal if the initial hash names a project.
    const slug = window.location.hash.replace(/^#/, '');
    if (findProject(slug)) {
      open(slug);
    }

    return () => window.removeEventListener(OPEN_PROJECT, onOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="ui-dialog"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          dialogRef.current.close();
        }
      }}
      aria-label={project ? `${project.title} details` : 'Project details'}
    >
      {project ? (
        <div className="modal-in flex max-h-[90vh] w-[min(46rem,94vw)] flex-col overflow-hidden rounded-xl2 border border-line bg-surface shadow-card">
          <div className="flex items-center justify-between gap-3 border-b border-line bg-surface2 px-5 py-3">
            <span className="flex items-center gap-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-pill bg-ember/40" />
                <span className="h-2.5 w-2.5 rounded-pill bg-ember/70" />
                <span className="h-2.5 w-2.5 rounded-pill bg-emberBright" />
              </span>
              <span className="font-mono text-xs text-muted">~/projects/{project.slug}</span>
            </span>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="inline-flex h-8 w-8 items-center justify-center rounded-pill border border-line text-muted transition hover:border-ember/60 hover:text-emberBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <FaXmark aria-hidden="true" />
            </button>
          </div>

          <div data-lenis-prevent className="overflow-y-auto px-5 py-6 md:px-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-bold text-ink">{project.detailTitle ?? project.title}</h2>
                  {project.status === 'in-progress' ? (
                    <span className="inline-flex items-center gap-2 rounded-pill border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emberBright">
                      <span className="status-dot" aria-hidden="true" />
                      <span className="status-glow-text">{project.statusLabel ?? 'In Progress'}</span>
                    </span>
                  ) : null}
                </div>
                <p className="max-w-2xl leading-[1.6] text-muted">{project.description}</p>
              </div>

              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-pill border border-ember/40 bg-ember/10 px-4 py-2 text-sm font-semibold text-emberBright transition hover:-translate-y-0.5 hover:border-ember/70 hover:shadow-ember"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </a>
              ) : null}
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech} className="rounded-pill border border-line px-3 py-1 font-mono text-xs text-muted">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-4">
              {project.detailSections.map((section) => (
                <section key={section.heading} className="rounded-xl2 border border-line bg-surface2 px-5 py-5 leading-[1.7] text-muted">
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-emberBright">{section.heading}</h3>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-3">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets?.length ? (
                    <ul className="mt-3 space-y-2">
                      {section.bullets.map((item) => (
                        <li key={item} className="rounded-xl2 border border-line bg-surface px-4 py-3 leading-6">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {project.media ? (
              <section className="mt-7">
                <figure className="overflow-hidden rounded-xl2 border border-ember/20 bg-surface2">
                  <img src={project.media.architecture.src} alt={project.media.architecture.alt} className="h-auto w-full object-cover" />
                  <figcaption className="border-t border-line px-4 py-3 leading-6 text-muted">
                    {project.media.architecture.caption}
                  </figcaption>
                </figure>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {project.media.placeholders.map((item) => (
                    <figure key={item.title} className={`overflow-hidden rounded-xl2 border bg-surface2 ${item.imageUrl ? 'border-line' : 'border-dashed border-line p-5'}`}>
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-auto w-full object-contain" /> : null}
                      <figcaption className={item.imageUrl ? 'border-t border-line p-4' : ''}>
                        <h4 className="font-display text-base font-bold text-ink">{item.title}</h4>
                        <p className="mt-2 leading-6 text-muted">{item.description}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line bg-surface2 px-5 py-3">
            <span className="font-mono text-xs text-muted">Esc to close</span>
            <button
              type="button"
              onClick={viewAll}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emberBright transition hover:gap-3"
            >
              View all projects
              <FaArrowRight aria-hidden="true" className="text-xs" />
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
};

export default ProjectModal;
