import { useEffect, useMemo, useState } from 'react';
import { FaArrowLeft, FaChevronDown, FaGithub } from 'react-icons/fa6';
import Reveal from './Reveal';
import { projects } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const statusOf = (project) => project.statusLabel ?? 'Shipped';
const allTechs = [...new Set(projects.flatMap((project) => project.technologies))].sort();
const allStatuses = [...new Set(projects.map(statusOf))];

const slugFromHash = () => {
  const slug = window.location.hash.replace(/^#/, '');
  return projects.some((project) => project.slug === slug) ? slug : null;
};

const Chip = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-pill border px-3 py-1.5 font-mono text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember ${
      active ? 'border-ember/50 bg-ember/15 text-emberBright' : 'border-line text-muted hover:text-ink'
    }`}
  >
    {children}
  </button>
);

const ProjectDetail = ({ project }) => (
  <div className="detail-in">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            {project.detailTitle ?? project.title}
          </h2>
          {project.status === 'in-progress' ? (
            <span className="inline-flex items-center gap-2 rounded-pill border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emberBright">
              <span className="status-dot" aria-hidden="true" />
              <span className="status-glow-text">{project.statusLabel ?? 'In Progress'}</span>
            </span>
          ) : null}
        </div>
        <p className="max-w-3xl leading-[1.6] text-muted">{project.description}</p>
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
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-pill border border-line bg-surface px-4 py-2 text-sm font-semibold text-muted">
          <FaGithub aria-hidden="true" />
          GitHub
        </span>
      )}
    </div>

    <ul className="mt-5 flex flex-wrap gap-2">
      {project.technologies.map((tech) => (
        <li key={tech} className="rounded-pill border border-line px-3 py-1 font-mono text-xs text-muted">
          {tech}
        </li>
      ))}
    </ul>

    <div className="mt-8 space-y-5">
      {project.detailSections.map((section) => (
        <section key={section.heading} className="rounded-xl2 border border-line bg-surface px-5 py-5 leading-[1.7] text-muted">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-emberBright">{section.heading}</h3>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-3">
              {paragraph}
            </p>
          ))}
          {section.bullets?.length ? (
            <ul className="mt-3 space-y-2">
              {section.bullets.map((item) => (
                <li key={item} className="rounded-xl2 border border-line bg-surface2 px-4 py-3 leading-6">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>

    {project.media ? (
      <section className="mt-8 rounded-xl2 border border-line bg-surface px-5 py-5 text-muted">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-emberBright">Architecture & Visual References</h3>
        <figure className="mt-4 overflow-hidden rounded-xl2 border border-ember/20 bg-surface2">
          <img src={project.media.architecture.src} alt={project.media.architecture.alt} className="h-auto w-full object-cover" />
          <figcaption className="border-t border-line px-4 py-3 leading-6 text-muted">
            {project.media.architecture.caption}
          </figcaption>
        </figure>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {project.media.placeholders.map((item) => (
            <figure
              key={item.title}
              className={`overflow-hidden rounded-xl2 border bg-surface2 ${item.imageUrl ? 'border-line' : 'border-dashed border-line p-5'}`}
            >
              {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="h-auto w-full object-contain" /> : null}
              <figcaption className={item.imageUrl ? 'border-t border-line p-4' : ''}>
                <h4 className="font-display text-lg text-ink">{item.title}</h4>
                <p className="mt-3 leading-6 text-muted">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    ) : null}
  </div>
);

const ListItem = ({ project, active, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(project.slug)}
    aria-current={active ? 'true' : undefined}
    className={`group flex w-full items-stretch gap-3 rounded-xl2 border px-4 py-3 text-left transition ${
      active ? 'border-ember/40 bg-surface' : 'border-transparent hover:bg-surface/60'
    }`}
  >
    <span
      aria-hidden="true"
      className={`w-1 shrink-0 rounded-pill transition-all ${
        active ? 'bg-gradient-to-b from-emberBright to-ember shadow-ember' : 'bg-line group-hover:bg-ember/40'
      }`}
    />
    <span className="min-w-0">
      <span className="flex items-center gap-2">
        <span className={`font-display text-base font-semibold ${active ? 'text-emberBright' : 'text-ink'}`}>
          {project.title}
        </span>
        {project.status === 'in-progress' ? <span className="status-dot" aria-hidden="true" /> : null}
      </span>
      <span className="mt-1 block truncate text-xs text-muted">{project.description}</span>
    </span>
  </button>
);

const ProjectsPage = () => {
  const [selected, setSelected] = useState(() => slugFromHash() ?? projects[0].slug);
  const [tech, setTech] = useState(null);
  const [status, setStatus] = useState(null);
  // Mobile-only: the accordion can be fully collapsed. Desktop always keeps a detail pane,
  // so this lives separate from `selected` (which stays defined for the master–detail view).
  const [mobileOpen, setMobileOpen] = useState(true);

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (!tech || project.technologies.includes(tech)) && (!status || statusOf(project) === status)
      ),
    [tech, status]
  );

  // Keep selection in sync if the hash changes externally (back button, edited URL).
  useEffect(() => {
    const sync = () => {
      const slug = slugFromHash();
      if (slug) {
        setSelected(slug);
      }
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  // If the current selection is filtered out, fall back to the first visible project.
  useEffect(() => {
    if (filtered.length && !filtered.some((project) => project.slug === selected)) {
      setSelected(filtered[0].slug);
    }
  }, [filtered, selected]);

  const select = (slug) => {
    setSelected(slug);
    window.history.replaceState(null, '', `/projects#${slug}`);
  };

  const toggle = (setter, value) => setter((current) => (current === value ? null : value));

  const selectedProject = filtered.find((project) => project.slug === selected) ?? filtered[0] ?? null;

  return (
    <main className="pb-20 pt-24 md:pt-28">
      <div className="section-shell !pb-0 !pt-0">
        <Reveal>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigateTo('/');
            }}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-4 py-2 text-sm text-muted transition hover:-translate-y-0.5 hover:border-ember/50 hover:text-emberBright"
          >
            <FaArrowLeft aria-hidden="true" />
            Back Home
          </a>
        </Reveal>

        <div className="mt-8 border-t border-line pt-8">
          <h1
            className="font-display text-3xl font-bold leading-[1.05] text-ink md:text-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            Detailed builds, experiments, and lab notes
          </h1>
          <p className="mt-3 max-w-2xl leading-[1.6] text-muted">
            Filter by progress or technology, then pick a project — the full breakdown swaps in place.
          </p>
        </div>

        {/* Filter chips — derived from the data */}
        <div className="mt-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">progress</span>
            {allStatuses.map((value) => (
              <Chip key={value} active={status === value} onClick={() => toggle(setStatus, value)}>
                {value}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">tech</span>
            {allTechs.map((value) => (
              <Chip key={value} active={tech === value} onClick={() => toggle(setTech, value)}>
                {value}
              </Chip>
            ))}
            {(tech || status) && (
              <button
                type="button"
                onClick={() => {
                  setTech(null);
                  setStatus(null);
                }}
                className="ml-1 font-mono text-xs text-muted underline decoration-line underline-offset-4 transition hover:text-emberBright"
              >
                clear
              </button>
            )}
          </div>
          <p className="font-mono text-xs text-muted">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {selectedProject ? (
          <>
            {/* Desktop: master–detail */}
            <div className="mt-10 hidden gap-10 md:grid md:grid-cols-[minmax(0,300px)_1fr]">
              <nav aria-label="Projects" className="sticky top-24 flex flex-col gap-2 self-start">
                {filtered.map((project) => (
                  <ListItem
                    key={project.slug}
                    project={project}
                    active={project.slug === selectedProject.slug}
                    onSelect={select}
                  />
                ))}
              </nav>
              <div>
                <ProjectDetail key={selectedProject.slug} project={selectedProject} />
              </div>
            </div>

            {/* Mobile: accordion — tap an open row's title to collapse it (no split view here). */}
            <div className="mt-8 flex flex-col gap-3 md:hidden">
              {filtered.map((project) => {
                const active = project.slug === selectedProject.slug;
                const open = active && mobileOpen;
                return (
                  <div key={project.slug} className="rounded-xl2 border border-line bg-surface2">
                    <button
                      type="button"
                      onClick={() => {
                        if (active) {
                          setMobileOpen((current) => !current);
                        } else {
                          select(project.slug);
                          setMobileOpen(true);
                        }
                      }}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-4 py-4 text-left"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-2.5 w-2.5 rounded-pill ${open ? 'bg-gradient-to-b from-emberBright to-ember shadow-ember' : 'border border-ember/40'}`}
                      />
                      <span className={`font-display text-lg font-semibold ${open ? 'text-emberBright' : 'text-ink'}`}>
                        {project.title}
                      </span>
                      <FaChevronDown
                        aria-hidden="true"
                        className={`ml-auto shrink-0 text-sm transition-transform duration-300 ${open ? 'rotate-180 text-emberBright' : 'text-muted'}`}
                      />
                    </button>
                    {open ? (
                      <div className="border-t border-line px-4 py-5">
                        <ProjectDetail project={project} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="mt-10 rounded-xl2 border border-dashed border-line bg-surface2 px-6 py-10 text-center font-mono text-sm text-muted">
            no projects match this filter
          </p>
        )}
      </div>
    </main>
  );
};

export default ProjectsPage;
