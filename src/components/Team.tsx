import { ArrowUpRight, Users } from 'lucide-react';
import { team } from '../data/team';
import EmptyState from './ui/EmptyState';
import ImagePlaceholder from './ui/ImagePlaceholder';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Team() {
  return (
    <section id="team" className="bg-panel section-y">
      <div className="shell">
        <SectionHeading
          index="06"
          label="Team"
          title={
            <>
              The people behind
              <br />
              the community.
            </>
          }
          description="The students who plan, run and keep the chapter going."
        />

        <div className="mt-16 lg:mt-24">
          {team.length === 0 ? (
            <EmptyState
              icon={<Users size={28} strokeWidth={1.25} />}
              title="Team details coming soon"
              hint="Add each member's name, role and photo to introduce the team here."
              file="src/data/team.ts"
            />
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <li key={member.name}>
                  <Reveal delay={index * 0.04}>
                    <article className="group">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          loading="lazy"
                          className="aspect-[3/4] w-full rounded-sm object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      ) : (
                        <ImagePlaceholder label="Portrait" ratio="3 / 4" />
                      )}

                      <h3 className="mt-5 text-lg text-ink">{member.name}</h3>
                      <p className="mt-1 text-sm text-muted">{member.role}</p>

                      {(member.linkedin || member.github || member.email) && (
                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                            >
                              LinkedIn
                              <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                            >
                              GitHub
                              <ArrowUpRight size={13} strokeWidth={1.75} aria-hidden="true" />
                            </a>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="transition-colors hover:text-accent"
                            >
                              Email
                            </a>
                          )}
                        </div>
                      )}
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
