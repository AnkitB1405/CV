import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import { profile } from '../data/siteData';

const Contact = () => {
  return (
    <section id="contact" className="section-shell">
      <SectionTitle
        eyebrow="Contact"
        title="Let us build something exceptional"
        description="Reach out for collaborations, internships, freelance work, or fun and interesting cybersecurity projects."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <a
          href={`mailto:${profile.email}`}
          className="contact-tile"
          aria-label="Send email"
        >
          <FaEnvelope aria-hidden="true" className="text-xl text-cyan" />
          <span>{profile.email}</span>
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="contact-tile"
          aria-label="Open GitHub profile"
        >
          <FaGithub aria-hidden="true" className="text-xl text-cyan" />
          <span>GitHub</span>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="contact-tile"
          aria-label="Open LinkedIn profile"
        >
          <FaLinkedin aria-hidden="true" className="text-xl text-cyan" />
          <span>LinkedIn</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
