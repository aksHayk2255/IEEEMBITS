import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import teamImage from '../assets/images/Team.jpeg';

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
          description="A student-driven community exploring the world of computing through learning, building, and collaboration. IEEE Computer Society MBITS connects curious minds, encourages innovation, and creates opportunities to turn ideas into meaningful technology."
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <img
                src={teamImage}
                alt="IEEE Computer Society MBITS team"
                loading="lazy"
                className="h-auto w-full rounded-sm object-contain"
              />
            </Reveal>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:col-span-5">
            <Reveal delay={0.05}>
              <p className="text-lg leading-relaxed text-ink/90">
                Born from the growing IEEE community at MBITS, the IEEE Computer Society brings
                together students with a shared interest in computing, technology, and innovation.
                It is a space for students to learn beyond the classroom, explore emerging
                technologies, work on ideas, and connect with peers who share the same curiosity.
                Being part of the chapter offers opportunities to develop technical skills, discover
                new areas of computing, collaborate on projects, and grow as a confident technology
                professional.
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                The chapter is built around learning by doing. Through technical sessions, workshops,
                collaborative activities, projects, competitions, and peer-to-peer knowledge sharing,
                students get opportunities to turn concepts into practical experience. We encourage
                members to learn together, contribute their ideas, take initiative, and build
                solutions that extend beyond the classroom.
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
