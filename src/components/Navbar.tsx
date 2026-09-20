import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import societyLogo from '../assets/images/ieee-computer-society-logo-cropped.jpeg';
import { navLinks } from '../data/navigation';
import { useActiveSection } from '../lib/useActiveSection';

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep the page from scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-18 items-center justify-between py-4" aria-label="Main">
        <a href="#home" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="h-9 w-32 overflow-hidden rounded-sm bg-white sm:h-10 sm:w-36">
            <img
              src={societyLogo}
              alt="IEEE Computer Society"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="text-[0.7rem] font-semibold tracking-[0.14em] text-ink uppercase">
            MBITS
          </span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  activeSection === link.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-accent"
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-sm border border-line px-4 py-2.5 text-sm text-ink transition-colors duration-300 hover:border-accent hover:text-accent sm:inline-flex"
          >
            Join Us
            <ArrowRight
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-line text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-t border-line bg-bg lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.id} className="border-b border-line last:border-b-0">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between py-4 text-lg ${
                      activeSection === link.id ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {link.label}
                    <ArrowRight size={16} strokeWidth={1.5} className="text-muted" aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-medium text-bg"
                >
                  Join Us
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
