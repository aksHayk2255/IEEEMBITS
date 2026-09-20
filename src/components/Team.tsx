import { Users } from 'lucide-react';
import { team as localTeam, type TeamMember } from '../data/team';
import { useContent } from '../hooks/useContent';
import DataState from './ui/DataState';
import EmptyState from './ui/EmptyState';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Team() {
  const content = useContent<Record<string, unknown>>('team_members', localTeam.map((member) => ({ ...member })));
  const team: TeamMember[] = content.data.map((member) => ({ name: String(member.name ?? ''), role: String(member.position ?? member.role ?? ''), linkedin: member.linkedin_url as string | undefined, email: member.email as string | undefined }));
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

        <div className="mt-16 lg:mt-24"><DataState loading={content.loading} error={content.error}>
          {team.length === 0 ? (
            <EmptyState
              icon={<Users size={28} strokeWidth={1.25} />}
              title="Team details coming soon"
              hint="Add the chapter leadership details to introduce the team here."
              file="src/data/team.ts"
            />
          ) : (
            <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <li key={member.name} className="bg-bg">
                  <Reveal delay={index * 0.04}>
                    <article className="group flex min-h-44 flex-col justify-between p-6 transition-colors duration-300 hover:bg-surface sm:min-h-52 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs tracking-[0.18em] text-accent uppercase">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px w-10 bg-line-strong transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
                      </div>

                      <div className="mt-12">
                        <p className="text-xs tracking-[0.16em] text-muted uppercase">{member.role}</p>
                        <h3 className="mt-3 font-display text-2xl leading-tight text-ink sm:text-3xl">
                          {member.name}
                        </h3>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </DataState></div>
      </div>
    </section>
  );
}
