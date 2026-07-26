import { FaArrowRight } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { experiences } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const Experience = () => {
  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <SectionTitle
          title="Industry experience"
          description="Time spent shipping inside a company, not just a lab. Each role links to the work it produced."
        />
      </Reveal>

      <div className="flex flex-col">
        {experiences.map((experience, index) => (
          <Reveal key={`${experience.organization}-${experience.period}`} delay={index * 90}>
            <article className="grid gap-6 border-t border-line py-8 last:border-b md:grid-cols-[minmax(0,190px)_1fr] md:gap-10">
              {/* Period rail — the dated spine of the section, kept out of the prose column. */}
              <div className="md:pt-1">
                <p className="font-mono text-sm text-emberBright">{experience.period}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">{experience.kind}</p>
              </div>

              <div>
                <h3
                  className="font-display text-2xl font-bold leading-[1.1] text-ink md:text-3xl"
                  style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
                >
                  {experience.organization}
                </h3>
                <p className="mt-2 font-semibold text-emberBright">{experience.role}</p>

                <p className="mt-5 max-w-2xl leading-[1.7] text-muted">{experience.summary}</p>

                <ul className="mt-6 max-w-2xl space-y-4">
                  {experience.highlights.map((item) => (
                    <li key={item} className="flex gap-4 leading-[1.7] text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-px w-5 shrink-0 bg-gradient-to-r from-ember to-transparent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {experience.supervisor ? (
                  <p className="mt-6 font-mono text-xs text-muted">
                    Supervised by <span className="text-ink">{experience.supervisor}</span>
                  </p>
                ) : null}

                {experience.project ? (
                  <a
                    href={`/projects#${experience.project.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(`/projects#${experience.project.slug}`);
                    }}
                    className="group mt-7 inline-flex items-center gap-2 rounded-pill border border-ember/40 bg-ember/10 px-6 py-3 text-sm font-semibold text-emberBright transition hover:-translate-y-0.5 hover:border-ember/70 hover:shadow-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                  >
                    View {experience.project.label}
                    <FaArrowRight aria-hidden="true" className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Experience;
