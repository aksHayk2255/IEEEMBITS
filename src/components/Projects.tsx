import { ArrowUpRight, Layers } from 'lucide-react';
import { projects } from '../data/projects';
import EmptyState from './ui/EmptyState';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

export default function Projects() {
  return (
    <section id="projects" className="bg-panel section-y">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Projects"
          title={
            <>
              From ideas
              <br />
              to impact.
            </>
          }
          description="Work built by chapter members, from weekend experiments to full builds."
        />

        <div className="mt-16 lg:mt-24">
          {projects.length === 0 ? (
            <EmptyState
              icon={<Layers size={28} strokeWidth={1.25} />}
              title="No projects added yet"
              hint="Chapter projects will be listed here once they are added."
              file="src/data/projects.ts"
            />
          ) : (
            <ul>
              {projects.map((project, index) => (
                <li key={project.title}>
                  <Reveal delay={index * 0.04}>
                    <article className="group grid gap-5 border-t border-line py-8 transition-colors duration-300 hover:border-line-strong lg:grid-cols-12 lg:gap-10 lg:py-12">
                      <div className="lg:col-span-2">
                        <p className="text-xs tracking-[0.18em] text-muted uppercase">
                          {project.year ?? String(index + 1).padStart(2, '0')}
                        </p>
                      </div>

                      <div className="lg:col-span-5">
                        <h3 className="font-display text-3xl leading-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent"
                          >
                            Open project
                            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                          </a>
                        )}
                      </div>

                      <div className="lg:col-span-5">
                        <p className="max-w-prose text-base leading-relaxed text-muted">
                          {project.summary}
                        </p>
                        {project.tags.length > 0 && (
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-sm border border-line px-3 py-1 text-xs text-muted"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
              <li className="border-t border-line" aria-hidden="true" />
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
