import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaLinkedinIn } from 'react-icons/fa6';
import { SiGithub, SiInstagram, SiYoutube } from 'react-icons/si';
import { contactDetails, isPlaceholder } from '../data/contact';
import { socialLinks } from '../data/socialLinks';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const socialIcons = {
    instagram: SiInstagram,
    linkedin: FaLinkedinIn,
    youtube: SiYoutube,
    github: SiGithub,
  };

  return (
    <section id="contact" className="section-y">
      <div className="shell">
        <SectionHeading
          index="07"
          label="Contact"
          title="Let's connect."
          description="Reach the chapter through any of these."
        />

        <dl className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {contactDetails.map((entry, index) => (
            <motion.div
              key={entry.label}
              whileHover={reduceMotion ? undefined : { scale: 1.02, opacity: 0.9 }}
              transition={{ duration: 0.2 }}
              className="rounded-sm border border-line bg-surface p-6 transition-colors hover:border-accent/60 sm:p-8"
            >
              <Reveal delay={index * 0.03}>
                <dt className="text-xs tracking-[0.18em] text-muted uppercase">{entry.label}</dt>
                <dd className="mt-3 text-lg break-words">
                  {isPlaceholder(entry.value) || !entry.href ? (
                    <span className={isPlaceholder(entry.value) ? 'text-muted/70' : 'text-ink'}>
                      {entry.value}
                    </span>
                  ) : (
                    <a
                      href={entry.href}
                      className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
                    >
                      {entry.value}
                      <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </dd>
              </Reveal>
            </motion.div>
          ))}
        </dl>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {socialLinks.map(({ id, label, href }) => {
            const Icon = socialIcons[id];
            return (
              <motion.a
                key={id}
                href={href || undefined}
                aria-label={label}
                aria-disabled={!href}
                tabIndex={href ? undefined : -1}
                whileHover={reduceMotion ? undefined : { scale: 1.03, opacity: 0.88 }}
                transition={{ duration: 0.2 }}
                className="flex min-h-16 items-center justify-center rounded-sm border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={21} strokeWidth={1.6} aria-hidden="true" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
