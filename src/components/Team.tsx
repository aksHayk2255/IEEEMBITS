import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users } from 'lucide-react';
import { team as localTeam, type TeamMember } from '../data/team';
import { useContent } from '../hooks/useContent';
import DataState from './ui/DataState';
import EmptyState from './ui/EmptyState';
import SectionHeading from './ui/SectionHeading';

export default function Team() {
  const content = useContent<Record<string, unknown>>('team_members', localTeam.map((member) => ({ ...member })));
  const team: TeamMember[] = content.data.map((member) => {
    const name = String(member.name ?? '');
    const role = String(member.position ?? member.role ?? '');
    const localMember = localTeam.find((candidate) => candidate.name === name || candidate.role === role);
    return {
      name,
      role,
      photo: localMember?.photo || (member.image_url as string | undefined) || (member.photo as string | undefined),
      linkedin: member.linkedin_url as string | undefined,
      email: member.email as string | undefined,
    };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (team.length < 2 || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % team.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isPaused, team.length]);

  useEffect(() => {
    if (activeIndex >= team.length) setActiveIndex(0);
  }, [activeIndex, team.length]);

  const showPrevious = () => setActiveIndex((currentIndex) => (currentIndex - 1 + team.length) % team.length);
  const showNext = () => setActiveIndex((currentIndex) => (currentIndex + 1) % team.length);
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
            <div
              className="relative mx-auto max-w-2xl overflow-hidden rounded-sm border border-line bg-bg"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <div className="relative min-h-[34rem] sm:aspect-[16/10] sm:min-h-0">
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    key={team[activeIndex].name}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -48 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 grid grid-rows-[minmax(15rem,1fr)_auto] sm:grid-cols-[1fr_1fr] sm:grid-rows-none"
                  >
                    <div className="relative min-h-56 bg-surface">
                      {team[activeIndex].photo ? (
                        <img
                          src={team[activeIndex].photo}
                          alt={`${team[activeIndex].name}, ${team[activeIndex].role}`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-sm text-muted">Photo unavailable</div>
                      )}
                    </div>
                    <div className="flex flex-col justify-end bg-panel p-6 sm:p-10">
                      <p className="text-xs tracking-[0.2em] text-accent uppercase">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(team.length).padStart(2, '0')}
                      </p>
                      <p className="mt-5 text-xs tracking-[0.16em] text-muted uppercase sm:mt-8">{team[activeIndex].role}</p>
                      <h3 className="mt-3 break-words font-display text-2xl leading-tight text-ink sm:text-4xl">
                        {team[activeIndex].name}
                      </h3>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between border-t border-line px-5 py-4">
                <p className="text-xs text-muted">Leadership, one story at a time.</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={showPrevious} className="grid h-9 w-9 place-items-center rounded-sm border border-line text-muted hover:border-accent hover:text-accent" aria-label="Previous team member">
                    <ArrowLeft size={16} />
                  </button>
                  <button type="button" onClick={showNext} className="grid h-9 w-9 place-items-center rounded-sm border border-line text-muted hover:border-accent hover:text-accent" aria-label="Next team member">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DataState></div>
      </div>
    </section>
  );
}
