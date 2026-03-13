import SectionTitle from './SectionTitle';
import { awards } from '../data/siteData';

const Awards = () => {
  return (
    <section id="awards" className="section-shell">
      <SectionTitle
        eyebrow="Highlights"
        title="Certificates, Achievements & Hackathons"
        description="This section is ready for future additions."
      />

      <div className="rounded-2xl border border-dashed border-white/20 bg-panel/60 p-6">
        {awards.length > 0 ? (
          <ul className="space-y-4">
            {awards.map((award) => (
              <li key={`${award.title}-${award.year}`} className="rounded-xl border border-white/10 bg-panel/80 p-4">
                <p className="text-sm uppercase tracking-[0.14em] text-cyan">{award.year}</p>
                <h3 className="mt-1 font-display text-xl text-white">{award.title}</h3>
                {award.organization ? <p className="mt-1 text-sm text-electric">{award.organization}</p> : null}
                {award.description ? <p className="mt-2 text-sm text-slate-300">{award.description}</p> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default Awards;
