import SectionTitle from './SectionTitle';
import { profile } from '../data/siteData';

const About = () => {
  return (
    <section id="about" className="section-shell">
      <SectionTitle
        eyebrow="About"
        title="Cybersecurity and AI learner focused on practical systems"
        description="Hands-on exploration across security, Linux, networking, and intelligent technologies."
      />

      <div className="space-y-5 rounded-2xl border border-white/10 bg-panel/70 p-6">
        {profile.aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-slate-200 md:text-xl md:leading-9">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default About;
