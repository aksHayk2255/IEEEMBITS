import { ArrowUpRight } from 'lucide-react';
import { contactDetails, isPlaceholder } from '../data/contact';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Contact() {
  return (
    <section id="contact" className="section-y">
      <div className="shell">
        <SectionHeading
          index="08"
          label="Contact"
          title="Let's connect."
          description="Reach the chapter through any of these. Replace each placeholder in src/data/contact.ts with the real detail."
        />

        <dl className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {contactDetails.map((entry, index) => (
            <div key={entry.label} className="bg-bg p-6 sm:p-8">
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
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
