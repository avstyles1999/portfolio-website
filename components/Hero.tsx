import Link from "next/link";
import { CONTAINER } from "./Section";

const CTA =
  "inline-flex items-center rounded-md bg-brand-accent px-5 py-3 text-white font-medium shadow-sm hover:bg-brand-accentDark hover:shadow transition";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#D1FAE5_0%,_transparent_55%)]">
      <div className={`${CONTAINER} flex flex-col justify-center pt-16 pb-14 sm:min-h-[85vh] sm:py-24`}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Hello, I&apos;m</p>
        <h1 className="mt-3 text-5xl sm:text-7xl font-extrabold tracking-tight">Anmol Verma</h1>
        <p className="mt-4 text-lg sm:text-2xl font-medium text-brand-muted">
          Team Lead, Software Development — Real-time &amp; Safety-Critical Systems
        </p>
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed">
          I build real-time, safety-critical systems — and lead the teams that ship them — alongside AI-driven
          automation.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="#projects" className={CTA}>
            View Projects
          </Link>
          <a href="/resume.pdf" download="Anmol-Verma-Resume.pdf" className={CTA}>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
