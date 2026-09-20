import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { events as localEvents, type Event } from '../data/events';
import EmptyState from './ui/EmptyState';
import DataState from './ui/DataState';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';
import { useContent } from '../hooks/useContent';

export default function Events() {
  const content = useContent<Event & { location?: string }>('events', localEvents);
  const events = content.data.map((event) => ({ ...event, category: event.category || event.location || 'Chapter event' }));
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
          {events.length === 0 ? (
            <EmptyState
              icon={<CalendarDays size={28} strokeWidth={1.25} />}
              title="No events added yet"
              hint="Upcoming events will appear here as soon as the first one is added."
              file="src/data/events.ts"
            />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <li key={`${event.title}-${event.date}`}>
                  <Reveal delay={index * 0.04}>
                    <article className="group flex min-h-72 flex-col border border-line bg-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface sm:p-8">
                      <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                        <span className="text-xs tracking-[0.2em] text-accent uppercase">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <p className="text-right text-xs tracking-[0.14em] text-muted uppercase">
                          {event.date}
                        </p>
                      </div>

                      <div className="flex flex-1 flex-col pt-6">
                        <p className="text-xs tracking-[0.16em] text-accent uppercase">{event.category}</p>
                        <h3 className="mt-4 font-display text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                          {event.title}
                        </h3>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{event.description}</p>

                        {event.link && (
                          <a href={event.link} className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent">
                            View details
                            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}</DataState>
        </div>
      </div>
    </section>
  );
}
