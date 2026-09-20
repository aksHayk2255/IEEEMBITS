import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

/** Short placeholder copy — rewrite each line in the chapter's own voice. */
const areas = [
  {
    number: '01',
    title: 'Learn',
    description:
      'Technical sessions, study groups, and workshops that help members build confidence from their first question to their next breakthrough.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Small teams turn classroom ideas into practical software, hardware, and experiments that solve real problems.',
  },
  {
    number: '03',
    title: 'Compete',
    description:
      'Hackathons, contests, and challenges give members a place to test their skills, think boldly, and grow together.',
  },
  {
    number: '04',
    title: 'Connect',
    description:
      'Talks, peer collaboration, alumni connections, and the wider IEEE network open doors to new people, perspectives, and opportunities.',
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-panel section-y">
      <div className="shell">
        <SectionHeading
          index="02"
          label="What we do"
          title={
            <>
              Learn.
              <br />
              Build.
              <br />
              Connect.
            </>
          }
          description="Four things the chapter keeps coming back to, whatever the semester looks like."
        />

        <ul className="mt-16 lg:mt-24">
          {areas.map((area, index) => (
            <li key={area.number}>
              <Reveal delay={index * 0.04}>
                <div className="group grid gap-4 border-t border-line py-8 transition-colors duration-300 hover:border-line-strong sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:py-10 lg:py-12">
                  <span className="text-xs tracking-[0.2em] text-muted sm:col-span-2">
                    {area.number} — {area.title.toUpperCase()}
                  </span>

                  <h3 className="font-display text-4xl leading-none text-ink transition-colors duration-300 group-hover:text-accent sm:col-span-4 sm:text-5xl lg:text-6xl">
                    {area.title}
                  </h3>

                  <p className="max-w-prose text-base leading-relaxed text-muted sm:col-span-6">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
          <li className="border-t border-line" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
