import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-6 sm:px-12 max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Anmol Verma</h1>
      <p className="mt-3 text-lg sm:text-2xl text-brand-muted">
        Team Lead, Software Development — Real-time &amp; Safety-Critical Systems
      </p>
      <p className="mt-6 max-w-2xl text-base sm:text-lg">
        I build real-time, safety-critical systems — and lead the teams that ship them — alongside AI-driven
        automation.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="#projects"
          className="rounded-md bg-brand-accent px-5 py-3 text-white font-medium hover:bg-brand-accentDark transition-colors"
        >
          View Projects
        </Link>
        <Link
          href="/resume.pdf"
          className="rounded-md bg-brand-accent px-5 py-3 text-white font-medium hover:bg-brand-accentDark transition-colors"
        >
          Download Resume
        </Link>
      </div>
    </section>
  );
}
