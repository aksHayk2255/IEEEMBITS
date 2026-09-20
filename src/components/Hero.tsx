import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, stagger, still } from '../lib/motion';
import ActionLink from './ui/ActionLink';
import ImagePlaceholder from './ui/ImagePlaceholder';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? still : fadeUp;

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div className="grid-field pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <div className="shell">
        {/* The one orchestrated moment on the page: the hero settles in on load. */}
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.p variants={item} className="eyebrow">
            IEEE Computer Society <span className="px-1.5 text-line-strong">·</span> MBITS
          </motion.p>

          <motion.h1 variants={item} className="hero-type mt-8 sm:mt-10">
            Building
            <br />
            a brighter
            <br />
            <span className="text-accent">tomorrow.</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="lede">
              A community of students exploring technology, building ideas, and creating meaningful
              solutions together.
            </p>

            <div className="flex flex-wrap gap-3">
              <ActionLink href="#about">Explore Chapter</ActionLink>
              <ActionLink href="#team" variant="outline">
                Our Community
              </ActionLink>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-14 sm:mt-20">
            {/*
              Swap this for a real campus photograph:
                import campus from '../assets/images/campus.jpg';
                <img src={campus} alt="MBITS campus" className="h-full w-full rounded-sm object-cover" />
            */}
            <ImagePlaceholder
              label="Wide campus or chapter photograph"
              file="src/assets/images/hero.jpg"
              ratio="21 / 9"
              className="hidden sm:block"
            />
            <ImagePlaceholder
              label="Campus or chapter photograph"
              file="src/assets/images/hero.jpg"
              ratio="4 / 3"
              className="sm:hidden"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
