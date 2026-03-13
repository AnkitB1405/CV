import { FaArrowRight, FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { projects } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const Projects = () => {
  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="Projects"
          title="Projects built through practical engineering"
          description="Focused on security-minded experimentation, maintainable implementation, and learning by shipping real systems."
        />
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} as="article" delay={index * 80}>
            <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-panel to-slate-900 p-6 shadow-card transition duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan/50 hover:shadow-neon">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl text-white">{project.title}</h3>
                {project.status === 'in-progress' ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                    <span className="status-dot" aria-hidden="true" />
                    <span className="status-glow-text">{project.statusLabel ?? 'In Progress'}</span>
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>

              {project.keyFeatures?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              ) : null}

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">
                    {tech}
                  </li>
                ))}
              </ul>

              {project.github ? (
                <div className="mt-6 flex gap-4 text-sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-cyan transition hover:text-mint"
                  >
                    <FaGithub aria-hidden="true" /> GitHub
                  </a>
                  <a
                    href="/projects"
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo('/projects');
                    }}
                    className="inline-flex items-center gap-2 text-electric transition group-hover:text-cyan"
                  >
                    <FaArrowUpRightFromSquare aria-hidden="true" /> View Details
                  </a>
                </div>
              ) : (
                <div className="mt-6 flex">
                  <a
                    href={`/projects#${project.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(`/projects#${project.slug}`);
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan transition hover:-translate-y-0.5 hover:border-cyan/60 hover:shadow-neon"
                  >
                    View Details
                    <FaArrowRight aria-hidden="true" className="text-xs" />
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
