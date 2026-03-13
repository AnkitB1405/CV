import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { profile } from '../data/siteData';

const About = () => {
  return (
    <section id="about" className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="About"
          title="Hands-on learning across security, systems, and infrastructure"
          description="Built around experimentation, self-hosting, and understanding how systems behave under real conditions."
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="space-y-5 rounded-2xl border border-white/10 bg-panel/70 p-6">
          {profile.aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-slate-200 md:text-xl md:leading-9">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default About;
