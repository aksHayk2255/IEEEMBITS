import { navLinks } from '../data/navigation';
import societyLogo from '../assets/images/ieee-computer-society-logo-cropped.jpeg';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel py-14 sm:py-16">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-16">
          <div>
            <a href="#home" className="inline-flex items-center gap-3" aria-label="Back to home">
              <span className="h-9 w-32 overflow-hidden rounded-sm bg-white sm:h-10 sm:w-36">
                <img src={societyLogo} alt="IEEE Computer Society" className="h-full w-full object-contain" />
              </span>
              <span className="text-xs font-semibold tracking-[0.16em] text-ink uppercase">MBITS</span>
            </a>
            <p className="mt-7 max-w-sm font-display text-3xl leading-tight text-ink/90 sm:text-4xl">
              Think. Build. Connect.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              A student-driven community exploring computing through learning, building, and collaboration.
            </p>
          </div>

          <div>
            <p className="eyebrow text-accent">Explore</p>
            <nav className="mt-5" aria-label="Footer navigation">
              <ul className="grid gap-3">
                {navLinks
                  .filter((link) => link.id !== 'home')
                  .map((link) => (
                    <li key={link.id}>
                      <a href={`#${link.id}`} className="text-sm text-muted transition-colors duration-200 hover:text-ink">
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="eyebrow text-accent">Chapter</p>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              IEEE Computer Society<br />
              Mar Baselios Institute of Technology and Science
            </p>
            <a href="#contact" className="mt-6 inline-flex text-sm text-accent transition-colors hover:text-ink">
              Get in touch
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} IEEE Computer Society MBITS</p>
          <p>Learning beyond the classroom.</p>
        </div>
      </div>
    </footer>
  );
}
