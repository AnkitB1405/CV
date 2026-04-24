import { FaArrowLeft, FaGithub } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { projects } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const githubButtonClassName =
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition';

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
            description="A closer look at the systems, security projects, and infrastructure work that shape how I learn by building."
          />
        </Reveal>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              id={project.slug}
              className="scroll-mt-32 rounded-3xl border border-white/10 bg-gradient-to-b from-panel/95 to-slate-900 p-6 shadow-card"
            >
              <Reveal delay={index * 80} threshold={0.01}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl text-white">{project.detailTitle ?? project.title}</h2>
                      {project.status === 'in-progress' ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-300">
                          <span className="status-dot" aria-hidden="true" />
                          <span className="status-glow-text">{project.statusLabel ?? 'In Progress'}</span>
                        </span>
                      ) : null}
                    </div>

                    <p className="max-w-3xl text-sm leading-7 text-slate-300">{project.description}</p>
                  </div>

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`${githubButtonClassName} border-cyan/30 bg-cyan/10 text-cyan hover:-translate-y-0.5 hover:border-cyan/60 hover:shadow-neon`}
                    >
                      <FaGithub aria-hidden="true" />
                      GitHub
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className={`${githubButtonClassName} cursor-not-allowed border-white/10 bg-white/5 text-slate-400`}
                    >
                      <FaGithub aria-hidden="true" />
                      GitHub
                    </button>
                  )}
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-5">
                  {project.detailSections.map((section) => (
                    <section
                      key={section.heading}
                      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-sm leading-7 text-slate-300"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                        {section.heading}
                      </h3>

                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="mt-3">
                          {paragraph}
                        </p>
                      ))}

                      {section.bullets?.length ? (
                        <ul className="mt-3 space-y-2">
                          {section.bullets.map((item) => (
                            <li
                              key={item}
                              className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 leading-6"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>

                {project.media ? (
                  <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-5 text-sm text-slate-300">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                      Architecture & Visual References
                    </h3>

                    <figure className="mt-4 overflow-hidden rounded-2xl border border-cyan/20 bg-slate-950/50">
                      <img
                        src={project.media.architecture.src}
                        alt={project.media.architecture.alt}
                        className="h-auto w-full object-cover"
                      />
                      <figcaption className="border-t border-white/10 px-4 py-3 text-sm leading-6 text-slate-400">
                        {project.media.architecture.caption}
                      </figcaption>
                    </figure>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {project.media.placeholders.map((item) => (
                        <figure
                          key={item.title}
                          className={`overflow-hidden rounded-2xl border bg-slate-950/35 ${
                            item.imageUrl ? 'border-white/10' : 'border-dashed border-white/20 p-5'
                          }`}
                        >
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="h-auto w-full object-contain"
                            />
                          ) : null}

                          <figcaption className={item.imageUrl ? 'border-t border-white/10 p-4' : ''}>
                            <h4 className="font-display text-lg text-white">{item.title}</h4>
                            <p className="mt-3 leading-6 text-slate-400">{item.description}</p>
                            {!item.imageUrl ? (
                              <span className="mt-8 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Screenshot placeholder
                              </span>
                            ) : null}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </section>
                ) : null}
              </Reveal>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
