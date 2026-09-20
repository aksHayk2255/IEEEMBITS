import { navLinks } from '../data/navigation';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line py-14">
      <div className="shell flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm tracking-[0.14em] text-ink uppercase">
            IEEE Computer Society
            <span className="block text-muted">MBITS</span>
          </p>
          <p className="mt-6 font-display text-2xl text-ink/90">Think. Build. Connect.</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3 lg:grid-cols-2">
            {navLinks
              .filter((link) => link.id !== 'home')
              .map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <div className="shell mt-12 border-t border-line pt-6">
        <p className="text-xs text-muted">© {year} IEEE Computer Society MBITS</p>
      </div>
    </footer>
  );
}
