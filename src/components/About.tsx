import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import ImagePlaceholder from './ui/ImagePlaceholder';

/**
 * Replace the em dashes with real figures once they are confirmed.
 * Nothing here is invented — the dashes are intentional placeholders.
 */
const stats = [
  { value: '—', label: 'Members' },
  { value: '—', label: 'Events' },
  { value: '—', label: 'Years' },
];

export default function About() {
  return (
    <section id="about" className="section-y">
      <div className="shell">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              More than
              <br />a club.
            </>
          }
          description="Placeholder description — replace this with the chapter's own words about what the IEEE Computer Society student branch at MBITS stands for."
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <ImagePlaceholder
                label="Chapter members at work"
                file="src/assets/images/about.jpg"
                ratio="4 / 3"
              />
            </Reveal>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-5">
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-ink/90">
                Placeholder paragraph. Describe how the chapter started, who it is for, and what a
                student gains by being part of it.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Placeholder paragraph. Add a second short paragraph about the way the chapter
                works — sessions, teams, mentorship, or whatever is true for your branch.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="grid grid-cols-3 gap-6 border-t border-line pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-4xl leading-none text-ink sm:text-5xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-3 text-xs tracking-[0.16em] text-muted uppercase">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
