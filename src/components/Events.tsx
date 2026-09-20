import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { events } from '../data/events';
import EmptyState from './ui/EmptyState';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Events() {
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

        <div className="mt-16 lg:mt-24">
          {events.length === 0 ? (
            <EmptyState
              icon={<CalendarDays size={28} strokeWidth={1.25} />}
              title="No events added yet"
              hint="Upcoming events will appear here as soon as the first one is added."
              file="src/data/events.ts"
            />
          ) : (
            <ul className="relative border-l border-line">
              {events.map((event, index) => (
                <li key={`${event.title}-${event.date}`} className="relative pl-8 sm:pl-12">
                  <span
                    className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
                    aria-hidden="true"
                  />
                  <Reveal delay={index * 0.04}>
                    <article className="border-b border-line pb-10 pt-1 transition-colors duration-300 last:border-b-0 sm:grid sm:grid-cols-[12rem_1fr] sm:gap-8 sm:pb-12">
                      <div>
                        <p className="text-xs tracking-[0.18em] text-muted uppercase">{event.date}</p>
                        <p className="mt-2 text-xs tracking-[0.16em] text-accent uppercase">
                          {event.category}
                        </p>
                      </div>

                      <div className="mt-5 sm:mt-0">
                        <h3 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                          {event.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                          {event.description}
                        </p>

                        {event.link && (
                          <a
                            href={event.link}
                            className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent"
                          >
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
          )}
        </div>
      </div>
    </section>
  );
}
