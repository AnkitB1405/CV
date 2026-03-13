import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { awards } from '../data/siteData';

const Awards = () => {
  return (
    <section id="awards" className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="Highlights"
          title="Certificates, achievements & hackathons"
          description="Selected certifications and milestones, with room for future additions."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="rounded-2xl border border-dashed border-white/20 bg-panel/60 p-6">
          {awards.length > 0 ? (
            <ul className="space-y-6">
              {awards.map((award) => (
                <li
                  key={`${award.title}-${award.year}`}
                  className="grid gap-5 rounded-2xl border border-white/10 bg-panel/80 p-5 md:grid-cols-[1.1fr_0.9fr] md:items-center"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.14em] text-cyan">{award.year}</p>
                    <h3 className="mt-1 font-display text-xl text-white">{award.title}</h3>
                    {award.organization ? <p className="mt-1 text-sm text-electric">{award.organization}</p> : null}
                    {award.description ? <p className="mt-3 text-sm leading-6 text-slate-300">{award.description}</p> : null}
                    {award.earnedOn ? (
                      <p className="mt-4 text-sm text-slate-300">
                        Earned on: <span className="text-slate-100">{award.earnedOn}</span>
                      </p>
                    ) : null}
                    {award.credentialId ? (
                      <p className="mt-1 text-sm text-slate-300">
                        Credential ID: <span className="text-slate-100">{award.credentialId}</span>
                      </p>
                    ) : null}
                  </div>

                  {award.imageUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <img
                        src={award.imageUrl}
                        alt={`${award.title} certificate`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
};

export default Awards;
