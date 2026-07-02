import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { profile } from '../data/siteData';

const About = () => {
  const [lead, ...rest] = profile.aboutParagraphs;

  return (
    <section id="about" className="section-shell">
      <Reveal>
        <SectionTitle
          title="Hands-on learning across security, systems, and infrastructure"
          description="Built around experimentation, self-hosting, and understanding how systems behave under real conditions."
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="font-display text-2xl leading-[1.3] text-ink md:text-3xl" style={{ textWrap: 'balance' }}>
            {lead}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="space-y-5 border-l border-line pl-6 md:pl-8">
            {rest.map((paragraph) => (
              <p key={paragraph} className="max-w-[68ch] leading-[1.7] text-muted">
                {paragraph}
              </p>
            ))}

            <ul className="flex flex-wrap gap-2 pt-2">
              {profile.expertise.map((item) => (
                <li
                  key={item}
                  className="rounded-pill border border-line px-3 py-1 font-mono text-xs text-muted transition hover:border-ember/50 hover:text-emberBright"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
