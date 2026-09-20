import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { events } from '../data/events';
import EmptyState from './ui/EmptyState';
import ImagePlaceholder from './ui/ImagePlaceholder';
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
            <ul className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <li key={`${event.title}-${event.date}`} className="bg-bg">
                  <Reveal delay={index * 0.04}>
                    <article className="group flex h-full flex-col gap-6 p-6 transition-colors duration-300 hover:bg-surface sm:p-8">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt=""
                          loading="lazy"
                          className="aspect-[4/3] w-full rounded-sm object-cover"
                        />
                      ) : (
                        <ImagePlaceholder label="Event photo" ratio="4 / 3" />
                      )}

                      <div className="flex flex-1 flex-col">
                        <p className="text-xs tracking-[0.18em] text-muted uppercase">
                          {event.category} <span className="px-1.5 text-line-strong">·</span>{' '}
                          {event.date}
                        </p>

                        <h3 className="mt-4 font-display text-2xl leading-tight text-ink sm:text-3xl">
                          {event.title}
                        </h3>

                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                          {event.description}
                        </p>

                        {event.link && (
                          <a
                            href={event.link}
                            className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent"
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
