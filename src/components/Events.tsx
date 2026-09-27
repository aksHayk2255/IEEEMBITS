import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays } from 'lucide-react';
import { events as localEvents, type Event } from '../data/events';
import EmptyState from './ui/EmptyState';
import DataState from './ui/DataState';
import SectionHeading from './ui/SectionHeading';
import { useContent } from '../hooks/useContent';

export default function Events() {
  const content = useContent<(Event & { location?: string; registration_url?: string })>('events', localEvents);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const events = content.data.map((event) => ({
    ...event,
    category: event.category || event.location || 'Chapter event',
    link: event.link || event.registration_url,
  }));

  useEffect(() => {
    if (events.length < 2 || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % events.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [events.length, isPaused]);

  useEffect(() => {
    if (activeIndex >= events.length) setActiveIndex(0);
  }, [activeIndex, events.length]);

  const showPrevious = () => setActiveIndex((currentIndex) => (currentIndex - 1 + events.length) % events.length);
  const showNext = () => setActiveIndex((currentIndex) => (currentIndex + 1) % events.length);
  const activeEvent = events[activeIndex] ?? events[0];

  return (
    <section id="events" className="section-y">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Events"
          title={
            <>
              What&rsquo;s
              <br />
              happening.
            </>
          }
          description="Workshops, talks and sessions run by the chapter through the year."
        />

        <div className="mt-16 lg:mt-24"><DataState loading={content.loading} error={content.error}>
          {!activeEvent ? (
            <EmptyState
              icon={<CalendarDays size={28} strokeWidth={1.25} />}
              title="No events added yet"
              hint="Upcoming events will appear here as soon as the first one is added."
              file="src/data/events.ts"
            />
          ) : (
            <div
              className="relative mx-auto max-w-2xl overflow-hidden rounded-sm border border-line bg-bg"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              role="region"
              aria-label="Chapter events"
              aria-roledescription="carousel"
            >
              <div className="relative min-h-[32rem] sm:aspect-[16/10] sm:min-h-0">
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    key={`${activeEvent.title}-${activeEvent.date}`}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -48 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
                    className="absolute inset-0 grid grid-rows-[minmax(12rem,0.9fr)_auto] sm:grid-cols-[0.8fr_1.2fr] sm:grid-rows-none"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${activeIndex + 1} of ${events.length}`}
                  >
                    <div className="grid min-h-48 place-items-center bg-surface p-8 sm:min-h-0">
                      <div className="flex flex-col items-center gap-6 text-center">
                        <CalendarDays size={40} strokeWidth={1.1} className="text-accent" aria-hidden="true" />
                        <p className="max-w-[18ch] text-sm leading-relaxed text-muted">{activeEvent.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end bg-panel p-6 sm:p-10">
                      <p className="text-xs tracking-[0.2em] text-accent uppercase">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(events.length).padStart(2, '0')}
                      </p>
                      <p className="mt-5 text-xs tracking-[0.16em] text-muted uppercase sm:mt-8">{activeEvent.category}</p>
                      <h3 className="mt-3 break-words font-display text-2xl leading-tight text-ink sm:text-4xl">
                        {activeEvent.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{activeEvent.description}</p>
                      {activeEvent.link && (
                        <a href={activeEvent.link} className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent">
                          View details
                          <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between border-t border-line px-5 py-4">
                <p className="text-xs text-muted">Chapter events, one at a time.</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={showPrevious} className="grid h-9 w-9 place-items-center rounded-sm border border-line text-muted hover:border-accent hover:text-accent" aria-label="Previous event">
                    <ArrowLeft size={16} />
                  </button>
                  <button type="button" onClick={showNext} className="grid h-9 w-9 place-items-center rounded-sm border border-line text-muted hover:border-accent hover:text-accent" aria-label="Next event">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}</DataState>
        </div>
      </div>
    </section>
  );
}
