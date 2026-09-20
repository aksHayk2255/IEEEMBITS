import Reveal from './ui/Reveal';
import ActionLink from './ui/ActionLink';

export default function CTA() {
  return (
    <section className="section-y">
      <div className="shell">
        <div className="relative overflow-hidden rounded-sm border border-line bg-panel px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
          <div className="grid-field pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <p className="text-sm text-muted">Have an idea?</p>
              <h2 className="display mt-5 max-w-[14ch]">
                Let&rsquo;s build it
                <br />
                together.
              </h2>
            </Reveal>

            <Reveal delay={0.06} className="lg:max-w-sm lg:pb-3">
              <p className="lede">
                Be part of a community that believes in people, technology and impact.
              </p>
              <ActionLink href="#contact" className="mt-8">
                Get in Touch
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
