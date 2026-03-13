import { FaArrowLeft, FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { experiments, projects } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const architectureFlow = ['User', 'Router', 'Proxmox Host', 'Containers', 'Services'];

const ProjectsPage = () => {
  return (
    <main className="pb-16 pt-20 md:pt-24">
      <section className="section-shell pb-6">
        <Reveal>
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigateTo('/');
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan/50 hover:text-cyan"
          >
            <FaArrowLeft aria-hidden="true" />
            Back Home
          </a>
        </Reveal>
      </section>

      <section className="section-shell pt-6">
        <Reveal>
          <SectionTitle
            eyebrow="Projects"
            title="Detailed Builds, Experiments, and Lab Notes"
            description="A closer look at the systems, security projects, and experiments that shape how I learn by building."
          />
        </Reveal>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              as="article"
              id={project.slug}
              delay={index * 80}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-panel/95 to-slate-900 p-6 shadow-card"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl text-white">{project.detailTitle ?? project.title}</h2>
                {project.status === 'in-progress' ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                    <span className="status-dot" aria-hidden="true" />
                    <span className="status-glow-text">{project.statusLabel ?? 'In Progress'}</span>
                  </span>
                ) : null}
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="space-y-5 text-sm leading-7 text-slate-300">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Description</h3>
                    <p className="mt-2">{project.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Problem Statement</h3>
                    <p className="mt-2">{project.problem}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Technologies Used</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-5 text-sm leading-7 text-slate-300">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Key Features</h3>
                    <ul className="mt-2 space-y-2">
                      {project.keyFeatures.map((feature) => (
                        <li key={feature} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">What I Learned</h3>
                    <ul className="mt-2 space-y-2">
                      {project.learned.map((item) => (
                        <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {project.slug === 'homelab-infrastructure' ? (
                <div className="mt-8">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">Homelab Architecture</h3>
                  <div className="mt-4 flex flex-col gap-8 md:flex-row md:gap-6">
                    {architectureFlow.map((item) => (
                      <div
                        key={item}
                        className="architecture-node flex-1 rounded-2xl border border-cyan/25 bg-cyan/5 px-4 py-4 text-center text-sm font-medium text-slate-100 shadow-[0_0_18px_rgba(78,244,255,0.08)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-cyan transition hover:text-mint"
                  >
                    <FaGithub aria-hidden="true" />
                    GitHub
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-slate-500">
                    <FaGithub aria-hidden="true" />
                    GitHub link coming soon
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experiments" className="section-shell pt-8">
        <Reveal>
          <SectionTitle
            eyebrow="Proof of Work"
            title="Experiments & Technical Exploration"
            description="A space for writeups, lab notes, and technical observations that will grow alongside ongoing projects."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {experiments.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 90}
              className="rounded-3xl border border-dashed border-white/20 bg-panel/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/45 hover:shadow-neon"
            >
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400">
                <FaArrowUpRightFromSquare aria-hidden="true" />
                Future links and writeups
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
