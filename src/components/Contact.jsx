import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { profile } from '../data/siteData';

const contactLinks = [
  { label: 'GitHub', href: profile.github, icon: FaGithub, external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope, value: profile.email },
  { label: 'Résumé', href: profile.resumeUrl, icon: FaArrowDown, download: true }
];

const Contact = () => {
  return (
    <section id="contact" className="section-shell">
      <Reveal>
        <SectionTitle
          title="Let's connect"
          description="If you'd like to collaborate, discuss projects, or talk about cybersecurity, feel free to reach out."
        />
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.label} delay={index * 70}>
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                download={item.download ? true : undefined}
                className="contact-tile"
                aria-label={item.label}
              >
                <Icon aria-hidden="true" className="text-xl text-emberBright" />
                <span className="truncate">{item.value ?? item.label}</span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
