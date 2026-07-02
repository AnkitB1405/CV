import { FaCircleCheck } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { awards } from '../data/siteData';

const Awards = () => {
  return (
    <section id="awards" className="section-shell">
      <Reveal>
        <SectionTitle
          title="Certificates, achievements & hackathons"
          description="Selected certifications and milestones, with room for future additions."
        />
      </Reveal>

      {awards.length > 0 ? (
        <ul className="space-y-5">
          {awards.map((award, index) => (
            <Reveal key={`${award.title}-${award.year}`} as="li" delay={index * 80}>
              <article className="grid gap-5 rounded-xl2 border border-line bg-surface p-5 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{award.year}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">{award.title}</h3>
                  {award.organization ? <p className="mt-1 text-sm text-emberBright">{award.organization}</p> : null}
                  {award.description ? <p className="mt-3 text-sm leading-[1.6] text-muted">{award.description}</p> : null}
                  {award.earnedOn ? (
                    <p className="mt-4 text-sm text-muted">
                      Earned on: <span className="text-ink">{award.earnedOn}</span>
                    </p>
                  ) : null}
                  {award.credentialId ? (
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                      <FaCircleCheck aria-hidden="true" className="text-emberBright" />
                      Credential ID: <span className="font-mono text-ink">{award.credentialId}</span>
                    </p>
                  ) : null}
                </div>

                {award.imageUrl ? (
                  <div className="overflow-hidden rounded-xl2 border border-line bg-surface2">
                    <img src={award.imageUrl} alt={`${award.title} certificate`} className="h-full w-full object-cover" />
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default Awards;
