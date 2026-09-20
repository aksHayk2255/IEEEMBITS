import { Award } from 'lucide-react';
import { achievements as localAchievements, type Achievement } from '../data/achievements';
import { useContent } from '../hooks/useContent';
import DataState from './ui/DataState';
import EmptyState from './ui/EmptyState';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Achievements() {
  const content = useContent<Record<string, unknown>>('achievements', localAchievements.map((item) => ({ ...item })));
  const achievements: Achievement[] = content.data.map((item) => ({ title: String(item.title ?? ''), description: String(item.description ?? ''), date: String(item.year ?? item.date ?? ''), context: item.context as string | undefined }));
  const hasAchievements = achievements.length > 0;

  return (
    <section id="achievements" className="section-y">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Achievements"
          title={
            <>
              A journey
              <br />
              of milestones.
            </>
          }
          description="Milestones are added here as the chapter records them."
        />

        <div className="mt-16 lg:mt-24"><DataState loading={content.loading} error={content.error}>
          {!hasAchievements ? (
            <EmptyState
              icon={<Award size={28} strokeWidth={1.25} />}
              title="To be added"
              hint="Add the chapter's first milestone and it will appear on this timeline."
              file="src/data/achievements.ts"
            />
          ) : (
            <>
              {/* Mobile: vertical timeline */}
              <ol className="relative lg:hidden">
                <span
                  className="absolute top-2 bottom-2 left-[5px] w-px bg-line"
                  aria-hidden="true"
                />
                {achievements.map((item, index) => (
                  <li key={`${item.title}-${item.date}`} className="relative pb-10 pl-8 last:pb-0">
                    <Reveal delay={index * 0.05}>
                      <span
                        className="absolute top-2 left-0 h-2.5 w-2.5 rounded-full border border-accent bg-bg"
                        aria-hidden="true"
                      />
                      <p className="text-xs tracking-[0.18em] text-accent uppercase">{item.date}</p>
                      <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                        {item.title}
                      </h3>
                      {item.context && (
                        <p className="mt-1 text-sm text-muted/80">{item.context}</p>
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>

              {/* Desktop: horizontal timeline */}
              <div className="hidden lg:block">
                <ol className="grid auto-cols-[minmax(16rem,1fr)] grid-flow-col gap-8 overflow-x-auto pb-4">
                  {achievements.map((item, index) => (
                    <li key={`${item.title}-${item.date}`} className="relative pt-10">
                      <Reveal delay={index * 0.05}>
                        <span className="absolute top-0 left-0 h-px w-full bg-line" aria-hidden="true" />
                        <span
                          className="absolute top-[-4px] left-0 h-2 w-2 rounded-full border border-accent bg-bg"
                          aria-hidden="true"
                        />
                        <p className="text-xs tracking-[0.18em] text-accent uppercase">
                          {item.date}
                        </p>
                        <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
                          {item.title}
                        </h3>
                        {item.context && (
                          <p className="mt-1 text-sm text-muted/80">{item.context}</p>
                        )}
                        <p className="mt-4 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </DataState></div>
      </div>
    </section>
  );
}
