import { FaArrowRight } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { projects } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const Projects = () => {
  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <SectionTitle
          title="Projects built through practical engineering"
          description="Security-minded experimentation and real systems. Open any entry for the full breakdown — no scrolling to find it."
        />
      </Reveal>

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 90}>
            <a
              href={`/projects#${project.slug}`}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(`/projects#${project.slug}`);
              }}
              className="group relative grid grid-cols-[auto_1fr] gap-5 border-t border-line py-8 transition-transform duration-300 hover:-translate-y-0.5 last:border-b md:gap-10"
            >
              {/* ember hairline draw-in on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-ember to-emberBright transition-all duration-500 group-hover:w-full"
              />

              <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-emberBright md:text-3xl">
                    {project.title}
                  </h3>
                  {project.status === 'in-progress' ? (
                    <span className="inline-flex items-center gap-2 rounded-pill border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emberBright">
                      <span className="status-dot" aria-hidden="true" />
                      <span className="status-glow-text">{project.statusLabel ?? 'In Progress'}</span>
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 max-w-2xl leading-[1.6] text-muted">{project.description}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="rounded-pill border border-line px-3 py-1 font-mono text-xs text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emberBright">
                  View
                  <FaArrowRight
                    aria-hidden="true"
                    className="text-xs transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
